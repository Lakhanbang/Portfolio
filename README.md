# Lakhan Bang - Personal Portfolio

A premium, interactive personal portfolio website built with modern web technologies to showcase my projects, technical skills, and professional journey.

## 🚀 Features

- **Immersive Design:** Dark-themed, high-contrast aesthetic with ambient lighting and glassmorphism effects.
- **Scrolly-telling Experience:** Smooth scroll animations and transition effects guided by user interaction.
- **Interactive Projects Grid:** Responsive project cards with detailed modal views, screenshots, and presentation links.
- **Dynamic Timeline:** Visual representation of my professional career and educational background.
- **Achievements Marquee:** Infinite scrolling showcase of certificates and professional recognitions.
- **Responsive Layout:** Fully optimized for desktops, tablets, and mobile devices.
- **Contact Links:** Direct email and WhatsApp contact links.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Visual Effects:** WebGL fluid cursor, animated canvas borders, and scroll-controlled video
- **Icons:** Custom SVG
- **Video:** [FFmpeg](https://ffmpeg.org/) (for optimization) & HTML5 Video

## 📂 Project Structure

```
├── src/
│   ├── app/             # Application routes (Next.js App Router)
│   ├── components/      # Reusable UI components (Hero, Projects, Skills, etc.)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and shared logic
│   └── styles/          # Global styles and Tailwind configuration
├── public/              # Static assets (images, videos, fonts)
├── .env.local           # Environment variables (not committed)
└── package.json         # Project dependencies and scripts
```

## 🏁 Getting Started

### Prerequisites

- Node.js 22.x
- npm, yarn, or pnpm

### Run locally

```sh
npm ci
npm run dev
```

### Check the production build

```sh
npm run lint
npm run build
npm run start
```

Stop the running server before reinstalling dependencies or rebuilding on Windows to avoid locked compiler/build files.

### Deploy to Vercel

Import this repository, select the Next.js framework preset and Node.js 22.x, and use the repository root. The install command is `npm ci`; use the default Next.js build and output settings. Commit `package-lock.json` along with the source and public assets.

The visible contact section uses email and WhatsApp links. No SMTP credentials or runtime environment variables are required. The unused mail endpoints have been removed.

Use a Preview deployment first. Check the home page, all project overlays, `/rfp-presentation.html`, `/resume.pdf`, and the contact links before promoting to production. HTML extension removal is disabled so the presentation URL works consistently.

### Performance behavior

- All hero videos and visual effects are retained. Videos and timeline canvases suspend when offscreen; continuous effects also suspend in hidden browser tabs.
- Project detail rendering is loaded when opened. Screenshots and certificates use responsive Next.js images with reserved intrinsic dimensions and lazy loading.
- Image dimensions live in `src/data/image-sizes.json`; update the matching entry when replacing or adding an image used by `PortfolioImage`.
- Keep original image proportions when updating project graphics. Do not introduce fixed-height containers around project screenshots.

### Local verification (November 17, 2026)

- Node.js 22.19.0, npm 10.9.3; clean `npm ci --no-audit` passed.
- `npm run lint` passed without warnings; the production build and TypeScript checks passed.
- `npm audit --omit=dev` reported no vulnerabilities.
- The sum of gzip-compressed script files referenced by the generated homepage fell from 277,883 to 248,193 bytes (10.7%). This measures initial script files, not total session traffic; cursor and project chunks load separately.
- A 750px optimized gold-certificate response was 48,688 bytes versus its 407,496-byte original. Other image savings depend on source, viewport, and format.
- Browser checks covered all five project overlays at a 390px viewport, desktop effects at 1440px, Escape closing, project expansion, lazy image loading, and offscreen video pausing. No browser errors or warnings were observed during these checks.
- Home, presentation, resume, and all hero video URLs returned HTTP 200. All 25 image metadata entries matched their source files.

These are local production checks, not a Lighthouse score or real-user latency measurement. LCP, CLS, and hosted delivery behavior must still be measured on a Vercel Preview deployment. This checkout was not linked to a Vercel project during verification; no hosted preview or production deployment was created.


