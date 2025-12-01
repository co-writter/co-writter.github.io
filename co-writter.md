
# Co-Writter Changelog

All notable changes to the "co-writter" project will be documented in this file.

## [Unreleased]

## [1.2.3] - Animated Logo Polish
- **MorphicEye**: Enhanced the logo animation logic.
  - **Tracking**: Mouse tracking now uses a smoother radial constraint logic, preventing the eyes from clipping outside the socket.
  - **Blinking**: Implemented a robust recursive timeout loop to ensure blinking occurs randomly (2-6s intervals) and visibly squashes the eye height to 2px.
  - **Aesthetics**: Added a "glint" reflection to the pupils for a cuter, more lively robot appearance.

## [1.2.2] - Animated Identity
- **Logo**: Integrated the animated **MorphicEye** component into the main navigation bar. The "tiny robot in a circle with blinking eyes" is now the primary application logo.
- **Branding**: Updated the logo typography to **lowercase** ("co-writter") as per design requirements.

## [1.2.1] - Branding Update
- **Logo Update**: Replaced the abstract `IconCogito` with a custom-designed **Cute Robot** icon to serve as the friendly face of the application.
- **Navbar Refinement**: Updated the logo container in the navigation bar to be larger and rounder (`rounded-2xl`), accentuating the new friendly robot aesthetic.
- **Login Page**: Updated the logo display on the login portal to match the new branding.

## [1.2.0] - Morphic Studio Redesign
- **UI Overhaul**: Replaced the previous studio interface with a **Morphic Dark Theme**.
  - **Layout**: Implemented a professional 3-pane workspace (Manifest, Editor, Mission Control).
  - **Visuals**: Deep black backgrounds (`#050505`), thin crisp borders, and monospaced accents.
  - **Components**: Added `SystemCard` for visualizing agent thought processes and `BlueprintCard` for outlines.
- **Auto-Pilot Feature**: 
  - Added a "Mission Control" modal to launch autonomous generation sequences.
  - Integrated "Vision" tab for generating concept art directly alongside the text.
- **UX Improvements**:
  - Live character streaming simulation for the "Writer Agent".
  - Real-time progress bars for AI actions.
  - Improved mobile navigation for the studio.

## [1.1.1] - UI Enhancements
- **Icons**: Improved the "Launch Interface" button icon in the Seller Dashboard. Replaced the generic sparkles with a dynamic **Rocket** icon that animates on hover, better signifying the action of launching the studio.

## [1.1.0] - Pitch Black Theme Overhaul

### Visual Design
- **Pitch Black Aesthetic**: Migrated the entire application background to pure `#000000`.
- **2D Animative Elements**: 
  - Added a global **Kinetic Grid** background with floating geometry.
  - Replaced soft glassmorphism with **High-Contrast 2D Panels** (Black fill, White/15 border).
  - Updated `Spinner` to a 2D mechanical square animation.
- **UI Components**:
  - `BookCard`: Updated to pitch black with sharp white borders and hover lifts.
  - `Navbar`: Pure black with stark border separators.
  - `Dashboard`: Panels now adhere to the strict 2D black/white theme.

### New Features
- **Ebook Studio**: Implemented a dedicated writing environment (`pages/EbookStudioPage.tsx`) utilizing Gemini 2.5 Flash for:
  - Agentic writing workflow (Planner, Writer, Editor).
  - Real-time streaming of generated content.
  - Chat-based "Co-Author" collaboration.
- **Smart Upload System**: Added `analyzePdfContent` service to extract book metadata.
- **AI Asset Generation**: `AICoverGenerator` and `AIPricingOptimizer`.
- **Commerce**: Razorpay integration and Storefront.

### Technical Updates
- Updated `index.html` Tailwind config for strict dark mode color palette.
- Enhanced `App.tsx` layout structure to support fixed background animations.

## [1.0.0] - Initial Beta
- Initial release with Gemini AI integration, Google Auth, and Reader functionality.
