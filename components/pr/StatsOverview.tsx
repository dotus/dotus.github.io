import React from 'react';
import { FileText, Clock, CheckCircle2, Eye, Mail } from 'lucide-react';

export type FilterType = 'all' | 'draft' | 'ready' | 'live' | 'review';

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
    uniqueEmail: string;  // Unique email for this quest (e.g., series-b@andalso.co)
}

export const MOCK_QUESTS: Quest[] = [
    { 
        id: 1, 
        title: 'Series B Funding Announcement', 
        synopsis: '$45M Series B led by Andreessen Horowitz to accelerate AI infrastructure development and expand into European markets.',
        type: 'Press Release', 
        status: 'review', 
        author: 'Mithil', 
        authorRole: 'CEO',
        updated: '2h ago', 
        deadline: 'Jan 15, 9:00 AM',
        deadlineType: 'embargo',
        tags: ['Funding', 'Exclusive', 'TechCrunch'],
        priority: 'high',
        emailDL: ['investors@company.com', 'exec-team@company.com', 'pr@andalso.co'],
        uniqueEmail: 'series-b@andalso.co'
    },
    { 
        id: 2, 
        title: 'AI Policy Framework 2026', 
        synopsis: 'A comprehensive analysis of emerging AI regulations and how policy makers can balance innovation with safety concerns.',
        type: 'Blog Post', 
        status: 'draft', 
        author: 'Mithil', 
        authorRole: 'CEO',
        updated: '3h ago', 
        tags: ['Thought Leadership', 'Policy'],
        priority: 'high',
        emailDL: ['policy@company.com', 'content@andalso.co'],
        uniqueEmail: 'ai-policy@andalso.co'
    },
    { 
        id: 3, 
        title: 'Q1 Strategy Memo', 
        synopsis: 'Internal alignment document outlining key narratives, target outlets, and campaign timeline for first quarter media push.',
        type: 'Strategy Memo', 
        status: 'draft', 
        author: 'Sarah', 
        authorRole: 'Head of Comms',
        updated: '1d ago', 
        deadline: 'Jan 20',
        deadlineType: 'internal',
        tags: ['Internal', 'Q1 Planning'],
        priority: 'medium',
        emailDL: ['comms@company.com'],
        uniqueEmail: 'q1-strategy@andalso.co'
    },
    { 
        id: 4, 
        title: 'New CTO Appointment', 
        synopsis: 'Dr. Sarah Chen joins from Google DeepMind to lead our technical AI research division and expand engineering team.',
        type: 'Press Release', 
        status: 'ready', 
        author: 'John', 
        authorRole: 'VP People',
        updated: 'Yesterday', 
        deadline: 'Jan 18, 8:00 AM',
        deadlineType: 'embargo',
        tags: ['Hiring', 'Leadership'],
        priority: 'medium',
        emailDL: ['team@company.com', 'press@andalso.co'],
        uniqueEmail: 'cto-announcement@andalso.co'
    },
    { 
        id: 5, 
        title: 'Product Launch V3', 
        synopsis: 'Next-generation neural search capabilities with real-time visualization and enterprise-grade security features.',
        type: 'Blog Post', 
        status: 'ready', 
        author: 'Sarah', 
        authorRole: 'Head of Comms',
        updated: '2d ago', 
        deadline: 'Jan 22, 10:00 AM',
        deadlineType: 'launch',
        tags: ['Product', 'Launch'],
        priority: 'high',
        emailDL: ['product@company.com', 'customers@company.com', 'launch@andalso.co'],
        uniqueEmail: 'v3-launch@andalso.co'
    },
    { 
        id: 6, 
        title: 'Year in Review 2025', 
        synopsis: 'Reflecting on our biggest milestones: 3x team growth, Series A close, and 10M+ users reached.',
        type: 'Blog Post', 
        status: 'live', 
        author: 'Mithil', 
        authorRole: 'CEO',
        updated: '1w ago',
        tags: ['Annual', 'Recap'],
        emailDL: ['all@company.com'],
        uniqueEmail: 'year-review@andalso.co'
    },
    { 
        id: 7, 
        title: 'Seed Round Announcement', 
        synopsis: 'Initial $8M seed funding to build the foundation for democratizing AI-powered communications.',
        type: 'Press Release', 
        status: 'live', 
        author: 'Mithil', 
        authorRole: 'CEO',
        updated: '2w ago',
        tags: ['Archived', 'Funding'],
        emailDL: ['investors@company.com'],
        uniqueEmail: 'seed-round@andalso.co'
    },
    { 
        id: 8, 
        title: 'Partnership Press Release', 
        synopsis: 'Strategic partnership with Microsoft Azure to provide enterprise deployment options for our platform.',
        type: 'Press Release', 
        status: 'ready', 
        author: 'Sarah', 
        authorRole: 'Head of Comms',
        updated: '3d ago', 
        tags: ['Partnership', 'Enterprise'],
        priority: 'low',
        emailDL: ['partnerships@company.com', 'enterprise@andalso.co'],
        uniqueEmail: 'azure-partnership@andalso.co'
    },
];

interface Stat {
    key: FilterType;
    label: string;
    icon: React.ReactNode;
    getValue: (quests: Quest[]) => number;
    color: string;
}

const STATS: Stat[] = [
    {
        key: 'draft',
        label: 'Drafts',
        icon: <FileText size={16} strokeWidth={1.5} />,
        getValue: (quests) => quests.filter(d => d.status === 'draft').length,
        color: '#6B7280',
    },
    {
        key: 'review',
        label: 'In Review',
        icon: <Clock size={16} strokeWidth={1.5} />,
        getValue: (quests) => quests.filter(d => d.status === 'review').length,
        color: '#F59E0B',
    },
    {
        key: 'ready',
        label: 'Ready',
        icon: <CheckCircle2 size={16} strokeWidth={1.5} />,
        getValue: (quests) => quests.filter(d => d.status === 'ready').length,
        color: '#10B981',
    },
    {
        key: 'live',
        label: 'Published',
        icon: <Eye size={16} strokeWidth={1.5} />,
        getValue: (quests) => quests.filter(d => d.status === 'live').length,
        color: '#3B82F6',
    },
];

interface StatsOverviewProps {
    activeFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
    hidden?: boolean;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ activeFilter, onFilterChange, hidden = false }) => {
    if (hidden) return null;
    
    const handleClick = (key: FilterType) => {
        onFilterChange(activeFilter === key ? 'all' : key);
    };

    return (
        <div className="flex gap-3">
            {STATS.map((stat) => {
                const count = stat.getValue(MOCK_QUESTS);
                const isActive = activeFilter === stat.key;
                
                return (
                    <button
                        key={stat.key}
                        onClick={() => handleClick(stat.key)}
                        className={`
                            flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200
                            ${isActive 
                                ? 'bg-black border-black shadow-md' 
                                : 'bg-white border-black/5 hover:border-black/10 hover:shadow-sm'
                            }
                        `}
                    >
                        <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                            style={{ 
                                backgroundColor: isActive ? 'rgba(255,255,255,0.15)' : `${stat.color}15`,
                                color: isActive ? 'white' : stat.color,
                            }}
                        >
                            {stat.icon}
                        </div>
                        <div className="text-left">
                            <div className={`text-xl font-serif font-medium leading-none ${isActive ? 'text-white' : 'text-black'}`}>
                                {count}
                            </div>
                            <div className={`text-[11px] mt-0.5 ${isActive ? 'text-white/60' : 'text-black/40'}`}>
                                {stat.label}
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

export const filterQuests = (quests: Quest[], filter: FilterType): Quest[] => {
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

// Badge components for consistent styling
export const TypeBadge: React.FC<{ type: Quest['type'] }> = ({ type }) => {
    const styles: Record<Quest['type'], string> = {
        'Press Release': 'bg-blue-50 text-blue-700 border-blue-100',
        'Blog Post': 'bg-emerald-50 text-emerald-700 border-emerald-100',
        'Strategy Memo': 'bg-violet-50 text-violet-700 border-violet-100',
    };
    
    return (
        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md border ${styles[type]}`}>
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
                {display.map((email, i) => (
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
