# Co-Writter: Market-Ready Architecture 🚀

This document defines the professional architecture and deployment strategy for the **Co-Writter** SaaS platform.

## 1. Market Entry & Domains 📂

| Component | Responsibility | URL | Owner Account |
| :--- | :--- | :--- | :--- |
| **Primary Site** | Main Entry & SaaS Dashboard | [co-writter.github.io](https://co-writter.github.io) | `subatomiceror@gmail.com` |
| **App Engine** | Firebase Studio Backend | [co-writter-51007753.web.app](https://co-writter-51007753.web.app) | `opendev.help@gmail.com` |
| **Code Repo** | Source Code & Automation | [github.com/co-writter/co-writter.github.io](https://github.com/co-writter/co-writter.github.io) | `subatomiceror@gmail.com` |

---

## 2. Professional SEO & Branding (v1.0) 🔍

To ensure market readiness, the following SEO parameters are implemented:
- **Title**: Co-Writter | AI-Powered Ebook Studio
- **Meta Description**: Professional AI authoring engine for creators. Write, format, and publish ebooks instantly.
- **OpenGraph**: Professional preview cards for social media (Twitter/X, LinkedIn, WhatsApp).

---

## 3. Automation & Deployment 🤖

We use **GitHub Actions** for dual-deployment:
- **Trigger**: Every push to `main`.
- **Destination 1**: GitHub Pages (Client-side app).
- **Destination 2**: Firebase Hosting (Dynamic studio features).

### Required Setup:
Ensure the following secret is in the repository at [github.com/co-writter/co-writter.github.io](https://github.com/co-writter/co-writter.github.io/settings/secrets/actions):
- `FIREBASE_SERVICE_ACCOUNT_CO_WRITTER_51007753`

---

*This document is the Source of Truth for Co-Writter's production architecture.*
