
# Co-Writter: Production Blueprint (v2.0)

**Project Name:** Co-Writter
**Codename:** Antigravity Engine
**Repository:** `co-writter/co-writter.github.io`
**Live URL:** `https://co-writter.github.io`

---

## 1. Executive Architecture: "The Universal Engine"

Co-Writter is architected as a **Single-Page Application (SPA)** that functions as a **Self-Replicating Publishing Platform**. Instead of deploying separate websites for every user, the application uses a **Universal Hosting Pattern** on GitHub Pages.

### The Core Loop
1.  **The Engine:** The React App (`index.html` + `assets`) is hosted at the root.
2.  **The Database:** The GitHub Repository itself acts as the database. User profiles and book catalogs are stored as **JSON files** in the `public/data/users/` directory.
3.  **The Routing:** The app uses **HashRouting** to dynamically hydrate a generic template based on the URL hash.

> **Example:**
> When a visitor navigates to `https://co-writter.github.io/#/site/johndoe`:
> 1. The SPA loads.
> 2. It parses `:username` (johndoe).
> 3. It fetches `https://raw.githubusercontent.com/co-writter/co-writter.github.io/main/public/data/users/johndoe.json`.
> 4. It renders the **HostingPreviewPage** with John's specific theme, bio, and books.

---

## 2. Tech Stack & Dependencies

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

**Commerce & Infrastructure:**
*   **Payments:** Razorpay (Client-side integration)
*   **Hosting:** GitHub Pages (Static)
*   **Data:** GitHub Repository API (JSON Storage)

---

## 3. Directory Structure

```text
/
├── public/
│   ├── vite.svg
│   └── data/               <-- THE "DATABASE"
│       └── users/
│           ├── admin.json  <-- Example Profile
│           └── [user].json <-- User-generated Profiles
├── src/
│   ├── components/         <-- UI Building Blocks
│   ├── contexts/           <-- Global State (User, Cart, AI Chat)
│   ├── pages/
│   │   ├── HostingPreviewPage.tsx <-- The Universal Store Template
│   │   └── EbookStudioPage.tsx    <-- The Writing Engine
│   ├── services/
│   │   ├── geminiService.ts       <-- AI Logic
│   │   └── cloudService.ts        <-- GitHub/Google API Logic
│   ├── types.ts
│   ├── constants.tsx
│   ├── App.tsx
│   └── index.tsx
├── index.html              <-- Entry Point (Tailwind Config Injection)
├── vite.config.ts          <-- Build Config (base: './')
└── tsconfig.json
```

---

## 4. Deployment Strategy (Automated)

To make this "Production Ready", the **Google-Antigravity-IDE** must execute the following pipeline:

### Step A: Build Configuration
The `vite.config.ts` **MUST** have the base set to relative path `./` to ensure assets load correctly on GitHub Pages sub-directories.

```typescript
// vite.config.ts
export default defineConfig({
  base: './', // CRITICAL for GitHub Pages
  build: { outDir: 'dist' }
});
```

### Step B: Environment Variables
Create a `.env` file (or set GitHub Secrets) with the following keys. **DO NOT** commit real keys to public repos.

```env
VITE_API_KEY=your_google_gemini_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

### Step C: The "Push" Command
Run the build and deploy to the `gh-pages` branch.

```bash
npm install
npm run build
# Using gh-pages package
npx gh-pages -d dist
```

---

## 5. The "Write-to-Repo" Feature (Advanced)

For the **Seller Dashboard** to publish changes live to the internet without a backend server, the app uses the **GitHub API**.

**Implementation Logic (`cloudService.ts`):**

1.  **Auth:** User authenticates via GitHub OAuth (Personal Access Token or OAuth App).
2.  **Commit:** The app constructs a `PUT` request to `https://api.github.com/repos/co-writter/co-writter.github.io/contents/public/data/users/{username}.json`.
3.  **Payload:**
    ```json
    {
      "message": "Update site configuration for {username}",
      "content": "BASE64_ENCODED_JSON_STRING",
      "sha": "EXISTING_FILE_SHA_IF_UPDATE"
    }
    ```
4.  **Live:** Within 60 seconds (GitHub Pages cache time), the URL `/#/site/{username}` reflects the new data.

---

## 6. Safety & Verification

*   **SanitizeBookStructure:** The `EbookStudioPage` includes a logic engine that enforces sequential chapter numbering (1, 2, 3...) and prevents empty titles before saving/exporting.
*   **Context-Aware AI:** The `geminiService` injects the previous 1000 characters of the book context into every new prompt to ensure continuity.
*   **Blue Tick Verification:** Logic exists in `AppContext` to verify sellers (`isVerified: true`), which adds a trusted checkmark to their profile on the storefront.

## 7. Policies & Legal

The application includes fully rendered policy pages required for Payment Gateway approval:
*   `/privacy-policy` (Includes Google Core Data clauses)
*   `/terms-and-conditions`
*   `/shipping-policy` (Digital Goods)
*   `/refund-policy` (No Refunds on Digital Downloads)
*   `/contact` (Merchant details)

---

**Ready for Launch Sequence.**
