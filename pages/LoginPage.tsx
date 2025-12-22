
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { APP_NAME, IconRocket, IconUser, IconArrowRight } from '../constants';
import { UserType, User } from '../types';
import MorphicEye from '../components/MorphicEye';
import { getAppBaseUrl } from '../App';

const { useNavigate, Link } = ReactRouterDOM as any;

declare global {
    interface Window {
        google: any;
    }
}

// Official Colored Google "G" Icon
const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
        />
        <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
        />
        <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
        />
        <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
        />
    </svg>
);

const LoginPage: React.FC = () => {
    const { currentUser, userType, setCurrentUser, handleEmailLogin, handleFirebaseGoogleLogin } = useAppContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);

    // Login Mode: 'social' or 'email'
    const [loginMode, setLoginMode] = useState<'social' | 'email'>('social');

    // Email Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // If already logged in, redirect to dashboard
    React.useEffect(() => {
        if (currentUser && userType !== UserType.GUEST) {
            navigate('/dashboard');
        }
    }, [currentUser, userType, navigate]);

    const onFirebaseGoogleLogin = async () => {
        setIsLoading(true);
        setErrorMsg('');

        try {
            await handleFirebaseGoogleLogin();
            // HandleFirebaseGoogleLogin handles redirect internally if on github.io
            // If it returns, we are on web.app and login was successful
            navigate('/dashboard');
        } catch (error: any) {
            console.error("Firebase Login Error", error);
            setErrorMsg(error.message || "Authentication failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const onEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        setIsLoading(true);

        try {
            const result = await handleEmailLogin(email.trim(), password.trim());
            if (result.success) {
                navigate('/dashboard');
            } else {
                setErrorMsg(result.message || "Login failed.");
            }
        } catch (err) {
            setErrorMsg("System error.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative font-sans selection:bg-white/20 overflow-hidden bg-black">

            {/* HACKATHON GRADE BACKGROUND ELEMENTS */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,30,40,1)_0%,rgba(0,0,0,1)_100%)]"></div>

            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
            </div>

            {/* SCANNING LASER EFFECT */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[grid-flow_10s_linear_infinite] opacity-20"></div>

            <div className="relative z-10 w-full max-w-sm flex flex-col items-center">

                {/* Identity Entrance */}
                <div className="mb-12 relative group">
                    <div className="absolute -inset-8 bg-white/5 blur-[50px] rounded-full animate-pulse-slow"></div>
                    <MorphicEye className="w-24 h-24 border border-white/20 bg-black/40 backdrop-blur-3xl shadow-[0_0_50px_rgba(255,255,255,0.1)] rounded-full relative z-10" />
                </div>

                <div className="w-full bg-black/40 backdrop-blur-3xl border border-white/10 p-10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] rounded-[40px] relative overflow-hidden transition-all duration-700 hover:border-white/20 group">

                    <div className="text-center mb-10">
                        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-4">
                            <span className="text-[8px] text-white font-black uppercase tracking-[0.4em]">Integrated Secure Node</span>
                        </div>
                        <h1 className="text-3xl font-black tracking-tighter text-white mb-1 uppercase">{APP_NAME}</h1>
                        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-[0.3em]">Studio Access</p>
                    </div>

                    {/* Pro Toggle or Landing Info */}
                    {(window.location.hostname.includes('github.io') || window.location.hostname === 'co-writter.github.io') ? (
                        <div className="mb-8 text-center">
                            <p className="text-white text-xs leading-relaxed mb-6">
                                Co-Writter Studio is hosted on our secure application cloud.
                                Access advanced writing tools, AI co-authoring, and your personal dashboard.
                            </p>
                            <a
                                href="https://co-writter-studio.web.app/login"
                                className="inline-flex w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] items-center justify-center gap-2 hover:bg-neutral-200 transition-all shadow-xl"
                            >
                                <MorphicEye className="w-5 h-5 border border-black/10 rounded-full" isActive={false} />
                                <span>Enter Studio</span>
                            </a>
                        </div>
                    ) : (
                        <div className="flex bg-white/5 p-1 rounded-2xl mb-10 border border-white/5">
                            <button
                                onClick={() => setLoginMode('social')}
                                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${loginMode === 'social' ? 'bg-white text-black shadow-2xl' : 'text-neutral-500 hover:text-white'}`}
                            >
                                Guest
                            </button>
                            <button
                                onClick={() => setLoginMode('email')}
                                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${loginMode === 'email' ? 'bg-white text-black shadow-2xl' : 'text-neutral-500 hover:text-white'}`}
                            >
                                Operator
                            </button>
                        </div>
                    )}

                    {/* Login Forms - Only show if NOT on Landing Page (or if we provided a way to toggle, but for now strict separation) */}
                    {!(window.location.hostname.includes('github.io')) && (
                        loginMode === 'social' ? (
                            <div className="animate-fade-in">
                                <button
                                    onClick={onFirebaseGoogleLogin}
                                    disabled={isLoading}
                                    className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all duration-500 shadow-xl"
                                >
                                    {isLoading ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    ) : (
                                        <GoogleIcon />
                                    )}
                                    <span>Link with Google</span>
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={onEmailSubmit} className="space-y-6 animate-fade-in">
                                <div className="space-y-4">
                                    <input
                                        type="email"
                                        placeholder="Operator ID"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-neutral-700"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="password"
                                        placeholder="Access Key"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-neutral-700"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] hover:bg-neutral-200 transition-all duration-500 shadow-2xl"
                                >
                                    {isLoading ? 'Verifying...' : 'Authorize Access'}
                                </button>
                            </form>
                        )
                    )}

                    {errorMsg && (
                        <div className="mt-8 text-red-500 text-[10px] bg-red-500/5 p-4 rounded-2xl border border-red-500/20 text-center font-bold tracking-tight animate-slide-up">
                            {errorMsg}
                        </div>
                    )}

                    <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-center">
                        <Link to="/" className="text-[10px] font-black uppercase tracking-widest text-neutral-600 hover:text-white transition-colors">
                            Return to Landing
                        </Link>
                    </div>
                </div>

                <p className="mt-12 text-[10px] text-neutral-600 font-bold uppercase tracking-[0.4em] opacity-40">
                    Neural Design System 4.2
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
