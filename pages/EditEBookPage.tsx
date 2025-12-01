
import React, { useState, useEffect, FormEvent } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { EBook, GeneratedImage, UserType } from '../types';
import AIPricingOptimizer from '../components/AI/AIPricingOptimizer';
import AICoverGenerator from '../components/AI/AICoverGenerator';
import Spinner from '../components/Spinner';
import { IconBook, BORDER_CLASS, IconSparkles, IconUpload, IconWallet, IconRocket } from '../constants';

const { useParams, useNavigate } = ReactRouterDOM as any;

const commonInputClasses = `mt-1 block w-full bg-neutral-700/80 border ${BORDER_CLASS} rounded-sm shadow-sm py-2.5 px-3.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all duration-200 placeholder-neutral-400/70`;

const EditEBookPage: React.FC = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const appContext = useAppContext();
  const { allBooks, updateEBook, currentUser, userType } = appContext;

  const [bookToEdit, setBookToEdit] = useState<EBook | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState('');
  const [monetizationType, setMonetizationType] = useState<'paid' | 'free'>('paid');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [aiGeneratedCoverData, setAiGeneratedCoverData] = useState<GeneratedImage | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookId) {
      navigate('/dashboard'); // Or some error page
      return;
    }
    const book = allBooks.find(b => b.id === bookId);
    if (book) {
      if (currentUser && userType === UserType.SELLER && book.sellerId === currentUser.id) {
        setBookToEdit(book);
        setTitle(book.title);
        setAuthor(book.author);
        setDescription(book.description);
        setGenre(book.genre);
        setPrice(book.price.toString());
        setMonetizationType(book.price === 0 ? 'free' : 'paid');
        setCoverImageUrl(book.coverImageUrl); 
      } else {
        // Not the owner of the book or not a seller
        setFormError("You do not have permission to edit this eBook.");
        setTimeout(() => navigate('/dashboard'), 3000);
      }
    } else {
      setFormError("eBook not found.");
      setTimeout(() => navigate('/dashboard'), 3000);
    }
    setIsLoading(false);
  }, [bookId, allBooks, navigate, currentUser, userType]);

  const handlePriceSuggested = (suggestedPrice: string) => {
    if (monetizationType === 'paid') {
        setPrice(suggestedPrice);
    }
  };

  const handleCoverGenerated = (imageData: GeneratedImage) => {
    setAiGeneratedCoverData(imageData);
    setCoverImageUrl(`data:image/jpeg;base64,${imageData.imageBytes}`); // Update preview
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!bookToEdit) {
      setFormError("No book selected for editing.");
      return;
    }
    if (!title || !author || !description || !genre) {
      setFormError("Please fill in all required fields: Title, Author, Description, and Genre.");
      return;
    }

     // Check Price Logic
    let finalPrice = 0;
    if (monetizationType === 'paid') {
        if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
            setFormError("Please enter a valid positive price for paid books.");
            return;
        }
        finalPrice = parseFloat(price);
    } else {
        finalPrice = 0;
    }

    setIsSaving(true);
    
    const finalCoverImageUrl = aiGeneratedCoverData 
      ? `data:image/jpeg;base64,${aiGeneratedCoverData.imageBytes}`
      : coverImageUrl;

    const updatedBookData: EBook = {
      ...bookToEdit,
      title,
      author,
      description,
      genre,
      price: finalPrice,
      coverImageUrl: finalCoverImageUrl,
      publicationDate: bookToEdit.publicationDate, 
    };

    updateEBook(updatedBookData);
    setIsSaving(false);
    alert("eBook details updated successfully!");
    navigate('/dashboard'); 
  };

  if (isLoading) {
    return <div className="container mx-auto px-6 py-24 text-center"><Spinner size="lg" /></div>;
  }

  if (formError && !bookToEdit) { 
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <IconBook className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-3">Error</h1>
        <p className="text-red-400 text-lg">{formError}</p>
        <button 
            onClick={() => navigate('/dashboard')}
            className="mt-6 bg-brand-accent text-black font-semibold py-2 px-6 rounded-full hover:bg-brand-accent-darker transition-colors"
        >
            Back to Dashboard
        </button>
      </div>
    );
  }
  
  if (!bookToEdit) { 
    return <div className="container mx-auto px-6 py-24 text-center text-neutral-400">eBook data could not be loaded.</div>;
  }

  const bookDetailsForAI = { title, genre, description };

  return (
    <div className="container mx-auto px-4 sm:px-6 pt-24 pb-10">
      <form onSubmit={handleSubmit} className={`space-y-6 bg-brand-card-dark p-6 sm:p-8 rounded-md shadow-2xl border ${BORDER_CLASS} max-w-3xl mx-auto`}>
        <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
          <IconSparkles className="w-8 h-8 mr-3 text-brand-accent" /> Edit eBook Details
        </h2>
        
        {formError && (
          <div className={`p-3 mb-4 text-red-400 bg-red-900/30 border ${BORDER_CLASS} border-red-700/50 rounded-sm text-sm`}>
            {formError}
          </div>
        )}

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-neutral-300 mb-0.5">Title <span className="text-red-500">*</span></label>
          <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required 
                 className={commonInputClasses}/>
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-neutral-300 mb-0.5">Author <span className="text-red-500">*</span></label>
          <input type="text" id="author" value={author} onChange={e => setAuthor(e.target.value)} required
                 className={commonInputClasses}/>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-neutral-300 mb-0.5">Description <span className="text-red-500">*</span></label>
          <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} required
                    className={`${commonInputClasses} min-h-[120px]`}/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-neutral-300 mb-0.5">Genre <span className="text-red-500">*</span></label>
            <input type="text" id="genre" value={genre} onChange={e => setGenre(e.target.value)} required
                   placeholder="e.g., Sci-Fi, Fantasy, Thriller"
                   className={commonInputClasses}/>
          </div>
          
           {/* Dual Monetization Selector */}
           <div className="md:col-span-2">
             <label className="block text-sm font-medium text-neutral-300 mb-3">Monetization Strategy <span className="text-red-500">*</span></label>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                 
                 {/* Option 1: Paid */}
                 <div 
                    onClick={() => setMonetizationType('paid')}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all ${monetizationType === 'paid' ? 'bg-white/10 border-brand-accent shadow-glow' : 'bg-transparent border-white/10 hover:border-white/30'}`}
                 >
                     <div className="flex items-center gap-3 mb-2">
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center ${monetizationType === 'paid' ? 'bg-google-green text-black' : 'bg-white/10 text-neutral-400'}`}>
                             <IconWallet className="w-4 h-4" />
                         </div>
                         <h4 className={`font-bold ${monetizationType === 'paid' ? 'text-white' : 'text-neutral-400'}`}>Premium Asset</h4>
                     </div>
                     <p className="text-xs text-neutral-500">Earn royalties.</p>
                 </div>

                 {/* Option 2: Free */}
                 <div 
                    onClick={() => setMonetizationType('free')}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all ${monetizationType === 'free' ? 'bg-white/10 border-brand-accent shadow-glow' : 'bg-transparent border-white/10 hover:border-white/30'}`}
                 >
                     <div className="flex items-center gap-3 mb-2">
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center ${monetizationType === 'free' ? 'bg-google-blue text-black' : 'bg-white/10 text-neutral-400'}`}>
                             <IconRocket className="w-4 h-4" />
                         </div>
                         <h4 className={`font-bold ${monetizationType === 'free' ? 'text-white' : 'text-neutral-400'}`}>Growth Magnet</h4>
                     </div>
                     <p className="text-xs text-neutral-500">Free to read.</p>
                 </div>
             </div>

             {/* Dynamic Price Input */}
             {monetizationType === 'paid' && (
                <div className="animate-fade-in">
                    <label htmlFor="price" className="block text-sm font-medium text-neutral-300 mb-0.5">List Price (INR) <span className="text-red-500">*</span></label>
                    <input 
                        type="number" 
                        id="price" 
                        value={price} 
                        onChange={e => setPrice(e.target.value)} 
                        step="0.01" 
                        min="1" 
                        required={monetizationType === 'paid'}
                        placeholder="e.g., 499 or 299.50"
                        className={commonInputClasses}
                    />
                </div>
             )}
            </div>
        </div>

        {monetizationType === 'paid' && (
             <AIPricingOptimizer bookDetails={bookDetailsForAI} onPriceSuggested={handlePriceSuggested} />
        )}
        
        <AICoverGenerator 
            onCoverGenerated={handleCoverGenerated}
            currentTitle={title}
            currentAuthor={author}
        />
        
        <h4 className="text-md font-medium text-neutral-200 mt-4 mb-2">Current Cover Image:</h4>
        {coverImageUrl ? (
            <img src={coverImageUrl} alt="Current Cover" className={`w-40 h-auto rounded-sm border ${BORDER_CLASS} shadow-md mb-3`} />
        ) : (
            <p className="text-sm text-neutral-400 mb-3">No cover image set or using default.</p>
        )}
        
        <div>
            <label htmlFor="manualCoverImageUrl" className="block text-sm font-medium text-neutral-300 mb-0.5">
                Or Manually Update Cover Image URL
            </label>
            <input 
                type="url" 
                id="manualCoverImageUrl" 
                value={aiGeneratedCoverData ? '' : coverImageUrl} // Clear if AI cover is active
                onChange={e => {
                    setCoverImageUrl(e.target.value);
                    setAiGeneratedCoverData(null); // Clear AI cover if manual URL is typed
                }}
                placeholder="https://example.com/your-new-cover.jpg"
                className={commonInputClasses}
                disabled={!!aiGeneratedCoverData}
            />
             {aiGeneratedCoverData && <p className="text-xs text-brand-accent/80 mt-1">Using AI generated cover. Clear AI generation to set URL manually.</p>}
        </div>


        <div className="pt-6 border-t border-brand-border/30 flex flex-col sm:flex-row gap-3">
          <button 
            type="submit" 
            disabled={isSaving}
            className="w-full sm:w-auto flex-grow flex items-center justify-center bg-brand-accent text-black font-bold py-3 px-6 rounded-full hover:bg-brand-accent-darker transition-all duration-300 text-lg focus:outline-none focus:ring-4 focus:ring-brand-accent/50 focus:ring-offset-2 focus:ring-offset-brand-card-dark disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.99] uppercase tracking-widest text-xs"
          >
            {isSaving ? <Spinner size="sm" color="text-black" /> : <><IconUpload className="w-5 h-5 mr-2.5" /> Save Changes</>}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/dashboard')}
            disabled={isSaving}
            className={`w-full sm:w-auto bg-neutral-600 text-white font-medium py-3 px-6 rounded-full hover:bg-neutral-500 transition-all duration-300 text-lg border ${BORDER_CLASS} border-neutral-500 disabled:opacity-60 uppercase tracking-widest text-xs`}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEBookPage;
