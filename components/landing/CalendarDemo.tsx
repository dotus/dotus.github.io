import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, Flame, AlertCircle } from 'lucide-react';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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

const TYPE_BG: Record<string, string> = {
    embargo: 'bg-violet-50',
    deadline: 'bg-red-50',
    launch: 'bg-emerald-50',
};

const ALL_EVENTS = [
    { id: 1, day: 14, title: 'Partner Review', quest: 'Series B Funding', type: 'deadline', time: '17:00', priority: 'high' },
    { id: 2, day: 15, title: 'Embargo Lift', quest: 'Series B Funding', type: 'embargo', time: '09:00', priority: 'high' },
    { id: 3, day: 15, title: 'Public Launch', quest: 'Series B Funding', type: 'launch', time: '10:00', priority: 'high' },
    { id: 4, day: 18, title: 'Blog Publish', quest: 'Product V3', type: 'launch', time: '09:00' },
    { id: 5, day: 22, title: 'Product Launch', quest: 'Product V3', type: 'launch', time: '10:00' },
];

const UPCOMING_EVENTS = [
    { id: 1, day: 14, title: 'Partner Review Due', quest: 'Series B Funding', type: 'deadline', time: '17:00' },
    { id: 2, day: 15, title: 'Embargo Lift', quest: 'Series B Funding', type: 'embargo', time: '09:00' },
    { id: 3, day: 15, title: 'Public Launch', quest: 'Series B Funding', type: 'launch', time: '10:00' },
];

export const CalendarDemo: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState(15);
    const currentMonth = 0;
    const year = 2026;
    const daysInMonth = 31;
    const firstDay = 4;
    
    const selectedEvents = ALL_EVENTS.filter(e => e.day === selectedDay);
    
    const getEventsForDay = (day: number) => ALL_EVENTS.filter(e => e.day === day);
    const hasEvent = (day: number) => getEventsForDay(day).length > 0;
    const getEventType = (day: number) => {
        const events = getEventsForDay(day);
        return events[0]?.type || 'embargo';
    };

    return (
        <div className="bg-white border border-black/5 shadow-2xl shadow-black/10 overflow-hidden rounded-xl">
            {/* Header */}
            <div className="p-3 border-b border-black/5 bg-white/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-teal-600" />
                    <h3 className="text-sm font-medium text-gray-900">Tracker</h3>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-[11px] text-black/50">
                        {MONTHS[currentMonth]} {year}
                    </span>
                    <button className="p-1 hover:bg-black/5 rounded text-black/40 hover:text-black transition-colors">
                        <ChevronLeft size={12} />
                    </button>
                    <button className="p-1 hover:bg-black/5 rounded text-black/40 hover:text-black transition-colors">
                        <ChevronRight size={12} />
                    </button>
                </div>
            </div>
            
            <div className="flex h-[320px]">
                {/* Left - Calendar */}
                <div className="flex-1 p-3 bg-[#FAF9F6]">
                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-y-1 mb-3">
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
                            const isSelected = day === selectedDay;
                            const dayEvents = getEventsForDay(day);
                            const hasEvents = dayEvents.length > 0;
                            const hasHighPriority = dayEvents.some(e => e.priority === 'high');
                            
                            return (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDay(day)}
                                    className={`
                                        h-7 w-7 mx-auto rounded-full flex items-center justify-center text-[11px] relative
                                        transition-all duration-150
                                        ${isSelected ? 'bg-teal-600 text-white shadow-md' : 'text-black/70 hover:bg-black/5'}
                                    `}
                                >
                                    {day}
                                    {hasEvents && !isSelected && (
                                        <span 
                                            className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full"
                                            style={{ backgroundColor: TYPE_COLORS[getEventType(day)] }}
                                        />
                                    )}
                                    {hasHighPriority && !isSelected && (
                                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                    
                    {/* Selected Date Events */}
                    <div className="border-t border-black/5 pt-3">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-medium text-black/70">
                                Wed, Jan {selectedDay}
                            </span>
                            {selectedEvents.length > 0 && (
                                <span className="text-[10px] text-black/40">{selectedEvents.length} events</span>
                            )}
                        </div>
                        
                        {selectedEvents.length > 0 ? (
                            <div className="space-y-2">
                                {selectedEvents.map(event => (
                                    <div
                                        key={event.id}
                                        className="flex items-start gap-2 p-2 bg-white rounded-lg border border-black/5 hover:shadow-sm transition-all"
                                    >
                                        <div 
                                            className="w-1 h-full min-h-[20px] rounded-full shrink-0 mt-0.5"
                                            style={{ backgroundColor: TYPE_COLORS[event.type] }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5">
                                                <p className="text-[11px] font-medium text-gray-900 truncate">{event.title}</p>
                                                {event.priority === 'high' && (
                                                    <Flame className="w-3 h-3 text-red-500 fill-current" />
                                                )}
                                            </div>
                                            <p className="text-[9px] text-gray-500 truncate">{event.quest}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span 
                                                    className="text-[8px] font-medium px-1.5 py-0.5 rounded"
                                                    style={{ 
                                                        backgroundColor: `${TYPE_COLORS[event.type]}15`,
                                                        color: TYPE_COLORS[event.type],
                                                    }}
                                                >
                                                    {TYPE_LABELS[event.type]}
                                                </span>
                                                <span className="text-[9px] text-black/40 flex items-center gap-0.5">
                                                    <Clock className="w-2.5 h-2.5" />
                                                    {event.time}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-[11px] text-black/30 py-3 text-center">No events scheduled</p>
                        )}
                    </div>
                </div>
                
                {/* Right - Upcoming List */}
                <div className="w-44 border-l border-black/[0.06] bg-white p-3">
                    <div className="flex items-center gap-1.5 mb-3">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-[11px] font-semibold text-black/60 uppercase tracking-wide">Upcoming</span>
                    </div>
                    
                    <div className="space-y-2">
                        {UPCOMING_EVENTS.map((event, i) => (
                            <div 
                                key={event.id}
                                className={`p-2 rounded-lg border cursor-pointer transition-all ${
                                    event.day === selectedDay 
                                        ? 'bg-teal-50 border-teal-200' 
                                        : 'bg-gray-50 border-transparent hover:border-black/5'
                                }`}
                                onClick={() => setSelectedDay(event.day)}
                            >
                                <div className="flex items-center justify-between mb-0.5">
                                    <span 
                                        className="text-[8px] font-medium px-1.5 py-0.5 rounded"
                                        style={{ 
                                            backgroundColor: `${TYPE_COLORS[event.type]}15`,
                                            color: TYPE_COLORS[event.type],
                                        }}
                                    >
                                        {TYPE_LABELS[event.type]}
                                    </span>
                                    <span className="text-[9px] text-black/40">Jan {event.day}</span>
                                </div>
                                <p className={`text-[11px] font-medium truncate ${event.day === selectedDay ? 'text-teal-900' : 'text-gray-900'}`}>
                                    {event.title}
                                </p>
                                <p className="text-[9px] text-black/50 truncate">{event.quest}</p>
                            </div>
                        ))}
                    </div>
                    
                    {/* Stats */}
                    <div className="mt-4 pt-3 border-t border-black/[0.06]">
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                                <p className="text-lg font-serif text-teal-600">5</p>
                                <p className="text-[8px] text-black/40 uppercase tracking-wide">Events</p>
                            </div>
                            <div>
                                <p className="text-lg font-serif text-violet-600">2</p>
                                <p className="text-[8px] text-black/40 uppercase tracking-wide">Embargos</p>
                            </div>
                            <div>
                                <p className="text-lg font-serif text-red-500">1</p>
                                <p className="text-[8px] text-black/40 uppercase tracking-wide">Due</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
