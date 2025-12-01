

import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { EBook, Seller, CreatorSiteConfig, UserType } from '../../types';
import BookUploadForm from '../BookUpload/BookUploadForm';
import AnalyticsChart from './AnalyticsChart';
import { 
    IconUpload, IconSettings, IconBook, IconSparkles, 
    IconEdit, IconWallet, IconLink, IconCheck, IconRocket, 
    IconActivity, IconStore, IconEye, IconGithub, IconCloudUpload
} from '../../constants'; 
import * as ReactRouterDOM from 'react-router-dom';
import { saveUserDataToGitHub } from '../../services/cloudService';

const { Link, useNavigate } = ReactRouterDOM as any;

export const SellerDashboardContent: React.FC = () => {
  const { currentUser, updateSellerCreatorSite, addCreatedBook, verifyUser, setCurrentUser, userType } = useAppContext();
  const seller = currentUser as Seller; 
  const [activeSellerTab, setActiveSellerTab] = useState<'overview' | 'studio' | 'config'>('overview');
  const navigate = useNavigate();
  const [isSwitching, setIsSwitching] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentUrl, setDeploymentUrl] = useState<string | null>(null);

  const myUploadedBooks = seller?.uploadedBooks || [];

  const [creatorSiteForm, setCreatorSiteForm] = useState<CreatorSiteConfig>(
    seller?.creatorSite || {
      isEnabled: false,
      slug: seller?.name.toLowerCase().replace(/\s+/g, '-'),
      theme: 'dark-minimal',
      profileImageUrl: seller?.profileImageUrl || '',
      displayName: seller?.name || '',
      tagline: 'Author & Digital Creator',
      showcasedBookIds: [],
    }
  );

  useEffect(() => {
    if (seller?.creatorSite) {
      setCreatorSiteForm(seller.creatorSite);
    } else if (seller) {
      setCreatorSiteForm(prev => ({
        ...prev,
        slug: seller.name.toLowerCase().replace(/\s+/g, '-'),
        displayName: seller.name,
        profileImageUrl: seller.profileImageUrl || ''
      }));
    }
  }, [seller]);

  if (!seller) return null;
  
  const handleBookUploaded = (book: EBook) => {
    addCreatedBook(book); 
    setActiveSellerTab('overview');
  };

  const handleCreatorSiteFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      if (name === 'showcasedBookIds') {
        const bookId = value;
        setCreatorSiteForm(prev => ({
          ...prev,
          showcasedBookIds: checked
            ? [...prev.showcasedBookIds, bookId]
            : prev.showcasedBookIds.filter(id => id !== bookId),
        }));
      } else {
         setCreatorSiteForm(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setCreatorSiteForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveCreatorSite = (e: React.FormEvent) => {
    e.preventDefault();
    updateSellerCreatorSite(creatorSiteForm);
    alert('Profile Updated locally. Deploy to make it public.');
  };

  const handleDeployToGitHub = async () => {
      if (!creatorSiteForm.slug) return;
      setIsDeploying(true);
      
      // Save local config first
      updateSellerCreatorSite(creatorSiteForm);

      const result = await saveUserDataToGitHub(creatorSiteForm.slug, {
          sellerProfile: seller,
          siteConfig: creatorSiteForm,
          books: myUploadedBooks
      });

      if (result.success) {
          setDeploymentUrl(result.url || null);
      } else {
          alert("Deployment Failed: " + result.message);
      }
      setIsDeploying(false);
  };
  
  const handleGetVerified = async () => {
      verifyUser();
      alert(`Verification Successful!`);
  };

  const handleSwitchAccount = () => {
      // Trigger Warp-out animation
      setIsSwitching(true);
      
      setTimeout(() => {
          // Toggle back to User Mode (Reader)
          setCurrentUser(currentUser, UserType.USER);
      }, 600);
  };

  return (
    <div className={`w-full font-sans min-h-screen bg-transparent text-white selection:bg-white/20 pb-20 transition-all duration-500 ${isSwitching ? 'animate-warp-out' : 'animate-page-enter'}`}>
        
        {/* Ambient Glow */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-32">
            
            {/* --- HEADER --- */}
            <header className="group flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-white/10 pb-8 bg-black/20 backdrop-blur-md rounded-[32px] p-8 shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:bg-black/30 hover:border-white/20 animate-slide-up">
                <div>
                     <div className="flex items-center gap-3 mb-2 animate-slide-up-stagger delay-100">
                        <span className="px-2 py-0.5 rounded-full border border-white/20 bg-black text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                            Writer Dashboard
                        </span>
                        {seller.isVerified && <span className="text-white text-[9px] font-bold uppercase tracking-widest flex items-center gap-1"><IconCheck className="w-2 h-2"/> Verified</span>}
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none mb-4 animate-text-reveal">
                        {seller.name}
                    </h1>
                     <div className="flex gap-6 text-sm font-medium text-neutral-500 font-mono flex-wrap animate-slide-up-stagger delay-200">
                        <span>{seller.username || '@' + seller.name.toLowerCase().replace(/\s/g, '')}</span>
                        <span>•</span>
                        <span className="text-white">{myUploadedBooks.length} Books Published</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 animate-slide-up-stagger delay-300">
                     {/* Switch Account Button */}
                     <button 
                         onClick={handleSwitchAccount}
                         className="px-4 py-2 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all hover:scale-105"
                     >
                         Go to Reading Mode
                     </button>
                    <button onClick={() => navigate('/ebook-studio')} className="h-10 px-6 bg-white text-black font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2 rounded-full shadow-glow-white">
                        <IconRocket className="w-4 h-4" /> Start Writing
                    </button>
                    {!seller.isVerified && (
                        <button onClick={handleGetVerified} className="h-10 px-6 border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center gap-2 rounded-full">
                            Get Verified
                        </button>
                    )}
                </div>
            </header>

            {/* --- TABS (Scrollable on mobile) --- */}
             <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-2 no-scrollbar animate-slide-up-stagger delay-500">
                {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'studio', label: 'Publish Book' },
                    { id: 'config', label: 'Deploy & Settings' },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveSellerTab(tab.id as any)}
                        className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all rounded-full flex-shrink-0 ${activeSellerTab === tab.id ? 'bg-white text-black shadow-glow-white scale-105' : 'bg-black/40 backdrop-blur-md border border-white/10 text-neutral-500 hover:text-white hover:bg-white/10'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* --- CONTENT --- */}
            <div className="animate-slide-up">
                
                {/* === OVERVIEW TAB === */}
                {activeSellerTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Stats */}
                        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
                            {[
                                { label: "Total Earnings", value: "₹24,500", icon: IconWallet, change: "+12%" },
                                { label: "Readers", value: "1,240", icon: IconActivity, change: "+5%" },
                                { label: "Books Sold", value: "342", icon: IconBook, change: "+8%" }
                            ].map((stat, i) => (
                                <div key={i} className="bg-black/40 backdrop-blur-md border border-white/10 p-6 group hover:border-white/30 transition-all rounded-[24px]">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="text-neutral-500 group-hover:text-white transition-colors">
                                            <stat.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-green-500 text-[10px] font-bold font-mono bg-green-900/20 px-1.5 py-0.5 rounded-full">{stat.change}</span>
                                    </div>
                                    <h3 className="text-4xl font-black text-white tracking-tighter mb-1">{stat.value}</h3>
                                    <p className="text-neutral-600 text-[10px] uppercase font-bold tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Chart */}
                        <div className="lg:col-span-2 bg-black/40 backdrop-blur-md border border-white/10 p-0 h-[450px] relative rounded-[32px]">
                             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                            <AnalyticsChart className="h-full w-full" />
                        </div>

                        {/* Recent Uploads */}
                        <div className="lg:col-span-1 bg-black/40 backdrop-blur-md border border-white/10 p-6 flex flex-col rounded-[32px]">
                            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                                <h3 className="text-white font-bold text-sm uppercase tracking-widest">Recent Books</h3>
                                <button onClick={() => setActiveSellerTab('studio')} className="text-[10px] bg-white text-black px-3 py-1 font-bold hover:bg-neutral-200 rounded-full">NEW</button>
                            </div>
                            <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar">
                                {myUploadedBooks.length > 0 ? (
                                    myUploadedBooks.map(book => (
                                        <div key={book.id} className="flex gap-4 group cursor-default">
                                            <img src={book.coverImageUrl} alt="" className="w-12 h-16 object-cover border border-white/10 transition-all rounded-sm" />
                                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                <h4 className="text-white text-sm font-bold truncate group-hover:text-neutral-300 transition-colors">{book.title}</h4>
                                                <p className="text-neutral-500 text-xs font-mono">₹{book.price}</p>
                                            </div>
                                            <Link to={`/edit-ebook/${book.id}`} className="self-center p-2 text-neutral-600 hover:text-white transition-colors">
                                                <IconEdit className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-neutral-500 text-xs text-center py-10 font-mono">NO DATA</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* === UPLOAD TAB === */}
                {activeSellerTab === 'studio' && (
                    <div className="max-w-4xl mx-auto">
                        <BookUploadForm onBookUploaded={handleBookUploaded} />
                    </div>
                )}

                {/* === CONFIG TAB (With Deployment) === */}
                {activeSellerTab === 'config' && (
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[calc(100vh-250px)] min-h-[600px]">
                        
                        {/* Left: Configuration Form */}
                        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 overflow-y-auto custom-scrollbar flex flex-col h-full rounded-[32px]">
                            
                            {/* Deployment Zone */}
                            <div className="mb-8 p-6 bg-gradient-to-br from-indigo-900/20 to-black border border-indigo-500/20 rounded-2xl">
                                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                    <IconGithub className="w-5 h-5"/> GitHub Hosting
                                </h3>
                                <p className="text-neutral-400 text-xs mb-4">
                                    Deploy your creator profile as a standalone static site.
                                </p>
                                
                                {deploymentUrl ? (
                                    <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-xl flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            <div>
                                                <p className="text-xs text-green-400 font-bold uppercase tracking-widest">Live</p>
                                                <a href={`#/site/${creatorSiteForm.slug}`} target="_blank" className="text-white text-sm hover:underline font-mono truncate max-w-[200px] block">
                                                    {deploymentUrl}
                                                </a>
                                            </div>
                                        </div>
                                        <Link 
                                            to={`/site/${creatorSiteForm.slug}`}
                                            target="_blank"
                                            className="px-4 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-neutral-200"
                                        >
                                            Visit Site
                                        </Link>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={handleDeployToGitHub}
                                        disabled={isDeploying}
                                        className="w-full py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-neutral-200 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isDeploying ? (
                                            <>Deploying to GitHub Pages...</>
                                        ) : (
                                            <><IconCloudUpload className="w-4 h-4"/> Deploy Site</>
                                        )}
                                    </button>
                                )}
                            </div>

                            <div className="mb-8">
                                <h2 className="text-2xl font-black text-white tracking-tight mb-2">Profile Settings</h2>
                                <p className="text-neutral-500 text-xs">Edit your public profile page.</p>
                            </div>
                            
                            <form onSubmit={handleSaveCreatorSite} className="space-y-6 flex-1">
                                <div>
                                    <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Display Name</label>
                                    <input type="text" name="displayName" value={creatorSiteForm.displayName} onChange={handleCreatorSiteFormChange} className="w-full bg-[#111] border border-white/10 p-3 text-white text-sm focus:outline-none focus:border-white transition-colors placeholder-neutral-700 font-mono rounded-lg" />
                                </div>
                                
                                <div>
                                    <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Tagline / Bio</label>
                                    <textarea name="tagline" value={creatorSiteForm.tagline} onChange={handleCreatorSiteFormChange} rows={3} className="w-full bg-[#111] border border-white/10 p-3 text-white text-sm focus:outline-none focus:border-white transition-colors placeholder-neutral-700 font-mono resize-none rounded-lg"></textarea>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Site Slug (Username)</label>
                                    <div className="flex items-center">
                                        <span className="bg-[#0a0a0a] border border-r-0 border-white/10 text-neutral-500 p-3 text-xs font-mono rounded-l-lg">github.io/</span>
                                        <input type="text" name="slug" value={creatorSiteForm.slug} onChange={handleCreatorSiteFormChange} className="flex-1 bg-[#111] border border-white/10 p-3 text-white text-sm focus:outline-none focus:border-white transition-colors font-mono rounded-r-lg" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Theme</label>
                                    <select name="theme" value={creatorSiteForm.theme} onChange={handleCreatorSiteFormChange} className="w-full bg-[#111] border border-white/10 p-3 text-white text-sm focus:outline-none focus:border-white transition-colors rounded-lg">
                                        <option value="dark-minimal">Dark Minimal</option>
                                        <option value="light-elegant">Light Elegant</option>
                                    </select>
                                </div>
                                
                                <div className="pt-2">
                                     <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-4 h-4 border border-white/20 flex items-center justify-center rounded-sm ${creatorSiteForm.isEnabled ? 'bg-white' : 'bg-black'}`}>
                                            {creatorSiteForm.isEnabled && <IconCheck className="w-3 h-3 text-black"/>}
                                        </div>
                                        <input type="checkbox" name="isEnabled" checked={creatorSiteForm.isEnabled} onChange={handleCreatorSiteFormChange} className="hidden" />
                                        <span className="text-xs font-bold text-neutral-400 group-hover:text-white transition-colors uppercase tracking-widest">Enable Public Access</span>
                                    </label>
                                </div>

                                <div className="border-t border-white/10 pt-6">
                                    <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-4">Showcase Books</label>
                                    <div className="space-y-1 max-h-60 overflow-y-auto custom-scrollbar border border-white/10 p-1 bg-[#0a0a0a] rounded-lg">
                                        {myUploadedBooks.map(book => (
                                            <label key={book.id} className="flex items-center gap-3 p-2 hover:bg-white/5 cursor-pointer group">
                                                <div className={`w-3 h-3 border border-white/20 flex items-center justify-center rounded-sm ${creatorSiteForm.showcasedBookIds.includes(book.id) ? 'bg-white' : 'bg-transparent'}`}>
                                                    {creatorSiteForm.showcasedBookIds.includes(book.id) && <IconCheck className="w-2 h-2 text-black"/>}
                                                </div>
                                                <input 
                                                    type="checkbox" 
                                                    name="showcasedBookIds" 
                                                    value={book.id}
                                                    checked={creatorSiteForm.showcasedBookIds.includes(book.id)}
                                                    onChange={handleCreatorSiteFormChange}
                                                    className="hidden"
                                                />
                                                <span className="text-xs text-neutral-400 group-hover:text-white font-mono truncate">{book.title}</span>
                                            </label>
                                        ))}
                                        {myUploadedBooks.length === 0 && <p className="text-neutral-600 text-[10px] p-2 font-mono">No books available.</p>}
                                    </div>
                                </div>

                                <button type="submit" className="w-full py-4 bg-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-colors mt-auto rounded-full border border-white/10">
                                    Save Changes Locally
                                </button>
                            </form>
                        </div>

                        {/* Right: Live Preview (Hidden on Mobile) */}
                        <div className="bg-[#111]/80 backdrop-blur-md border border-white/10 p-8 hidden lg:flex flex-col items-center justify-center relative overflow-hidden rounded-[32px]">
                             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent pointer-events-none"></div>
                             
                             <h3 className="absolute top-6 left-6 text-neutral-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Mobile Preview
                             </h3>
                             
                             {/* Phone Frame */}
                             <div className="w-[300px] h-[550px] bg-black border-[8px] border-neutral-800 rounded-[30px] shadow-2xl relative overflow-hidden flex flex-col ring-1 ring-white/10">
                                 {/* Notch */}
                                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-800 rounded-b-xl z-20"></div>
                                 
                                 {/* Preview Content (Mini Creator Site) */}
                                 <div className={`flex-1 overflow-y-auto no-scrollbar ${creatorSiteForm.theme === 'light-elegant' ? 'bg-white text-black' : 'bg-black text-white'} pt-10 px-4 pb-4`}>
                                     {/* Header */}
                                     <div className="text-center mb-6">
                                         <div className="w-16 h-16 rounded-full bg-neutral-900 border border-white/10 mx-auto mb-3 overflow-hidden">
                                             {creatorSiteForm.profileImageUrl ? (
                                                 <img src={creatorSiteForm.profileImageUrl} className="w-full h-full object-cover" alt="" />
                                             ) : (
                                                 <div className="w-full h-full flex items-center justify-center text-xs text-neutral-600 font-bold">{creatorSiteForm.displayName.charAt(0)}</div>
                                             )}
                                         </div>
                                         <h3 className="font-bold text-lg leading-tight">{creatorSiteForm.displayName || 'Creator Name'}</h3>
                                         <p className="opacity-60 text-[10px] mt-1 line-clamp-2">{creatorSiteForm.tagline || 'Tagline goes here...'}</p>
                                     </div>

                                     {/* Grid */}
                                     <div className="space-y-3">
                                         {myUploadedBooks.filter(b => creatorSiteForm.showcasedBookIds.includes(b.id)).map(book => (
                                             <div key={book.id} className={`flex gap-3 p-2 rounded border ${creatorSiteForm.theme === 'light-elegant' ? 'bg-gray-100 border-gray-200' : 'bg-white/5 border-white/5'}`}>
                                                 <img src={book.coverImageUrl} className="w-10 h-14 object-cover rounded-sm bg-neutral-800" alt="" />
                                                 <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                     <p className="text-[10px] font-bold truncate">{book.title}</p>
                                                     <p className="text-[9px] opacity-60">₹{book.price}</p>
                                                 </div>
                                                 <button className="self-center px-2 py-1 bg-blue-600 text-white text-[8px] font-bold uppercase rounded-full">Get</button>
                                             </div>
                                         ))}
                                         {creatorSiteForm.showcasedBookIds.length === 0 && (
                                             <div className="text-center py-10 opacity-30">
                                                 <IconBook className="w-8 h-8 mx-auto mb-2"/>
                                                 <p className="text-[9px]">No books showcased</p>
                                             </div>
                                         )}
                                     </div>
                                 </div>

                                 {/* Bottom Bar */}
                                 <div className="h-12 bg-neutral-900 border-t border-white/5 flex items-center justify-center">
                                     <div className="w-1/3 h-1 bg-white/20 rounded-full"></div>
                                 </div>
                             </div>

                             {creatorSiteForm.isEnabled && deploymentUrl && (
                                <Link to={`/site/${creatorSiteForm.slug}`} target="_blank" className="mt-6 flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest hover:text-green-400 transition-colors">
                                    <IconLink className="w-4 h-4" /> Open Live Site
                                </Link>
                             )}
                        </div>
                     </div>
                )}
            </div>
        </div>
    );
};