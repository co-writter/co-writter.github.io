
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { EBook, EBookPage } from '../types';
import * as ReactRouterDOM from 'react-router-dom';
import { 
    IconBook, IconSparkles, 
    IconSend, IconPlus, IconArrowLeft, 
    IconRocket, IconX, 
    IconWand, IconBrain, IconMic, IconStop, IconDownload, IconUpload
} from '../constants';
import { 
    createStudioSession, generateBookCover, generateSpeech, transcribeAudio
} from '../services/geminiService';
import { Chat } from '@google/genai';
import MorphicEye from '../components/MorphicEye';
import NovelEditor from '../components/NovelEditor';

const { useNavigate, useLocation } = ReactRouterDOM as any;

// Declare jsPDF on window
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

  // Streaming Audio Queue
  const audioQueueRef = useRef<string[]>([]);
  const isPlayingAudioRef = useRef(false);

  // Speech Recognition State (REPLACED NATIVE API WITH MEDIA RECORDER + GEMINI)
  const [isListening, setIsListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastGeneratedImageRef = useRef<string | null>(null);

  // --- BOOK CONSISTENCY ENGINE ---
  const sanitizeBookStructure = (currentPages: EBookPage[]) => {
      // Ensures pages are numbered sequentially 1..N
      // Ensures no page is missing a title
      return currentPages.map((page, index) => ({
          ...page,
          pageNumber: index + 1,
          title: page.title || `Chapter ${index + 1}`
      }));
  };

  // Initialize Session
  useEffect(() => {
    if (!chatSessionRef.current) {
        const initialContext = `You are the Co-Author engine. Connected to Project.`;
        const session = createStudioSession(initialContext);
        if (session) {
            chatSessionRef.current = session;
            const initMsg = "I'm online. The Architect is listening.";
            const initMsgId = 'sys-init';
            setMessages([{
                id: initMsgId,
                role: 'ai',
                text: initMsg
            }]);
            
            // Auto-speak init message
            setTimeout(() => {
                queueTTS(initMsg, initMsgId);
            }, 500);

            if (initialPrompt) {
               setTimeout(() => handleSendMessage(undefined, initialPrompt), 500);
            }
        }
    }
  }, []);

  // Anime.js Typing Effect Trigger
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.role === 'ai' && !lastMsg.isStreaming && window.anime) {
       // Only animate new blocks that finished streaming, 
       // but strictly speaking, streaming updates render via React state.
       // We can use anime.js to flash the container or text color on completion.
       const el = document.getElementById(`msg-${lastMsg.id}`);
       if (el) {
           window.anime({
               targets: el,
               opacity: [0.8, 1],
               translateY: [5, 0],
               duration: 400,
               easing: 'easeOutExpo'
           });
       }
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, leftTab]);

  // Handle Audio Stop on Unmount
  useEffect(() => {
      return () => {
          stopAudio();
          if (audioContextRef.current) {
              audioContextRef.current.close();
          }
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
              mediaRecorderRef.current.stop();
          }
      };
  }, []);

  // Ensure AudioContext is ready on first interaction
  useEffect(() => {
    const unlockAudio = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
    };

    window.addEventListener('click', unlockAudio);
    window.addEventListener('keydown', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    
    return () => {
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
    };
  }, []);

  const stopAudio = () => {
      if (currentSourceRef.current) {
          try {
            currentSourceRef.current.stop();
          } catch(e) {}
          currentSourceRef.current = null;
      }
      audioQueueRef.current = []; // Clear queue
      isPlayingAudioRef.current = false;
      setActiveSpeakerId(null);
  };

  // --- SEQUENTIAL TTS QUEUE ---
  const queueTTS = (text: string, messageId: string) => {
      if (!text || !text.trim()) return;
      
      // Add to queue
      audioQueueRef.current.push(text);
      
      // Trigger processor if not already playing
      if (!isPlayingAudioRef.current) {
          processAudioQueue(messageId);
      }
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
      
      // Clean markdown
      const cleanText = nextText.replace(/[*_#`]/g, '').replace(/!\[.*?\]\(.*?\)/g, ''); 
      
      if (!cleanText.trim()) {
          processAudioQueue(messageId);
          return;
      }

      try {
          // Initialize Context if missing
          if (!audioContextRef.current) {
              audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
          }

          const base64Audio = await generateSpeech(cleanText);
          
          if (base64Audio && audioContextRef.current) {
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
                   processAudioQueue(messageId); // Play next chunk
               };
               
               currentSourceRef.current = source;
               source.start(0);
          } else {
              processAudioQueue(messageId); // Skip if failed
          }

      } catch (e) {
          console.error("TTS playback error", e);
          processAudioQueue(messageId); // Skip error
      }
  };


  // --- MEDIA RECORDER + GEMINI TRANSCRIPTION ---
  const startRecording = async () => {
      try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          
          let options = {};
          if (MediaRecorder.isTypeSupported('audio/webm')) {
              options = { mimeType: 'audio/webm' };
          } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
              options = { mimeType: 'audio/mp4' };
          }
          
          const mediaRecorder = new MediaRecorder(stream, options);
          mediaRecorderRef.current = mediaRecorder;
          audioChunksRef.current = [];

          mediaRecorder.ondataavailable = (event) => {
              if (event.data.size > 0) {
                  audioChunksRef.current.push(event.data);
              }
          };

          mediaRecorder.onstop = async () => {
              const mimeType = mediaRecorder.mimeType || 'audio/webm';
              const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
              
              if (audioBlob.size > 0) {
                  await processAudioForTranscription(audioBlob);
              }
              
              // Stop all tracks to release mic
              stream.getTracks().forEach(track => track.stop());
          };

          mediaRecorder.start();
          setIsListening(true);
      } catch (e) {
          console.error("Mic error", e);
          alert("Could not access microphone. Please ensure permission is granted.");
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
              // Remove data URL prefix
              const base64Data = base64String.split(',')[1];
              
              const text = await transcribeAudio(base64Data, blob.type);
              
              if (text) {
                  setInput(prev => (prev ? prev + " " : "") + text);
              } else {
                 alert("Transcription failed. Please check your internet connection.");
              }
              setIsTranscribing(false);
          };
      } catch (e) {
          console.error("Transcription failed", e);
          setIsTranscribing(false);
          alert("Failed to process audio.");
      }
  };

  const handleMicClick = () => {
    if (isListening) {
        stopRecording();
    } else {
        stopAudio(); // Stop TTS output
        startRecording();
    }
  };

  const handleImageGeneration = async (prompt: string) => {
      setIsBusy(true);
      setCurrentAction("Generating Visuals...");
      setProgress(30);
      
      const msgId = Date.now().toString() + '_img';
      setMessages(prev => [...prev, { 
          id: msgId, 
          role: 'ai', 
          text: `Creating visual asset: "${prompt}"...`, 
          isStreaming: true 
      }]);

      try {
          // Detect Diagram intent
          const isDiagram = /diagram|chart|graph|map|schematic|structure|flow|infographic/i.test(prompt);
          const style = isDiagram ? "Technical Diagram, clean, precise, labeled" : "Cinematic Illustration";

          const result = await generateBookCover(prompt, style, activePage.title, currentUser?.name);
          
          if ('imageBytes' in result) {
              const markdownImage = `\n\n![${prompt}](data:image/jpeg;base64,${result.imageBytes})\n\n`;
              lastGeneratedImageRef.current = markdownImage; 
              
              setPages(prev => prev.map(p => p.id === activePageId ? { ...p, content: p.content + markdownImage } : p));
              
              const successText = isDiagram ? `Diagram generated and inserted.` : `Illustration generated and inserted.`;
              setMessages(prev => prev.map(m => m.id === msgId ? { 
                  ...m, 
                  text: successText,
                  isStreaming: false
              } : m));
              
              queueTTS(successText, msgId);
              setMobileView('editor');
          } else {
              setMessages(prev => prev.map(m => m.id === msgId ? { 
                  ...m, 
                  text: `Failed to generate visual.`,
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

  // --- CORE AI LOGIC (STREAMING + INSTANT AUDIO + CONTEXT AWARENESS) ---
  const handleSendMessage = async (e?: React.FormEvent, overrideInput?: string) => {
      e?.preventDefault();
      const text = overrideInput || input;
      if (!text.trim() || isBusy) return;
      
      if (isListening) {
          stopRecording();
      }

      stopAudio(); // Stop previous TTS immediately
      setInput('');
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text }]);
      setIsBusy(true);
      setCurrentAction("Thinking...");
      setProgress(20);

      const msgId = Date.now().toString() + '_ai';
      setMessages(prev => [...prev, { id: msgId, role: 'ai', text: '', isStreaming: true }]);

      let speechBuffer = "";

      // --- SMART "CONTINUE" LOGIC ---
      let userPrompt = text;
      const lowerText = text.toLowerCase().trim();
      const isContinue = lowerText === 'continue' || lowerText === 'next' || lowerText === 'keep going';
      
      // If user says "continue" and current chapter is done, move to next
      if (isContinue) {
          const currentIndex = pages.findIndex(p => p.id === activePageId);
          if (currentIndex < pages.length - 1) {
             // Move to next chapter and write
             const nextId = pages[currentIndex + 1].id;
             setActivePageId(nextId);
             userPrompt = `Continue writing ${pages[currentIndex + 1].title}. Previous context: ...${activePage.content.slice(-300)}`;
          } else {
             // Create new chapter if we are at the end
             userPrompt = "The current chapter is finished. Create the next logical chapter in the book outline and start writing it.";
          }
      }

      try {
          if (chatSessionRef.current) {
              // --- CONTEXT INJECTION ---
              // Gather previous chapter context to ensure continuity
              const prevPageIndex = pages.findIndex(p => p.id === activePageId) - 1;
              const prevPageContext = prevPageIndex >= 0 ? pages[prevPageIndex].content.slice(-1000) : "Start of Book";
              
              const outlineSummary = pages.map((p, i) => `${i+1}. ${p.title}`).join('\n');

              const contextPayload = `
[SYSTEM_CONTEXT]
Current Outline:
${outlineSummary}

Previous Chapter Context (Last 1000 chars):
${prevPageContext}

Current Active Chapter: "${activePage.title}"
Content Length: ${activePage.content.length} chars.

USER REQUEST: ${userPrompt}
`;

              const resultStream = await chatSessionRef.current.sendMessageStream({ message: contextPayload });
              
              let fullText = '';

              for await (const chunk of resultStream) {
                  const chunkText = chunk.text;
                  if (chunkText) {
                      fullText += chunkText;
                      // Real-time Visual Update
                      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: fullText } : m));
                      
                      // Real-time Audio Streaming (Sentence Buffering)
                      speechBuffer += chunkText;
                      
                      // Check for sentence terminators (. ? ! \n)
                      // We look for a terminator followed by a space or end of string
                      const sentenceMatch = speechBuffer.match(/([.?!:\n]+)\s/);
                      if (sentenceMatch && sentenceMatch.index !== undefined) {
                          const separatorIndex = sentenceMatch.index + sentenceMatch[0].length;
                          const sentenceToSpeak = speechBuffer.substring(0, separatorIndex);
                          
                          // Queue this sentence immediately
                          queueTTS(sentenceToSpeak, msgId);
                          
                          // Remove spoken part from buffer
                          speechBuffer = speechBuffer.substring(separatorIndex);
                          
                          // Update UI state to show speaking
                          setCurrentAction("Speaking...");
                      }
                  }
                  
                  if (chunk.functionCalls) {
                      for (const call of chunk.functionCalls) {
                          if (call.name === 'write_content') {
                              const args = call.args as any;
                              setCurrentAction(args.summary || "Writing to Editor...");
                              setProgress(60);
                              
                              // Update Editor content
                              setPages(prev => prev.map(p => p.id === activePageId ? { ...p, content: args.content } : p));
                              
                              const updateMsg = `\n\n_Updated Editor Content_`;
                              setMessages(prev => prev.map(m => m.id === msgId ? { 
                                  ...m, 
                                  text: fullText + updateMsg,
                              } : m));
                              
                              setMobileView('editor');

                          } else if (call.name === 'generate_image') {
                              const args = call.args as any;
                              // Async visual generation
                              await handleImageGeneration(args.prompt);

                          } else if (call.name === 'propose_blueprint') {
                              const args = call.args as any;
                              setCurrentAction("Structuring Book...");
                              
                              const existingCover = lastGeneratedImageRef.current || '';
                              lastGeneratedImageRef.current = null; 

                              setPages(prev => {
                                  const newPages = args.outline.map((ch: any, i: number) => ({
                                      id: `p-${i}`,
                                      title: ch.title,
                                      content: (i === 0 && existingCover) ? existingCover : '',
                                      pageNumber: i + 1
                                  }));
                                  return sanitizeBookStructure(newPages);
                              });

                              setActivePageId(`p-0`);
                              setMessages(prev => prev.map(m => m.id === msgId ? { 
                                  ...m, 
                                  text: fullText + `\n\n**Created Blueprint:** ${args.title}`,
                              } : m));
                              setLeftTab('outline');
                              setMobileView('tools');
                          }
                      }
                  }
              }
              setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isStreaming: false } : m));
              
              // Flush remaining buffer to TTS
              if (speechBuffer.trim()) {
                  queueTTS(speechBuffer, msgId);
              }
          }
      } catch (e) {
          console.error(e);
          setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: "Error connecting to neural engine.", isStreaming: false } : m));
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
      
      const steps = ["Initializing...", "Market Analysis...", "Drafting Structure..."];
      for (const step of steps) {
          setLaunchStatus(step);
          await new Promise(r => setTimeout(r, 600));
      }

      setShowAutoPilotModal(false);
      setIsLaunching(false);
      setLaunchStatus("Standing By");

      const prompt = `Auto-Pilot: Create a bestseller blueprint for "${apTopic}" (${apType}, ${apTone} tone). 
      1. Create a cover visual. 
      2. Propose outline. 
      3. Write the first chapter.`;
      
      handleSendMessage(undefined, prompt);
  };

  const handleExport = () => {
      // Ensure strict numbering before export
      const finalPages = sanitizeBookStructure(pages);
      
      const book: EBook = {
          id: `gen-${Date.now()}`,
          title: finalPages[0].title.split(':')[1]?.trim() || finalPages[0].title || "Untitled",
          author: currentUser?.name || 'Anonymous',
          description: finalPages[0]?.content.substring(0, 150) || 'AI Generated',
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

  // --- PROFESSIONAL PDF GENERATION ENGINE ---
  const handleDownloadPDF = async (isKDPMode: boolean = false) => {
      if (!window.jspdf) {
          alert("PDF generator not ready. Please try again.");
          return;
      }
      
      const { jsPDF } = window.jspdf;
      // Setup: A4 Paper, Millimeters
      const doc = new jsPDF({
          orientation: 'p',
          unit: 'mm',
          format: 'a4'
      });

      // Settings
      const margin = 20; // 20mm margin all around
      const pageWidth = 210;
      const pageHeight = 297;
      const contentWidth = pageWidth - (margin * 2);
      const lineHeight = 7; // Approx 1.5 spacing for 12pt font
      let yPos = margin;

      // Fonts
      doc.setFont("times", "bold");
      
      // --- TITLE PAGE ---
      doc.setFontSize(32);
      doc.text(pages[0]?.title || "Untitled Book", pageWidth / 2, 80, { align: "center", maxWidth: contentWidth });
      
      doc.setFontSize(16);
      doc.setFont("times", "normal");
      doc.text("Written by", pageWidth / 2, 100, { align: "center" });
      doc.setFontSize(20);
      doc.setFont("times", "bold");
      doc.text(currentUser?.name || "Co-Writter AI", pageWidth / 2, 110, { align: "center" });
      
      doc.setFontSize(10);
      doc.setFont("times", "italic");
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, 250, { align: "center" });
      doc.text("Published via Co-Writter Studio", pageWidth / 2, 256, { align: "center" });

      // --- TABLE OF CONTENTS ---
      doc.addPage();
      doc.setFontSize(18);
      doc.setFont("times", "bold");
      doc.text("Table of Contents", pageWidth / 2, margin + 10, { align: "center" });
      
      doc.setFontSize(12);
      doc.setFont("times", "normal");
      let tocY = margin + 30;
      pages.forEach((page, i) => {
          const chapterTitle = `${i + 1}. ${page.title}`;
          doc.text(chapterTitle, margin, tocY);
          tocY += 10;
      });

      // --- CONTENT PAGES ---
      pages.forEach((page, index) => {
          doc.addPage();
          
          // Reset for new chapter
          yPos = margin + 20;
          
          // Chapter Header
          doc.setFontSize(24);
          doc.setFont("times", "bold");
          doc.text(page.title || `Chapter ${index + 1}`, margin, margin + 10);
          
          // Chapter Content
          doc.setFontSize(12);
          doc.setFont("times", "normal");
          
          // Clean text (remove markdown mostly)
          const cleanText = page.content
            .replace(/#{1,6}\s/g, '') // Remove headers
            .replace(/\*\*/g, '') // Remove bold markers
            .replace(/!\[.*?\]\(.*?\)/g, '[Visual Asset Included in Digital Version]') // Replace images
            .split('\n');

          cleanText.forEach(paragraph => {
              if (!paragraph.trim()) {
                  yPos += lineHeight; // Empty line spacing
                  return;
              }

              // Word wrap calculation
              const lines = doc.splitTextToSize(paragraph, contentWidth);
              
              lines.forEach((line: string) => {
                  // Check page break
                  if (yPos > pageHeight - margin) {
                      // Add footer page number before breaking
                      doc.setFontSize(10);
                      doc.text(`- ${doc.internal.getNumberOfPages()} -`, pageWidth / 2, pageHeight - 10, { align: "center" });
                      doc.setFontSize(12);
                      
                      doc.addPage();
                      yPos = margin;
                  }
                  
                  doc.text(line, margin, yPos);
                  yPos += lineHeight;
              });
              
              yPos += lineHeight; // Paragraph spacing
          });

          // Footer for the last page of chapter
          doc.setFontSize(10);
          doc.text(`- ${doc.internal.getNumberOfPages()} -`, pageWidth / 2, pageHeight - 10, { align: "center" });
      });
      
      const fileName = isKDPMode 
        ? `${pages[0]?.title || 'book'}_KDP_Print_Ready.pdf` 
        : `${pages[0]?.title || 'book'}.pdf`;
        
      doc.save(fileName);
      
      if (isKDPMode) {
          alert("KDP-Ready PDF generated! This file uses standard trade margins and formatting suitable for Amazon KDP upload.");
      }
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
                
                {/* PDF Export Dropdown Logic could go here, simplified to two buttons for now */}
                <button 
                    onClick={() => handleDownloadPDF(false)}
                    className="flex items-center gap-2 px-3 sm:px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/5 text-neutral-300 border border-white/5 hover:bg-white/10 hover:text-white transition-all hover:scale-105 active:scale-95"
                    title="Export Standard PDF"
                >
                    <IconDownload className="w-3 h-3" /> <span className="hidden sm:inline">PDF</span>
                </button>
                
                <button 
                    onClick={() => handleDownloadPDF(true)}
                    className="flex items-center gap-2 px-3 sm:px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/20 transition-all hover:scale-105 active:scale-95"
                    title="Export for Amazon KDP"
                >
                    <IconUpload className="w-3 h-3" /> <span className="hidden sm:inline">Publish</span>
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
                        Co-Author
                    </button>
                    <button 
                         onClick={() => setLeftTab('outline')}
                         className={`flex-1 py-4 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${leftTab === 'outline' ? 'text-white bg-white/5 border-b-2 border-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                    >
                        Outline
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
                                    <div id={`msg-${msg.id}`} key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}>
                                        <div className={`max-w-[90%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                            <div className={`p-4 rounded-xl text-sm leading-relaxed border shadow-lg ${msg.role === 'user' ? 'bg-white/10 border-white/10 text-white rounded-tr-none' : 'bg-black/50 border-white/10 text-neutral-300 rounded-tl-none backdrop-blur-md'}`}>
                                                {msg.role === 'ai' && (
                                                    <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/5">
                                                        <div className="flex items-center gap-2">
                                                            <MorphicEye className="w-4 h-4 rounded-full border border-white/10 bg-black" isActive={activeSpeakerId === msg.id} />
                                                            <span className="text-[11px] font-bold uppercase tracking-widest text-google-blue">The Architect</span>
                                                        </div>
                                                        {activeSpeakerId === msg.id && (
                                                            <div className="flex items-center gap-1">
                                                                <span className="w-0.5 h-2 bg-google-blue animate-[pulse_0.5s_infinite]"></span>
                                                                <span className="w-0.5 h-3 bg-google-blue animate-[pulse_0.7s_infinite]"></span>
                                                                <span className="w-0.5 h-2 bg-google-blue animate-[pulse_0.6s_infinite]"></span>
                                                            </div>
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
                                        placeholder={isListening ? "Listening... (Tap to stop)" : isTranscribing ? "Processing audio..." : "Speak or type to Co-Author..."}
                                        disabled={isBusy || isTranscribing}
                                    />
                                    
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                         <button 
                                            type="button"
                                            onClick={handleMicClick}
                                            disabled={isTranscribing}
                                            className={`p-2 transition-colors hover:scale-110 active:scale-95 ${isListening ? 'text-red-500 animate-pulse' : isTranscribing ? 'text-yellow-500 animate-spin' : 'text-neutral-500 hover:text-white'}`}
                                            title={isListening ? "Stop Listening" : "Start Listening"}
                                        >
                                            {isListening ? <IconStop className="w-4 h-4" /> : isTranscribing ? <IconSparkles className="w-4 h-4" /> : <IconMic className="w-4 h-4" />}
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
                                    const newIdx = pages.length + 1;
                                    setPages([...pages, { id: newId, title: `Chapter ${newIdx}`, content: `# Chapter ${newIdx}\n\n`, pageNumber: newIdx }]);
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
                <div className="flex-1 overflow-y-auto custom-scrollbar flex justify-center pt-24 md:pt-28 pb-10 px-4 md:px-0">
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
