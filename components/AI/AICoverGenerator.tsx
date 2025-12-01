
import React, { useState } from 'react';
import { generateBookCover } from '../../services/geminiService';
import Spinner from '../Spinner';
import { GeneratedImage } from '../../types';
import { IconSparkles, BORDER_CLASS, IconChevronDown } from '../../constants';

interface AICoverGeneratorProps {
  onCoverGenerated: (imageData: GeneratedImage) => void;
  currentTitle?: string;
  currentAuthor?: string;
}

const COVER_STYLES = [
    'Cinematic',
    'Minimalist',
    'Fantasy',
    'Sci-Fi',
    'Cyberpunk',
    'Oil Painting',
    'Watercolor',
    '3D Render',
    'Photorealistic',
    'Abstract',
    'Noir',
    'Vintage'
];

const AICoverGenerator: React.FC<AICoverGeneratorProps> = ({ onCoverGenerated, currentTitle, currentAuthor }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [style, setStyle] = useState<string>('Cinematic');
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCover = async () => {
    if (!prompt.trim()) {
        setError("Please enter a description for the cover.");
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateBookCover(prompt, style, currentTitle, currentAuthor);
      if ('error' in result) {
        setError(result.error);
        setGeneratedImage(null);
      } else {
        setGeneratedImage(result);
        onCoverGenerated(result);
      }
    } catch (err) {
      setError('Failed to generate cover image. The AI service may be temporarily unavailable.');
      setGeneratedImage(null);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`my-6 p-5 bg-neutral-800/60 rounded-md border ${BORDER_CLASS} shadow-md`}>
      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
        <IconSparkles className="w-5 h-5 mr-2.5 text-brand-accent" />
        AI Cover Generator
      </h4>

      {/* Style Selector */}
      <div className="mb-4">
        <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Art Style</label>
        <div className="relative">
            <select 
                value={style} 
                onChange={(e) => setStyle(e.target.value)}
                className={`w-full bg-neutral-700 text-white border ${BORDER_CLASS} rounded-sm py-2.5 px-3 appearance-none focus:ring-2 focus:ring-brand-accent focus:outline-none cursor-pointer transition-colors hover:bg-neutral-600`}
            >
                {COVER_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                <IconChevronDown className="w-4 h-4" />
            </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Description</label>
        <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your book cover (e.g., 'a lone astronaut gazing at a swirling nebula')"
            className={`w-full bg-neutral-700 text-white placeholder-neutral-400/70 border ${BORDER_CLASS} rounded-sm py-2.5 px-3.5 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all duration-200 min-h-[90px]`}
            rows={3}
            aria-label="Describe cover art for AI generation"
        />
      </div>

      <button
        onClick={handleGenerateCover}
        disabled={isLoading || !prompt.trim()}
        className="bg-brand-accent text-black font-semibold py-2.5 px-5 rounded-full hover:bg-brand-accent-darker transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-accent-darker focus:ring-offset-2 focus:ring-offset-neutral-800 text-xs uppercase tracking-widest"
      >
        {isLoading ? <Spinner size="sm" color="text-black" /> : 'Generate Cover with AI'}
      </button>
      
      {error && <p className="text-red-400 mt-2.5 text-sm p-2 bg-red-900/30 rounded-sm border border-red-700/50">{error}</p>}
      {isLoading && !error && <div className="mt-4 py-5 flex justify-center"><Spinner /></div>}
      
      {generatedImage && !error && (
        <div className="mt-5 pt-4 border-t border-brand-border/30">
          <h5 className="text-md font-semibold text-white mb-2.5">AI Generated Cover Preview:</h5>
          <div className="flex justify-center bg-black/20 p-4 rounded-lg">
            <img 
              src={`data:image/jpeg;base64,${generatedImage.imageBytes}`} 
              alt={generatedImage.revisedPrompt || generatedImage.prompt || 'Generated AI Cover'} 
              className={`rounded-sm border-2 ${BORDER_CLASS} border-brand-accent/50 max-w-sm w-full sm:w-2/3 md:w-1/2 mx-auto shadow-sharp-lg`}
            />
          </div>
          {generatedImage.revisedPrompt && <p className="text-xs text-neutral-400/80 mt-2 italic text-center">Revised prompt by AI: {generatedImage.revisedPrompt}</p>}
        </div>
      )}
    </div>
  );
};

export default AICoverGenerator;
