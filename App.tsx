

import React, { Suspense } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import StorePage from './pages/StorePage';
import DashboardPage from './pages/DashboardPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import PricingPage from './pages/PricingPage';
import { AppProvider } from './contexts/AppContext';
import CreatorSitePage from './pages/CreatorSitePage';
import EditEBookPage from './pages/EditEBookPage';
import EbookStudioPage from './pages/EbookStudioPage';
import EbookReaderPage from './pages/EbookReaderPage';
import HostingPreviewPage from './pages/HostingPreviewPage';

// Policy Pages
import ContactPage from './pages/ContactPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

// Production Components
import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/LoadingScreen';

const { HashRouter, Routes, Route, useLocation } = ReactRouterDOM as any;

const AnimatedRoutes = () => {
  const location = useLocation();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    // Key is vital for triggering the animation on route change
    <div key={location.pathname} className="flex-grow flex flex-col animate-page-enter">
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {/* Internal Creator Page */}
        <Route path="/s/:slug" element={<CreatorSitePage />} />
        {/* Standalone Hosting Preview */}
        <Route path="/site/:username" element={<HostingPreviewPage />} />

        <Route path="/edit-ebook/:bookId" element={<EditEBookPage />} />
        <Route path="/ebook-studio" element={<EbookStudioPage />} />
        <Route path="/read/:bookId" element={<EbookReaderPage />} />

        {/* Policy Routes */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

        {/* 404 Fallback */}
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">404</h1>
            <p className="text-xl text-gray-400 mb-8">Page not found in this dimension.</p>
            <a href="/" className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors">Return Home</a>
          </div>
        } />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <HashRouter>
          <div className="flex flex-col min-h-screen bg-black font-sans text-foreground overflow-x-hidden relative selection:bg-white/20 selection:text-white">

            {/* === GLOBAL ANTIGRAVITY THEME BACKGROUND === */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
              {/* Deep Space Gradients */}
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,30,1)_0%,rgba(0,0,0,1)_100%)]"></div>

              {/* Floating Debris / Geometry */}
              <div className="absolute top-[20%] left-[15%] w-32 h-32 border border-white/5 rounded-full animate-float opacity-30 blur-[1px]"></div>
              <div className="absolute bottom-[25%] right-[20%] w-64 h-64 border border-white/5 rotate-45 animate-float-delayed opacity-20"></div>

              {/* Scanlines */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[grid-flow_8s_linear_infinite]"></div>
            </div>

            {/* === Foreground Content === */}
            <div className="flex-grow relative z-10 flex flex-col w-full">
              <Navbar />
              <main className="flex-grow flex flex-col">
                <Suspense fallback={<LoadingScreen />}>
                  <AnimatedRoutes />
                </Suspense>
              </main>
              <Footer />
            </div>

          </div>
        </HashRouter>
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;