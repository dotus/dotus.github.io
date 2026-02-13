import React, { useState, useEffect } from 'react';
import { Send, Clock, Eye, Linkedin, AtSign, Instagram, Users, TrendingUp, TrendingDown, FileText } from 'lucide-react';
import { MOCK_QUESTS, getOutreachStorageKey } from './StatsOverview';
import type { Quest, OutreachCampaign } from './StatsOverview';

interface TickerStat {
    id: string;
    label: string;
    value: string;
    change: string;
    changeType: 'up' | 'down' | 'neutral';
    icon: React.ReactNode;
}

const ACCENT_COLOR = '#EBA832';

// Calculate active distributions from all quests
const getActiveDistributionsCount = (): number => {
    let count = 0;
    MOCK_QUESTS.forEach(quest => {
        const storageKey = getOutreachStorageKey(quest.id);
        const stored = sessionStorage.getItem(storageKey);
        if (stored) {
            try {
                const campaign: OutreachCampaign = JSON.parse(stored);
                if (campaign.status === 'sent') {
                    count++;
                }
            } catch {
                // ignore
            }
        }
    });
    return count;
};

// Get pending for review count
const getPendingReviewCount = (): number => {
    return MOCK_QUESTS.filter(q => q.status === 'review').length;
};

export const SocialReachStats: React.FC<{ hidden?: boolean }> = ({ hidden = false }) => {
    const [activeDistributions, setActiveDistributions] = useState(0);
    const [pendingReview, setPendingReview] = useState(0);

    useEffect(() => {
        setActiveDistributions(getActiveDistributionsCount());
        setPendingReview(getPendingReviewCount());
        
        // Refresh every 5 seconds to catch new campaigns
        const interval = setInterval(() => {
            setActiveDistributions(getActiveDistributionsCount());
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);

    if (hidden) return null;

    const stats: TickerStat[] = [
        // Platform Stats
        {
            id: 'linkedin',
            label: 'LinkedIn Reach',
            value: '45.2K',
            change: '+18%',
            changeType: 'up',
            icon: <Linkedin size={12} strokeWidth={1.5} />,
        },
        {
            id: 'x',
            label: 'X Reach',
            value: '67.8K',
            change: '+8%',
            changeType: 'up',
            icon: <AtSign size={12} strokeWidth={1.5} />,
        },
        {
            id: 'instagram',
            label: 'Instagram Reach',
            value: '11.5K',
            change: '+24%',
            changeType: 'up',
            icon: <Instagram size={12} strokeWidth={1.5} />,
        },
        {
            id: 'linkedin-followers',
            label: 'LinkedIn Followers',
            value: '4.2K',
            change: '+156',
            changeType: 'up',
            icon: <Users size={12} strokeWidth={1.5} />,
        },
        // Workflow Stats
        {
            id: 'distributions',
            label: 'Active Distributions',
            value: activeDistributions.toString(),
            change: activeDistributions > 0 ? 'Live' : 'None',
            changeType: activeDistributions > 0 ? 'up' : 'neutral',
            icon: <Send size={12} strokeWidth={1.5} />,
        },
        {
            id: 'pending',
            label: 'Pending Review',
            value: pendingReview.toString(),
            change: pendingReview > 0 ? 'Needs attention' : 'All clear',
            changeType: pendingReview > 0 ? 'up' : 'neutral',
            icon: <Clock size={12} strokeWidth={1.5} />,
        },
        {
            id: 'impressions',
            label: 'Total Impressions',
            value: '124.5K',
            change: '+12.3%',
            changeType: 'up',
            icon: <Eye size={12} strokeWidth={1.5} />,
        },
        {
            id: 'drafts',
            label: 'Draft Quests',
            value: MOCK_QUESTS.filter(q => q.status === 'draft').length.toString(),
            change: 'In progress',
            changeType: 'neutral',
            icon: <FileText size={12} strokeWidth={1.5} />,
        },
    ];

    // Double for seamless loop
    const tickerStats = [...stats, ...stats];

    return (
        <div className="bg-black/[0.02] border-b border-black/5 overflow-hidden">
            <div className="flex items-center h-8">
                {/* Static Label */}
                <div 
                    className="shrink-0 px-3 h-full flex items-center gap-1.5 text-white text-[11px] font-medium z-10"
                    style={{ backgroundColor: ACCENT_COLOR }}
                >
                    <span className="font-serif">Live</span>
                    <span className="opacity-70">Stats</span>
                </div>
                
                {/* Scrolling Ticker */}
                <div className="flex-1 overflow-hidden relative">
                    <div className="flex animate-ticker hover:pause-animation">
                        {tickerStats.map((stat, idx) => (
                            <div 
                                key={`${stat.id}-${idx}`}
                                className="shrink-0 flex items-center gap-2 px-4 border-r border-black/5"
                            >
                                <span className="text-black/30">{stat.icon}</span>
                                <span className="text-black/40 text-[11px]">{stat.label}</span>
                                <span className="font-serif text-sm font-medium text-black">{stat.value}</span>
                                <span className={`text-[10px] font-medium flex items-center gap-0.5 ${
                                    stat.changeType === 'up' ? 'text-emerald-600' : 
                                    stat.changeType === 'down' ? 'text-red-500' : 
                                    'text-black/40'
                                }`}>
                                    {stat.changeType === 'up' && stat.change !== 'Live' && stat.change !== 'Needs attention' ? (
                                        <TrendingUp size={10} />
                                    ) : stat.changeType === 'down' ? (
                                        <TrendingDown size={10} />
                                    ) : null}
                                    {stat.change}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <style>{`
                @keyframes ticker {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .animate-ticker {
                    animation: ticker 30s linear infinite;
                }
                .animate-ticker:hover,
                .pause-animation {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
};

// Re-export from StatsOverview for convenience
export { MOCK_QUESTS, getOutreachStorageKey };
export type { Quest, OutreachCampaign };
