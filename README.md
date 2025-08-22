# Luchisto — Cleaning Services Landing (React + Vite + Tailwind, TypeScript)

A fast, accessible, SEO‑ready landing page for a cleaning company. Built with **Vite**, **React 18**, **TypeScript**, and **TailwindCSS**. Includes an instant price calculator, lead form (Web3Forms), comparison slider (before/after), and basic SEO via **react-helmet-async**.

> This README is exhaustive and production‑oriented. It covers project setup, environment, scripts, structure, quality gates, deployment (GitHub Pages / Vercel / Netlify), and Codespaces dev containers.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment variables](#environment-variables)
  - [Development](#development)
  - [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Code Quality](#code-quality)
- [Accessibility & SEO](#accessibility--seo)
- [Deployment](#deployment)
  - [GitHub Pages (recommended for static hosting)](#github-pages-recommended-for-static-hosting)
  - [Vercel](#vercel)
  - [Netlify](#netlify)
- [GitHub Codespaces / Dev Container](#github-codespaces--dev-container)
- [Security Notes](#security-notes)
- [FAQ](#faq)
- [License](#license)

---

## Tech Stack

- **Build tool**: Vite 5
- **UI**: React 18 + TypeScript
- **Styles**: TailwindCSS 3
- **Icons**: lucide-react
- **SEO**: react-helmet-async
- **Linting**: ESLint 9 (typescript-eslint, react-refresh, react-hooks)

## Features

- ✨ Hero section with animated rays and brand logo
- 🔁 Before/After **ComparisonSlider**
- 🧮 **InstantQuote** price calculator (configurable)
- 📝 **LeadForm** with Web3Forms (no backend needed)
- 🕸️ Basic SEO: title/description/meta via **react-helmet-async**
- 📱 Fully responsive (mobile‑first) and keyboard‑navigable
- 🧩 Strict TypeScript configuration
- 🧪 Ready for CI build & Pages deployment

---

## Getting Started

### Prerequisites

- **Node.js 20+** (LTS). Check with `node -v`.
- **npm** (bundled with Node). You can also use **pnpm** or **yarn** if preferred.

> If you previously saw `pnpm : command not found`, simply use **npm** (this repo includes a `package-lock.json`).

### Installation

```bash
# 1) Install dependencies
npm ci

# 2) Start the dev server
npm run dev
# If running inside a container/VM, expose host:
npm run dev -- --host
```

Open http://localhost:5173

### Environment variables

Copy `.env.example` to `.env` and fill in values:

```ini
# .env
VITE_HERO_LOGO=/images/logos/luchisto-logo-horizontal.svg
VITE_WEB3FORMS_KEY=REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY
VITE_WEB3FORMS_TO=you@example.com
```

> **Never commit `.env`**. It is ignored by `.gitignore`.

### Development

```bash
# Type-check (if you add a script)
# npx tsc --noEmit

# Lint
npm run lint
```

### Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

---

## Project Structure

```
.
├── public/
│   ├── images/
│   │   └── logos/            # brand assets
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── ComparisonSlider.tsx
│   │   ├── InstantQuote.tsx
│   │   ├── LeadForm.tsx
│   │   ├── Header.tsx
│   │   ├── HeroRays.tsx
│   │   ├── MissionSection.tsx
│   │   ├── SubscriptionSection.tsx
│   │   ├── TrustBadgesMarquee.tsx
│   │   └── Section.tsx
│   ├── hooks/
│   │   └── useQuoteCalculator.ts
│   ├── data/
│   │   └── pricing.json      # pricing config for calculator
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── tsconfig*.json
├── package.json
└── eslint.config.js
```

---

## Code Quality

- **ESLint** is configured with `@typescript-eslint` and `react-hooks` rules.
- Keep components **small, typed, and single-responsibility**.
- Prefer functional components and hooks.
- Keep assets under `public/` for zero runtime fetch penalties.

> Consider adding Prettier if your team prefers enforced formatting.

---

## Accessibility & SEO

- Keyboard focus states are visible and navigable.
- Labels are associated to inputs in forms.
- SEO is handled with **react-helmet-async** (`<Helmet>` in `App.tsx`):
  - `title`, `meta[name="description"]`, social previews.
- `robots.txt` and `sitemap.xml` are present in `public/`.

---

## Deployment

You have multiple zero‑config options. Below are ready‑to‑use setups.

### GitHub Pages (recommended for static hosting)

This repo includes a CI workflow you can add at:
`.github/workflows/deploy-pages.yml`

It will:

1. Install dependencies
2. Build the site
3. Copy `index.html` to `404.html` (SPA fallback)
4. Publish `dist/` to GitHub Pages

**Steps:**

1. Create the workflow file (see below) and push to `main`.
2. In your GitHub repo: **Settings → Pages** → Source: **GitHub Actions**.
3. (Optional) If deploying to `https://<owner>.github.io/<repo>/`, set Vite base path:
   - Either set `BASE_PATH=/REPO_NAME/` as an env var in the workflow and read it in `vite.config.ts`,
   - Or hardcode `base: "/REPO_NAME/"` in `vite.config.ts`.
4. Wait for the deployment job to finish; Pages will serve your site.

> The provided workflow already handles the SPA 404 fallback.

### Vercel

- Import the repo in Vercel.
- Framework preset: **Vite**.
- Build command: `npm run build`
- Output: `dist`
- Env vars: add the ones from `.env` (VITE\_\*).

### Netlify

- New site from Git → select repo
- Build command: `npm run build`
- Publish directory: `dist`
- Add env vars.

---

## GitHub Codespaces / Dev Container

Add `.devcontainer/devcontainer.json` (provided below). It uses Node 20 and automatically:

- installs deps (`npm ci`) after container is created
- starts the dev server (`npm run dev -- --host`)
- forwards port `5173`

Open with **Code → CodeSpaces → Create codespace on main**.

---

## Security Notes

- **Do not commit `.env`** or any secrets. Use repository/environment secrets in CI or host dashboards.
- Web3Forms keys should be stored as secrets in deployment platforms.
- Keep dependencies updated and review third‑party code.

---

## FAQ

**Q: I see `pnpm` not found.**  
A: Use `npm ci` / `npm run dev`. If you prefer pnpm, install it globally (`npm i -g pnpm`) and create a `pnpm-lock.yaml` by running `pnpm install` once.

**Q: How do I change the brand/logo?**  
A: Replace assets in `public/images/logos/` and update `VITE_HERO_LOGO` in `.env`.

**Q: Form submissions?**  
A: The lead form posts to Web3Forms. Set `VITE_WEB3FORMS_KEY` and (optionally) `VITE_WEB3FORMS_TO` in `.env`.

---

## License

This project is currently **UNLICENSED / All rights reserved**.  
If you plan to open‑source it, add a proper `LICENSE` file (e.g., MIT).
