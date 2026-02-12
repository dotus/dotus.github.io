import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarEvent {
    id: number;
    questId: number;
    questTitle: string;
    title: string;
    date: string;
    time?: string;
    type: 'embargo' | 'deadline' | 'launch';
}

const DEADLINES: CalendarEvent[] = [
    { id: 1, questId: 1, questTitle: 'Series B Funding Announcement', title: 'Embargo Lift', date: '2026-01-15', time: '09:00', type: 'embargo' },
    { id: 2, questId: 1, questTitle: 'Series B Funding Announcement', title: 'Partner Review Due', date: '2026-01-15', time: '17:00', type: 'deadline' },
    { id: 3, questId: 5, questTitle: 'Product Launch V3', title: 'Product V3 Launch', date: '2026-01-22', time: '10:00', type: 'launch' },
    { id: 4, questId: 3, questTitle: 'Q1 Strategy Memo', title: 'Q1 Strategy Review', date: '2026-01-20', type: 'deadline' },
    { id: 5, questId: 8, questTitle: 'Partnership Press Release', title: 'Partnership PR', date: '2026-02-05', time: '08:00', type: 'embargo' },
];

const TYPE_COLORS: Record<string, string> = {
    embargo: '#8B5CF6',
    deadline: '#EF4444',
    launch: '#10B981',
};

const TYPE_LABELS: Record<string, string> = {
    embargo: 'Embargo',
    deadline: 'Due',
    launch: 'Launch',
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

interface CalendarWidgetProps {
    onEventClick?: (questId: number, eventId: number) => void;
}

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({ onEventClick }) => {
    const [currentMonth, setCurrentMonth] = useState(0);
    const [selectedDate, setSelectedDate] = useState<string | null>('2026-01-15');
    
    const year = 2026;
    const daysInMonth = new Date(year, currentMonth + 1, 0).getDate();
    const firstDay = new Date(year, currentMonth, 1).getDay();
    
    const deadlinesForMonth = useMemo(() => {
        return DEADLINES.filter(d => new Date(d.date).getMonth() === currentMonth);
    }, [currentMonth]);
    
    const getDeadlinesForDay = (day: number) => {
        const dateStr = `${year}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return deadlinesForMonth.filter(d => d.date === dateStr);
    };
    
    const selectedDeadlines = useMemo(() => {
        if (!selectedDate) return [];
        return DEADLINES.filter(d => d.date === selectedDate).sort((a, b) => {
            if (!a.time) return 1;
            if (!b.time) return -1;
            return a.time.localeCompare(b.time);
        });
    }, [selectedDate]);

    const handleEventClick = (event: CalendarEvent) => {
        if (onEventClick) {
            onEventClick(event.questId, event.id);
        }
    };

    return (
        <div className="space-y-4">
            {/* Header with Tracker title and month nav */}
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-black">Tracker</span>
                <div className="flex items-center gap-1">
                    <span className="text-xs text-black/50 mr-1">
                        {MONTHS[currentMonth]} {year}
                    </span>
                    <button 
                        onClick={() => setCurrentMonth(m => Math.max(0, m - 1))}
                        disabled={currentMonth === 0}
                        className="p-1 hover:bg-black/5 rounded text-black/40 hover:text-black disabled:opacity-30 transition-colors"
                    >
                        <ChevronLeft size={12} />
                    </button>
                    <button 
                        onClick={() => setCurrentMonth(m => Math.min(11, m + 1))}
                        disabled={currentMonth === 11}
                        className="p-1 hover:bg-black/5 rounded text-black/40 hover:text-black disabled:opacity-30 transition-colors"
                    >
                        <ChevronRight size={12} />
                    </button>
                </div>
            </div>

            {/* Mini Calendar */}
            <div>
                <div className="grid grid-cols-7 gap-y-1">
                    {DAYS.map((d, i) => (
                        <div key={i} className="text-center text-[9px] font-bold text-black/30 py-1">
                            {d}
                        </div>
                    ))}
                    {Array.from({ length: firstDay }, (_, i) => (
                        <div key={`e${i}`} className="h-7" />
                    ))}
                    {Array.from({ length: daysInMonth }, (_, i) => {
                        const day = i + 1;
                        const dateStr = `${year}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const deadlines = getDeadlinesForDay(day);
                        const hasDeadline = deadlines.length > 0;
                        const isSelected = selectedDate === dateStr;
                        const isToday = dateStr === '2026-01-12';
                        
                        return (
                            <button
                                key={day}
                                onClick={() => setSelectedDate(dateStr)}
                                className={`
                                    h-7 w-7 mx-auto rounded-full flex items-center justify-center text-[11px] relative
                                    transition-all duration-150
                                    ${isSelected ? 'bg-teal-600 text-white' : ''}
                                    ${!isSelected && isToday ? 'bg-teal-50 text-teal-700 font-medium' : ''}
                                    ${!isSelected && !isToday ? 'text-black/70 hover:bg-black/5' : ''}
                                `}
                            >
                                {day}
                                {hasDeadline && !isSelected && (
                                    <span 
                                        className="absolute bottom-0.5 w-1 h-1 rounded-full"
                                        style={{ backgroundColor: deadlines[0].type ? TYPE_COLORS[deadlines[0].type] : '#9CA3AF' }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
            
            {/* Selected Date Events */}
            {selectedDate && (
                <div className="border-t border-black/5 pt-3">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium">
                            {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                        </span>
                        {selectedDeadlines.length > 0 && (
                            <span className="text-[10px] text-black/40">{selectedDeadlines.length} events</span>
                        )}
                    </div>
                    
                    {selectedDeadlines.length > 0 ? (
                        <div className="space-y-2">
                            {selectedDeadlines.map(event => (
                                <button
                                    key={event.id}
                                    onClick={() => handleEventClick(event)}
                                    className="w-full flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group text-left"
                                >
                                    <div 
                                        className="w-1 h-full min-h-[24px] rounded-full shrink-0 mt-0.5"
                                        style={{ backgroundColor: TYPE_COLORS[event.type] }}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-black truncate group-hover:text-teal-600 transition-colors">
                                            {event.questTitle}
                                        </p>
                                        <p className="text-[11px] text-black/50">{event.title}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span 
                                                className="text-[9px] font-medium px-1.5 py-0.5 rounded"
                                                style={{ 
                                                    backgroundColor: `${TYPE_COLORS[event.type]}15`,
                                                    color: TYPE_COLORS[event.type],
                                                }}
                                            >
                                                {TYPE_LABELS[event.type]}
                                            </span>
                                            {event.time && (
                                                <span className="text-[10px] text-black/40 flex items-center gap-1">
                                                    <Clock size={9} />
                                                    {event.time}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className="text-[11px] text-black/30 py-2">No events scheduled</p>
                    )}
                </div>
            )}
        </div>
    );
};
