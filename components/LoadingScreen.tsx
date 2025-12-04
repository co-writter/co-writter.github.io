import React from 'react';

const LoadingScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
            <div className="relative">
                {/* Pulsing glow effect */}
                <div className="absolute inset-0 bg-white/20 blur-xl rounded-full animate-pulse"></div>

                {/* Logo container */}
                <div className="relative z-10 w-24 h-24 border-2 border-white/10 rounded-2xl flex items-center justify-center bg-zinc-900/50 backdrop-blur-sm">
                    <span className="text-4xl font-bold tracking-tighter">CW</span>
                </div>

                {/* Orbiting loading indicator */}
                <div className="absolute inset-[-10px] border-t-2 border-white rounded-full animate-spin"></div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-2">
                <h3 className="text-xl font-medium tracking-wide">co-writter</h3>
                <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
