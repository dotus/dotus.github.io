import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, ChevronRight, Image, FileText, Sparkles, Clock, UserRoundPen } from 'lucide-react';
import { CollaborativeEditor } from './CollaborativeEditor';
import { KanbanBoard } from './KanbanBoard';

import { PitchGenerator } from './PitchGenerator';
import { MediaDatabase } from './MediaDatabase';
import { Analytics } from './Analytics';
import { DocumentList } from './DocumentList';
import { CalendarWidget } from './CalendarWidget';

type Tab = 'dashboard' | 'pitch' | 'media' | 'analytics' | 'calendar';
type ViewMode = 'list' | 'editor';

export const PRDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('dashboard');
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [brandNarrativeOpen, setBrandNarrativeOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#FAF9F6] text-black font-sans selection:bg-black/10 overflow-hidden">
            {/* Dash Background Texture */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} />

            {/* Sidebar Navigation - Removed */}


            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden relative z-10 flex flex-col">
                {/* Top Bar */}
                <header className="h-12 border-b border-black/5 bg-white px-6 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-8">
                        {/* Branding */}
                        <div className="shrink-0 group cursor-default">
                            <h2 className="font-serif text-lg text-black font-bold">strife <span className="text-black group-hover:text-black transition-colors">relations</span></h2>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex items-center gap-1">
                            <TextNavButton
                                active={activeTab === 'dashboard'}
                                onClick={() => { setActiveTab('dashboard'); setViewMode('list'); }}
                                label="My workspace"
                            />
                            <TextNavButton
                                active={activeTab === 'pitch'}
                                onClick={() => setActiveTab('pitch')}
                                label="Compose"
                            />
                            <TextNavButton
                                active={activeTab === 'media'}
                                onClick={() => setActiveTab('media')}
                                label="Contacts"
                            />
                            <TextNavButton
                                active={activeTab === 'analytics'}
                                onClick={() => setActiveTab('analytics')}
                                label="Insights"
                            />
                            <TextNavButton
                                active={activeTab === 'calendar'}
                                onClick={() => setActiveTab('calendar')}
                                label="Schedule"
                            />
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-black/[0.03] border-0 rounded-full px-4 py-1.5 text-xs w-40 focus:outline-none focus:ring-1 focus:ring-blue-500/10 transition-all placeholder:text-black/30"
                            />
                        </div>
                        <div className="flex items-center gap-3 pl-4 border-l border-black/5">
                            <div className="w-7 h-7 rounded-full bg-black/5 text-black/60 flex items-center justify-center text-[10px] font-semibold border border-black/5">M</div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 md:p-8">

                    {activeTab === 'dashboard' && (
                        <div className="flex flex-col max-w-[1800px] mx-auto gap-8 pb-10">
                            {viewMode === 'list' ? (
                                <>
                                    {/* Top Section: Workspace & Context */}
                                    <div className="flex flex-col gap-4 shrink-0">
                                        {/* Docs & Calendar Area */}
                                        <div className="w-full flex flex-col xl:flex-row gap-4 h-[600px]">
                                            {/* Document List - Main Focus */}
                                            <div className="flex-1 h-full min-w-0">
                                                <DocumentList onOpenDoc={() => setViewMode('editor')} />
                                            </div>

                                            {/* Calendar Widget - Contextual Helper */}
                                            <div className="w-full xl:w-[260px] h-full shrink-0">
                                                <CalendarWidget />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Brand Narrative Section */}
                                    <div className="bg-white rounded-xl border border-black/5 md:shadow-sm ring-1 ring-black/5 overflow-hidden">
                                        <button
                                            onClick={() => setBrandNarrativeOpen(!brandNarrativeOpen)}
                                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-serif text-lg font-medium text-black tracking-tight">Brand Narrative</h3>
                                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100/50">
                                                    <Clock size={10} />
                                                    <span className="text-[10px] font-medium">Strife Partner Reviewed 12d ago</span>
                                                </div>
                                            </div>
                                            {brandNarrativeOpen ? <ChevronDown size={16} className="text-black/40" /> : <ChevronRight size={16} className="text-black/40" />}
                                        </button>
                                        {brandNarrativeOpen && (
                                            <div className="px-4 pb-4 border-t border-black/5 pt-4 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                                                {/* Narrative */}
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[10px] uppercase font-bold tracking-wider text-black/40">Company Narrative</span>
                                                        <span className="text-[10px] text-black/30">Last updated 3d ago</span>
                                                    </div>
                                                    <div className="p-3 bg-gray-50 rounded-lg border border-black/5">
                                                        <p className="text-sm text-black/70 leading-relaxed">We're building the infrastructure for the next generation of AI-powered communications. Our mission is to democratize access to world-class PR for startups and mission-driven organizations.</p>
                                                    </div>
                                                </div>
                                                {/* Brand Assets */}
                                                <div className="space-y-2">
                                                    <span className="text-[10px] uppercase font-bold tracking-wider text-black/40">Brand Assets</span>
                                                    <div className="flex gap-2">
                                                        <div className="flex-1 p-3 bg-gray-50 rounded-lg border border-black/5 flex items-center gap-3 hover:border-black/15 transition-colors cursor-pointer">
                                                            <div className="w-8 h-8 bg-black/5 rounded flex items-center justify-center">
                                                                <Image size={14} className="text-black/40" />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-medium">Logo Kit</p>
                                                                <p className="text-[10px] text-black/40">PNG, SVG, PDF</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 p-3 bg-gray-50 rounded-lg border border-black/5 flex items-center gap-3 hover:border-black/15 transition-colors cursor-pointer">
                                                            <div className="w-8 h-8 bg-black/5 rounded flex items-center justify-center">
                                                                <FileText size={14} className="text-black/40" />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-medium">Brand Guide</p>
                                                                <p className="text-[10px] text-black/40">PDF, 12 pages</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Request Review Button */}
                                                <button className="w-full py-2 text-[11px] font-medium bg-black text-white hover:bg-black/90 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2">
                                                    <UserRoundPen size={12} className="text-white/70" /> Request Strife Partner Review
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Bottom Section: Full Width Campaign */}
                                    <div className="flex-1 bg-white rounded-2xl border border-black/5 md:shadow-sm ring-1 ring-black/5 overflow-hidden flex flex-col min-h-[600px]">
                                        <header className="px-4 py-3 border-b border-black/5 flex justify-between items-center bg-gray-50/50">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-serif text-lg font-medium text-black tracking-tight">Media Outreach</h3>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {/* Campaign Selector */}
                                                <button className="flex items-center gap-2 pl-3 pr-2 py-1.5 bg-white border border-black/10 rounded-lg shadow-sm hover:border-black/20 transition-all group">
                                                    <span className="text-[11px] font-medium">Campaign: <span className="text-black/60 group-hover:text-black transition-colors">Series B Launch</span></span>
                                                    <ChevronDown size={14} className="text-black/30" />
                                                </button>

                                                <div className="w-px h-6 bg-black/5 mx-1" />

                                                <button className="text-[10px] font-medium px-2 py-1.5 rounded border border-black/10 hover:bg-white transition-colors text-black/60 hover:text-black">Filter</button>

                                                <button className="text-[10px] font-medium px-3 py-1.5 rounded bg-black text-white shadow-sm hover:bg-black/90 transition-colors flex items-center gap-1.5 ring-offset-1 focus:ring-2 ring-black/10">
                                                    <UserRoundPen size={12} className="text-white/70" /> Request Partner Review
                                                </button>
                                            </div>
                                        </header>
                                        <div className="flex-1 p-4 overflow-x-auto bg-[#F2EBE3] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                                            <KanbanBoard />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="mb-4 flex items-center gap-4">
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className="p-2 hover:bg-black/5 rounded-lg transition-colors text-black/60 hover:text-black"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <span className="text-sm text-black/40">Back to Dashboard</span>
                                    </div>
                                    <div className="flex-1 bg-white rounded-2xl border border-black/10 shadow-lg overflow-hidden relative">
                                        <CollaborativeEditor />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'pitch' && <PitchGenerator />}
                    {activeTab === 'media' && <div className="h-full bg-white rounded-2xl border border-black/5 shadow-sm ring-1 ring-black/5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"><MediaDatabase /></div>}
                    {activeTab === 'analytics' && <div className="h-full bg-white rounded-2xl border border-black/5 shadow-sm ring-1 ring-black/5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"><Analytics /></div>}
                    {activeTab === 'calendar' && <div className="p-20 text-center font-serif text-3xl text-black/20">Calendar Module Loading...</div>}

                </div>
            </div>
        </div>
    );
};

const StatBadge = ({ label, value, trend }: { label: string, value: string, trend: string }) => (
    <div className="flex flex-col items-end px-4 py-1 border-r last:border-0 border-black/10">
        <span className="text-[10px] uppercase font-bold text-black/30 tracking-wider">{label}</span>
        <div className="text-lg font-serif font-medium flex items-center gap-2">
            {value} <span className="text-[10px] font-sans text-green-600 bg-green-50 px-1.5 rounded-full">{trend}</span>
        </div>
    </div>
);

const TextNavButton = ({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) => (
    <button
        onClick={onClick}
        className={`px-3 py-1.5 text-[12.5px] transition-all duration-200 rounded-lg font-medium ${active
            ? 'text-blue-600 bg-blue-50/50'
            : 'text-black/40 hover:text-black/70 hover:bg-black/5'
            }`}
    >
        {label}
    </button>
);
