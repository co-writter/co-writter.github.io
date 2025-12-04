

import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { APP_NAME, BORDER_CLASS, ENGINE_NAME, IconGithub, IconTwitter, IconInstagram, IconLinkedin } from '../constants';

const { Link, useLocation } = ReactRouterDOM as any;

const Footer: React.FC = () => {
  const location = useLocation();

  // HIDE FOOTER ON STUDIO PAGE, STANDALONE PREVIEW, DASHBOARD, OR READER PAGE
  if (location.pathname === '/ebook-studio' || location.pathname.startsWith('/site/') || location.pathname === '/dashboard' || location.pathname.startsWith('/read/')) {
    return null;
  }

  return (
    <footer className={`bg-black text-neutral-500 py-12 mt-auto border-t border-white/10 relative overflow-hidden`}>
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">CW</div>
              <h3 className="text-white font-bold text-xl tracking-tighter lowercase group-hover:text-white/80 transition-colors">{APP_NAME}</h3>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6">
              Where Thought Becomes Literature. The all-in-one AI platform for modern authors.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <IconTwitter className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <IconGithub className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <IconInstagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <IconLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/store" className="hover:text-white transition-colors">Browse Store</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Creator Login</Link></li>
              <li><Link to="/ebook-studio" className="hover:text-white transition-colors">AI Studio</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Licenses</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="font-mono uppercase tracking-widest">Powered by {ENGINE_NAME}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;