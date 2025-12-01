

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
          const imagePrompt = window.prompt("Describe the image you want to generate:");
          if (imagePrompt) {
              onTriggerImageGen(imagePrompt);
              onContentChange(textBefore + `\n![Generating: ${imagePrompt}...]()\n` + textAfter);
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
    <div className="w-full max-w-4xl mx-auto min-h-screen bg-transparent text-white p-4 md:p-8 relative font-sans selection:bg-white/20">
        
        {/* Title Area */}
        <div className="group mb-8 md:mb-12 relative">
             <input 
                type="text" 
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                className="w-full bg-transparent text-4xl md:text-6xl font-black text-white border-none outline-none placeholder-neutral-700 tracking-tighter leading-none"
                placeholder="Book Title"
            />
        </div>

        {/* Editor Area */}
        <div className="relative pb-32">
            <textarea 
                ref={textareaRef}
                value={content}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent resize-none border-none outline-none text-base md:text-xl leading-loose text-neutral-200 placeholder-neutral-700 min-h-[60vh] font-serif"
                placeholder="Start writing here... Type '/' for AI tools."
                spellCheck={false}
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
            />

            {/* Slash Command Menu */}
            {showSlashMenu && (
                <div 
                    ref={menuRef}
                    className="absolute top-20 left-0 z-50 w-64 max-w-[80vw] bg-black/90 backdrop-blur-xl border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden animate-slide-up rounded-xl"
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

        {/* Floating Hint */}
        <div className="fixed bottom-8 right-8 text-neutral-600 text-[10px] font-mono pointer-events-none hidden md:block uppercase tracking-widest bg-black/40 backdrop-blur px-2 py-1 rounded border border-white/5">
            {content.split(' ').length} words
        </div>
    </div>
  );
};

export default NovelEditor;