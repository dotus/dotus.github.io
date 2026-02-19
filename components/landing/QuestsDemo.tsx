import React from 'react';
import { Plus, Flame, MoreHorizontal, Send } from 'lucide-react';

const DEMO_QUESTS = [
    { id: 1, title: 'AI Policy Framework', type: 'Blog', status: 'draft', author: 'M', time: '3h', priority: undefined, hasCampaign: false },
    { id: 2, title: 'Q1 Strategy Memo', type: 'Memo', status: 'draft', author: 'S', time: '1d', priority: undefined, hasCampaign: false },
    { id: 3, title: 'Series B Funding', type: 'PR', status: 'review', author: 'M', time: '2h', priority: 'high', hasCampaign: true, openedCount: 3, respondedCount: 1 },
    { id: 4, title: 'New CTO', type: 'PR', status: 'ready', author: 'J', time: '1d', priority: undefined, hasCampaign: true, openedCount: 2, respondedCount: 0 },
    { id: 5, title: 'Product Launch V3', type: 'Blog', status: 'live', author: 'A', time: '2d', priority: undefined, hasCampaign: true, openedCount: 45, respondedCount: 8 },
    { id: 6, title: 'Partnership Announcement', type: 'PR', status: 'live', author: 'K', time: '1w', priority: undefined, hasCampaign: true, openedCount: 32, respondedCount: 5 },
];

const COLUMNS = [
    { id: 'draft', title: 'Draft', color: '#6B7280', bgColor: '#F9FAFB' },
    { id: 'review', title: 'Review', color: '#F59E0B', bgColor: '#FFFBEB' },
    { id: 'ready', title: 'Ready', color: '#10B981', bgColor: '#ECFDF5' },
    { id: 'live', title: 'Live', color: '#3B82F6', bgColor: '#EFF6FF' },
];

export const QuestsDemo: React.FC = () => (
    <div className="bg-white border border-black/5 shadow-2xl shadow-black/10 overflow-hidden rounded-xl">
        <div className="p-3 border-b border-black/5 flex items-center justify-between bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-900">Quests</h3>
                <span className="text-[10px] text-gray-400">4 active</span>
            </div>
            <button className="flex items-center gap-1 px-2 py-1 bg-teal-600 text-white text-[10px] font-medium rounded-md hover:bg-teal-700 transition-colors">
                <Plus className="w-3 h-3" />
                New
            </button>
        </div>
        <div className="p-2 bg-[#FAF9F6]">
            <div className="grid grid-cols-4 gap-1.5">
                {COLUMNS.map((col) => {
                    const quests = DEMO_QUESTS.filter(q => q.status === col.id);
                    return (
                        <div key={col.id} className="flex flex-col">
                            <div className="flex items-center gap-1 mb-1.5 px-1">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: col.color }} />
                                <span className="text-[10px] font-medium text-gray-600">{col.title}</span>
                                <span className="text-[9px] text-black/30 ml-auto">{quests.length}</span>
                            </div>
                            <div 
                                className="flex-1 rounded-md border min-h-[100px]"
                                style={{ backgroundColor: col.bgColor, borderColor: `${col.color}30` }}
                            >
                                <div className="p-1.5 space-y-1.5">
                                    {quests.map(quest => (
                                        <div 
                                            key={quest.id} 
                                            className="bg-white rounded-md p-2 border border-black/5 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center gap-1">
                                                    {quest.priority === 'high' && (
                                                        <Flame size={10} className="text-red-500 fill-current" />
                                                    )}
                                                    <span className="text-[9px] text-gray-500">{quest.type}</span>
                                                </div>
                                                {quest.hasCampaign && (
                                                    <span className="text-[8px] text-emerald-600 bg-emerald-50 px-1 rounded">
                                                        {quest.respondedCount || quest.openedCount}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-[11px] font-medium text-gray-900 mb-1.5 leading-tight line-clamp-2">
                                                {quest.title}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1">
                                                    <div className="w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center text-[8px] font-bold">
                                                        {quest.author}
                                                    </div>
                                                    <span className="text-[9px] text-black/40">{quest.time}</span>
                                                </div>
                                                <MoreHorizontal size={10} className="text-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
);
