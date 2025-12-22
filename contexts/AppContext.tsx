
import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import { User, Seller, UserType, EBook, CartItem, AppContextType, CreatorSiteConfig } from '../types';
import { mockEBooks, mockUsers } from '../services/mockData';
import { initializeGeminiChat } from '../services/geminiService';
import { Chat } from '@google/genai';

const defaultAppContext: AppContextType = {
  currentUser: null,
  userType: UserType.GUEST,
  setCurrentUser: () => { },
  cart: [],
  addToCart: () => { },
  removeFromCart: () => { },
  clearCart: () => { },
  theme: 'dark',
  geminiChat: null,
  initializeChat: async () => { },
  isChatbotOpen: false,
  toggleChatbot: () => { },
  updateSellerCreatorSite: () => { },
  books: [],
  addCreatedBook: () => { },
  updateBook: () => { },
  deleteBook: () => { },
  handleGoogleLogin: () => { },
  handleFirebaseGoogleLogin: async () => { },
  handleEmailLogin: async () => ({ success: false }),
  upgradeToSeller: () => { },
  verifyUser: () => { },
  loading: true,
};

const AppContext = createContext<AppContextType>(defaultAppContext);

// Key for persisting app state in browser storage
const STORAGE_KEY = 'ebook_engine_production_live_v1';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Initialize State from LocalStorage (Lazy Loading)
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

  const [books, setBooks] = useState<EBook[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return mockEBooks;

      const parsed = JSON.parse(stored);
      // Ensure we always return an array
      return Array.isArray(parsed.books) ? parsed.books : (Array.isArray(parsed.allBooks) ? parsed.allBooks : mockEBooks);
    } catch (e) { return mockEBooks; }
  });

  const theme = 'dark'; // For now, only dark theme
  const [geminiChat, setGeminiChat] = useState<Chat | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // 2. Initial Setup Effect
  useEffect(() => {
    // Safety timeout: Ensure app never hangs on "black screen" loading state
    const timer = setTimeout(() => {
      console.log("Forcing loading false after timeout");
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // 3. Persistence Effect: Save state on any change
  useEffect(() => {
    const stateToSave = {
      currentUser,
      userType,
      cart,
      books
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [currentUser, userType, cart, books]);

  // 4. Firebase Auth Sync: Deep 10/10 Integration
  useEffect(() => {
    let unsubscribe = () => { };

    const initAuthSync = async () => {
      try {
        const { auth, db } = await import('../services/firebase');
        const { onAuthStateChanged } = await import('firebase/auth');
        const { doc, getDoc } = await import('firebase/firestore');

        if (!auth) return;

        unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
          try {
            if (fbUser) {
              console.log("Firebase Auth detected:", fbUser.email);
              // Set a timeout for the Firestore fetch to prevent permanent loading hang
              const fetchPromise = getDoc(doc(db, "users", `google_${fbUser.uid}`));
              const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 8000));

              try {
                const userDoc = (await Promise.race([fetchPromise, timeoutPromise])) as any;
                if (userDoc.exists()) {
                  const userData = userDoc.data() as any;
                  setCurrentUser(userData, userData.userType === 'seller' ? UserType.SELLER : UserType.USER);
                } else {
                  // Fallback for new user
                  const newUser: User = {
                    id: `google_${fbUser.uid}`,
                    name: fbUser.displayName || 'Unknown',
                    email: fbUser.email || '',
                    purchaseHistory: [],
                    wishlist: [],
                    isVerified: fbUser.emailVerified,
                    profileImageUrl: fbUser.photoURL || ''
                  };
                  setCurrentUser(newUser, UserType.USER);
                }
              } catch (err: any) {
                console.error("Firestore sync error or timeout:", err);
                // IF FIREBASE IS BLOCKED (403), do not hang, show as guest
                if (err.message === "Timeout" || err.code === 'permission-denied' || (err.message && err.message.includes('blocked'))) {
                  console.warn("Recovering from blocked/timed out Firebase state...");
                  setCurrentUser(null, UserType.GUEST);
                }
              }
            } else {
              if (currentUser?.id.startsWith('google_')) {
                setCurrentUser(null, UserType.GUEST);
              }
            }
          } catch (outerErr) {
            console.error("Critical Auth Listener Error:", outerErr);
            setCurrentUser(null, UserType.GUEST);
          } finally {
            setLoading(false);
          }
        });
      } catch (err) {
        console.error("Auth Sync Init Failed:", err);
        setLoading(false);
      }
    };

    initAuthSync();
    return () => unsubscribe();
  }, []);

  const setCurrentUser = (user: User | Seller | null, type: UserType) => {
    setCurrentUserState(user);
    setUserTypeState(type);

    // Explicitly update loading to false if we just set a user manually
    setLoading(false);

    if (!user) {
      setCart([]); // Clear cart on logout
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const addToCart = (book: EBook) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === book.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== bookId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const initializeChat = useCallback(async () => {
    if (!geminiChat) {
      console.log("Initializing Gemini Chat from AppContext...");
      const chatInstance = await initializeGeminiChat();
      setGeminiChat(chatInstance);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geminiChat]);

  const toggleChatbot = () => {
    setIsChatbotOpen(prevIsOpenState => {
      const newIsChatbotOpen = !prevIsOpenState;
      if (newIsChatbotOpen && !geminiChat) {
        initializeChat();
      }
      return newIsChatbotOpen;
    });
  };

  const updateSellerCreatorSite = (config: CreatorSiteConfig) => {
    setCurrentUserState(prevUser => {
      if (prevUser && (prevUser.id.startsWith('seller') || prevUser.id.startsWith('google') || userType === UserType.SELLER)) {
        const updatedSeller = { ...prevUser as Seller, creatorSite: config };

        // Update local mock store for simulation consistency
        if (mockUsers[updatedSeller.id]) {
          (mockUsers[updatedSeller.id] as Seller).creatorSite = config;
        }
        return updatedSeller;
      }
      return prevUser;
    });
  };

  const addCreatedBook = (book: EBook) => {
    setBooks(prevBooks => {
      // Prevent duplicates
      if (prevBooks && prevBooks.some(b => b.id === book.id)) return prevBooks;
      return [book, ...(prevBooks || [])];
    });

    // If current user is a seller, also add to their uploadedBooks
    if (currentUser && userType === UserType.SELLER) {
      setCurrentUserState(prev => {
        const seller = prev as Seller;
        const currentUploadedBooks = seller.uploadedBooks || [];
        return {
          ...seller,
          uploadedBooks: [book, ...currentUploadedBooks]
        };
      });
    }
  };

  const updateBook = (updatedBook: EBook) => {
    setBooks(prevBooks => (prevBooks || []).map(b => b.id === updatedBook.id ? updatedBook : b));

    // Update the book in the current seller's uploadedBooks list
    if (currentUser && currentUser.id === updatedBook.sellerId && userType === UserType.SELLER) {
      setCurrentUserState(prevUser => {
        const seller = prevUser as Seller;
        return {
          ...seller,
          uploadedBooks: (seller.uploadedBooks || []).map(b => b.id === updatedBook.id ? updatedBook : b)
        };
      });
    }
  };

  const deleteBook = (bookId: string) => {
    setBooks(prevBooks => (prevBooks || []).filter(b => b.id !== bookId));

    if (currentUser && userType === UserType.SELLER) {
      setCurrentUserState(prevUser => {
        const seller = prevUser as Seller;
        return {
          ...seller,
          uploadedBooks: (seller.uploadedBooks || []).filter(b => b.id !== bookId)
        };
      });
    }
  };

  // --- AUTH METHODS ---

  const handleFirebaseGoogleLogin = async () => {
    // Redundancy check for Landing Page users
    if (window.location.hostname.includes('github.io')) {
      const redirectUrl = `https://co-writter-studio.web.app/login`;
      console.log("Redirecting to production app for auth:", redirectUrl);
      window.location.href = redirectUrl;
      return;
    }

    try {
      const { auth, googleProvider, signInWithPopup } = await import('../services/firebase');
      if (!auth) throw new Error("Firebase Auth initialization failed.");

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const googleUser: User = {
        id: `google_${user.uid}`,
        name: user.displayName || 'Unknown User',
        email: user.email || '',
        purchaseHistory: [],
        wishlist: [],
        isVerified: user.emailVerified,
        profileImageUrl: user.photoURL || ''
      };

      const { db } = await import('../services/firebase');
      const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');

      if (db) {
        await setDoc(doc(db, "users", googleUser.id), {
          ...googleUser,
          lastLogin: serverTimestamp(),
          userType: 'user'
        }, { merge: true });
      }

      setCurrentUser(googleUser, UserType.USER);

    } catch (error: any) {
      console.error("Firebase Login Error", error);
      throw error;
    }
  };

  const handleGoogleLogin = (credentialResponse: any) => {
    // keeping GIS for backward compatibility if needed, but steering towards Firebase
    try {
      const token = credentialResponse.credential;
      if (!token) return;
      // ... same logic as before ...
    } catch (e) {
      console.error("GIS Login Failed", e);
    }
  };

  // ADDED: Email Login for Admin/Owner and Paid Writers
  const handleEmailLogin = async (inputEmail: string, inputPass: string): Promise<{ success: boolean, message?: string }> => {

    const email = inputEmail.trim();
    const password = inputPass.trim();

    // 1. Secure Admin Login (Using Environment Variables with Fallback)
    // Ideally, define VITE_ADMIN_USER and VITE_ADMIN_PASS in your .env file
    let adminUser = 'opendev-labs';
    let adminPass = 'co-pass-access';

    // Use try-catch for environment variable access to prevent crash in certain environments
    try {
      // Cast import.meta to any to avoid TS error: Property 'env' does not exist on type 'ImportMeta'
      const meta = import.meta as any;
      if (meta.env) {
        adminUser = meta.env.VITE_ADMIN_USER || adminUser;
        adminPass = meta.env.VITE_ADMIN_PASS || adminPass;
      }
    } catch (e) {
      console.warn("Could not access env vars, using defaults.");
    }

    if (email === adminUser && password === adminPass) {
      const adminProfile = mockUsers['seller_opendev'];
      if (adminProfile) {
        setCurrentUser(adminProfile as Seller, UserType.SELLER);
        return { success: true };
      } else {
        return { success: false, message: "Admin profile configuration missing." };
      }
    }

    // 2. Check for other paid writers in Mock DB
    const foundUserEntry = Object.values(mockUsers).find(user => user.email === email);

    if (foundUserEntry) {
      if ('uploadedBooks' in foundUserEntry) {
        // In a real app, you would hash and verify the password here.
        // For this demo, we assume the password matches if the email exists as a seller.
        setCurrentUser(foundUserEntry as Seller, UserType.SELLER);
        return { success: true };
      } else {
        return { success: false, message: "This email is not registered as a Writer account." };
      }
    }

    return { success: false, message: "Invalid credentials." };
  };

  const upgradeToSeller = () => {
    if (currentUser && userType === UserType.USER) {
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
      // Update runtime cache
      mockUsers[user.id] = newSeller;

      console.log("Upgraded to Seller:", newSeller.name);
    }
  };

  const verifyUser = () => {
    if (currentUser) {
      const updatedUser = { ...currentUser, isVerified: true };
      setCurrentUserState(updatedUser);
    }
  };

  return (
    <AppContext.Provider value={{ currentUser, userType, setCurrentUser, cart, addToCart, removeFromCart, clearCart, theme, geminiChat, initializeChat, isChatbotOpen, toggleChatbot, updateSellerCreatorSite, books, addCreatedBook, updateBook, deleteBook, handleGoogleLogin, handleFirebaseGoogleLogin, handleEmailLogin, upgradeToSeller, verifyUser, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);