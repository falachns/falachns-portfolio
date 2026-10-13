# Falach Noor Syahid — Product Design Portfolio

> Minimalist product design portfolio of **Falach Noor Syahid**, Product Designer at **PT Kereta Api Indonesia (Persero)**, ex-**Qiscus**.  
> Live production website: [https://falachns.web.id](https://falachns.web.id)

---

## ✦ Project Overview

This repository powers the personal portfolio and digital craft archive of Falach Noor Syahid. Focused on enterprise software, customer experience ecosystems, and design engineering, the portfolio presents real-world case studies across national railway operations (PT KAI) and Southeast Asian omnichannel customer engagement platforms (Qiscus).

---

## 🎨 Design Philosophy

Inspired by the restrained, editorial minimalism of [Rachel Chen](https://www.rachelchen.tech/) and [Evan Yudis](https://www.evanyudis.com/):

- **100% Manrope Typography Scale**: Strictly unified font scale utilizing Google Fonts Manrope (`font-family: var(--font-manrope), sans-serif`) with system monospace reserved for tabular metadata, live clock timestamps, and keyboard shortcuts.
- **Quiet Editorial Hierarchy**: Single centered column constraint (`max-w-[680px]` wrapped in `mx-auto`) paired with generous negative space (`px-6 sm:px-8 md:px-12`).
- **Zero Visual Fluff**: No extraneous drop shadows, multi-colored gradients, or gratuitous decorative borders. Content and interaction ergonomics dictate the layout.
- **Code as Design Medium**: Built with semantic HTML, fluid CSS variables, and native browser features to ensure 1:1 fidelity between design intent and production implementation.

---

## 🏛️ Key Architectural Features

1. **Global Floating Pill Navigation Dock**:
   - Clean, persistent navigation bar providing access to Work, Playground, Explorations, and the AI Assistant.
   - Built with responsive viewport adaptation and accessible focus rings.
   - Includes keyboard shortcut hint (`⌘K` / `Ctrl+K`) for quick assistant launch.

2. **Interactive "Ask FalachLLM" Assistant Drawer**:
   - Accessible W3C Dialog container (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`).
   - Grounded knowledge base built upon Falach's verified 2026 resume (KAI ESG platform, Qiscus CSAT, AI design engineering).
   - Features active focus trap, Escape key dismiss, focus restoration to trigger element, and full conversation reset.
   - Also available as a standalone dedicated page at `/ask-falach`.

3. **Native Dynamic Case Studies (`/work/[slug]`)**:
   - Static-site generated (SSG) via Next.js App Router dynamic parameters.
   - Verified real-world business metrics strips (e.g., *20+ Enterprise Clients*, *0 Critical Bugs*, *~10% Lift in Orders*).
   - Sequential heading hierarchy (`h1` -> `h2` -> `h3`) with zero skipped levels.
   - Smooth video autoplay loop micro-previews with graceful high-resolution image fallbacks.

4. **Pure Visual Exploration Gallery (`/explorations`)**:
   - Framer-fidelity visual archive of interaction prototypes, motion studies, and design system components.
   - Robust non-collapsing container architecture preventing layout overlaps during progressive media loading.
   - Touch-friendly external links to live Figma prototypes (such as Focus Pomodoro).

5. **Theme Engine (Light-Default & Zero FOUC)**:
   - **Default State**: Calibrated to clean, high-clarity **Light Mode** on first load.
   - **Persistence**: Inline `<head>` script executes prior to render to read `localStorage` preference, ensuring zero Flash of Unstyled Content (FOUC).
   - **Footer Toggle**: Discrete moon/sun toggle in the footer that switches between light (`#fafafa`) and dark (`#09090b`) modes.
   - **Full WCAG AA Compliance**: All text tokens, tags (`.tag-mono`), shortcut keys (`.nav-kbd`), year badges (`.project-year`), and live clocks (`.footer-clock-time`) achieve contrast ratios exceeding 4.5:1 (up to 12:1).

---

## 💻 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) with React 19
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: Vanilla CSS tokens in `globals.css` with utility classes (Tailwind CSS tokens)
- **Icons**: [@hugeicons/react](https://hugeicons.com/) & [@hugeicons/core-free-icons](https://hugeicons.com/)
- **Typography**: `next/font/google` (Manrope) & system monospace
- **Deployment**: [Vercel](https://vercel.com/) with automated branch previews

---

## 📁 Project Directory Structure

```text
falachns-portfolio/
├── app/
│   ├── ask-falach/
│   │   └── page.tsx           # Server component with SEO metadata for Ask FalachLLM
│   ├── explorations/
│   │   └── page.tsx           # Framer-fidelity interaction prototypes & media gallery
│   ├── playground/
│   │   └── page.tsx           # Recognitions, honors, and design exploration
│   ├── work/
│   │   └── [slug]/
│   │       └── page.tsx       # Dynamic case study pages with metrics and narrative
│   ├── globals.css            # Design tokens, themes, typography, and contrast rules
│   ├── layout.tsx             # Root layout, Google Manrope font, OpenGraph, JSON-LD
│   ├── not-found.tsx          # Minimalist 404 error page matching Framer
│   └── page.tsx               # Homepage with editorial hero and featured works
├── components/
│   ├── AskFalachDrawer.tsx    # Slide-over W3C Dialog modal with focus trap
│   ├── AskFalachPageView.tsx  # Interactive chat client component for /ask-falach
│   ├── Footer.tsx             # Email copy button, social links, LiveClock, theme toggle
│   ├── GreetingSwitcher.tsx   # Localized greeting micro-interaction
│   ├── Header.tsx             # Floating pill navigation bar dock
│   ├── LiveClock.tsx          # Real-time tabular clock (Bandung, Indonesia UTC+7)
│   └── MediaViewer.tsx        # Resilient video player with image fallback & priority
├── data/
│   └── projects.ts            # Case study datasets, impact metrics, and project metadata
├── public/
│   ├── favicon.png            # 32x32 favicon
│   ├── icon.png               # 512x512 app icon
│   ├── og-image.png           # 1200x630 social preview card
│   ├── robots.txt             # Crawl instructions for search engines
│   ├── sitemap.xml            # Canonical sitemap containing all production routes
│   └── site.webmanifest       # PWA manifest
├── package.json               # Dependencies and build scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

---

## 🚀 Local Development Guide

### Prerequisites

- [Node.js](https://nodejs.org/) version 18.18.0 or newer
- [npm](https://www.npmjs.com/) (or pnpm / yarn)

### 1. Clone the Repository

```bash
git clone https://github.com/falachns/falachns-portfolio.git
cd falachns-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production

```bash
npm run build
```

This compiles TypeScript, optimizes static pages (SSG), and verifies that all routes build with zero errors.

### 5. Start Production Server

```bash
npm run start
```

---

## 🔍 SEO & Accessibility Verification

- **MetadataBase**: `https://falachns.web.id`
- **Dynamic Title Template**: `%s | Falach Noor Syahid`
- **OpenGraph & Twitter**: Configured across root and all subpages (`summary_large_image`)
- **Semantic Headings**: Sequential `h1` -> `h2` -> `h3` hierarchy across all pages
- **Color Contrast**: All text elements verified to meet or exceed WCAG AA (>= 4.5:1 ratio)
- **Alt Texts**: 100% descriptive alt attributes on all case study and gallery media

---

## 📄 License

This repository is maintained for personal portfolio purposes. Case study content, imagery, and intellectual property belong to Falach Noor Syahid and their respective organizations (PT Kereta Api Indonesia (Persero) & Qiscus).
