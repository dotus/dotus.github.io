import React, { useState, useEffect } from 'react';
import { 
    ChevronDown, ChevronUp, 
    Clock, Eye, MessageCircle, 
    AlertCircle, Lock
} from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    ArrowLeft01Icon,
    ArrowRight01Icon,
    ArrowRight02Icon,
    CheckmarkSquare03Icon,
    File01Icon,
} from '@hugeicons/core-free-icons';
import { Quest, OutreachCampaign, JournalistContact, getOutreachStorageKey } from './StatsOverview';

interface OutreachSectionProps {
    quest: Quest;
    onCampaignUpdate?: (campaign: OutreachCampaign | undefined) => void;
    onOpenComposer?: () => void;
}

export const OutreachSection: React.FC<OutreachSectionProps> = ({ 
    quest, 
    onCampaignUpdate,
    onOpenComposer
}) => {
    const [campaign, setCampaign] = useState<OutreachCampaign | undefined>(quest.outreachCampaign);
    const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
    const [expandedJournalist, setExpandedJournalist] = useState<number | null>(null);

    const isReady = quest.status === 'ready';
    const isLive = quest.status === 'live';

    // Load campaign from sessionStorage on mount
    useEffect(() => {
        const storageKey = getOutreachStorageKey(quest.id);
        const stored = sessionStorage.getItem(storageKey);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setCampaign(parsed);
            } catch {
                // Ignore parse errors
            }
        }
    }, [quest.id]);

    // Handle campaign updates from composer
    const handleCampaignUpdate = (newCampaign: OutreachCampaign | undefined) => {
        setCampaign(newCampaign);
        onCampaignUpdate?.(newCampaign);
    };

    const copyEmail = (email: string) => {
        navigator.clipboard.writeText(email);
        setCopiedEmail(email);
        setTimeout(() => setCopiedEmail(null), 2000);
    };

    const getStatusIcon = (status: JournalistContact['status']) => {
        switch (status) {
            case 'opened':
                return <Eye size={14} className="text-blue-500" />;
            case 'responded':
                return <MessageCircle size={14} className="text-emerald-500" />;
            case 'bounced':
                return <AlertCircle size={14} className="text-red-500" />;
            default:
                return <Clock size={14} className="text-gray-400" />;
        }
    };

    const getStatusLabel = (status: JournalistContact['status']) => {
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

    const getStatusColor = (status: JournalistContact['status']) => {
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

    // Campaign sent state
    if (campaign && campaign.status === 'sent') {
        const openedCount = campaign.journalists.filter(j => j.status === 'opened' || j.status === 'responded').length;
        const respondedCount = campaign.journalists.filter(j => j.status === 'responded').length;
        const openRate = campaign.journalists.length > 0 
            ? Math.round((openedCount / campaign.journalists.length) * 100) 
            : 0;

        return (
            <div className="space-y-4">
                {/* Campaign Status Header */}
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                <HugeiconsIcon icon={ArrowRight02Icon} size={20} className="text-emerald-600" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[13px] font-semibold text-emerald-700">Outreach Sent</span>
                                    <span className="text-[11px] text-emerald-600/70">
                                        {new Date(campaign.sentAt || '').toLocaleDateString('en-US', { 
                                            month: 'short', 
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                                <p className="text-[12px] text-emerald-600/80">
                                    Sent by {campaign.sentBy}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-serif font-medium text-emerald-700">{openRate}%</div>
                            <div className="text-[11px] text-emerald-600/70">Open rate</div>
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <div className="text-lg font-medium text-black">{campaign.journalists.length}</div>
                        <div className="text-[11px] text-black/50">Journalists</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg text-center">
                        <div className="text-lg font-medium text-blue-700">{openedCount}</div>
                        <div className="text-[11px] text-blue-600/70">Opened</div>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg text-center">
                        <div className="text-lg font-medium text-emerald-700">{respondedCount}</div>
                        <div className="text-[11px] text-emerald-600/70">Responses</div>
                    </div>
                </div>

                {/* Journalist List */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-medium text-black/60 uppercase tracking-wide">Journalists</span>
                    </div>
                    <div className="space-y-2">
                        {campaign.journalists.map((journalist) => (
                            <div 
                                key={journalist.id}
                                className="p-3 bg-gray-50 rounded-xl border border-transparent hover:border-black/5 transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-[13px] font-medium">{journalist.name}</div>
                                        <div className="text-[11px] text-black/50">{journalist.outlet}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] px-2 py-1 rounded-md border flex items-center gap-1 ${getStatusColor(journalist.status)}`}>
                                            {getStatusIcon(journalist.status)}
                                            {getStatusLabel(journalist.status)}
                                        </span>
                                        {journalist.status !== 'pending' && (
                                            <button 
                                                onClick={() => setExpandedJournalist(expandedJournalist === journalist.id ? null : journalist.id)}
                                                className="p-1 hover:bg-black/5 rounded"
                                            >
                                                {expandedJournalist === journalist.id ? (
                                                    <ChevronUp size={14} className="text-black/40" />
                                                ) : (
                                                    <ChevronDown size={14} className="text-black/40" />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {expandedJournalist === journalist.id && (
                                    <div className="mt-3 pt-3 border-t border-black/5 text-[12px] text-black/60">
                                        {journalist.status === 'opened' && (
                                            <p>Opened {journalist.openedAt}</p>
                                        )}
                                        {journalist.status === 'responded' && (
                                            <p>Responded {journalist.respondedAt}</p>
                                        )}
                                        <p className="mt-1">Focus: {journalist.focus}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* New Campaign Button */}
                <button
                    onClick={onOpenComposer}
                    className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-black/20 rounded-xl text-[13px] text-black/50 hover:text-black hover:border-black/40 hover:bg-black/[0.02] transition-all"
                >
                    <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
                    New Campaign
                </button>
            </div>
        );
    }

    // Not Ready
    if (!isReady && !isLive) {
        return (
            <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                        <Lock size={20} className="text-amber-600" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-[13px] font-semibold text-amber-800 mb-1">Outreach Locked</h4>
                        <p className="text-[12px] text-amber-700/80 leading-relaxed mb-3">
                            This quest needs to be in "Ready" status before you can start outreach. 
                            Complete the draft and get it approved first.
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-amber-600/70">
                            <AlertCircle size={12} />
                            <span>Current status: <strong className="capitalize">{quest.status}</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Ready to start outreach
    return (
        <div className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-100">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                    <HugeiconsIcon icon={File01Icon} size={20} className="text-violet-600" />
                </div>
                <div className="flex-1">
                    <h4 className="text-[13px] font-semibold text-violet-800 mb-1">Ready for Outreach</h4>
                    <p className="text-[12px] text-violet-700/80 leading-relaxed mb-4">
                        This quest is approved and ready to pitch to journalists. 
                        Create a personalized campaign to reach out to your media contacts.
                    </p>
                    <button
                        onClick={onOpenComposer}
                        className="inline-flex items-center gap-2 bg-violet-600 text-white px-4 py-2.5 rounded-lg text-[12px] font-medium hover:bg-violet-700 transition-colors"
                    >
                        <HugeiconsIcon icon={ArrowRight02Icon} size={14} />
                        Prepare Outreach
                        <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};
