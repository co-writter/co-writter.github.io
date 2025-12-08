
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { EBook, EBookPage } from '../types';
import * as ReactRouterDOM from 'react-router-dom';
import { 
    IconBook, IconSparkles, IconSend, IconPlus, IconArrowLeft, 
    IconRocket, IconX, IconMic, IconStop, IconDownload, IconImage
} from '../constants';
import { 
    createStudioSession, generateBookCover, generateSpeech, transcribeAudio
} from '../services/geminiService';
import { Chat } from '@google/genai';
import MorphicEye from '../components/MorphicEye';
import NovelEditor from '../components/NovelEditor';

const { useNavigate, useLocation } = ReactRouterDOM as any;

declare global {
  interface Window {
    jspdf: any;
    anime: any;
  }
}

interface ChatMessage {
    id: string;
    role: 'user' | 'ai' | 'system';
    text: string;
    isStreaming?: boolean;
    isSpeaking?: boolean;
}

// Audio Decode Helper
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}


const EbookStudioPage: React.FC = () => {
  const { currentUser, addCreatedBook } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const initialPrompt = location.state?.initialPrompt || '';

  // --- Layout State ---
  // On mobile, we only show ONE view at a time: 'tools' (chat/outline) or 'editor'.
  const [mobileView, setMobileView] = useState<'tools' | 'editor'>('editor');
  const [leftTab, setLeftTab] = useState<'chat' | 'outline'>('chat');
  
  // --- Auto Pilot State ---
  const [showAutoPilotModal, setShowAutoPilotModal] = useState(false);
  const [apTopic, setApTopic] = useState('');
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchStatus, setLaunchStatus] = useState("Standing By");

  // --- Project State ---
  const [pages, setPages] = useState<EBookPage[]>([
    { id: '1', title: 'Chapter 1: The Beginning', content: '# Chapter 1: The Beginning\n\nStart writing here...', pageNumber: 1 }
  ]);
  const [activePageId, setActivePageId] = useState<string>('1');
  const activePage = useMemo(() => pages.find(p => p.id === activePageId) || pages[0], [pages, activePageId]);

  // --- AI State ---
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [currentAction, setCurrentAction] = useState("Ready");
  const [progress, setProgress] = useState(0);
  
  // --- Audio State ---
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const [activeSpeakerId, setActiveSpeakerId] = useState<string | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const isPlayingAudioRef = useRef(false);

  // Speech Recognition
  const [isListening, setIsListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lastGeneratedImageRef = useRef<string | null>(null);

  const sanitizeBookStructure = (currentPages: EBookPage[]) => {
      return currentPages.map((page, index) => ({
          ...page,
          pageNumber: index + 1,
          title: page.title || `Chapter ${index + 1}`
      }));
  };

  useEffect(() => {
    if (!chatSessionRef.current) {
        const initialContext = `You are the Co-Author engine. Connected to Project.`;
        const session = createStudioSession(initialContext);
        if (session) {
            chatSessionRef.current = session;
            const initMsgId = 'sys-init';
            setMessages([{ id: initMsgId, role: 'ai', text: "I'm online. The Architect is listening." }]);
            if (initialPrompt) setTimeout(() => handleSendMessage(undefined, initialPrompt), 500);
        }
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, leftTab, mobileView]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  useEffect(() => {
      return () => {
          stopAudio();
          if (audioContextRef.current) audioContextRef.current.close();
      };
  }, []);

  const stopAudio = () => {
      if (currentSourceRef.current) {
          try { currentSourceRef.current.stop(); } catch(e) {}
          currentSourceRef.current = null;
      }
      audioQueueRef.current = [];
      isPlayingAudioRef.current = false;
      setActiveSpeakerId(null);
  };

  const queueTTS = (text: string, messageId: string) => {
      if (!text || !text.trim()) return;
      audioQueueRef.current.push(text);
      if (!isPlayingAudioRef.current) processAudioQueue(messageId);
  };

  const processAudioQueue = async (messageId: string) => {
      if (audioQueueRef.current.length === 0) {
          isPlayingAudioRef.current = false;
          setActiveSpeakerId(null);
          return;
      }
      isPlayingAudioRef.current = true;
      setActiveSpeakerId(messageId);
      const nextText = audioQueueRef.current.shift()!;
      const cleanText = nextText.replace(/[*_#`]/g, '').replace(/!\[.*?\]\(.*?\)/g, ''); 
      if (!cleanText.trim()) { processAudioQueue(messageId); return; }

      try {
          if (!audioContextRef.current) {
              audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
          }
          const base64Audio = await generateSpeech(cleanText);
          if (base64Audio && audioContextRef.current) {
               const audioBuffer = await decodeAudioData(decode(base64Audio), audioContextRef.current, 24000, 1);
               const source = audioContextRef.current.createBufferSource();
               source.buffer = audioBuffer;
               source.connect(audioContextRef.current.destination);
               source.onended = () => processAudioQueue(messageId);
               currentSourceRef.current = source;
               source.start(0);
          } else {
              processAudioQueue(messageId);
          }
      } catch (e) {
          processAudioQueue(messageId);
      }
  };

  const startRecording = async () => {
      try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;
          audioChunksRef.current = [];
          mediaRecorder.ondataavailable = (event) => {
              if (event.data.size > 0) audioChunksRef.current.push(event.data);
          };
          mediaRecorder.onstop = async () => {
              const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
              if (audioBlob.size > 0) await processAudioForTranscription(audioBlob);
              stream.getTracks().forEach(track => track.stop());
          };
          mediaRecorder.start();
          setIsListening(true);
      } catch (e) {
          alert("Could not access microphone.");
      }
  };

  const stopRecording = () => {
      if (mediaRecorderRef.current && isListening) {
          mediaRecorderRef.current.stop();
          setIsListening(false);
      }
  };

  const processAudioForTranscription = async (blob: Blob) => {
      setIsTranscribing(true);
      try {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = async () => {
              const base64String = reader.result as string;
              const base64Data = base64String.split(',')[1];
              const text = await transcribeAudio(base64Data, blob.type);
              if (text) setInput(prev => (prev ? prev + " " : "") + text);
              setIsTranscribing(false);
          };
      } catch (e) {
          setIsTranscribing(false);
      }
  };

  const handleMicClick = () => {
    if (isListening) stopRecording();
    else { stopAudio(); startRecording(); }
  };

  const handleImageGeneration = async (prompt: string) => {
      setIsBusy(true);
      setCurrentAction("Generating Visuals...");
      setProgress(30);
      const msgId = Date.now().toString() + '_img';
      setMessages(prev => [...prev, { id: msgId, role: 'ai', text: `Creating visual asset: "${prompt}"...` }]);

      try {
          const isDiagram = /diagram|chart|graph/i.test(prompt);
          const style = isDiagram ? "Technical Diagram" : "Cinematic Illustration";
          const result = await generateBookCover(prompt, style, activePage.title, currentUser?.name);
          
          if ('imageBytes' in result) {
              const markdownImage = `\n\n![${prompt}](data:image/jpeg;base64,${result.imageBytes})\n\n`;
              setPages(prev => prev.map(p => p.id === activePageId ? { ...p, content: p.content + markdownImage } : p));
              setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: `Visual Generated.` } : m));
              setMobileView('editor');
          } else {
              setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: `Failed to generate visual.` } : m));
          }
      } catch (e) {
          console.error(e);
      } finally {
          setIsBusy(false);
          setProgress(0);
          setCurrentAction("Ready");
      }
  };

  const handleSendMessage = async (e?: React.FormEvent, overrideInput?: string) => {
      e?.preventDefault();
      const text = overrideInput || input;
      if (!text.trim() || isBusy) return;
      
      if (isListening) stopRecording();
      stopAudio(); 
      setInput('');
      if (textareaRef.current) textareaRef.current.style.height = 'auto'; // Reset height
      
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text }]);
      setIsBusy(true);
      setCurrentAction("Thinking...");
      setProgress(20);

      const msgId = Date.now().toString() + '_ai';
      setMessages(prev => [...prev, { id: msgId, role: 'ai', text: '', isStreaming: true }]);

      let speechBuffer = "";
      
      try {
          if (chatSessionRef.current) {
              const resultStream = await chatSessionRef.current.sendMessageStream({ message: text });
              let fullText = '';
              for await (const chunk of resultStream) {
                  const chunkText = chunk.text;
                  if (chunkText) {
                      fullText += chunkText;
                      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: fullText } : m));
                      speechBuffer += chunkText;
                      const sentenceMatch = speechBuffer.match(/([.?!:\n]+)\s/);
                      if (sentenceMatch && sentenceMatch.index !== undefined) {
                          const separatorIndex = sentenceMatch.index + sentenceMatch[0].length;
                          queueTTS(speechBuffer.substring(0, separatorIndex), msgId);
                          speechBuffer = speechBuffer.substring(separatorIndex);
                      }
                  }
                  
                  if (chunk.functionCalls) {
                      for (const call of chunk.functionCalls) {
                          if (call.name === 'write_content') {
                              const args = call.args as any;
                              setPages(prev => prev.map(p => p.id === activePageId ? { ...p, content: args.content } : p));
                              setMobileView('editor');
                          } else if (call.name === 'generate_image') {
                              const args = call.args as any;
                              await handleImageGeneration(args.prompt);
                          } else if (call.name === 'propose_blueprint') {
                              const args = call.args as any;
                              setPages(prev => sanitizeBookStructure(args.outline.map((ch: any, i: number) => ({
                                  id: `p-${i}`, title: ch.title, content: '', pageNumber: i + 1
                              }))));
                              setActivePageId(`p-0`);
                              setLeftTab('outline');
                              setMobileView('tools');
                          }
                      }
                  }
              }
              setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isStreaming: false } : m));
              if (speechBuffer.trim()) queueTTS(speechBuffer, msgId);
          }
      } catch (e) {
          setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: "Error connecting to neural engine.", isStreaming: false } : m));
      } finally {
          setIsBusy(false);
          setProgress(0);
          setCurrentAction("Ready");
      }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSendMessage();
      }
  };

  const handleExport = () => {
      const finalPages = sanitizeBookStructure(pages);
      const book: EBook = {
          id: `gen-${Date.now()}`,
          title: finalPages[0].title,
          author: currentUser?.name || 'Anonymous',
          description: 'AI Generated',
          price: 0,
          coverImageUrl: '',
          genre: 'AI',
          sellerId: currentUser?.id || 'guest',
          publicationDate: new Date().toISOString().split('T')[0],
          pages: finalPages
      };
      addCreatedBook(book);
      navigate('/dashboard');
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden font-sans">
        
        {/* Header */}
        <header className="h-14 md:h-16 border-b border-white/10 bg-black/60 backdrop-blur-md flex items-center justify-between px-4 z-50 shrink-0">
            <button onClick={() => navigate('/dashboard')} className="text-neutral-400 hover:text-white flex items-center gap-2">
                <IconArrowLeft className="w-4 h-4" /> <span className="text-xs font-bold uppercase hidden sm:inline">Exit</span>
            </button>
            
            {/* Mobile View Switcher */}
            <div className="flex md:hidden bg-white/10 rounded-full p-1">
                <button 
                    onClick={() => setMobileView('editor')}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${mobileView === 'editor' ? 'bg-white text-black' : 'text-neutral-400'}`}
                >
                    Editor
                </button>
                <button 
                    onClick={() => setMobileView('tools')}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${mobileView === 'tools' ? 'bg-white text-black' : 'text-neutral-400'}`}
                >
                    AI Tools
                </button>
            </div>

            <div className="flex items-center gap-2">
                <button 
                    onClick={() => setShowAutoPilotModal(true)}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase bg-white/5 border border-white/5 hover:bg-white/10"
                >
                    <IconRocket className="w-3 h-3 text-brand-accent" /> Auto-Write
                </button>
                <button onClick={handleExport} className="px-4 py-2 rounded-full text-[10px] font-bold uppercase bg-white text-black hover:bg-neutral-200">
                    Save
                </button>
            </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden relative">
            
            {/* Tools Panel (Chat/Outline) */}
            <aside className={`
                ${mobileView === 'tools' ? 'flex' : 'hidden'} md:flex
                w-full md:w-[350px] lg:w-[400px] bg-black/80 backdrop-blur border-r border-white/10 flex-col z-20
            `}>
                <div className="flex border-b border-white/10 bg-black/20">
                    <button onClick={() => setLeftTab('chat')} className={`flex-1 py-3 text-[10px] font-bold uppercase ${leftTab === 'chat' ? 'text-white border-b-2 border-white' : 'text-neutral-500'}`}>Co-Author</button>
                    <button onClick={() => setLeftTab('outline')} className={`flex-1 py-3 text-[10px] font-bold uppercase ${leftTab === 'outline' ? 'text-white border-b-2 border-white' : 'text-neutral-500'}`}>Outline</button>
                </div>

                <div className="flex-1 overflow-hidden relative bg-[#09090b]">
                    {leftTab === 'chat' && (
                        <div className="absolute inset-0 flex flex-col">
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-6 ${msg.role === 'user' ? 'bg-white/10 text-white rounded-br-none' : 'bg-transparent border border-white/10 text-neutral-300 rounded-bl-none'}`}>
                                            {msg.role === 'ai' && <div className="text-[10px] font-bold text-brand-accent mb-1 uppercase flex items-center gap-2"><IconSparkles className="w-3 h-3"/> Co-Author</div>}
                                            <div className="whitespace-pre-wrap">{msg.text}</div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            
                            {/* Google Style Studio Input */}
                            <div className="p-4 bg-gradient-to-t from-black via-black to-transparent z-20">
                                <div className="w-full bg-[#1e1e1e] border border-white/10 rounded-[28px] p-2 pl-4 flex items-end gap-2 shadow-lg transition-all focus-within:bg-[#252525] focus-within:border-white/20">
                                    {/* Action Buttons */}
                                    <button 
                                        onClick={() => handleSendMessage(undefined, "/image ")}
                                        className="w-8 h-8 mb-1 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
                                        title="Create Image"
                                    >
                                        <IconImage className="w-4 h-4" />
                                    </button>
                                    
                                    <button 
                                        onClick={handleMicClick}
                                        className={`w-8 h-8 mb-1 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'}`}
                                        title="Voice Input"
                                    >
                                         {isListening ? <IconStop className="w-3 h-3"/> : <IconMic className="w-4 h-4"/>}
                                    </button>

                                    <div className="flex-grow py-2">
                                        <textarea 
                                            ref={textareaRef}
                                            className="w-full bg-transparent text-white text-sm placeholder-neutral-500 resize-none focus:outline-none max-h-32 custom-scrollbar"
                                            placeholder={isListening ? "Listening..." : "Ask AI..."}
                                            rows={1}
                                            value={input}
                                            onKeyDown={handleKeyDown}
                                            onChange={e => setInput(e.target.value)}
                                            style={{ minHeight: '24px' }}
                                        />
                                    </div>

                                    <button 
                                        onClick={(e) => handleSendMessage(e)}
                                        disabled={!input.trim() || isBusy} 
                                        className="w-10 h-10 mb-0.5 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex-shrink-0"
                                    >
                                        <IconSend className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {leftTab === 'outline' && (
                         <div className="absolute inset-0 overflow-y-auto p-4 custom-scrollbar">
                             {pages.map((p, idx) => (
                                 <div key={p.id} onClick={() => { setActivePageId(p.id); setMobileView('editor'); }}
                                     className={`p-3 mb-2 rounded border cursor-pointer ${activePageId === p.id ? 'bg-white/10 border-white/20' : 'border-white/5 hover:bg-white/5'}`}
                                 >
                                     <div className="text-[10px] opacity-50 uppercase">Chapter {idx+1}</div>
                                     <div className="font-bold text-sm">{p.title}</div>
                                 </div>
                             ))}
                             <button onClick={() => {
                                 const newId = Date.now().toString();
                                 setPages([...pages, { id: newId, title: 'New Chapter', content: '', pageNumber: pages.length + 1 }]);
                             }} className="w-full py-3 border border-dashed border-white/20 text-xs font-bold uppercase text-neutral-500 hover:text-white mt-4 rounded">
                                 + Add Chapter
                             </button>
                         </div>
                    )}
                </div>
            </aside>

            {/* Editor Panel */}
            <main className={`
                ${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex
                flex-1 flex-col relative bg-[#111]
            `}>
                <div className="absolute top-4 left-4 right-4 h-12 bg-black/80 backdrop-blur rounded-xl border border-white/10 flex items-center px-4 justify-between z-10">
                     <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{activePage.title}</span>
                     <div className="flex items-center gap-2">
                         <div className={`w-2 h-2 rounded-full ${isBusy ? 'bg-brand-accent animate-pulse' : 'bg-green-500'}`}></div>
                         <span className="text-[10px] uppercase text-neutral-500">{isBusy ? currentAction : "Ready"}</span>
                     </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar pt-20 px-4 md:px-12 pb-20">
                    <NovelEditor 
                        title={activePage.title}
                        onTitleChange={(t) => setPages(prev => prev.map(p => p.id === activePageId ? {...p, title: t} : p))}
                        content={activePage.content}
                        onContentChange={(c) => setPages(prev => prev.map(p => p.id === activePageId ? {...p, content: c} : p))}
                        onTriggerAI={(p) => handleSendMessage(undefined, `Write content: ${p}`)}
                        onTriggerImageGen={handleImageGeneration}
                    />
                </div>
            </main>

        </div>

        {/* AutoPilot Modal (Simplified for brevity) */}
        {showAutoPilotModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur">
                <div className="bg-[#1a1a1a] p-6 rounded-2xl w-full max-w-md border border-white/10">
                    <div className="flex justify-between mb-6">
                        <h3 className="font-bold">Auto-Pilot</h3>
                        <button onClick={() => setShowAutoPilotModal(false)}><IconX className="w-5 h-5"/></button>
                    </div>
                    {!isLaunching ? (
                        <>
                            <input value={apTopic} onChange={e => setApTopic(e.target.value)} placeholder="Topic..." className="w-full bg-black border border-white/10 rounded p-3 mb-4 text-white" />
                            <button onClick={() => { setIsLaunching(true); setTimeout(() => { setShowAutoPilotModal(false); setIsLaunching(false); handleSendMessage(undefined, `Auto-Pilot: Blueprint for ${apTopic}`); }, 2000); }} className="w-full py-3 bg-white text-black font-bold rounded">Launch</button>
                        </>
                    ) : (
                        <div className="text-center py-8 animate-pulse">Initializing...</div>
                    )}
                </div>
            </div>
        )}
    </div>
  );
};

export default EbookStudioPage;
