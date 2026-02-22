import React from 'react';
import { Send, Clock, Eye, MessageCircle } from 'lucide-react';

const DISTRIBUTIONS = [
    { 
        id: 1, 
        title: 'Series B Funding Announcement', 
        type: 'Press Release',
        status: 'sent' as const, 
        journalists: 5,
        opened: 3, 
        responses: 1, 
        time: '2h ago' 
    },
    { 
        id: 2, 
        title: 'Product Launch V3', 
        type: 'Blog Post',
        status: 'scheduled' as const, 
        journalists: 8,
        time: 'Tomorrow 9:00 AM' 
    },
];

const getStatusColor = (status: 'sent' | 'scheduled' | 'draft') => {
    switch (status) {
        case 'sent':
            return 'bg-teal-50 text-teal-700 border-teal-100';
        case 'scheduled':
            return 'bg-amber-50 text-amber-700 border-amber-100';
        default:
            return 'bg-gray-100 text-gray-600 border-gray-200';
    }
};

const getStatusIcon = (status: 'sent' | 'scheduled' | 'draft') => {
    switch (status) {
        case 'sent':
            return <Send size={18} className="text-teal-600" />;
        case 'scheduled':
            return <Clock size={18} className="text-amber-600" />;
        default:
            return null;
    }
};

export const DistributionsDemo: React.FC = () => (
    <div className="bg-white border border-black/5 shadow-2xl shadow-black/10 overflow-hidden rounded-xl">
        <div className="p-4 border-b border-black/5 bg-white/80 backdrop-blur-sm">
            <h3 className="font-serif text-xl font-medium text-gray-900">Active Distributions</h3>
            <p className="text-xs text-gray-500 mt-0.5">Track your outreach campaigns</p>
        </div>
        <div className="p-4 space-y-3 bg-[#FAF9F6]">
            {DISTRIBUTIONS.map(dist => (
                <div 
                    key={dist.id} 
                    className="flex items-start gap-4 p-4 bg-white rounded-lg border border-black/5 hover:shadow-md hover:border-black/10 transition-all cursor-pointer group"
                >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        dist.status === 'sent' ? 'bg-teal-50' : 'bg-amber-50'
                    }`}>
                        {getStatusIcon(dist.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border bg-gray-100 text-gray-700 border-gray-200">
                                {dist.type}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-md border font-medium ${getStatusColor(dist.status)}`}>
                                {dist.status === 'sent' ? 'Sent' : 'Scheduled'}
                            </span>
                        </div>
                        <h4 className="text-sm font-medium text-gray-900 break-words mb-1 group-hover:text-blue-600 transition-colors">
                            {dist.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                            <span>{dist.journalists} journalists</span>
                            {dist.status === 'sent' && (
                                <>
                                    <span className="flex items-center gap-1 text-blue-600">
                                        <Eye className="w-3 h-3" /> {dist.opened} opened
                                    </span>
                                    <span className="flex items-center gap-1 text-emerald-600">
                                        <MessageCircle className="w-3 h-3" /> {dist.responses} response{dist.responses !== 1 ? 's' : ''}
                                    </span>
                                </>
                            )}
                            <span className="ml-auto text-gray-400 text-[10px]">{dist.time}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
