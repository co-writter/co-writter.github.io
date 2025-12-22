
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import MorphicEye from './components/MorphicEye';

// Policy Pages
import ContactPage from './pages/ContactPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import NotFoundPage from './pages/NotFoundPage';

export const getAppBaseUrl = () => {
  const hostname = window.location.hostname;

  // 1. Vercel Mirror (Dev/Test) - Point to self
  if (hostname.includes('vercel.app')) {
    return `https://${hostname}`;
  }

  // 2. Localhost/Dev - Point to Production Studio (as requested)
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('localhost')) {
    return 'https://co-writter-studio.web.app';
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
        {/* On Landing, Login should theoretically redirect to Studio, but if we are here, we show the page. 
            However, on GitHub Pages, the Navbar link points to external studio. 
            If someone manually navigates to /login here, we render safe LoginPage. */}
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

const RequireAuth = ({ children }: { children: React.ReactElement }) => {
  const { currentUser, loading } = useAppContext();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,30,1)_0%,rgba(0,0,0,1)_100%)]"></div>
        <div className="relative z-10 scale-150 animate-pulse-slow">
          <MorphicEye className="w-16 h-16 border border-white/20 bg-black/40 backdrop-blur-xl rounded-full" />
        </div>
        <div className="mt-12 text-neutral-500 font-mono text-[10px] uppercase tracking-[0.4em] z-10 animate-pulse">
          Authenticating Session...
        </div>
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
      <Route path="/edit-ebook/:bookId" element={<RequireAuth><EditEBookPage /></RequireAuth>} />
      <Route path="/read/:bookId" element={<RequireAuth><EbookReaderPage /></RequireAuth>} />
      {/* 
          IMPORTANT: For Studio, strict routing. 
          If path is not found in Studio routes, we could fallback to NotFound or redirect to dashboard 
       */}
      <Route path="*" element={<RequireAuth><EbookStudioPage /></RequireAuth>} />
    </Routes>
  )
}

const AppContent = () => {
  const location = useLocation();
  const hostname = window.location.hostname;

  // Domain Detection
  const isProductionStudio = hostname.includes('firebaseapp.com') || hostname.includes('web.app');
  const isLocalhost = hostname.includes('localhost') || hostname === '127.0.0.1';

  // Hybrid Routing Logic for Localhost
  // If we are on localhost, we check the PATH to decide if we are in "Studio Mode" or "Landing Mode".
  // This allows simulateing both environments on one port.
  const isStudioPath =
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/ebook-studio') ||
    location.pathname.startsWith('/edit-ebook') ||
    location.pathname.startsWith('/read') ||
    (isProductionStudio && location.pathname === '/'); // Always studio root on production studio

  const isStudio = isProductionStudio || (isLocalhost && isStudioPath);

  React.useEffect(() => {
    initGA();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black font-sans text-foreground overflow-x-hidden relative">

      {/* === GLOBAL ANTIGRAVITY THEME BACKGROUND === */}
      {/* 
          Only show full marketing background on Landing Page mode. 
          Studio has its own background handling in its components usually, 
          but sharing it is fine if it doesn't conflict. 
          Let's keep it global for consistency but maybe tone it down for studio later.
      */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,30,1)_0%,rgba(0,0,0,1)_100%)]"></div>
        <div className="absolute top-[20%] left-[15%] w-32 h-32 border border-white/5 rounded-full animate-float opacity-30 blur-[1px]"></div>
        <div className="absolute bottom-[25%] right-[20%] w-64 h-64 border border-white/5 rotate-45 animate-float-delayed opacity-20"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[grid-flow_8s_linear_infinite]"></div>
      </div>

      {/* === Foreground Content === */}
      <div className="flex-grow relative z-10 flex flex-col w-full">
        {!isStudio && <Navbar />}

        <main className="flex-grow flex flex-col">
          {isStudio ? (
            <StudioProtectedRoutes />
          ) : (
            <AnimatedRoutes />
          )}
        </main>

        {!isStudio && <Footer />}
      </div>

    </div>
  );
}

const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
