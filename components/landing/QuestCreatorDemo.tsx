import React from 'react';
import { ChevronLeft, Flame, FileText, FileSpreadsheet, History, CheckCircle2, Clock, Send, Eye, MessageCircle } from 'lucide-react';

const WORKING_DOCS = [
    { id: 1, title: 'Press Release', type: 'doc' },
    { id: 2, title: 'Talking Points', type: 'sheet' },
];

const ACTIVITY = [
    { id: 1, type: 'history', action: 'Created quest', user: 'Alex', time: '2h ago' },
    { id: 2, type: 'history', action: 'Added docs', user: 'Jordan', time: '1h ago' },
    { id: 3, type: 'timeline', title: 'Partner Review', date: 'Jan 14, 17:00', badge: 'Deadline', badgeColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 4, type: 'timeline', title: 'Embargo Lift', date: 'Jan 15, 09:00', badge: 'Embargo', badgeColor: 'bg-violet-50 text-violet-700 border-violet-200' },
    { id: 5, type: 'timeline', title: 'Public Launch', date: 'Jan 15, 10:00', badge: 'Launch', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
];

const FILE_ICONS: Record<string, React.ReactNode> = {
    doc: <FileText size={13} className="text-blue-600" />,
    sheet: <FileSpreadsheet size={13} className="text-green-600" />,
};

export const QuestCreatorDemo: React.FC = () => {
    return (
        <div className="bg-white border border-black/5 shadow-2xl shadow-black/10 overflow-hidden rounded-xl">
            {/* Header */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-black/[0.06]">
                <button className="p-1.5 hover:bg-black/[0.03] rounded-lg transition-colors">
                    <ChevronLeft size={16} className="text-black/40" />
                </button>
                <div className="h-3 w-px bg-black/10" />
                
                <span className="text-[10px] font-medium px-2 py-0.5 rounded border bg-gray-100 text-gray-700 border-gray-200">
                    Press Release
                </span>
                <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded border bg-amber-50 text-amber-700 border-amber-200">
                    <span className="w-1 h-1 rounded-full bg-amber-500" />
                    In Review
                </span>
                <span className="flex items-center gap-0.5 text-[10px] font-medium px-2 py-0.5 rounded border bg-red-50 text-red-700 border-red-200">
                    <Flame size={10} className="fill-current" />
                    Hot
                </span>
            </div>
            
            {/* Content */}
            <div className="flex h-[320px]">
                {/* Left Column */}
                <div className="flex-1 p-3">
                    {/* Title + Author */}
                    <div className="flex items-start justify-between mb-1">
                        <h2 className="text-lg font-serif font-medium text-black">
                            Series B Funding
                        </h2>
                        <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                            <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[9px] font-bold">A</div>
                            <span className="text-[10px] text-black/60">Alex</span>
                        </div>
                    </div>
                    
                    {/* One line synopsis */}
                    <p className="text-[12px] text-black/50 mb-3 line-clamp-1">
                        $25M led by Z Ventures to accelerate product development and expand into Europe.
                    </p>
                    
                    {/* Working Docs - 2 items */}
                    <div className="mb-0s">
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[9px] font-semibold text-black/40 uppercase tracking-wide">Working Docs</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {WORKING_DOCS.map(doc => (
                                <button
                                    key={doc.id}
                                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-transparent hover:border-black/5"
                                >
                                    <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center shadow-sm">
                                        {FILE_ICONS[doc.type]}
                                    </div>
                                    <span className="text-[11px] font-medium text-black truncate">{doc.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Product - LinkedIn */}
                    <div className="mb-1">
                        <span className="text-[9px] font-semibold text-black/40 uppercase tracking-wide">Product</span>
                        <div className="mt-1.5 p-2 bg-teal-50 rounded-lg border border-teal-100">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center shadow-sm">
                                    <svg className="w-3.5 h-3.5 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[12px] font-medium text-teal-900 truncate">LinkedIn Post</p>
                                </div>
                                <span className="text-[9px] px-1.5 py-0.5 bg-teal-200 text-teal-800 rounded font-medium">Final</span>
                            </div>
                        </div>
                    </div>

                    {/* Distribution Sent */}
                    <div>
                        <span className="text-[9px] font-semibold text-black/40 uppercase tracking-wide">Distribution</span>
                        <div className="mt-1.5 p-2.5 bg-emerald-50 rounded-lg border border-emerald-100">
                            <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center gap-1.5">
                                    <Send className="w-3 h-3 text-emerald-600" />
                                    <span className="text-[11px] font-medium text-emerald-900">Sent to journalists</span>
                                </div>
                                <span className="text-[9px] px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">12</span>
                            </div>
                            <div className="flex items-center gap-3 text-[10px] text-emerald-700 mb-2">
                                <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" /> 8 opened</span>
                                <span className="flex items-center gap-0.5"><MessageCircle className="w-3 h-3" /> 3 replies</span>
                            </div>

                        </div>
                    </div>
                </div>
                
                {/* Right Column - Activity */}
                <div className="w-40 border-l border-black/[0.06] bg-gray-50/30 p-3">
                    <div className="flex items-center gap-1.5 mb-2">
                        <History size={12} className="text-black/40" />
                        <span className="text-[9px] font-semibold text-black/60 uppercase tracking-wide">Activity</span>
                    </div>
                    <div className="space-y-0">
                        {ACTIVITY.map((item, i) => (
                            <div key={item.id} className="flex gap-2 relative pb-2.5">
                                {i !== ACTIVITY.length - 1 && (
                                    <div className="absolute left-[4px] top-3 bottom-0 w-px bg-black/[0.06]" />
                                )}
                                
                                <div className={`w-2.5 h-2.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                    item.type === 'timeline' ? 'bg-violet-100' : 'bg-gray-100'
                                }`}>
                                    {item.type === 'timeline' ? (
                                        <Clock size={6} className="text-violet-600" />
                                    ) : (
                                        <CheckCircle2 size={6} className="text-emerald-600" />
                                    )}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    {item.type === 'timeline' ? (
                                        <>
                                            <span className={`inline-block text-[7px] font-medium px-1 py-0.5 rounded border mb-0.5 ${item.badgeColor}`}>
                                                {item.badge}
                                            </span>
                                            <p className="text-[10px] font-medium text-black/80 leading-tight">{item.title}</p>
                                            <p className="text-[8px] text-black/40">{item.date}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-[10px] text-black/70 leading-tight">{item.action}</p>
                                            <p className="text-[8px] text-black/40">{item.user} • {item.time}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
