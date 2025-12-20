
import React, { ErrorInfo, ReactNode } from 'react';
import MorphicEye from './MorphicEye';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends React.Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#0b0b0b] flex flex-col items-center justify-center p-8 text-center font-sans overflow-hidden relative">
                    {/* Cyberpunk Grid Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,10,10,1)_0%,rgba(0,0,0,1)_100%)] opacity-50"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col items-center animate-fade-in">
                        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-full shadow-[0_0_50px_rgba(239,68,68,0.2)]">
                            <MorphicEye className="w-16 h-16 border border-red-500/30 rounded-full" />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">SYSTEM FAULT</h1>
                        <p className="text-neutral-500 max-w-md mx-auto mb-10 text-xs md:text-sm font-mono uppercase tracking-[0.2em] leading-relaxed">
                            Neural uplink interrupted. The local node encountered an unexpected state. Execution halted to prevent data corruption.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => window.location.reload()}
                                className="px-8 py-4 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-all shadow-xl"
                            >
                                Reboot System
                            </button>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-full hover:bg-white/10 transition-all"
                            >
                                Return to Origin
                            </button>
                        </div>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="mt-12 p-6 bg-black/40 border border-red-500/20 rounded-2xl text-left max-w-2xl overflow-auto custom-scrollbar">
                                <p className="text-red-400 font-mono text-[10px] whitespace-pre-wrap">
                                    {this.state.error.stack}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.children;
    }
}

export default ErrorBoundary;
