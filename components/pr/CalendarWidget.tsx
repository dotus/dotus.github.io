import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

const TYPE_GRADIENTS: Record<string, string> = {
    embargo: 'from-violet-500 to-purple-600',
    deadline: 'from-rose-500 to-red-600',
    launch: 'from-emerald-400 to-teal-500',
};

const TYPE_LABELS: Record<string, string> = {
    embargo: 'Embargo',
    deadline: 'Due',
    launch: 'Launch',
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

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
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500/10 to-emerald-500/10 flex items-center justify-center border border-teal-500/20 shadow-sm">
                        <CalendarIcon size={14} className="text-teal-600" />
                    </div>
                    <span className="text-[15px] font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">Timeline</span>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-50/80 p-1.5 rounded-xl border border-black/5 shadow-inner">
                    <button
                        onClick={() => setCurrentMonth(m => Math.max(0, m - 1))}
                        disabled={currentMonth === 0}
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-white shadow-sm border border-black/5 text-black/40 hover:text-black hover:border-black/10 disabled:opacity-30 disabled:hover:border-black/5 transition-all"
                    >
                        <ChevronLeft size={14} />
                    </button>
                    <span className="text-[13px] font-medium text-black px-2 tabular-nums">
                        {MONTHS[currentMonth]} <span className="text-black/40 font-normal">{year}</span>
                    </span>
                    <button
                        onClick={() => setCurrentMonth(m => Math.min(11, m + 1))}
                        disabled={currentMonth === 11}
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-white shadow-sm border border-black/5 text-black/40 hover:text-black hover:border-black/10 disabled:opacity-30 disabled:hover:border-black/5 transition-all"
                    >
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>

            {/* Mini Calendar Grid */}
            <div className="relative">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={currentMonth}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-7 gap-y-2 gap-x-1"
                    >
                        {DAYS.map((d, i) => (
                            <div key={i} className="text-center text-[10px] font-medium text-black/30 tracking-widest uppercase mb-1">
                                {d}
                            </div>
                        ))}
                        {Array.from({ length: firstDay }, (_, i) => (
                            <div key={`e${i}`} className="h-9" />
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
                                    className="relative h-9 w-full flex items-center justify-center group outline-none"
                                >
                                    <div className={`
                                        absolute inset-1 rounded-xl transition-all duration-300
                                        ${isSelected ? 'bg-gradient-to-br from-teal-500 to-emerald-600 shadow-md shadow-teal-500/20 scale-100' : 'bg-transparent scale-95 group-hover:scale-100 group-hover:bg-gray-100'}
                                        ${!isSelected && isToday ? 'border border-teal-500/30 bg-teal-50/50' : ''}
                                    `} />

                                    <span className={`
                                        relative z-10 text-[13px] transition-colors duration-300
                                        ${isSelected ? 'text-white font-semibold' : 'text-gray-700 font-medium'}
                                        ${!isSelected && isToday ? 'text-teal-700 font-bold' : ''}
                                        ${!isSelected && !isToday ? 'group-hover:text-black' : ''}
                                    `}>
                                        {day}
                                    </span>

                                    {hasDeadline && !isSelected && (
                                        <div className="absolute bottom-2 flex gap-[2px] z-10">
                                            {deadlines.slice(0, 3).map((d, idx) => (
                                                <span
                                                    key={idx}
                                                    className={`w-1 h-1 rounded-full bg-gradient-to-tr ${TYPE_GRADIENTS[d.type] || 'from-gray-400 to-gray-500'}`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                    {hasDeadline && isSelected && (
                                        <div className="absolute bottom-2 flex gap-[2px] z-10 opacity-70">
                                            <span className="w-2 h-0.5 rounded-full bg-white" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Selected Date Events */}
            <div className="relative">
                <AnimatePresence mode="wait">
                    {selectedDate && (
                        <motion.div
                            key={selectedDate}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="pt-2 border-t border-black/[0.04]"
                        >
                            <div className="flex items-center justify-between mb-3 px-1">
                                <span className="text-[13px] font-semibold text-gray-800">
                                    {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                                </span>
                                {selectedDeadlines.length > 0 && (
                                    <span className="text-[11px] font-medium bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                                        {selectedDeadlines.length} {selectedDeadlines.length === 1 ? 'event' : 'events'}
                                    </span>
                                )}
                            </div>

                            {selectedDeadlines.length > 0 ? (
                                <div className="space-y-2">
                                    {selectedDeadlines.map((event, i) => (
                                        <motion.button
                                            key={event.id}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            onClick={() => handleEventClick(event)}
                                            className="w-full group text-left"
                                        >
                                            <div className="relative overflow-hidden rounded-xl bg-teal-50/40 backdrop-blur-sm border border-teal-100/60 p-3.5 transition-all duration-200 group-hover:bg-teal-50/60 group-hover:border-teal-200/80">
                                                {/* Subtle teal glow effect */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-teal-100/20 via-transparent to-emerald-100/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                
                                                <div className="relative flex items-start gap-3">
                                                    {/* Type indicator dot */}
                                                    <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 bg-gradient-to-br ${TYPE_GRADIENTS[event.type]}`} />
                                                    
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <p className="text-[13px] font-medium text-gray-900 group-hover:text-teal-700 transition-colors truncate">
                                                                {event.questTitle}
                                                            </p>
                                                            {event.time && (
                                                                <span className="text-[10px] font-medium text-teal-600/70 bg-teal-100/50 px-1.5 py-0.5 rounded flex items-center gap-1 shrink-0">
                                                                    <Clock size={9} />
                                                                    {event.time}
                                                                </span>
                                                            )}
                                                        </div>
                                                        
                                                        <div className="flex items-center gap-2">
                                                            <span className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/60 text-gray-600 border border-teal-100/50`}>
                                                                {TYPE_LABELS[event.type]}
                                                            </span>
                                                            <span className="text-[11px] text-gray-500 truncate">
                                                                {event.title}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-6 px-4 bg-gray-50/50 rounded-2xl border border-dashed border-black/[0.08] flex flex-col items-center justify-center text-center">
                                    <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-black/5 flex items-center justify-center mb-2">
                                        <CalendarIcon size={16} className="text-gray-300" />
                                    </div>
                                    <p className="text-[13px] font-medium text-gray-500 mb-0.5">Free day</p>
                                    <p className="text-[11px] text-gray-400">No events scheduled</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
