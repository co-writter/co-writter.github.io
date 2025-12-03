

import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { UserType } from '../types';
import { IconShoppingCart, IconRocket, IconMenu, IconX, IconStore, IconHome, IconBook } from '../constants';
import MorphicEye from './MorphicEye';

const { Link, useNavigate, useLocation } = ReactRouterDOM as any;

const Navbar: React.FC = () => {
    const { currentUser, userType, setCurrentUser, cart } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [mobileMenuOpen]);

    // Hide Navbar on Studio and Login pages AND Standalone Preview
    if (location.pathname === '/ebook-studio' || location.pathname === '/login' || location.pathname.startsWith('/site/')) return null;

    const handleLogout = () => {
        setCurrentUser(null, UserType.GUEST);
        setDropdownOpen(false);
        setMobileMenuOpen(false);
        navigate('/');
    };

    const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const navLinks = [
        { label: 'Browse', path: '/store', icon: <IconStore className="w-5 h-5" /> },
        { label: 'Plans', path: '/pricing', icon: <IconBook className="w-5 h-5" /> },
    ];

    return (
        <>
            {/* Fixed Header with consistent Glassmorphism style - Fixed to Viewport */}
            <nav className="fixed top-0 left-0 right-0 w-full z-50 h-16 border-b border-white/5 bg-[#000000]/60 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] animate-slide-down">
                <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group z-50 relative">
                        <MorphicEye className="w-9 h-9 border border-white/20 bg-[#111] shadow-[0_0_10px_rgba(255,255,255,0.1)] rounded-full transition-transform duration-300 group-hover:scale-110" />
                        <span className="font-bold tracking-tighter text-lg text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-neutral-300 group-hover:to-white group-hover:animate-shine transition-all">co-writter</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:scale-105 ${location.pathname === link.path ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-neutral-400 hover:text-white'}`}
                            >
                                {link.icon}
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4 z-50">

                        {/* Cart */}
                        <Link
                            to="/checkout"
                            className="relative w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white transition-all hover:scale-110 active:scale-95 duration-200 flex-shrink-0 overflow-visible group"
                            aria-label="View Cart"
                        >
                            <IconShoppingCart className="w-5 h-5 group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all" />
                            {totalCartItems > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-black text-[9px] font-bold border border-black animate-pulse-square shadow-sm z-10">
                                    {totalCartItems}
                                </span>
                            )}
                        </Link>

                        <div className="h-6 w-px bg-white/10 mx-2 hidden sm:block"></div>

                        {/* Profile / Login */}
                        <div className="relative hidden md:block">
                            {currentUser && userType !== UserType.GUEST ? (
                                <div className="flex items-center gap-4">
                                    <Link
                                        to="/ebook-studio"
                                        className="hidden lg:flex px-4 py-1.5 bg-white text-black hover:bg-neutral-200 text-xs font-bold uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95 items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                    >
                                        <IconRocket className="w-3 h-3" /> Write
                                    </Link>

                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center gap-2"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center text-xs font-bold text-white hover:border-white transition-all hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                                            {currentUser.profileImageUrl ? (
                                                <img src={currentUser.profileImageUrl} alt="" className="w-full h-full object-cover rounded-full" />
                                            ) : (
                                                currentUser.name.charAt(0)
                                            )}
                                        </div>
                                    </button>

                                    {/* Dropdown */}
                                    {dropdownOpen && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>
                                            <div className="absolute right-0 top-12 mt-2 w-56 bg-[#0a0a0a] border border-white/10 shadow-2xl py-1 z-20 origin-top-right rounded-lg animate-slide-up-stagger">
                                                <div className="px-4 py-3 border-b border-white/5 mb-1">
                                                    <p className="text-sm font-bold text-white truncate">{currentUser.name}</p>
                                                    <p className="text-[10px] text-neutral-500 uppercase font-mono">{userType === 'seller' ? 'Writer Account' : 'Reader Account'}</p>
                                                </div>
                                                <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-neutral-300 hover:bg-white/5 hover:text-white transition-colors">
                                                    My Profile
                                                </Link>
                                                <Link to="/ebook-studio" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-neutral-300 hover:bg-white/5 hover:text-white transition-colors lg:hidden">
                                                    Write Book
                                                </Link>
                                                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition-colors">
                                                    Sign out
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link
                                        to="/login"
                                        className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors hover:scale-105"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/pricing"
                                        className="px-5 py-2 text-xs font-bold uppercase tracking-widest text-black bg-white hover:bg-neutral-200 transition-all rounded-full hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-105"
                                    >
                                        Start Free
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-neutral-400 hover:text-white relative z-50 transition-transform active:scale-90"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <IconX className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Full Screen Menu - Z-Index 40 (Below Navbar Z-50) */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden flex flex-col pt-24 pb-8 px-6 animate-fade-in">
                    <div className="flex flex-col gap-6">
                        <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold text-white flex items-center gap-4 py-2 border-b border-white/10 animate-slide-up-stagger delay-100">
                            <IconHome className="w-6 h-6 text-neutral-500" /> Home
                        </Link>
                        {navLinks.map((link, idx) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`text-3xl font-bold text-white flex items-center gap-4 py-2 border-b border-white/10 animate-slide-up-stagger delay-${(idx + 2) * 100}`}
                            >
                                <span className="text-neutral-500">{link.icon}</span>
                                {link.label}
                            </Link>
                        ))}

                        {currentUser ? (
                            <>
                                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold text-white flex items-center gap-4 py-2 border-b border-white/10 animate-slide-up-stagger delay-300">
                                    <MorphicEye className="w-6 h-6 rounded-full border border-white/20" isActive={false} /> My Profile
                                </Link>
                                <Link to="/ebook-studio" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold text-white flex items-center gap-4 py-2 border-b border-white/10 animate-slide-up-stagger delay-400">
                                    <IconRocket className="w-6 h-6 text-neutral-500" /> Write Book
                                </Link>
                                <button onClick={handleLogout} className="text-left text-xl font-bold text-red-500 py-4 mt-4 animate-slide-up-stagger delay-400">
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <div className="mt-8 flex flex-col gap-4 animate-slide-up-stagger delay-400">
                                <Link
                                    to="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold text-center rounded-full"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/pricing"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full py-4 bg-white text-black font-bold text-center rounded-full shadow-glow-white"
                                >
                                    Start Free
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;