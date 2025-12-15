
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { EBook, EBookPage } from '../types';
import * as ReactRouterDOM from 'react-router-dom';
import {
    IconBook, IconSparkles, IconSend, IconPlus, IconArrowLeft,
    IconRocket, IconX, IconMic, IconStop, IconDownload, IconImage, IconCheck, IconBrain, IconVolume,
    IconPenTip
} from '../constants';
import {
    createStudioSession, generateBookCover, transcribeAudio
} from '../services/geminiService';
import { Chat, Part } from '@google/genai';
import MorphicEye from '../components/MorphicEye';
import NovelEditor from '../components/NovelEditor';
import CinematicWriterOverlay from '../components/CinematicWriterOverlay';

const { useNavigate, useLocation } = ReactRouterDOM as any;

interface ChatMessage {
    id: string;
    role: 'user' | 'ai' | 'system';
    text: string;
    isStreaming?: boolean;
    isToolUse?: boolean;
    attachments?: string[]; // URLs for display
}

const EbookStudioPage: React.FC = () => {
  const { currentUser, addCreatedBook } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const initialPrompt = location.state?.initialPrompt || '';

  // Layout State
  const [mobileView, setMobileView] = useState<'tools' | 'editor'>('editor');
  const [leftTab, setLeftTab] = useState<'chat' | 'outline'>('chat');
  const [isCinematicMode, setIsCinematicMode] = useState(false);

  // Project State
  const [pages, setPages] = useState<EBookPage[]>([
    { id: '1', title: 'Chapter 1: The Beginning', content: '', pageNumber: 1 }
  ]);
  const [activePageId, setActivePageId] = useState<string>('1');
  const activePage = useMemo(() => pages.find(p => p.id === activePageId) || pages[0], [pages, activePageId]);

  // AI & Audio State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Auto-Pilot State
  const [autoPilotMode, setAutoPilotMode] = useState<'idle' | 'planning' | 'writing_sequence'>('idle');
  const [writeQueue, setWriteQueue] = useState<string[]>([]);

  // Multimodal State
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentPreviews, setAttachmentPreviews] = useState<string[]>([]);

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- INITIALIZATION ---
  useEffect(() => {
    if (!chatSessionRef.current) {
        const initialContext = `You are the Co-Author engine (v3.0) for co-writter.
        Current User: ${currentUser?.name || 'Author'}.
        Project Context: Active Chapter "${activePage.title}".

        Your Goal: Assist in writing a high-quality book.
        - If asked to write, use the 'write_content' tool.
        - If asked for an image, use 'generate_image'.
        - If asked to plan, use 'propose_blueprint'.

        Be concise in chat, verbose in writing.`;

        const session = createStudioSession(initialContext);
        if (session) {
            chatSessionRef.current = session;
            const initMsgId = 'sys-init';
            setMessages([{ id: initMsgId, role: 'ai', text: "Engine Online. Ready to create." }]);
            if (initialPrompt) {
                // Small delay to ensure UI is ready
                setTimeout(() => handleSendMessage(undefined, initialPrompt), 500);
            }
        }
    }
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, leftTab]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  // --- AUTO-PILOT LOGIC ---
  useEffect(() => {
      // Only proceed if NOT busy and AutoPilot is active
      if (!isBusy) {
          if (autoPilotMode === 'planning') {
              // Planning finished. Check if we have a structure now.
              if (pages.length > 1) {
                  // Plan created successfully. Start writing sequence.
                  const incompleteIds = pages.map(p => p.id); // Write all
                  setWriteQueue(incompleteIds);
                  setAutoPilotMode('writing_sequence');
                  // Trigger first write immediately
                  triggerNextWrite(incompleteIds);
              } else {
                  // Planning failed or user cancelled?
                  setAutoPilotMode('idle');
              }
          } else if (autoPilotMode === 'writing_sequence') {
              // A chapter finished.
              if (writeQueue.length > 0) {
                  triggerNextWrite(writeQueue);
              } else {
                  // All done
                  setAutoPilotMode('idle');
                  setMessages(prev => [...prev, { id: Date.now().toString(), role: 'system', text: "Auto-Pilot Sequence Complete. Book Generated." }]);
              }
          }
      }
  }, [isBusy, autoPilotMode, pages]); // Depends on 'pages' to detect outline update

  const triggerNextWrite = (currentQueue: string[]) => {
      if (currentQueue.length === 0) return;
      
      const nextId = currentQueue[0];
      const remaining = currentQueue.slice(1);
      
      setWriteQueue(remaining);
      setActivePageId(nextId);

      const targetPage = pages.find(p => p.id === nextId);
      if (targetPage) {
          // Add small delay to allow UI to switch active page visually
          setTimeout(() => {
              const prompt = `You are the Lead Writer. Write the COMPLETE content for Chapter ${targetPage.pageNumber}: "${targetPage.title}".
              Context Summary: ${targetPage.content.substring(0, 200)}...
              
              Requirements:
              1. Write extensive, immersive content (approx 800-1000 words).
              2. Use 'write_content' tool to save it.
              3. IF the scene has visual potential, use 'generate_image' to create 1 illustration.`;
              
              handleSendMessage(undefined, prompt);
          }, 1000);
      }
  };

  // --- HELPER: File to Part ---
  const fileToPart = async (file: File): Promise<Part> => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
              const base64String = (reader.result as string).split(',')[1];
              resolve({
                  inlineData: {
                      data: base64String,
                      mimeType: file.type
                  }
              });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
      });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
          const newFiles = Array.from(e.target.files);
          setAttachments(prev => [...prev, ...newFiles]);
          const newPreviews = newFiles.map(file => URL.createObjectURL(file));
          setAttachmentPreviews(prev => [...prev, ...newPreviews]);
      }
  };

  const removeAttachment = (index: number) => {
      setAttachments(prev => prev.filter((_, i) => i !== index));
      setAttachmentPreviews(prev => {
          URL.revokeObjectURL(prev[index]);
          return prev.filter((_, i) => i !== index);
      });
  };

  // --- TOOL EXECUTION ENGINE ---
  const executeStudioTool = async (name: string, args: any): Promise<string> => {
      console.log(`[Studio] Executing Tool: ${name}`, args);

      try {
          if (name === 'write_content') {
              const newContent = args.content;
              setPages(prev => prev.map(p => p.id === activePageId ? { ...p, content: newContent } : p));
              return "Content updated successfully in the editor.";
          }

          if (name === 'generate_image') {
              const prompt = args.prompt;
              // Inform user
              setMessages(prev => [...prev, { id: Date.now().toString(), role: 'system', text: `Generating visual: ${prompt}...` }]);

              const result = await generateBookCover(prompt, "Cinematic", activePage.title, currentUser?.name);

              if ('imageBytes' in result) {
                  const base64Image = `data:image/jpeg;base64,${result.imageBytes}`;
                  const imageMarkdown = `\n\n![${prompt}](${base64Image})\n\n`;
                  setPages(prev => prev.map(p => p.id === activePageId ? { ...p, content: p.content + imageMarkdown } : p));
                  return "Image generated and inserted into the document.";
              }
              return "Image generation failed.";
          }

          if (name === 'propose_blueprint') {
              const newOutline = args.outline;
              const bookTitle = args.title;

              const newPages: EBookPage[] = newOutline.map((chapter: any, idx: number) => ({
                  id: Date.now().toString() + idx,
                  title: chapter.title,
                  content: `> **Summary**: ${chapter.summary}\n\nStart writing here...`,
                  pageNumber: idx + 1
              }));

              setPages(newPages);
              if (newPages.length > 0) setActivePageId(newPages[0].id);

              return `Blueprint applied. Book title set to "${bookTitle}" with ${newPages.length} chapters.`;
          }

          return "Tool executed.";
      } catch (error: any) {
          console.error("Tool Execution Error", error);
          return `Error executing tool: ${error.message}`;
      }
  };

  // --- MAIN CHAT HANDLER ---
  const handleSendMessage = async (e?: React.FormEvent, overrideInput?: string) => {
      const text = overrideInput || input;
      if(!text.trim() && attachments.length === 0) return;

      const currentAttachments = [...attachments];
      const currentPreviews = [...attachmentPreviews];

      // UI Reset
      setInput('');
      setAttachments([]);
      setAttachmentPreviews([]);
      if (textareaRef.current) textareaRef.current.style.height = 'auto';

      const userMsgId = Date.now().toString();
      // Only show user message if it's manual input, hide system-driven prompts to keep chat clean in cinematic mode
      if (!autoPilotMode || autoPilotMode === 'idle') {
          setMessages(prev => [...prev, { 
              id: userMsgId, 
              role: 'user', 
              text, 
              attachments: currentPreviews 
          }]);
      }
      setIsBusy(true);

      const aiMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: aiMsgId, role: 'ai', text: '', isStreaming: true }]);

      try {
          if (!chatSessionRef.current) throw new Error("Session lost");

          // Build Parts
          const parts: (string | Part)[] = [];
          if (text.trim()) {
              parts.push({ text: text });
          }
          for (const file of currentAttachments) {
              const part = await fileToPart(file);
              parts.push(part);
          }

          const result = await chatSessionRef.current.sendMessageStream({ message: parts as any });

          let fullText = "";
          let finalFunctionCalls: any[] | undefined = undefined;

          for await (const chunk of result) {
              const chunkText = chunk.text;
              if (chunkText) {
                  fullText += chunkText;
                  setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: fullText } : m));
              }
              if (chunk?.functionCalls) {
                  finalFunctionCalls = chunk.functionCalls;
              }
          }

          const calls = finalFunctionCalls;

          if (calls && calls.length > 0) {
              setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, isToolUse: true, text: m.text + (m.text ? "\n\n" : "") + "*Executing Actions...*" } : m));

              const functionResponses: Part[] = [];
              for (const call of calls) {
                  const executionResult = await executeStudioTool(call.name, call.args);
                  functionResponses.push({
                      functionResponse: {
                        name: call.name,
                        response: { result: executionResult }
                      }
                  });
              }

              const toolResult = await chatSessionRef.current.sendMessageStream({ message: functionResponses });

              let toolOutputText = "";
              for await (const chunk of toolResult) {
                  const chunkText = chunk.text;
                  if (chunkText) {
                      toolOutputText += chunkText;
                      setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: fullText + (fullText ? "\n\n" : "") + toolOutputText, isToolUse: false } : m));
                  }
              }
          }

          setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, isStreaming: false } : m));

      } catch (e) {
          console.error(e);
          setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: "Connection interrupted. Please retry.", isStreaming: false } : m));
      } finally {
          setIsBusy(false);
      }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
            const base64String = (reader.result as string).split(',')[1];
            setIsBusy(true);
            try {
                const text = await transcribeAudio(base64String, 'audio/webm');
                if (text) setInput(prev => prev + (prev ? " " : "") + text);
            } catch (err) {
                console.error("Transcription failed", err);
            }
            setIsBusy(false);
        };
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsListening(true);
    } catch (err) {
      console.error("Mic access denied", err);
      alert("Could not access microphone.");
    }
  };

  const stopRecording = () => {
      if (mediaRecorderRef.current && isListening) {
          mediaRecorderRef.current.stop();
          setIsListening(false);
      }
  };

  // ... Actions ...
  const handleAutoWrite = () => {
      setIsCinematicMode(true); // TRIGGER CINEMATIC MODE
      
      // Determine if we need to outline first or if we can start writing
      const needsOutline = pages.length <= 1 && pages[0].content.length < 200;

      if (needsOutline) {
          const prompt = `You are the Lead Architect. Create a comprehensive, best-selling book outline for a book titled "${pages[0].title}". 
          Use the 'propose_blueprint' tool to define the chapters. 
          The outline must have at least 5 chapters.`;
          
          setAutoPilotMode('planning');
          handleSendMessage(undefined, prompt);
      } else {
          // Already have structure, start writing sequence
          const incompleteIds = pages.map(p => p.id);
          setWriteQueue(incompleteIds);
          setAutoPilotMode('writing_sequence');
          triggerNextWrite(incompleteIds);
      }
  };

  const handleExport = () => {
      const book: EBook = {
          id: `gen-${Date.now()}`,
          title: pages[0].title || "Untitled Draft",
          author: currentUser?.name || 'Anonymous',
          description: 'Created with co-writter.',
          price: 0,
          coverImageUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800',
          genre: 'Draft',
          sellerId: currentUser?.id || 'guest',
          publicationDate: new Date().toISOString().split('T')[0],
          pages: pages
      };
      addCreatedBook(book);
      navigate('/dashboard');
  };

  const wordCount = activePage.content.trim().split(/\s+/).filter(w => w.length > 0).length;

  // Derive content for Cinematic Overlay: Get the last AI message
  const lastAiMessage = messages.slice().reverse().find(m => m.role === 'ai');

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden font-sans">
        
        {/* --- CINEMATIC OVERLAY --- */}
        <CinematicWriterOverlay 
            isOpen={isCinematicMode} 
            onClose={() => {
                setIsCinematicMode(false);
                setAutoPilotMode('idle');
                setWriteQueue([]);
            }}
            content={lastAiMessage ? lastAiMessage.text : "Initializing Neural Link..."}
            isStreaming={isBusy}
            chapterTitle={activePage.title}
        />

        {/* Top Header */}
        <header className="h-14 border-b border-white/10 bg-[#050505] flex items-center justify-between px-4 z-50 shrink-0">
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-neutral-400 hover:text-white uppercase text-[10px] font-bold tracking-widest transition-colors">
                <IconArrowLeft className="w-4 h-4" /> Exit Studio
            </button>

            <div className="flex items-center gap-3">
                <button
                    onClick={handleAutoWrite}
                    disabled={isBusy || autoPilotMode !== 'idle'}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold uppercase hover:bg-indigo-500/20 transition-colors disabled:opacity-50 text-indigo-300"
                >
                    {isBusy ? <IconSparkles className="w-3 h-3 animate-spin" /> : <IconBrain className="w-3 h-3" />}
                    {autoPilotMode !== 'idle' ? 'Auto-Pilot Active' : 'Auto-Pilot'}
                </button>
                <div className="h-4 w-px bg-white/10 mx-1"></div>
                <button onClick={handleExport} className="bg-white text-black px-6 py-1.5 rounded-full text-[10px] font-bold uppercase hover:bg-neutral-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                    Save Draft
                </button>
            </div>
        </header>

        <div className="flex flex-1 overflow-hidden relative">

            {/* Left Sidebar - Chat & Outline */}
            <aside className={`
                ${mobileView === 'tools' ? 'flex' : 'hidden'} md:flex
                w-[360px] bg-[#09090b] border-r border-white/10 flex-col z-20 shadow-2xl
            `}>
                <div className="flex border-b border-white/10">
                    <button onClick={() => setLeftTab('chat')} className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest transition-colors ${leftTab === 'chat' ? 'text-white bg-white/5 border-b-2 border-white' : 'text-neutral-500 hover:text-neutral-300'}`}>Co-Author</button>
                    <button onClick={() => setLeftTab('outline')} className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest transition-colors ${leftTab === 'outline' ? 'text-white bg-white/5 border-b-2 border-white' : 'text-neutral-500 hover:text-neutral-300'}`}>Outline</button>
                </div>

                <div className="flex-1 overflow-hidden relative flex flex-col">
                    {leftTab === 'chat' && (
                        <>
                            {/* GOOGLE AI STUDIO STYLE CHAT LIST (FLAT, NO BUBBLES) */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
                                {messages.map((msg, idx) => (
                                    <div key={msg.id} className="py-6 px-5 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group">
                                        
                                        {/* Header Row */}
                                        <div className="flex items-center gap-3 mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                            {msg.role === 'user' ? (
                                                <div className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center border border-white/10">
                                                    <span className="text-[10px] font-bold text-neutral-400">U</span>
                                                </div>
                                            ) : (
                                                <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                                                    <IconSparkles className="w-3 h-3 text-indigo-400" />
                                                </div>
                                            )}
                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${msg.role === 'user' ? 'text-neutral-500' : 'text-indigo-400'}`}>
                                                {msg.role === 'user' ? 'User' : 'Co-Author'}
                                            </span>
                                        </div>

                                        {/* Message Body - Flat text */}
                                        <div className={`pl-8 text-sm leading-7 font-medium whitespace-pre-wrap font-sans ${msg.role === 'user' ? 'text-white' : 'text-neutral-300'}`}>
                                            {/* Display Attachments if any */}
                                            {msg.attachments && msg.attachments.length > 0 && (
                                                <div className="flex gap-2 mb-3 overflow-x-auto">
                                                    {msg.attachments.map((src, i) => (
                                                        <img key={i} src={src} alt="attachment" className="h-20 w-auto rounded-lg border border-white/10 shadow-sm" />
                                                    ))}
                                                </div>
                                            )}
                                            {msg.text}
                                            
                                            {/* Tool Use Indicator */}
                                            {msg.isToolUse && (
                                                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded bg-green-500/10 border border-green-500/20 text-[10px] text-green-400 font-mono uppercase tracking-wider">
                                                    <IconCheck className="w-3 h-3" /> Execution Complete
                                                </div>
                                            )}

                                            {/* Streaming Cursor */}
                                            {msg.role === 'ai' && msg.isStreaming && idx === messages.length - 1 && (
                                                <span className="inline-block w-2 h-4 ml-1 bg-indigo-500 animate-pulse align-middle"></span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Enhanced Multimodal Input Area */}
                            <div className="p-4 bg-[#09090b] border-t border-white/10">
                                {/* Attachment Previews */}
                                {attachmentPreviews.length > 0 && (
                                    <div className="flex gap-2 mb-3 px-1 overflow-x-auto custom-scrollbar">
                                        {attachmentPreviews.map((src, idx) => (
                                            <div key={idx} className="relative group flex-shrink-0">
                                                <img src={src} alt="preview" className="h-14 w-14 object-cover rounded-lg border border-white/10 shadow-md" />
                                                <button 
                                                    onClick={() => removeAttachment(idx)} 
                                                    className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-black rounded-full text-white border border-white/20 hover:bg-red-500 transition-colors shadow-sm"
                                                >
                                                    <IconX className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className={`bg-[#151515] border rounded-[28px] p-2 flex items-end gap-2 shadow-lg transition-colors ${isBusy ? 'border-indigo-500/30 opacity-50' : 'border-white/10 focus-within:border-white/20'}`}>

                                    {/* Attachment Button */}
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isBusy}
                                        className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors flex-shrink-0 mb-0.5"
                                        title="Add Image/File"
                                    >
                                        <IconPlus className="w-4 h-4" />
                                    </button>
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        className="hidden" 
                                        onChange={handleFileSelect} 
                                        accept="image/*,application/pdf" 
                                        multiple 
                                    />

                                    {/* Mic Button */}
                                    <button
                                        onMouseDown={startRecording}
                                        onMouseUp={stopRecording}
                                        onTouchStart={startRecording}
                                        onTouchEnd={stopRecording}
                                        disabled={isBusy}
                                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0 mb-0.5 ${isListening ? 'bg-red-500 text-white scale-110' : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'}`}
                                        title="Hold to Speak"
                                    >
                                        {isListening ? <IconStop className="w-4 h-4" /> : <IconMic className="w-4 h-4" />}
                                    </button>

                                    <textarea
                                        ref={textareaRef}
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        placeholder={isListening ? "Listening..." : (attachments.length > 0 ? "Describe this file..." : "Ask Co-Author...")}
                                        className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-neutral-600 py-2.5 max-h-32 resize-none custom-scrollbar font-medium"
                                        rows={1}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendMessage();
                                            }
                                        }}
                                        disabled={isBusy}
                                        style={{ minHeight: '40px' }}
                                    />

                                    {/* Send/Run Button */}
                                    <button
                                        onClick={() => handleSendMessage()}
                                        disabled={(!input.trim() && attachments.length === 0 && !isBusy)}
                                        className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0 disabled:opacity-50 disabled:scale-100 mb-0.5"
                                        title="Run"
                                    >
                                        {isBusy ? <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div> : <IconArrowLeft className="w-4 h-4 rotate-180" />}
                                    </button>
                                </div>
                                <div className="flex justify-between items-center mt-2 px-2">
                                    <p className="text-[9px] text-neutral-600 font-mono tracking-wide">
                                        GEMINI 2.5 FLASH
                                    </p>
                                    <p className="text-[9px] text-neutral-600 font-mono tracking-wide">
                                        {input.length} chars
                                    </p>
                                </div>
                            </div>
                        </>
                    )}

                    {leftTab === 'outline' && (
                         <div className="p-4 space-y-2 overflow-y-auto custom-scrollbar flex-1">
                             <div className="flex items-center justify-between mb-4 px-2">
                                 <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Chapters</h3>
                                 <span className="text-[10px] text-neutral-600 font-mono">{pages.length} Pages</span>
                             </div>
                             {pages.map((p, idx) => (
                                 <button
                                    key={p.id}
                                    onClick={() => setActivePageId(p.id)}
                                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all group ${
                                        activePageId === p.id
                                        ? 'bg-white/10 border-white/20 text-white shadow-lg'
                                        : 'border-transparent text-neutral-500 hover:bg-white/5 hover:text-neutral-300'
                                    }`}
                                 >
                                     <div className="flex items-center justify-between mb-1">
                                         <span className="text-[9px] uppercase font-bold opacity-50 tracking-wider">Chapter {idx + 1}</span>
                                         {activePageId === p.id && <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>}
                                     </div>
                                     <span className="font-bold truncate block">{p.title}</span>
                                 </button>
                             ))}
                             <button
                                onClick={() => {
                                    const newId = Date.now().toString();
                                    setPages([...pages, { id: newId, title: 'New Chapter', content: '', pageNumber: pages.length + 1 }]);
                                    setActivePageId(newId);
                                }}
                                className="w-full py-4 border border-dashed border-white/10 text-neutral-500 text-xs font-bold uppercase rounded-xl hover:border-white/30 hover:text-white mt-4 transition-all flex items-center justify-center gap-2"
                             >
                                 <IconPlus className="w-3 h-3" /> Add Chapter
                             </button>
                         </div>
                    )}
                </div>
            </aside>

            {/* Main Editor Area */}
            <main className="flex-1 flex flex-col relative bg-[#000000]">

                {/* Editor Header Bar */}
                <div className="h-10 bg-[#050505] border-b border-white/5 flex items-center justify-between px-6 select-none shrink-0">
                     <div className="flex items-center gap-4">
                         <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] truncate max-w-[200px]">{activePage.title}</span>
                     </div>
                     <div className="flex items-center gap-4">
                         <span className="text-[9px] font-mono text-neutral-600 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                            {wordCount} WORDS
                         </span>
                         <div className="flex items-center gap-2">
                             <div className={`w-1.5 h-1.5 rounded-full ${isBusy ? 'bg-indigo-500 animate-pulse' : 'bg-green-500'} shadow-glow`}></div>
                             <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{isBusy ? 'Syncing...' : 'Saved'}</span>
                         </div>
                     </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth">
                    <NovelEditor
                        title={activePage.title}
                        onTitleChange={(t) => setPages(prev => prev.map(p => p.id === activePageId ? {...p, title: t} : p))}
                        content={activePage.content}
                        onContentChange={(c) => setPages(prev => prev.map(p => p.id === activePageId ? {...p, content: c} : p))}
                        onTriggerAI={(p) => handleSendMessage(undefined, `Write content: ${p}`)}
                        onTriggerImageGen={(p) => handleSendMessage(undefined, `Generate an image: ${p}`)}
                    />
                </div>

            </main>
        </div>
    </div>
  );
};

export default EbookStudioPage;
