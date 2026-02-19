import React from 'react';
import { ChevronLeft, Clock, Send, Eye, MessageCircle, FileText, Flame, MoreHorizontal, User } from 'lucide-react';

export const QuestDetailDemo: React.FC = () => (
    <div className="bg-white border border-black/5 shadow-2xl shadow-black/10 overflow-hidden rounded-xl">
        {/* Header */}
        <div className="p-3 border-b border-black/5 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
                <button className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                    <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded border border-gray-200">PR</span>
                        <Flame size={10} className="text-red-500 fill-current" />
                        <span className="text-[9px] px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded border border-amber-200 ml-auto">In Review</span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 truncate">Funding Announcement</h3>
                </div>
                <button className="p-1 hover:bg-black/5 rounded">
                    <MoreHorizontal size={14} className="text-gray-400" />
                </button>
            </div>
            <div className="flex gap-1">
                {['Overview', 'Product', 'Distribution', 'Docs'].map((tab, i) => (
                    <button 
                        key={tab}
                        className={`px-2.5 py-1 text-[10px] font-medium rounded transition-colors ${i === 0 ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
        
        {/* Content */}
        <div className="p-3 bg-[#FAF9F6] space-y-3">
            {/* Synopsis */}
            <div className="p-2.5 bg-white rounded-lg border border-black/5">
                <p className="text-[11px] text-gray-700 leading-relaxed">
                    Announcing our Series B to accelerate AI infrastructure development.
                </p>
            </div>
            
            {/* Product Output */}
            <div className="bg-white rounded-lg border border-black/5 p-2.5">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium text-gray-900 truncate">Press Release</p>
                        <p className="text-[9px] text-gray-400">2h ago</p>
                    </div>
                    <span className="text-[8px] px-1 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-200">Final</span>
                </div>
            </div>

            {/* Distribution Sent Section */}
            <div className="bg-emerald-50 rounded-lg border border-emerald-100 p-3">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                        <Send className="w-3 h-3 text-emerald-600" />
                        <span className="text-[10px] font-medium text-emerald-900">Distribution Sent</span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">12 journalists</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-emerald-700">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> 8 opened</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> 3 responses</span>
                </div>
                {/* Journalist avatars */}
                <div className="flex items-center gap-1 mt-2 pt-2 border-t border-emerald-100">
                    {['Tech', 'VC', 'News', 'Post', 'Bloom'].map((pub, i) => (
                        <div key={i} className="w-5 h-5 rounded-full bg-white border border-emerald-200 flex items-center justify-center text-[7px] font-medium text-emerald-700">
                            {pub[0]}
                        </div>
                    ))}
                    <span className="text-[8px] text-emerald-600 ml-1">+7 more</span>
                </div>
            </div>

            {/* Timeline */}
            <div className="bg-violet-50 rounded-lg border border-violet-100 p-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                    <Clock className="w-3 h-3 text-violet-600" />
                    <span className="text-[10px] font-medium text-violet-900">Embargo Lift</span>
                    <span className="text-[9px] text-violet-700/60 ml-auto">14h</span>
                </div>
                <p className="text-[9px] text-violet-700/80">Jan 15, 2026 at 09:00</p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-[9px] font-bold">A</div>
                <div>
                    <p className="text-[11px] font-medium text-gray-900">Alex Chen</p>
                    <p className="text-[9px] text-gray-400">Editor</p>
                </div>
            </div>
        </div>
    </div>
);
