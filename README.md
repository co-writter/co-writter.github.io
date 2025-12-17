<div align="center">
  <img src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" width="100%" alt="Co-Writter Banner"/>
  
  # Co-Writter: AI-Powered Publishing Ecosystem
  
  [![Production Status](https://img.shields.io/badge/Status-Production-green?style=for-the-badge)](https://co-writter-studio.web.app)
  [![GitHub Pages](https://img.shields.io/badge/Landing-GitHub_Pages-blue?style=for-the-badge)](https://co-writter.github.io)
  [![Firebase](https://img.shields.io/badge/App-Firebase-orange?style=for-the-badge)](https://co-writter-studio.web.app)
  
  <p align="center">
    <b>A professional studio environment for writing, publishing, and monetizing your work.</b>
  </p>
</div>

## 🌐 Ecosystem & URLs

This project operates on a split-domain architecture to separate the public-facing marketing funnels from the secure application environment.

| Environment | URL | Purpose |
|-------------|-----|---------|
| **Landing & Marketing** | [**co-writter.github.io**](https://co-writter.github.io) | Public entry point. Hosted on GitHub Pages. Redirects authenticated users. |
| **Studio Application** | [**co-writter-studio.web.app**](https://co-writter-studio.web.app) | **The Real App**. Secure, authenticated Firebase environment for writing and publishing. |
| *Development Mirror* | *co-writter.vercel.app* | *Internal testing & development mirror. Not for public use.* |

## 🚀 Key Features

*   **Antigravity Design**: A premium, physics-inspired UI with glassmorphism and smooth animations.
*   **AI-Powered Studio**: Integrated with Google Gemini for advanced writing assistance.
*   **Secure Authentication**: Protected routes ensuring only verified users can access the studio.
*   **Monetization**: Built-in marketplace infrastructure using Razorpay.

## 🛠 Architecture

1.  **Frontend**: React 18, TypeScript, Vite.
2.  **Routing**: Smart routing based on domain context (`github.io` vs `web.app`).
3.  **Authentication**: Firebase Auth (Google OAuth).
4.  **Deployment**: Automated multi-target deployment (GitHub Actions -> Pages, Firebase CLI -> Hosting).

## 🔒 Authentication Configuration

To ensure secure sign-ins, the following **Authorized Redirect URIs** must be whitelisted in the Google Cloud Console / Firebase Console:

*   `https://co-writter-studio.web.app/__/auth/handler`
*   `https://co-writter-studio.firebaseapp.com/__/auth/handler`
*   `https://co-writter.github.io` (for initial redirection flow)
*   `http://localhost:5173` (Local Dev)
*   `https://co-writter.vercel.app` (Dev Mirror)

---
*© 2025 OpenDev Labs. All Rights Reserved.*
