import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Seller, EBook, CreatorSiteConfig } from '../types';
import { mockUsers, mockEBooks } from '../services/mockData';
import { APP_NAME, IconBook, IconLink, IconSparkles } from '../constants';
import MorphicEye from '../components/MorphicEye';

const { useParams, Link } = ReactRouterDOM as any;

const CreatorSitePage: React.FC = () => {
  const { slug } = useParams();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [siteConfig, setSiteConfig] = useState<CreatorSiteConfig | null>(null);
  const [showcasedBooks, setShowcasedBooks] = useState<EBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      setIsLoading(true);
      try {
        const { db } = await import('../services/firebase');
        const { collection, query, where, getDocs } = await import('firebase/firestore');

        const q = query(
          collection(db, "users"),
          where("creatorSite.slug", "==", slug)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data() as Seller;

          if (userData.creatorSite && userData.creatorSite.isEnabled) {
            setSeller(userData);
            setSiteConfig(userData.creatorSite);
            setShowcasedBooks(userData.uploadedBooks || []);
          } else {
            setSeller(null);
          }
        } else {
          // Fallback to Mock Data
          const foundSeller = Object.values(mockUsers).find(
            u => (u as Seller).creatorSite?.slug === slug
          ) as Seller | undefined;

          if (foundSeller && foundSeller.creatorSite && foundSeller.creatorSite.isEnabled) {
            setSeller(foundSeller);
            setSiteConfig(foundSeller.creatorSite);
            const booksToDisplay = mockEBooks.filter(book =>
              foundSeller.creatorSite!.showcasedBookIds.includes(book.id) && book.sellerId === foundSeller.id
            );
            setShowcasedBooks(booksToDisplay);
          } else {
            setSeller(null);
          }
        }
      } catch (error) {
        console.error("Error fetching creator site:", error);
        setSeller(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) fetchCreator();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-2 border-white/10 border-t-white rounded-full animate-spin mb-4"></div>
        <p className="text-xs font-bold tracking-[0.3em] text-neutral-500 uppercase">Synchronizing Neural Link...</p>
      </div>
    );
  }

  if (!seller || !siteConfig) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <MorphicEye className="w-32 h-32 opacity-20 mb-8" />
        <h1 className="text-3xl font-black mb-4 tracking-tighter uppercase">Station Not Found</h1>
        <p className="text-neutral-500 max-w-sm mb-8">This creator haven has not been initialized or is currently offline.</p>
        <Link to="/" className="px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-neutral-200 transition-all">
          Return to Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(30,30,50,1)_0%,rgba(0,0,0,1)_70%)]"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/[0.03] blur-[100px] rounded-full"></div>
      </div>

      {/* Header Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
        <header className="flex flex-col items-center text-center mb-24 animate-fade-in">
          <div className="relative mb-10 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-neutral-700/30 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative w-32 h-32 rounded-full border border-white/10 bg-black overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-105">
              {siteConfig.profileImageUrl ? (
                <img src={siteConfig.profileImageUrl} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-black">{siteConfig.displayName?.charAt(0) || seller.name.charAt(0)}</div>
              )}
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase leading-none">
            {siteConfig.displayName || seller.name}
          </h1>
          <p className="text-neutral-500 text-xs md:text-sm font-bold uppercase tracking-[0.4em] max-w-xl">
            {siteConfig.tagline || "Authoring the Infinite Path"}
          </p>

          <div className="mt-12 flex gap-4">
            <button className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              Follow
            </button>
            <button className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <IconLink className="w-4 h-4" />
            </button>
          </div>
        </header>

        <main>
          <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-500 flex items-center gap-3">
              <IconBook className="w-4 h-4" /> Showcased Works
            </h2>
            <span className="font-mono text-[10px] text-neutral-700 uppercase tracking-widest">{showcasedBooks.length} Publications</span>
          </div>

          {showcasedBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {showcasedBooks.map((book, idx) => (
                <div key={book.id} className="group relative flex flex-col animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                  <Link to={`/read/${book.id}`} className="block relative overflow-hidden rounded-[32px] bg-neutral-900 aspect-[3/4] mb-8 shadow-2xl transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
                    <img src={book.coverImageUrl} alt={book.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">{book.genre}</span>
                        <span className="text-[11px] font-mono text-white/80 uppercase">₹{book.price}</span>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center scale-0 group-hover:scale-100 transition-all duration-500 rotate-45 group-hover:rotate-0">
                        <IconSparkles className="w-6 h-6" />
                      </div>
                    </div>
                  </Link>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors truncate">{book.title}</h3>
                  <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">{book.author}</p>

                  <div className="mt-8 pt-6 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                    <Link to={`/store?bookId=${book.id}`} className="text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-indigo-400 transition-colors flex items-center gap-2">
                      Checkout Now →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-neutral-700 font-black uppercase tracking-[0.2em] text-sm">No artifacts discovered yet.</p>
            </div>
          )}
        </main>

        <footer className="mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-700">Powered by Neural Core</span>
            <Link to="/" className="text-2xl font-black tracking-tighter hover:text-neutral-500 transition-colors">{APP_NAME}</Link>
          </div>
          <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">&copy; {new Date().getFullYear()} {siteConfig.displayName || seller.name}</p>
        </footer>
      </div>
    </div>
  );
};

export default CreatorSitePage;