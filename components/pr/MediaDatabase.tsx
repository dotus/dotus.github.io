import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Search01Icon,
    FilterHorizontalIcon,
    UserMultipleIcon,
    StarIcon,
    HeartAddIcon,
    Newspaper,
    Bookmark01Icon,
    Mail01Icon,
    MessageMultiple01Icon,
    EyeIcon,
    LayoutGridIcon,
    ListViewIcon,
    ArrowUpRightIcon,
} from '@hugeicons/core-free-icons';
import {
    Search, Plus, X, Check
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface Article {
    id: number;
    title: string;
    outlet: string;
    publishedAt: string;
    url?: string;
    excerpt?: string;
    isAboutBrand?: boolean;
    engagement?: { views?: number; shares?: number; comments?: number };
}

interface EngagementStats {
    totalEmails: number;
    openRate: number;
    responseRate: number;
    lastContacted?: string;
    relationshipStrength: 'strong' | 'warm' | 'cold' | 'new';
}

interface Journalist {
    id: number;
    name: string;
    outlet: string;
    email: string;
    focus: string[];
    location?: string;
    bio?: string;
    twitter?: string;
    linkedin?: string;
    sentiment: 'positive' | 'neutral' | 'critical' | 'analytical';
    isRecommended?: boolean;
    recommendationReason?: string;
    articles: Article[];
    engagement: EngagementStats;
    lastArticle?: Article;
    tags?: string[];
}

interface FilterState {
    search: string;
    outlets: string[];
    focusAreas: string[];
    relationshipStrength: string[];
}

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_ARTICLES: Article[] = [
    { id: 1, title: "&also Raises $45M Series B to Revolutionize PR Tech", outlet: "TechCrunch", publishedAt: "2026-01-10", isAboutBrand: true, excerpt: "The AI-native PR platform is changing how startups approach media relations...", engagement: { views: 45000, shares: 2300 } },
    { id: 2, title: "The Future of AI in Public Relations", outlet: "TechCrunch", publishedAt: "2026-01-08", excerpt: "How artificial intelligence is reshaping the PR industry..." },
    { id: 3, title: "Startup Funding Surges in Q4 2025", outlet: "Forbes", publishedAt: "2026-01-05" },
    { id: 4, title: "&also's Approach to Media Relations: A Case Study", outlet: "Forbes", publishedAt: "2025-12-20", isAboutBrand: true },
];

const MOCK_JOURNALISTS_BASE: Journalist[] = [
    {
        id: 1, name: 'Mike Butcher', outlet: 'TechCrunch', email: 'mike@techcrunch.com',
        focus: ['Startups', 'Europe', 'Funding'], location: 'London, UK',
        bio: 'Editor-at-large at TechCrunch covering European startups and venture capital since 2007.',
        sentiment: 'analytical',
        articles: [MOCK_ARTICLES[0], MOCK_ARTICLES[1]],
        engagement: { totalEmails: 12, openRate: 92, responseRate: 67, lastContacted: '2d ago', relationshipStrength: 'strong' },
        lastArticle: MOCK_ARTICLES[1], tags: ['Top Tier', 'VC Focus']
    },
    {
        id: 2, name: 'Alex Konrad', outlet: 'Forbes', email: 'alex.konrad@forbes.com',
        focus: ['VC', 'Cloud', 'Enterprise'], location: 'San Francisco, CA',
        sentiment: 'positive',
        articles: [MOCK_ARTICLES[3], MOCK_ARTICLES[2]],
        engagement: { totalEmails: 8, openRate: 88, responseRate: 50, lastContacted: '1w ago', relationshipStrength: 'strong' },
        lastArticle: MOCK_ARTICLES[2], tags: ['VC Focus']
    },
    {
        id: 3, name: 'Casey Newton', outlet: 'Platformer', email: 'casey@platformer.news',
        focus: ['Social Media', 'Democracy', 'AI Policy'], location: 'San Francisco, CA',
        sentiment: 'analytical',
        articles: [],
        engagement: { totalEmails: 5, openRate: 80, responseRate: 40, lastContacted: '2w ago', relationshipStrength: 'warm' },
        tags: ['Policy']
    },
    {
        id: 4, name: 'Kara Swisher', outlet: 'Pivot / NYMag', email: 'kara@nymag.com',
        focus: ['Tech', 'Business', 'Leadership'], location: 'Washington, DC',
        sentiment: 'critical',
        articles: [],
        engagement: { totalEmails: 3, openRate: 100, responseRate: 33, lastContacted: '1mo ago', relationshipStrength: 'warm' },
        tags: ['Influencer']
    },
    {
        id: 5, name: 'Ryan Lawler', outlet: 'TechCrunch', email: 'ryan@techcrunch.com',
        focus: ['AI', 'Enterprise', 'SaaS'], location: 'San Francisco, CA',
        sentiment: 'neutral',
        articles: [MOCK_ARTICLES[1]],
        engagement: { totalEmails: 6, openRate: 67, responseRate: 17, lastContacted: '3w ago', relationshipStrength: 'cold' },
        lastArticle: MOCK_ARTICLES[1], tags: ['AI Focus']
    },
    {
        id: 6, name: 'Ingrid Lunden', outlet: 'TechCrunch', email: 'ingrid@techcrunch.com',
        focus: ['Funding', 'Europe', 'M&A'], location: 'London, UK',
        sentiment: 'positive',
        articles: [MOCK_ARTICLES[0]],
        engagement: { totalEmails: 4, openRate: 100, responseRate: 75, lastContacted: '3d ago', relationshipStrength: 'strong' },
        lastArticle: MOCK_ARTICLES[0], tags: ['Europe']
    },
    {
        id: 7, name: 'Natasha Mascarenhas', outlet: 'TechCrunch', email: 'natasha@techcrunch.com',
        focus: ['Startups', 'VC', 'Workplace'], location: 'San Francisco, CA',
        sentiment: 'positive',
        articles: [MOCK_ARTICLES[2]],
        engagement: { totalEmails: 7, openRate: 86, responseRate: 43, lastContacted: '5d ago', relationshipStrength: 'warm' },
        lastArticle: MOCK_ARTICLES[2], tags: ['Workplace']
    },
    {
        id: 8, name: 'Amanda Silberling', outlet: 'TechCrunch', email: 'amanda@techcrunch.com',
        focus: ['Creator Economy', 'Social Media'], location: 'Los Angeles, CA',
        sentiment: 'neutral',
        articles: [],
        engagement: { totalEmails: 2, openRate: 50, responseRate: 0, relationshipStrength: 'new' },
        tags: ['Creator Economy']
    },
    {
        id: 9, name: 'Taylor Hatmaker', outlet: 'TechCrunch', email: 'taylor@techcrunch.com',
        focus: ['AI', 'Policy', 'Ethics'], location: 'Portland, OR',
        sentiment: 'analytical',
        articles: [],
        engagement: { totalEmails: 4, openRate: 75, responseRate: 25, lastContacted: '2w ago', relationshipStrength: 'warm' },
        tags: ['AI Focus', 'Policy']
    },
    {
        id: 10, name: 'Aisha Malik', outlet: 'TechCrunch', email: 'aisha@techcrunch.com',
        focus: ['Apps', 'Consumer', 'Social'], location: 'New York, NY',
        sentiment: 'positive',
        articles: [],
        engagement: { totalEmails: 3, openRate: 67, responseRate: 33, relationshipStrength: 'new' },
        tags: ['Consumer', 'Apps']
    },
];

// Mark first 5 as recommended
const MOCK_JOURNALISTS: Journalist[] = MOCK_JOURNALISTS_BASE.map((j, i) => ({
    ...j,
    isRecommended: i < 5,
    recommendationReason: i < 5 ? 'Matches your active quests' : undefined
}));

const OUTLETS = ['TechCrunch', 'Forbes', 'Platformer', 'NYMag'];
const FOCUS_AREAS = ['Startups', 'VC', 'AI', 'Enterprise', 'Funding', 'Europe', 'Policy'];
const RELATIONSHIP_STRENGTHS = ['strong', 'warm', 'cold', 'new'];

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

const RelationshipLabel: React.FC<{ strength: string }> = ({ strength }) => {
    const labels = { strong: 'Strong', warm: 'Warm', cold: 'Cold', new: 'New' };
    const colors = {
        strong: 'text-teal-700 bg-teal-50',
        warm: 'text-blue-700 bg-blue-50',
        cold: 'text-gray-600 bg-gray-100',
        new: 'text-violet-700 bg-violet-50'
    };
    return (
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${colors[strength as keyof typeof colors]}`}>
            {labels[strength as keyof typeof labels]}
        </span>
    );
};

// ============================================================================
// EXPANDABLE CARD COMPONENT
// ============================================================================

interface JournalistCardProps {
    journalist: Journalist;
    index: number;
}

const JournalistCard: React.FC<JournalistCardProps> = ({ journalist, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const brandArticles = journalist.articles.filter(a => a.isAboutBrand);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative rounded-xl border p-4 cursor-pointer transition-all duration-300 ${
                journalist.isRecommended 
                    ? 'bg-amber-50 border-amber-200 hover:border-amber-400 hover:shadow-md hover:shadow-amber-100' 
                    : 'bg-white border-black/5 hover:border-teal-200 hover:shadow-md'
            }`}
        >
            {/* Recommended Star - Subtle top right */}
            {journalist.isRecommended && (
                <div className="absolute top-3 right-3">
                    <HugeiconsIcon icon={StarIcon} size={14} className="text-amber-500 fill-amber-200" />
                </div>
            )}
            
            {/* Header */}
            <div className="mb-3">
                <h3 className={`font-medium text-[14px] transition-colors ${isHovered ? 'text-teal-600' : 'text-black'}`}>
                    {journalist.name}
                </h3>
                <p className="text-[11px] text-black/50">{journalist.outlet}</p>
            </div>

            {/* Focus Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
                {journalist.focus.slice(0, 3).map(f => (
                    <span key={f} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                        {f}
                    </span>
                ))}
            </div>

            {/* Compact Stats Row */}
            <div className="flex items-center gap-3 text-[11px] text-black/40">
                <span className="flex items-center gap-1">
                    <HugeiconsIcon icon={Mail01Icon} size={11} />
                    {journalist.engagement.openRate}%
                </span>
                <span className="flex items-center gap-1">
                    <HugeiconsIcon icon={MessageMultiple01Icon} size={11} />
                    {journalist.engagement.responseRate}%
                </span>
                <RelationshipLabel strength={journalist.engagement.relationshipStrength} />
            </div>

            {/* Expandable Content - Smooth Animation */}
            <motion.div
                initial={false}
                animate={{ 
                    height: isHovered ? 'auto' : 0,
                    opacity: isHovered ? 1 : 0,
                    marginTop: isHovered ? 12 : 0
                }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
            >
                <div className="pt-3 border-t border-black/5">
                    {/* Bio */}
                    {journalist.bio && (
                        <p className="text-[11px] text-black/60 mb-3 line-clamp-2">{journalist.bio}</p>
                    )}
                    
                    {/* Latest Article */}
                    {journalist.lastArticle && (
                        <div className="mb-3">
                            <div className="flex items-center gap-1.5 text-[10px] text-black/40 mb-1">
                                <HugeiconsIcon icon={Newspaper} size={10} />
                                <span>Latest</span>
                                {journalist.lastArticle.isAboutBrand && (
                                    <span className="text-teal-600 font-medium">• About &also</span>
                                )}
                            </div>
                            <p className="text-[11px] text-black/70 line-clamp-1">{journalist.lastArticle.title}</p>
                        </div>
                    )}

                    {/* Brand Mentions Count */}
                    {brandArticles.length > 0 && (
                        <div className="flex items-center gap-1.5 text-[10px] text-teal-600 mb-3">
                            <HugeiconsIcon icon={Bookmark01Icon} size={10} />
                            <span>{brandArticles.length} article{brandArticles.length > 1 ? 's' : ''} about &also</span>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-teal-600 text-white rounded-lg text-[11px] font-medium hover:bg-teal-700 transition-colors">
                            <HugeiconsIcon icon={Mail01Icon} size={11} />
                            Contact
                        </button>
                        <button className="flex items-center justify-center w-8 h-7 bg-gray-100 text-black/60 rounded-lg hover:bg-gray-200 transition-colors">
                            <HugeiconsIcon icon={ArrowUpRightIcon} size={12} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const MediaDatabase: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [activeTab, setActiveTab] = useState<'all' | 'recommended' | 'engaged' | 'recent' | 'brand'>('all');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        search: '', outlets: [], focusAreas: [], relationshipStrength: [],
    });

    // Filter logic
    const filteredJournalists = useMemo(() => {
        return MOCK_JOURNALISTS.filter(j => {
            if (filters.search) {
                const s = filters.search.toLowerCase();
                if (!j.name.toLowerCase().includes(s) && 
                    !j.outlet.toLowerCase().includes(s) &&
                    !j.focus.some(f => f.toLowerCase().includes(s))) return false;
            }
            if (activeTab === 'recommended' && !j.isRecommended) return false;
            if (activeTab === 'engaged' && j.engagement.relationshipStrength !== 'strong') return false;
            if (activeTab === 'recent' && !j.lastArticle) return false;
            if (activeTab === 'brand' && !j.articles.some(a => a.isAboutBrand)) return false;
            if (filters.outlets.length && !filters.outlets.includes(j.outlet)) return false;
            if (filters.focusAreas.length && !j.focus.some(f => filters.focusAreas.includes(f))) return false;
            if (filters.relationshipStrength.length && !filters.relationshipStrength.includes(j.engagement.relationshipStrength)) return false;
            return true;
        });
    }, [filters, activeTab]);

    const stats = useMemo(() => ({
        total: MOCK_JOURNALISTS.length,
        recommended: MOCK_JOURNALISTS.filter(j => j.isRecommended).length,
        engaged: MOCK_JOURNALISTS.filter(j => j.engagement.relationshipStrength === 'strong').length,
        brandMentions: MOCK_JOURNALISTS.filter(j => j.articles.some(a => a.isAboutBrand)).length,
    }), []);

    const hasActiveFilters = filters.outlets.length || filters.focusAreas.length || filters.relationshipStrength.length;

    const toggleFilter = (category: keyof FilterState, value: string) => {
        setFilters(prev => {
            const current = prev[category] as string[];
            return { ...prev, [category]: current.includes(value) ? current.filter(v => v !== value) : [...current, value] };
        });
    };

    // ============================================================================
    // LIST VIEW ITEM
    // ============================================================================

    const ListItem: React.FC<{ journalist: Journalist; index: number }> = ({ journalist, index }) => {
        const [isHovered, setIsHovered] = useState(false);
        const brandArticles = journalist.articles.filter(a => a.isAboutBrand);
        
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`group p-4 border-b border-black/5 last:border-0 cursor-pointer transition-colors ${
                    journalist.isRecommended ? 'bg-amber-50 hover:bg-amber-100/70' : 'hover:bg-gray-50/50'
                }`}
            >
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-medium text-[14px] transition-colors ${isHovered ? 'text-teal-600' : 'text-black'}`}>
                                {journalist.name}
                            </h3>
                            {journalist.isRecommended && (
                                <HugeiconsIcon icon={StarIcon} size={12} className="text-amber-500 fill-amber-200" />
                            )}
                        </div>
                        <p className="text-[11px] text-black/50 mb-2">{journalist.outlet}</p>
                        
                        <div className="flex items-center gap-2 flex-wrap">
                            {journalist.focus.slice(0, 3).map(f => (
                                <span key={f} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{f}</span>
                            ))}
                        </div>
                    </div>
                    
                    <div className="text-right">
                        <div className="flex items-center justify-end gap-3 text-[11px] text-black/40 mb-1">
                            <span className="flex items-center gap-1">
                                <HugeiconsIcon icon={Mail01Icon} size={11} />
                                {journalist.engagement.openRate}%
                            </span>
                            <RelationshipLabel strength={journalist.engagement.relationshipStrength} />
                        </div>
                        
                        {/* Expand on hover */}
                        <motion.div
                            initial={false}
                            animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            {journalist.lastArticle && (
                                <p className="text-[11px] text-black/50 mt-2 max-w-[300px]">
                                    {journalist.lastArticle.title}
                                    {journalist.lastArticle.isAboutBrand && <span className="text-teal-600 ml-1">• &also</span>}
                                </p>
                            )}
                            {brandArticles.length > 0 && (
                                <p className="text-[10px] text-teal-600 mt-1">
                                    {brandArticles.length} mention{brandArticles.length > 1 ? 's' : ''}
                                </p>
                            )}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        );
    };

    // ============================================================================
    // MAIN RENDER
    // ============================================================================

    return (
        <div className="h-full flex flex-col bg-[#FAF9F6]">
            {/* Compact Header with Integrated Filters */}
            <div className="border-b border-black/5 bg-white px-6 py-3 shrink-0">
                <div className="flex items-center gap-4">
                    {/* Title */}
                    <div className="shrink-0">
                        <h1 className="font-serif text-lg font-medium">Network</h1>
                        <p className="text-[11px] text-black/50">{stats.total} journalists</p>
                    </div>

                    {/* Merged Filter Badges */}
                    <div className="flex items-center gap-1.5">
                        {[
                            { id: 'all', label: 'All', value: stats.total, icon: UserMultipleIcon },
                            { id: 'recommended', label: 'Recommended', value: stats.recommended, icon: StarIcon, accent: 'amber' },
                            { id: 'engaged', label: 'Strong', value: stats.engaged, icon: HeartAddIcon, accent: 'rose' },
                            { id: 'brand', label: 'Mentions', value: stats.brandMentions, icon: Bookmark01Icon, accent: 'teal' },
                        ].map(stat => (
                            <button
                                key={stat.id}
                                onClick={() => setActiveTab(stat.id as typeof activeTab)}
                                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                                    activeTab === stat.id 
                                        ? stat.accent === 'amber' ? 'bg-amber-100 text-amber-800' :
                                          stat.accent === 'rose' ? 'bg-rose-100 text-rose-800' :
                                          stat.accent === 'teal' ? 'bg-teal-100 text-teal-800' :
                                          'bg-gray-100 text-gray-800'
                                        : 'bg-transparent text-black/60 hover:bg-black/5'
                                }`}
                            >
                                <HugeiconsIcon icon={stat.icon} size={13} className={
                                    activeTab === stat.id 
                                        ? stat.accent === 'amber' ? 'text-amber-600' :
                                          stat.accent === 'rose' ? 'text-rose-600' :
                                          stat.accent === 'teal' ? 'text-teal-600' :
                                          'text-gray-600'
                                        : 'text-black/40'
                                } />
                                <span>{stat.label}</span>
                                <span className={activeTab === stat.id ? 'opacity-80' : 'text-black/30'}>{stat.value}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex-1" />

                    {/* Search */}
                    <div className="relative w-64">
                        <HugeiconsIcon icon={Search01Icon} size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black/30" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={filters.search}
                            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                            className="w-full bg-gray-50 border border-black/10 rounded-lg pl-8 pr-3 py-1.5 text-[12px] placeholder:text-black/30 focus:outline-none focus:border-teal-500"
                        />
                    </div>

                    {/* Filter Button */}
                    <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                            showFilters || hasActiveFilters ? 'bg-teal-50 text-teal-700' : 'text-black/60 hover:bg-black/5'
                        }`}
                    >
                        <HugeiconsIcon icon={FilterHorizontalIcon} size={13} />
                        <span>Filter</span>
                        {hasActiveFilters && (
                            <span className="w-4 h-4 rounded-full bg-teal-600 text-white text-[9px] flex items-center justify-center ml-0.5">
                                {filters.outlets.length + filters.focusAreas.length + filters.relationshipStrength.length}
                            </span>
                        )}
                    </button>

                    {/* View Toggle */}
                    <div className="flex items-center gap-0.5 bg-gray-100 p-0.5 rounded-lg">
                        <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-black' : 'text-black/40'}`}>
                            <HugeiconsIcon icon={LayoutGridIcon} size={13} />
                        </button>
                        <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-black' : 'text-black/40'}`}>
                            <HugeiconsIcon icon={ListViewIcon} size={13} />
                        </button>
                    </div>

                    {/* Add Button */}
                    <button className="flex items-center gap-1 px-2.5 py-1.5 bg-teal-600 text-white rounded-lg text-[11px] font-medium hover:bg-teal-700 transition-colors">
                        <Plus size={13} />
                        <span>Add</span>
                    </button>
                </div>

                {/* Expandable Filters */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="pt-3 mt-3 border-t border-black/5">
                                <div className="flex items-start gap-8">
                                    <div>
                                        <div className="text-[10px] font-medium text-black/40 uppercase mb-2">Outlet</div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {OUTLETS.map(outlet => (
                                                <button
                                                    key={outlet}
                                                    onClick={() => toggleFilter('outlets', outlet)}
                                                    className={`text-[11px] px-2 py-1 rounded border transition-colors ${
                                                        filters.outlets.includes(outlet) ? 'bg-teal-50 border-teal-200 text-teal-700' : 'bg-white border-black/10 text-black/60 hover:border-black/20'
                                                    }`}
                                                >
                                                    {outlet}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-medium text-black/40 uppercase mb-2">Focus</div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {FOCUS_AREAS.map(focus => (
                                                <button
                                                    key={focus}
                                                    onClick={() => toggleFilter('focusAreas', focus)}
                                                    className={`text-[11px] px-2 py-1 rounded border transition-colors ${
                                                        filters.focusAreas.includes(focus) ? 'bg-teal-50 border-teal-200 text-teal-700' : 'bg-white border-black/10 text-black/60 hover:border-black/20'
                                                    }`}
                                                >
                                                    {focus}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-medium text-black/40 uppercase mb-2">Relationship</div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {RELATIONSHIP_STRENGTHS.map(strength => (
                                                <button
                                                    key={strength}
                                                    onClick={() => toggleFilter('relationshipStrength', strength)}
                                                    className={`text-[11px] px-2 py-1 rounded border transition-colors capitalize ${
                                                        filters.relationshipStrength.includes(strength) ? 'bg-teal-50 border-teal-200 text-teal-700' : 'bg-white border-black/10 text-black/60 hover:border-black/20'
                                                    }`}
                                                >
                                                    {strength}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {hasActiveFilters && (
                                        <div className="ml-auto">
                                            <button 
                                                onClick={() => setFilters({ search: '', outlets: [], focusAreas: [], relationshipStrength: [] })}
                                                className="text-[11px] text-black/40 hover:text-black flex items-center gap-1"
                                            >
                                                <X size={12} /> Clear
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-[12px] text-black/40 mb-3">
                        Showing {filteredJournalists.length} of {MOCK_JOURNALISTS.length}
                    </div>

                    {/* Grid View */}
                    {viewMode === 'grid' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                            {filteredJournalists.map((j, i) => (
                                <JournalistCard key={j.id} journalist={j} index={i} />
                            ))}
                        </div>
                    )}

                    {/* List View */}
                    {viewMode === 'list' && (
                        <div className="bg-white rounded-xl border border-black/5 overflow-hidden">
                            {filteredJournalists.map((j, i) => (
                                <ListItem key={j.id} journalist={j} index={i} />
                            ))}
                        </div>
                    )}

                    {!filteredJournalists.length && (
                        <div className="text-center py-16">
                            <HugeiconsIcon icon={Search01Icon} size={32} className="text-black/20 mx-auto mb-3" />
                            <h3 className="font-serif text-lg mb-1">No journalists found</h3>
                            <p className="text-black/50 text-[13px]">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
