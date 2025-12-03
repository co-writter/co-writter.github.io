

import { EBook, User, Seller, UserType, CreatorSiteConfig } from '../types';

export const mockEBooks: EBook[] = [
  {
    id: 'manual-01',
    title: "Co-Writter's Manual",
    author: 'Co-Writter AI',
    description: 'The official documentation for the Co-Writter platform. Learn how to use the Neural Engine, generate viral covers, and publish your work to the world. This manual demonstrates the formatting capabilities of the engine.',
    price: 0,
    coverImageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600', // Abstract Tech/AI Cover
    genre: 'Technology',
    sellerId: 'seller_admin',
    publicationDate: '2025-10-15',
    pages: [
        { 
            id: 'p1', 
            title: '1. Introduction', 
            pageNumber: 1, 
            content: "# Welcome to Co-Writter\n\nCo-Writter is not just an editor; it is an intelligent partner designed to bridge the gap between thought and literature.\n\n## The Vision\nWe believe everyone has a story. Our mission is to provide the most advanced AI tools to help you tell yours.\n\n### Key Features\n- **Neural Ghostwriter**: An AI that adapts to your tone, powered by Google Gemini.\n- **Visual Engine**: Generate covers and diagrams instantly.\n- **Global Store**: Sell your work and keep 70% of revenue." 
        },
        { 
            id: 'p2', 
            title: '2. The Dashboard', 
            pageNumber: 2, 
            content: "# Navigating Your HQ\n\nYour Dashboard is your command center.\n\n> \"Order is the foundation of creativity.\"\n\n1. **Library**: Access books you've purchased or downloaded.\n2. **Wishlist**: Save titles for later.\n3. **Analytics**: (Sellers only) Track your revenue in real-time." 
        },
        { 
            id: 'p3', 
            title: '3. The Studio', 
            pageNumber: 3, 
            content: "# The Ebook Studio\n\nThis is where the magic happens. The Studio is divided into three panes:\n\n- **Left Pane**: Your Co-Author Chat and Chapter Outline.\n- **Center Pane**: The Infinite Canvas editor.\n- **Right Pane (Mobile)**: Tools and settings.\n\nUse the **Slash Command** (`/`) in the editor to instantly summon AI tools." 
        },
        { 
            id: 'p4', 
            title: '4. AI Tools: Planning', 
            pageNumber: 4, 
            content: "# Agentic Planning\n\nDon't start with a blank page. Use the **Auto-Write** feature to generate a full book blueprint.\n\n## How it works\n1. Click the Rocket Icon.\n2. Enter a topic (e.g., \"Mars Colonization\").\n3. Select a tone.\n4. Watch the AI build your Chapter Outline." 
        },
        { 
            id: 'p5', 
            title: '5. AI Tools: Writing', 
            pageNumber: 5, 
            content: "# The Ghostwriter\n\nThe Co-Author chat is context-aware. It knows what you are writing.\n\n**Try asking:**\n- \"Rewrite this paragraph to be more dramatic.\"\n- \"Expand on the concept of quantum entanglement.\"\n- \"Fix the grammar in Chapter 3.\"\n\nThe AI can write directly into your document." 
        },
        { 
            id: 'p6', 
            title: '6. Generating Visuals', 
            pageNumber: 6, 
            content: "# Visual Synthesis\n\nA picture is worth a thousand words. Co-Writter can generate illustrations, diagrams, and covers.\n\n**To generate an image:**\nType `/` in the editor and select **Create Image**.\n\n**Pro Tip:**\nUse keywords like \"Diagram\", \"Chart\", or \"Schematic\" to get technical visuals instead of artistic ones." 
        },
        { 
            id: 'p7', 
            title: '7. Audio & TTS', 
            pageNumber: 7, 
            content: "# Voice Capabilities\n\nCo-Writter can speak. \n\n- **Auto-Speak**: The AI reads its responses aloud to you.\n- **Dictation**: Click the Microphone icon to speak your prompts instead of typing.\n\nThis creates a seamless, hands-free brainstorming experience." 
        },
        { 
            id: 'p8', 
            title: '8. Publishing', 
            pageNumber: 8, 
            content: "# Going Live\n\nOnce your manuscript is ready:\n\n1. Go to **Upload & Manage**.\n2. Select your book metadata.\n3. Generate a cover using the AI Designer.\n4. Click **Publish**.\n\nYour book is instantly available in the Global Store." 
        },
        { 
            id: 'p9', 
            title: '9. Monetization', 
            pageNumber: 9, 
            content: "# Earn from Your Art\n\nWe offer a transparent revenue model.\n\n- **70% Royalties**: You keep the majority of sales.\n- **Instant Payouts**: Integrated with major payment gateways.\n- **Smart Pricing**: Use our AI Pricing Optimizer to find the sweet spot for your book's cost." 
        },
        { 
            id: 'p10', 
            title: '10. The Future', 
            pageNumber: 10, 
            content: "# Roadmap\n\nWe are constantly evolving. Coming soon:\n\n- **Multi-Agent Mode**: Have distinct AI personas (Editor, Researcher, Critic) debate your work.\n- **Print on Demand**: Physical copies of your AI-written books.\n- **Collaborative Writing**: Invite human co-authors to your studio.\n\nThank you for choosing Co-Writter." 
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