
import React, { useState, useRef } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { UserType, User } from '../../types';
import {
    IconActivity, IconBook, IconCheck, IconClock, IconCloudUpload, IconDashboard,
    IconEdit, IconEye, IconGithub, IconGlobe, IconHeart, IconLink, IconLogout,
    IconPenTip, IconPlus, IconSearch, IconSettings, IconSparkles, IconStar, IconUser
} from '../../constants';
import * as ReactRouterDOM from 'react-router-dom';
import BookCard from '../BookCard';

const { useNavigate } = ReactRouterDOM as any;
import StudioHeader from '../StudioHeader';

const UserDashboardContent: React.FC = () => {
    const { currentUser, setCurrentUser, books, wishlist } = useAppContext();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'library' | 'wishlist' | 'settings'>('library');
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        setCurrentUser(null, UserType.GUEST);
        navigate('/login');
    };

    if (!currentUser) return null;

    const SidebarItem = ({ id, label, icon: Icon }: { id: any, label: string, icon: any }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-4 px-6 py-3.5 text-sm font-medium rounded-r-full transition-all duration-200 border-l-4 group ${activeTab === id
                ? 'bg-white/10 text-white border-white shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                : 'text-neutral-400 hover:bg-white/5 hover:text-white border-transparent'
                }`}
        >
            <Icon className={`w-5 h-5 ${activeTab === id ? 'text-white' : 'text-neutral-500 group-hover:text-white'}`} />
            {label}
        </button>
    );

    const MobileNavItem = ({ id, label, icon: Icon }: { id: any, label: string, icon: any }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex flex-col items-center justify-center py-2 px-4 transition-colors ${activeTab === id ? 'text-white' : 'text-neutral-500'
                }`}
        >
            <Icon className={`w-6 h-6 mb-1 ${activeTab === id ? 'text-white' : 'text-neutral-500'}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
        </button>
    );

    const booksToDisplay = activeTab === 'library' ? books.filter(b => b.sellerId === currentUser.id) : wishlist;
    const filteredBooks = booksToDisplay?.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="h-screen w-full bg-[#0b0b0b] font-sans text-white flex flex-col overflow-hidden">

            <StudioHeader />


            <div className="flex-1 flex overflow-hidden">

                {/* --- SIDEBAR (Desktop) --- */}
                <aside className="w-64 flex-shrink-0 border-r border-white/5 hidden md:flex flex-col bg-[#0b0b0b] z-20 h-full overflow-y-auto">
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-xl font-bold">
                                {currentUser.profileImageUrl ? (
                                    <img src={currentUser.profileImageUrl} alt="" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    currentUser.name.charAt(0)
                                )}
                            </div>
                            <div>
                                <h2 className="font-bold text-sm truncate w-32">{currentUser.name}</h2>
                                <p className="text-[10px] text-neutral-500 uppercase font-mono">Reader Account</p>
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-1 pr-4">
                        <button
                            onClick={() => navigate('/')}
                            className="w-full flex items-center gap-4 px-6 py-3.5 text-sm font-medium rounded-r-full transition-all duration-200 text-neutral-400 hover:bg-white/5 hover:text-white border-l-4 border-transparent group"
                        >
                            <IconBook className="w-5 h-5 text-neutral-500 group-hover:text-white rotate-180" />
                            Main Site
                        </button>
                        <div className="my-2 border-t border-white/5 mx-6"></div>
                        <SidebarItem id="library" label="My Library" icon={IconBook} />
                        <SidebarItem id="wishlist" label="Wishlist" icon={IconHeart} />
                        <div className="my-4 border-t border-white/5 mx-6"></div>
                        <SidebarItem id="settings" label="Profile Settings" icon={IconSettings} />
                    </nav>

                    <div className="p-6">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 px-6 py-3 text-sm font-bold text-red-500/70 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all"
                        >
                            <IconLogout className="w-5 h-5" />
                            Sign Out
                        </button>
                    </div>
                </aside>

                {/* --- MAIN CONTENT --- */}
                <main className="flex-1 overflow-y-auto bg-[#0b0b0b] relative pb-24 md:pb-8">
                    <div className="max-w-6xl mx-auto p-6 md:p-12">

                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                                    {activeTab === 'library' && 'My Library'}
                                    {activeTab === 'wishlist' && 'Wishlist'}
                                    {activeTab === 'settings' && 'Settings'}
                                </h1>
                                <p className="text-neutral-500 text-sm md:text-base font-medium">
                                    {activeTab === 'library' && `Managing ${booksToDisplay.length} books in your digital shelf.`}
                                    {activeTab === 'wishlist' && `You have ${booksToDisplay.length} items on your radar.`}
                                    {activeTab === 'settings' && 'Customize your reader profile and preferences.'}
                                </p>
                            </div>

                            {activeTab !== 'settings' && (
                                <div className="relative w-full md:w-80">
                                    <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                                    <input
                                        type="text"
                                        placeholder="Search your books..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-[#151515] border border-white/5 rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-white/20 transition-all font-medium"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                            {activeTab !== 'settings' && (
                                filteredBooks.length > 0 ? (
                                    filteredBooks.map((book) => (
                                        <BookCard key={book.id} book={book} />
                                    ))
                                ) : (
                                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-center opacity-50">
                                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                            <IconBook className="w-8 h-8" />
                                        </div>
                                        <p className="font-bold text-lg">No books found.</p>
                                        <p className="text-sm">Try a different search or browse the store.</p>
                                    </div>
                                )
                            )}
                        </div>

                        {/* Settings View */}
                        {activeTab === 'settings' && (
                            <div className="animate-fade-in max-w-2xl bg-[#151515] rounded-[32px] p-8 md:p-12 border border-white/5">
                                <div className="space-y-8">
                                    <div className="flex items-center gap-6 pb-8 border-b border-white/5">
                                        <div className="w-24 h-24 rounded-full bg-neutral-900 border-2 border-white/10 flex items-center justify-center text-4xl font-bold shadow-2xl">
                                            {currentUser.profileImageUrl ? (
                                                <img src={currentUser.profileImageUrl} alt="" className="w-full h-full rounded-full object-cover" />
                                            ) : (
                                                currentUser.name.charAt(0)
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-1">{currentUser.name}</h3>
                                            <p className="text-neutral-500 text-sm mb-4">{currentUser.email}</p>
                                            <button className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors">Change Photo</button>
                                        </div>
                                    </div>

                                    <div className="grid gap-6">
                                        <div>
                                            <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-3">Full Name</label>
                                            <input type="text" defaultValue={currentUser.name} className="w-full bg-[#0b0b0b] border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-white/30 transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-3">Email Address</label>
                                            <input type="email" defaultValue={currentUser.email} disabled className="w-full bg-[#0b0b0b] border border-white/10 rounded-xl p-4 text-sm opacity-50 cursor-not-allowed" />
                                        </div>
                                    </div>

                                    <button className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-neutral-200 transition-all shadow-xl">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </main>

                {/* --- MOBILE BOTTOM NAVIGATION --- */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-[#0b0b0b]/90 backdrop-blur-xl border-t border-white/10 flex items-center justify-around z-50 pb-safe">
                    <MobileNavItem id="library" label="Library" icon={IconBook} />
                    <MobileNavItem id="wishlist" label="Wishlist" icon={IconHeart} />
                    <MobileNavItem id="settings" label="Profile" icon={IconSettings} />
                </div>
            </div>
        </div>
    );
};

export default UserDashboardContent;
