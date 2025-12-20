
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
import StudioHeader from '../components/StudioHeader';

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
        if (!text.trim() && attachments.length === 0) return;

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

            <StudioHeader>
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
            </StudioHeader>


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
                                {/* GOOGLE AI STUDIO STYLE CHAT LIST (+ PREMIUM ENHANCEMENTS) */}
                                <div className="flex-1 overflow-y-auto custom-scrollbar p-0 bg-[#0c0c0e]">
                                    {messages.map((msg, idx) => (
                                        <div key={msg.id} className={`py-12 px-10 border-b border-white/[0.02] last:border-0 transition-all duration-500 group animate-fade-in ${msg.role === 'ai' ? 'bg-[#0f0f13]' : ''}`}>

                                            {/* Header Row */}
                                            <div className="flex items-start justify-between mb-6">
                                                <div className="flex items-center gap-5">
                                                    {msg.role === 'user' ? (
                                                        <div className="w-9 h-9 rounded-xl bg-neutral-900 flex items-center justify-center border border-white/10 shadow-lg text-neutral-400 text-[11px] font-black uppercase transition-all group-hover:border-white/20">
                                                            {currentUser?.name?.charAt(0) || 'U'}
                                                        </div>
                                                    ) : (
                                                        <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.08)] text-indigo-400 group-hover:scale-110 transition-transform">
                                                            <IconSparkles className="w-5 h-5 animate-pulse-slow" />
                                                        </div>
                                                    )}
                                                    <div className="flex flex-col">
                                                        <span className={`text-[12px] font-black uppercase tracking-[0.25em] ${msg.role === 'user' ? 'text-neutral-500' : 'text-indigo-400'}`}>
                                                            {msg.role === 'user' ? 'Author Context' : 'Neural Core v3'}
                                                        </span>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-[9px] text-neutral-700 font-mono">LATENCY: 12ms</span>
                                                            <div className="w-1 h-1 rounded-full bg-neutral-800"></div>
                                                            <span className="text-[9px] text-neutral-700 font-mono">ENCRYPTION: AES-256</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {msg.role === 'ai' && !msg.isStreaming && (
                                                    <div className="opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 flex gap-2">
                                                        <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-neutral-500 hover:text-white transition-all" title="Copy Content"><IconCheck className="w-4 h-4" /></button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Message Body */}
                                            <div className={`pl-14 text-[16px] leading-[1.8] font-light tracking-tight ${msg.role === 'user' ? 'text-white/90' : 'text-neutral-300'}`}>
                                                {msg.attachments && msg.attachments.length > 0 && (
                                                    <div className="flex flex-wrap gap-4 mb-8">
                                                        {msg.attachments.map((src, i) => (
                                                            <div key={i} className="relative group/img overflow-hidden rounded-[24px] border border-white/10 shadow-2xl bg-neutral-900">
                                                                <img src={src} alt="attachment" className="h-48 w-auto object-cover hover:scale-105 transition-transform duration-1000 cursor-zoom-in" />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none"></div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="prose prose-invert prose-base max-w-none prose-p:mb-5 prose-p:last:mb-0">
                                                    {msg.text}
                                                </div>

                                                {/* Tool Use Indicator */}
                                                {msg.isToolUse && (
                                                    <div className="mt-8 flex items-center gap-5 px-6 py-4 rounded-[24px] bg-white/[0.015] border border-white/[0.05] text-[10px] text-neutral-500 font-mono uppercase tracking-[0.3em] animate-pulse">
                                                        <div className="flex gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,1)]"></div>
                                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/40"></div>
                                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/20"></div>
                                                        </div>
                                                        Executing Creative Protocol...
                                                    </div>
                                                )}

                                                {/* Streaming Cursor */}
                                                {msg.role === 'ai' && msg.isStreaming && idx === messages.length - 1 && (
                                                    <span className="inline-block w-2.5 h-6 ml-3 bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.8)] animate-pulse align-middle rounded-sm"></span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Enhanced Multimodal Input Area (Industrial Pro) */}
                                <div className="p-6 bg-[#09090b] border-t border-white/[0.05]">
                                    {attachmentPreviews.length > 0 && (
                                        <div className="flex gap-2 mb-4 px-2 overflow-x-auto custom-scrollbar py-2">
                                            {attachmentPreviews.map((src, idx) => (
                                                <div key={idx} className="relative group flex-shrink-0 animate-scale-up">
                                                    <img src={src} alt="preview" className="h-20 w-20 object-cover rounded-2xl border-2 border-white/10 shadow-2xl transition-all group-hover:border-indigo-500/50" />
                                                    <button
                                                        onClick={() => removeAttachment(idx)}
                                                        className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-black rounded-full text-white border border-white/20 hover:bg-red-500 hover:border-red-500 transition-all shadow-xl scale-0 group-hover:scale-100"
                                                    >
                                                        <IconX className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className={`relative transition-all duration-300 ${isBusy ? 'opacity-50 grayscale' : 'opacity-100'}`}>
                                        <div className={`
                                        bg-[#141416] border rounded-[28px] p-2 flex flex-col group
                                        transition-all duration-500 shadow-[0_30px_60px_rgba(0,0,0,0.6)]
                                        ${isBusy ? 'border-white/5' : 'border-white/10 focus-within:border-indigo-500/40 focus-within:shadow-[0_20px_80px_rgba(99,102,241,0.15)]'}
                                    `}>
                                            <textarea
                                                ref={textareaRef}
                                                value={input}
                                                onChange={e => setInput(e.target.value)}
                                                placeholder={isListening ? "Listening for your prompt..." : "Message Co-Author..."}
                                                className="w-full bg-transparent border-none outline-none text-white text-[15px] placeholder-neutral-700 px-6 pt-5 pb-2 min-h-[70px] max-h-64 resize-none custom-scrollbar font-light leading-relaxed"
                                                rows={1}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        handleSendMessage();
                                                    }
                                                }}
                                                disabled={isBusy}
                                            />

                                            <div className="flex items-center justify-between p-3 mt-1">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => fileInputRef.current?.click()}
                                                        disabled={isBusy}
                                                        className="w-11 h-11 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] flex items-center justify-center text-neutral-500 hover:text-white transition-all active:scale-95 group/btn border border-white/5"
                                                        title="Upload Context"
                                                    >
                                                        <IconPlus className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                                    </button>
                                                    <button
                                                        onMouseDown={startRecording}
                                                        onMouseUp={stopRecording}
                                                        onTouchStart={startRecording}
                                                        onTouchEnd={stopRecording}
                                                        disabled={isBusy}
                                                        className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all active:scale-95 group/btn border border-white/5 ${isListening ? 'bg-red-500/20 text-red-500 border-red-500/30' : 'bg-white/[0.03] text-neutral-500 hover:text-white'}`}
                                                        title="Voice Input"
                                                    >
                                                        {isListening ? <IconStop className="w-5 h-5 animate-pulse" /> : <IconMic className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />}
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => handleSendMessage()}
                                                    disabled={(!input.trim() && attachments.length === 0 && !isBusy)}
                                                    className={`
                                                    h-11 px-8 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all overflow-hidden relative
                                                    ${(!input.trim() && !attachments.length) || isBusy
                                                            ? 'bg-neutral-900 text-neutral-700 cursor-not-allowed border border-white/5'
                                                            : 'bg-white text-black hover:bg-neutral-200 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.15)]'}
                                                `}
                                                >
                                                    {isBusy ? (
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-3.5 h-3.5 border-2 border-neutral-800 border-t-neutral-400 rounded-full animate-spin"></div>
                                                            Syncing
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-3">
                                                            Submit <IconSend className="w-4 h-4" />
                                                        </div>
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            onChange={handleFileSelect}
                                            accept="image/*,application/pdf"
                                            multiple
                                        />
                                        <div className="flex justify-between items-center mt-3 px-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-google-blue shadow-[0_0_5px_rgba(66,133,244,0.5)]"></div>
                                                <span className="text-[9px] text-neutral-500 font-black uppercase tracking-[0.2em]">Neural Engine v3.0</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[9px] text-neutral-600 font-mono tracking-widest uppercase">Context: {input.length} Tokens</span>
                                            </div>
                                        </div>
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
                                        className={`w-full text-left p-4 rounded-xl border text-sm transition-all group ${activePageId === p.id
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
                            onTitleChange={(t) => setPages(prev => prev.map(p => p.id === activePageId ? { ...p, title: t } : p))}
                            content={activePage.content}
                            onContentChange={(c) => setPages(prev => prev.map(p => p.id === activePageId ? { ...p, content: c } : p))}
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
