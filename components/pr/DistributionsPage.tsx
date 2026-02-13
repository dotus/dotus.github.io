import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    ArrowLeft01Icon,
    ArrowRight02Icon,
    Clock01Icon,
    CheckmarkCircle02Icon,
    File01Icon,
    LinkSquare02Icon,
} from '@hugeicons/core-free-icons';
import { 
    Send, Clock, CheckCircle2, Mail, User, Eye, MessageCircle,
    Filter, Download, MoreVertical, Search, Calendar, Tag, FileText, Flame
} from 'lucide-react';
import { 
    OutreachCampaign, 
    Quest, 
    JournalistContact,
    MOCK_QUESTS,
    getOutreachStorageKey,
    TypeBadge,
    PriorityBadge 
} from './StatsOverview';

interface DistributionWithQuest extends OutreachCampaign {
    questId: number;
    questTitle: string;
    questType: Quest['type'];
    questSynopsis?: string;
    questAuthor?: string;
    questAuthorRole?: string;
    questDeadline?: string;
    questDeadlineType?: Quest['deadlineType'];
    questPriority?: Quest['priority'];
    questTags?: string[];
    questStatus?: Quest['status'];
}

interface DistributionStats {
    total: number;
    sent: number;
    scheduled: number;
    draft: number;
    totalJournalists: number;
    totalOpened: number;
    totalResponses: number;
}

interface DistributionsPageProps {
    onNavigateToQuest?: (quest: Quest) => void;
}

const getStatusIcon = (status: OutreachCampaign['status'], size = 16) => {
    switch (status) {
        case 'sent':
            return <Send size={size} className="text-teal-600" />;
        case 'scheduled':
            return <HugeiconsIcon icon={Clock01Icon} size={size} className="text-amber-600" />;
        case 'draft':
            return <HugeiconsIcon icon={File01Icon} size={size} className="text-gray-400" />;
        default:
            return null;
    }
};

const getStatusColor = (status: OutreachCampaign['status']) => {
    switch (status) {
        case 'sent':
            return 'bg-teal-50 text-teal-700 border-teal-100';
        case 'scheduled':
            return 'bg-amber-50 text-amber-700 border-amber-100';
        case 'draft':
            return 'bg-gray-100 text-gray-600 border-gray-200';
        default:
            return 'bg-gray-100 text-gray-600 border-gray-200';
    }
};

const getJournalistStatusIcon = (status: JournalistContact['status'], size = 14) => {
    switch (status) {
        case 'opened':
            return <Eye size={size} className="text-blue-500" />;
        case 'responded':
            return <MessageCircle size={size} className="text-emerald-500" />;
        case 'bounced':
            return <Mail size={size} className="text-red-500" />;
        default:
            return <Clock size={size} className="text-gray-400" />;
    }
};

const getJournalistStatusColor = (status: JournalistContact['status']) => {
    switch (status) {
        case 'opened':
            return 'text-blue-600 bg-blue-50 border-blue-100';
        case 'responded':
            return 'text-emerald-600 bg-emerald-50 border-emerald-100';
        case 'bounced':
            return 'text-red-600 bg-red-50 border-red-100';
        default:
            return 'text-gray-600 bg-gray-50 border-gray-200';
    }
};

const getJournalistStatusLabel = (status: JournalistContact['status']) => {
    switch (status) {
        case 'opened':
            return 'Opened';
        case 'responded':
            return 'Responded';
        case 'bounced':
            return 'Bounced';
        default:
            return 'Pending';
    }
};

const getDeadlineTypeColor = (type?: Quest['deadlineType']) => {
    switch (type) {
        case 'embargo':
            return 'text-violet-600 bg-violet-50 border-violet-100';
        case 'launch':
            return 'text-emerald-600 bg-emerald-50 border-emerald-100';
        case 'internal':
            return 'text-amber-600 bg-amber-50 border-amber-100';
        default:
            return 'text-gray-600 bg-gray-50 border-gray-200';
    }
};

const getDeadlineTypeLabel = (type?: Quest['deadlineType']) => {
    switch (type) {
        case 'embargo':
            return 'Embargo';
        case 'launch':
            return 'Launch';
        case 'internal':
            return 'Internal';
        default:
            return 'Deadline';
    }
};

export const DistributionsPage: React.FC<DistributionsPageProps> = ({ onNavigateToQuest }) => {
    const [distributions, setDistributions] = useState<DistributionWithQuest[]>([]);
    const [selectedDistribution, setSelectedDistribution] = useState<DistributionWithQuest | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'sent' | 'scheduled' | 'draft'>('all');
    const [expandedJournalist, setExpandedJournalist] = useState<number | null>(null);
    const [stats, setStats] = useState<DistributionStats>({
        total: 0,
        sent: 0,
        scheduled: 0,
        draft: 0,
        totalJournalists: 0,
        totalOpened: 0,
        totalResponses: 0,
    });

    // Load all distributions from sessionStorage
    useEffect(() => {
        const loadedDistributions: DistributionWithQuest[] = [];
        
        MOCK_QUESTS.forEach(quest => {
            const storageKey = getOutreachStorageKey(quest.id);
            const stored = sessionStorage.getItem(storageKey);
            
            if (stored) {
                try {
                    const campaign: OutreachCampaign = JSON.parse(stored);
                    loadedDistributions.push({
                        ...campaign,
                        questId: quest.id,
                        questTitle: quest.title,
                        questType: quest.type,
                        questSynopsis: quest.synopsis,
                        questAuthor: quest.author,
                        questAuthorRole: quest.authorRole,
                        questDeadline: quest.deadline,
                        questDeadlineType: quest.deadlineType,
                        questPriority: quest.priority,
                        questTags: quest.tags,
                        questStatus: quest.status,
                    });
                } catch {
                    // Ignore parse errors
                }
            }
        });

        // Add some mock distributions for demo if none exist
        if (loadedDistributions.length === 0) {
            const quest1 = MOCK_QUESTS.find(q => q.id === 1);
            const quest5 = MOCK_QUESTS.find(q => q.id === 5);
            
            loadedDistributions.push(
                {
                    id: 'campaign_1',
                    questId: 1,
                    questTitle: quest1?.title || 'Series B Funding Announcement',
                    questType: quest1?.type || 'Press Release',
                    questSynopsis: quest1?.synopsis,
                    questAuthor: quest1?.author,
                    questAuthorRole: quest1?.authorRole,
                    questDeadline: quest1?.deadline,
                    questDeadlineType: quest1?.deadlineType,
                    questPriority: quest1?.priority,
                    questTags: quest1?.tags,
                    questStatus: quest1?.status,
                    status: 'sent',
                    sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                    sentBy: 'Mithil',
                    journalists: [
                        { id: 1, name: 'Mike Butcher', outlet: 'TechCrunch', email: 'mike@techcrunch.com', focus: 'Startups, Europe', status: 'opened', openedAt: '2h ago' },
                        { id: 2, name: 'Alex Konrad', outlet: 'Forbes', email: 'alex.konrad@forbes.com', focus: 'VC, Cloud', status: 'responded', respondedAt: '1h ago' },
                        { id: 3, name: 'Casey Newton', outlet: 'Platformer', email: 'casey@platformer.news', focus: 'Social Media', status: 'pending' },
                    ],
                    pitchContent: '',
                    subject: 'Exclusive: Series B Funding Announcement',
                    openRate: 67,
                    responseCount: 1,
                },
                {
                    id: 'campaign_2',
                    questId: 5,
                    questTitle: quest5?.title || 'Product Launch V3',
                    questType: quest5?.type || 'Blog Post',
                    questSynopsis: quest5?.synopsis,
                    questAuthor: quest5?.author,
                    questAuthorRole: quest5?.authorRole,
                    questDeadline: quest5?.deadline,
                    questDeadlineType: quest5?.deadlineType,
                    questPriority: quest5?.priority,
                    questTags: quest5?.tags,
                    questStatus: quest5?.status,
                    status: 'scheduled',
                    sentAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                    sentBy: 'Sarah',
                    journalists: [
                        { id: 4, name: 'Kara Swisher', outlet: 'Pivot / NYMag', email: 'kara@nymag.com', focus: 'Tech, Business', status: 'pending' },
                        { id: 5, name: 'Ryan Lawler', outlet: 'TechCrunch', email: 'ryan@techcrunch.com', focus: 'AI, Enterprise', status: 'pending' },
                        { id: 6, name: 'Ingrid Lunden', outlet: 'TechCrunch', email: 'ingrid@techcrunch.com', focus: 'Funding, Europe', status: 'pending' },
                        { id: 7, name: 'Natasha Mascarenhas', outlet: 'TechCrunch', email: 'natasha@techcrunch.com', focus: 'Startups, VC', status: 'pending' },
                    ],
                    pitchContent: '',
                    subject: 'Embargo: Product Launch V3',
                }
            );
        }

        setDistributions(loadedDistributions);
        calculateStats(loadedDistributions);
    }, []);

    const calculateStats = (dists: DistributionWithQuest[]) => {
        const stats: DistributionStats = {
            total: dists.length,
            sent: dists.filter(d => d.status === 'sent').length,
            scheduled: dists.filter(d => d.status === 'scheduled').length,
            draft: dists.filter(d => d.status === 'draft').length,
            totalJournalists: dists.reduce((acc, d) => acc + d.journalists.length, 0),
            totalOpened: dists.reduce((acc, d) => acc + d.journalists.filter(j => j.status === 'opened' || j.status === 'responded').length, 0),
            totalResponses: dists.reduce((acc, d) => acc + d.journalists.filter(j => j.status === 'responded').length, 0),
        };
        setStats(stats);
    };

    const filteredDistributions = distributions.filter(dist => {
        const matchesSearch = dist.questTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             dist.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             dist.journalists.some(j => j.name.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || dist.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return 'Not set';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getRelativeTime = (dateStr?: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = date.getTime() - now.getTime();
        const diffHrs = Math.round(diffMs / (1000 * 60 * 60));
        const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffMs < 0) {
            if (diffHrs > -24) return `${Math.abs(diffHrs)}h ago`;
            return `${Math.abs(diffDays)}d ago`;
        }
        if (diffHrs < 24) return `in ${diffHrs}h`;
        return `in ${diffDays}d`;
    };

    const handleViewQuest = (dist: DistributionWithQuest) => {
        if (!onNavigateToQuest) return;
        
        const quest: Quest = {
            id: dist.questId,
            title: dist.questTitle,
            synopsis: dist.questSynopsis || '',
            type: dist.questType,
            status: dist.questStatus || 'ready',
            author: dist.questAuthor || 'Unknown',
            authorRole: dist.questAuthorRole || '',
            updated: '',
            deadline: dist.questDeadline,
            deadlineType: dist.questDeadlineType,
            priority: dist.questPriority,
            tags: dist.questTags || [],
            emailDL: [],
            uniqueEmail: '',
            outreachCampaign: {
                id: dist.id,
                status: dist.status,
                sentAt: dist.sentAt,
                sentBy: dist.sentBy,
                journalists: dist.journalists,
                pitchContent: dist.pitchContent,
                subject: dist.subject,
                openRate: dist.openRate,
                responseCount: dist.responseCount,
            },
        };
        
        onNavigateToQuest(quest);
    };

    // Detail View
    if (selectedDistribution) {
        const openedCount = selectedDistribution.journalists.filter(j => j.status === 'opened' || j.status === 'responded').length;
        const respondedCount = selectedDistribution.journalists.filter(j => j.status === 'responded').length;
        const openRate = selectedDistribution.journalists.length > 0 
            ? Math.round((openedCount / selectedDistribution.journalists.length) * 100) 
            : 0;

        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full flex flex-col bg-[#FAF9F6]"
            >
                {/* Header */}
                <div className="h-16 border-b border-black/5 bg-white px-6 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setSelectedDistribution(null)}
                            className="p-2 hover:bg-black/[0.03] rounded-lg transition-colors"
                        >
                            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} className="text-black/40" />
                        </button>
                        <div className="h-6 w-px bg-black/10" />
                        <div>
                            <h1 className="font-serif text-lg font-medium">{selectedDistribution.questTitle}</h1>
                            <p className="text-[12px] text-black/50">{selectedDistribution.subject}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => handleViewQuest(selectedDistribution)}
                            className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
                        >
                            <HugeiconsIcon icon={LinkSquare02Icon} size={16} />
                            View Quest
                        </button>
                        <span className={`text-[11px] px-3 py-1.5 rounded-full border ${getStatusColor(selectedDistribution.status)}`}>
                            {selectedDistribution.status.charAt(0).toUpperCase() + selectedDistribution.status.slice(1)}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-4xl mx-auto p-8">
                        {/* Quest Info Card */}
                        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 mb-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-medium">
                                        {selectedDistribution.questAuthor?.[0] || '?'}
                                    </div>
                                    <div>
                                        <div className="font-medium text-[14px]">{selectedDistribution.questAuthor}</div>
                                        <div className="text-[12px] text-black/50">{selectedDistribution.questAuthorRole}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {selectedDistribution.questPriority === 'high' && (
                                        <span className="text-[10px] px-2 py-1 rounded border bg-red-50 text-red-700 border-red-100 flex items-center gap-1">
                                            <Flame size={10} className="fill-current" />
                                            Hot
                                        </span>
                                    )}
                                    <span className="text-[10px] px-2 py-1 rounded border bg-gray-100 text-gray-700 border-gray-200">
                                        {selectedDistribution.questType}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Synopsis */}
                            <p className="text-[14px] text-black/70 leading-relaxed mb-4">
                                {selectedDistribution.questSynopsis}
                            </p>
                            
                            {/* Tags & Deadline */}
                            <div className="flex items-center flex-wrap gap-3 pt-4 border-t border-black/5">
                                {selectedDistribution.questDeadline && (
                                    <span className={`text-[11px] px-2.5 py-1 rounded-md border flex items-center gap-1.5 ${getDeadlineTypeColor(selectedDistribution.questDeadlineType)}`}>
                                        <Calendar size={12} />
                                        {getDeadlineTypeLabel(selectedDistribution.questDeadlineType)}: {selectedDistribution.questDeadline}
                                    </span>
                                )}
                                {selectedDistribution.questTags?.map(tag => (
                                    <span key={tag} className="text-[11px] text-black/50 bg-black/[0.03] px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Campaign Overview Card */}
                        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 mb-6">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                        selectedDistribution.status === 'sent' ? 'bg-emerald-100' :
                                        selectedDistribution.status === 'scheduled' ? 'bg-amber-100' :
                                        'bg-gray-100'
                                    }`}>
                                        {getStatusIcon(selectedDistribution.status, 24)}
                                    </div>
                                    <div>
                                        <h2 className="font-serif text-xl">{selectedDistribution.subject}</h2>
                                        <p className="text-[13px] text-black/50">
                                            {selectedDistribution.status === 'sent' 
                                                ? `Sent by ${selectedDistribution.sentBy} • ${formatDate(selectedDistribution.sentAt)}`
                                                : selectedDistribution.status === 'scheduled'
                                                ? `Scheduled for ${formatDate(selectedDistribution.sentAt)}`
                                                : 'Draft campaign'
                                            }
                                        </p>
                                    </div>
                                </div>
                                {selectedDistribution.status === 'sent' && (
                                    <div className="text-right">
                                        <div className="text-3xl font-serif font-medium text-emerald-700">{openRate}%</div>
                                        <div className="text-[12px] text-black/50">Open rate</div>
                                    </div>
                                )}
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-4 gap-4">
                                <div className="p-4 bg-gray-50 rounded-xl text-center">
                                    <div className="text-xl font-medium text-black">{selectedDistribution.journalists.length}</div>
                                    <div className="text-[11px] text-black/50">Journalists</div>
                                </div>
                                {selectedDistribution.status === 'sent' ? (
                                    <>
                                        <div className="p-4 bg-blue-50 rounded-xl text-center">
                                            <div className="text-xl font-medium text-blue-700">{openedCount}</div>
                                            <div className="text-[11px] text-blue-600/70">Opened</div>
                                        </div>
                                        <div className="p-4 bg-emerald-50 rounded-xl text-center">
                                            <div className="text-xl font-medium text-emerald-700">{respondedCount}</div>
                                            <div className="text-[11px] text-emerald-600/70">Responses</div>
                                        </div>
                                        <div className="p-4 bg-purple-50 rounded-xl text-center">
                                            <div className="text-xl font-medium text-purple-700">
                                                {selectedDistribution.journalists.length - openedCount}
                                            </div>
                                            <div className="text-[11px] text-purple-600/70">Pending</div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="p-4 bg-gray-50 rounded-xl text-center">
                                            <div className="text-xl font-medium text-black">-</div>
                                            <div className="text-[11px] text-black/50">Opened</div>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl text-center">
                                            <div className="text-xl font-medium text-black">-</div>
                                            <div className="text-[11px] text-black/50">Responses</div>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl text-center">
                                            <div className="text-xl font-medium text-black">-</div>
                                            <div className="text-[11px] text-black/50">Pending</div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Journalists List */}
                        <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between">
                                <h3 className="font-medium">Journalists</h3>
                                <span className="text-[12px] text-black/50">{selectedDistribution.journalists.length} contacts</span>
                            </div>
                            <div className="divide-y divide-black/5">
                                {selectedDistribution.journalists.map((journalist) => (
                                    <div 
                                        key={journalist.id}
                                        className="p-4 hover:bg-gray-50/50 transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium text-[14px]">{journalist.name}</div>
                                                <div className="flex items-center gap-2 text-[12px] text-black/50">
                                                    <span>{journalist.outlet}</span>
                                                    <span className="w-1 h-1 rounded-full bg-black/20" />
                                                    <span>{journalist.focus}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`text-[11px] px-2.5 py-1 rounded-md border flex items-center gap-1.5 ${getJournalistStatusColor(journalist.status)}`}>
                                                    {getJournalistStatusIcon(journalist.status)}
                                                    {getJournalistStatusLabel(journalist.status)}
                                                </span>
                                                {journalist.status !== 'pending' && (
                                                    <button 
                                                        onClick={() => setExpandedJournalist(expandedJournalist === journalist.id ? null : journalist.id)}
                                                        className="p-1.5 hover:bg-black/5 rounded-lg transition-colors"
                                                    >
                                                        <MoreVertical size={16} className="text-black/40" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        {expandedJournalist === journalist.id && (
                                            <motion.div 
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="mt-3 text-[13px] text-black/60"
                                            >
                                                {journalist.status === 'opened' && journalist.openedAt && (
                                                    <p>Opened {journalist.openedAt}</p>
                                                )}
                                                {journalist.status === 'responded' && journalist.respondedAt && (
                                                    <p>Responded {journalist.respondedAt}</p>
                                                )}
                                                <p className="mt-1 text-black/40">{journalist.email}</p>
                                            </motion.div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pitch Preview */}
                        {selectedDistribution.pitchContent && (
                            <div className="mt-6 bg-white rounded-2xl border border-black/5 shadow-sm p-6">
                                <h3 className="font-medium mb-4">Pitch Content</h3>
                                <div className="bg-gray-50 rounded-xl p-4 text-[14px] text-black/70 whitespace-pre-wrap font-mono">
                                    {selectedDistribution.pitchContent}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        );
    }

    // List View
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full overflow-y-auto"
        >
            <div className="max-w-[1400px] mx-auto p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-serif text-3xl mb-2">Distributions</h1>
                    <p className="text-black/50">Manage outreach campaigns across all quests</p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-6 gap-4 mb-8">
                    <div className="bg-white rounded-xl border border-black/5 p-4 shadow-sm">
                        <div className="text-2xl font-serif font-medium text-black">{stats.total}</div>
                        <div className="text-[12px] text-black/50">Total Campaigns</div>
                    </div>
                    <div className="bg-white rounded-xl border border-black/5 p-4 shadow-sm">
                        <div className="text-2xl font-serif font-medium text-teal-700">{stats.sent}</div>
                        <div className="text-[12px] text-black/50">Sent</div>
                    </div>
                    <div className="bg-white rounded-xl border border-black/5 p-4 shadow-sm">
                        <div className="text-2xl font-serif font-medium text-amber-700">{stats.scheduled}</div>
                        <div className="text-[12px] text-black/50">Scheduled</div>
                    </div>
                    <div className="bg-white rounded-xl border border-black/5 p-4 shadow-sm">
                        <div className="text-2xl font-serif font-medium text-gray-600">{stats.draft}</div>
                        <div className="text-[12px] text-black/50">Drafts</div>
                    </div>
                    <div className="bg-white rounded-xl border border-black/5 p-4 shadow-sm">
                        <div className="text-2xl font-serif font-medium text-blue-700">{stats.totalOpened}</div>
                        <div className="text-[12px] text-black/50">Total Opens</div>
                    </div>
                    <div className="bg-white rounded-xl border border-black/5 p-4 shadow-sm">
                        <div className="text-2xl font-serif font-medium text-emerald-700">{stats.totalResponses}</div>
                        <div className="text-[12px] text-black/50">Responses</div>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 relative max-w-md">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
                        <input 
                            type="text" 
                            placeholder="Search campaigns, subjects, or journalists..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-black/10 rounded-xl pl-12 pr-4 py-3 text-[14px] placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/20"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter size={18} className="text-black/40" />
                        {(['all', 'sent', 'scheduled', 'draft'] as const).map(status => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-all ${
                                    statusFilter === status 
                                        ? 'bg-teal-600 text-white' 
                                        : 'bg-white border border-black/10 text-black/60 hover:text-black hover:border-black/20'
                                }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Distributions List */}
                {filteredDistributions.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-black/5 p-16 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                            <Mail size={28} className="text-gray-400" />
                        </div>
                        <h3 className="font-serif text-xl mb-2">No campaigns yet</h3>
                        <p className="text-black/50 text-[14px] max-w-md mx-auto">
                            Create outreach campaigns from your quests to pitch to journalists. They will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredDistributions.map((dist, index) => {
                            const openedCount = dist.journalists.filter(j => j.status === 'opened' || j.status === 'responded').length;
                            const respondedCount = dist.journalists.filter(j => j.status === 'responded').length;
                            const openRate = dist.journalists.length > 0 
                                ? Math.round((openedCount / dist.journalists.length) * 100) 
                                : 0;

                            return (
                                <motion.button
                                    key={dist.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => setSelectedDistribution(dist)}
                                    className="w-full bg-white rounded-xl border border-black/5 shadow-sm p-5 hover:shadow-md hover:border-black/10 transition-all text-left group"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                                                dist.status === 'sent' ? 'bg-emerald-100' :
                                                dist.status === 'scheduled' ? 'bg-amber-100' :
                                                'bg-gray-100'
                                            }`}>
                                                {getStatusIcon(dist.status, 20)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="font-medium text-[15px] group-hover:text-teal-600 transition-colors">
                                                        {dist.questTitle}
                                                    </h3>
                                                    <span className="text-[10px] px-2 py-0.5 rounded border bg-gray-100 text-gray-600 border-gray-200">
                                                        {dist.questType}
                                                    </span>
                                                    {dist.questPriority === 'high' && (
                                                        <span className="text-[10px] px-2 py-0.5 rounded border bg-red-50 text-red-700 border-red-100 flex items-center gap-1">
                                                            <Flame size={10} className="fill-current" />
                                                            Hot
                                                        </span>
                                                    )}
                                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusColor(dist.status)}`}>
                                                        {dist.status.charAt(0).toUpperCase() + dist.status.slice(1)}
                                                    </span>
                                                </div>
                                                {/* Synopsis preview */}
                                                {dist.questSynopsis && (
                                                    <p className="text-[13px] text-black/50 mb-2 line-clamp-1 max-w-2xl">
                                                        {dist.questSynopsis}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-4 text-[12px] text-black/40">
                                                    <span className="flex items-center gap-1.5">
                                                        <User size={14} />
                                                        {dist.journalists.length} journalists
                                                    </span>
                                                    {dist.status === 'sent' && (
                                                        <>
                                                            <span className="flex items-center gap-1.5">
                                                                <Eye size={14} className="text-blue-500" />
                                                                {openedCount} opened
                                                            </span>
                                                            <span className="flex items-center gap-1.5">
                                                                <MessageCircle size={14} className="text-emerald-500" />
                                                                {respondedCount} responses
                                                            </span>
                                                            <span className="text-emerald-600 font-medium">{openRate}% open rate</span>
                                                        </>
                                                    )}
                                                    {dist.status === 'scheduled' && (
                                                        <span className="flex items-center gap-1.5 text-amber-600">
                                                            <Calendar size={14} />
                                                            Sending {getRelativeTime(dist.sentAt)}
                                                        </span>
                                                    )}
                                                    {dist.status === 'sent' && (
                                                        <span>Sent {getRelativeTime(dist.sentAt)}</span>
                                                    )}
                                                    {/* Show deadline if exists */}
                                                    {dist.questDeadline && (
                                                        <span className={`flex items-center gap-1 ${
                                                            dist.questDeadlineType === 'embargo' ? 'text-violet-600' : 'text-black/40'
                                                        }`}>
                                                            <Calendar size={12} />
                                                            {dist.questDeadlineType === 'embargo' ? 'Embargo: ' : ''}
                                                            {dist.questDeadline}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <HugeiconsIcon 
                                                icon={ArrowRight02Icon} 
                                                size={18} 
                                                className="text-black/20 group-hover:text-teal-600 transition-colors" 
                                            />
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                )}
            </div>
        </motion.div>
    );
};
