
import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import { User, Seller, UserType, EBook, CartItem, AppContextType, CreatorSiteConfig } from '../types';
import { mockUser, mockSeller, mockEBooks, mockUsers } 
    from '../services/mockData';
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
  upgradeToSeller: () => {},
  verifyUser: () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUserState] = useState<User | Seller | null>(null);
  const [userType, setUserTypeState] = useState<UserType>(UserType.GUEST);
  const [cart, setCart] = useState<CartItem[]>([]);
  const theme = 'dark'; // For now, only dark theme
  const [geminiChat, setGeminiChat] = useState<Chat | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [allBooks, setAllBooks] = useState<EBook[]>(mockEBooks);


  const setCurrentUser = (user: User | Seller | null, type: UserType) => {
    setCurrentUserState(user);
    setUserTypeState(type);
    if (user && type !== UserType.GUEST) {
      // Simulate loading user-specific cart from backend
    } else {
      setCart([]); // Clear cart for guest or on logout
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
        if (prevUser && prevUser.id.startsWith('seller')) { // or userType === UserType.SELLER
            const updatedSeller = { ...prevUser as Seller, creatorSite: config };
            // Also update the mockUsers array for persistence in demo
            if (mockUsers[updatedSeller.id]) {
                (mockUsers[updatedSeller.id] as Seller).creatorSite = config;
            }
            return updatedSeller;
        }
        return prevUser;
    });
  };

  const addCreatedBook = (book: EBook) => {
    setAllBooks(prevBooks => [book, ...prevBooks]);
    // If current user is a seller, also add to their uploadedBooks
    if (currentUser && userType === UserType.SELLER) {
        setCurrentUserState(prev => {
            const seller = prev as Seller;
            // Ensure uploadedBooks is initialized if it's undefined
            const currentUploadedBooks = seller.uploadedBooks || [];
            return {
                ...seller,
                uploadedBooks: [book, ...currentUploadedBooks]
            };
        });
        // Update mock data for persistence in demo
        if (mockUsers[currentUser.id]) {
            const sellerInMock = mockUsers[currentUser.id] as Seller;
            if (!sellerInMock.uploadedBooks) {
                sellerInMock.uploadedBooks = [];
            }
            sellerInMock.uploadedBooks.unshift(book);
        }
    }
  };

  const updateEBook = (updatedBook: EBook) => {
    setAllBooks(prevBooks => prevBooks.map(b => b.id === updatedBook.id ? updatedBook : b));

    // Update the book in the current seller's uploadedBooks list
    if (currentUser && currentUser.id === updatedBook.sellerId && userType === UserType.SELLER) {
        setCurrentUserState(prevUser => {
            const seller = prevUser as Seller;
            return {
                ...seller,
                uploadedBooks: seller.uploadedBooks.map(b => b.id === updatedBook.id ? updatedBook : b)
            };
        });
    }

    // Update mockEBooks array for persistence in demo
    let mockBookIndex = mockEBooks.findIndex(b => b.id === updatedBook.id);
    if (mockBookIndex !== -1) {
      mockEBooks[mockBookIndex] = updatedBook;
    } else {
      mockEBooks.unshift(updatedBook); 
    }

    // Update the seller in mockUsers array
    const sellerInMock = mockUsers[updatedBook.sellerId] as Seller | undefined;
    if (sellerInMock && sellerInMock.uploadedBooks) {
      const bookIndexInSellerMock = sellerInMock.uploadedBooks.findIndex(b => b.id === updatedBook.id);
      if (bookIndexInSellerMock !== -1) {
        sellerInMock.uploadedBooks[bookIndexInSellerMock] = updatedBook;
      } else {
        sellerInMock.uploadedBooks.unshift(updatedBook);
      }
    } else if (sellerInMock) { 
        sellerInMock.uploadedBooks = [updatedBook];
    }
  };


  const handleGoogleLogin = (credentialResponse: any) => {
    try {
        const token = credentialResponse.credential;
        if (!token) return;

        // Decode JWT manually to avoid external dependency
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        const payload = JSON.parse(jsonPayload);
        
        // Map Google User to App User (Default to USER/Reader role)
        const googleUser: User = {
            id: `google_${payload.sub}`,
            name: payload.name,
            email: payload.email,
            purchaseHistory: [],
            wishlist: [],
            isVerified: false
        };

        setCurrentUserState(googleUser);
        setUserTypeState(UserType.USER);
        
        // Persist to mock data so it survives this session
        mockUsers[googleUser.id] = googleUser;

        console.log("Logged in with Google:", googleUser.name);
    } catch (e) {
        console.error("Google Login Failed", e);
    }
  };

  const upgradeToSeller = () => {
    if (currentUser && userType === UserType.USER) {
        const user = currentUser as User;
        
        // Check if user is already a seller in mock data to restore previous state if any
        let existingSellerData: Partial<Seller> = {};
        if (mockUsers[user.id] && 'uploadedBooks' in mockUsers[user.id]) {
            existingSellerData = mockUsers[user.id] as Seller;
        }

        const newSeller: Seller = {
            id: user.id,
            name: user.name,
            email: user.email,
            payoutEmail: user.email, // Default to email
            uploadedBooks: existingSellerData.uploadedBooks || [],
            isVerified: user.isVerified || false,
            creatorSite: existingSellerData.creatorSite || {
                 isEnabled: false,
                 slug: user.name.toLowerCase().replace(/\s+/g, '-'),
                 theme: 'dark-minimal',
                 profileImageUrl: '',
                 displayName: user.name,
                 tagline: '',
                 showcasedBookIds: []
            }
        };
        
        setCurrentUserState(newSeller);
        setUserTypeState(UserType.SELLER);
        mockUsers[user.id] = newSeller;
        
        console.log("Upgraded to Seller:", newSeller.name);
    }
  };

  const verifyUser = () => {
      if (currentUser) {
          const updatedUser = { ...currentUser, isVerified: true };
          setCurrentUserState(updatedUser);
          // Persist to mock data
          if (mockUsers[currentUser.id]) {
              mockUsers[currentUser.id] = updatedUser;
          }
      }
  };


  // Default to Seller/Admin view so user sees the 3 books immediately
  useEffect(() => {
     setCurrentUser(mockSeller, UserType.SELLER);
  }, []);


  return (
    <AppContext.Provider value={{ currentUser, userType, setCurrentUser, cart, addToCart, removeFromCart, clearCart, theme, geminiChat, initializeChat, isChatbotOpen, toggleChatbot, updateSellerCreatorSite, allBooks, addCreatedBook, updateEBook, handleGoogleLogin, upgradeToSeller, verifyUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
