# Development Setup Guide

Complete guide for setting up the development environment and getting started with the portfolio project.

## Prerequisites

### Required
- **Node.js**: 18.17 or newer (check with `node --version`)
- **npm**: 9 or newer (comes with Node.js)

### Recommended
- **Git**: For version control
- **VS Code**: With recommended extensions (see below)
- **macOS/Linux**: Windows works but some scripts may need adjustment

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/jarodvip/web.git
cd web
```

### 2. Install Dependencies

```bash
npm install
```

This installs all packages defined in `package.json`:
- Next.js 16
- React 19
- Tailwind CSS 4
- Framer Motion
- next-themes
- lucide-react
- TypeScript
- ESLint

### 3. Verify Installation

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the portfolio homepage.

## Development Workflow

### Start Development Server

```bash
npm run dev
```

- Runs Next.js in development mode (watch mode)
- Hot reloads on file changes
- Source maps for debugging
- Slower build (normal, optimizations are disabled)

### Build for Production

```bash
npm run build
```

- Creates optimized production bundle in `.next/`
- Minifies code and CSS
- Pre-renders static pages
- ~2-5 minutes on typical hardware

### Start Production Server

```bash
npm run start
```

- Runs the production-optimized server
- Required to test production build locally
- Use for performance testing

### Linting

```bash
npm run lint
```

- Runs ESLint to check code quality
- Reports unused variables, formatting issues, etc.
- Fix automatically with `npm run lint -- --fix`

## Project Structure

```
web/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles & CSS variables
│   ├── layout.tsx               # Root layout with ThemeProvider
│   └── page.tsx                 # Home page
├── components/
│   ├── layout/
│   │   ├── header.tsx           # Navigation & theme toggle
│   │   └── footer.tsx           # Footer
│   ├── sections/
│   │   ├── hero.tsx             # Hero section
│   │   ├── projects.tsx         # Projects section (lazy-loaded)
│   │   ├── experience.tsx       # Experience/timeline (lazy-loaded)
│   │   └── skills.tsx           # Skills (lazy-loaded)
│   └── ui/
│       ├── fade-in-section.tsx  # Scroll-triggered animation wrapper
│       ├── project-card.tsx     # Project card component
│       ├── timeline-item.tsx    # Timeline entry
│       ├── skill-tag.tsx        # Skill badge
│       ├── social-links.tsx     # Social icon buttons
│       └── theme-toggle.tsx     # Dark mode toggle
├── lib/
│   ├── types.ts                 # TypeScript type definitions
│   └── data.ts                  # Portfolio data (hardcoded)
├── public/                      # Static assets
├── docs/                        # Documentation
│   ├── ARCHITECTURE.md          # Architecture overview
│   └── SETUP.md                 # This file
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS config
├── next.config.ts               # Next.js configuration
├── CHANGELOG.md                 # Version history
├── README.md                    # Project overview
└── REFACTOR_PLAN.md             # Refactoring documentation
```

## Configuration Files

### `tsconfig.json`
- TypeScript compiler options
- Path aliases: `@/*` → `./` (for cleaner imports)
- Strict mode enabled for type safety

### `tailwind.config.ts`
- Extends theme with semantic color tokens
- CSS variable references: `bg-primary`, `text-primary`, etc.
- No custom plugins (standard Tailwind + variables)

### `next.config.ts`
- Minimal config (defaults are sensible)
- Can add image optimization, headers, redirects here
- Currently uses default Next.js settings

### `package.json`
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^16.2.6",
    "react": "^19.2.4",
    "framer-motion": "^11.0.3",
    "next-themes": "^1.0.0",
    "lucide-react": "^0.408.0"
  }
}
```

## Environment Setup

### Environment Variables

No required env vars for development. Optional:

Create `.env.local` (never committed):

```bash
# Optional: Analytics, CMS integration, etc.
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Environment variables in Next.js:
- `NEXT_PUBLIC_*` prefix makes them available to browser
- Others are server-only
- Loaded automatically from `.env.local`

## Code Style & Conventions

### TypeScript
- Strict mode enabled
- Type all function parameters and returns
- No `any` type without justification

### React
- Functional components only
- Use Server Components by default (Next.js App Router)
- Mark interactive components with `"use client"`

### Styling
- Tailwind CSS for all styles (no CSS-in-JS)
- Semantic class names: `bg-bg-secondary`, `text-text-primary`
- Dark mode via `dark:` prefix or system preference
- No arbitrary values unless absolutely necessary

### Naming
- Files: kebab-case (`fade-in-section.tsx`)
- Functions/exports: PascalCase (`FadeInSection`)
- Variables/hooks: camelCase (`isScrolled`)

### Comments
- Minimal comments (code should be self-documenting)
- Only explain WHY, not WHAT
- Chinese comments for code (per project CLAUDE.md)

## Debugging

### Browser DevTools
- **Elements/Inspector**: Inspect DOM, check styles
- **Console**: View logs and errors (`console.log()`)
- **Network**: Check bundle sizes and request timing
- **Performance**: Profile animations and scroll performance

### Next.js Debug Output
```bash
npm run dev
# Shows build progress, HMR updates, errors
# Clear terminal: Cmd+K (macOS), Ctrl+L (Linux)
```

### TypeScript Errors
```bash
# Type check without building
npx tsc --noEmit
```

### Performance Profiling
```bash
# Use Chrome DevTools Performance tab during:
npm run start  # Production build
# Then load app in browser and record
```

## Testing

### Manual Testing Checklist
- [ ] All pages load without errors
- [ ] Dark/light mode toggle works
- [ ] Animations are smooth (60 FPS)
- [ ] Mobile responsive at breakpoints (375px, 768px, 1024px)
- [ ] Keyboard navigation works (Tab through interactive elements)
- [ ] Links open in correct target (external links open in new tab)
- [ ] Social links are correct
- [ ] Performance is good (<1s first paint)

### Automated Testing (Future)
```bash
# After setting up Jest/Vitest:
npm test
npm test -- --watch
npm test -- --coverage
```

## Common Tasks

### Add a New Component

1. Create file in `components/ui/` or appropriate section
2. Export as named export (not default)
3. Add TypeScript interface for props
4. Use Tailwind for styling
5. Mark as `"use client"` if interactive

Example:

```typescript
// components/ui/new-component.tsx
"use client";

interface NewComponentProps {
  label: string;
  className?: string;
}

export function NewComponent({ label, className = "" }: NewComponentProps) {
  return (
    <div className={`p-4 rounded-lg bg-bg-secondary ${className}`}>
      {label}
    </div>
  );
}
```

### Modify Portfolio Content

Edit `lib/data.ts` to update:
- Hero introduction text
- Social links
- Projects
- Experience/education
- Skills

Example:

```typescript
export const heroData: HeroData = {
  name: "Jarod",
  title: "Your Title Here",
  description: "Your description",
  social: {
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourusername",
  }
};
```

### Add a New Section

1. Create section component in `components/sections/`
2. Import in `app/page.tsx`
3. Wrap in `FadeInSection` for animation
4. Use `dynamic()` import for below-the-fold sections

```typescript
// app/page.tsx
const NewSection = dynamic(
  () => import("@/components/sections/new-section").then(m => ({ default: m.NewSection })),
  { loading: () => <div className="h-32" /> }
);

// In JSX:
<NewSection />
```

### Update Colors

Edit `app/globals.css`:

```css
:root {
  --bg-primary: #ffffff;
  --accent: #3b82f6;
  /* other variables */
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #09090b;
    --accent: #60a5fa;
  }
}
```

## Troubleshooting

### Port 3000 Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process (replace PID with actual number)
kill -9 <PID>

# Restart dev server
npm run dev
```

### Dependencies Won't Install

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### TypeScript Errors

```bash
# Verify TypeScript compilation
npx tsc --noEmit

# Check for build errors
npm run build
```

### Hot Reload Not Working

```bash
# Restart development server
Ctrl+C  # Stop current process
npm run dev  # Start fresh
```

### Build Fails

```bash
# Check for type errors
npx tsc --noEmit

# Build with verbose output
npm run build -- --debug

# Look for missing dependencies
npm ls
```

## Performance Testing

### Lighthouse Audit (Chrome)
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Run audit for Desktop/Mobile
4. Check Core Web Vitals scores

### Vercel Analytics (Deployment)
1. Deploy to Vercel
2. Check Analytics dashboard for real user metrics
3. Monitor LCP, FID, CLS over time

### Local Performance Test
```bash
npm run build  # Production bundle
npm start      # Serve production build
# Open http://localhost:3000
# Use Chrome DevTools Performance tab to record
```

## Version Control

### Commit Message Format
- English language
- Imperative mood: "Add feature" not "Added feature"
- Reference related issues if applicable

Examples:
- `feat: add blog section`
- `fix: correct header alignment on mobile`
- `refactor: simplify theme provider logic`
- `docs: update setup guide`

### Before Committing
1. Run linter: `npm run lint`
2. Build successfully: `npm run build`
3. Test in browser: `npm run dev`
4. Review changes: `git diff`

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Learning
- [Next.js Learn Course](https://nextjs.org/learn)
- [Tailwind CSS Tutorial](https://tailwindcss.com/docs/installation)
- [React Fundamentals](https://react.dev/learn)

### Tools
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - VS Code extension
- [Prettier](https://prettier.io) - Code formatter
- [ESLint](https://eslint.org) - Linter
- [TypeScript Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next) - VS Code

## Next Steps

1. **Read the Architecture docs**: `docs/ARCHITECTURE.md`
2. **Review the refactor plan**: `REFACTOR_PLAN.md`
3. **Start the dev server**: `npm run dev`
4. **Make your first change**: Edit `lib/data.ts` with your info
5. **Explore the codebase**: Start with `app/page.tsx`

## Getting Help

- Check the [README.md](../README.md) for project overview
- Review [REFACTOR_PLAN.md](../REFACTOR_PLAN.md) for refactoring details
- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for design decisions
- Open an issue on GitHub for bugs or feature requests
