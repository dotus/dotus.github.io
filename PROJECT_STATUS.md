# Caybles Landing Page — Project Status

> Last updated: 2026-02-19
> Current commit: `7facea8`

---

## ✅ Completed

### Brand & Identity
- **Full rebrand** from Strife Relations → Caybles
- **Tagline**: "Your story, told."
- **Logo**: Using CayblesLogo component throughout (navbar, footer, hero cards)
- **Positioning**: Product-led (SaaS PR workspace), not agency-led

### Hero Section
- Large serif headline "Your story, told." with gradient text effect
- Floating product preview cards on sides:
  - **Right card**: Kanban board with columns (Draft, In Review, Ready)
  - **Left card**: Timeline with events (Embargo Lift, Partner Review, etc.)
- Animated wave filter on background image
- Gradient orbs for depth (teal + purple)
- "Coming Soon" badge with pulse animation
- Scrolling "Trusted By" logos (CNBC, TechCrunch, WIRED, The Verge)
- Location badges: London, Hong Kong

### Product Tour Sections (6 total)
All with alternating backgrounds (no more solid black):

| # | Section | Background | Content |
|---|---------|------------|---------|
| 01 | Every announcement is a quest | Cream `#FAF9F6` | Kanban board demo |
| 02 | Create quests in seconds | Dark gradient | Quest creator form |
| 03 | Everything in one place | White + pattern | Quest detail with highlighted timeline |
| 04 | Craft your story | Dark + teal glow | Product editor with AI chat |
| 05 | Reach the right journalists | Warm beige | Distribution tracking |
| 06 | Never miss a deadline | Dark purple tint | Calendar with events |

### Typography System
- **Headlines**: Serif font ("Instrument Serif") — large, bold, tracking-tighter
- **Body/Descriptions**: Sans-serif, `text-xl md:text-2xl` for section descriptions
- **Demo components**: All sans-serif (matches original `/pr` interface)
- **UI elements**: Sans-serif throughout

### Interactive Components
All demo components styled to match real `/pr` interface:
- Quests Kanban with cards, badges, avatars
- Quest Creator with tabs, form fields, priority badges
- Quest Detail with timeline highlight, distribution status
- Product Editor with AI chat sidebar, formatting toolbar
- Distributions with status badges, open/response counts
- Calendar with day grid, event cards

### Supporting Sections
- **Hybrid Approach**: AI + Human workflow explanation
- **Pricing**: 3 tiers (Starter/Free, Professional/$99, Concierge/Custom)
- **"We Wrote the Headlines"**: Press badge visual, journalist credibility
- **Final CTA**: "Ready to tell your story?" with glow effect
- **Footer**: Caybles logo, copyright, locations

### Technical
- Formspree integration for waitlist (form ID: `xeeoyadw`)
- Waitlist modal with name, email, company fields
- Smooth scroll animations with Framer Motion
- Responsive design (mobile-friendly)
- Vite + React + TypeScript stack maintained

---

## ❓ TBD / Needs Clarification

### 1. Visual Assets
- **Hero background**: Currently using `hero-bg.png` with wave filter
  - *Question*: Keep this or replace with different imagery?
- **Press badge image**: Using placeholder with Caybles logo
  - *Question*: Need actual press badge design/asset?
- **Product screenshots**: Currently using interactive demos
  - *Question*: Want real screenshots from `/pr` instead of mock demos?

### 2. Copy & Content
- **Demo data**: Using placeholder content ("Series B Funding", etc.)
  - *Question*: Keep generic or use real examples?
- **Feature descriptions**: Current descriptions are product-focused
  - *Question*: Any specific messaging or benefits to emphasize?
- **Pricing details**: Currently "Custom" for Concierge tier
  - *Question*: Actual pricing or starting price to show?

### 3. Interactions & Animations
- **Hero cards**: Currently static floating cards
  - *Question*: Want them to animate/rotate on scroll?
- **Section transitions**: Basic fade/scroll animations now
  - *Question*: More elaborate transitions (parallax, stagger, etc.)?
- **Demo components**: Static mockups
  - *Question*: Make them interactive (clickable, hover states)?

### 4. Functionality
- **Waitlist**: Formspree form submits to your account
  - *Question*: Where should submissions go? (Email notification, Slack, CRM?)
- **Navigation**: Smooth scroll to sections
  - *Question*: Add section anchor links in navbar dropdown?
- **Mobile**: Responsive layout works
  - *Question*: Mobile-specific interactions (swipe, bottom sheet, etc.)?

### 5. Integration with `/pr` Dashboard
- **Current**: Landing page and `/pr` are separate
  - *Question*: Should clicking "Join Waitlist" also create a demo account?
  - *Question*: Link from landing page to `/pr` for full demo?

### 6. SEO & Meta
- **Page title**: Currently generic
  - *Question*: Specific title/description for SEO?
- **Social preview**: OG image, Twitter card
  - *Question*: Design social preview image?
- **Favicon**: Using default
  - *Question*: Caybles-specific favicon?

### 7. Post-Launch
- **Analytics**: Google Analytics, Mixpanel, etc.?
- **A/B testing**: Different headlines, CTAs to test?
- **Blog/Content**: Content marketing strategy?

---

## Design Decisions Made

### Color Palette (per section)
- Light sections: Cream `#FAF9F6`, White, Warm beige
- Dark sections: `#0a0a0a`, Dark gradients, Purple/Teal tints
- Accents: Teal `#0D9488` (primary), Amber (priority), Violet (embargo), Green (success)

### Spacing
- Section padding: `py-32` (8rem) consistently
- Container max-width: `max-w-7xl` for content, `max-w-6xl` for pricing
- Grid gaps: `gap-20` for two-column layouts

### Shadows & Depth
- Demo cards: `shadow-2xl shadow-black/20` (subtle dark shadow)
- Hover states: `hover:shadow-lg` transitions
- Glow effects: `shadow-[0_0_60px_rgba(255,255,255,0.3)]` for CTAs

### Borders
- Light sections: `border-gray-200` for cards
- Dark sections: `border-white/10` for subtle definition

---

## Files Modified

```
components/LandingPage.tsx          # Complete rewrite — main landing page
components/ui/CayblesLogo.tsx       # Using existing component
STRIFE_STYLEGUIDE.md                # Documentation (can remove)
```

---

## Next Steps (Suggested Priority)

1. **Review current implementation** — Screenshot feedback, approve/revise
2. **Finalize visual assets** — Hero image, press badge, any screenshots
3. **Confirm copy** — Section descriptions, pricing, CTA text
4. **Add analytics** — Formspree confirmation, GA/Mixpanel
5. **Mobile polish** — Test on actual devices, refine touch targets
6. **SEO meta tags** — Title, description, OG image
7. **Deploy** — Push to GitHub Pages, test live

---

## Open Questions for Pier

1. **Hero background**: Keep current flower field + wave filter, or different imagery?
2. **Demo content**: Keep generic examples or use specific real-world scenarios?
3. **Waitlist destination**: Where do submissions go? (Email, Slack, Airtable?)
4. **Interactive demos**: Make them clickable/animated, or keep as static previews?
5. **Press badge**: Use current placeholder or design actual press pass visual?
6. **Pricing**: Keep "$99/month" placeholder or actual pricing?
7. **Social proof**: Add testimonials, customer logos, or case studies?

---

*Document maintained by Dimi. Update as decisions are made.*
