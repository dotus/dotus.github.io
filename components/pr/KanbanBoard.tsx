import React, { useState } from 'react';
import { MoreHorizontal, Plus, Maximize2, Minimize2 } from 'lucide-react';
import { MOCK_QUESTS, Quest, TypeBadge, PriorityBadge } from './StatsOverview';

interface ColumnConfig {
    id: Quest['status'];
    title: string;
    color: string;
    bgColor: string;
}

const COLUMNS: ColumnConfig[] = [
    { id: 'draft', title: 'Draft', color: '#6B7280', bgColor: '#F9FAFB' },
    { id: 'review', title: 'In Review', color: '#F59E0B', bgColor: '#FFFBEB' },
    { id: 'ready', title: 'Ready', color: '#10B981', bgColor: '#ECFDF5' },
    { id: 'live', title: 'Published', color: '#3B82F6', bgColor: '#EFF6FF' },
];

interface KanbanBoardProps {
    onQuestClick?: (quest: Quest) => void;
    onExpandColumn?: (status: Quest['status']) => void;
    animatingId?: number | null;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ 
    onQuestClick, 
    onExpandColumn,
    animatingId 
}) => {
    const [collapsedColumns, setCollapsedColumns] = useState<Set<string>>(new Set());

    const getColumnQuests = (status: Quest['status']) => {
        return MOCK_QUESTS.filter(d => d.status === status);
    };

    const toggleCollapse = (columnId: string) => {
        setCollapsedColumns(prev => {
            const next = new Set(prev);
            if (next.has(columnId)) {
                next.delete(columnId);
            } else {
                next.add(columnId);
            }
            return next;
        });
    };

    const handleExpand = (columnId: Quest['status']) => {
        if (onExpandColumn) {
            onExpandColumn(columnId);
        }
    };

    const handleQuestClick = (quest: Quest) => {
        if (onQuestClick) {
            onQuestClick(quest);
        }
    };

    const expandedCount = COLUMNS.length - collapsedColumns.size;

    return (
        <div className="h-full p-4">
            <div className="flex h-full gap-3">
                {COLUMNS.map(col => {
                    const isCollapsed = collapsedColumns.has(col.id);
                    const quests = getColumnQuests(col.id);

                    return (
                        <div 
                            key={col.id} 
                            className={`
                                ${isCollapsed ? 'w-12 shrink-0' : 'flex-1 min-w-0'}
                                flex flex-col transition-all duration-300 ease-out
                            `}
                            style={!isCollapsed ? { flex: `1 1 ${100 / expandedCount}%` } : undefined}
                        >
                            {/* Header */}
                            <div className={`
                                flex items-center mb-2 px-1
                                ${isCollapsed ? 'flex-col gap-2' : 'justify-between'}
                            `}>
                                {!isCollapsed ? (
                                    <>
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: col.color }} />
                                            <span className="text-sm font-medium truncate">{col.title}</span>
                                            <span className="text-xs text-black/30 shrink-0">{quests.length}</span>
                                        </div>
                                        <div className="flex items-center gap-0.5 shrink-0">
                                            <button 
                                                onClick={() => handleExpand(col.id)}
                                                className="p-1.5 rounded text-black/20 hover:text-black/60 hover:bg-black/[0.03] transition-colors"
                                                title="Expand column"
                                            >
                                                <Maximize2 size={14} />
                                            </button>
                                            <button 
                                                onClick={() => toggleCollapse(col.id)}
                                                className="p-1.5 rounded text-black/20 hover:text-black/60 hover:bg-black/[0.03] transition-colors"
                                                title="Collapse column"
                                            >
                                                <Minimize2 size={14} />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: col.color }} />
                                        <button 
                                            onClick={() => toggleCollapse(col.id)}
                                            className="p-1 text-black/20 hover:text-black/60 shrink-0"
                                        >
                                            <Maximize2 size={14} />
                                        </button>
                                        <span 
                                            className="text-xs font-medium text-black/40 truncate"
                                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                                        >
                                            {col.title}
                                        </span>
                                        <span className="text-[10px] text-black/30 shrink-0">{quests.length}</span>
                                    </>
                                )}
                            </div>

                            {/* Cards */}
                            {!isCollapsed && (
                                <div 
                                    className="flex-1 rounded-xl border overflow-hidden"
                                    style={{ backgroundColor: col.bgColor, borderColor: `${col.color}20` }}
                                >
                                    <div className="p-3 space-y-3 h-full overflow-y-auto">
                                        {quests.map(quest => {
                                            const isAnimating = animatingId === quest.id;
                                            return (
                                                <div 
                                                    key={quest.id}
                                                    onClick={() => handleQuestClick(quest)}
                                                    className={`
                                                        bg-white rounded-lg p-3 border border-black/5 
                                                        shadow-sm hover:shadow-md hover:border-black/10 transition-all cursor-pointer group
                                                        ${isAnimating ? 'scale-[1.02] shadow-xl' : ''}
                                                    `}
                                                >
                                                    <div className="flex items-start justify-between mb-2 gap-2">
                                                        <TypeBadge type={quest.type} />
                                                        {quest.priority === 'high' && (
                                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                                        )}
                                                    </div>
                                                    <h4 className="text-sm font-medium leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                        {quest.title}
                                                    </h4>
                                                    <div className="flex items-center justify-between pt-2 border-t border-black/5">
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[8px] shrink-0">
                                                                {quest.author[0]}
                                                            </div>
                                                            <span className="text-[10px] text-black/40 truncate">{quest.updated}</span>
                                                        </div>
                                                        <button onClick={(e) => { e.stopPropagation(); }} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-black/5 rounded text-black/30 transition-all shrink-0">
                                                            <MoreHorizontal size={12} />
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        <button className="w-full py-2 flex items-center justify-center gap-1 text-[11px] text-black/30 hover:text-black/60 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-black/5 border-dashed">
                                            <Plus size={12} />Add Quest
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
