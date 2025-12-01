
import { EBook, User, Seller, UserType, CreatorSiteConfig } from '../types';

export const mockEBooks: EBook[] = [
  // --- BOOK 1: FREE ---
  {
    id: 'zero-01',
    title: 'The Void Start',
    author: 'System Administrator',
    description: 'A blank canvas. The beginning of all things. This book represents the zero point of the network. Edit this asset to begin your journey.',
    price: 0,
    coverImageUrl: 'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?auto=format&fit=crop&q=80&w=600', // Abstract Dark Void
    genre: 'Philosophy',
    sellerId: 'seller_admin',
    publicationDate: '2025-01-01',
    pages: [
        { id: 'p1', title: 'Origin', pageNumber: 1, content: "# Origin\n\nEverything begins with a single thought..." }
    ]
  },
  // --- BOOK 2: FREE ---
  {
    id: 'zero-02',
    title: 'Digital Genesis',
    author: 'System Administrator',
    description: 'How ideas form in the vacuum of cyberspace. A guide to creating from nothing. Available freely to all nodes in the network.',
    price: 0,
    coverImageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600', // Dark Tech
    genre: 'Technology',
    sellerId: 'seller_admin',
    publicationDate: '2025-01-02',
    pages: [
         { id: 'p1', title: 'The Code', pageNumber: 1, content: "# The Code\n\nIn the beginning, there was syntax..." }
    ]
  },
  // --- BOOK 3: PAID ---
  {
    id: 'zero-03',
    title: 'Neural Architectures',
    author: 'System Administrator',
    description: 'Advanced patterns for constructing reality. The premium guide for architects of the new web. Contains high-value blueprints.',
    price: 999,
    coverImageUrl: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&q=80&w=600', // Geometric/Structure
    genre: 'Science',
    sellerId: 'seller_admin',
    publicationDate: '2025-01-03',
    pages: [
         { id: 'p1', title: 'Structure', pageNumber: 1, content: "# Structure\n\nOrder emerges from chaos through rigorous design..." }
    ]
  }
];

export const mockUser: User = {
  id: 'user_admin',
  name: 'Admin User',
  username: '@admin',
  email: 'admin@cowritter.com',
  purchaseHistory: [mockEBooks[0]], 
  wishlist: [mockEBooks[2]],
  isVerified: true,
  profileImageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
  coverImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
  bio: "System Administrator and First Node."
};

const defaultCreatorSiteConfig: CreatorSiteConfig = {
  isEnabled: true,
  slug: 'admin',
  theme: 'dark-minimal',
  profileImageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
  displayName: 'Admin Console',
  tagline: 'The Zero Point of Co-Writter.',
  showcasedBookIds: ['zero-01', 'zero-02', 'zero-03'], 
};

export const mockSeller: Seller = {
  id: 'seller_admin',
  name: 'Admin Publisher',
  username: '@admin_pub',
  email: 'admin@cowritter.com',
  payoutEmail: 'finance@cowritter.com',
  uploadedBooks: [mockEBooks[0], mockEBooks[1], mockEBooks[2]], 
  creatorSite: defaultCreatorSiteConfig,
  isVerified: true,
  profileImageUrl: defaultCreatorSiteConfig.profileImageUrl,
  coverImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
  bio: "Deploying initial assets to the network."
};

export const mockUsers: Record<string, User | Seller> = {
  'user_admin': mockUser,
  'seller_admin': mockSeller,
  'guest': { id: 'guest', name: 'Guest', email: ''} as User, 
};

export const getUserData = (userId: string, type: UserType): User | Seller | null => {
  if (type === UserType.GUEST) return mockUsers['guest'];
  return mockUsers[userId] || null;
};
