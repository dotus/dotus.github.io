import React, { useState } from 'react';
import { ChevronLeft, Search, Bell, Plus, LayoutGrid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NewQuestView } from './NewQuestView';
import { KanbanBoard } from './KanbanBoard';
import { MediaDatabase } from './MediaDatabase';
import { DocumentList } from './DocumentList';
import { CalendarWidget } from './CalendarWidget';
import { MOCK_QUESTS, Quest, filterQuests, type FilterType } from './StatsOverview';
import { SocialReachStats } from './SocialReachStats';
import { ActiveDistributions } from './ActiveDistributions';
import { DistributionsPage } from './DistributionsPage';
import { RecentActivity } from './RecentActivity';
import { ExpandedQuestView } from './ExpandedQuestView';
import { QuestDetailView } from './QuestDetailView';
import { ProductEditor } from './ProductEditor';
import { ProductCreator } from './ProductCreator';
import { OutreachComposer } from './OutreachComposer';
import type { ProductOutput } from './ProductSection';
import { FileText, FileSpreadsheet, Image as ImageIcon, Link2 } from 'lucide-react';

// Mock data for ProductCreator
const MOCK_WORKING_DOCS = [
    { id: 1, title: 'Series B Press Release', type: 'doc' as const, lastEdited: '2h ago', status: 'review' as const },
    { id: 2, title: 'Q1 Messaging Framework', type: 'slide' as const, lastEdited: '1d ago', status: 'draft' as const },
    { id: 3, title: 'Media Contact List', type: 'sheet' as const, lastEdited: '3d ago', status: 'final' as const },
];

const MOCK_ATTACHED = [
    { id: 4, name: 'Investor Fact Sheet.pdf', fileType: 'pdf' as const, size: '1.2 MB', source: 'Dropbox', uploadedAt: '1d ago', uploadedBy: 'Sarah' },
    { id: 5, name: 'Founder Headshots', fileType: 'image' as const, source: 'Google Drive', uploadedAt: '2d ago', uploadedBy: 'John' },
    { id: 6, name: 'A16Z Guidelines', fileType: 'link' as const, source: 'Notion', uploadedAt: '4d ago', uploadedBy: 'Sarah' },
    { id: 7, name: 'Term Sheet v3.pdf', fileType: 'pdf' as const, size: '450 KB', uploadedAt: '1w ago', uploadedBy: 'Mike' },
];

type Tab = 'dashboard' | 'distributions' | 'network';
type ViewMode = 'list' | 'editor' | 'detail' | 'product' | 'product-creator' | 'outreach';
type DashboardView = 'grid' | 'pipeline';

export const PRDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('dashboard');
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [dashboardView, setDashboardView] = useState<DashboardView>('grid');
    const [activeFilter] = useState<FilterType>('all');
    const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
    const [animatingQuestId, setAnimatingQuestId] = useState<number | null>(null);
    const [isNavigatingBack, setIsNavigatingBack] = useState(false);
    const [highlightedEventId, setHighlightedEventId] = useState<number | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<ProductOutput | null>(null);
    const [detailDefaultTab, setDetailDefaultTab] = useState<'overview' | 'timeline' | 'distribution' | 'documents' | 'activity'>('overview');

    const filteredQuests = filterQuests(MOCK_QUESTS, activeFilter);

    const handleQuestClick = (quest: Quest) => {
        setAnimatingQuestId(quest.id);
        setHighlightedEventId(null);
        setTimeout(() => {
            setSelectedQuest(quest);
            setViewMode('detail');
            setAnimatingQuestId(null);
        }, 300);
    };

    const handleCloseDetail = () => {
        setViewMode('list');
        setHighlightedEventId(null);
        setDetailDefaultTab('overview');
        setTimeout(() => setSelectedQuest(null), 300);
    };

    const handleOpenProduct = (product: ProductOutput) => {
        setSelectedProduct(product);
        setViewMode('product');
    };

    const handleCreateProduct = () => {
        setViewMode('product-creator');
    };

    const handleCloseProduct = () => {
        setViewMode('detail');
        setTimeout(() => setSelectedProduct(null), 300);
    };

    const handleCloseProductCreator = () => {
        setViewMode('detail');
    };

    const handleOpenOutreach = () => {
        setViewMode('outreach');
    };

    const handleCloseOutreach = () => {
        setViewMode('detail');
    };

    const handleCampaignSent = () => {
        setViewMode('detail');
    };

    const saveProductToStorage = (product: ProductOutput & { questId?: number }) => {
        const questId = product.questId || selectedQuest?.id;
        if (!questId) return;
        
        const storageKey = `quest_products_${questId}`;
        const stored = sessionStorage.getItem(storageKey);
        let products: ProductOutput[] = [];
        
        if (stored) {
            try {
                products = JSON.parse(stored);
            } catch {
                products = [];
            }
        }
        
        // Check if product already exists
        const existingIndex = products.findIndex(p => p.id === product.id);
        if (existingIndex >= 0) {
            products[existingIndex] = product;
        } else {
            products.push(product);
        }
        
        sessionStorage.setItem(storageKey, JSON.stringify(products));
    };

    const handleProductCreated = (product: ProductOutput & { questId?: number }) => {
        saveProductToStorage(product);
        setSelectedProduct(product);
        setViewMode('product');
    };

    const handleUpdateProduct = (updated: ProductOutput & { questId?: number }) => {
        saveProductToStorage(updated);
        setSelectedProduct(updated);
    };

    const handleExpandColumn = (status: Quest['status']) => {
        setIsNavigatingBack(false);
        setActiveFilter(status);
    };

    const handleBackFromExpanded = () => {
        setIsNavigatingBack(true);
        setTimeout(() => {
            setActiveFilter('all');
            setIsNavigatingBack(false);
        }, 50);
    };

    const handleCalendarEventClick = (questId: number, eventId: number) => {
        const quest = MOCK_QUESTS.find(q => q.id === questId);
        if (quest) {
            // Create a copy to avoid reference issues
            const questCopy = { ...quest };
            setHighlightedEventId(eventId);
            setAnimatingQuestId(questCopy.id);
            setTimeout(() => {
                setSelectedQuest(questCopy);
                setViewMode('detail');
                setAnimatingQuestId(null);
            }, 300);
        }
    };

    const handleCampaignBadgeClick = (quest: Quest) => {
        setDetailDefaultTab('distribution');
        handleQuestClick(quest);
    };

    return (
        <div className="flex h-screen bg-[#FAF9F6] text-black font-sans selection:bg-black/10 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-0" 
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} 
            />

            <div className="flex-1 overflow-hidden relative z-10 flex flex-col">
                {/* Header with centered prominent search */}
                <header className="h-16 border-b border-black/5 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-6 w-64">
                        <div className="shrink-0">
                            <h2 className="font-serif text-lg text-black font-bold">&also</h2>
                        </div>
                        <nav className="flex items-center gap-1 bg-black/[0.03] p-1 rounded-xl">
                            <NavPill active={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); setViewMode('list'); setSelectedQuest(null); }} label="Quests" />
                            <NavPill active={activeTab === 'distributions'} onClick={() => setActiveTab('distributions')} label="Distributions" />
                            <NavPill active={activeTab === 'network'} onClick={() => setActiveTab('network')} label="Network" />
                        </nav>
                    </div>

                    {/* Centered prominent search */}
                    <div className="flex-1 flex justify-center max-w-2xl">
                        <div className="relative w-full max-w-md">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
                            <input 
                                type="text" 
                                placeholder="Search anything" 
                                className="w-full bg-gray-50 border border-black/[0.08] rounded-xl pl-11 pr-4 py-2.5 text-sm placeholder:text-black/30 focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black/15 focus:bg-white transition-all shadow-sm hover:shadow-md hover:border-black/10"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-64 justify-end">
                        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 text-black/40 hover:text-black transition-colors">
                            <Bell size={18} />
                        </button>
                        <div className="flex items-center gap-2 pl-3 border-l border-black/5">
                            <div className="w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-semibold">M</div>
                        </div>
                    </div>
                </header>

                {/* Stats Ticker */}
                {activeTab === 'dashboard' && viewMode === 'list' && <SocialReachStats />}

                {/* Content */}
                <div className="flex-1 overflow-hidden relative">
                    <AnimatePresence mode="wait">
                        {activeTab === 'dashboard' && viewMode === 'list' && (
                            <motion.div
                                key="dashboard-list"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="h-full overflow-y-auto"
                            >
                                <div className="max-w-[1600px] mx-auto p-6 space-y-6">
                                    <div className="grid grid-cols-12 gap-6">
                                        <div className="col-span-9 space-y-4">
                                            {/* Header - simplified when filtered */}
                                            <AnimatePresence mode="wait">
                                                {activeFilter === 'all' ? (
                                                    <motion.div 
                                                        key="full-header"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="flex items-center justify-between"
                                                    >
                                                        <div>
                                                            <h3 className="font-serif text-xl font-medium">Quests</h3>
                                                            <p className="text-sm text-black/40 mt-0.5">Track from draft to publication</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex items-center gap-1 bg-black/[0.03] p-1 rounded-lg">
                                                                <button onClick={() => setDashboardView('grid')} className={`p-1.5 rounded-md transition-all ${dashboardView === 'grid' ? 'bg-white shadow-sm text-black' : 'text-black/40 hover:text-black'}`}><LayoutGrid size={14} /></button>
                                                                <button onClick={() => setDashboardView('pipeline')} className={`p-1.5 rounded-md transition-all ${dashboardView === 'pipeline' ? 'bg-white shadow-sm text-black' : 'text-black/40 hover:text-black'}`}><List size={14} /></button>
                                                            </div>
                                                            <button onClick={() => setViewMode('editor')} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all"><Plus size={12} />New Quest</button>
                                                        </div>
                                                    </motion.div>
                                                ) : null}
                                            </AnimatePresence>

                                            {/* Pipeline View */}
                                            <AnimatePresence mode="wait">
                                                {activeFilter !== 'all' ? (
                                                    <motion.div 
                                                        key="expanded-view"
                                                        initial={{ opacity: 0, x: 40, scale: 0.98 }}
                                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                                        exit={{ 
                                                            opacity: 0, 
                                                            x: isNavigatingBack ? -40 : 40, 
                                                            scale: 0.98,
                                                            transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
                                                        }}
                                                        transition={{ 
                                                            duration: 0.35, 
                                                            ease: [0.25, 0.1, 0.25, 1]
                                                        }}
                                                        className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden h-[calc(100vh-200px)]"
                                                    >
                                                        <ExpandedQuestView 
                                                            quests={filteredQuests} 
                                                            status={activeFilter}
                                                            onQuestClick={handleQuestClick}
                                                            onBack={handleBackFromExpanded}
                                                            animatingId={animatingQuestId}
                                                        />
                                                    </motion.div>
                                                ) : dashboardView === 'pipeline' ? (
                                                    <motion.div 
                                                        key="pipeline-view"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden"
                                                    >
                                                        <DocumentList onOpenDoc={() => setViewMode('editor')} />
                                                    </motion.div>
                                                ) : (
                                                    <motion.div 
                                                        key="kanban-view"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden h-[calc(100vh-260px)]"
                                                    >
                                                        <KanbanBoard 
                                                            onQuestClick={handleQuestClick} 
                                                            onExpandColumn={handleExpandColumn}
                                                            animatingId={animatingQuestId}
                                                            onCampaignBadgeClick={handleCampaignBadgeClick}
                                                        />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <div className="col-span-3 space-y-6">
                                            <ActiveDistributions />
                                            <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
                                                <div className="p-4">
                                                    <CalendarWidget onEventClick={handleCalendarEventClick} />
                                                </div>
                                            </div>
                                            <RecentActivity />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'dashboard' && viewMode === 'detail' && selectedQuest && (
                            <motion.div
                                key="dashboard-detail"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                                className="h-full"
                            >
                                <QuestDetailView 
                                    quest={selectedQuest} 
                                    onClose={handleCloseDetail} 
                                    onOpenEditor={() => setViewMode('editor')}
                                    onOpenProduct={handleOpenProduct}
                                    onCreateProduct={handleCreateProduct}
                                    onOpenOutreach={handleOpenOutreach}
                                    highlightedEventId={highlightedEventId}
                                    defaultTab={detailDefaultTab}
                                />
                            </motion.div>
                        )}

                        {activeTab === 'dashboard' && viewMode === 'editor' && (
                            <motion.div
                                key="dashboard-editor"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full"
                            >
                                <NewQuestView 
                                    onClose={() => setViewMode('list')}
                                    onSave={(questData) => {
                                        console.log('New quest created:', questData);
                                        setViewMode('list');
                                    }}
                                />
                            </motion.div>
                        )}

                        {activeTab === 'dashboard' && viewMode === 'product' && selectedProduct && (
                            <motion.div
                                key="dashboard-product"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                                className="h-full"
                            >
                                <ProductEditor 
                                    product={selectedProduct}
                                    workingDocs={MOCK_WORKING_DOCS}
                                    attachedDocs={MOCK_ATTACHED}
                                    onClose={handleCloseProduct}
                                    onUpdate={handleUpdateProduct}
                                />
                            </motion.div>
                        )}

                        {activeTab === 'dashboard' && viewMode === 'product-creator' && selectedQuest && (
                            <motion.div
                                key="dashboard-product-creator"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                                className="h-full"
                            >
                                <ProductCreator 
                                    questId={selectedQuest.id}
                                    workingDocs={MOCK_WORKING_DOCS}
                                    attachedDocs={MOCK_ATTACHED}
                                    onClose={handleCloseProductCreator}
                                    onCreated={handleProductCreated}
                                />
                            </motion.div>
                        )}

                        {activeTab === 'dashboard' && viewMode === 'outreach' && selectedQuest && (
                            <motion.div
                                key="dashboard-outreach"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                                className="h-full"
                            >
                                <OutreachComposer 
                                    quest={selectedQuest}
                                    onClose={handleCloseOutreach}
                                    onCampaignSent={handleCampaignSent}
                                />
                            </motion.div>
                        )}

                        {activeTab === 'distributions' && (
                            <motion.div 
                                key="distributions" 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                exit={{ opacity: 0 }} 
                                className="h-full"
                            >
                                <DistributionsPage 
                                    onNavigateToQuest={(quest) => {
                                        setActiveTab('dashboard');
                                        handleQuestClick(quest);
                                    }}
                                />
                            </motion.div>
                        )}
                        {activeTab === 'network' && (
                            <motion.div key="network" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full bg-white">
                                <MediaDatabase />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const NavPill = ({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) => (
    <button onClick={onClick} className={`px-4 py-1.5 text-xs font-medium transition-all duration-200 rounded-lg ${active ? 'bg-teal-600 text-white shadow-sm' : 'text-black/50 hover:text-black hover:bg-black/[0.02]'}`}>
        {label}
    </button>
);
