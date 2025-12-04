
import { EBook, User, Seller, UserType, CreatorSiteConfig } from '../types';

export const mockEBooks: EBook[] = [
  {
    id: 'manual-01',
    title: "Co-Writter's Manual",
    author: 'Co-Writter AI',
    description: 'The official documentation for the Co-Writter platform. Learn how to use the Neural Engine, generate viral covers, and publish your work to the world. This manual demonstrates the formatting capabilities of the engine.',
    price: 0,
    coverImageUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800', // Professional Tech Cover
    genre: 'Technology',
    sellerId: 'seller_admin',
    publicationDate: '2025-10-15',
    pages: [
        { 
            id: 'p1', 
            title: '1. The Neural Engine', 
            pageNumber: 1, 
            content: "# Welcome to Co-Writter\n\nCo-Writter is not just an editor; it is an intelligent partner designed to bridge the gap between thought and literature. In an age where digital content is king, the ability to rapidly produce high-quality written work is a superpower.\n\n![Neural Architecture Diagram](https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000)\n\n## The Vision\n\nWe believe everyone has a story. Our mission is to provide the most advanced AI tools to help you tell yours. Whether you are crafting a sci-fi novel, a technical manual, or a collection of poetry, Co-Writter adapts to your needs.\n\n**Key Features**\n\n- **Neural Ghostwriter**: An AI that adapts to your tone, powered by Google Gemini.\n- **Visual Engine**: Generate covers and diagrams instantly.\n- **Global Store**: Sell your work and keep 70% of revenue." 
        },
        { 
            id: 'p2', 
            title: '2. Studio Workflow', 
            pageNumber: 2, 
            content: "# The Ebook Studio\n\nThis is where the magic happens. The Studio is divided into three panes to optimize your workflow:\n\n1. **Left Pane**: Your Co-Author Chat and Chapter Outline. This is your strategic view.\n2. **Center Pane**: The Infinite Canvas editor. Distraction-free writing with smart formatting.\n3. **Right Pane (Mobile)**: Tools and settings accessible on the go.\n\n![Studio Interface](https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000)\n\n## Using Slash Commands\n\nType `/` in the editor to instantly summon AI tools. You can insert headers, quotes, or ask the AI to write the next paragraph for you." 
        },
        { 
            id: 'p3', 
            title: '3. Visual Synthesis', 
            pageNumber: 3, 
            content: "# Generating Visuals\n\nA picture is worth a thousand words. Co-Writter can generate illustrations, diagrams, and covers using the Gemini Imagen model.\n\nTo generate an image:\n\nType `/` in the editor and select **Create Image**. Or, simply ask the Co-Author chat: 'Generate a diagram of a neural network.'\n\n![Data Visualization Example](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000)\n\n**Pro Tip**: Use keywords like 'Diagram', 'Chart', or 'Schematic' to get technical visuals instead of artistic ones. The system automatically detects these keywords and adjusts the prompt accordingly." 
        },
        { 
            id: 'p4', 
            title: '4. Publishing & Sales', 
            pageNumber: 4, 
            content: "# Going Live\n\nOnce your manuscript is ready, publishing is a one-click process.\n\n1. Go to **Upload & Manage**.\n2. Select your book metadata (Title, Author, Genre).\n3. Generate a cover using the AI Designer.\n4. Click **Publish**.\n\n![Analytics Dashboard](https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000)\n\n## Monetization\n\nWe offer a transparent revenue model designed to empower creators. You keep **70% of every sale**. Payments are processed instantly via our secure gateway integrations." 
        },
        { 
            id: 'p5', 
            title: '5. Exporting Options', 
            pageNumber: 5, 
            content: "# PDF & KDP Support\n\nCo-Writter isn't just a walled garden. You own your data. You can export your book at any time.\n\n- **PDF Export**: Generates a standard A4 PDF.\n- **KDP Export**: Generates a print-ready PDF formatted for Amazon KDP (6x9 trade standard, proper margins, page numbers).\n\nSimply click the 'Publish' or 'PDF' icon in the Studio header to download your file." 
        }
    ]
  }
];

export const mockUser: User = {
  id: 'user_admin',
  name: 'Admin User',
  username: '@admin',
  email: 'admin@cowritter.com',
  purchaseHistory: [mockEBooks[0]], 
  wishlist: [],
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
  displayName: 'Co-Writter Team',
  tagline: 'Official Updates & Manuals',
  showcasedBookIds: ['manual-01'], 
};

export const mockSeller: Seller = {
  id: 'seller_admin',
  name: 'Co-Writter Official',
  username: '@cowritter_hq',
  email: 'admin@cowritter.com',
  payoutEmail: 'finance@cowritter.com',
  uploadedBooks: [mockEBooks[0]], 
  creatorSite: defaultCreatorSiteConfig,
  isVerified: true,
  profileImageUrl: defaultCreatorSiteConfig.profileImageUrl,
  coverImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
  bio: "The official account for Co-Writter updates and documentation."
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
