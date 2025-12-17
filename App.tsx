
import React from 'react';
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
import { initGA } from './services/analyticsService';
import StudioLandingPage from './pages/StudioLandingPage';

// Policy Pages
import ContactPage from './pages/ContactPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

// Reverting to HashRouter for stability in cloud/preview environments
const { BrowserRouter, Routes, Route, useLocation } = ReactRouterDOM as any;

const STUDIO_URL = "https://co-writter-studio.web.app";
const MAIN_SITE_URL = "https://co-writter.github.io";

const ExternalRedirect = ({ to }: { to: string }) => {
  React.useEffect(() => {
    window.location.href = to;
  }, [to]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="animate-pulse">Redirecting to Studio...</div>
    </div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div key={location.pathname} className="flex-grow flex flex-col animate-page-enter will-change-transform origin-top">
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/s/:slug" element={<CreatorSitePage />} />
        <Route path="/site/:username" element={<HostingPreviewPage />} />
        <Route path="/edit-ebook/:bookId" element={<EditEBookPage />} />

        {/* Studio Landing Page on Main Site - Redirects to App if clicked, or acts as funnel */}
        <Route path="/ebook-studio" element={<StudioLandingPage />} />
        <Route path="/studio" element={<StudioLandingPage />} />

        <Route path="/read/:bookId" element={<EbookReaderPage />} />

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      </Routes>
    </div>
  );
};

const StudioProtectedRoutes = () => {
  // In a real implementation with shared auth state (e.g. via cookie or token passed), we would check here.
  // Since Firebase Auth persists in IndexedDB, it *might* share across subdomains if configured, but 
  // across different domains (github.io vs web.app) it does not by default without custom logic.
  // For now, we rely on the user having logged in via the Github.io flow which usually redirects here,
  // OR they just login directly here if the session isn't found.

  return (
    <Routes>
      <Route path="/" element={<EbookStudioPage />} />
      <Route path="/ebook-studio" element={<EbookStudioPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<EbookStudioPage />} />
    </Routes>
  )
}

const App: React.FC = () => {

  // Logic to identify if we are on the "Studio" (Application) Domain
  const isStudioDomain =
    window.location.hostname.includes('firebaseapp.com') ||
    window.location.hostname.includes('web.app') ||
    window.location.hostname.includes('localhost');

  React.useEffect(() => {
    initGA();
  }, []);

  return (
    <AppProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-black font-sans text-foreground overflow-x-hidden relative">

          {/* === GLOBAL ANTIGRAVITY THEME BACKGROUND === */}
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,30,1)_0%,rgba(0,0,0,1)_100%)]"></div>
            <div className="absolute top-[20%] left-[15%] w-32 h-32 border border-white/5 rounded-full animate-float opacity-30 blur-[1px]"></div>
            <div className="absolute bottom-[25%] right-[20%] w-64 h-64 border border-white/5 rotate-45 animate-float-delayed opacity-20"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[grid-flow_8s_linear_infinite]"></div>
          </div>

          {/* === Foreground Content === */}
          <div className="flex-grow relative z-10 flex flex-col w-full">
            {!isStudioDomain && <Navbar />}

            <main className="flex-grow flex flex-col">
              {isStudioDomain ? (
                <StudioProtectedRoutes />
              ) : (
                <AnimatedRoutes />
              )}
            </main>

            {!isStudioDomain && <Footer />}
          </div>

        </div>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
