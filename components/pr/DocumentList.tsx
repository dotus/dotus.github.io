import React from 'react';
import { FileText, Plus, Clock, ShieldCheck, MoreHorizontal, BarChart2, Eye, MousePointerClick, ArrowUpRight, UserRoundPen, CheckCircle2 } from 'lucide-react';

interface Doc {
    id: number;
    title: string;
    subtitle?: string;
    type: 'Press Release' | 'Blog Post' | 'Strategy Memo';
    updated: string;
    status: 'draft' | 'ready' | 'live';
    readyStatus?: 'pending_partner' | 'approval_xyz' | 'pending_pub';
    analytics?: {
        views: string;
        openRate: string;
    };
    author: string;
}

const MOCK_DOCS: Doc[] = [
    // DRAFTS
    {
        id: 1,
        title: 'The Future of AI Policy: A Framework for 2026',
        subtitle: 'Why regulation needs to catch up with innovation.',
        type: 'Blog Post',
        updated: 'Edited 2h ago',
        status: 'draft',
        author: 'Mithil'
    },
    {
        id: 4,
        title: '第一季度外展策略',
        subtitle: '关键叙事的内部对齐',
        type: 'Strategy Memo',
        updated: 'Edited 1d ago',
        status: 'draft',
        author: 'Mithil'
    },

    // READY
    {
        id: 2,
        title: 'Series B Announcement',
        subtitle: 'Draft approved by legal, awaiting partner sign-off.',
        type: 'Press Release',
        updated: 'Today',
        status: 'ready',
        readyStatus: 'pending_partner',
        author: 'Mithil'
    },
    {
        id: 5,
        title: 'New CTO Appointment',
        subtitle: 'Embargoed until Tuesday.',
        type: 'Press Release',
        updated: 'Yesterday',
        status: 'ready',
        readyStatus: 'approval_xyz',
        author: 'John'
    },
    {
        id: 6,
        title: 'Product Launch: V3',
        subtitle: 'Ready to go live at 9AM EST.',
        type: 'Blog Post',
        updated: '2d ago',
        status: 'ready',
        readyStatus: 'pending_pub',
        author: 'Sarah'
    },

    // LIVE
    {
        id: 3,
        title: 'Year in Review 2025',
        subtitle: 'Our biggest milestones and what comes next.',
        type: 'Blog Post',
        updated: 'Published 1w ago',
        status: 'live',
        analytics: {
            views: '12.4k',
            openRate: '68%'
        },
        author: 'Mithil'
    },
];

export const DocumentList: React.FC<{ onOpenDoc: () => void }> = ({ onOpenDoc }) => {

    const drafts = MOCK_DOCS.filter(d => d.status === 'draft');
    const ready = MOCK_DOCS.filter(d => d.status === 'ready');
    const live = MOCK_DOCS.filter(d => d.status === 'live');

    return (
        <div className="flex w-full h-full bg-white rounded-xl border border-black/5 md:shadow-sm ring-1 ring-black/5 overflow-hidden divide-x divide-black/5">
            {/* COLUMN 1: DRAFTS */}
            <div className="flex-1 flex flex-col min-w-[300px] bg-[#EBE3DA]">
                <Header title="Drafts" count={drafts.length} />
                <div className="flex-1 overflow-y-auto p-4 space-y-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    <button
                        onClick={onOpenDoc}
                        className="w-full flex items-center justify-center gap-2 p-4 rounded-lg border border-dashed border-black/10 hover:border-black/30 hover:bg-white transition-all text-sm font-medium text-black/40 group mb-4"
                    >
                        <Plus size={16} className="group-hover:scale-110 transition-transform" /> New Draft
                    </button>
                    {drafts.map(doc => <DraftCard key={doc.id} doc={doc} onClick={onOpenDoc} />)}
                </div>
            </div>

            {/* COLUMN 2: READY */}
            <div className="flex-1 flex flex-col min-w-[300px] bg-[#EBE3DA] border-x border-black/5 z-10 shadow-[0_0_40px_rgba(0,0,0,0.08)]">
                <Header title="Ready" count={ready.length} />
                <div className="flex-1 overflow-y-auto px-4 pb-4 pt-6 space-y-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    {/* Press Releases Group */}
                    {ready.filter(d => d.type === 'Press Release').length > 0 && (
                        <>
                            <div className="flex items-center gap-2 pt-4">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-black/30">Press Releases</span>
                                <div className="flex-1 h-px bg-black/5" />
                            </div>
                            {ready.filter(d => d.type === 'Press Release').map(doc => <ReadyCard key={doc.id} doc={doc} onClick={onOpenDoc} />)}
                        </>
                    )}
                    {/* Other Ready Items */}
                    {ready.filter(d => d.type !== 'Press Release').length > 0 && (
                        <>
                            <div className="flex items-center gap-2 pt-2">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-black/30">Other</span>
                                <div className="flex-1 h-px bg-black/5" />
                            </div>
                            {ready.filter(d => d.type !== 'Press Release').map(doc => <ReadyCard key={doc.id} doc={doc} onClick={onOpenDoc} />)}
                        </>
                    )}
                </div>
            </div>

            {/* COLUMN 3: LIVE */}
            <div className="flex-1 flex flex-col min-w-[300px] bg-[#EBE3DA]">
                <Header title="Live" count={live.length} />
                <div className="flex-1 overflow-y-auto p-4 space-y-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    {live.map(doc => <LiveCard key={doc.id} doc={doc} onClick={onOpenDoc} />)}
                </div>
            </div>
        </div>
    );
};

// --- Sub-components ---

const Header = ({ title, count }: { title: string, count: number }) => (
    <div className="p-4 border-b border-black/5 flex items-center justify-between bg-white sticky top-0 z-10">
        <h3 className="font-serif text-lg font-medium text-black tracking-tight">{title}</h3>
        <span className="text-xs font-mono text-black/40 bg-black/5 px-2 py-0.5 rounded-full">{count}</span>
    </div>
);

// Helper for type colors - Simplified / Strategic
const getTypeStyles = (type: Doc['type']) => {
    switch (type) {
        case 'Press Release': return 'bg-white border-black/10';
        case 'Blog Post': return 'bg-white border-black/10';
        case 'Strategy Memo': return 'bg-white border-black/10';
        default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
};

const DraftCard: React.FC<{ doc: Doc, onClick: () => void }> = ({ doc, onClick }) => (
    <div onClick={onClick} className="group p-4 rounded-lg border border-black/5 bg-white shadow-sm hover:shadow-md hover:border-black/20 transition-all cursor-pointer relative overflow-hidden">
        <div className="mb-3 flex items-center gap-2">
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${getTypeStyles(doc.type)}`}>
                {doc.type}
            </span>
        </div>
        <h4 className="font-serif text-lg leading-snug mb-1 group-hover:text-blue-600 transition-colors">{doc.title}</h4>
        {doc.subtitle && <p className="text-sm text-black/50 line-clamp-2 leading-relaxed mb-3">{doc.subtitle}</p>}
        <div className="flex items-center justify-between border-t border-black/5 pt-3 mt-2">
            <div className="text-xs text-black/40 font-medium">{doc.author}</div>
            <div className="text-[10px] text-black/30">{doc.updated}</div>
        </div>
    </div>
);

const ReadyCard: React.FC<{ doc: Doc, onClick: () => void }> = ({ doc, onClick }) => {
    let statusContent;

    switch (doc.readyStatus) {
        case 'pending_partner':
            statusContent = (
                <div className="flex items-center gap-2 text-amber-700">
                    <div className="relative">
                        <UserRoundPen size={14} />
                        <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-amber-500 rounded-full border border-white" />
                    </div>
                    <span className="font-medium">Needs Strife Partner Review</span>
                </div>
            );
            break;
        case 'approval_xyz':
            statusContent = (
                <div className="flex items-center gap-2 text-indigo-700">
                    <ShieldCheck size={14} />
                    <span className="font-medium">Awaiting Legal Approval</span>
                </div>
            );
            break;
        case 'pending_pub':
            statusContent = (
                <div className="flex items-center gap-2 text-emerald-700">
                    <CheckCircle2 size={14} />
                    <span className="font-medium">Ready to Publish</span>
                </div>
            );
            break;
    }

    return (
        <div onClick={onClick} className="group p-4 rounded-lg border border-black/5 bg-white shadow-sm hover:shadow-md hover:border-black/20 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${getTypeStyles(doc.type)}`}>
                    {doc.type}
                </span>
            </div>

            <h4 className="font-serif text-lg leading-snug mb-2 group-hover:text-blue-600 transition-colors">{doc.title}</h4>

            <div className="bg-[#F5F2EE] rounded px-3 py-2 border border-black/5 mt-3">
                <div className="text-[10px] uppercase tracking-wider text-black/40 font-bold mb-1">Current Status</div>
                <div className="text-xs">{statusContent}</div>
            </div>

            <div className="flex items-center justify-between mt-3 text-[10px] text-black/30">
                <span>Filed {doc.updated}</span>
            </div>
        </div>
    );
};

const ReadySubCard: React.FC<{ doc: Doc, onClick: () => void }> = ({ doc, onClick }) => {
    let statusIcon;
    let statusColor;

    switch (doc.readyStatus) {
        case 'pending_partner':
            statusIcon = <UserRoundPen size={12} />;
            statusColor = 'text-amber-600 bg-amber-50';
            break;
        case 'approval_xyz':
            statusIcon = <ShieldCheck size={12} />;
            statusColor = 'text-indigo-600 bg-indigo-50';
            break;
        case 'pending_pub':
            statusIcon = <CheckCircle2 size={12} />;
            statusColor = 'text-emerald-600 bg-emerald-50';
            break;
    }

    return (
        <div onClick={onClick} className="group p-3 rounded-md bg-white border border-black/5 hover:border-black/15 hover:shadow-sm transition-all cursor-pointer">
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium leading-snug group-hover:text-blue-600 transition-colors truncate">{doc.title}</h5>
                    {doc.subtitle && <p className="text-[11px] text-black/40 mt-0.5 truncate">{doc.subtitle}</p>}
                </div>
                <div className={`flex-shrink-0 p-1.5 rounded ${statusColor}`}>
                    {statusIcon}
                </div>
            </div>
        </div>
    );
};

const LiveCard: React.FC<{ doc: Doc, onClick: () => void }> = ({ doc, onClick }) => (
    <div onClick={onClick} className="group p-4 rounded-lg border border-black/5 bg-white shadow-sm hover:shadow-md hover:border-black/20 transition-all cursor-pointer">
        <div className="flex justify-between items-start mb-2">
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${getTypeStyles(doc.type)}`}>
                {doc.type}
            </span>
        </div>
        <h4 className="font-serif text-lg leading-snug mb-3 group-hover:text-blue-600 transition-colors">{doc.title}</h4>

        {/* Analytics Pill */}
        <div className="bg-[#F5F2EE] rounded-lg p-2 flex items-center justify-around border border-black/5 group-hover:border-black/10 transition-colors mb-3">
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-[10px] text-black/40 uppercase tracking-wide font-bold">
                    <Eye size={10} />Views
                </div>
                <span className="text-sm font-medium font-mono">{doc.analytics?.views}</span>
            </div>
            <div className="w-px h-6 bg-black/5" />
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-[10px] text-black/40 uppercase tracking-wide font-bold">
                    <MousePointerClick size={10} />Open Rate
                </div>
                <span className="text-sm font-medium font-mono">{doc.analytics?.openRate}</span>
            </div>
        </div>

        {/* Media Outreach CTA */}
        <button
            onClick={(e) => { e.stopPropagation(); }}
            className="w-full py-2 px-3 text-xs font-medium text-black bg-black/[0.03] hover:bg-black hover:text-white rounded-lg transition-all flex items-center justify-center gap-2"
        >
            <ArrowUpRight size={12} />
            Begin Media Outreach
        </button>
    </div>
);
