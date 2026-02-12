# &also - Project Documentation

## Project Overview

&also is an AI-native Public Relations agency platform featuring a marketing landing page and an internal PR Dashboard tool called "Quests". The platform helps PR teams manage campaigns from draft to publication with integrated workflow management, document collaboration, and media outreach tracking.

**Key URLs:**
- Landing Page: `/`
- PR Dashboard: `/pr/*`
- Newsroom: `/pr/newsroom`

**Brand:** &also (pronounced "and also")

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
- **Charts:** Recharts 3.6.0
- **Forms:** Formspree React 3.0.0

### CDN Dependencies (importmap in index.html)
The project uses CDN imports for production dependencies:
- `react` - https://aistudiocdn.com/react@^19.2.0
- `react-dom` - https://aistudiocdn.com/react-dom@^19.2.0
- `lucide-react` - https://aistudiocdn.com/lucide-react@^0.554.0
- `framer-motion` - https://aistudiocdn.com/framer-motion@^12.23.24

### Deployment
- **Hosting:** GitHub Pages
- **Domain:** strifeinfive.com
- **Base URL:** `/` (configured in `vite.config.ts`)

---

## Project Structure

```
strife-relations/
├── components/                 # React components
│   ├── ui/                    # Reusable UI components
│   │   ├── ContactModal.tsx   # Contact form modal (Formspree integration)
│   │   ├── Dither.tsx         # Dither pattern effect
│   │   ├── PerspectiveCard.tsx# 3D perspective card
│   │   ├── Stats.tsx          # Statistics/services display
│   │   └── Stripes.tsx        # Stripe pattern
│   ├── pr/                    # PR Dashboard components
│   │   ├── PRDashboard.tsx    # Main dashboard layout with navigation
│   │   ├── StatsOverview.tsx  # Filterable stats cards (Quest counts)
│   │   ├── KanbanBoard.tsx    # Kanban board with expandable columns
│   │   ├── ExpandedQuestView.tsx # Filtered quest list with search
│   │   ├── QuestDetailView.tsx   # Detailed quest view with tabs
│   │   ├── QuickActions.tsx   # Quick action buttons
│   │   ├── RecentActivity.tsx # Activity feed
│   │   ├── CalendarWidget.tsx # Calendar/deadlines widget
│   │   ├── DocumentList.tsx   # Document list view
│   │   ├── CollaborativeEditor.tsx # Document editor
│   │   ├── PitchGenerator.tsx # AI pitch generation tool
│   │   ├── MediaDatabase.tsx  # Media contacts database
│   │   ├── Analytics.tsx      # Analytics dashboard with charts
│   │   ├── Newsroom.tsx       # Newsroom/press release page
│   │   └── ToneChecker.tsx    # Tone analysis tool
│   ├── ChatDemo.tsx           # AI chat demo component
│   ├── LandingPage.tsx        # Main landing page composition
│   ├── Hero.tsx               # Hero section with animated timeline
│   ├── Navbar.tsx             # Navigation bar
│   ├── Services.tsx           # Services section
│   ├── TechSection.tsx        # Technology showcase
│   ├── Comparison.tsx         # Comparison section
│   ├── JournalistSection.tsx  # Journalist expertise section
│   ├── Footer.tsx             # Footer component
│   └── TrustedBy.tsx          # Trusted by logos
├── public/                    # Static assets
│   ├── logos/                 # Client/partner logos
│   ├── background.png
│   ├── hero-bg.png
│   ├── logo.png
│   ├── presswoman.png
│   ├── CNAME                  # GitHub Pages custom domain
│   ├── robots.txt             # SEO robots file
│   └── sitemap.xml            # SEO sitemap
├── App.tsx                    # Main app component with routes
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

## Core Concepts

### Quests
A "Quest" is the core unit of work in the &also platform. It represents a PR campaign, press release, blog post, or strategy memo going through the workflow from draft to publication.

**Quest Statuses:**
- `draft` - Work in progress
- `review` - Under partner/strategy review
- `ready` - Approved and ready to pitch
- `live` - Published

**Quest Data Model:**
```typescript
interface Quest {
    id: number;
    title: string;
    synopsis: string;           // Brief description
    type: 'Press Release' | 'Blog Post' | 'Strategy Memo';
    status: 'draft' | 'ready' | 'live' | 'review';
    author: string;
    authorRole: string;
    updated: string;
    deadline?: string;
    deadlineType?: 'embargo' | 'internal' | 'launch';
    tags: string[];
    priority?: 'high' | 'medium' | 'low';
    emailDL: string[];          // Distribution list emails
}
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
| `/pr/*` | `PRDashboard` | PR dashboard (Quests workspace) |
| `/pr/newsroom` | `Newsroom` | Standalone newsroom page |

---

## PR Dashboard Architecture

### Main Workspace (`/pr`)
The dashboard has two main view modes:

**1. Kanban View (Default)**
```
StatsOverview (filterable stats)
├── Drafts, In Review, Ready, Published counts
└── Click to filter

KanbanBoard
├── 4 columns: Draft | In Review | Ready | Published
├── Each column: expandable/collapsible
├── Cards show: Type badge, Title, Author, Updated
├── Search bar filters all columns
└── Expand icon opens filtered view
```

**2. Expanded Filtered View**
```
ExpandedQuestView (when stat clicked)
├── Back button (←)
├── Status indicator with count
├── Expandable search bar
└── Full-width quest cards list
```

**3. Quest Detail View**
```
QuestDetailView (when quest clicked)
├── Header: Type badge, Priority, Edit button
├── Title + Synopsis
├── Meta: Author, Role, Updated
├── Working Docs section (3-column grid)
│   ├── Platform documents (doc/sheet/slide)
│   └── New Doc button
├── Tabs:
│   ├── Overview - Comments
│   ├── Timeline - Key dates/events (editable)
│   ├── Distribution - Email DL
│   ├── Documents - Attached files
│   └── History - Version timeline
```

### Sidebar Widgets
- **QuickActions** - Create Quest, Send Pitch, Add Contact
- **Tracker** - Calendar with deadlines/embargoes
- **RecentActivity** - Team activity feed

---

## Component Reference

### StatsOverview
Filterable stat cards showing quest counts by status.
- Click to filter the view
- Active state: black background, white text
- Shows: Icon, Count, Label

### KanbanBoard
4-column kanban with drag-ready cards.
- Expandable columns (Maximize2 icon)
- Collapsible columns (Minimize2 icon)
- Integrated search bar
- Cards show: TypeBadge, Priority dot, Title, Author, Updated

### ExpandedQuestView
Full-width filtered quest list.
- Integrated expandable search
- Back navigation with animation
- Full-width cards with Email DL preview

### QuestDetailView
Comprehensive quest detail page.
**Tabs:**
- **Overview**: Comments with add functionality
- **Timeline**: Editable key dates (title, date, time, note)
- **Distribution**: Email list with copy buttons
- **Documents**: Attached files with download
- **History**: Version timeline

**Working Docs Section:**
- 3-column grid of platform documents
- Doc/Sheet/Slide cards with status
- Click to open editor
- New Doc button

### CalendarWidget (Tracker)
Mini calendar showing deadlines.
- Color-coded dots (Embargo=purple, Deadline=red, Launch=green)
- Date selection shows events
- Upcoming events list

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
- Accent: Black with varying opacity

**Badges**
- Type badges: Colored backgrounds with borders
  - Press Release: Blue
  - Blog Post: Emerald
  - Strategy Memo: Violet
- Priority badges: Red/Amber/Gray based on level

---

## Static Assets

Place in `public/` folder - copied to `dist/` during build.

**Images:**
- `logo.png` - &also logo
- `hero-bg.png` - Hero background
- `background.png` - General background
- `presswoman.png` - Journalist section

---

## Testing

No automated test suite is currently configured. Manual testing workflow:

1. Run `npm run dev` for local development
2. Test all routes: `/`, `/pr`, `/pr/newsroom`
3. Test PR Dashboard:
   - Click stats to filter
   - Expand/collapse kanban columns
   - Click quest to open detail view
   - Edit timeline events
   - Copy emails from distribution list
4. Verify responsive design
5. Test search functionality

---

## Deployment

### GitHub Pages
1. Build: `npm run build`
2. Deploy: `npm run deploy`

---

## Dependencies to Note

### Production
- `@formspree/react` - Contact form handling
- `framer-motion` - Animations (page transitions, card expands)
- `lucide-react` - Icons
- `react-router-dom` - Routing
- `recharts` - Analytics charts

### Development
- `@vitejs/plugin-react` - React HMR
- `gh-pages` - Deployment
- `typescript` - Type checking
- `vite` - Build tool

---

## Important Notes

1. **CDN Dependencies:** Loaded from CDN in `index.html`
2. **Path Aliases:** `@/` points to project root
3. **Brand:** All references should use "&also" not "Strife Relations"
4. **Terminology:** Use "Quests" not "Content" or "Documents"
5. **Git Ignore:** `node_modules`, `dist`, `*.local` ignored
