

import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { APP_NAME, BORDER_CLASS, ENGINE_NAME } from '../constants';

const { Link, useLocation } = ReactRouterDOM as any;

const Footer: React.FC = () => {
  const location = useLocation();

  // HIDE FOOTER ON STUDIO PAGE, STANDALONE PREVIEW, DASHBOARD, OR READER PAGE
  if (location.pathname === '/ebook-studio' || location.pathname.startsWith('/site/') || location.pathname === '/dashboard' || location.pathname.startsWith('/read/')) {
      return null;
  }

  return (
    <footer className={`bg-brand-bg-dark text-neutral-500 py-10 mt-16 border-t ${BORDER_CLASS}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          <div>
            <h3 className="text-white font-black text-2xl mb-2 tracking-tighter lowercase">{APP_NAME}</h3>
            <p className="font-mono text-sm opacity-75">&copy; {new Date().getFullYear()} All rights reserved.</p>
            
            <div className="mt-4 space-y-1">
                <p className="text-xs text-neutral-400">
                    Where Thought Becomes Literature.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-1.5 opacity-80 hover:opacity-100 transition-opacity mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cogito-indigo animate-pulse"></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Powered by {ENGINE_NAME}</span>
                </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link to="/contact" className="hover:text-brand-accent transition-colors duration-300 text-sm">Contact Us</Link>
            <Link to="/terms-and-conditions" className="hover:text-brand-accent transition-colors duration-300 text-sm">Terms</Link>
            <Link to="/privacy-policy" className="hover:text-brand-accent transition-colors duration-300 text-sm">Privacy</Link>
            <Link to="/refund-policy" className="hover:text-brand-accent transition-colors duration-300 text-sm">Refunds</Link>
            <Link to="/shipping-policy" className="hover:text-brand-accent transition-colors duration-300 text-sm">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;