import React from 'react';
import { MoreHorizontal, Plus, MessageCircle, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const COLUMNS = [
    { id: 'prospecting', title: 'Targeting', color: 'bg-gray-100', count: 12 },
    { id: 'contacted', title: 'Pitched', color: 'bg-blue-50', count: 5 },
    { id: 'negotiating', title: 'In Discussion', color: 'bg-orange-50', count: 3 },
    { id: 'published', title: 'Confirmed / Live', color: 'bg-green-50', count: 2 },
];

const MOCK_CARDS = [
    {
        id: 1,
        journalist: 'Mike Butcher',
        outlet: 'TechCrunch',
        column: 'contacted',
        lastAction: 'Emailed 2d ago',
        nextStep: 'Follow up tomorrow',
        sentiment: 'neutral',
        avatar: 'MB',
        tags: ['Exclusive']
    },
    {
        id: 2,
        journalist: 'Kara Swisher',
        outlet: 'Pivot / NYMag',
        column: 'prospecting',
        lastAction: 'Added to list',
        nextStep: 'Draft specific pitch',
        sentiment: 'unknown',
        avatar: 'KS',
        tags: []
    },
    {
        id: 3,
        journalist: 'Alex Konrad',
        outlet: 'Forbes',
        column: 'negotiating',
        lastAction: 'Replied: "Send more info"',
        nextStep: 'Send One-Pager',
        sentiment: 'positive',
        avatar: 'AK',
        tags: ['Embargo']
    },
    {
        id: 4,
        journalist: 'Editors Desk',
        outlet: 'Bloomberg',
        column: 'published',
        lastAction: 'Published 1w ago',
        nextStep: 'Share on Socials',
        sentiment: 'success',
        avatar: 'BB',
        tags: []
    },
    {
        id: 5,
        journalist: 'Ryan Lawler',
        outlet: 'TechCrunch',
        column: 'contacted',
        lastAction: 'Emailed 5m ago',
        nextStep: 'Wait for read receipt',
        sentiment: 'neutral',
        avatar: 'RL',
        tags: []
    },
];

export const KanbanBoard: React.FC = () => {
    return (
        <div className="flex h-full gap-6 pb-2 min-w-[1000px]">
            {COLUMNS.map(col => (
                <div key={col.id} className="flex-1 flex flex-col h-full rounded-2xl bg-[#EBE3DA] border border-transparent">
                    {/* Header */}
                    <div className="p-4 flex items-center justify-between border-b border-black/5">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-black/80">{col.title}</span>
                            <span className="bg-black/5 text-black/50 text-[10px] px-2 py-0.5 rounded-full font-bold">{col.count}</span>
                        </div>
                        <button className="text-black/20 hover:text-black transition-colors"><Plus size={16} /></button>
                    </div>

                    {/* Cards Container */}
                    <div className="flex-1 p-3 space-y-3 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                        {MOCK_CARDS.filter(c => c.column === col.id).map(card => (
                            <div key={card.id} className="bg-white p-3 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-black/5 cursor-grab active:cursor-grabbing hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all group">
                                {/* Top: Tags & Menu */}
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex gap-1.5 flex-wrap">
                                        {card.tags.map(tag => (
                                            <span key={tag} className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/5 text-black/60 tracking-wider">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-black/20 hover:text-black"><MoreHorizontal size={14} /></button>
                                </div>

                                {/* Main: Journalist Info */}
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center font-bold text-[10px] text-black/60 border-2 border-white shadow-sm shrink-0">
                                        {card.avatar}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-serif font-medium text-black text-base leading-none mb-0.5 truncate">{card.journalist}</h4>
                                        <div className="text-[10px] text-black/40 truncate">{card.outlet}</div>
                                    </div>
                                </div>

                                {/* Footer: Status & Sentiment */}
                                <div className="border-t border-black/5 pt-2 mt-1">
                                    <div className="flex items-center justify-between text-[11px] mb-1.5">
                                        <div className="text-black/50 flex items-center gap-1.5">
                                            <Clock size={10} />
                                            <span className="truncate max-w-[120px] text-[10px]">{card.lastAction}</span>
                                        </div>
                                    </div>

                                    {card.sentiment !== 'unknown' && (
                                        <div className={`p-1.5 rounded-md flex items-center gap-2 text-[10px] font-medium ${card.sentiment === 'positive' ? 'bg-green-50 text-green-700' :
                                            card.sentiment === 'success' ? 'bg-black text-white' :
                                                'bg-yellow-50 text-yellow-700'
                                            }`}>
                                            {card.sentiment === 'positive' ? <CheckCircle2 size={10} /> :
                                                card.sentiment === 'success' ? <CheckCircle2 size={10} /> :
                                                    <AlertCircle size={10} />}
                                            {card.nextStep}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
