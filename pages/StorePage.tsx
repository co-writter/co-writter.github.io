
import React, { useState, useMemo } from 'react';
import BookCard from '../components/BookCard';
import { EBook } from '../types';
import { IconSparkles, BORDER_CLASS, IconShoppingCart, IconChevronDown, IconSearch, IconBook, IconStar } from '../constants';
import Modal from '../components/Modal'; 
import { useAppContext } from '../contexts/AppContext';
import * as ReactRouterDOM from 'react-router-dom';

const { useNavigate } = ReactRouterDOM as any;

const StorePage: React.FC = () => {
  const { addToCart, allBooks } = useAppContext(); 
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<'All' | 'Free' | 'Paid'>('All');
  const [sortBy, setSortBy] = useState('publicationDate'); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<EBook | null>(null);

  const genres = useMemo(() => ['All', ...new Set(allBooks.map(book => book.genre))], [allBooks]);

  const filteredAndSortedBooks = useMemo(() => {
    let books = allBooks.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedGenre !== 'All') {
      books = books.filter(book => book.genre === selectedGenre);
    }
    
    // Price Filter
    if (selectedPriceFilter === 'Free') {
        books = books.filter(book => book.price === 0);
    } else if (selectedPriceFilter === 'Paid') {
        books = books.filter(book => book.price > 0);
    }

    return books.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'price') {
        return a.price - b.price;
      } else if (sortBy === 'publicationDate') {
        return new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime();
      }
      return 0;
    });
  }, [searchTerm, selectedGenre, selectedPriceFilter, sortBy, allBooks]);

  // Prioritize "Quantum Minds" for the featured spot if available, else standard fallback
  const featuredBook = useMemo(() => {
      return allBooks.find(b => b.genre === 'Quantum Minds' && b.price > 0) || allBooks.find(b => b.price > 0) || allBooks[0];
  }, [allBooks]);

  const handleViewDetails = (bookId: string) => {
    const book = allBooks.find(b => b.id === bookId);
    if (book) {
      setSelectedBook(book);
      setIsModalOpen(true);
    }
  };

  const handleModalAction = () => {
    if (selectedBook) {
        if (selectedBook.price === 0) {
            navigate(`/read/${selectedBook.id}`);
        } else {
            addToCart(selectedBook);
            alert(`${selectedBook.title} added to cart!`);
        }
        setIsModalOpen(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 pt-24 pb-20 md:pb-24">
      
      {/* Featured Hero Section */}
      {featuredBook && !searchTerm && selectedGenre === 'All' && (
        <div className="relative w-full min-h-[550px] md:h-[500px] rounded-[32px] overflow-hidden mb-12 md:mb-16 group border border-white/10 shadow-2xl animate-fade-in flex flex-col justify-end md:block">
             {/* Background Image with Blur */}
             <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105"
                style={{backgroundImage: `url(${featuredBook.coverImageUrl})`}}
             ></div>
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent md:bg-gradient-to-r md:from-black md:via-black/80 md:to-transparent"></div>
             
             {/* Content */}
             <div className="relative z-10 p-6 md:p-16 flex flex-col justify-end md:justify-center h-full max-w-2xl">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-google-blue/20 border border-google-blue/30 w-fit mb-4 md:mb-6 backdrop-blur-md rounded-full animate-slide-up-stagger">
                     <IconStar className="w-3 h-3 text-google-blue fill-current" />
                     <span className="text-[10px] md:text-xs font-bold text-google-blue uppercase tracking-widest">Featured Release</span>
                 </div>
                 
                 <h1 className="text-3xl md:text-6xl font-black text-white mb-3 md:mb-4 leading-tight tracking-tight drop-shadow-lg animate-text-reveal">
                    {featuredBook.title}
                 </h1>
                 <p className="text-sm md:text-xl text-neutral-300 mb-6 md:mb-8 line-clamp-3 leading-relaxed drop-shadow-md animate-slide-up-stagger delay-200">
                    {featuredBook.description}
                 </p>
                 
                 <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 animate-slide-up-stagger delay-300">
                     <button 
                        onClick={() => handleViewDetails(featuredBook.id)}
                        className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-3.5 px-8 rounded-full hover:bg-white hover:text-black transition-all hover:scale-105 flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
                     >
                         View Details
                     </button>
                     <button 
                        onClick={() => {
                            if (featuredBook.price === 0) navigate(`/read/${featuredBook.id}`);
                            else addToCart(featuredBook);
                        }}
                        className="px-8 py-3.5 rounded-full bg-white text-black font-bold shadow-glow-white transition-all hover:scale-105 flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
                     >
                        {featuredBook.price === 0 ? <><IconBook className="w-4 h-4"/> Read Now</> : <><IconShoppingCart className="w-4 h-4"/> Add to Cart</>}
                     </button>
                 </div>
             </div>
        </div>
      )}

      <header className="mb-6 md:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4 animate-slide-up">
        <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3 animate-text-reveal">
            <IconSparkles className="w-5 h-5 md:w-6 md:h-6 text-brand-accent" />
            Full Catalog
            </h2>
            <p className="text-neutral-400 mt-1 text-sm md:text-base">Exploring {filteredAndSortedBooks.length} titles across all dimensions.</p>
        </div>
      </header>

      {/* Floating Filter Bar */}
      <div className="sticky top-20 md:top-24 z-30 mx-auto w-full mb-8 md:mb-10 transition-all duration-300 animate-slide-down">
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 shadow-sharp-lg rounded-3xl md:rounded-full flex flex-col md:flex-row md:items-center p-2 gap-2">
            
            {/* Search */}
            <div className="relative flex-grow group w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors">
                    <IconSearch className="w-5 h-5" />
                </div>
                <input 
                    type="text"
                    placeholder="Search by title or author..."
                    className="w-full bg-white/5 border border-transparent focus:border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-neutral-500 focus:outline-none focus:bg-white/10 transition-all text-sm font-medium"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Filters Group - Horizontal Scroll on Mobile */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar w-full md:w-auto px-1">
                
                {/* Genre */}
                <div className="relative flex-shrink-0">
                     <select
                        className="appearance-none bg-white/5 hover:bg-white/10 text-white font-medium text-xs md:text-sm py-3 pl-4 pr-9 rounded-full focus:outline-none cursor-pointer border border-transparent focus:border-white/10 transition-colors"
                        value={selectedGenre}
                        onChange={e => setSelectedGenre(e.target.value)}
                    >
                        {genres.map(genre => (
                            <option key={genre} value={genre} className="bg-[#18181b]">{genre}</option>
                        ))}
                    </select>
                    <IconChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-500 pointer-events-none" />
                </div>

                {/* Price */}
                <div className="relative flex-shrink-0">
                     <select
                        className="appearance-none bg-white/5 hover:bg-white/10 text-white font-medium text-xs md:text-sm py-3 pl-4 pr-9 rounded-full focus:outline-none cursor-pointer border border-transparent focus:border-white/10 transition-colors"
                        value={selectedPriceFilter}
                        onChange={e => setSelectedPriceFilter(e.target.value as any)}
                    >
                        <option value="All" className="bg-[#18181b]">All Prices</option>
                        <option value="Free" className="bg-[#18181b]">Free</option>
                        <option value="Paid" className="bg-[#18181b]">Paid</option>
                    </select>
                    <IconChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-500 pointer-events-none" />
                </div>

                {/* Sort */}
                <div className="relative flex-shrink-0">
                     <select
                        className="appearance-none bg-white/5 hover:bg-white/10 text-white font-medium text-xs md:text-sm py-3 pl-4 pr-9 rounded-full focus:outline-none cursor-pointer border border-transparent focus:border-white/10 transition-colors"
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                    >
                        <option value="publicationDate" className="bg-[#18181b]">Newest</option>
                        <option value="title" className="bg-[#18181b]">Title</option>
                        <option value="price" className="bg-[#18181b]">Price</option>
                    </select>
                    <IconChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-500 pointer-events-none" />
                </div>
            </div>
        </div>
    </div>

      {filteredAndSortedBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 animate-slide-up-stagger delay-200">
          {filteredAndSortedBooks.map(book => (
            <BookCard key={book.id} book={book} onViewDetails={handleViewDetails} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 md:py-32 border border-dashed border-white/10 rounded-3xl bg-black/40 backdrop-blur-md text-center px-4">
            <IconSearch className="w-12 h-12 md:w-16 md:h-16 text-neutral-700 mb-4" />
            <p className="text-xl md:text-2xl text-white font-bold tracking-tight">No books found</p>
            <p className="text-neutral-500 mt-2 text-sm md:text-base">Try adjusting your filters or search terms.</p>
            <button 
                onClick={() => { setSearchTerm(''); setSelectedGenre('All'); setSelectedPriceFilter('All'); }}
                className="mt-6 text-google-blue font-bold hover:underline"
            >
                Clear all filters
            </button>
        </div>
      )}

      {selectedBook && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="" size="lg">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <div className="w-full md:w-5/12">
                    <img 
                        src={selectedBook.coverImageUrl} 
                        alt={selectedBook.title} 
                        className="w-full h-auto aspect-[3/4] object-cover rounded-[16px] shadow-2xl border border-white/10" 
                    />
                </div>
                <div className="w-full md:w-7/12 flex flex-col">
                    <div className="mb-4 md:mb-6">
                         <div className="flex items-center gap-2 mb-2">
                             <span className="px-2 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-neutral-300 border border-white/5">
                                 {selectedBook.genre}
                             </span>
                             {selectedBook.price === 0 && (
                                 <span className="px-2 py-1 bg-google-blue/20 text-google-blue rounded-full text-[10px] font-bold uppercase tracking-wider border border-google-blue/20">
                                     Free
                                 </span>
                             )}
                         </div>
                        <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">{selectedBook.title}</h2>
                        <p className="text-base md:text-lg text-neutral-400">by <span className="text-white">{selectedBook.author}</span></p>
                    </div>

                    <div className="flex-grow">
                        <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Synopsis</h4>
                        <p className="text-neutral-300 text-sm leading-relaxed max-h-48 overflow-y-auto custom-scrollbar pr-2">
                            {selectedBook.description}
                        </p>
                    </div>
                    
                    <div className="mt-6 md:mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                        <div>
                             <p className="text-xs text-neutral-500 uppercase font-bold">Price</p>
                             <p className="text-2xl md:text-3xl font-black text-white tracking-tight">
                                {selectedBook.price === 0 ? 'Free' : `₹${selectedBook.price.toFixed(2)}`}
                             </p>
                        </div>
                        <button 
                            onClick={handleModalAction}
                            className={`py-3 px-8 rounded-full font-bold transition-all duration-200 shadow-glow hover:scale-105 active:scale-95 flex items-center gap-2 text-xs uppercase tracking-widest ${
                                selectedBook.price === 0 
                                ? 'bg-google-blue text-black hover:bg-white' 
                                : 'bg-white text-black hover:bg-neutral-200 shadow-glow-white'
                            }`}
                        >
                            {selectedBook.price === 0 ? (
                                <><IconBook className="w-4 h-4" /> Read Now</>
                            ) : (
                                <><IconShoppingCart className="w-4 h-4" /> Add to Cart</>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
      )}
    </div>
  );
};

export default StorePage;
