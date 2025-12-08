
import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import { User, Seller, UserType, EBook, CartItem, AppContextType, CreatorSiteConfig } from '../types';
import { mockEBooks, mockUsers } from '../services/mockData';
import { initializeGeminiChat } from '../services/geminiService';
import { Chat } from '@google/genai';

const defaultAppContext: AppContextType = {
  currentUser: null,
  userType: UserType.GUEST,
  setCurrentUser: () => {},
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  theme: 'dark',
  geminiChat: null,
  initializeChat: async () => {},
  isChatbotOpen: false,
  toggleChatbot: () => {},
  updateSellerCreatorSite: () => {},
  allBooks: [],
  addCreatedBook: () => {},
  updateEBook: () => {}, 
  handleGoogleLogin: () => {},
  handleEmailLogin: async () => ({ success: false }),
  upgradeToSeller: () => {},
  verifyUser: () => {},
  // API Key Modal
  showApiKeyModal: false,
  openApiKeyModal: () => {},
  closeApiKeyModal: () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContext);

// Key for persisting app state in browser storage
const STORAGE_KEY = 'cowritter_production_live_v4';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // --- STATE INITIALIZATION ---
  const [currentUser, setCurrentUserState] = useState<User | Seller | null>(() => {
      try {
          const stored = localStorage.getItem(STORAGE_KEY);
          return stored ? JSON.parse(stored).currentUser : null;
      } catch (e) { return null; }
  });

  const [userType, setUserTypeState] = useState<UserType>(() => {
      try {
          const stored = localStorage.getItem(STORAGE_KEY);
          return stored ? JSON.parse(stored).userType : UserType.GUEST;
      } catch (e) { return UserType.GUEST; }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
      try {
          const stored = localStorage.getItem(STORAGE_KEY);
          return stored ? JSON.parse(stored).cart : [];
      } catch (e) { return []; }
  });

  const [allBooks, setAllBooks] = useState<EBook[]>(() => {
      try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (!stored) return mockEBooks;
          const parsed = JSON.parse(stored);
          return parsed.allBooks && parsed.allBooks.length > 0 ? parsed.allBooks : mockEBooks;
      } catch (e) { return mockEBooks; }
  });

  const theme = 'dark';
  const [geminiChat, setGeminiChat] = useState<Chat | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  // --- PERSISTENCE ---
  useEffect(() => {
      const stateToSave = { currentUser, userType, cart, allBooks };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [currentUser, userType, cart, allBooks]);

  // --- API KEY MODAL LOGIC ---
  useEffect(() => {
    const key = localStorage.getItem('gemini_api_key');
    if (!key) {
      setShowApiKeyModal(true);
    }
  }, []);

  const openApiKeyModal = useCallback(() => setShowApiKeyModal(true), []);
  const closeApiKeyModal = useCallback(() => setShowApiKeyModal(false), []);

  // --- CONTEXT FUNCTIONS (MEMOIZED) ---

  const setCurrentUser = useCallback((user: User | Seller | null, type: UserType) => {
    setCurrentUserState(user);
    setUserTypeState(type);
    if (!user) setCart([]);
  }, []);

  const addToCart = useCallback((book: EBook) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === book.id);
      if (existingItem) {
        return prevCart.map(item => item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { ...book, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((bookId: string) => setCart(prevCart => prevCart.filter(item => item.id !== bookId)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const initializeChat = useCallback(async () => {
    if (!geminiChat) {
      try {
        console.log("Initializing Gemini Chat from AppContext...");
        const chatInstance = await initializeGeminiChat();
        setGeminiChat(chatInstance);
      } catch (error) {
        console.error("Failed to initialize chat, likely due to missing/invalid API key.", error);
        openApiKeyModal();
      }
    }
  }, [geminiChat, openApiKeyModal]);

  const toggleChatbot = useCallback(() => {
    setIsChatbotOpen(prev => {
      if (!prev && !geminiChat) initializeChat();
      return !prev;
    });
  }, [geminiChat, initializeChat]);

  const upgradeToSeller = useCallback(() => {
    if (currentUser && userType === UserType.USER) {
        console.log("Upgrading user to seller...");
        const user = currentUser as User;
        const newSeller: Seller = {
            id: user.id,
            name: user.name,
            email: user.email,
            payoutEmail: user.email,
            uploadedBooks: [],
            isVerified: user.isVerified || false,
            username: user.username || `@${user.name.replace(/\s+/g, '').toLowerCase()}`,
            profileImageUrl: user.profileImageUrl,
            creatorSite: {
                 isEnabled: false,
                 slug: user.name.toLowerCase().replace(/\s+/g, '-'),
                 theme: 'dark-minimal',
                 profileImageUrl: user.profileImageUrl,
                 displayName: user.name,
                 tagline: 'Digital Creator',
                 showcasedBookIds: []
            }
        };
        setCurrentUser(newSeller, UserType.SELLER);
        mockUsers[user.id] = newSeller; // Update runtime cache
        console.log("Successfully upgraded to Seller:", newSeller.name);
    } else {
        console.log("Upgrade condition not met:", {currentUser, userType});
    }
  }, [currentUser, userType, setCurrentUser]);

  const updateSellerCreatorSite = useCallback((config: CreatorSiteConfig) => {
    setCurrentUserState(prevUser => {
        if (prevUser && userType === UserType.SELLER) {
            const updatedSeller = { ...prevUser as Seller, creatorSite: config };
            if (mockUsers[updatedSeller.id]) (mockUsers[updatedSeller.id] as Seller).creatorSite = config;
            return updatedSeller;
        }
        return prevUser;
    });
  }, [userType]);

  const addCreatedBook = useCallback((book: EBook) => {
    setAllBooks(prev => prev.some(b => b.id === book.id) ? prev : [book, ...prev]);
    if (currentUser && userType === UserType.SELLER) {
      setCurrentUserState(prev => ({ ...prev as Seller, uploadedBooks: [...((prev as Seller).uploadedBooks || []), book] }));
    }
  }, [currentUser, userType]);

  const updateEBook = useCallback((updatedBook: EBook) => {
    setAllBooks(prev => prev.map(b => b.id === updatedBook.id ? updatedBook : b));
    if (currentUser && userType === UserType.SELLER) {
      setCurrentUserState(prev => ({ ...prev as Seller, uploadedBooks: (prev as Seller).uploadedBooks.map(b => b.id === updatedBook.id ? updatedBook : b) }));
    }
  }, [currentUser, userType]);

  const handleGoogleLogin = useCallback((credentialResponse: any) => {
    try {
        const token = credentialResponse.credential;
        if (!token) return;
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        const payload = JSON.parse(jsonPayload);
        const googleUser: User = { id: `google_${payload.sub}`, name: payload.name, email: payload.email, purchaseHistory: [], wishlist: [], isVerified: false, profileImageUrl: payload.picture };
        const existingData = mockUsers[googleUser.id];
        if (existingData && 'uploadedBooks' in existingData) {
            setCurrentUser(existingData as Seller, UserType.SELLER);
        } else {
            setCurrentUser(googleUser, UserType.USER);
        }
        mockUsers[googleUser.id] = existingData || googleUser;
    } catch (e) { console.error("Google Login Failed", e); }
  }, [setCurrentUser]);

  const handleEmailLogin = useCallback(async (inputEmail: string, inputPass: string): Promise<{success: boolean, message?: string}> => {
      const email = inputEmail.trim();
      const password = inputPass.trim();
      const adminUser = 'opendev-labs';
      const adminPass = 'co-pass-access';

      if (email === adminUser && password === adminPass) {
          const adminProfile = mockUsers['seller_opendev'];
          if (adminProfile) {
              setCurrentUser(adminProfile as Seller, UserType.SELLER);
              return { success: true };
          }
          return { success: false, message: "Admin profile missing." };
      }
      const foundUserEntry = Object.values(mockUsers).find(user => user.email === email);
      if (foundUserEntry && 'uploadedBooks' in foundUserEntry) {
         setCurrentUser(foundUserEntry as Seller, UserType.SELLER);
         return { success: true };
      }
      return { success: false, message: "Invalid credentials." };
  }, [setCurrentUser]);

  const verifyUser = useCallback(() => {
      if (currentUser) {
          const updatedUser = { ...currentUser, isVerified: true };
          setCurrentUserState(updatedUser);
      }
  }, [currentUser]);

  const contextValue = { currentUser, userType, setCurrentUser, cart, addToCart, removeFromCart, clearCart, theme, geminiChat, initializeChat, isChatbotOpen, toggleChatbot, updateSellerCreatorSite, allBooks, addCreatedBook, updateEBook, handleGoogleLogin, handleEmailLogin, upgradeToSeller, verifyUser, showApiKeyModal, openApiKeyModal, closeApiKeyModal };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
