import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import { MOCK_QUESTS, Quest, TypeBadge } from './StatsOverview';

interface DocumentListProps {
    onOpenDoc: () => void;
    compact?: boolean;
}

const STATUS_LABELS: Record<Quest['status'], string> = {
    draft: 'Draft',
    review: 'In Review',
    ready: 'Ready',
    live: 'Published',
};

export const DocumentList: React.FC<DocumentListProps> = ({ onOpenDoc, compact = false }) => {
    const quests = MOCK_QUESTS;
    
    if (compact) {
        return (
            <div className="divide-y divide-black/5">
                {quests.slice(0, 5).map((quest) => (
                    <button
                        key={quest.id}
                        onClick={onOpenDoc}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left group"
                    >
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                            <FileText size={14} className="text-black/40" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-black truncate group-hover:text-blue-600 transition-colors">
                                {quest.title}
                            </p>
                            <p className="text-[11px] text-black/40">{quest.updated}</p>
                        </div>
                        <ChevronRight size={14} className="text-black/20 group-hover:text-black/40 transition-colors" />
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-12 gap-4 px-4 py-2.5 border-b border-black/5 text-[10px] uppercase font-medium text-black/30 tracking-wider">
                <div className="col-span-4">Quest</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Updated</div>
                <div className="col-span-2"></div>
            </div>
            <div className="divide-y divide-black/5">
                {quests.map((quest) => (
                    <button
                        key={quest.id}
                        onClick={onOpenDoc}
                        className="w-full grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-left items-center group"
                    >
                        <div className="col-span-4 flex items-center gap-3 min-w-0">
                            <span className="text-sm text-black truncate group-hover:text-blue-600 transition-colors">
                                {quest.title}
                            </span>
                        </div>
                        <div className="col-span-2">
                            <span className={`
                                text-[10px] font-medium px-2 py-0.5 rounded-full
                                ${quest.status === 'draft' ? 'bg-gray-100 text-gray-600' : ''}
                                ${quest.status === 'review' ? 'bg-amber-50 text-amber-600' : ''}
                                ${quest.status === 'ready' ? 'bg-emerald-50 text-emerald-600' : ''}
                                ${quest.status === 'live' ? 'bg-blue-50 text-blue-600' : ''}
                            `}>
                                {STATUS_LABELS[quest.status]}
                            </span>
                        </div>
                        <div className="col-span-2">
                            <TypeBadge type={quest.type} />
                        </div>
                        <div className="col-span-2 text-xs text-black/40">
                            {quest.updated}
                        </div>
                        <div className="col-span-2 flex justify-end">
                            <ChevronRight size={14} className="text-black/20 group-hover:text-black/40 transition-colors" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
