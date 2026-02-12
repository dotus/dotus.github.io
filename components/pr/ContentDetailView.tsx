import React, { useState } from 'react';
import { 
    X, FileText, FileSpreadsheet, Image as ImageIcon, Link2, 
    Download, Share2, MoreHorizontal, Clock, MessageSquare, 
    History, Paperclip, ExternalLink, CheckCircle2,
    ChevronLeft, Edit3
} from 'lucide-react';
import { DocItem } from './StatsOverview';

interface AttachedDoc {
    id: number;
    name: string;
    type: 'platform' | 'ingested';
    fileType: 'doc' | 'sheet' | 'slide' | 'pdf' | 'image' | 'link';
    size?: string;
    source?: string;
    uploadedAt: string;
    uploadedBy: string;
}

interface Comment {
    id: number;
    user: string;
    userInitial: string;
    role: string;
    text: string;
    time: string;
}

interface Version {
    id: number;
    version: string;
    author: string;
    date: string;
    changes: string;
}

const MOCK_ATTACHED: AttachedDoc[] = [
    { id: 1, name: 'Series B Press Release v2.docx', type: 'platform', fileType: 'doc', size: '245 KB', uploadedAt: '2h ago', uploadedBy: 'Mithil' },
    { id: 2, name: 'Investor Fact Sheet.pdf', type: 'ingested', fileType: 'pdf', source: 'Dropbox', size: '1.2 MB', uploadedAt: '1d ago', uploadedBy: 'Sarah' },
    { id: 3, name: 'Founder Headshots', type: 'ingested', fileType: 'image', source: 'Google Drive', uploadedAt: '2d ago', uploadedBy: 'John' },
    { id: 4, name: 'Funding Round Financials', type: 'platform', fileType: 'sheet', size: '89 KB', uploadedAt: '3d ago', uploadedBy: 'Mithil' },
    { id: 5, name: 'A16Z Guidelines', type: 'ingested', fileType: 'link', source: 'Notion', uploadedAt: '4d ago', uploadedBy: 'Sarah' },
];

const MOCK_COMMENTS: Comment[] = [
    { id: 1, user: 'Sarah Jenkins', userInitial: 'S', role: 'Strife Partner', text: 'The quote from the CTO is strong. Should we include something about engineering culture?', time: '2h ago' },
    { id: 2, user: 'Mike Chen', userInitial: 'M', role: 'Editor', text: 'Embargo confirmed with TechCrunch. 24hr exclusive.', time: '4h ago' },
];

const MOCK_VERSIONS: Version[] = [
    { id: 1, version: 'v2.1', author: 'Mithil', date: '2h ago', changes: 'Added CTO quote' },
    { id: 2, version: 'v2.0', author: 'Sarah', date: 'Yesterday', changes: 'Major rewrite' },
    { id: 3, version: 'v1.2', author: 'Mithil', date: '3d ago', changes: 'Initial draft' },
];

const FILE_ICONS: Record<AttachedDoc['fileType'], React.ReactNode> = {
    doc: <FileText size={16} className="text-blue-600" />,
    sheet: <FileSpreadsheet size={16} className="text-green-600" />,
    slide: <FileText size={16} className="text-orange-600" />,
    pdf: <FileText size={16} className="text-red-600" />,
    image: <ImageIcon size={16} className="text-purple-600" />,
    link: <Link2 size={16} className="text-gray-600" />,
};

const TYPE_COLORS: Record<DocItem['type'], string> = {
    'Press Release': '#3B82F6',
    'Blog Post': '#10B981',
    'Strategy Memo': '#8B5CF6',
};

interface ContentDetailViewProps {
    doc: DocItem;
    onClose: () => void;
}

export const ContentDetailView: React.FC<ContentDetailViewProps> = ({ doc, onClose }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'activity'>('overview');
    const [showComment, setShowComment] = useState(false);

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06]">
                <div className="flex items-center gap-3">
                    <button onClick={onClose} className="p-2 hover:bg-black/[0.03] rounded-lg transition-colors">
                        <ChevronLeft size={18} className="text-black/40" />
                    </button>
                    <div className="h-4 w-px bg-black/10" />
                    <div className="flex items-center gap-2">
                        <div 
                            className="w-1.5 h-4 rounded-full" 
                            style={{ backgroundColor: TYPE_COLORS[doc.type] }}
                        />
                        <span className="text-[11px] font-medium text-black/50 uppercase tracking-wide">{doc.type}</span>
                    </div>
                    {doc.priority === 'high' && (
                        <span className="text-[10px] font-medium text-red-600">High priority</span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-black/[0.03] rounded-lg text-black/40 hover:text-black transition-colors">
                        <Share2 size={16} />
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 text-[11px] font-medium bg-black text-white rounded-lg hover:bg-black/90 transition-colors">
                        <Edit3 size={13} />Edit
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-2xl mx-auto px-6 py-8">
                    {/* Title */}
                    <h1 className="text-2xl font-serif font-medium text-black mb-3 leading-snug">{doc.title}</h1>
                    <p className="text-[15px] text-black/50 leading-relaxed mb-6">{doc.synopsis}</p>

                    {/* Meta */}
                    <div className="flex items-center gap-6 py-4 border-y border-black/[0.06] mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-[10px]">{doc.author[0]}</div>
                            <div>
                                <p className="text-[13px] font-medium">{doc.author}</p>
                                <p className="text-[11px] text-black/40">{doc.authorRole}</p>
                            </div>
                        </div>
                        {doc.deadline && (
                            <div className="flex items-center gap-2 text-[13px]">
                                <CheckCircle2 size={14} className="text-black/30" />
                                <span>{doc.deadline}</span>
                                <span className="text-black/40 capitalize">({doc.deadlineType})</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-[13px] text-black/40">
                            <Clock size={14} />
                            <span>{doc.updated}</span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-1 mb-6">
                        {[
                            { id: 'overview', label: 'Overview', count: MOCK_COMMENTS.length },
                            { id: 'documents', label: 'Documents', count: MOCK_ATTACHED.length },
                            { id: 'activity', label: 'History', count: MOCK_VERSIONS.length },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-3 py-1.5 text-[12px] font-medium rounded-md transition-colors ${
                                    activeTab === tab.id ? 'bg-black text-white' : 'text-black/50 hover:text-black hover:bg-black/[0.03]'
                                }`}
                            >
                                {tab.label}
                                <span className="ml-1.5 opacity-60">{tab.count}</span>
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'overview' && (
                        <div className="space-y-4">
                            {MOCK_COMMENTS.map(c => (
                                <div key={c.id} className="flex gap-3 p-4 bg-gray-50 rounded-xl">
                                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs shrink-0">{c.userInitial}</div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[13px] font-medium">{c.user}</span>
                                            <span className="text-[11px] text-black/40">{c.role}</span>
                                            <span className="text-[11px] text-black/30">{c.time}</span>
                                        </div>
                                        <p className="text-[14px] text-black/70">{c.text}</p>
                                    </div>
                                </div>
                            ))}
                            {!showComment ? (
                                <button onClick={() => setShowComment(true)} className="w-full py-3 text-[13px] text-black/40 hover:text-black border border-dashed border-black/10 rounded-xl hover:border-black/20 transition-colors">
                                    Add comment...
                                </button>
                            ) : (
                                <div className="p-3 border border-black/10 rounded-xl">
                                    <textarea className="w-full text-[14px] resize-none outline-none placeholder:text-black/30" rows={3} placeholder="Write a comment..." autoFocus />
                                    <div className="flex justify-end gap-2 mt-2">
                                        <button onClick={() => setShowComment(false)} className="px-3 py-1.5 text-[12px] text-black/50 hover:text-black">Cancel</button>
                                        <button className="px-3 py-1.5 text-[12px] bg-black text-white rounded-md">Post</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'documents' && (
                        <div className="space-y-3">
                            <div className="text-[11px] font-medium text-black/40 uppercase tracking-wide mb-2">Attached</div>
                            {MOCK_ATTACHED.map(file => (
                                <div key={file.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                                    <div className="w-9 h-9 bg-white border border-black/[0.06] rounded-lg flex items-center justify-center">{FILE_ICONS[file.fileType]}</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[14px] font-medium truncate group-hover:text-blue-600 transition-colors">{file.name}</p>
                                        <p className="text-[11px] text-black/40">{file.size || file.source} • {file.uploadedAt}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'activity' && (
                        <div className="space-y-0">
                            {MOCK_VERSIONS.map((v, i) => (
                                <div key={v.id} className="flex gap-4 relative pb-6">
                                    {i !== MOCK_VERSIONS.length - 1 && <div className="absolute left-[9px] top-6 bottom-0 w-px bg-black/[0.06]" />}
                                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0"><History size={11} className="text-black/30" /></div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[13px] font-medium">{v.version}</span>
                                            <span className="text-[12px] text-black/40">{v.author} • {v.date}</span>
                                        </div>
                                        <p className="text-[13px] text-black/60 mt-0.5">{v.changes}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
