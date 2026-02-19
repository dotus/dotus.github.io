# Caybles - Project Documentation

## Project Overview

Caybles is an AI-native Public Relations platform featuring a marketing landing page. The site showcases the product's features and drives waitlist signups.

**Key URLs:**
- Landing Page: `/`

**Brand:** Caybles

---

## Technology Stack

### Frontend
- **Framework:** React 19.2.0
- **Language:** TypeScript 5.8.2
- **Build Tool:** Vite 6.2.0
- **Styling:** Tailwind CSS (via CDN)
- **Routing:** React Router DOM 7.12.0
- **Animation:** Framer Motion 12.23.24
- **Icons:** Lucide React 0.554.0
- **Forms:** Formspree React 3.0.0

### CDN Dependencies (importmap in index.html)
The project uses CDN imports for production dependencies:
- `react` - https://aistudiocdn.com/react@^19.2.0
- `react-dom` - https://aistudiocdn.com/react-dom@^19.2.0
- `lucide-react` - https://aistudiocdn.com/lucide-react@^0.554.0
- `framer-motion` - https://aistudiocdn.com/framer-motion@^12.23.24

### Additional Dependencies
- `@hugeicons/react` - HugeIcons icon wrapper (HugeiconsIcon component)
- `@hugeicons/core-free-icons` - HugeIcons free icon set

**Icon Usage:**
- Use `HugeiconsIcon` wrapper component for all HugeIcons icons
- Example: `<HugeiconsIcon icon={ArrowLeft01Icon} size={20} />`
- Do NOT use icons directly as JSX components (they are data objects, not React components)
- Mix of Lucide React (older components) and HugeIcons (newer components)

### Deployment
- **Hosting:** GitHub Pages
- **Domain:** caybles.com
- **Base URL:** `/` (configured in `vite.config.ts`)

---

## Project Structure

```
caybles/
├── components/                 # React components
│   ├── ui/                    # Reusable UI components
│   │   ├── CayblesLogo.tsx    # Logo component with animated icon
│   │   ├── ContactModal.tsx   # Contact form modal (Formspree integration)
│   │   ├── Dither.tsx         # Dither pattern effect
│   │   ├── PerspectiveCard.tsx# 3D perspective card
│   │   ├── Stats.tsx          # Statistics/services display
│   │   └── Stripes.tsx        # Stripe pattern
│   ├── landing/               # Landing page specific components
│   │   ├── CalendarDemo.tsx   # Calendar feature demo
│   │   ├── DistributionsDemo.tsx # Media outreach demo
│   │   ├── PricingCard.tsx    # Pricing tier cards
│   │   ├── ProductEditorDemo.tsx # Editor feature demo
│   │   ├── QuestCreatorDemo.tsx  # Quest creation demo
│   │   ├── QuestDetailDemo.tsx   # Quest detail demo
│   │   ├── QuestsDemo.tsx     # Kanban board demo
│   │   ├── TrustedByLogos.tsx # Client logos section
│   │   └── WaitlistModal.tsx  # Waitlist signup modal
│   ├── ChatDemo.tsx           # AI chat demo component
│   ├── Comparison.tsx         # Comparison section
│   ├── Footer.tsx             # Footer component
│   ├── Hero.tsx               # Hero section with animated timeline
│   ├── JournalistSection.tsx  # Journalist expertise section
│   ├── LandingPage.tsx        # Main landing page composition
│   ├── Navbar.tsx             # Navigation bar
│   ├── Services.tsx           # Services section
│   ├── TechSection.tsx        # Technology showcase
│   └── TrustedBy.tsx          # Trusted by logos
├── public/                    # Static assets
│   ├── logos/                 # Client/partner logos
│   ├── background.png
│   ├── favicon.svg            # Caybles favicon
│   ├── hero-bg.png            # Hero background
│   ├── logo.png               # Caybles logo
│   ├── presswoman.png         # Journalist section image
│   ├── CNAME                  # GitHub Pages custom domain
│   ├── robots.txt             # SEO robots file
│   └── sitemap.xml            # SEO sitemap
├── App.tsx                    # Main app component
├── index.tsx                  # React entry point
├── types.ts                   # TypeScript type definitions
├── index.html                 # HTML template with Tailwind config
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Node dependencies
├── metadata.json              # Site metadata
├── .env.local                 # Environment variables (not committed)
└── .gitignore                 # Git ignore patterns
```

---

## Build and Development Commands

```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

**Development Server:**
- URL: `http://localhost:3000`
- Host: `0.0.0.0` (accessible from network)

---

## Environment Variables

Create `.env.local` in project root:

```
GEMINI_API_KEY=your_api_key_here
```

The Vite config exposes these to the client via:
- `process.env.API_KEY`
- `process.env.GEMINI_API_KEY`

---

## Routing Structure

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `LandingPage` | Marketing homepage |

---

## Landing Page Sections

1. **Hero** - Main hero with headline, CTA buttons, and floating UI demo cards
2. **TrustedBy** - Logo carousel of trusted companies
3. **Feature Sections** (zigzag layout):
   - "Yes, one size fits all" - Kanban demo
   - "Everything for your campaign" - Quest creator demo
   - "Craft your story" - Editor demo
   - "Reach the right journalists" - Distributions demo
   - "Never miss a deadline" - Calendar demo
4. **Comparison** - Traditional PR vs Caybles comparison
5. **Pricing** - Three-tier pricing (Free, Scale, Enterprise)
6. **Waitlist CTA** - Final call-to-action with waitlist modal
7. **Footer** - Links and copyright

---

## Code Style Guidelines

### TypeScript/React
- Use functional components with explicit return types
- Props interfaces named with component name + "Props"
- Use React hooks (useState, useEffect, useRef)

Example:
```typescript
import React, { useState } from 'react';
import { SomeIcon } from 'lucide-react';

interface ComponentProps {
  label: string;
  onAction: () => void;
}

export const Component: React.FC<ComponentProps> = ({ label, onAction }) => {
  const [state, setState] = useState(false);
  
  return (
    <div className="p-4 bg-white rounded-lg">
      <SomeIcon className="w-5 h-5" />
    </div>
  );
};
```

### Styling Conventions

**Fonts**
- **Headings:** Stack Sans Headline / Space Grotesk (sans-serif)
- **Body:** Instrument Serif (serif)

**Color Scheme**
- Background: `#FAF9F6` (off-white)
- Text: `#0a0a0a` (near-black)
- **Primary:** Teal (`bg-teal-600` / `#0D9488`) - Used for buttons, active states, primary actions
- **Accent:** Pantone Marigold (`#EBA832`) - Used for highlights, selected states

**Usage Guidelines**
- **Primary (Teal):**
  - All primary action buttons (Save, Send, Create, Post, Generate)
  - Active tab backgrounds
  - Selected states in lists
  - Step indicators in wizards
  
- **Accent (Orange/Yellow):**
  - Highlights and selected states
  - CTA emphasis

---

## Static Assets

Place in `public/` folder - copied to `dist/` during build.

**Images:**
- `logo.png` - Caybles logo
- `favicon.svg` - Caybles favicon (colored pinwheel)
- `hero-bg.png` - Hero background
- `background.png` - General background
- `presswoman.png` - Journalist section

---

## Testing

No automated test suite is currently configured. Manual testing workflow:

1. Run `npm run dev` for local development
2. Test landing page at `/`
3. Verify responsive design (mobile, tablet, desktop)
4. Test waitlist modal functionality
5. Check all animations work correctly

---

## Deployment

### GitHub Pages
1. Build: `npm run build`
2. Deploy: `npm run deploy`

---

## Dependencies to Note

### Production
- `@formspree/react` - Contact form handling
- `framer-motion` - Animations
- `lucide-react` - Icons
- `react-router-dom` - Routing

### Development
- `@vitejs/plugin-react` - React HMR
- `gh-pages` - Deployment
- `typescript` - Type checking
- `vite` - Build tool

---

## Important Notes

1. **CDN Dependencies:** Loaded from CDN in `index.html`
2. **Path Aliases:** `@/` points to project root
3. **Brand:** All references should use "Caybles"
4. **Git Ignore:** `node_modules`, `dist`, `*.local` ignored
5. **Icons:** Mix of Lucide React and HugeIcons
6. **Main Branch:** Landing page only (no /pr routes)
