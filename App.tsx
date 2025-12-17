
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
import { AppProvider, useAppContext } from './contexts/AppContext';
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
// Reverting to HashRouter for stability in cloud/preview environments
const { BrowserRouter, Routes, Route, useLocation, Navigate } = ReactRouterDOM as any;

export const getAppBaseUrl = () => {
  const hostname = window.location.hostname;

  // 1. Vercel Mirror (Dev/Test) - Point to self
  if (hostname.includes('vercel.app')) {
    return `https://${hostname}`;
  }

  // 2. Localhost - Point to self
  if (hostname.includes('localhost')) {
    return ''; // Relative path works
  }

  // 3. Studio/App Domain (Firebase) - Point to self
  if (hostname.includes('web.app') || hostname.includes('firebaseapp.com')) {
    return ''; // Relative path works
  }

  // 4. Landing Page (GitHub Pages) - Point to Production App (Firebase)
  if (hostname.includes('github.io')) {
    return 'https://co-writter-studio.web.app';
  }

  // Fallback
  return 'https://co-writter-studio.web.app';
};

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

const RequireAuth = ({ children }: { children: React.ReactElement }) => {
  const { currentUser, loading } = useAppContext();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!currentUser) {
    // Redirect to login, remembering where they tried to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const StudioProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RequireAuth><EbookStudioPage /></RequireAuth>} />
      <Route path="/ebook-studio" element={<RequireAuth><EbookStudioPage /></RequireAuth>} />
      <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<RequireAuth><EbookStudioPage /></RequireAuth>} />
    </Routes>
  )
}

const App: React.FC = () => {

  // Logic to identify if we are on the "Studio" (Application) Domain
  const isStudioDomain =
    window.location.hostname.includes('firebaseapp.com') ||
    window.location.hostname.includes('web.app');
  // Note: Localhost is treated as Landing/Dev by default unless manually toggled, 
  // but for safety we can treat localhost as 'hybrid' or dev mirror. 
  // To test Studio locally, one might need to toggle this variable manually or use specific port.


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
