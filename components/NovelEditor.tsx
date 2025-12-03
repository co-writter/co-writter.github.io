
import React, { useState, useRef, useEffect } from 'react';
import { IconSparkles, IconImage } from '../constants';

interface NovelEditorProps {
  title: string;
  onTitleChange: (val: string) => void;
  content: string;
  onContentChange: (val: string) => void;
  onTriggerAI: (prompt: string) => void;
  onTriggerImageGen: (prompt: string) => void;
}

const NovelEditor: React.FC<NovelEditorProps> = ({ 
    title, 
    onTitleChange, 
    content, 
    onContentChange,
    onTriggerAI,
    onTriggerImageGen
}) => {
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuIndex, setSlashMenuIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const LINE_HEIGHT = 36; // px - Controls spacing of the lines

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  // Handle Slash Command Detection
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showSlashMenu) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSlashMenuIndex(prev => (prev + 1) % slashCommands.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSlashMenuIndex(prev => (prev - 1 + slashCommands.length) % slashCommands.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            executeCommand(slashCommands[slashMenuIndex]);
        } else if (e.key === 'Escape') {
            setShowSlashMenu(false);
        }
        return;
    }

    if (e.key === '/') {
        setShowSlashMenu(true);
        setSlashMenuIndex(0);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onContentChange(e.target.value);
      if (!e.target.value.includes('/')) {
          setShowSlashMenu(false);
      }
  };

  const executeCommand = (cmd: any) => {
      const cursorPos = textareaRef.current?.selectionStart || content.length;
      const textBefore = content.substring(0, cursorPos).replace(/\/$/, ''); // Remove the slash
      const textAfter = content.substring(cursorPos);
      
      if (cmd.id === 'generate') {
          onTriggerAI("Continue writing from here...");
          onContentChange(textBefore + textAfter);
      } else if (cmd.id === 'image') {
          // Context Intelligence: Grab the preceding paragraph to use as default prompt
          const lines = textBefore.trim().split('\n');
          const lastLine = lines[lines.length - 1]?.trim() || "";
          // Provide a helpful default. If paragraph is long, truncate for display, but logic below handles full text.
          const defaultPrompt = lastLine.length > 0 ? (lastLine.length > 100 ? lastLine.substring(0, 100) + "..." : lastLine) : "Illustration of...";
          
          const imagePrompt = window.prompt("Describe the image or diagram:", defaultPrompt);
          
          if (imagePrompt) {
              // If user kept the default (which might have '...'), try to use the full lastLine if it matches start
              let finalPrompt = imagePrompt;
              if (defaultPrompt.endsWith("...") && imagePrompt === defaultPrompt) {
                  finalPrompt = lastLine; 
              }
              
              onTriggerImageGen(finalPrompt);
              onContentChange(textBefore + `\n![Generating Visual: ${finalPrompt.substring(0, 25)}...]()\n` + textAfter);
          } else {
               onContentChange(textBefore + textAfter);
          }
      } else {
          const insertText = cmd.template;
          onContentChange(textBefore + insertText + textAfter);
      }
      setShowSlashMenu(false);
      textareaRef.current?.focus();
  };

  const slashCommands = [
      { id: 'h1', label: 'Big Heading', icon: 'H1', template: '\n# ' },
      { id: 'h2', label: 'Medium Heading', icon: 'H2', template: '\n## ' },
      { id: 'bullet', label: 'Bullet List', icon: '•', template: '\n- ' },
      { id: 'quote', label: 'Quote', icon: '“', template: '\n> ' },
      { id: 'generate', label: 'Ask Co-Author', icon: <IconSparkles className="w-4 h-4" />, template: '' },
      { id: 'image', label: 'Create Image', icon: <IconImage className="w-4 h-4" />, template: '' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto min-h-screen p-4 md:p-8 relative font-sans">
        
        {/* Notebook Container */}
        <div className="relative bg-[#121212] rounded-lg shadow-2xl min-h-[85vh] overflow-hidden border border-[#222]">
            
            {/* Title Area - Top of page */}
            <div className="p-8 md:px-12 md:pt-12 md:pb-4 border-b border-[#222] bg-[#121212] relative z-10">
                 <input 
                    type="text" 
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    className="w-full bg-transparent text-4xl md:text-5xl font-black text-white border-none outline-none placeholder-neutral-700 tracking-tighter leading-none"
                    placeholder="Untitled Book"
                />
            </div>

            {/* Editor Area with Lines */}
            <div className="relative w-full h-full pb-20">
                {/* Visual Margin Line */}
                <div className="absolute top-0 bottom-0 left-8 md:left-12 w-px bg-red-900/30 z-0 pointer-events-none h-full"></div>

                <textarea 
                    ref={textareaRef}
                    value={content}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent resize-none border-none outline-none text-lg text-neutral-300 placeholder-neutral-700 min-h-[70vh] font-serif relative z-10 pl-12 pr-8 md:pl-16 md:pr-16"
                    placeholder="Start writing..."
                    spellCheck={false}
                    style={{ 
                        lineHeight: `${LINE_HEIGHT}px`,
                        // Dark Paper (#121212) with Black Lines (#000000)
                        backgroundImage: `linear-gradient(transparent ${LINE_HEIGHT - 1}px, #000000 ${LINE_HEIGHT}px)`,
                        backgroundSize: `100% ${LINE_HEIGHT}px`,
                        backgroundAttachment: 'local',
                        paddingTop: '6px' // Fine tune to sit on line
                    }}
                />

                {/* Slash Command Menu */}
                {showSlashMenu && (
                    <div 
                        ref={menuRef}
                        className="absolute top-20 left-16 z-50 w-64 max-w-[80vw] bg-black/90 backdrop-blur-xl border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden animate-slide-up rounded-xl"
                    >
                        <div className="px-3 py-2 text-[9px] font-bold uppercase text-neutral-500 tracking-widest border-b border-white/10 bg-white/5">
                            Tools
                        </div>
                        {slashCommands.map((cmd, idx) => (
                            <button
                                key={cmd.id}
                                onClick={() => executeCommand(cmd)}
                                className={`w-full flex items-center gap-3 px-3 py-3 text-xs transition-colors ${idx === slashMenuIndex ? 'bg-white text-black' : 'text-neutral-300 hover:bg-white/5'}`}
                            >
                                <div className={`w-6 h-6 flex items-center justify-center font-bold text-[10px] rounded border ${idx === slashMenuIndex ? 'border-black/20 bg-black/5' : 'border-white/10 bg-white/5'}`}>
                                    {cmd.icon}
                                </div>
                                <span className="font-bold uppercase tracking-wide">{cmd.label}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Floating Word Count */}
        <div className="fixed bottom-8 right-8 text-neutral-500 text-[10px] font-mono pointer-events-none hidden md:block uppercase tracking-widest bg-black/80 backdrop-blur px-3 py-1.5 rounded border border-white/10 shadow-lg z-50">
            {content.split(/\s+/).filter(w => w.length > 0).length} words
        </div>
    </div>
  );
};

export default NovelEditor;
