# Strife Relations — Site Documentation

> Last updated: 2026-02-19
> Local dev: http://localhost:3000/

---

## Brand Identity

- **Name:** Strife Relations
- **Tagline:** "The fractional storytelling partner"
- **Positioning:** AI-assisted public relations for tech, environment, and funding founders
- **Locations:** Hong Kong, London
- **Year:** © 2026

---

## Visual Style

### Color Palette (Observed)
- **Primary background:** Dark/black (likely `#0a0a0a` or similar)
- **Text:** Light/white
- **Accent:** Subtle grays for secondary elements
- **CTA buttons:** Light with dark text (inverted)

### Typography
- Clean, modern sans-serif
- Large display headings with tight letter-spacing
- Hierarchical: Massive H1 → Section H2s → Card H3s

### Visual Elements
- **Hero image:** Field of flowers (atmospheric, soft)
- **The Creation of Adam:** Cinematic interpretation used in "Your mission matters" section
- **Press badge:** Vintage/newsroom aesthetic for credibility section
- **Mock UI elements:** Slack-style chat interfaces showing the bot workflow

### Motion
- Framer Motion for animations
- Likely scroll-triggered reveals and hover interactions

---

## Site Structure

### 1. Hero Section
- Headline: "The fractional storytelling partner"
- Subhead: "AI-assisted public relations, made by journalists for founders in tech, environment and funding"
- CTA: "Be our pilot now"
- Locations: Hong Kong | London
- Visual: Mock Slack interface showing "Workflow Step 2/7 Approval" with bot interaction

### 2. Trusted By (Marquee)
- Logos: CNBC, Delivery Hero, HSBC, HKSTP
- Horizontal scroll animation likely

### 3. What We Do (4 cards, expandable)
1. **Media Relations** — "Securing impactful coverage in top-tier media"
2. **Brand Narrative** — "Crafting stories that define your identity"
3. **Multilingual** — "Reaching global audiences in English, 中文 and more"
4. **Strategic Communication** — "Aligning your message with business goals"

### 4. Mission Statement
- Headline: "Your mission matters."
- Subtext: "We're here to amplify it."
- Body: Mission-driven founders in policy, environment, funding, tech
- Visual: The Creation of Adam artwork

### 5. Humanoid Approach
- Headline: "A humanoid approach"
- Body: AI bots integrate into workflow, always rewritten by human experts

**Two feature cards:**
- **Your Company's Context** — Bots live in chats, understand product deeply
  - Mock chat: Bot asks about Q3 metrics → Response shows ARR +40%, 110% retention
- **We do the work ourselves** — Editor reviews every output
  - Mock text editor showing human correction to avoid SEC scrutiny

### 6. Pricing Comparison
- **Left:** Legacy Agency breakdown ($25,000/mo)
  - Account Manager, Junior Associate, Strategy Retainer, Overhead, "Relationship Building"
- **Right:** The Strife Model — "Pay for output, not overhead"

**Three value props:**
- Zero Bloat — bill for outputs, not hours
- AI Efficiency — automation savings passed to client
- Your budget — scalable up/down

### 7. Credibility — "WE WROTE THE HEADLINES"
- Pitch: Former journalists who were deleting bad pitches
- Visual: Press badge, STRIFE logos

### 8. Footer CTA
- Headline: "Ready to scale?"
- CTA: "Apply for Partnership"
- Tagline: "The VCs of storytelling."
- Locations: LONDON, HONG KONG

---

## Technical Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 6
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Forms:** Formspree React
- **Deploy:** GitHub Pages (`gh-pages`)

### File Structure
```
├── App.tsx           # Main app component
├── index.tsx         # Entry point
├── index.html        # HTML template
├── types.ts          # TypeScript types
├── vite.config.ts    # Vite configuration
├── components/       # React components
├── public/           # Static assets
└── metadata.json     # Site metadata
```

---

## Key Copy Snippets

**Hero:**
> "AI-assisted public relations, made by journalists for founders in tech, environment and funding"

**Humanoid Approach:**
> "Our AI bots integrate into your team's workflow to ask questions, gather context, and draft your story, which is always rewritten by a human expert."

**Credibility:**
> "We aren't guessing what newsrooms want. We know. Because for years, we were the ones deleting bad pitches and publishing the good ones."

**Footer:**
> "The VCs of storytelling."

---

## Notes for Updates

- Maintain the dark, premium aesthetic
- Keep the Slack/chat UI mocks — they're core to the "humanoid" narrative
- The pricing comparison is a strong differentiator — preserve visual hierarchy
- "WE WROTE THE HEADLINES" is all-caps for emphasis — intentional
- Footer location is uppercase "LONDON, HONG KONG" — intentional styling

---
