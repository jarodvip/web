# Jarod's Personal Portfolio

A high-performance, pixel-perfect personal portfolio website built with modern web technologies. Designed for a thought leader positioning with focus on performance, accessibility, and visual quality.

## ✨ Key Features

- **Minimal & Direct Design System**: Clean, modern aesthetic with solid colors and semantic typography
- **High Performance**: <1s first screen load with code splitting and font optimization
- **Responsive Design**: Mobile-first, fully accessible across all devices
- **Dark Mode Support**: Theme switching with persistence via `next-themes`
- **Smooth Animations**: Framer Motion animations (150-300ms) respecting `prefers-reduced-motion`
- **SEO Optimized**: Semantic HTML, Open Graph metadata, sitemap generation

## 🛠 Tech Stack

- **Framework**: [Next.js 16.2.6](https://nextjs.org) (App Router)
- **Runtime**: [React 19.2.4](https://react.dev)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion)
- **Icons**: [Lucide React](https://lucide.dev)
- **Fonts**: [Inter](https://rsms.me/inter/) + [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

## 📐 Design System

### Color Tokens

Semantic color variables defined in `app/globals.css`:

```
Light Mode:
- --bg-primary: white
- --bg-secondary: #f9fafb
- --border: #e5e7eb
- --text-primary: #111827
- --text-secondary: #6b7280
- --accent: #3b82f6

Dark Mode:
- --bg-primary: #09090b
- --bg-secondary: #18181b
- --border: #27272a
- --text-primary: #fafafa
- --text-secondary: #a1a1a6
- --accent: #60a5fa
```

### Typography Scale

- **Base**: 16px (mobile), 18px (desktop)
- **Headings**: Semantic scale (h1: 32px, h2: 24px, h3: 20px)
- **Line Height**: 1.5-1.75 for body text
- **Font Loading**: `font-display: swap` prevents invisible text flashing (FOIT)

## ⚡ Performance Optimizations

### Core Web Vitals Targets
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Key Optimizations
1. **Design System**: Removed GPU-intensive `backdrop-filter: blur()` in favor of solid colors
2. **Code Splitting**: Below-the-fold sections (Projects, Experience, Skills) lazy-loaded via `dynamic()`
3. **Font Optimization**: Variable fonts with `font-display: swap`, strategic preloading
4. **Animation Timing**: All transitions standardized to 150-400ms range
5. **Image Handling**: Responsive images with proper aspect ratios to prevent CLS

See [REFACTOR_PLAN.md](./REFACTOR_PLAN.md) for detailed refactoring strategy.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+ (or yarn/pnpm)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Available Scripts

```bash
npm run dev      # Start development server (watch mode)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
├── app/
│   ├── globals.css           # Design system & CSS variables
│   ├── layout.tsx            # Root layout with theme provider
│   └── page.tsx              # Home page with lazy-loaded sections
├── components/
│   ├── layout/               # Header, Footer, Navigation
│   ├── sections/             # Page sections (Hero, Projects, etc.)
│   └── ui/                   # Reusable UI components
├── lib/
│   ├── types.ts              # TypeType definitions
│   └── data.ts               # Portfolio content (hardcoded or CMS-ready)
├── public/                   # Static assets
├── REFACTOR_PLAN.md          # Frontend refactoring documentation
└── AGENTS.md                 # AI assistant guidelines
```

## 🎨 Component Hierarchy

- **Layout**: Header, Footer (persistent across all pages)
- **Page Sections** (lazy-loaded):
  - Hero: Introduction & social links
  - Skills: Competency showcase
  - Projects: Portfolio projects with descriptions
  - Experience: Timeline of roles and education
- **UI Components**: Reusable cards, animations, theme toggle

## ♿ Accessibility

- WCAG 2.1 AA compliance
- Semantic HTML (`<nav>`, `<article>`, `<section>`)
- ARIA labels for icon-only buttons
- Keyboard navigation support (tab order, focus states)
- Color contrast minimum 4.5:1
- Respects `prefers-reduced-motion` user preference

## 🌙 Dark Mode

Theme switching powered by `next-themes`:
- System preference detection
- Manual toggle button in header
- Persistent across sessions (localStorage)
- Smooth transitions via CSS variables

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Connect repo to Vercel
3. Deploy automatically on push

```bash
# Vercel deployment
vercel deploy
```

### Deploy Elsewhere

Build for any static host:

```bash
npm run build  # Creates `.next/` directory
npm start      # Runs Next.js server
```

## 📚 Documentation

- [REFACTOR_PLAN.md](./REFACTOR_PLAN.md) - Detailed refactoring strategy & performance targets
- [AGENTS.md](./AGENTS.md) - AI assistant guidelines for this project
- [Next.js Docs](https://nextjs.org/docs) - Official Next.js documentation
- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Styling reference
- [Framer Motion Docs](https://www.framer.com/motion) - Animation API reference

## 🔄 Contributing

This is a personal project. For suggestions or improvements, feel free to:
1. Create an issue describing the enhancement
2. Submit a pull request with changes
3. Include performance metrics in PR description

## 📄 License

Jarod's Personal Portfolio — All rights reserved.
