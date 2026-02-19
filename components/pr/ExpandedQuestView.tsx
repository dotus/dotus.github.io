import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Clock, Calendar, ChevronLeft, Mail, Search, X, Flame } from 'lucide-react';
import { Quest, getStatusLabel, TypeBadge } from './StatsOverview';

interface ExpandedQuestViewProps {
    quests: Quest[];
    status: string;
    onQuestClick: (quest: Quest) => void;
    onBack?: () => void;
    animatingId: number | null;
}

const STATUS_COLORS: Record<string, string> = {
    draft: '#6B7280',
    review: '#F59E0B',
    ready: '#10B981',
    live: '#3B82F6',
};

export const ExpandedQuestView: React.FC<ExpandedQuestViewProps> = ({ 
    quests, 
    status, 
    onQuestClick,
    onBack,
    animatingId 
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isBackPressed, setIsBackPressed] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const statusColor = STATUS_COLORS[status];

    const filteredQuests = useMemo(() => {
        if (!searchQuery.trim()) return quests;
        const query = searchQuery.toLowerCase();
        return quests.filter(q => 
            q.title.toLowerCase().includes(query) ||
            q.synopsis.toLowerCase().includes(query) ||
            q.tags.some(t => t.toLowerCase().includes(query)) ||
            q.author.toLowerCase().includes(query)
        );
    }, [quests, searchQuery]);

    useEffect(() => {
        if (isSearchFocused && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchFocused]);

    const handleBackClick = () => {
        if (!onBack) return;
        setIsBackPressed(true);
        setTimeout(() => {
            onBack();
        }, 100);
    };

    return (
        <div className="h-full flex flex-col bg-gray-50/30">
            {/* Header with integrated search */}
            <div className="px-6 py-4 border-b border-black/[0.06] bg-white">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button 
                            onClick={handleBackClick}
                            disabled={isBackPressed}
                            className={`
                                p-2 rounded-lg transition-all duration-200 shrink-0
                                ${isBackPressed 
                                    ? 'bg-black/5 scale-95' 
                                    : 'hover:bg-black/[0.03]'
                                }
                            `}
                        >
                            <ChevronLeft 
                                size={18} 
                                className={`
                                    transition-transform duration-200
                                    ${isBackPressed ? 'text-black/60 -translate-x-0.5' : 'text-black/40'}
                                `} 
                            />
                        </button>
                    )}
                    
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: statusColor }} />
                        <h3 className="text-[16px] font-medium">{getStatusLabel(status as any)}</h3>
                        <span className="text-sm text-black/30 font-serif">{quests.length}</span>
                    </div>

                    {/* Expandable search in header */}
                    <div className={`
                        flex-1 flex justify-end transition-all duration-300 ease-out
                        ${isSearchFocused || searchQuery ? 'max-w-md' : 'max-w-[140px]'}
                    `}>
                        <div className={`
                            relative flex items-center transition-all duration-300
                            ${isSearchFocused || searchQuery ? 'w-full' : 'w-[140px]'}
                        `}>
                            <Search size={14} className="absolute left-3 text-black/30 shrink-0" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => {
                                    if (!searchQuery) setIsSearchFocused(false);
                                }}
                                className={`
                                    w-full bg-gray-50 border border-black/[0.06] rounded-lg 
                                    pl-9 pr-8 py-2 text-sm 
                                    placeholder:text-black/30 
                                    focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/10 
                                    focus:bg-white
                                    transition-all duration-300
                                `}
                            />
                            {(searchQuery || isSearchFocused) && (
                                <button 
                                    onClick={() => {
                                        setSearchQuery('');
                                        setIsSearchFocused(false);
                                    }}
                                    className="absolute right-2 p-1 hover:bg-black/5 rounded transition-colors"
                                >
                                    <X size={12} className="text-black/40" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Results count below header when searching */}
                {searchQuery && (
                    <div className="mt-2 text-[12px] text-black/40 pl-10">
                        {filteredQuests.length} result{filteredQuests.length !== 1 ? 's' : ''}
                    </div>
                )}
            </div>

            {/* Quest cards - full width, no max-w */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-3">
                    {filteredQuests.map((quest, idx) => {
                        const isAnimating = animatingId === quest.id;
                        
                        return (
                            <button
                                key={quest.id}
                                onClick={() => onQuestClick(quest)}
                                disabled={isAnimating}
                                className={`
                                    group w-full text-left bg-white rounded-xl p-5 border border-black/[0.06] 
                                    hover:border-black/[0.12] hover:shadow-lg transition-all duration-300
                                    ${isAnimating ? 'scale-[1.02] shadow-xl' : ''}
                                `}
                                style={{ 
                                    animationDelay: `${idx * 50}ms`,
                                    transformOrigin: 'center center'
                                }}
                            >
                                {/* Badges row */}
                                <div className="flex items-center gap-2 mb-3">
                                    <TypeBadge type={quest.type} />
                                    {quest.priority === 'high' && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-100 text-red-700 border border-red-200">
                                            <Flame size={10} className="fill-current" />
                                            Hot
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h4 className="text-lg font-serif font-medium text-black mb-2 group-hover:text-blue-600 transition-colors duration-200">
                                    {quest.title}
                                </h4>

                                {/* Synopsis */}
                                <p className="text-[14px] text-black/50 leading-relaxed mb-4 line-clamp-2">
                                    {quest.synopsis}
                                </p>

                                {/* Meta row */}
                                <div className="flex items-center gap-4 text-[12px] text-black/40">
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[9px]">
                                            {quest.author[0]}
                                        </span>
                                        {quest.author}
                                    </span>
                                    {quest.deadline && (
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={12} />
                                            {quest.deadline}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1.5">
                                        <Clock size={12} />
                                        {quest.updated}
                                    </span>
                                </div>

                                {/* Email DL */}
                                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-black/[0.04]">
                                    <Mail size={12} className="text-black/30" />
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        {quest.emailDL.slice(0, 2).map(email => (
                                            <span key={email} className="text-[10px] text-black/40 bg-black/[0.03] px-2 py-0.5 rounded">
                                                {email}
                                            </span>
                                        ))}
                                        {quest.emailDL.length > 2 && (
                                            <span className="text-[10px] text-black/30">+{quest.emailDL.length - 2}</span>
                                        )}
                                    </div>
                                </div>
                            </button>
                        );
                    })}

                    {filteredQuests.length === 0 && searchQuery && (
                        <div className="text-center py-12">
                            <p className="text-sm text-black/40">No quests found</p>
                            <button 
                                onClick={() => setSearchQuery('')}
                                className="mt-2 text-[13px] text-blue-600 hover:text-blue-700"
                            >
                                Clear search
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
