import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, MousePointer, Eye, Newspaper } from 'lucide-react';

const data = [
    { name: 'Jan 8', views: 400, reads: 240 },
    { name: 'Jan 9', views: 300, reads: 139 },
    { name: 'Jan 10', views: 2000, reads: 980 },
    { name: 'Jan 11', views: 2780, reads: 1908 },
    { name: 'Jan 12', views: 1890, reads: 1800 },
    { name: 'Jan 13', views: 2390, reads: 1800 },
    { name: 'Jan 14', views: 3490, reads: 2300 },
];

export const Analytics: React.FC = () => {
    return (
        <div className="p-8 h-full overflow-y-auto">
            <h1 className="font-serif text-4xl mb-8">Campaign Impact</h1>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
                <StatCard title="Total Views" value="24.5k" change="+12%" icon={<Eye size={20} />} />
                <StatCard title="Article Pickups" value="12" change="+3" icon={<Newspaper size={20} />} />
                <StatCard title="Journalist Opens" value="68%" change="+5%" icon={<MousePointer size={20} />} />
            </div>

            {/* Chart */}
            <div className="bg-white border border-black/10 rounded-xl p-6 shadow-sm mb-8 h-[400px]">
                <h3 className="text-lg font-medium mb-6">Newsroom Traffic</h3>
                <ResponsiveContainer width="100%" height="85%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#000000" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Area type="monotone" dataKey="views" stroke="#000000" fillOpacity={1} fill="url(#colorViews)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Recent Placements */}
            <div className="bg-white border border-black/10 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4">Confirmed Placements</h3>
                <div className="space-y-4">
                    <PlacementRow outlet="TechCrunch" title="Caybles aims to disrupt PR with AI" date="2 hours ago" />
                    <PlacementRow outlet="VentureBeat" title="The future of automated public relations" date="1 day ago" />
                    <PlacementRow outlet="PRWeek" title="New players entering the AI agency space" date="2 days ago" />
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-xl border border-black/10 shadow-sm">
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-gray-50 rounded-lg text-black/60">{icon}</div>
            <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full gap-1">
                <ArrowUpRight size={12} /> {change}
            </span>
        </div>
        <div className="text-3xl font-bold mb-1 font-serif">{value}</div>
        <div className="text-sm text-black/40">{title}</div>
    </div>
);

const PlacementRow = ({ outlet, title, date }: { outlet: string, title: string, date: string }) => (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-black/5 last:border-0">
        <div>
            <div className="font-medium text-sm text-black">{outlet}</div>
            <div className="text-sm text-black/60">{title}</div>
        </div>
        <div className="text-xs text-black/40">{date}</div>
    </div>
);
