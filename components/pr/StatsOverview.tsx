import React from 'react';
import { Eye, Heart, Share2, Users, Mail } from 'lucide-react';

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
    { id: 1, name: 'Mike Butcher', outlet: 'TechCrunch', email: 'mike@techcrunch.com', focus: 'Startups, Europe', status: 'opened', openedAt: '2h ago' },
    { id: 2, name: 'Alex Konrad', outlet: 'Forbes', email: 'alex.konrad@forbes.com', focus: 'VC, Cloud', status: 'responded', respondedAt: '1h ago' },
    { id: 3, name: 'Casey Newton', outlet: 'Platformer', email: 'casey@platformer.news', focus: 'Social Media, Democracy', status: 'pending' },
    { id: 4, name: 'Kara Swisher', outlet: 'Pivot / NYMag', email: 'kara@nymag.com', focus: 'Tech, Business', status: 'pending' },
    { id: 5, name: 'Ryan Lawler', outlet: 'TechCrunch', email: 'ryan@techcrunch.com', focus: 'AI, Enterprise', status: 'pending' },
    { id: 6, name: 'Ingrid Lunden', outlet: 'TechCrunch', email: 'ingrid@techcrunch.com', focus: 'Funding, Europe', status: 'pending' },
    { id: 7, name: 'Natasha Mascarenhas', outlet: 'TechCrunch', email: 'natasha@techcrunch.com', focus: 'Startups, VC', status: 'pending' },
    { id: 8, name: 'Amanda Silberling', outlet: 'TechCrunch', email: 'amanda@techcrunch.com', focus: 'Creator Economy', status: 'pending' },
    { id: 9, name: 'Taylor Hatmaker', outlet: 'TechCrunch', email: 'taylor@techcrunch.com', focus: 'AI, Policy', status: 'pending' },
    { id: 10, name: 'Aisha Malik', outlet: 'TechCrunch', email: 'aisha@techcrunch.com', focus: 'Apps, Consumer', status: 'pending' },
    { id: 11, name: 'Kyle Wiggers', outlet: 'TechCrunch', email: 'kyle@techcrunch.com', focus: 'AI, Robotics', status: 'pending' },
    { id: 12, name: 'Paul Sawers', outlet: 'TechCrunch', email: 'paul@techcrunch.com', focus: 'Europe, AI', status: 'pending' },
];

export const getRecommendedJournalists = (quest: Quest): JournalistContact[] => {
    const fundingKeywords = ['funding', 'series', 'investment', 'vc'];
    const aiKeywords = ['ai', 'artificial intelligence', 'machine learning', 'neural'];
    const productKeywords = ['product', 'launch', 'release', 'feature'];

    const questText = (quest.title + ' ' + quest.synopsis + ' ' + quest.tags.join(' ')).toLowerCase();

    const isFunding = fundingKeywords.some(k => questText.includes(k));
    const isAI = aiKeywords.some(k => questText.includes(k));
    const isProduct = productKeywords.some(k => questText.includes(k));

    const scored = MOCK_JOURNALISTS.map(j => {
        let score = 0;
        const focus = j.focus.toLowerCase();

        if (isFunding && (focus.includes('vc') || focus.includes('funding') || focus.includes('startups'))) score += 3;
        if (isAI && focus.includes('ai')) score += 3;
        if (isProduct && focus.includes('product')) score += 2;
        if (j.outlet === 'TechCrunch') score += 1;

        return { ...j, score };
    });

    return scored
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .slice(0, 5);
};

// =============================================================================
// CLIENT CONFIG - Single Source of Truth for Demo Data
// Modify this section to tailor the demo to your client
// =============================================================================

export const CLIENT_CONFIG = {
    // Company Identity
    companyName: 'Caybles',
    domain: 'caybles.com',
    prDomain: 'pr.caybles.com',  // For quest unique emails
    
    // Logo paths (place in /public/logos/)
    logos: {
        full: '/logos/client_logo.png',      // Full logo
        square: '/logos/client_logo_square.png',  // Square logo for social avatars
        icon: '/logos/client_logo_icon.png',      // Icon only
    },
    
    // Social Media Handles
    social: {
        x: 'caybles',
        twitter: 'caybles',
        linkedin: 'company/caybles',
        instagram: 'caybles',
    },
    
    // Brand Colors (for UI accents)
    colors: {
        primary: '#0D9488',      // Teal
        accent: '#EBA832',       // Amber/Marigold
    },
    
    // Quick Links
    links: {
        website: 'caybles.com',
        pressKit: 'caybles.com/press',
        brandGuidelines: 'caybles.com/brand',
        mediaInquiries: 'press@caybles.com',
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
    { id: 1, name: 'Mithil Aggarwal', role: 'Chief Executive Officer', bio: 'Former PM at Stripe. Leads product vision and overall company strategy.', initials: 'MA', email: 'mithil@caybles.com' },
    { id: 2, name: 'Sarah Jenkins', role: 'Head of Communications', bio: '10+ years running tech policy campaigns. Masters in PubPol from Georgetown.', initials: 'SJ', email: 'sarah@caybles.com' },
    { id: 3, name: 'Dr. Elena Rostova', role: 'Chief Technology Officer', bio: 'Ex-DeepMind researcher. Overseeing our core ML infrastructure.', initials: 'ER', email: 'elena@caybles.com' },
];

// Approved Quotes (company-wide)
export const CLIENT_QUOTES = [
    { 
        id: 1, 
        text: "We're democratizing high-end PR for the next generation of founders who deserve to be heard.", 
        speaker: CLIENT_PERSONNEL[0].name, 
        role: CLIENT_PERSONNEL[0].role,
        tags: ['Mission', 'Vision'],
        usageCount: 12
    },
    { 
        id: 2, 
        text: "The best ideas should win, not just the best funded. That's why we built Caybles.", 
        speaker: CLIENT_PERSONNEL[0].name, 
        role: CLIENT_PERSONNEL[0].role, 
        tags: ['Product', 'Vision'],
        usageCount: 8
    },
    { 
        id: 3, 
        text: "Traditional PR gatekeepers have excluded too many brilliant founders. We're changing that.", 
        speaker: CLIENT_PERSONNEL[1].name, 
        role: CLIENT_PERSONNEL[1].role,
        tags: ['Industry', 'Mission'],
        usageCount: 5
    },
];

// Messaging Variants
export const CLIENT_MESSAGING = {
    investor: 'Caybles is the AI-native PR platform that helps ambitious startups secure media coverage without traditional gatekeepers. We combine AI-driven media matching with journalist relationship management.',
    media: 'Caybles is democratizing high-end PR for the next generation of tech and policy founders, bypassing traditional gatekeepers to deliver authentic stories straight to top-tier outlets.',
    customer: 'Get your startup the media coverage it deserves. Caybles uses AI to match your story with the right journalists and manages your entire PR workflow from pitch to publication.',
};

// =============================================================================

// Mock Quests - Using CLIENT_CONFIG
const { domain, prDomain } = CLIENT_CONFIG;

export const MOCK_QUESTS: Quest[] = [
    {
        id: 1,
        title: 'Series B Funding Announcement',
        synopsis: '$45M Series B led by Andreessen Horowitz to accelerate AI infrastructure development and expand into European markets.',
        type: 'Press Release',
        status: 'review',
        author: CLIENT_PERSONNEL[0].name,
        authorRole: CLIENT_PERSONNEL[0].role,
        updated: '2h ago',
        deadline: 'Jan 15, 9:00 AM',
        deadlineType: 'embargo',
        tags: ['Funding', 'Exclusive', 'TechCrunch'],
        priority: 'high',
        emailDL: [`investors@${domain}`, `exec-team@${domain}`, `pr@${domain}`],
        uniqueEmail: getQuestEmail('Series B Funding Announcement')
    },
    {
        id: 2,
        title: 'AI Policy Framework 2026',
        synopsis: 'A comprehensive analysis of emerging AI regulations and how policy makers can balance innovation with safety concerns.',
        type: 'Blog Post',
        status: 'draft',
        author: CLIENT_PERSONNEL[0].name,
        authorRole: CLIENT_PERSONNEL[0].role,
        updated: '3h ago',
        tags: ['Thought Leadership', 'Policy'],
        priority: 'high',
        emailDL: [`policy@${domain}`, `content@${domain}`],
        uniqueEmail: getQuestEmail('AI Policy Framework 2026')
    },
    {
        id: 3,
        title: 'Q1 Strategy Memo',
        synopsis: 'Internal alignment document outlining key narratives, target outlets, and campaign timeline for first quarter media push.',
        type: 'Strategy Memo',
        status: 'draft',
        author: CLIENT_PERSONNEL[1].name,
        authorRole: CLIENT_PERSONNEL[1].role,
        updated: '1d ago',
        deadline: 'Jan 20',
        deadlineType: 'internal',
        tags: ['Internal', 'Q1 Planning'],
        priority: 'medium',
        emailDL: [`comms@${domain}`],
        uniqueEmail: getQuestEmail('Q1 Strategy Memo')
    },
    {
        id: 4,
        title: 'New CTO Appointment',
        synopsis: `${CLIENT_PERSONNEL[2].name} joins from Google DeepMind to lead our technical AI research division and expand engineering team.`,
        type: 'Press Release',
        status: 'ready',
        author: CLIENT_PERSONNEL[1].name,
        authorRole: CLIENT_PERSONNEL[1].role,
        updated: 'Yesterday',
        deadline: 'Jan 18, 8:00 AM',
        deadlineType: 'embargo',
        tags: ['Hiring', 'Leadership'],
        priority: 'medium',
        emailDL: [`team@${domain}`, `press@${domain}`],
        uniqueEmail: getQuestEmail('New CTO Appointment')
    },
    {
        id: 5,
        title: 'Product Launch V3',
        synopsis: 'Next-generation neural search capabilities with real-time visualization and enterprise-grade security features.',
        type: 'Blog Post',
        status: 'ready',
        author: CLIENT_PERSONNEL[1].name,
        authorRole: CLIENT_PERSONNEL[1].role,
        updated: '2d ago',
        deadline: 'Jan 22, 10:00 AM',
        deadlineType: 'launch',
        tags: ['Product', 'Launch'],
        priority: 'high',
        emailDL: [`product@${domain}`, `customers@${domain}`, `launch@${domain}`],
        uniqueEmail: getQuestEmail('Product Launch V3')
    },
    {
        id: 6,
        title: 'Year in Review 2025',
        synopsis: 'Reflecting on our biggest milestones: 3x team growth, Series A close, and 10M+ users reached.',
        type: 'Blog Post',
        status: 'live',
        author: CLIENT_PERSONNEL[0].name,
        authorRole: CLIENT_PERSONNEL[0].role,
        updated: '1w ago',
        tags: ['Annual', 'Recap'],
        emailDL: [`all@${domain}`],
        uniqueEmail: getQuestEmail('Year in Review 2025')
    },
    {
        id: 7,
        title: 'Seed Round Announcement',
        synopsis: 'Initial $8M seed funding to build the foundation for democratizing AI-powered communications.',
        type: 'Press Release',
        status: 'live',
        author: CLIENT_PERSONNEL[0].name,
        authorRole: CLIENT_PERSONNEL[0].role,
        updated: '2w ago',
        tags: ['Archived', 'Funding'],
        emailDL: [`investors@${domain}`],
        uniqueEmail: getQuestEmail('Seed Round Announcement')
    },
    {
        id: 8,
        title: 'Partnership Press Release',
        synopsis: 'Strategic partnership with Microsoft Azure to provide enterprise deployment options for our platform.',
        type: 'Press Release',
        status: 'ready',
        author: CLIENT_PERSONNEL[1].name,
        authorRole: CLIENT_PERSONNEL[1].role,
        updated: '3d ago',
        tags: ['Partnership', 'Enterprise'],
        priority: 'low',
        emailDL: [`partnerships@${domain}`, `enterprise@${domain}`],
        uniqueEmail: getQuestEmail('Partnership Press Release')
    },
];
export const MOCK_BRAND_ASSETS = {
    narrative: CLIENT_QUOTES[0].text,
    businessDetails: {
        mission: "To level the playing field for ambitious startups by making premium communications accessible.",
        vision: "A world where the best ideas win, not just the best funded.",
        founded: "2024",
        headquarters: "San Francisco, CA",
        stage: "Series A",
    },
    keyDocuments: [
        { id: 1, name: 'Brand Guide 2026', type: 'pdf', size: '2.4 MB', updated: '2 months ago' },
        { id: 2, name: 'Company Boilerplate', type: 'doc', size: '15 KB', updated: '1 week ago' },
        { id: 3, name: 'Approved Logo Pack', type: 'zip', size: '14.2 MB', updated: '3 months ago' },
        { id: 4, name: 'Q1 Metrics & Fact Sheet', type: 'sheet', size: '1.2 MB', updated: '3 days ago' },
    ],
    personnel: CLIENT_PERSONNEL,
    clients: [
        { id: 1, name: 'Acme Robotics', description: 'Series B warehouse automation.', since: 'Jan 2025' },
        { id: 2, name: 'Nexus Health', description: 'AI-driven diagnostics platform.', since: 'Mar 2025' },
        { id: 3, name: 'QuantumFin', description: 'DeFi protocol for institutional investors.', since: 'Jul 2025' },
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
