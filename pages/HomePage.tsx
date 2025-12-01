

import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { IconSparkles, IconBook, IconRocket, IconStore, IconCheck } from '../constants';
import MorphicEye from '../components/MorphicEye';
import { useAppContext } from '../contexts/AppContext';

const { Link, useNavigate } = ReactRouterDOM as any;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAppContext();

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-google-blue/30 overflow-x-hidden">
        
        {/* --- HERO SECTION --- */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center pt-32 pb-20 z-10">
             
             {/* Local Hero Effects */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-google-blue/10 rounded-full blur-[100px] pointer-events-none"></div>

             <div className="relative z-10 animate-slide-up flex flex-col items-center max-w-5xl mx-auto">
                 
                 <div className="mb-8 md:mb-10 scale-100 hover:scale-105 transition-transform duration-500">
                    <MorphicEye className="w-24 h-24 md:w-40 md:h-40 bg-[#050505] shadow-[0_0_80px_rgba(255,255,255,0.15)] border border-white/30 rounded-full" />
                 </div>

                 <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.95] md:leading-[0.9] drop-shadow-2xl">
                    Turn Your Ideas<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">Into Books.</span>
                 </h1>
                 
                 <p className="text-base md:text-xl text-neutral-300 max-w-2xl mb-10 leading-relaxed px-4 drop-shadow-md">
                    The easiest way to write, read, and sell books with AI. 
                    Powered by the <span className="text-white font-mono font-bold border-b border-white/20 pb-0.5">Smart AI Engine</span>.
                 </p>

                 <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4">
                    {currentUser ? (
                         <button 
                            onClick={() => navigate('/ebook-studio')}
                            className="w-full sm:w-auto px-10 py-4 bg-white text-black font-bold text-lg rounded-full hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2 group"
                        >
                            <IconRocket className="w-5 h-5 group-hover:-translate-y-1 transition-transform" /> 
                            Start Writing
                        </button>
                    ) : (
                        <>
                             <Link 
                                to="/login"
                                className="w-full sm:w-auto px-10 py-4 bg-white text-black font-bold text-lg rounded-full hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2"
                            >
                                Start Creating
                            </Link>
                            <Link 
                                to="/login"
                                className="w-full sm:w-auto px-10 py-4 bg-black/40 border border-white/20 text-white font-bold text-lg rounded-full hover:bg-white/10 transition-colors backdrop-blur-md"
                            >
                                Sign In
                            </Link>
                        </>
                    )}
                 </div>
                 
                 <div className="mt-12 flex flex-col md:flex-row items-center gap-4 md:gap-8 text-neutral-400 text-xs font-mono uppercase tracking-widest">
                     <span className="flex items-center gap-2"><IconCheck className="w-3 h-3 text-google-green"/> Easy to Use</span>
                     <span className="flex items-center gap-2"><IconCheck className="w-3 h-3 text-google-green"/> Free to Start</span>
                     <span className="flex items-center gap-2"><IconCheck className="w-3 h-3 text-google-green"/> Instant Publishing</span>
                 </div>
             </div>
        </section>

        {/* --- FEATURES GRID --- */}
        <section className="py-24 px-6 border-t border-white/5 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Feature 1 */}
                    <div className="p-8 rounded-[32px] bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:border-white/20 hover:scale-105 transition-all duration-300 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:rotate-12 transition-transform border border-white/10">
                            <IconSparkles className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">AI Co-Author</h3>
                        <p className="text-neutral-400 leading-relaxed text-sm">
                            Write with AI. Plan your chapters, write full pages, and fix grammar easily with our writing tools.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="p-8 rounded-[32px] bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:border-white/20 hover:scale-105 transition-all duration-300 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:rotate-12 transition-transform border border-white/10">
                            <IconStore className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Sell Your Books</h3>
                        <p className="text-neutral-400 leading-relaxed text-sm">
                            Publish your book instantly. Get your own profile link and keep 70% of every sale you make.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="p-8 rounded-[32px] bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:border-white/20 hover:scale-105 transition-all duration-300 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:rotate-12 transition-transform border border-white/10">
                            <IconBook className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Easy Reading</h3>
                        <p className="text-neutral-400 leading-relaxed text-sm">
                            Read comfortably on any device. Support for PDF uploads and a distraction-free reading mode.
                        </p>
                    </div>

                </div>
            </div>
        </section>

        {/* --- ABOUT --- */}
        <section className="py-24 px-6 relative overflow-hidden z-10">
             <div className="max-w-4xl mx-auto text-center bg-black/30 backdrop-blur-lg border border-white/5 p-12 rounded-[40px] shadow-2xl relative">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                 
                 <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">Built for Everyone</h2>
                 <p className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-12 font-light">
                     Co-Writter isn't just a tool; it's a partner. We believe that everyone has a story worth telling, 
                     and with the right help, anyone can become an author.
                 </p>
                 <Link to="/store" className="inline-flex items-center gap-2 text-white font-bold border-b border-white pb-1 hover:opacity-70 transition-opacity tracking-widest uppercase text-sm">
                     Browse the Library &rarr;
                 </Link>
             </div>
        </section>

    </div>
  );
};

export default HomePage;