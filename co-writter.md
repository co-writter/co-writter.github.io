# Co-Writter: The AI Publishing Platform

## 🚀 Deployment Guide

**Target URL:** `https://co-writter.github.io/`
**Repository:** `https://github.com/co-writter/co-writter.github.io.git`

Follow these steps to set up the project locally, verify it works, and then deploy it to GitHub Pages using a Personal Access Token (PAT).

### Prerequisites
1.  **Node.js** installed on your computer.
2.  **Git** installed on your computer.
3.  The project folder unzipped (downloaded from Google AI Studio).

### Step 1: Local Setup & Verification

Before deploying, ensure the app runs correctly on your machine.

1.  **Open Terminal**: Open your command prompt or terminal inside the unzipped project folder.
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
4.  **Verify**: Open your browser and go to the URL shown (usually `http://localhost:5173/` or `http://localhost:3000/`).
    *   If the app loads and functions correctly, proceed to deployment.
    *   Press `Ctrl + C` in the terminal to stop the server.

### Step 2: GitHub Configuration
1.  Log into GitHub as **co-writter** (or your username).
2.  Create a **New Repository**.
3.  Repository name: **`co-writter.github.io`** (Must be exact for root domain hosting).
4.  Set visibility to **Public**.
5.  **Do not** initialize with README/gitignore. Create the repository.

### Step 3: Generate Access Token (PAT)
*If you haven't already:*
1.  Go to **Settings** > **Developer settings** > **Personal access tokens** > **Tokens (classic)**.
2.  Generate new token.
3.  Scopes: Check **`repo`** (Full control) and **`workflow`**.
4.  **Copy the token** (e.g., `ghp_...`).

### Step 4: Deploy to GitHub
Back in your terminal inside the project folder:

1.  **Initialize Git:**
    ```bash
    git init
    ```

2.  **Set Remote with Token:**
    *Replace `YOUR_TOKEN_HERE` with your actual token.*
    ```bash
    git remote add origin https://YOUR_TOKEN_HERE@github.com/co-writter/co-writter.github.io.git
    ```

3.  **Install Deployer:**
    ```bash
    npm install gh-pages --save-dev
    ```

4.  **Build the Application:**
    ```bash
    npm run build
    ```
    *This creates a `dist` folder with the production code.*

5.  **Deploy to GitHub Pages:**
    ```bash
    npx gh-pages -d dist
    ```
    *This pushes the `dist` folder to a `gh-pages` branch on your repo.*

6.  **Push Source Code (Optional but Recommended):**
    ```bash
    git add .
    git commit -m "Initial upload"
    git branch -M main
    git push -u origin main
    ```

### Step 5: Verify Live Site
1.  Go to your GitHub Repository > **Settings** > **Pages**.
2.  Ensure **Source** is set to `Deploy from a branch`.
3.  Branch: **`gh-pages`** | Folder: **`/ (root)`**.
4.  Visit **[https://co-writter.github.io/](https://co-writter.github.io/)**.
    *(Allow 1-2 minutes for the first load)*.

---

## 🏗 Architecture & Technology

**Co-Writter** is designed as a **Serverless Single Page Application (SPA)**. It leverages the client's browser for processing and connects directly to AI APIs, removing the need for a traditional backend database for the core demo.

### Tech Stack
*   **Frontend Framework**: React 18
*   **Language**: TypeScript (Strict typing for robustness)
*   **Build Tool**: Vite (High-performance bundling)
*   **Styling**: Tailwind CSS + Custom Animations (Anime.js)
*   **AI Engine**: Google Gemini API (`gemini-2.5-flash` for text, `gemini-2.5-flash-image` for visuals)
*   **Routing**: React Router DOM (HashRouter for static hosting compatibility)
*   **PDF Engine**: React-PDF + JSPDF

### Data Flow
1.  **User Session**: Stored in `localStorage` (Persists Cart, User Profile, Created Books).
2.  **AI Operations**: Direct API calls from client to Google Gemini.
3.  **File Handling**: Browser-based FileReader for PDF parsing; Base64 encoding for image generation.

---

## 🎨 UI/UX Component Breakdown

### 1. Home Page (`/`)
*   **Hero Section**: Anti-gravity floating elements with deep space gradients.
*   **Features Grid**: Glassmorphic cards with hover-lift effects.
*   **Tech Showcase**: Animated icons representing the modern stack.

### 2. Ebook Studio (`/ebook-studio`)
*   **Split Interface**:
    *   **Left (Tools)**: Chatbot for brainstorming and Chapter Outline navigator.
    *   **Right (Editor)**: Infinite canvas editor with "Slash Command" (`/`) support for inserting headers, quotes, or triggering AI generation.
*   **AI Integration**: Highlight text to refine, or ask the Co-Author to write the next page.
*   **Visuals**: Generate illustrations directly into the manuscript.

### 3. The Store (`/store`)
*   **Book Cards**: 3D-tilt reactive cards displaying cover art, price, and genre.
*   **Filtering**: Real-time search and category filtering without page reloads.
*   **Modal Preview**: Immersive book details view with backdrop blur.

### 4. Reader Interface (`/read/:id`)
*   **Adaptive Theme**: Switch between Light, Dark, and Sepia modes.
*   **Typography Control**: Adjust font size and font family (Serif/Sans/Mono).
*   **Dual Mode**:
    *   **PDF Mode**: Renders uploaded PDFs with page navigation.
    *   **Live Mode**: Renders Markdown content generated by the AI Studio.

### 5. Dashboard (`/dashboard`)
*   **Writer View**:
    *   **Live Audience**: Simulated real-time visitor tracking with location and status.
    *   **Analytics**: Area charts visualizing revenue trends.
    *   **Site Config**: Deploy your own sub-site to GitHub Pages.
*   **Reader View**:
    *   **Library**: Grid view of purchased/downloaded books.
    *   **Profile**: Manage user details and upgrade path.

### 6. Hosting Preview (`/site/:username`)
*   **Simulated Browser**: A meta-component that wraps the content in a fake browser window to preview how a user's deployed site looks.
*   **Theme Engine**: Applies the user's selected theme (Minimal/Elegant/Tech) dynamically to the page body.