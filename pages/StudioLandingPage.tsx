
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { IconRocket, IconBrain, IconSettings, IconArrowRight, IconBook } from '../constants';
import MorphicEye from '../components/MorphicEye';

const { useNavigate } = ReactRouterDOM as any;

const StudioLandingPage: React.FC = () => {
    const navigate = useNavigate();
    const [phase, setPhase] = useState<'init' | 'menu' | 'launch'>('init');

    useEffect(() => {
        // Initial "redirecting" / loading animation
        const timer = setTimeout(() => {
            setPhase('menu');
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleEnterStudio = () => {
        setPhase('launch');
        setTimeout(() => {
            // Redirect to the Studio Domain
            window.location.href = "https://co-writter-studio.web.app/ebook-studio";
        }, 1200);
    };

    if (phase === 'init') {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-white/20 blur-xl rounded-full animate-pulse"></div>
                    <MorphicEye className="w-24 h-24 border border-white/50 bg-black relative z-10" />
                </div>
                <div className="mt-8 flex flex-col items-center gap-2">
                    <h1 className="text-white text-2xl font-black tracking-tighter uppercase animate-slide-up">
                        Co-Writer Studio
                    </h1>
                    <div className="flex items-center gap-2 text-neutral-500 font-mono text-xs uppercase tracking-widest animate-fade-in delay-200">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Initializing Environment...
                    </div>
                </div>
            </div>
        );
    }

    if (phase === 'launch') {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 animate-pulse-square"></div>
                <MorphicEye className="w-32 h-32 border border-white bg-black animate-spin-slow" />
                <h2 className="mt-8 text-white text-xl font-bold uppercase tracking-[0.3em] animate-pulse">Launching Neural Link...</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <div className="z-10 w-full max-w-4xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left: Branding */}
                <div className="text-center md:text-left space-y-6">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                        <IconBrain className="w-3 h-3 text-indigo-400" />
                        <span>Agentic Workflow Engine v3.0</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-neutral-600 leading-[0.9]">
                        Studio <br /> Environment
                    </h1>
                    <p className="text-neutral-500 max-w-md text-sm leading-relaxed">
                        Welcome to the dedicated creation workspace. Access your projects, configure your AI agents, and write without distractions.
                    </p>
                </div>

                {/* Right: Actions */}
                <div className="space-y-4 w-full max-w-md">

                    <button
                        onClick={handleEnterStudio}
                        className="group w-full relative overflow-hidden bg-white text-black p-1 rounded-2xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <div className="relative z-10 bg-white border border-neutral-200 rounded-xl px-6 py-6 flex items-center justify-between">
                            <div className="text-left">
                                <h3 className="text-lg font-bold uppercase tracking-tight flex items-center gap-2">
                                    <IconRocket className="w-5 h-5" /> Enter Studio
                                </h3>
                                <p className="text-[10px] text-neutral-500 font-mono mt-1">NEW PROJECT / OPEN RECENT</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:rotate-45">
                                <IconArrowRight className="w-5 h-5" />
                            </div>
                        </div>
                    </button>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="group relative overflow-hidden bg-neutral-900 border border-white/10 p-5 rounded-2xl hover:bg-neutral-800 transition-colors text-left hover:border-white/30">
                            <IconSettings className="w-6 h-6 text-neutral-500 mb-3 group-hover:text-white transition-colors" />
                            <h3 className="text-sm font-bold text-white uppercase tracking-tight">Agent Settings</h3>
                            <p className="text-[9px] text-neutral-500 mt-1 pb-4">Configure Models & Personas</p>
                        </button>
                        <button className="group relative overflow-hidden bg-neutral-900 border border-white/10 p-5 rounded-2xl hover:bg-neutral-800 transition-colors text-left hover:border-white/30">
                            <IconBook className="w-6 h-6 text-neutral-500 mb-3 group-hover:text-white transition-colors" />
                            <h3 className="text-sm font-bold text-white uppercase tracking-tight">Archives</h3>
                            <p className="text-[9px] text-neutral-500 mt-1 pb-4">View past drafts</p>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StudioLandingPage;
