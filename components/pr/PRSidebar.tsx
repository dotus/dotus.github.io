import React, { useState, useMemo } from 'react';
import { 
    ChevronLeft, 
    ChevronRight, 
    ScrollText, 
    CalendarDays, 
    Radio, 
    Flame, 
    Clock,
    Send,
    ChevronDown,
    ChevronUp,
    Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CayblesLogo } from '../ui/CayblesLogo';
import { Quest, getOutreachStorageKey, OutreachCampaign, MOCK_CALENDAR_EVENTS, CalendarEvent } from './StatsOverview';

interface PRSidebarProps {
    quests: Quest[];
    isCollapsed: boolean;
    onToggle: () => void;
    onQuestClick: (quest: Quest) => void;
    onNavigateToDistributions: () => void;
    selectedQuestId?: number | null;
}

interface ActiveDistribution {
    id: number;
    questTitle: string;
    status: 'sent' | 'scheduled' | 'draft';
    stats: { opened: number; total: number; responses: number };
}

// Group quests by status
const STATUS_LABELS: Record<string, string> = {
    draft: 'Draft',
    review: 'In Review',
    ready: 'Ready',
    live: 'Published',
};

const STATUS_ORDER = ['draft', 'review', 'ready', 'live'];

export const PRSidebar: React.FC<PRSidebarProps> = ({
    quests,
    isCollapsed,
    onToggle,
    onQuestClick,
    onNavigateToDistributions,
    selectedQuestId,
}) => {
    const [expandedSections, setExpandedSections] = useState({
        quests: true,
        timeline: true,
        distributions: true,
    });

    // Load active distributions from sessionStorage
    const activeDistributions = useMemo(() => {
        const distributions: ActiveDistribution[] = [];
        quests.forEach(quest => {
            const storageKey = getOutreachStorageKey(quest.id);
            const stored = sessionStorage.getItem(storageKey);
            if (stored) {
                try {
                    const campaign: OutreachCampaign = JSON.parse(stored);
                    if (campaign.status === 'sent' || campaign.status === 'scheduled') {
                        const opened = campaign.journalists.filter(j => 
                            j.status === 'opened' || j.status === 'responded'
                        ).length;
                        const responded = campaign.journalists.filter(j => 
                            j.status === 'responded'
                        ).length;
                        distributions.push({
                            id: quest.id,
                            questTitle: quest.title,
                            status: campaign.status,
                            stats: { opened, total: campaign.journalists.length, responses: responded },
                        });
                    }
                } catch { }
            }
        });
        // Add mock distributions if none exist
        if (distributions.length === 0) {
            distributions.push(
                { id: 101, questTitle: 'Series B Funding', status: 'sent', stats: { opened: 3, total: 5, responses: 1 } },
                { id: 102, questTitle: 'Product Launch V3', status: 'scheduled', stats: { opened: 0, total: 8, responses: 0 } }
            );
        }
        return distributions;
    }, [quests]);

    // Group quests by status
    const groupedQuests = useMemo(() => {
        const grouped: Record<string, Quest[]> = {};
        STATUS_ORDER.forEach(status => {
            grouped[status] = quests.filter(q => q.status === status);
        });
        return grouped;
    }, [quests]);

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const today = new Date('2026-03-12'); // March to match quest deadlines
    const upcomingEvents = MOCK_CALENDAR_EVENTS.filter(e => new Date(e.date) >= today).slice(0, 3);

    return (
        <motion.div
            initial={false}
            animate={{ width: isCollapsed ? 64 : 280 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="h-full bg-white border-r border-black/[0.06] flex flex-col shrink-0 relative z-20"
        >
            {/* Toggle Button */}
            <button
                onClick={onToggle}
                className="absolute -right-3 top-6 w-6 h-6 bg-white border border-black/[0.08] rounded-full shadow-sm flex items-center justify-center text-black/40 hover:text-teal-600 hover:border-teal-200 transition-all z-50"
            >
                {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
            </button>

            {/* Header - Smooth transition between states */}
            <div className="h-[60px] border-b border-black/[0.04] flex items-center px-4 relative overflow-hidden">
                {/* Expanded Logo */}
                <motion.div
                    initial={false}
                    animate={{
                        opacity: isCollapsed ? 0 : 1,
                        x: isCollapsed ? -20 : 0,
                    }}
                    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute inset-0 flex items-center justify-between px-4"
                    style={{ pointerEvents: isCollapsed ? 'none' : 'auto' }}
                >
                    <CayblesLogo size="full" theme="dark" height={28} />
                    <span className="text-[11px] text-black/40 font-medium">{quests.length}</span>
                </motion.div>

                {/* Collapsed Logo */}
                <motion.div
                    initial={false}
                    animate={{
                        opacity: isCollapsed ? 1 : 0,
                        x: isCollapsed ? 0 : 20,
                    }}
                    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ pointerEvents: isCollapsed ? 'auto' : 'none' }}
                >
                    <CayblesLogo size="small" theme="colored" height={28} />
                </motion.div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto py-3">
                {/* Quests Section - Organized by status headers */}
                <div className="mb-1">
                    <SectionHeader
                        icon={<ScrollText size={14} />}
                        title="Quests"
                        count={quests.length}
                        isCollapsed={isCollapsed}
                        isExpanded={expandedSections.quests}
                        onToggle={() => toggleSection('quests')}
                        onAdd={() => {}}
                    />
                    
                    <AnimatePresence>
                        {!isCollapsed && expandedSections.quests && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <div className="px-2 space-y-3">
                                    {STATUS_ORDER.map(status => {
                                        const statusQuests = groupedQuests[status] || [];
                                        if (statusQuests.length === 0) return null;
                                        
                                        return (
                                            <div key={status} className="space-y-0.5">
                                                <div className="px-2.5 py-1">
                                                    <span className="text-[10px] font-medium text-black/40 uppercase tracking-wide">
                                                        {STATUS_LABELS[status]}
                                                    </span>
                                                </div>
                                                {statusQuests.slice(0, 3).map((quest) => (
                                                    <CompactQuestItem
                                                        key={quest.id}
                                                        quest={quest}
                                                        isSelected={selectedQuestId === quest.id}
                                                        onClick={() => onQuestClick(quest)}
                                                    />
                                                ))}
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Collapsed Quest Icons - simplified */}
                    {isCollapsed && (
                        <div className="px-2 space-y-0.5">
                            {quests.slice(0, 4).map((quest) => (
                                <button
                                    key={quest.id}
                                    onClick={() => onQuestClick(quest)}
                                    className={`w-full h-8 rounded-lg flex items-center justify-center transition-all ${
                                        selectedQuestId === quest.id 
                                            ? 'bg-teal-50 text-teal-600' 
                                            : 'hover:bg-gray-50 text-black/40 hover:text-black/60'
                                    }`}
                                    title={quest.title}
                                >
                                    <span className="text-[9px] font-medium truncate px-1">
                                        {quest.title.charAt(0)}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Divider */}
                {!isCollapsed && <div className="mx-3 my-2 border-t border-black/[0.04]" />}

                {/* Timeline Section - Condensed */}
                <div className="mb-1">
                    <SectionHeader
                        icon={<CalendarDays size={14} />}
                        title="Timeline"
                        count={upcomingEvents.length}
                        isCollapsed={isCollapsed}
                        isExpanded={expandedSections.timeline}
                        onToggle={() => toggleSection('timeline')}
                    />

                    <AnimatePresence>
                        {!isCollapsed && expandedSections.timeline && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <div className="px-2 space-y-0.5">
                                    {upcomingEvents.slice(0, 3).map((event) => {
                                        const eventDate = new Date(event.date);
                                        const daysDiff = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                                        
                                        return (
                                            <CompactTimelineItem
                                                key={event.id}
                                                event={event}
                                                eventDate={eventDate}
                                                daysDiff={daysDiff}
                                            />
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Collapsed Timeline Icons */}
                    {isCollapsed && (
                        <div className="px-2 space-y-0.5">
                            {upcomingEvents.slice(0, 3).map((event) => {
                                const eventDate = new Date(event.date);
                                const daysDiff = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                                const isUrgent = daysDiff <= 7;
                                return (
                                    <button
                                        key={event.id}
                                        className={`w-full h-8 rounded-lg flex items-center justify-center transition-all hover:bg-gray-50 ${
                                            isUrgent ? 'text-rose-500' : 'text-black/50'
                                        }`}
                                        title={event.questTitle}
                                    >
                                        <span className={`text-[10px] font-bold ${isUrgent ? 'text-rose-500' : ''}`}>
                                            {eventDate.getDate()}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Divider */}
                {!isCollapsed && <div className="mx-3 my-2 border-t border-black/[0.04]" />}

                {/* Active Distributions Section - Condensed */}
                <div>
                    <SectionHeader
                        icon={<Radio size={14} />}
                        title="Active"
                        count={activeDistributions.length}
                        isCollapsed={isCollapsed}
                        isExpanded={expandedSections.distributions}
                        onToggle={() => toggleSection('distributions')}
                    />

                    <AnimatePresence>
                        {!isCollapsed && expandedSections.distributions && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <div className="px-2 space-y-0.5">
                                    {activeDistributions.slice(0, 2).map((dist) => (
                                        <CompactDistributionItem
                                            key={dist.id}
                                            dist={dist}
                                            onNavigate={onNavigateToDistributions}
                                        />
                                    ))}
                                </div>
                                <button 
                                    onClick={onNavigateToDistributions}
                                    className="w-full mt-1 py-1.5 text-[10px] text-black/40 hover:text-teal-600 transition-colors"
                                >
                                    View all →
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Collapsed Distribution Icons */}
                    {isCollapsed && (
                        <div className="px-2 space-y-0.5">
                            {activeDistributions.slice(0, 2).map((dist) => (
                                <button
                                    key={dist.id}
                                    onClick={onNavigateToDistributions}
                                    className="w-full h-8 rounded-lg flex items-center justify-center transition-all hover:bg-gray-50 text-black/40 hover:text-black/60"
                                    title={dist.questTitle}
                                >
                                    {dist.status === 'sent' ? <Send size={13} /> : <Clock size={13} />}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="p-2 border-t border-black/[0.04]">
                {!isCollapsed ? (
                    <button className="w-full flex items-center justify-center gap-1.5 py-2 bg-gray-50 hover:bg-gray-100 text-black/60 hover:text-black rounded-lg transition-all text-[11px] font-medium">
                        <Plus size={13} />
                        New Quest
                    </button>
                ) : (
                    <button 
                        className="w-full h-8 flex items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100 text-black/40 hover:text-black transition-all"
                        title="New Quest"
                    >
                        <Plus size={15} />
                    </button>
                )}
            </div>
        </motion.div>
    );
};

// Helper Components

interface SectionHeaderProps {
    icon: React.ReactNode;
    title: string;
    count?: number;
    isCollapsed: boolean;
    isExpanded: boolean;
    onToggle: () => void;
    onAdd?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    icon,
    title,
    count,
    isCollapsed,
    isExpanded,
    onToggle,
}) => {
    if (isCollapsed) {
        return (
            <div className="px-2 py-1.5 flex justify-center">
                <div className="text-black/30">{icon}</div>
            </div>
        );
    }

    return (
        <button
            onClick={onToggle}
            className="w-full flex items-center justify-between px-3 py-1.5 text-black/50 hover:text-black transition-colors group"
        >
            <div className="flex items-center gap-1.5">
                <span className="text-black/40 group-hover:text-teal-600 transition-colors">{icon}</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider">{title}</span>
                {count !== undefined && count > 0 && (
                    <span className="text-[9px] px-1.5 py-0 rounded-full bg-gray-100 text-gray-500">
                        {count}
                    </span>
                )}
            </div>
            <span className="text-black/20">
                {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </span>
        </button>
    );
};

// Compact Quest Item - No status dot, just text
interface CompactQuestItemProps {
    quest: Quest;
    isSelected: boolean;
    onClick: () => void;
}

const CompactQuestItem: React.FC<CompactQuestItemProps> = ({ quest, isSelected, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left px-2.5 py-2 rounded-lg transition-all group flex items-center gap-2 ${
                isSelected 
                    ? 'bg-teal-50' 
                    : 'hover:bg-gray-50'
            }`}
        >
            <p className={`text-[12px] font-medium truncate flex-1 transition-colors ${
                isSelected ? 'text-teal-700' : 'text-gray-700 group-hover:text-teal-600'
            }`}>
                {quest.title}
            </p>
            {quest.priority === 'high' && (
                <Flame size={10} className="text-rose-400 fill-rose-400 shrink-0" />
            )}
        </button>
    );
};

// Compact Timeline Item - Countdown colored, date neutral
interface CompactTimelineItemProps {
    event: CalendarEvent;
    eventDate: Date;
    daysDiff: number;
}

const CompactTimelineItem: React.FC<CompactTimelineItemProps> = ({ event, eventDate, daysDiff }) => {
    const isUrgent = daysDiff <= 7;
    
    return (
        <button className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-gray-50 transition-all group flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gray-100 text-black/50 flex items-center justify-center shrink-0">
                <span className="text-[9px] font-bold">{eventDate.getDate()}</span>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-gray-700 truncate group-hover:text-teal-600 transition-colors">
                    {event.questTitle}
                </p>
            </div>
            {daysDiff <= 7 && (
                <span className="text-[9px] text-rose-500 font-medium shrink-0">
                    {daysDiff === 0 ? 'Today' : `${daysDiff}d`}
                </span>
            )}
        </button>
    );
};

// Compact Distribution Item - No colored badges
interface CompactDistributionItemProps {
    dist: { id: number; questTitle: string; status: string; stats: { opened: number; total: number } };
    onNavigate: () => void;
}

const CompactDistributionItem: React.FC<CompactDistributionItemProps> = ({ dist, onNavigate }) => {
    return (
        <button
            onClick={onNavigate}
            className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-gray-50 transition-all group flex items-center gap-2"
        >
            <div className="w-5 h-5 rounded-md bg-gray-100 text-black/40 flex items-center justify-center shrink-0">
                {dist.status === 'sent' ? <Send size={10} /> : <Clock size={10} />}
            </div>
            <p className="text-[12px] font-medium text-gray-700 truncate flex-1 group-hover:text-teal-600 transition-colors">
                {dist.questTitle}
            </p>
            {dist.status === 'sent' && (
                <span className="text-[10px] text-black/40 font-medium shrink-0">
                    {dist.stats.opened}/{dist.stats.total}
                </span>
            )}
        </button>
    );
};
