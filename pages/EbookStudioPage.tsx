

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { EBook, EBookPage } from '../types';
import * as ReactRouterDOM from 'react-router-dom';
import { 
    IconBook, IconSparkles, 
    IconSend, IconPlus, IconArrowLeft, 
    IconRocket, IconX, 
    IconPenTip, IconBulb, IconImage,
    IconMenu, IconCheck, IconWand, IconBrain, IconVolume, IconStop, IconMic
} from '../constants';
import { 
    createStudioSession, generateBookCover, generateSpeech, transcribeAudio
} from '../services/geminiService';
import { Chat } from '@google/genai';
import MorphicEye from '../components/MorphicEye';
import NovelEditor from '../components/NovelEditor';

const { useNavigate, useLocation } = ReactRouterDOM as any;

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
  const [leftTab, setLeftTab] = useState<'chat' | 'outline'>('chat');
  const [mobileView, setMobileView] = useState<'tools' | 'editor'>('editor');
  
  // --- Auto Pilot State ---
  const [showAutoPilotModal, setShowAutoPilotModal] = useState(false);
  const [apTopic, setApTopic] = useState('');
  const [apType, setApType] = useState<'fiction' | 'non-fiction' | 'academic'>('fiction');
  const [apTone, setApTone] = useState('Professional');
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchStatus, setLaunchStatus] = useState("Standing By");

  // --- Project State ---
  const [pages, setPages] = useState<EBookPage[]>([
    { id: '1', title: 'Introduction', content: '', pageNumber: 1 }
  ]);
  const [activePageId, setActivePageId] = useState<string>('1');
  const activePage = useMemo(() => pages.find(p => p.id === activePageId) || pages[0], [pages, activePageId]);

  // --- AI State ---
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [currentAction, setCurrentAction] = useState("Ready");
  const [progress, setProgress] = useState(0);
  const [isListening, setIsListening] = useState(false);
  
  // --- Audio State ---
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const [activeSpeakerId, setActiveSpeakerId] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastGeneratedImageRef = useRef<string | null>(null);

  // Initialize Session
  useEffect(() => {
    if (!chatSessionRef.current) {
        const initialContext = `You are the Co-Author engine. Connected to Project.`;
        const session = createStudioSession(initialContext);
        if (session) {
            chatSessionRef.current = session;
            setMessages([{
                id: 'sys-init',
                role: 'ai',
                text: "I'm ready. I can help you write, plan chapters, and create images."
            }]);
            
            if (initialPrompt) {
               setTimeout(() => handleSendMessage(undefined, initialPrompt), 500);
            }
        }
    }
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, leftTab]);

  // Handle Audio Stop on Unmount
  useEffect(() => {
      return () => {
          if (currentSourceRef.current) {
              currentSourceRef.current.stop();
          }
          if (audioContextRef.current) {
              audioContextRef.current.close();
          }
          if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
              mediaRecorderRef.current.stop();
          }
      };
  }, []);

  const stopAudio = () => {
      if (currentSourceRef.current) {
          try {
            currentSourceRef.current.stop();
          } catch(e) {}
          currentSourceRef.current = null;
      }
      setActiveSpeakerId(null);
  };

  const playTTS = async (text: string, messageId: string) => {
      // Stop any existing audio
      stopAudio();

      // Initialize Audio Context if needed
      if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
      }
      
      setActiveSpeakerId(messageId);
      
      const cleanText = text.replace(/[*_#`]/g, ''); // Strip markdown for better speech
      const base64Audio = await generateSpeech(cleanText);
      
      if (base64Audio && audioContextRef.current) {
          try {
             const audioBuffer = await decodeAudioData(
                 decode(base64Audio),
                 audioContextRef.current,
                 24000,
                 1
             );
             
             const source = audioContextRef.current.createBufferSource();
             source.buffer = audioBuffer;
             source.connect(audioContextRef.current.destination);
             
             source.onended = () => {
                 setActiveSpeakerId(null);
                 currentSourceRef.current = null;
             };
             
             currentSourceRef.current = source;
             source.start(0);

          } catch (e) {
              console.error("Audio playback error", e);
              setActiveSpeakerId(null);
          }
      } else {
          setActiveSpeakerId(null);
      }
  };

  const handleMicClick = async () => {
    // Stop recording if already active
    if (isListening) {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
        setIsListening(false);
        return;
    }

    // Start recording
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        let mimeType = 'audio/webm';
        if (MediaRecorder.isTypeSupported('audio/webm')) {
            mimeType = 'audio/webm';
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
            mimeType = 'audio/mp4';
        }
        
        const mediaRecorder = new MediaRecorder(stream, { mimeType });
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
            }
        };

        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
            
            // Convert Blob to Base64
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = async () => {
                const base64String = (reader.result as string).split(',')[1];
                
                // Transcribe
                setIsBusy(true);
                setCurrentAction("Transcribing...");
                try {
                    const text = await transcribeAudio(base64String, mimeType);
                    if (text) {
                        setInput(prev => prev ? `${prev} ${text}` : text);
                    }
                } catch (e) {
                    console.error("Transcription error", e);
                } finally {
                    setIsBusy(false);
                    setCurrentAction("Ready");
                    
                    // Release microphone
                    stream.getTracks().forEach(track => track.stop());
                }
            };
        };

        mediaRecorder.start();
        setIsListening(true);
        
    } catch (err) {
        console.error("Microphone access error:", err);
        alert("Could not access microphone. Please check permissions.");
    }
  };

  const handleImageGeneration = async (prompt: string) => {
      setIsBusy(true);
      setCurrentAction("Creating Image...");
      setProgress(30);
      
      const msgId = Date.now().toString() + '_img';
      setMessages(prev => [...prev, { 
          id: msgId, 
          role: 'ai', 
          text: `Generating image for: "${prompt}"...`, 
          isStreaming: true 
      }]);

      try {
          const result = await generateBookCover(prompt, "Cinematic", activePage.title, currentUser?.name);
          
          if ('imageBytes' in result) {
              const markdownImage = `\n\n![${prompt}](data:image/jpeg;base64,${result.imageBytes})\n\n`;
              
              lastGeneratedImageRef.current = markdownImage; // Save to ref for potential blueprint injection
              
              setPages(prev => prev.map(p => p.id === activePageId ? { ...p, content: p.content + markdownImage } : p));
              setMessages(prev => prev.map(m => m.id === msgId ? { 
                  ...m, 
                  text: `Generated visual for "${prompt}". Added to editor.`,
                  isStreaming: false
              } : m));
              setMobileView('editor');
          } else {
              setMessages(prev => prev.map(m => m.id === msgId ? { 
                  ...m, 
                  text: `Failed to generate image. ${result.error}`,
                  isStreaming: false
              } : m));
          }
      } catch (e) {
          console.error(e);
      } finally {
          setIsBusy(false);
          setProgress(0);
          setCurrentAction("Ready");
      }
  };

  // --- CORE AI LOGIC ---
  const handleSendMessage = async (e?: React.FormEvent, overrideInput?: string) => {
      e?.preventDefault();
      const text = overrideInput || input;
      if (!text.trim() || isBusy) return;
      
      setInput('');
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text }]);
      setIsBusy(true);
      setCurrentAction("Thinking...");
      setProgress(10);

      const msgId = Date.now().toString() + '_ai';
      setMessages(prev => [...prev, { id: msgId, role: 'ai', text: '', isStreaming: true }]);

      try {
          if (chatSessionRef.current) {
              const contextPayload = `
[SYSTEM_CONTEXT_UPDATE]
Current Chapter Title: "${activePage.title}"
Current Editor Content:
"""
${activePage.content}
"""
User Request: ${text}
`;

              const resultStream = await chatSessionRef.current.sendMessageStream({ message: contextPayload });
              
              let fullText = '';

              for await (const chunk of resultStream) {
                  const chunkText = chunk.text;
                  if (chunkText) {
                      fullText += chunkText;
                      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: fullText } : m));
                  }
                  
                  if (chunk.functionCalls) {
                      for (const call of chunk.functionCalls) {
                          if (call.name === 'write_content') {
                              const args = call.args as any;
                              setCurrentAction(args.summary || "Updating content...");
                              setProgress(50);
                              setPages(prev => prev.map(p => p.id === activePageId ? { ...p, content: args.content } : p));
                              setMessages(prev => prev.map(m => m.id === msgId ? { 
                                  ...m, 
                                  text: fullText + `\n\n_Updated content for "${activePage.title}"_`,
                              } : m));
                              // Switch to editor on mobile so they see the change
                              setMobileView('editor');

                          } else if (call.name === 'generate_image') {
                              const args = call.args as any;
                              await handleImageGeneration(args.prompt);
                              setMessages(prev => prev.map(m => m.id === msgId ? { 
                                  ...m, 
                                  text: fullText + `\n\n_Generated image for "${args.prompt}"_`,
                              } : m));

                          } else if (call.name === 'propose_blueprint') {
                              const args = call.args as any;
                              setCurrentAction("Creating Structure...");
                              
                              // Check if we just generated a cover image, preserve it in the first chapter
                              const existingCover = lastGeneratedImageRef.current || '';
                              lastGeneratedImageRef.current = null; // consume it

                              setPages(prev => {
                                  // Create new outline structure
                                  const newPages = args.outline.map((ch: any, i: number) => ({
                                      id: `p-${i}`,
                                      title: ch.title,
                                      content: (i === 0 && existingCover) ? existingCover : '',
                                      pageNumber: i + 1
                                  }));
                                  return newPages;
                              });

                              setActivePageId(`p-0`);
                              setMessages(prev => prev.map(m => m.id === msgId ? { 
                                  ...m, 
                                  text: fullText + `\n\n**Blueprint Created:** ${args.title}`,
                              } : m));
                              // Switch to outline view so they see it
                              setLeftTab('outline');
                              setMobileView('tools');
                              
                          }
                      }
                  }
              }
              setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isStreaming: false } : m));
          }
      } catch (e) {
          console.error(e);
      } finally {
          setIsBusy(false);
          setProgress(100);
          setTimeout(() => {
            setProgress(0);
            setCurrentAction("Ready");
          }, 2000);
      }
  };

  const executeAutoPilot = async () => {
      if (!apTopic) return;
      setIsLaunching(true);
      
      // Simulation of a launch sequence
      const steps = [
          "Starting Co-Author...",
          "Understanding topic...",
          "Setting style...",
          "Writing Book..."
      ];
      
      for (const step of steps) {
          setLaunchStatus(step);
          await new Promise(r => setTimeout(r, 600));
      }

      setShowAutoPilotModal(false);
      setIsLaunching(false);
      setLaunchStatus("Standing By");

      const prompt = `Auto-Pilot Protocol Activated. 
      Directive: Create a comprehensive book blueprint.
      Topic: "${apTopic}"
      Archetype: ${apType}
      Tone: ${apTone}
      
      Requirements:
      1. First, call 'generate_image' to create a cinematic cover art for this book.
      2. Then, call 'propose_blueprint' to create a 6-chapter outline.
      
      Execute sequence immediately.`;
      
      handleSendMessage(undefined, prompt);
  };

  const handleExport = () => {
      const book: EBook = {
          id: `gen-${Date.now()}`,
          title: activePage.title || "Untitled",
          author: currentUser?.name || 'Anonymous',
          description: pages[0]?.content.substring(0, 150) || 'AI Generated',
          price: 0,
          coverImageUrl: '',
          genre: 'AI',
          sellerId: currentUser?.id || 'guest',
          publicationDate: new Date().toISOString().split('T')[0],
          pages
      };
      addCreatedBook(book);
      navigate('/dashboard');
  };

  return (
    <div className="flex flex-col h-screen bg-transparent text-white overflow-hidden font-sans selection:bg-white/20 selection:text-black">
        
        {/* === Header (Floating Glass) === */}
        <header className="h-16 border-b border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-between px-6 z-50 shrink-0 animate-slide-down relative shadow-2xl">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/dashboard')} className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                    <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Exit</span>
                </button>
            </div>

            {/* View Switcher (Mobile Only) */}
            <div className="flex md:hidden bg-white/5 rounded-full p-1 border border-white/5">
                <button 
                    onClick={() => setMobileView('tools')}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${mobileView === 'tools' ? 'bg-white text-black' : 'text-neutral-500'}`}
                >
                    Chat
                </button>
                <button 
                    onClick={() => setMobileView('editor')}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${mobileView === 'editor' ? 'bg-white text-black' : 'text-neutral-500'}`}
                >
                    Write
                </button>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
                <button 
                    onClick={() => setShowAutoPilotModal(true)}
                    className="flex items-center gap-2 px-3 sm:px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/5 text-neutral-300 border border-white/5 hover:bg-white/10 hover:text-white transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                    <IconRocket className="w-3 h-3 text-google-blue" /> <span className="hidden sm:inline">Auto-Write</span>
                </button>
                <button 
                    onClick={handleExport}
                    className="flex items-center gap-2 px-3 sm:px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white text-black hover:bg-neutral-200 transition-all shadow-glow-white hover:scale-105 active:scale-95"
                >
                    <IconSend className="w-3 h-3" /> <span className="hidden sm:inline">Save</span>
                </button>
            </div>
        </header>

        {/* === Main Layout (Floating Panels) === */}
        <div className="flex flex-1 overflow-hidden relative">
            
            {/* === LEFT PANEL: Chat & Tools === */}
            <aside className={`
                ${mobileView === 'tools' ? 'flex' : 'hidden'} md:flex
                w-full md:w-[350px] lg:w-[400px] bg-black/80 backdrop-blur-xl border-r border-white/10 flex-col z-10 flex-shrink-0 animate-slide-up-stagger shadow-[10px_0_40px_rgba(0,0,0,0.5)]
            `}>
                {/* Tabs */}
                <div className="flex border-b border-white/10 shrink-0 bg-black/20">
                    <button 
                        onClick={() => setLeftTab('chat')}
                        className={`flex-1 py-4 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${leftTab === 'chat' ? 'text-white bg-white/5 border-b-2 border-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                    >
                        Chat
                    </button>
                    <button 
                         onClick={() => setLeftTab('outline')}
                         className={`flex-1 py-4 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${leftTab === 'outline' ? 'text-white bg-white/5 border-b-2 border-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                    >
                        Chapters
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-hidden relative h-full">
                    {/* --- CHAT TAB --- */}
                    {leftTab === 'chat' && (
                        <div className="absolute inset-0 flex flex-col">
                            {/* Messages List */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}>
                                        <div className={`max-w-[90%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                            <div className={`p-4 rounded-xl text-sm leading-relaxed border shadow-lg ${msg.role === 'user' ? 'bg-white/10 border-white/10 text-white rounded-tr-none' : 'bg-black/50 border-white/10 text-neutral-300 rounded-tl-none backdrop-blur-md'}`}>
                                                {msg.role === 'ai' && (
                                                    <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/5">
                                                        <div className="flex items-center gap-2">
                                                            <MorphicEye className="w-4 h-4 rounded-full border border-white/10 bg-black" isActive={activeSpeakerId === msg.id} />
                                                            <span className="text-[11px] font-bold uppercase tracking-widest text-google-blue">Co-Author</span>
                                                        </div>
                                                        {activeSpeakerId === msg.id ? (
                                                             <button 
                                                                onClick={stopAudio}
                                                                className="w-5 h-5 flex items-center justify-center text-red-400 hover:text-white transition-colors"
                                                             >
                                                                 <IconStop className="w-3 h-3" />
                                                             </button>
                                                        ) : (
                                                             <button 
                                                                onClick={() => playTTS(msg.text, msg.id)}
                                                                className="w-5 h-5 flex items-center justify-center text-neutral-500 hover:text-white transition-colors"
                                                             >
                                                                 <IconVolume className="w-3 h-3" />
                                                             </button>
                                                        )}
                                                    </div>
                                                )}
                                                <div className="whitespace-pre-wrap font-sans font-medium tracking-tight">
                                                    {msg.text}
                                                    {msg.isStreaming && <span className="inline-block w-1.5 h-3 ml-1 bg-google-blue animate-pulse align-middle"></span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md shrink-0">
                                <form onSubmit={(e) => handleSendMessage(e)} className="relative group">
                                    <input 
                                        type="text" 
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 pr-20 text-xs text-white outline-none focus:border-white/30 focus:bg-black/70 transition-all placeholder-neutral-600 font-mono shadow-inner"
                                        placeholder="Ask Co-Author..."
                                        disabled={isBusy}
                                    />
                                    
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                         <button 
                                            type="button"
                                            onClick={handleMicClick}
                                            className={`p-2 transition-colors hover:scale-110 active:scale-95 ${isListening ? 'text-red-500 animate-pulse' : 'text-neutral-500 hover:text-white'}`}
                                            title="Speak"
                                        >
                                            <IconMic className="w-4 h-4" />
                                        </button>
                                        <button 
                                            type="submit"
                                            disabled={!input.trim() || isBusy}
                                            className="p-2 text-neutral-500 hover:text-white transition-colors disabled:opacity-0 hover:scale-110 active:scale-95"
                                        >
                                            <IconSend className="w-4 h-4" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* --- OUTLINE TAB --- */}
                    {leftTab === 'outline' && (
                        <div className="absolute inset-0 overflow-y-auto custom-scrollbar p-4">
                            <div className="space-y-2">
                                {pages.map((p, idx) => (
                                    <div 
                                        key={p.id}
                                        onClick={() => setActivePageId(p.id)}
                                        className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border group animate-slide-up-stagger delay-${idx*100} ${activePageId === p.id ? 'bg-white/10 border-white/20 text-white shadow-lg' : 'bg-black/20 border-white/5 text-neutral-500 hover:text-white hover:bg-white/5 hover:border-white/10'}`}
                                    >
                                        <span className={`font-mono text-[9px] w-6 h-6 flex items-center justify-center rounded-full border border-white/10 ${activePageId === p.id ? 'bg-white text-black border-white' : 'bg-transparent'}`}>
                                            {(idx + 1).toString().padStart(2, '0')}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                             <span className="text-xs font-bold truncate block tracking-wide">{p.title}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <button 
                                onClick={() => {
                                    const newId = Date.now().toString();
                                    setPages([...pages, { id: newId, title: 'New Chapter', content: '', pageNumber: pages.length + 1 }]);
                                    setActivePageId(newId);
                                }}
                                className="mt-6 w-full py-4 border border-dashed border-white/10 text-[10px] font-bold uppercase tracking-widest text-neutral-600 hover:text-white hover:border-white/30 flex items-center justify-center gap-2 transition-all rounded-full hover:bg-white/5"
                            >
                                <IconPlus className="w-3 h-3" /> Add Chapter
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            {/* === RIGHT PANEL: Editor with Dynamic Header === */}
            <main className={`
                ${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex
                flex-1 flex-col relative overflow-hidden bg-transparent
            `}>
                
                {/* --- DYNAMIC AGENT HEADER (Floating HUD) --- */}
                <div className="absolute top-4 left-4 right-4 md:left-8 md:right-8 h-16 md:h-20 border border-white/10 flex items-center justify-between px-6 bg-black/60 backdrop-blur-xl z-20 shrink-0 animate-slide-down rounded-[24px] shadow-2xl">
                     <div className="flex items-center gap-4">
                        <div className="relative group">
                             {/* UPDATED: Matches Home Page / Navbar (Thin border, dark bg) */}
                            <MorphicEye 
                                className="w-10 h-10 md:w-12 md:h-12 border border-white/20 bg-[#050505] shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-full relative z-10" 
                                isActive={!isBusy} 
                            />
                            {/* Subtle Pulse Effect Behind */}
                            <div className="absolute inset-0 bg-white/5 rounded-full blur-md animate-pulse"></div>
                        </div>
                        <div>
                             <h2 className="text-white text-sm font-bold tracking-tight">Co-Author</h2>
                             <div className="flex items-center gap-2">
                                 <span className={`w-1.5 h-1.5 rounded-full ${isBusy ? 'bg-google-blue animate-pulse' : 'bg-green-500'}`}></span>
                                 <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                                     {isBusy ? currentAction : "Online"}
                                 </span>
                             </div>
                        </div>
                     </div>

                     {/* Progress Bar (Visible when busy) */}
                     {isBusy && (
                         <div className="w-32 md:w-64 h-8 flex flex-col justify-center animate-fade-in">
                            <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-white shadow-[0_0_10px_white] transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
                            </div>
                         </div>
                     )}
                </div>

                {/* --- EDITOR CANVAS --- */}
                <div className="flex-1 overflow-y-auto custom-scrollbar flex justify-center pt-24 md:pt-28 pb-20">
                    <NovelEditor 
                        title={activePage.title}
                        onTitleChange={(newTitle) => setPages(prev => prev.map(p => p.id === activePageId ? { ...p, title: newTitle } : p))}
                        content={activePage.content}
                        onContentChange={(newContent) => setPages(prev => prev.map(p => p.id === activePageId ? { ...p, content: newContent } : p))}
                        onTriggerAI={(prompt) => handleSendMessage(undefined, `Write content for: ${prompt}`)}
                        onTriggerImageGen={handleImageGeneration}
                    />
                </div>
            </main>

        </div>

        {/* === AUTO-PILOT MISSION CONTROL (UPGRADED THEME) === */}
        {showAutoPilotModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-fade-in">
                
                {/* Modal Container */}
                <div className="w-full max-w-2xl bg-black/90 border border-white/10 rounded-[40px] shadow-[0_0_80px_rgba(66,133,244,0.15)] relative overflow-hidden animate-slide-up flex flex-col ring-1 ring-white/10">
                    
                    {/* Background Grid Effect */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
                    
                    {/* Top Bar */}
                    <div className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-google-blue animate-pulse"></div>
                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-300">Co-Author Setup</span>
                        </div>
                        <button 
                            onClick={() => setShowAutoPilotModal(false)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-neutral-500 hover:text-white transition-colors"
                        >
                            <IconX className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12 relative z-10 flex flex-col items-center">
                        
                        {/* Commander Eye - UPDATED: Matches Home Page */}
                        <div className="mb-8 relative group">
                             <div className="absolute inset-0 bg-google-blue/10 blur-[40px] rounded-full opacity-30 group-hover:opacity-60 transition-opacity"></div>
                             <MorphicEye className="w-20 h-20 bg-[#050505] border border-white/30 shadow-[0_0_50px_rgba(255,255,255,0.15)] rounded-full relative z-10" />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-2 text-center">Auto-Write</h2>
                        <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-10 text-center">Let AI write a book plan for you</p>

                        {!isLaunching ? (
                            <div className="w-full space-y-8">
                                {/* Archetype Selector */}
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { id: 'fiction', label: 'Story', icon: IconWand },
                                        { id: 'non-fiction', label: 'Guide', icon: IconBook },
                                        { id: 'academic', label: 'Research', icon: IconBrain },
                                    ].map(type => (
                                        <button
                                            key={type.id}
                                            onClick={() => setApType(type.id as any)}
                                            className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border transition-all duration-300 group ${apType === type.id ? 'bg-white text-black border-white shadow-glow-white' : 'bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'}`}
                                        >
                                            <type.icon className="w-6 h-6" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">{type.label}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Inputs */}
                                <div className="space-y-4">
                                    <div className="relative">
                                        <input 
                                            value={apTopic}
                                            onChange={(e) => setApTopic(e.target.value)}
                                            placeholder="What is your book about?"
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-google-blue transition-all font-mono placeholder-neutral-600 focus:shadow-[0_0_20px_rgba(66,133,244,0.1)]"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 shrink-0">Tone:</span>
                                        <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar">
                                            {['Professional', 'Whimsical', 'Dark', 'Academic'].map(tone => (
                                                <button
                                                    key={tone}
                                                    onClick={() => setApTone(tone)}
                                                    className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all whitespace-nowrap ${apTone === tone ? 'bg-white/20 border-white text-white' : 'bg-transparent border-white/10 text-neutral-500 hover:border-white/30'}`}
                                                >
                                                    {tone}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Activate Button */}
                                <button 
                                    onClick={executeAutoPilot}
                                    disabled={!apTopic}
                                    className="w-full py-5 bg-white text-black font-black text-sm uppercase tracking-[0.2em] rounded-full hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        <IconRocket className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                                        Start Writing
                                    </span>
                                    {/* Button Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                </button>
                            </div>
                        ) : (
                            /* Launch Sequence Animation */
                            <div className="w-full py-10 flex flex-col items-center">
                                <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mb-6 relative">
                                     <div className="absolute inset-0 bg-google-blue animate-[loading_2s_ease-in-out_infinite]"></div>
                                </div>
                                <p className="text-white font-mono text-sm uppercase tracking-widest animate-pulse">
                                    {launchStatus}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer Deco */}
                    <div className="h-2 bg-gradient-to-r from-google-blue via-purple-500 to-google-blue w-full opacity-50"></div>
                </div>
            </div>
        )}
    </div>
  );
};

export default EbookStudioPage;