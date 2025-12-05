
# Co-Writter: Production Blueprint (v2.0)

**Project Name:** Co-Writter
**Codename:** Antigravity Engine
**Repository:** `co-writter/co-writter.github.io`
**Live URL:** `https://co-writter.github.io`

---

## 1. Executive Architecture: "The Universal Engine"

Co-Writter is architected as a **Single-Page Application (SPA)** that functions as a **Self-Replicating Publishing Platform**. Instead of deploying separate websites for every user, the application uses a **Universal Hosting Pattern** on GitHub Pages.

### The Core Loop
1.  **The Engine:** The React App (`index.html` + `assets`) is hosted at the root of `co-writter.github.io`.
2.  **The Routing:** The app uses **HashRouting** (`/#/`) to handle navigation. This bypasses GitHub Pages' limitation of not supporting history mode (pushState) for single-page apps without a custom 404 handler.
3.  **The Sub-Site Strategy:** 
    *   To allow a user to have "their own site", we use the route `/#/site/:username`.
    *   The `HostingPreviewPage` component reads this parameter.
    *   It fetches the specific user's configuration and books from a central data store (simulated via LocalStorage/JSON).
    *   It renders a *completely different theme and layout*, making it look like a standalone website.

> **Example:**
> When a visitor navigates to `https://co-writter.github.io/#/site/johndoe`:
> 1. The main SPA loads.
> 2. It detects the `/site/johndoe` route.
> 3. It hides the main Co-Writter navbar.
> 4. It loads John Doe's "Dark Minimal" theme and specific book list.

---

## 2. Mobile Optimization Strategy

The app has been optimized for "App-Like" behavior on mobile browsers:
*   **Viewport Handling:** `viewport-fit=cover` and safe-area padding for notched devices.
*   **Touch Targets:** Buttons are sized for fingers (>44px).
*   **Studio Layout:** The Ebook Studio intelligently switches between "Chat" and "Editor" tabs on mobile, as a 3-pane layout is impossible on small screens.
*   **Bottom Navigation:** The Dashboard uses a sticky bottom bar on mobile for easy thumb access.

---

## 3. Tech Stack & Dependencies

**Frontend Core:**
*   **Framework:** React 18 (via Vite)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (CDN/Configured), Anime.js (Animations)
*   **Routing:** React Router DOM v6 (HashRouter)

**AI & Neural Engine:**
*   **SDK:** `@google/genai` (v1.6.0+)
*   **Models:** 
    *   `gemini-2.5-flash` (Reasoning, Writing, Logic)
    *   `gemini-2.5-flash-image` (Cover Generation)
    *   `gemini-2.5-flash-preview-tts` (Audio Synthesis)

---

## 4. Deployment Instructions

To deploy this to GitHub Pages:

### Step 1: Prep
Ensure `vite.config.ts` has `base: './'`. This is crucial for relative asset loading.

### Step 2: Build
Run the build command to generate the `dist` folder.
```bash
npm install
npm run build
```

### Step 3: Deploy (Manual)
1.  Initialize a git repo if not done.
2.  Commit your code.
3.  Push to GitHub.
4.  **Action:** Use a GitHub Action or the `gh-pages` package to push the `dist` folder to the `gh-pages` branch.

**Using `gh-pages` package:**
```bash
npm install gh-pages --save-dev
# Add to package.json scripts: "deploy": "gh-pages -d dist"
npm run deploy
```

### Step 4: Configure GitHub
1.  Go to your Repository Settings > Pages.
2.  Source: Deploy from branch.
3.  Branch: `gh-pages` / `/root`.
4.  Save.

Your site will be live at `https://your-username.github.io/repo-name`.

---

**Ready for Launch Sequence.**
