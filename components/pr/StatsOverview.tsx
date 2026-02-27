import React from 'react';
import { Eye, Heart, Share2, Users, Mail } from 'lucide-react';
import type { BlogPost } from '../../types';

export type { BlogPost };

// Types
export type FilterType = 'all' | 'draft' | 'ready' | 'live' | 'review';

export interface OutreachCampaign {
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

export interface JournalistContact {
    id: number;
    name: string;
    outlet: string;
    email: string;
    focus: string;
    status: 'pending' | 'opened' | 'responded' | 'bounced';
    openedAt?: string;
    respondedAt?: string;
    category?: 'journalist' | 'influencer';
}

export interface Quest {
    id: number;
    title: string;
    synopsis: string;
    type: 'Press Release' | 'Blog Post' | 'Strategy Memo';
    status: 'draft' | 'ready' | 'live' | 'review';
    author: string;
    authorRole: string;
    updated: string;
    deadline?: string;
    deadlineType?: 'embargo' | 'internal' | 'launch';
    tags: string[];
    priority?: 'high' | 'medium' | 'low';
    emailDL: string[];
    uniqueEmail: string;
    outreachCampaign?: OutreachCampaign;
}

export type DocItem = Quest;

// Helper functions
export const getOutreachStorageKey = (questId: number) => `quest_outreach_${questId}`;

export const MOCK_JOURNALISTS: JournalistContact[] = [
    { id: 1, name: 'Mike Butcher', outlet: 'TechCrunch', email: 'mike@techcrunch.com', focus: 'Startups, Europe', status: 'opened', openedAt: '2h ago', category: 'journalist' },
    { id: 2, name: 'Alex Konrad', outlet: 'Forbes', email: 'alex.konrad@forbes.com', focus: 'VC, Cloud', status: 'responded', respondedAt: '1h ago', category: 'journalist' },
    { id: 3, name: 'Casey Newton', outlet: 'Platformer', email: 'casey@platformer.news', focus: 'Social Media, Democracy', status: 'pending', category: 'journalist' },
    { id: 4, name: 'Kara Swisher', outlet: 'Pivot / NYMag', email: 'kara@nymag.com', focus: 'Tech, Business', status: 'pending', category: 'journalist' },
    { id: 5, name: 'Ryan Lawler', outlet: 'TechCrunch', email: 'ryan@techcrunch.com', focus: 'AI, Enterprise', status: 'pending', category: 'journalist' },
    { id: 6, name: 'Ingrid Lunden', outlet: 'TechCrunch', email: 'ingrid@techcrunch.com', focus: 'Funding, Europe', status: 'pending', category: 'journalist' },
    { id: 7, name: 'Natasha Mascarenhas', outlet: 'TechCrunch', email: 'natasha@techcrunch.com', focus: 'Startups, VC', status: 'pending', category: 'journalist' },
    { id: 8, name: 'Amanda Silberling', outlet: 'TechCrunch', email: 'amanda@techcrunch.com', focus: 'Creator Economy', status: 'pending', category: 'journalist' },
    { id: 9, name: 'Marques Brownlee', outlet: 'YouTube', email: 'mkbhd@gmail.com', focus: 'Tech Hardware, AI', status: 'pending', category: 'influencer' },
    { id: 10, name: 'Justine Ezarik', outlet: 'iJustine / YouTube', email: 'ijustine@gmail.com', focus: 'Consumer Tech', status: 'pending', category: 'influencer' },
    { id: 11, name: 'Linus Sebastian', outlet: 'LTT / YouTube', email: 'linus@linusmediagroup.com', focus: 'PC Hardware', status: 'pending', category: 'influencer' },
    { id: 12, name: 'MrWhoseTheBoss', outlet: 'YouTube', email: 'mrwhosetheboss@gmail.com', focus: 'Smartphones', status: 'pending', category: 'influencer' },
    { id: 13, name: 'Cleo Abram', outlet: 'YouTube / Instagram', email: 'cleo@cleoabram.com', focus: 'Tech Explainers', status: 'pending', category: 'influencer' },
    { id: 14, name: 'Taylor Hatmaker', outlet: 'TechCrunch', email: 'taylor@techcrunch.com', focus: 'AI, Policy', status: 'pending', category: 'journalist' },
    { id: 15, name: 'Aisha Malik', outlet: 'TechCrunch', email: 'aisha@techcrunch.com', focus: 'Apps, Consumer', status: 'pending', category: 'journalist' },
    { id: 16, name: 'Kyle Wiggers', outlet: 'TechCrunch', email: 'kyle@techcrunch.com', focus: 'AI, Robotics', status: 'pending', category: 'journalist' },
];

export const getRecommendedJournalists = (quest: Quest): JournalistContact[] => {
    const fundingKeywords = ['funding', 'series', 'investment', 'vc', 'capital'];
    const logisticsKeywords = ['logistics', 'shipping', 'cross-border', 'supply chain', 'fulfillment'];
    const ecommerceKeywords = ['e-commerce', 'ecommerce', 'retail', 'shopping', 'marketplace', 'consumer'];

    const questText = (quest.title + ' ' + quest.synopsis + ' ' + quest.tags.join(' ')).toLowerCase();

    const isFunding = fundingKeywords.some(k => questText.includes(k));
    const isLogistics = logisticsKeywords.some(k => questText.includes(k));
    const isEcommerce = ecommerceKeywords.some(k => questText.includes(k));

    const scored = MOCK_JOURNALISTS.map(j => {
        let score = 0;
        const focus = j.focus.toLowerCase();

        if (isFunding && (focus.includes('vc') || focus.includes('funding') || focus.includes('startups') || focus.includes('business'))) score += 3;
        if (isLogistics && (focus.includes('enterprise') || focus.includes('tech') || focus.includes('business'))) score += 3;
        if (isEcommerce && (focus.includes('consumer') || focus.includes('startups') || focus.includes('business'))) score += 2;
        if (j.outlet === 'TechCrunch' || j.outlet === 'Forbes') score += 1;
        
        // Give influencers a boost for ecommerce/tech quests
        if (j.category === 'influencer') {
            if (isEcommerce || isLogistics) score += 2;
            if (j.name === 'Cleo Abram' || j.name === 'Justine Ezarik') score += 1; // Top tier default
        }

        return { ...j, score };
    });

    return scored
        .sort((a, b) => (b.score || 0) - (a.score || 0));
};

// =============================================================================
// CLIENT CONFIG - Single Source of Truth for Demo Data
// Modify this section to tailor the demo to your client
// =============================================================================

export const CLIENT_CONFIG = {
    // Company Identity
    companyName: 'Buy&Ship',
    domain: 'buyandship.today',
    prDomain: 'pr.buyandship.today',  // For quest unique emails
    
    // Logo paths (place in /public/logos/)
    logos: {
        full: '/logos/client_logo.png',      // Full logo
        square: '/logos/client_logo_square.png',  // Square logo for social avatars
        icon: '/logos/client_logo_icon.png',      // Icon only
    },
    
    // Social Media Handles
    social: {
        x: 'buyandship_hk',
        twitter: 'buyandship_hk',
        linkedin: 'company/buyandship',
        instagram: 'buyandship.goodies',
    },
    
    // Brand Colors (for UI accents)
    colors: {
        primary: '#F27927',      // Orange
        accent: '#0054A6',       // Blue
    },
    
    // Quick Links
    links: {
        website: 'buyandship.today',
        pressKit: 'buyandship.today/press',
        brandGuidelines: 'buyandship.today/brand',
        mediaInquiries: 'press@buyandship.today',
    },
};

// Helper to generate quest email
export const getQuestEmail = (questTitle: string) => {
    const sanitized = questTitle.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .substring(0, 30);
    return `${sanitized}@${CLIENT_CONFIG.prDomain}`;
};

// Spokespersons / Key Personnel (used across the app)
export const CLIENT_PERSONNEL = [
    { id: 1, name: 'Sheldon Li', role: 'Co-founder', bio: 'Driving the vision of global cross-border e-commerce and logistics.', initials: 'SL', email: 'sheldon.li@buyandship.today' },
    { id: 2, name: 'Hang Poon', role: 'Executive', bio: 'Leading operations and strategic growth across the Asia-Pacific region.', initials: 'HP', email: 'hang.poon@buyandship.today' },
    { id: 3, name: 'Tsz Ming Wong', role: 'Executive', bio: 'Overseeing technology innovation, including our AI Discovery Engine.', initials: 'TW', email: 'tszming.wong@buyandship.today' },
];

// Approved Quotes (company-wide)
export const CLIENT_QUOTES = [
    { 
        id: 1, 
        text: "We are transforming cross-border shopping through technology and logistics leadership.", 
        speaker: CLIENT_PERSONNEL[0].name, 
        role: CLIENT_PERSONNEL[0].role,
        tags: ['Mission', 'Vision'],
        usageCount: 12
    },
    { 
        id: 2, 
        text: "Our goal is to create a seamless, border-free shopping experience for consumers across Asia.", 
        speaker: CLIENT_PERSONNEL[1].name, 
        role: CLIENT_PERSONNEL[1].role, 
        tags: ['Product', 'Vision'],
        usageCount: 8
    },
    { 
        id: 3, 
        text: "By leveraging AI-driven discovery and intelligent logistics, we're building the future of e-commerce.", 
        speaker: CLIENT_PERSONNEL[2].name, 
        role: CLIENT_PERSONNEL[2].role,
        tags: ['Technology', 'Innovation'],
        usageCount: 5
    },
];

// Messaging Variants
export const CLIENT_MESSAGING = {
    investor: "Buy&Ship is Asia-Pacific's leading e-commerce cross-border logistics company, serving 1.8M+ active members with over 12M shipments handled, fueled by AI and automation.",
    media: "Buy&Ship is democratizing global goods, offering a seamless border-free shopping experience that connects consumers in Asia to the best products worldwide.",
    customer: "Shop the world, anytime, anywhere. Buy&Ship offers affordable international shipping and proxy shopping services from over 10 countries directly to your door.",
};

// =============================================================================

// Mock Quests - Using CLIENT_CONFIG
const { domain, prDomain } = CLIENT_CONFIG;

export const MOCK_QUESTS: Quest[] = [
    {
        id: 1,
        title: 'US$12M Series C Funding Announcement',
        synopsis: 'Successful first close of Series C funding to accelerate global expansion and AI innovation in cross-border logistics.',
        type: 'Press Release',
        status: 'live',
        author: CLIENT_PERSONNEL[0].name,
        authorRole: CLIENT_PERSONNEL[0].role,
        updated: '1mo ago',
        deadline: 'Mar 15, 9:00 AM',
        deadlineType: 'embargo',
        tags: ['Funding', 'Series C', 'Expansion'],
        priority: 'high',
        emailDL: [`investors@${domain}`, `exec-team@${domain}`, `pr@${domain}`],
        uniqueEmail: getQuestEmail('US$12M Series C Funding')
    },
    {
        id: 2,
        title: 'Q4 2025 Financial Results & Collect2Day App Launch',
        synopsis: 'Reporting strong quarterly growth and introducing our new Collectibles mobile app, "Collect2Day".',
        type: 'Blog Post',
        status: 'ready',
        author: CLIENT_PERSONNEL[1].name,
        authorRole: CLIENT_PERSONNEL[1].role,
        updated: '4w ago',
        deadline: 'Mar 25, 10:00 AM',
        deadlineType: 'launch',
        tags: ['Financials', 'App Launch', 'Collectibles'],
        priority: 'high',
        emailDL: [`media@${domain}`, `marketing@${domain}`],
        uniqueEmail: getQuestEmail('Q4 2025 Results')
    },
    {
        id: 3,
        title: 'Japan-to-Taiwan Direct Fulfillment',
        synopsis: 'Slashing delivery times by 3 days with our new direct shipping route from Japan to Taiwan.',
        type: 'Press Release',
        status: 'review',
        author: CLIENT_PERSONNEL[1].name,
        authorRole: CLIENT_PERSONNEL[1].role,
        updated: '1d ago',
        deadline: 'Mar 20, 8:00 AM',
        deadlineType: 'launch',
        tags: ['Logistics', 'Taiwan', 'Japan'],
        priority: 'medium',
        emailDL: [`operations@${domain}`],
        uniqueEmail: getQuestEmail('Japan Taiwan Fulfillment')
    },
    {
        id: 4,
        title: 'Partnership with Mercari, Inc.',
        synopsis: 'Strategic partnership unlocking next-level convenience for shoppers accessing Japanese goods.',
        type: 'Press Release',
        status: 'live',
        author: CLIENT_PERSONNEL[0].name,
        authorRole: CLIENT_PERSONNEL[0].role,
        updated: '6mo ago',
        tags: ['Partnership', 'Mercari', 'Japan'],
        priority: 'high',
        emailDL: [`partnerships@${domain}`, `press@${domain}`],
        uniqueEmail: getQuestEmail('Mercari Partnership')
    },
    {
        id: 5,
        title: 'AI Discovery Engine & Trending Merchants Launch',
        synopsis: 'Introducing our new AI-powered discovery features connecting consumers with global trends.',
        type: 'Blog Post',
        status: 'draft',
        author: CLIENT_PERSONNEL[2].name,
        authorRole: CLIENT_PERSONNEL[2].role,
        updated: '3h ago',
        tags: ['AI', 'Product', 'Innovation'],
        priority: 'medium',
        emailDL: [`product@${domain}`, `tech@${domain}`],
        uniqueEmail: getQuestEmail('AI Discovery Engine')
    },
    {
        id: 6,
        title: 'HKSTP Global Internship Program Showcase',
        synopsis: 'Highlighting the innovative work of our summer interns from Stanford and Imperial College in data analytics and UX.',
        type: 'Strategy Memo',
        status: 'draft',
        author: CLIENT_PERSONNEL[2].name,
        authorRole: CLIENT_PERSONNEL[2].role,
        updated: '2d ago',
        deadline: 'Mar 25',
        deadlineType: 'internal',
        tags: ['Internal', 'Talent', 'HKSTP'],
        emailDL: [`hr@${domain}`, `team@${domain}`],
        uniqueEmail: getQuestEmail('HKSTP Internship')
    }
];

export const MOCK_BRAND_ASSETS = {
    narrative: CLIENT_QUOTES[0].text,
    businessDetails: {
        mission: "To become consumers' first destination for shopping in Asia, connecting you to the ultimate deals for all your desires.",
        vision: "Asia-Pacific's leading e-commerce cross-border logistics company.",
        founded: "2014",
        headquarters: "Kowloon, Hong Kong",
        stage: "Series C",
    },
    keyDocuments: [
        { id: 1, name: 'Brand Guide 2026', type: 'pdf', size: '2.4 MB', updated: '2 months ago' },
        { id: 2, name: 'Cross-Border Logistics Fact Sheet', type: 'sheet', size: '1.2 MB', updated: '1 week ago' },
        { id: 3, name: 'Approved Logo Pack', type: 'zip', size: '14.2 MB', updated: '3 months ago' },
        { id: 4, name: 'Q4 Financial Highlights', type: 'pdf', size: '3.1 MB', updated: '3 days ago' },
    ],
    personnel: CLIENT_PERSONNEL,
    clients: [
        { id: 1, name: 'Taiwan Region', description: 'Fastest growing market (+73% YoY).', since: 'Active' },
        { id: 2, name: 'Singapore Region', description: 'Strong sustained demand (+78% YoY).', since: 'Active' },
        { id: 3, name: 'Malaysia Region', description: 'Expanding footprint (+41% YoY).', since: 'Active' },
    ]
};

// Social Reach Stats Component
interface ReachStat {
    id: string;
    label: string;
    value: string;
    change: string;
    changeType: 'up' | 'down' | 'neutral';
    icon: React.ReactNode;
}

const WEEKLY_STATS: ReachStat[] = [
    {
        id: 'impressions',
        label: 'Impressions',
        value: '124.5K',
        change: '+12.3%',
        changeType: 'up',
        icon: <Eye size={16} strokeWidth={1.5} />,
    },
    {
        id: 'engagements',
        label: 'Engagements',
        value: '8.2K',
        change: '+5.7%',
        changeType: 'up',
        icon: <Heart size={16} strokeWidth={1.5} />,
    },
    {
        id: 'shares',
        label: 'Shares',
        value: '1,847',
        change: '-2.1%',
        changeType: 'down',
        icon: <Share2 size={16} strokeWidth={1.5} />,
    },
    {
        id: 'followers',
        label: 'New Followers',
        value: '+342',
        change: '+8.4%',
        changeType: 'up',
        icon: <Users size={16} strokeWidth={1.5} />,
    },
];

interface SocialReachStatsProps {
    hidden?: boolean;
}

export const SocialReachStats: React.FC<SocialReachStatsProps> = ({ hidden = false }) => {
    if (hidden) return null;

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-black">Weekly Reach</h3>
                <span className="text-[11px] text-black/40">Last 7 days</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
                {WEEKLY_STATS.map((stat) => (
                    <div
                        key={stat.id}
                        className="bg-white rounded-xl border border-black/5 p-4 hover:border-teal-200 hover:shadow-sm transition-all"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                                {stat.icon}
                            </div>
                        </div>
                        <div className="text-xl font-serif font-medium text-black">
                            {stat.value}
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <span className="text-[11px] text-black/50">{stat.label}</span>
                            <span className={`text-[10px] font-medium ${stat.changeType === 'up' ? 'text-emerald-600' :
                                    stat.changeType === 'down' ? 'text-red-500' :
                                        'text-black/40'
                                }`}>
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Backward compatibility - alias export
export const StatsOverview = SocialReachStats;

// Utility exports
export const filterQuests = (quests: Quest[], filter: string): Quest[] => {
    if (filter === 'all') return quests;
    return quests.filter(d => d.status === filter);
};

export const getStatusLabel = (status: Quest['status']): string => {
    const labels: Record<Quest['status'], string> = {
        draft: 'Draft',
        review: 'In Review',
        ready: 'Ready',
        live: 'Published',
    };
    return labels[status];
};

// Badge components
export const TypeBadge: React.FC<{ type: Quest['type'] }> = ({ type }) => {
    return (
        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md border bg-gray-100 text-gray-700 border-gray-200">
            {type}
        </span>
    );
};

export const PriorityBadge: React.FC<{ priority?: Quest['priority'] }> = ({ priority }) => {
    if (!priority) return null;

    const styles = {
        high: 'bg-red-50 text-red-700 border-red-100',
        medium: 'bg-amber-50 text-amber-700 border-amber-100',
        low: 'bg-gray-100 text-gray-600 border-gray-200',
    };

    return (
        <span className={`text-[10px] font-medium px-2 py-1 rounded-md border ${styles[priority]}`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
        </span>
    );
};

export const EmailDLDisplay: React.FC<{ emails: string[]; max?: number }> = ({ emails, max = 2 }) => {
    const display = emails.slice(0, max);
    const remaining = emails.length - max;

    return (
        <div className="flex items-center gap-2">
            <Mail size={12} className="text-black/30" />
            <div className="flex items-center gap-1.5">
                {display.map((email) => (
                    <span key={email} className="text-[11px] text-black/50 bg-black/[0.03] px-2 py-0.5 rounded">
                        {email}
                    </span>
                ))}
                {remaining > 0 && (
                    <span className="text-[11px] text-black/40">+{remaining}</span>
                )}
            </div>
        </div>
    );
};

// =============================================================================
// KNOWLEDGE / BLOG POSTS
// Mock blog posts for the Knowledge section - represents client's public blog
// =============================================================================

export const MOCK_BLOG_POSTS: BlogPost[] = [
    {
        id: '1',
        title: 'The Future of AI in Cross-Border E-Commerce',
        subtitle: 'How artificial intelligence is reshaping global shopping discovery',
        excerpt: 'As consumers demand more personalized shopping experiences, AI is fundamentally altering how they discover and access global goods. Here\'s what Buy&Ship is doing to lead this charge.',
        content: `The cross-border e-commerce landscape is undergoing a massive transformation. It's no longer just about logistics; it's about intelligent discovery. 

For years, finding the right overseas product meant manually browsing foreign sites, dealing with language barriers, and hoping for the best. 

AI has changed the game. At Buy&Ship, we're leveraging large language models and machine learning to build an intuitive "Trending Merchants" Discovery Engine. This allows our users to find the best deals globally, tailored to their unique preferences—whether they're hunting for exclusive anime collectibles from Japan or trendy fashion from the US.

Our AI doesn't just translate; it understands context. It helps categorize vast amounts of product data, ensuring that when a user searches for something niche, they find exactly what they're looking for, seamlessly. 

The future of global shopping isn't just borderless; it's effortlessly intelligent.`,
        author: {
            name: 'Tsz Ming Wong',
            role: 'Executive',
            initials: 'TW'
        },
        publishedAt: '2026-02-20',
        readTime: '6 min read',
        category: 'Technology',
        tags: ['AI', 'E-commerce', 'Innovation', 'Discovery'],
        featured: true,
        relatedQuestId: 5,
        relatedQuestTitle: 'AI Discovery Engine & Trending Merchants Launch',
        stats: { views: 12400, shares: 342 },
        coverImage: 'https://images.unsplash.com/photo-1613690399151-65ea69478674?fm=jpg&q=60&w=3000&auto=format&fit=crop'
    },
    {
        id: '2',
        title: 'Series C Lessons: Building a Borderless Shopping Experience',
        subtitle: 'The vision that resonated with top-tier global investors',
        excerpt: 'Our recent US$12M funding round was a testament to our mission of transforming cross-border shopping through technology and logistics leadership.',
        content: `When we announced our Series C, the response validated what we've believed since 2014: the demand for seamless global shopping is universal and growing rapidly.

Securing backing from strategic investors like Mitsubishi Logistics and Cool Japan Fund wasn't just about the numbers. It was about our shared vision for the Asia-Pacific region.

Our pitch highlighted three core strengths:

First, our undeniable traction. With 1.8M+ active members and over 12M shipments handled, we've proven our model works at scale.
Second, our commitment to automation. We aren't just moving boxes; we're building a tech-first logistics infrastructure that drives down costs and speeds up delivery.
Third, our community. Buy&Ship isn't just a service; it's a vibrant community of shoppers who share deals, tips, and inspiration. 

This funding will accelerate our expansion into new markets and deepen our investments in AI, ensuring we remain the top choice for global shoppers.`,
        author: {
            name: 'Sheldon Li',
            role: 'Co-founder',
            initials: 'SL'
        },
        publishedAt: '2026-02-15',
        readTime: '5 min read',
        category: 'Company News',
        tags: ['Funding', 'Growth', 'Vision', 'Series C'],
        featured: false,
        relatedQuestId: 1,
        relatedQuestTitle: 'US$12M Series C Funding Announcement',
        stats: { views: 8900, shares: 218 },
        coverImage: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1740&auto=format&fit=crop'
    },
    {
        id: '3',
        title: 'Building a Seamless Logistics Network: A Technical Deep Dive',
        subtitle: 'How we slashed delivery times with direct fulfillment routing',
        excerpt: 'Our operations team shares the challenges and breakthroughs behind our new Japan-to-Taiwan direct fulfillment route.',
        content: `Logistics is the backbone of cross-border e-commerce. When we looked at the massive demand from our Taiwanese users for Japanese goods—from Mercari finds to exclusive anime merch—we knew we had to optimize the route.

Previously, parcels often took indirect paths. We engineered a direct fulfillment solution from Japan to Taiwan that cuts transit time by 3 full days.

This required integrating our systems tightly with local carrier networks, optimizing customs clearance data flows, and implementing dynamic load balancing in our warehouses. 

We also expanded our payment infrastructure to support BNPL and Apple Pay, creating a frictionless end-to-end experience. 

The result is a logistics network that feels less like international shipping and more like local delivery.`,
        author: {
            name: 'Hang Poon',
            role: 'Executive',
            initials: 'HP'
        },
        publishedAt: '2026-02-10',
        readTime: '8 min read',
        category: 'Operations',
        tags: ['Logistics', 'Fulfillment', 'Taiwan', 'Japan', 'Operations'],
        featured: false,
        relatedQuestId: 3,
        relatedQuestTitle: 'Japan-to-Taiwan Direct Fulfillment',
        stats: { views: 15200, shares: 567 },
        coverImage: 'https://images.unsplash.com/photo-1606964212858-c215029db704?q=80&w=1740&auto=format&fit=crop'
    }
];

// Helper to get blog posts by quest ID
export const getBlogPostsByQuestId = (questId: number): BlogPost[] => {
    return MOCK_BLOG_POSTS.filter(post => post.relatedQuestId === questId);
};

// =============================================================================
// MOCK PRODUCTS - Blog posts as products linked to quests
// These are pre-populated into sessionStorage for demo purposes
// =============================================================================

const MOCK_PRODUCTS: Record<number, any[]> = {
    // AI Discovery Engine quest - linked to AI blog post
    5: [
        {
            id: 1001,
            title: 'The Future of AI in Cross-Border E-Commerce',
            type: 'blog-post',
            status: 'published',
            wordCount: 1450,
            updatedAt: '2026-02-20',
            subtitle: 'How artificial intelligence is reshaping global shopping discovery',
            excerpt: 'As consumers demand more personalized shopping experiences, AI is fundamentally altering how they discover and access global goods.',
            author: {
                name: 'Tsz Ming Wong',
                role: 'Executive',
                initials: 'TW'
            },
            publishedAt: '2026-02-20',
            readTime: '6 min read',
            category: 'Technology',
            tags: ['AI', 'E-commerce', 'Innovation', 'Discovery'],
            featured: true,
            content: MOCK_BLOG_POSTS[0].content,
            stats: { views: 12400, shares: 342 }
        }
    ],
    // Series C Funding quest - linked to Series C Lessons blog post
    1: [
        {
            id: 1002,
            title: 'Series C Lessons: Building a Borderless Shopping Experience',
            type: 'blog-post',
            status: 'published',
            wordCount: 980,
            updatedAt: '2026-02-15',
            subtitle: 'The vision that resonated with top-tier global investors',
            excerpt: 'Our recent US$12M funding round was a testament to our mission of transforming cross-border shopping through technology and logistics leadership.',
            author: {
                name: 'Sheldon Li',
                role: 'Co-founder',
                initials: 'SL'
            },
            publishedAt: '2026-02-15',
            readTime: '5 min read',
            category: 'Company News',
            tags: ['Funding', 'Growth', 'Vision', 'Series C'],
            featured: false,
            content: MOCK_BLOG_POSTS[1].content,
            stats: { views: 8900, shares: 218 }
        }
    ],
    // Japan-to-Taiwan Direct Fulfillment quest - linked to technical deep dive
    3: [
        {
            id: 1003,
            title: 'Building a Seamless Logistics Network: A Technical Deep Dive',
            type: 'blog-post',
            status: 'published',
            wordCount: 2100,
            updatedAt: '2026-02-10',
            subtitle: 'How we slashed delivery times with direct fulfillment routing',
            excerpt: 'Our operations team shares the challenges and breakthroughs behind our new Japan-to-Taiwan direct fulfillment route.',
            author: {
                name: 'Hang Poon',
                role: 'Executive',
                initials: 'HP'
            },
            publishedAt: '2026-02-10',
            readTime: '8 min read',
            category: 'Operations',
            tags: ['Logistics', 'Fulfillment', 'Taiwan', 'Japan', 'Operations'],
            featured: false,
            content: MOCK_BLOG_POSTS[2].content,
            stats: { views: 15200, shares: 567 }
        }
    ]
};

// Initialize mock products in sessionStorage (for demo purposes)
export const initializeMockProducts = () => {
    // Clear existing product data first to ensure fresh mock data
    Object.keys(MOCK_PRODUCTS).forEach((questId) => {
        const storageKey = `quest_products_${questId}`;
        sessionStorage.removeItem(storageKey);
    });
    // Set mock products
    Object.entries(MOCK_PRODUCTS).forEach(([questId, products]) => {
        const storageKey = `quest_products_${questId}`;
        sessionStorage.setItem(storageKey, JSON.stringify(products));
    });
};

// =============================================================================
// PITCH TEMPLATES
// =============================================================================

export const PITCH_TEMPLATES = {
    exclusive: {
        label: 'Exclusive',
        description: 'For top-tier exclusives',
        subject: '{{title}}',
        body: `Hi {{name}},

I hope this finds you well. I saw your recent piece on {{topic}} and thought this would be right up your alley.

We're announcing {{title}} — {{synopsis}}

I'd love to offer you an exclusive on this story. I have {{founder}} available for an interview this week.

The embargo lifts on {{embargoDate}} at {{embargoTime}}.

Best regards,
{{sender}}`
    },
    embargo: {
        label: 'Embargo',
        description: 'Standard embargo pitch',
        subject: '{{title}}',
        body: `Hi {{name}},

Under embargo until {{embargoDate}} at {{embargoTime}}:

{{title}}

{{synopsis}}

I have {{founder}} available for interviews. Let me know if you're interested.

Best,
{{sender}}`
    },
    followup: {
        label: 'Follow-up',
        description: 'Checking in',
        subject: '{{title}}',
        body: `Hi {{name}},

Just following up on my previous email about {{title}}.

{{synopsis}}

Would you be interested in covering this? Happy to provide more details or connect you with {{founder}}.

Best,
{{sender}}`
    }
};

// =============================================================================
// QUEST DOCUMENTS (for outreach attachments)
// =============================================================================

export const MOCK_QUEST_DOCS = [
    { id: 1, name: 'Series C Press Release', type: 'doc', size: '24 KB' },
    { id: 2, name: 'Founder Bio - Sheldon Li', type: 'doc', size: '12 KB' },
    { id: 3, name: 'Buy&Ship Fact Sheet', type: 'sheet', size: '18 KB' },
    { id: 4, name: 'App Screenshots', type: 'image', size: '2.4 MB' },
];

// =============================================================================
// CALENDAR EVENTS
// Derived from quest deadlines for consistent date management
// =============================================================================

export interface CalendarEvent {
    id: number;
    questId: number;
    questTitle: string;
    title: string;
    date: string; // ISO format YYYY-MM-DD
    time?: string;
    type: 'embargo' | 'deadline' | 'launch';
}

// Helper to parse deadline string (e.g., "Mar 15, 9:00 AM") into CalendarEvent
const parseQuestDeadline = (quest: Quest, index: number): CalendarEvent | null => {
    if (!quest.deadline) return null;
    
    // Parse "Mar 15, 9:00 AM" or "Mar 15" format
    const parts = quest.deadline.split(',');
    const datePart = parts[0].trim(); // "Mar 15"
    const timePart = parts[1]?.trim(); // "9:00 AM"
    
    // Convert month name to number
    const monthMap: Record<string, string> = {
        'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
        'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    };
    
    const [monthName, day] = datePart.split(' ');
    const month = monthMap[monthName];
    if (!month) return null;
    
    // Determine event type and title based on deadlineType
    let eventType: CalendarEvent['type'] = 'deadline';
    let eventTitle = quest.title;
    
    switch (quest.deadlineType) {
        case 'embargo':
            eventType = 'embargo';
            eventTitle = `${quest.title} - Embargo`;
            break;
        case 'launch':
            eventType = 'launch';
            eventTitle = `${quest.title} - Launch`;
            break;
        default:
            eventTitle = `${quest.title} - Review`;
    }
    
    return {
        id: index + 1,
        questId: quest.id,
        questTitle: quest.title,
        title: eventTitle,
        date: `2026-${month}-${day.padStart(2, '0')}`,
        time: timePart,
        type: eventType,
    };
};

// Generate calendar events from quest deadlines
export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = MOCK_QUESTS
    .map((quest, index) => parseQuestDeadline(quest, index))
    .filter((event): event is CalendarEvent => event !== null);

// =============================================================================
// AI SUGGESTED QUEST IDEAS
// Generated based on existing quests and brand documents
// =============================================================================

export interface AIQuestSuggestion {
    id: string;
    title: string;
    synopsis: string;
    type: 'Press Release' | 'Blog Post' | 'Strategy Memo';
    reasoning: string;
    confidence: number;
    basedOn: string[];
}

export const AI_SUGGESTED_QUESTS: AIQuestSuggestion[] = [
    {
        id: 'suggestion-1',
        title: 'Q2 Product Roadmap Announcement',
        synopsis: 'Share upcoming features and product direction for Q2, building on the V3 launch momentum.',
        type: 'Blog Post',
        reasoning: 'Based on your recent Product Launch V3 and upcoming deadlines',
        confidence: 92,
        basedOn: ['Product Launch V3', 'Q1 Strategy Memo']
    },
    {
        id: 'suggestion-2',
        title: 'Customer Success Story: Enterprise Onboarding',
        synopsis: 'Case study highlighting how enterprise customers are deploying the platform at scale.',
        type: 'Press Release',
        reasoning: 'Complements your Partnership PR and Series B narrative',
        confidence: 87,
        basedOn: ['Partnership Press Release', 'Series B Funding']
    },
    {
        id: 'suggestion-3',
        title: 'Engineering Culture Deep Dive',
        synopsis: 'Behind-the-scenes look at how the engineering team ships products, featuring insights from your new CTO.',
        type: 'Blog Post',
        reasoning: 'Leverages recent New CTO Appointment announcement',
        confidence: 84,
        basedOn: ['New CTO Appointment', 'Building Neural Search blog post']
    }
];