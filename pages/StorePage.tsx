
import React, { useState, useMemo } from 'react';
import BookCard from '../components/BookCard';
import { EBook } from '../types';
import { IconSparkles, BORDER_CLASS, IconShoppingCart, IconChevronDown, IconSearch, IconBook, IconStar, IconRocket } from '../constants';
import Modal from '../components/Modal'; 
import CustomDropdown, { DropdownOption } from '../components/CustomDropdown';
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

  const genreOptions: DropdownOption[] = genres.map(g => ({ label: g === 'All' ? 'All Genres' : g, value: g }));
  
  const priceOptions: DropdownOption[] = [
      { label: 'All Prices', value: 'All' },
      { label: 'Free Only', value: 'Free' },
      { label: 'Paid Only', value: 'Paid' },
  ];

  const sortOptions: DropdownOption[] = [
      { label: 'Newest First', value: 'publicationDate' },
      { label: 'Title (A-Z)', value: 'title' },
      { label: 'Price (Low-High)', value: 'price' },
  ];

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

  // Prioritize "Co-Writter's Manual" or "Quantum Minds" for the featured spot
  const featuredBook = useMemo(() => {
      return allBooks.find(b => b.title.includes("Manual")) || allBooks.find(b => b.price > 0) || allBooks[0];
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
    <div className="container mx-auto px-4 sm:px-6 pt-24 pb-20 md:pb-24 overflow-x-hidden">
      
      {/* Featured Hero Section */}
      {featuredBook && !searchTerm && selectedGenre === 'All' && (
        <div className="relative w-full rounded-[32px] overflow-hidden mb-12 md:mb-16 group border border-white/10 shadow-2xl animate-fade-in flex flex-col md:block h-auto md:h-[500px]">
             {/* Background Image with Blur */}
             <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105"
                style={{backgroundImage: `url(${featuredBook.coverImageUrl})`}}
             ></div>
             
             {/* Mobile: Heavy gradient to make text readable. Desktop: Horizontal gradient */}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent md:bg-gradient-to-r md:from-black md:via-black/80 md:to-transparent"></div>
             
             {/* Content */}
             <div className="relative z-10 p-8 md:p-16 flex flex-col justify-end md:justify-center min-h-[400px] md:h-full max-w-2xl">
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
            <p className="text-neutral-400 mt-1 text-sm md:text-base">Exploring {filteredAndSortedBooks.length} titles.</p>
        </div>
      </header>

      {/* Floating Filter Bar - Mobile Optimized */}
      <div className="sticky top-20 md:top-24 z-30 mx-auto w-full mb-8 md:mb-10 transition-all duration-300 animate-slide-down">
        <div className="bg-black/90 backdrop-blur-xl border border-white/10 shadow-sharp-lg rounded-[24px] p-3 flex flex-col md:flex-row gap-3">
            
            {/* Search - Full width on mobile */}
            <div className="relative group w-full md:w-64 md:flex-shrink-0">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors">
                    <IconSearch className="w-4 h-4" />
                </div>
                <input 
                    type="text"
                    placeholder="Search books..."
                    className="w-full bg-white/5 border border-transparent focus:border-white/10 rounded-full py-3 pl-10 pr-4 text-white placeholder-neutral-500 focus:outline-none focus:bg-white/10 transition-all text-sm font-bold"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Filters - Grid on mobile for easier tapping */}
            <div className="flex-1 grid grid-cols-2 md:flex md:flex-wrap md:justify-end gap-2">
                <CustomDropdown 
                    options={genreOptions}
                    value={selectedGenre}
                    onChange={setSelectedGenre}
                    className="w-full md:w-auto min-w-0" 
                    placeholder="Genre"
                />
                
                <CustomDropdown 
                    options={priceOptions}
                    value={selectedPriceFilter}
                    onChange={(val) => setSelectedPriceFilter(val as any)}
                    className="w-full md:w-auto min-w-0"
                    placeholder="Price"
                />

                <CustomDropdown 
                    options={sortOptions}
                    value={sortBy}
                    onChange={setSortBy}
                    className="w-full col-span-2 md:w-auto min-w-0"
                    placeholder="Sort By"
                />
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
            <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-5/12 bg-black/20 md:border-r border-white/5 relative group">
                    <img 
                        src={selectedBook.coverImageUrl} 
                        alt={selectedBook.title} 
                        className="w-full h-full object-cover min-h-[400px] md:min-h-full opacity-90 group-hover:opacity-100 transition-opacity" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="inline-flex items-center gap-2 mb-3">
                             <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-neutral-200 border border-white/10">
                                 {selectedBook.genre}
                             </span>
                             {selectedBook.price === 0 && (
                                 <span className="px-2.5 py-1 bg-google-blue/20 backdrop-blur-md text-google-blue rounded-full text-[10px] font-bold uppercase tracking-wider border border-google-blue/20">
                                     Free
                                 </span>
                             )}
                        </div>
                    </div>
                </div>
                
                <div className="w-full md:w-7/12 flex flex-col p-8 md:p-10 bg-black">
                    <div className="mb-6">
                        <h2 className="text-3xl md:text-4xl font-black text-white leading-[0.95] mb-2 tracking-tighter">{selectedBook.title}</h2>
                        <p className="text-base md:text-lg text-neutral-400 font-medium">by <span className="text-white">{selectedBook.author}</span></p>
                    </div>

                    <div className="flex-grow">
                        <h4 className="text-xs font-bold text-neutral-600 uppercase tracking-widest mb-3 border-b border-white/5 pb-1 w-fit">Synopsis</h4>
                        <p className="text-neutral-300 text-sm leading-7 max-h-60 overflow-y-auto custom-scrollbar pr-4 font-light">
                            {selectedBook.description}
                        </p>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                        <div>
                             <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest mb-1">Price</p>
                             <p className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                                {selectedBook.price === 0 ? 'Free' : `₹${selectedBook.price.toFixed(0)}`}
                             </p>
                        </div>
                        <button 
                            onClick={handleModalAction}
                            className={`py-4 px-8 rounded-full font-bold transition-all duration-300 flex items-center gap-3 text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 ${
                                selectedBook.price === 0 
                                ? 'bg-google-blue text-black hover:bg-white border border-transparent' 
                                : 'bg-white text-black hover:bg-neutral-200'
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
