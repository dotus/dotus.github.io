import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Star, Calendar as CalendarIcon, MoreHorizontal } from 'lucide-react';

interface CalendarEvent {
    id: number;
    title: string;
    type: 'release' | 'meeting' | 'deadline';
    time: string;
}

// Mock data: Events keyed by "YYYY-MM-DD"
const MOCK_EVENTS: Record<string, CalendarEvent[]> = {
    '2026-01-15': [
        { id: 1, title: 'Series B Announcement', type: 'release', time: '09:00 AM' },
        { id: 2, title: 'Team Sync', type: 'meeting', time: '02:00 PM' }
    ],
    '2026-01-20': [
        { id: 3, title: 'Q1 Strategy Review', type: 'meeting', time: '11:00 AM' }
    ],
    '2026-01-22': [
        { id: 4, title: 'Product Launch V3', type: 'release', time: '10:00 AM' }
    ],
    '2026-02-05': [
        { id: 5, title: 'Partnership Press Release', type: 'release', time: '08:00 AM' }
    ]
};

export const CalendarWidget: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 12)); // Start at Jan 12, 2026 (Mock "Today")
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 0, 12));

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const handleDateClick = (day: number) => {
        setSelectedDate(new Date(year, month, day));
    };

    const formatDateKey = (y: number, m: number, d: number) => {
        // Simple YYYY-MM-DD formatter
        const mm = (m + 1).toString().padStart(2, '0');
        const dd = d.toString().padStart(2, '0');
        return `${y}-${mm}-${dd}`;
    };

    const renderCalendarDays = () => {
        const days = [];
        // Empty slots for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-7 w-7" />);
        }

        // Days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const dateKey = formatDateKey(year, month, i);
            const events = MOCK_EVENTS[dateKey];
            const hasEvents = events && events.length > 0;
            const isSelected = selectedDate.getDate() === i && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
            const isToday = i === 12 && month === 0 && year === 2026; // Hardcoded "Today" for mock context

            days.push(
                <button
                    key={i}
                    onClick={() => handleDateClick(i)}
                    className={`
                        relative h-7 w-7 text-[11px] font-medium rounded-full flex items-center justify-center transition-all
                        ${isSelected ? 'bg-black text-white shadow-md' : 'text-black/70 hover:bg-black/5'}
                        ${isToday && !isSelected ? 'text-blue-600 font-bold bg-blue-50' : ''}
                    `}
                >
                    {i}
                    {hasEvents && !isSelected && (
                        <div className="absolute bottom-0.5 w-1 h-1 bg-blue-500 rounded-full" />
                    )}
                </button>
            );
        }
        return days;
    };

    const getSelectedDateEvents = () => {
        const key = formatDateKey(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        return MOCK_EVENTS[key] || [];
    };

    const selectedEvents = getSelectedDateEvents();

    return (
        <div className="flex flex-col h-full bg-white rounded-xl border border-black/5 md:shadow-sm ring-1 ring-black/5 overflow-hidden">
            {/* Calendar Header */}
            <div className="p-3 border-b border-black/5 flex items-center justify-between bg-gray-50/50">
                <h3 className="font-serif text-sm font-medium text-black">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex gap-1">
                    <button onClick={handlePrevMonth} className="p-1 hover:bg-black/5 rounded text-black/40 hover:text-black transition-colors">
                        <ChevronLeft size={14} />
                    </button>
                    <button onClick={handleNextMonth} className="p-1 hover:bg-black/5 rounded text-black/40 hover:text-black transition-colors">
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>

            {/* Calendar View */}
            <div className="p-3 border-b border-black/5">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 mb-2 text-center">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                        <div key={idx} className="text-[9px] font-bold text-black/30 uppercase tracking-widest">{day}</div>
                    ))}
                </div>
                {/* Days Grid */}
                <div className="grid grid-cols-7 place-items-center gap-y-1">
                    {renderCalendarDays()}
                </div>
            </div>

            {/* Selected Date Details */}
            <div className="flex-1 bg-[#FAFAFA] p-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <div className="text-[10px] uppercase font-bold text-black/30 tracking-wider mb-3 flex items-center justify-between">
                    <span>
                        {selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-[9px] bg-black/5 px-1.5 py-0.5 rounded text-black/40">{selectedEvents.length} Events</span>
                </div>

                {selectedEvents.length > 0 ? (
                    <div className="space-y-2">
                        {selectedEvents.map(event => (
                            <div key={event.id} className="p-3 bg-white rounded-lg border border-black/5 shadow-sm group hover:border-black/10 transition-all">
                                <div className="flex items-start justify-between mb-1">
                                    <span className={`
                                        text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border
                                        ${event.type === 'release' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                            event.type === 'deadline' ? 'bg-red-50 text-red-700 border-red-100' :
                                                'bg-gray-50 text-gray-600 border-gray-100'}
                                    `}>
                                        {event.type}
                                    </span>
                                    <button className="text-black/20 hover:text-black transition-colors"><MoreHorizontal size={12} /></button>
                                </div>
                                <h4 className="text-xs font-medium text-black leading-snug mb-1 group-hover:text-blue-600 transition-colors">{event.title}</h4>
                                <div className="flex items-center gap-1.5 text-[10px] text-black/40">
                                    <Clock size={10} />
                                    <span>{event.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-20 flex flex-col items-center justify-center text-black/30 gap-2 border border-dashed border-black/5 rounded-lg">
                        <CalendarIcon size={16} />
                        <span className="text-[10px] font-medium">No events scheduled</span>
                    </div>
                )}
            </div>
            {/* Footer Action */}
            <div className="p-3 border-t border-black/5 bg-white">
                <button className="w-full py-1.5 text-xs font-medium text-black border border-black/10 rounded hover:bg-black hover:text-white transition-all">
                    Add Event
                </button>
            </div>
        </div>
    );
};
