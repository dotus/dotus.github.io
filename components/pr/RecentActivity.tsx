import React from 'react';

interface Activity {
    id: number;
    user: string;
    action: string;
    target: string;
    time: string;
}

const ACTIVITIES: Activity[] = [
    { id: 1, user: 'Sarah Jenkins', action: 'commented on', target: 'Series B Announcement', time: '2h ago' },
    { id: 2, user: 'You', action: 'edited', target: 'AI Policy Framework', time: '3h ago' },
    { id: 3, user: 'You', action: 'published', target: 'Year in Review 2025', time: '1d ago' },
    { id: 4, user: 'John Smith', action: 'sent pitch to', target: 'TechCrunch', time: '1d ago' },
];

export const RecentActivity: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-black/5">
                <h4 className="text-sm font-medium">Activity</h4>
            </div>
            <div className="p-3 space-y-1">
                {ACTIVITIES.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-black to-black/60 text-white flex items-center justify-center text-[9px] font-medium shrink-0 mt-0.5">
                            {activity.user[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs leading-relaxed">
                                <span className="font-medium text-black">{activity.user}</span>
                                <span className="text-black/50"> {activity.action} </span>
                                <span className="text-black">{activity.target}</span>
                            </p>
                            <p className="text-[10px] text-black/30 mt-0.5">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
