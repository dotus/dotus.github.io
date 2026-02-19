# Caybles - Project Documentation

## Project Overview

Caybles is an AI-native Public Relations platform featuring a marketing landing page and an internal PR Dashboard tool called "Quests". The platform helps PR teams manage campaigns from draft to publication with integrated workflow management, document collaboration, and media outreach tracking.

**Key URLs:**
- Landing Page: `/`
- PR Dashboard: `/pr/*`
- Newsroom: `/pr/newsroom`

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
- **Charts:** Recharts 3.6.0
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
│   │   ├── ContactModal.tsx   # Contact form modal (Formspree integration)
│   │   ├── Dither.tsx         # Dither pattern effect
│   │   ├── PerspectiveCard.tsx# 3D perspective card
│   │   ├── Stats.tsx          # Statistics/services display
│   │   └── Stripes.tsx        # Stripe pattern
│   ├── pr/                    # PR Dashboard components
│   │   ├── PRDashboard.tsx    # Main dashboard layout with Quests/Distributions/Network navigation
│   │   ├── DistributionsPage.tsx # Full distributions management page with campaigns list and detail view
│   │   ├── StatsOverview.tsx  # Weekly social reach stats
│   │   ├── KanbanBoard.tsx    # Kanban board with expandable columns
│   │   ├── ExpandedQuestView.tsx # Filtered quest list with search
│   │   ├── QuestDetailView.tsx   # Detailed quest view with tabs
│   │   ├── ProductCreator.tsx    # 4-step wizard for creating content
│   │   ├── ProductEditor.tsx     # Rich text editor with AI assistant
│   │   ├── ProductSection.tsx    # Product list within Quest detail
│   │   ├── ActiveDistributions.tsx # Active outreach campaigns overview
│   │   ├── RecentActivity.tsx # Activity feed
│   │   ├── CalendarWidget.tsx # Calendar/deadlines widget
│   │   ├── DocumentList.tsx   # Document list view
│   │   ├── CollaborativeEditor.tsx # Document editor
│   │   ├── PitchGenerator.tsx # AI pitch generation tool
│   │   ├── MediaDatabase.tsx  # Media contacts database (part of Network section)
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
A "Quest" is the core unit of work in the Caybles platform. It represents a PR campaign, press release, blog post, or strategy memo going through the workflow from draft to publication.

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
| `/pr/*` | `PRDashboard` | PR dashboard with three main sections: Quests, Distributions, Network |
| `/pr/newsroom` | `Newsroom` | Standalone newsroom page |

**Navigation Structure:**
- **Quests** (formerly Workspace): Main kanban board and quest management
- **Distributions**: Active outreach campaigns across all quests (aggregate view)
- **Network**: Journalist database, media contacts, and relationship management

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
├── Title + Synopsis (inline editable)
├── Meta: Author, Role, Updated
├── Working Docs section (3-column grid)
│   ├── Platform documents (doc/sheet/slide) - no status badges
│   └── New Doc button
├── Product Section
│   └── List of created content products
├── Tabs:
│   ├── Overview - Comments
│   ├── Timeline - Key dates/events (editable)
│   ├── Distribution - Email DL
│   ├── Documents - Working Docs + Attached Files
│   └── History - Version timeline
```

**4. Product Creator**
```
ProductCreator (4-step wizard)
├── Step 1: Content Type (X, LinkedIn, Instagram, Press Release, etc.)
├── Step 2: Source Documents selection
├── Step 3: AI Options (toggle, word count, instructions)
├── Step 4: Review & Create
└── Generation animation (reading → analyzing → generating → complete)
```

**5. Product Editor**
```
ProductEditor (content editing workspace)
├── Header with merged toolbar (formatting + title + actions)
├── Left: Platform-specific preview editor
│   ├── Instagram: Full preview with drag-drop image upload
│   ├── X (Twitter): Compose interface with image upload
│   ├── LinkedIn: Post preview with image upload
│   └── Standard: Rich text editor
└── Right: Editor sidebar
    ├── Quest docs reference (@ mentions)
    ├── AI conversation (Also)
    ├── Quick actions
    └── Chat input
```

### Sidebar Widgets
- **ActiveDistributions** - Overview of active outreach campaigns across quests with status and engagement metrics
- **Tracker** - Calendar with deadlines/embargoes
- **RecentActivity** - Team activity feed

---

## Component Reference

### SocialReachStats (formerly StatsOverview)
Weekly social media reach statistics.
- Shows: Impressions, Engagements, Shares, New Followers
- Each stat shows value and week-over-week change
- Teal icon styling
- No click interaction - display only

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
- **Documents**: Working Docs (grid) + Attached Files (list)
- **History**: Version timeline

**Working Docs Section:**
- 3-column grid of platform documents
- Doc/Sheet/Slide cards (no status badges)
- Click to open editor
- New Doc button

**Product Section:**
- Lists created content products
- Click to open ProductEditor
- Create new content button

### ProductCreator
4-step wizard with unified teal color scheme.
- **Header Steps:** Teal active states (teal-600 bg for current, teal-100 for completed)
- **Step 1 - Content Type:** Selected = teal border/bg, checkmark in teal
- **Step 2 - Source Docs:** Section headers in teal, selected docs = teal-50 bg + teal border
- **Step 3 - AI Options:** 
  - Toggle in teal
  - **Improved Length Target:** +/- buttons, teal word count badge, gradient visual bar with tick marks
- **Step 4 - Review:** Teal section headers, teal icon backgrounds
- **Generation:** Teal loading spinner and progress bar
- Stores products in sessionStorage per quest

### ProductEditor
Rich text editor with platform-specific previews, AI assistance, and HugeIcons.
- **Header**: Merged toolbar (formatting buttons + editable title + actions)
  - Publish button uses Upload01Icon (HugeIcons)
- **Publish Dialog**:
  - Header: Upload01Icon in teal circle
  - Channel icons: TwitterIcon, Linkedin01Icon, InstagramIcon, GlobalIcon, FileAttachmentIcon, Mail01Icon (all HugeIcons)
  - Checkmarks: CheckmarkCircle02Icon (HugeIcons)
  - Loading: Loading03Icon with animate-spin
  - Success: CheckmarkCircle02Icon in emerald circle
- **Platform Previews**:
  - Instagram: InstagramIcon for drag-drop area (HugeIcons)
  - X (Twitter): TwitterIcon for reply settings
  - LinkedIn: Linkedin01Icon
  - Standard: Rich text editor with full formatting
- **Sidebar**:
  - Quest docs reference (click to @ mention in chat)
  - AI conversation with "Also" (serif font)
  - Quick actions (Make it shorter, Expand, More professional, etc.)
  - Chat input with document references
- **Image Upload**: Drag & drop or click to upload, sessionStorage persisted
- **Icons**: Uses mix of HugeIcons (TwitterIcon, Linkedin01Icon, InstagramIcon, GlobalIcon, FileAttachmentIcon, Mail01Icon, Upload01Icon, Loading03Icon, CheckmarkCircle02Icon) and Lucide icons

### DistributionsPage
Full-page distributions management interface (accessed via Distributions tab).
- **List View:**
  - 6-card stats overview (Total, Sent, Scheduled, Draft, Opens, Responses)
  - Search by campaign, subject, or journalist
  - Filter by status (All/Sent/Scheduled/Draft)
  - Campaign cards showing: quest title, type, "Hot" badge (if high priority), status
  - Synopsis preview, journalist count, engagement metrics
  - Deadline info with type (embargo/launch/internal)
- **Detail View:**
  - Quest info card: author, synopsis, tags, deadline
  - "View Quest" button to navigate to quest detail
  - Campaign stats: journalists, opened, responses, pending, open rate
  - Journalists list with status badges (no avatars)
  - Expandable journalist details showing timestamps and email
  - Pitch content preview (if available)
- Integrates with sessionStorage for campaign persistence
- Navigation callback to open quest detail from distribution

### ActiveDistributions
Overview widget showing active outreach campaigns across all quests.
- Lists sent, scheduled, and draft campaigns
- Shows journalist count, opened count, and response count
- Status badges: Sent (teal), Scheduled (amber), Draft (gray)
- Replaces previous QuickActions widget

### MediaDatabase (Network Page)
Condensed journalist network with merged header and expand-on-hover cards.
- **Merged Header Bar:** Single row containing:
  - Title with count ("Network" + "10 journalists")
  - Filter badges integrated inline:
    - All (UserMultipleIcon) - gray when inactive
    - Recommended (StarIcon) - amber accent when active
    - Strong (HeartAddIcon) - rose accent when active  
    - Mentions (Bookmark01Icon) - teal accent when active
  - Compact search bar
  - Filter button with badge count
  - View toggle (LayoutGridIcon / ListViewIcon)
  - Add button
- **Expandable Filter Panel:** Inline outlet/focus/relationship tags
- **Recommended Journalists:** First 5 in list (not scattered)
- **Grid Cards - Expand on Hover:**
  - No avatars
  - Amber tint for recommended (`bg-amber-50/30`)
  - Star icon top-right (subtle)
  - Name → teal on hover
  - Smooth expand: bio, latest article, brand mentions, contact buttons
  - Framer Motion (0.25s ease)
- **List View:** Row layout with hover expand
- **Relationship Labels:** Colored text badges (not dots)
- **Icons:** Search01Icon, FilterHorizontalIcon, UserMultipleIcon, StarIcon, HeartAddIcon, Bookmark01Icon, LayoutGridIcon, ListViewIcon, Mail01Icon, MessageMultiple01Icon, Newspaper, ArrowUpRightIcon

### CalendarWidget (Tracker)
Mini calendar showing deadlines.
- Color-coded dots (Embargo=purple, Deadline=red, Launch=green)
- Date selection shows events
- Upcoming events list

### OutreachSection
Embedded in Quest Detail Distribution tab. Shows outreach campaign status or CTA.
- **Locked state:** Shows warning when quest is not "ready"
- **Ready state:** "Prepare Outreach" CTA button (opens OutreachComposer)
- **Sent state:** Shows campaign stats (open rate, journalist list, response tracking)

### OutreachComposer
Full-page 3-step wizard for creating and sending pitch campaigns.
- **Step 1:** Template selection (Exclusive, Embargo, Follow-up)
- **Step 2:** Compose pitch (editable subject and body with auto-populated quest data)
- **Step 3:** Select journalists
  - Recommended section (top 5 matches for quest type)
  - More Contacts section with search
  - Send button in header
- Campaigns stored in sessionStorage per quest

**Data Model:**
```typescript
interface OutreachCampaign {
    id: string;
    status: 'draft' | 'sent' | 'scheduled';
    sentAt?: string;
    sentBy?: string;
    journalists: JournalistContact[];
    pitchContent: string;
    subject: string;
    openRate?: number;
    responseCount?: number;
}
```

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
- **Primary:** Teal (`bg-teal-600` / `#0D9488`) - Used for buttons, profile icons, active states, primary actions
- **Accent:** Pantone Marigold (`#EBA832`) - Used for recommended items, highlights, selected states in specific contexts

**Usage Guidelines**
- **Primary (Teal):**
  - All primary action buttons (Save, Send, Create, Post, Generate)
  - Profile/avatar icons (all user initials)
  - Active tab backgrounds (Quest Detail, Navigation)
  - Selected states in lists
  - Format toolbar active states
  - Step indicators in wizards
  
- **Accent (Orange/Yellow):**
  - Recommended journalists section header
  - Selected journalist pills
  - Email hover states in Distribution tab
  - Selected tab indicator (Quest Detail Distribution tab)
  - Outreach campaign "Prepare" CTA

**Badges**
- Type badges: Monochrome gray (no color coding)
  - All types: `bg-gray-100 text-gray-700 border-gray-200`
- Priority badges: Red/Amber/Gray based on level
- Status badges: Use semantic colors (emerald for sent, blue for opened, etc.)

---

## Static Assets

Place in `public/` folder - copied to `dist/` during build.

**Images:**
- `logo.png` - Caybles logo
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
3. **Brand:** All references should use "Caybles"
4. **Terminology:** Use "Quests" not "Content" or "Documents"
5. **Git Ignore:** `node_modules`, `dist`, `*.local` ignored
6. **Working Docs:** No status/stages (draft/review/final) - stages are only on Quests
7. **Icons:** Mix of Lucide React and HugeIcons (newer components use HugeIcons)
8. **Session Storage:** Products and images stored per quest ID
9. **Product Types:** x-post, linkedin-post, instagram-post, press-release, blog-post, website-copy, investor-doc
