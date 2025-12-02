<div align="center">

# 🤖 co-writter

**AI-Powered eBook Creation & Publishing Platform**

*Write, publish, and sell your books with AI assistance*

[![Deploy Status](https://github.com/co-writter/co-writter.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/co-writter/co-writter.github.io/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://co-writter.github.io/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[Live Demo](https://co-writter.github.io/) • [Features](#-features) • [Getting Started](#-getting-started)

</div>

---

## 📖 About

**co-writter** is a next-generation eBook platform that combines AI-powered writing assistance with a complete publishing and marketplace solution. Whether you're a reader discovering new content or a creator building your literary brand, co-writter provides the tools you need.

### Dual-Mode Experience

- **📚 Reader Mode**: Browse, purchase, and read eBooks from talented creators
- **✍️ Creator Mode**: Write with AI assistance, publish books, and build your author profile

---

## ✨ Features

### For Readers
- 🔍 **Smart Discovery**: Browse curated collections and personalized recommendations
- 💳 **Secure Payments**: Buy books safely with Razorpay integration
- 📱 **Beautiful UI**: Modern, responsive design with pitch-black aesthetic
- 🔐 **Google Sign-In**: Quick and secure authentication

### For Creators
- 🤖 **AI Writing Studio**: Powered by Google Gemini 2.5 Flash
  - Agentic workflow with Planner, Writer, and Editor agents
  - Real-time content streaming
  - Chat-based co-authoring
  - Auto-generate book covers and pricing suggestions
- 📊 **Creator Dashboard**: Track earnings, readers, and book performance
- 🌐 **Personal Profile Sites**: Deploy your own branded author page
- 📤 **Smart Upload**: Auto-extract metadata from PDFs
- 💰 **Revenue Analytics**: Monitor sales and engagement

### Technical Highlights
- ⚡ **Lightning Fast**: Built with Vite and React
- 🎨 **Morphic Design**: Animated logo, kinetic grid backgrounds, 2D panels
- 📱 **Mobile First**: Fully responsive across all devices
- 🔄 **Real-time Updates**: Live progress bars and streaming AI responses
- 🎯 **Type-Safe**: Written in TypeScript for reliability

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API Key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/co-writter/co-writter.github.io.git
   cd co-writter.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

---

## 🎨 Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **AI**: Google Gemini 2.5 Flash
- **Payments**: Razorpay
- **Authentication**: Google OAuth
- **Styling**: Tailwind CSS (custom dark theme)
- **Deployment**: GitHub Pages

---

## 📁 Project Structure

```
co-writter/
├── components/           # Reusable UI components
│   ├── BookCard/        # Book display components
│   ├── Dashboard/       # User & seller dashboards
│   ├── MorphicEye/      # Animated logo
│   └── ...
├── pages/               # Application pages
│   ├── EbookStudioPage  # AI writing environment
│   ├── LoginPage        # Authentication
│   └── ...
├── services/            # API and external services
│   ├── aiService        # Gemini integration
│   ├── cloudService     # GitHub deployment
│   └── pdfService       # PDF processing
├── contexts/            # React context providers
└── types.ts             # TypeScript definitions
```

---

## 🎯 Usage

### As a Reader

1. **Sign in** with your Google account
2. **Browse** the book marketplace
3. **Purchase** books with secure payment
4. **Read** and enjoy!

### As a Creator

1. **Switch to Creator Mode** from your dashboard
2. **Launch the AI Studio** to start writing
3. **Configure your profile** and showcase books
4. **Deploy your creator site** to GitHub Pages
5. **Track performance** with analytics

---

## 🚢 Deployment

This project automatically deploys to GitHub Pages on every push to the `main` branch.

**Manual deployment:**
```bash
npm run build
# Push to GitHub to trigger deployment
```

Your site will be live at `https://co-writter.github.io/`

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- 🐛 Report bugs
- 💡 Suggest new features
- 🔧 Submit pull requests

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Powered by [Google Gemini AI](https://ai.google.dev/)
- Built with [Vite](https://vitejs.dev/)
- Icons from custom design system

---

<div align="center">

**Made with ❤️ and AI**

[⬆ Back to Top](#-co-writter)

</div>
