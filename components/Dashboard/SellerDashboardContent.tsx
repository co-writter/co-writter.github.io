
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Seller, UserType } from '../../types';
import {
    IconSettings, IconBook,
    IconEdit, IconCheck,
    IconActivity, IconPlus, IconCloudUpload, IconGithub, IconLink,
    IconUser, IconEye, IconClock, IconGlobe, IconDashboard, IconStar,
    IconSparkles, IconPenTip, IconLogout, IconTrendUp
} from '../../constants';
import * as ReactRouterDOM from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { saveUserDataToGitHub } from '../../services/cloudService';
import { mockUsers } from '../../services/mockData';

const { useNavigate } = ReactRouterDOM as any;
import StudioHeader from '../StudioHeader';

const mockVisitors = [
    { id: 1, name: "Alice Freeman", email: "alice.f...@gmail.com", location: "Mumbai, IN", time: "2 mins ago", status: "Signed In", action: "Viewed 'The Void Start'", avatar: "A" },
    { id: 2, name: "Bob Script", email: "bob.script...@outlook.com", location: "London, UK", time: "15 mins ago", status: "Signed In", action: "Purchased 'Neural Architectures'", avatar: "B" },
    { id: 3, name: "Guest User", email: "—", location: "New York, US", time: "42 mins ago", status: "Guest", action: "Browsing Store", avatar: "?" },
    { id: 4, name: "Diana Prince", email: "diana.p...@gmail.com", location: "Toronto, CA", time: "1 hour ago", status: "Signed In", action: "Added to Cart", avatar: "D" },
    { id: 5, name: "Evan Wright", email: "evan.w...@yahoo.com", location: "Sydney, AU", time: "3 hours ago", status: "Signed In", action: "Viewed Profile", avatar: "E" },
    { id: 6, name: "Guest User", email: "—", location: "Berlin, DE", time: "5 hours ago", status: "Guest", action: "Read Preview", avatar: "?" },
];

export const SellerDashboardContent: React.FC = () => {
    const { currentUser, setCurrentUser, books, updateBook, deleteBook, addCreatedBook } = useAppContext();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'overview' | 'studio' | 'audience' | 'settings' | 'executive'>('overview');
    const [isDeploying, setIsDeploying] = useState(false);
    const [deploymentUrl, setDeploymentUrl] = useState<string | null>(null);

    // Casting currentUser to Seller for convenience
    const seller = currentUser as Seller;

    const [creatorSiteForm, setCreatorSiteForm] = useState({
        displayName: seller?.name || '',
        tagline: 'Leading the future of digital literature.',
        slug: seller?.name?.toLowerCase().replace(/\s+/g, '-') || 'my-studio',
        theme: 'dark'
    });

    if (!seller) return null;

    const isOwner = seller.isAdmin === true || seller.email === 'subatomicerror@gmail.com';

    const handleLogout = () => {
        setCurrentUser(null, UserType.GUEST);
        navigate('/login');
    };

    const handleDeployToGitHub = async () => {
        setIsDeploying(true);
        try {
            const result = await saveUserDataToGitHub(seller.id, {
                creatorConfig: creatorSiteForm,
                books: (books || []).filter(b => b.sellerId === seller.id)
            });
            if (result.success) {
                setDeploymentUrl(result.url || null);
                alert("Site Published Successfully! It will be live at " + result.url);
            }
        } catch (error) {
            console.error("Deployment failed", error);
            alert("Deployment failed. Check console.");
        } finally {
            setIsDeploying(false);
        }
    };

    const handleCreatorSiteFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCreatorSiteForm(prev => ({ ...prev, [name]: value }));
    };

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

    return (
        <div className="h-screen w-full bg-[#0b0b0b] font-sans text-white flex flex-col overflow-hidden">

            <StudioHeader />

            <div className="flex-1 flex overflow-hidden">

                {/* --- SIDEBAR (Desktop) --- */}
                <aside className="w-64 flex-shrink-0 border-r border-white/5 hidden md:flex flex-col bg-[#0b0b0b] z-20 h-full overflow-y-auto">
                    <div className="p-8 pb-4">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-xl font-bold">
                                {seller.profileImageUrl ? (
                                    <img src={seller.profileImageUrl} alt="" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    seller.name.charAt(0)
                                )}
                            </div>
                            <div>
                                <h2 className="font-bold text-sm truncate w-32">{seller.name}</h2>
                                <p className="text-[10px] text-neutral-500 uppercase font-mono">Writer Account</p>
                            </div>
                        </div>
                    </div>

                    {/* Nav Menu */}
                    <nav className="flex-1 space-y-1 pr-4 mt-6">
                        <button
                            onClick={() => navigate('/')}
                            className="w-full flex items-center gap-4 px-6 py-3.5 text-sm font-medium rounded-r-full transition-all duration-200 text-neutral-400 hover:bg-white/5 hover:text-white border-l-4 border-transparent group"
                        >
                            <IconBook className="w-5 h-5 text-neutral-500 group-hover:text-white rotate-180" />
                            Main Site
                        </button>
                        <div className="my-2 border-t border-white/5 mx-6"></div>
                        <SidebarItem id="overview" label="Overview" icon={IconActivity} />
                        <SidebarItem id="audience" label="Audience" icon={IconUser} />
                        <SidebarItem id="studio" label="Content Manager" icon={IconCloudUpload} />
                        <div className="my-4 border-t border-white/5 mx-6"></div>
                        <SidebarItem id="settings" label="Site Settings" icon={IconSettings} />

                        {/* Executive Only Tab */}
                        {isOwner && (
                            <>
                                <div className="my-4 border-t border-white/5 mx-6"></div>
                                <SidebarItem id="executive" label="Executive Control" icon={IconDashboard} />
                            </>
                        )}
                    </nav>

                    <div className="p-6">
                        <div className="bg-[#151515] p-4 rounded-2xl border border-white/5">
                            <p className="text-[10px] uppercase font-bold text-neutral-500 mb-2 tracking-widest">Storage used</p>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-2">
                                <div className="h-full w-[42%] bg-white rounded-full"></div>
                            </div>
                            <p className="text-[10px] text-neutral-600 font-medium">1.2 GB / 5 GB</p>
                        </div>
                    </div>
                </aside>

                {/* --- MAIN CONTENT --- */}
                <main className="flex-1 overflow-y-auto bg-[#0b0b0b] relative pb-24 md:pb-8">
                    <div className="max-w-[1400px] mx-auto p-6 md:p-12">

                        {/* Page Header */}
                        <div className="mb-12 flex flex-col gap-8">
                            {/* Real-time Ticker */}
                            <div className="bg-white/5 border border-white/5 rounded-2xl px-6 py-3 flex items-center gap-6 overflow-hidden relative">
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Live Hub</span>
                                </div>
                                <div className="h-4 w-px bg-white/10 flex-shrink-0"></div>
                                <div className="flex gap-12 animate-marquee whitespace-nowrap text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                                    <span>New Sale: "The Void Start" - ₹499 (Mumbai, IN)</span>
                                    <span>New Reader: Diana P. joined from Toronto</span>
                                    <span>Gemini 1.5 Pro: Content Synthesis Optimized</span>
                                    <span>Payment Node: Operational (SLA 99.9%)</span>
                                </div>
                            </div>

                            <div className="flex items-end justify-between">
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tighter">
                                        {activeTab === 'overview' && 'Dashboard'}
                                        {activeTab === 'audience' && 'Real-time Audience'}
                                        {activeTab === 'studio' && 'Content Manager'}
                                        {activeTab === 'settings' && 'Site Configuration'}
                                        {activeTab === 'executive' && 'Executive Control'}
                                    </h1>
                                    {activeTab === 'overview' && (
                                        <div className="flex items-center gap-2 text-[#81c995] font-black text-[10px] uppercase tracking-[0.3em]">
                                            <span className="w-2 h-2 rounded-full bg-[#81c995] animate-ping"></span>
                                            Executive Pulse: +18.4% Net Growth
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="hidden lg:flex flex-col items-end">
                                        <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Active Now</span>
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0b0b0b] bg-neutral-900 flex items-center justify-center text-[10px] font-bold">
                                                    {String.fromCharCode(64 + i)}
                                                </div>
                                            ))}
                                            <div className="w-8 h-8 rounded-full border-2 border-[#0b0b0b] bg-white text-black flex items-center justify-center text-[10px] font-bold">+12</div>
                                        </div>
                                    </div>
                                    {activeTab === 'overview' && (
                                        <button
                                            onClick={() => navigate('/')}
                                            className="hidden md:flex flex-row-reverse px-6 py-2.5 bg-white text-black font-bold text-sm items-center gap-2 hover:bg-neutral-200 transition-all shadow-lg hover:scale-105 active:scale-95 rounded-full"
                                        >
                                            <IconPlus className="w-4 h-4" />
                                            <span>Start Writing</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* --- OVERVIEW TAB --- */}
                        {activeTab === 'overview' && (
                            <div className="animate-fade-in space-y-12">
                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                                    <div className="bg-[#151515] p-8 rounded-[32px] border border-white/5 hover:border-white/10 transition-colors">
                                        <p className="text-[10px] uppercase font-bold text-neutral-500 mb-4 tracking-[0.2em]">Total Revenue</p>
                                        <p className="text-4xl font-black mb-1">₹14,280</p>
                                        <p className="text-xs text-[#81c995] font-bold">+18% vs prev. month</p>
                                    </div>
                                    <div className="bg-[#151515] p-8 rounded-[32px] border border-white/5 hover:border-white/10 transition-colors">
                                        <p className="text-[10px] uppercase font-bold text-neutral-500 mb-4 tracking-[0.2em]">Active Readers</p>
                                        <p className="text-4xl font-black mb-1">1,842</p>
                                        <p className="text-xs text-[#81c995] font-bold">+241 this week</p>
                                    </div>
                                    <div className="bg-[#151515] p-8 rounded-[32px] border border-white/5 hover:border-white/10 transition-colors">
                                        <p className="text-[10px] uppercase font-bold text-neutral-500 mb-4 tracking-[0.2em]">Books Published</p>
                                        <p className="text-4xl font-black mb-1">{(books || []).filter(b => b.sellerId === seller.id).length}</p>
                                        <p className="text-xs text-neutral-500 font-bold">Live on Marketplace</p>
                                    </div>
                                    <div className="bg-[#151515] p-8 rounded-[32px] border border-white/5 hover:border-white/10 transition-colors">
                                        <p className="text-[10px] uppercase font-bold text-neutral-500 mb-4 tracking-[0.2em]">Global Rank</p>
                                        <p className="text-4xl font-black mb-1">#42</p>
                                        <p className="text-xs text-indigo-400 font-bold">Top 1% of creators</p>
                                    </div>
                                </div>

                                {/* Engagement Analytics with Recharts */}
                                <div className="bg-[#151515] rounded-[40px] p-10 border border-white/5 overflow-hidden relative group">
                                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[120px] rounded-full -mr-20 -mt-20 pointer-events-none group-hover:bg-white/10 transition-all duration-700"></div>
                                    <div className="flex items-center justify-between mb-12 relative z-10">
                                        <div>
                                            <h3 className="text-2xl font-black tracking-tighter mb-1">Growth Matrix</h3>
                                            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Real-time readership & sales engagement</p>
                                        </div>
                                        <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5">
                                            {['7D', '30D', '90D', 'ALL'].map(t => (
                                                <button key={t} className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all ${t === '30D' ? 'bg-white text-black shadow-xl' : 'text-neutral-500 hover:text-white'}`}>
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="h-[400px] w-full relative z-10">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={[
                                                { name: 'Mon', value: 4000, active: 2400 },
                                                { name: 'Tue', value: 3000, active: 1398 },
                                                { name: 'Wed', value: 2000, active: 9800 },
                                                { name: 'Thu', value: 2780, active: 3908 },
                                                { name: 'Fri', value: 1890, active: 4800 },
                                                { name: 'Sat', value: 2390, active: 3800 },
                                                { name: 'Sun', value: 3490, active: 4300 },
                                            ]}>
                                                <defs>
                                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#4a4a4a', fontSize: 10, fontWeight: 'bold' }} dy={10} />
                                                <YAxis hide />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                                                />
                                                <Area type="monotone" dataKey="value" stroke="#ffffff" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- AUDIENCE TAB --- */}
                        {activeTab === 'audience' && (
                            <div className="animate-fade-in">
                                <div className="bg-[#151515] rounded-[32px] border border-white/5 overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-white/2 text-[10px] uppercase font-bold text-neutral-500 tracking-widest border-b border-white/5">
                                                <th className="px-8 py-6">Visitor</th>
                                                <th className="px-8 py-6">Location</th>
                                                <th className="px-8 py-6">Last Active</th>
                                                <th className="px-8 py-6">Status</th>
                                                <th className="px-8 py-6 text-right">Latest Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/2">
                                            {mockVisitors.map(vis => (
                                                <tr key={vis.id} className="hover:bg-white/[0.02] transition-colors group">
                                                    <td className="px-8 py-6 flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center font-bold text-xs">{vis.avatar}</div>
                                                        <div>
                                                            <p className="font-bold text-sm text-white">{vis.name}</p>
                                                            <p className="text-xs text-neutral-500">{vis.email}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-2 text-sm text-neutral-300"><IconGlobe className="w-3.5 h-3.5 text-neutral-500" /> {vis.location}</div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-2 text-sm text-neutral-300"><IconClock className="w-3.5 h-3.5 text-neutral-500" /> {vis.time}</div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${vis.status === 'Signed In' ? 'bg-[#34a853]/5 text-[#81c995] border-[#34a853]/20' : 'bg-white/5 text-neutral-500 border-white/10'}`}>{vis.status}</span>
                                                    </td>
                                                    <td className="px-8 py-6 text-right font-mono text-[11px] text-neutral-400 group-hover:text-white transition-colors uppercase tracking-wider">{vis.action}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* --- STUDIO TAB --- */}
                        {activeTab === 'studio' && (
                            <div className="animate-fade-in space-y-12">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="bg-[#151515] rounded-[32px] p-8 border border-white/5">
                                        <div className="space-y-4">
                                            {(books || []).filter(b => b.sellerId === seller.id).map(book => (
                                                <div key={book.id} className="flex items-center justify-between p-4 bg-[#0b0b0b] rounded-2xl border border-white/5 group hover:border-white/20 transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <img src={book.coverImageUrl} className="w-12 h-16 object-cover rounded shadow-lg" alt="" />
                                                        <div>
                                                            <p className="font-bold text-sm">{book.title}</p>
                                                            <p className="text-xs text-neutral-500 uppercase tracking-widest font-mono">₹{book.price}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => deleteBook(book.id)} className="p-2 hover:bg-red-500/10 text-neutral-500 hover:text-red-500 rounded-lg transition-colors"><IconLogout className="w-4 h-4 scale-x-[-1]" /></button>
                                                        <button onClick={() => navigate('/')} className="p-2 bg-white/5 hover:bg-white text-neutral-400 hover:text-black rounded-lg transition-all"><IconEdit className="w-4 h-4" /></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-[#151515] rounded-[40px] p-12 border border-white/5 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/[0.02] transition-all group" onClick={() => navigate('/')}>
                                        <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><IconPlus className="w-10 h-10 text-neutral-500 group-hover:text-white" /></div>
                                        <h3 className="text-2xl font-black mb-2">Create New Story</h3>
                                        <p className="text-neutral-500 max-w-xs">Launch the E-book Studio and use AI to bring your vision to life.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- SETTINGS TAB --- */}
                        {activeTab === 'settings' && (
                            <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-[#151515] rounded-[40px] p-12 border border-white/5">
                                    <div className="mb-10 flex items-center justify-between">
                                        <div className="flex flex-col gap-2">
                                            <h2 className="text-3xl font-black tracking-tighter">Marketplace Hub</h2>
                                            <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">Configure your digital storefront and bio links.</p>
                                        </div>
                                        {deploymentUrl && (
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#81c995] bg-[#34a853]/10 px-4 py-2 rounded-full border border-[#34a853]/20 shadow-[0_0_15px_rgba(52,211,153,0.1)]">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#81c995] animate-pulse"></span>
                                                Operational
                                            </div>
                                        )}
                                    </div>

                                    {/* PROMINENT BIO LINK CARD */}
                                    <div className="mb-12 p-8 rounded-[32px] bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px] rounded-full"></div>
                                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-2">Instagram / Bio Link</span>
                                                <h3 className="text-xl font-bold text-white mb-2">Your Professional Storefront</h3>
                                                <p className="text-xs text-neutral-500 font-medium max-w-sm">Use this unique URL in your social bios to direct readers straight to your books.</p>
                                            </div>
                                            <div className="flex flex-col gap-3 w-full md:w-auto">
                                                <div className="bg-black/40 border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-4 group-hover:border-white/20 transition-all">
                                                    <span className="text-xs font-mono text-neutral-400 truncate max-w-[200px]">
                                                        {window.location.origin}/s/{creatorSiteForm.slug}
                                                    </span>
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(`${window.location.origin}/s/${creatorSiteForm.slug}`);
                                                            alert("Bio link copied to clipboard!");
                                                        }}
                                                        className="text-white hover:text-indigo-400 transition-colors"
                                                    >
                                                        <IconLink className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <a
                                                    href={`${window.location.origin}/s/${creatorSiteForm.slug}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl text-center hover:bg-neutral-200 transition-all shadow-xl"
                                                >
                                                    Preview Live Site
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <label className="block text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-4">Storefront Name</label>
                                                <input name="displayName" value={creatorSiteForm.displayName} onChange={handleCreatorSiteFormChange} className="w-full bg-[#0b0b0b] border border-white/10 rounded-2xl p-5 text-sm focus:outline-none focus:border-indigo-500/40 text-white transition-all" placeholder="e.g. My Creative Haven" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-4">Custom Slug</label>
                                                <div className="flex">
                                                    <span className="bg-white/5 border border-r-0 border-white/10 text-neutral-600 px-6 flex items-center text-[10px] rounded-l-2xl font-black uppercase tracking-tighter">/s/</span>
                                                    <input name="slug" value={creatorSiteForm.slug} onChange={handleCreatorSiteFormChange} className="flex-1 bg-[#0b0b0b] border border-white/10 rounded-r-2xl p-5 text-sm focus:outline-none focus:border-indigo-500/40 text-white font-bold transition-all" />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-4">Visual Tagline</label>
                                            <textarea name="tagline" value={creatorSiteForm.tagline} onChange={handleCreatorSiteFormChange} rows={3} className="w-full bg-[#0b0b0b] border border-white/10 rounded-2xl p-5 text-sm focus:outline-none focus:border-indigo-500/40 text-white resize-none transition-all" placeholder="Tell readers what your brain looks like..." />
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-4 pt-6">
                                            <button
                                                onClick={handleDeployToGitHub}
                                                disabled={isDeploying}
                                                className="flex-1 py-5 bg-indigo-500 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-2xl shadow-indigo-500/10"
                                            >
                                                {isDeploying ? 'Syncing...' : <><IconCloudUpload className="w-5 h-5" /> Sync with Global Node</>}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    // Functional placeholder for static export
                                                    alert("Static Site Export: Generating bundle... Your gh-pages compatible index.html will be ready for download in a moment.");
                                                }}
                                                className="px-8 py-5 bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3"
                                            >
                                                <IconGithub className="w-5 h-5" /> Export for GH-Pages
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-8">
                                    <div className="bg-[#151515] rounded-[40px] p-12 border border-white/5 flex flex-col items-center justify-center text-center">
                                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-2xl relative">
                                            <IconGithub className="w-12 h-12 text-white" />
                                            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#81c995] rounded-full flex items-center justify-center border-4 border-[#151515]"><IconCheck className="w-3.5 h-3.5 text-black" /></div>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">GitHub Connected</h3>
                                        <p className="text-sm text-neutral-500 max-w-xs mb-8">Your creator hub is powered by GitHub. Changes takes ~2 mins to propagate.</p>

                                        {deploymentUrl ? (
                                            <div className="bg-[#0b0b0b] p-6 rounded-2xl border border-white/5 w-full flex justify-between items-center group cursor-pointer hover:border-white/20 transition-all">
                                                <div className="flex flex-col items-start overflow-hidden">
                                                    <span className="text-[10px] uppercase font-bold text-neutral-600 mb-1">Live URL</span>
                                                    <span className="text-xs text-neutral-400 truncate w-full">{deploymentUrl}</span>
                                                </div>
                                                <a href={deploymentUrl} target="_blank" rel="noreferrer" className="text-white bg-white/5 p-3 rounded-xl group-hover:bg-white group-hover:text-black transition-all"><IconLink className="w-5 h-5" /></a>
                                            </div>
                                        ) : (
                                            <div className="bg-[#0b0b0b] p-6 rounded-2xl border border-white/5 w-full text-xs text-neutral-600 font-bold uppercase tracking-widest">Awaiting First Deployment</div>
                                        )}
                                    </div>

                                    <div className="bg-[#151515] rounded-[32px] p-8 border border-white/5 flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-sm mb-1">Switch View</h4>
                                            <p className="text-xs text-neutral-500">View as a reader</p>
                                        </div>
                                        <button onClick={() => setCurrentUser(seller, UserType.USER)} className="px-6 py-2.5 bg-white/5 hover:bg-white hover:text-black text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all border border-white/10">Reading Mode</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- EXECUTIVE TAB --- */}
                        {activeTab === 'executive' && isOwner && (
                            <div className="animate-fade-in space-y-8">
                                <div className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border border-white/5 rounded-[40px] p-12 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-16">
                                            <div>
                                                <h2 className="text-4xl font-black tracking-tighter mb-2">Global Ecosystem</h2>
                                                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-[0.3em]">Master control & platform diagnostics</p>
                                            </div>
                                            <button className="flex items-center gap-3 px-8 py-3 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                                <IconActivity className="w-4 h-4" />
                                                Live Analytics
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                                            {[
                                                { label: 'Platform Volume', value: '₹14.2M', trend: '+12%', color: '#81c995' },
                                                { label: 'System Uptime', value: '99.99%', trend: 'Operational', color: '#81c995' },
                                                { label: 'Active Nodes', value: '1,280', trend: 'Global', color: 'white' },
                                            ].map((stat, i) => (
                                                <div key={i} className="bg-black/40 p-10 rounded-[32px] border border-white/5">
                                                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-4">{stat.label}</p>
                                                    <p className="text-4xl font-black mb-2">{stat.value}</p>
                                                    <p className={`text-[10px] font-bold uppercase tracking-widest`} style={{ color: stat.color }}>{stat.trend}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between mb-10">
                                            <h2 className="text-xl font-bold">Identity Registry</h2>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="border-b border-white/5 text-neutral-500 text-[10px] uppercase tracking-[0.2em] font-black">
                                                        <th className="py-6 px-4">Identifier</th>
                                                        <th className="py-6 px-4">Email</th>
                                                        <th className="py-6 px-4">Permissions</th>
                                                        <th className="py-6 px-4 text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-sm divide-y divide-white/2">
                                                    {Object.values(mockUsers).filter(u => u.id !== 'guest').map((user) => (
                                                        <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                                                            <td className="py-6 px-4 font-bold text-white flex items-center gap-4">
                                                                <div className="w-10 h-10 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-xs font-black">
                                                                    {user.profileImageUrl ? <img src={user.profileImageUrl} alt="" className="w-full h-full rounded-full object-cover" /> : user.name[0]}
                                                                </div>
                                                                {user.name}
                                                            </td>
                                                            <td className="py-6 px-4 text-neutral-400 font-medium">{user.email}</td>
                                                            <td className="py-6 px-4">
                                                                <span className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-black tracking-widest border ${(user as Seller).isAdmin ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'uploadedBooks' in user ? 'bg-[#81c995]/10 text-[#81c995] border-[#34a853]/20' : 'bg-white/5 text-neutral-500 border-white/10'}`}>
                                                                    {(user as Seller).isAdmin ? 'Admin' : 'uploadedBooks' in user ? 'Writer' : 'Reader'}
                                                                </span>
                                                            </td>
                                                            <td className="py-6 px-4 text-right">
                                                                <button className="text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-colors underline opacity-50 hover:opacity-100">Configure</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                <div className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-[#0b0b0b]/90 backdrop-blur-xl border-t border-white/10 flex items-center justify-around z-50 pb-safe">
                    <MobileNavItem id="overview" label="Stats" icon={IconActivity} />
                    <MobileNavItem id="audience" label="Visitors" icon={IconUser} />
                    <MobileNavItem id="studio" label="Content" icon={IconCloudUpload} />
                    <MobileNavItem id="settings" label="Config" icon={IconSettings} />
                    {isOwner && <MobileNavItem id="executive" label="Executive" icon={IconDashboard} />}
                </div>
            </div>
        </div>
    );
};

export default SellerDashboardContent;
