import React from 'react';
import { Clock, Calendar, ArrowUpRight } from 'lucide-react';
import { DocItem, getStatusLabel } from './StatsOverview';

interface ExpandedDocViewProps {
    docs: DocItem[];
    status: string;
    onOpenDoc: (doc: DocItem) => void;
}

const TYPE_COLORS: Record<DocItem['type'], string> = {
    'Press Release': '#3B82F6',
    'Blog Post': '#10B981',
    'Strategy Memo': '#8B5CF6',
};

const STATUS_COLORS: Record<string, string> = {
    draft: '#6B7280',
    review: '#F59E0B',
    ready: '#10B981',
    live: '#3B82F6',
};

export const ExpandedDocView: React.FC<ExpandedDocViewProps> = ({ docs, status, onOpenDoc }) => {
    const statusColor = STATUS_COLORS[status];

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-black/[0.06] flex items-center gap-3 bg-white">
                <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: statusColor }}
                />
                <h3 className="text-[15px] font-medium">{getStatusLabel(status as any)}</h3>
                <span className="text-sm text-black/30">{docs.length}</span>
            </div>

            {/* Cards */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-3">
                    {docs.map((doc) => (
                        <button
                            key={doc.id}
                            onClick={() => onOpenDoc(doc)}
                            className="group w-full text-left bg-white rounded-xl p-5 border border-black/[0.05] hover:border-black/[0.1] hover:shadow-lg transition-all duration-200"
                        >
                            <div className="flex items-start gap-4">
                                {/* Left accent */}
                                <div 
                                    className="w-[3px] h-full min-h-[60px] rounded-full shrink-0"
                                    style={{ backgroundColor: TYPE_COLORS[doc.type] }}
                                />
                                
                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    {/* Type & Priority */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[11px] font-medium text-black/40 uppercase tracking-wide">
                                            {doc.type}
                                        </span>
                                        {doc.priority === 'high' && (
                                            <span className="text-[10px] text-red-600 font-medium">High priority</span>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <h4 className="text-base font-medium text-black mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                                        {doc.title}
                                    </h4>

                                    {/* Synopsis */}
                                    <p className="text-sm text-black/50 line-clamp-2 mb-3">
                                        {doc.synopsis}
                                    </p>

                                    {/* Meta */}
                                    <div className="flex items-center gap-4 text-[12px] text-black/40">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[9px]">
                                                {doc.author[0]}
                                            </span>
                                            {doc.author}
                                        </span>
                                        {doc.deadline && (
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={12} />
                                                {doc.deadline}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1.5">
                                            <Clock size={12} />
                                            {doc.updated}
                                        </span>
                                    </div>
                                </div>

                                {/* Arrow */}
                                <div className="w-8 h-8 rounded-full bg-black/[0.03] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1">
                                    <ArrowUpRight size={14} className="text-black/60" />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
