
import React, { useState } from 'react';
import { suggestBookPrice } from '../../services/geminiService';
import Spinner from '../Spinner';
import { EBook } from '../../types';
import { IconSparkles, BORDER_CLASS } from '../../constants';

interface AIPricingOptimizerProps {
  bookDetails: Pick<EBook, 'title' | 'genre' | 'description'>;
  onPriceSuggested: (price: string) => void;
}

const AIPricingOptimizer: React.FC<AIPricingOptimizerProps> = ({ bookDetails, onPriceSuggested }) => {
  const [suggestedPrice, setSuggestedPrice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuggestPrice = async () => {
    if (!bookDetails.title || !bookDetails.genre || !bookDetails.description) {
        setError("Please provide book title, genre, and description before suggesting a price.");
        return;
    }
    setIsLoading(true);
    setError(null);
    setSuggestedPrice(null);
    try {
      const price = await suggestBookPrice(bookDetails);
      // Check if the AI returned a valid number string, not an error message
      if (price.match(/^\d+(\.\d{1,2})?$/)) { 
        setSuggestedPrice(price); // price is already a string
        onPriceSuggested(price); 
      } else {
        // AI returned an error message (like "API Key not configured." or "Error connecting...")
        // or an unparseable price
        setError(price.startsWith("AI could not") || price.startsWith("Error connecting") || price.startsWith("API Key") ? price : 'AI returned an invalid price format. Please try again.');
        setSuggestedPrice(null); 
      }
    } catch (err) {
      setError('Failed to suggest price. The AI service might be unavailable.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`my-6 p-5 bg-neutral-800/60 rounded-md border ${BORDER_CLASS} shadow-md`}>
      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
        <IconSparkles className="w-5 h-5 mr-2.5 text-brand-accent" />
        AI Pricing Suggestion (INR)
      </h4>
      <button
        onClick={handleSuggestPrice}
        disabled={isLoading || !bookDetails.title || !bookDetails.genre || !bookDetails.description}
        className="bg-brand-accent text-black font-semibold py-2.5 px-5 rounded-full hover:bg-brand-accent-darker transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-accent-darker focus:ring-offset-2 focus:ring-offset-neutral-800 text-xs uppercase tracking-widest"
      >
        {isLoading ? <Spinner size="sm" color="text-black"/> : 'Suggest Price with AI'}
      </button>
      {error && <p className="text-red-400 mt-2.5 text-sm p-2 bg-red-900/30 rounded-sm border border-red-700/50">{error}</p>}
      {suggestedPrice && !error && (
        <div className="mt-3 p-3 bg-brand-accent/10 rounded-sm border border-brand-accent/30">
            <p className="text-brand-accent text-xl font-bold">
            AI Suggested Price: <span className="text-2xl">₹{parseFloat(suggestedPrice).toFixed(2)}</span>
            </p>
            <p className="text-xs text-brand-accent/70 mt-0.5">You can adjust this price manually.</p>
        </div>
      )}
      {(!bookDetails.title || !bookDetails.genre || !bookDetails.description) && !error && (
        <p className="text-xs text-neutral-400/80 mt-2">Fill in title, genre, and description to enable AI pricing.</p>
      )}
    </div>
  );
};

export default AIPricingOptimizer;
