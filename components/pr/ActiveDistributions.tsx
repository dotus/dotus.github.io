import React, { useState, useEffect } from 'react';
import { Send, Clock, CheckCircle2, Eye } from 'lucide-react';
import { MOCK_QUESTS, getOutreachStorageKey, OutreachCampaign } from './StatsOverview';

interface Distribution {
    id: number;
    questTitle: string;
    status: 'draft' | 'sent' | 'scheduled';
    journalistCount: number;
    openedCount: number;
    respondedCount: number;
    sentAt?: string;
}

const getStatusIcon = (status: Distribution['status']) => {
    switch (status) {
        case 'sent':
            return <Send size={14} className="text-teal-600" />;
        case 'scheduled':
            return <Clock size={14} className="text-amber-600" />;
        case 'draft':
            return <CheckCircle2 size={14} className="text-gray-400" />;
        default:
            return null;
    }
};

const getStatusLabel = (status: Distribution['status']) => {
    switch (status) {
        case 'sent':
            return 'Sent';
        case 'scheduled':
            return 'Scheduled';
        case 'draft':
            return 'Draft';
        default:
            return status;
    }
};

const getStatusColor = (status: Distribution['status']) => {
    switch (status) {
        case 'sent':
            return 'text-teal-700 bg-teal-50 border-teal-100';
        case 'scheduled':
            return 'text-amber-700 bg-amber-50 border-amber-100';
        case 'draft':
            return 'text-gray-600 bg-gray-100 border-gray-200';
        default:
            return 'text-gray-600 bg-gray-100 border-gray-200';
    }
};

export const ActiveDistributions: React.FC = () => {
    const [distributions, setDistributions] = useState<Distribution[]>([]);

    useEffect(() => {
        // Load distributions from sessionStorage (set by OutreachComposer)
        const loadedDistributions: Distribution[] = [];
        
        MOCK_QUESTS.forEach(quest => {
            const storageKey = getOutreachStorageKey(quest.id);
            const stored = sessionStorage.getItem(storageKey);
            if (stored) {
                try {
                    const campaign: OutreachCampaign = JSON.parse(stored);
                    const openedCount = campaign.journalists.filter(j => j.status === 'opened' || j.status === 'responded').length;
                    const respondedCount = campaign.journalists.filter(j => j.status === 'responded').length;
                    
                    loadedDistributions.push({
                        id: quest.id,
                        questTitle: quest.title,
                        status: campaign.status,
                        journalistCount: campaign.journalists.length,
                        openedCount,
                        respondedCount,
                        sentAt: campaign.sentAt 
                            ? new Date(campaign.sentAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                            : undefined,
                    });
                } catch {
                    // Ignore parse errors
                }
            }
        });

        // Add some default mock distributions if none exist
        if (loadedDistributions.length === 0) {
            loadedDistributions.push(
                {
                    id: 1,
                    questTitle: MOCK_QUESTS[0]?.title || 'Expansion Announcement',
                    status: 'sent',
                    journalistCount: 5,
                    openedCount: 3,
                    respondedCount: 1,
                    sentAt: '2h ago',
                },
                {
                    id: 5,
                    questTitle: MOCK_QUESTS[4]?.title || 'Product Launch V3',
                    status: 'scheduled',
                    journalistCount: 8,
                    openedCount: 0,
                    respondedCount: 0,
                    sentAt: 'Tomorrow',
                }
            );
        }

        setDistributions(loadedDistributions);
    }, []);

    const activeCount = distributions.filter(d => d.status === 'sent' || d.status === 'scheduled').length;

    return (
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-black/5 flex items-center justify-between">
                <h4 className="text-sm font-medium">Active Distributions</h4>
                {activeCount > 0 && (
                    <span className="text-[10px] font-medium bg-teal-600 text-white px-2 py-0.5 rounded-full">
                        {activeCount}
                    </span>
                )}
            </div>
            <div className="p-2">
                {distributions.length === 0 ? (
                    <div className="p-4 text-center text-black/40">
                        <p className="text-[13px]">No active distributions</p>
                        <p className="text-[11px] mt-1">Create an outreach campaign from a quest</p>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {distributions.map((dist) => (
                            <button
                                key={dist.id}
                                className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group text-left"
                            >
                                <div className="mt-0.5">
                                    {getStatusIcon(dist.status)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-sm font-medium text-black truncate">
                                            {dist.questTitle}
                                        </span>
                                        <span className={`text-[9px] px-2 py-0.5 rounded-full border shrink-0 ${getStatusColor(dist.status)}`}>
                                            {getStatusLabel(dist.status)}
                                        </span>
                                    </div>
                                    
                                    {dist.status === 'sent' ? (
                                        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-black/50">
                                            <span className="flex items-center gap-1">
                                                <Eye size={11} />
                                                {dist.openedCount} opened
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <CheckCircle2 size={11} />
                                                {dist.respondedCount} responses
                                            </span>
                                            <span className="text-black/30">{dist.sentAt}</span>
                                        </div>
                                    ) : dist.status === 'scheduled' ? (
                                        <p className="text-[11px] text-amber-600 mt-1">Sending {dist.sentAt}</p>
                                    ) : (
                                        <p className="text-[11px] text-black/40 mt-1">{dist.journalistCount} journalists selected</p>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
