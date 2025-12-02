

import React, { useState, useRef } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { EBook, User } from '../../types';
import { IconBook, IconSparkles, IconSettings, IconClock, IconHeart, IconGrid } from '../../constants';
import * as ReactRouterDOM from 'react-router-dom';
import MorphicEye from '../MorphicEye';

const { useNavigate } = ReactRouterDOM as any;

const UserDashboardContent: React.FC = () => {
    const { currentUser, setCurrentUser, userType, upgradeToSeller } = useAppContext();
    const user = currentUser as User;
    const navigate = useNavigate();
    const activeTab = 'library';
    const [currentTab, setCurrentTab] = useState<'library' | 'wishlist' | 'stats'>('library');
    const [isSwitching, setIsSwitching] = useState(false);

    const profileInputRef = useRef<HTMLInputElement>(null);

    if (!user) return null;

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, field: 'profileImageUrl' | 'coverImageUrl') => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                const updatedUser = { ...user, [field]: base64String };
                setCurrentUser(updatedUser, userType);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSwitchAccount = () => {
        setIsSwitching(true);
        setTimeout(() => {
            upgradeToSeller();
        }, 600);
    };

    return (
        <div className={`w-full font-sans min-h-screen bg-transparent text-white selection:bg-white/20 pb-20 transition-all duration-500 ${isSwitching ? 'animate-warp-out' : 'animate-page-enter'}`}>

            {/* Subtle top light leak */}
            <div className="fixed top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-0"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32">

                {/* --- HERO PROFILE HEADER --- */}
                <header className="group flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12 md:mb-20 border-b border-white/10 pb-8 md:pb-12 bg-black/20 backdrop-blur-md rounded-[32px] p-8 shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:bg-black/30 hover:border-white/20 animate-slide-up">
                    <div className="flex items-center gap-6 md:gap-8">
                        {/* Avatar */}
                        <div className="relative shrink-0 animate-float-subtle">
                            <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-black border border-white/20 overflow-hidden relative z-10 hover:border-white transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_50px_rgba(255,255,255,0.15)]">
                                {user.profileImageUrl ? (
                                    <img
                                        src={user.profileImageUrl}
                                        alt={user.name}
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                                        <span className="text-3xl font-black text-white/20">{user.name.charAt(0)}</span>
                                    </div>
                                )}
                                <div
                                    onClick={() => profileInputRef.current?.click()}
                                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm"
                                >
                                    Change
                                </div>
                                <input type="file" ref={profileInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'profileImageUrl')} />
                            </div>
                        </div>

                        {/* Identity */}
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3 mb-2 md:mb-3 animate-slide-up-stagger delay-100">
                                <span className="px-2 py-0.5 rounded-full border border-white/20 bg-black text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                                    Reader ID: {user.id.slice(0, 6)}
                                </span>
                                {user.isVerified && <span className="text-white text-[9px] font-bold uppercase tracking-widest flex items-center gap-1"><IconSparkles className="w-2 h-2" /> Verified</span>}
                            </div>
                            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none mb-2 md:mb-4 animate-text-reveal">
                                {user.name}
                            </h1>
                            <p className="text-neutral-500 font-mono text-xs md:text-sm truncate max-w-[200px] md:max-w-none animate-slide-up-stagger delay-200">
                                {user.email} • Joined 2024
                            </p>
                        </div>
                    </div>

                    {/* Stat Summary */}
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full md:w-auto justify-between md:items-end animate-slide-up-stagger delay-300">
                        <div className="flex gap-12">
                            <div>
                                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">My Books</p>
                                <p className="text-3xl font-light text-white">{user.purchaseHistory?.length || 0}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Saved</p>
                                <p className="text-3xl font-light text-white">{user.wishlist?.length || 0}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Switch Account Button */}
                            <button
                                onClick={handleSwitchAccount}
                                className="px-4 py-2 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all hover:scale-105"
                            >
                                Go to Writing Mode
                            </button>
                            <button className="h-10 w-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all hover:scale-110">
                                <IconSettings className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* --- TABS --- */}
                <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-2 no-scrollbar animate-slide-up-stagger delay-500">
                    {[
                        { id: 'library', label: 'My Books', icon: IconBook },
                        { id: 'wishlist', label: 'Saved', icon: IconHeart },
                        { id: 'stats', label: 'Stats', icon: IconGrid },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setCurrentTab(tab.id as any)}
                            className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all border border-transparent rounded-full flex items-center gap-2 flex-shrink-0 ${currentTab === tab.id ? 'bg-white text-black shadow-glow-white scale-105' : 'bg-black/40 backdrop-blur-md border-white/10 text-neutral-500 hover:text-white hover:bg-white/10'}`}
                        >
                            <tab.icon className="w-3 h-3" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* --- CONTENT AREA --- */}
                <div className="min-h-[400px]">
                    {currentTab === 'library' && (
                        <div className="animate-slide-up">
                            {user.purchaseHistory && user.purchaseHistory.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-12">
                                    {user.purchaseHistory.map((book: EBook) => (
                                        <div key={book.id} className="group cursor-pointer flex flex-col gap-4" onClick={() => navigate(`/read/${book.id}`)}>
                                            <div className="aspect-[2/3] bg-neutral-900/50 backdrop-blur-sm border border-white/10 overflow-hidden relative transition-transform duration-500 group-hover:-translate-y-2 shadow-2xl rounded-sm">
                                                <img src={book.coverImageUrl} alt={book.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="px-4 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full">Read Now</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-sm leading-tight mb-1 line-clamp-2 group-hover:underline decoration-1 underline-offset-4">{book.title}</h3>
                                                <p className="text-[10px] text-neutral-500 font-mono uppercase">{book.author}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="w-full py-32 border border-dashed border-white/10 flex flex-col items-center justify-center text-center bg-black/20 backdrop-blur-sm rounded-[32px]">
                                    <MorphicEye className="w-16 h-16 mb-6 border border-white/20 bg-[#222] opacity-80 rounded-full" isActive={false} />
                                    <h3 className="text-white text-lg font-bold mb-2">Library Empty</h3>
                                    <p className="text-neutral-500 text-sm mb-8 max-w-xs leading-relaxed">You haven't bought any books yet.</p>
                                    <button onClick={() => navigate('/')} className="px-8 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors rounded-full shadow-glow-white">
                                        Browse Books
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {currentTab === 'wishlist' && (
                        <div className="animate-slide-up grid grid-cols-1 md:grid-cols-2 gap-4">
                            {user.wishlist && user.wishlist.length > 0 ? (
                                user.wishlist.map((book: EBook) => (
                                    <div key={book.id} className="flex items-center gap-5 p-5 border border-white/10 bg-black/40 backdrop-blur-md hover:border-white/30 transition-all group rounded-xl">
                                        <img src={book.coverImageUrl} className="w-16 h-24 object-cover border border-white/10 transition-all rounded-sm" alt={book.title} />
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-white mb-1">{book.title}</h3>
                                            <p className="text-xs text-neutral-500 font-mono uppercase mb-4">{book.author}</p>
                                            <span className="text-white font-bold">₹{book.price}</span>
                                        </div>
                                        <button onClick={() => navigate(`/?bookId=${book.id}`)} className="px-6 py-2 border border-white/20 hover:bg-white hover:text-black text-white transition-colors text-[10px] font-bold uppercase tracking-widest rounded-full">
                                            View
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-2 py-20 text-center text-neutral-500 text-sm font-mono border border-dashed border-white/10 rounded-xl bg-black/20">
                                    NO SAVED BOOKS
                                </div>
                            )}
                        </div>
                    )}

                    {currentTab === 'stats' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
                            <div className="col-span-2 bg-black/40 backdrop-blur-xl border border-white/10 p-8 relative overflow-hidden rounded-[32px]">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <IconClock className="w-32 h-32 text-white" />
                                </div>
                                <h3 className="text-white text-xl font-bold mb-8">Reading Activity</h3>
                                <div className="space-y-6 relative z-10">
                                    {user.purchaseHistory && user.purchaseHistory.slice(0, 3).map(book => {
                                        const progress = Math.floor(Math.random() * 80) + 20;
                                        return (
                                            <div key={`p-${book.id}`}>
                                                <div className="flex justify-between text-xs mb-2 uppercase tracking-wider">
                                                    <span className="text-neutral-300 font-bold">{book.title}</span>
                                                    <span className="text-neutral-500 font-mono">{progress}%</span>
                                                </div>
                                                <div className="h-0.5 bg-white/10 w-full">
                                                    <div className="h-full bg-white shadow-[0_0_10px_white]" style={{ width: `${progress}%` }}></div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    {(!user.purchaseHistory || user.purchaseHistory.length === 0) && <p className="text-neutral-500 text-xs font-mono">NO DATA AVAILABLE</p>}
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-xl border border-white/10 text-white p-8 flex flex-col justify-between rounded-[32px]">
                                <div>
                                    <IconSparkles className="w-6 h-6 mb-4 text-google-blue" />
                                    <h3 className="text-2xl font-black tracking-tight mb-2">Explore</h3>
                                    <p className="text-sm font-medium opacity-70 leading-relaxed">
                                        Discover new books created by our AI engine.
                                    </p>
                                </div>
                                <button onClick={() => navigate('/')} className="mt-6 w-full py-3 bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-bold uppercase tracking-widest rounded-full shadow-glow-white">
                                    Browse Books
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboardContent;
