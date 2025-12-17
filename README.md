<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6"# Co-Writter: AI-Powered Publishing Platform

![Co-Writter Studio](https://co-writter.github.io/studio-preview.png)

## Overview
Co-Writter is a next-generation ebook creation and publishing platform that leverages Google Gemini AI to assist authors in writing, editing, and selling their books. The platform integrates a powerful studio environment with a public marketplace.

- **Landing Page**: [https://co-writter.github.io](https://co-writter.github.io)
- **Studio App (Production)**: [https://co-writter-studio.web.app](https://co-writter-studio.web.app)
- **Development Mirror**: [https://co-writter.vercel.app](https://co-writter.vercel.app)

## Architecture

The project uses a split-domain architecture to ensure optimal performance and security:

1.  **Marketing & Funnel (`github.io`)**:
    *   Hosted on GitHub Pages.
    *   Serves the Landing Page, Policy Pages, and Studio Funnel.
    *   Redirects authenticated users to the secure Studio application.

2.  **Application Core (`web.app`)**:
    *   Hosted on Firebase Hosting (`co-writter-studio`).
    *   Contains the `EbookStudio`, `Dashboard`, and `WriterTools`.
    *   Protected by Firebase Authentication.

3.  **Development Mirror (`vercel.app`)**:
    *   Continuous Deployment from the `main` branch.
    *   Used for testing new features in a production-like environment before final release.

## Tech Stack
*   **Frontend**: React 18, TypeScript, Vite
*   **Styling**: TailwindCSS, Framer Motion
*   **Backend / Auth**: Firebase (Auth, Firestore, Storage)
*   **AI Engine**: Google Gemini API
*   **Payments**: Razorpay

## Local Development

```bash
# Install dependencies
npm install

# Run local development server
npm run dev
# App runs at http://localhost:5173
```

## Deployment

The project is configured for automated multi-target deployment.

### Deploy to Production (Firebase)
```bash
# Switch to Production Project
firebase use co-writter-studio

# Build & Deploy
npm run build
firebase deploy --only hosting
```

### Deploy to Landing (GitHub Pages)
Updates to the `main` branch are automatically deployed to GitHub Pages via GitHub Actions (if configured) or can be manually deployed:
```bash
npm run deploy
```

---
*Built with ❤️ by OpenDev Labs*
