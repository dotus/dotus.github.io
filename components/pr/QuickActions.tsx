import React from 'react';
import { PenLine, Mail, Users } from 'lucide-react';

interface ActionItem {
    icon: React.ReactNode;
    label: string;
    description: string;
    count?: string;
}

const ACTIONS: ActionItem[] = [
    {
        icon: <PenLine size={18} strokeWidth={1.5} />,
        label: 'Create Quest',
        description: 'Draft with AI assistance',
    },
    {
        icon: <Mail size={18} strokeWidth={1.5} />,
        label: 'Send Pitch',
        description: '3 journalists pending',
        count: '3',
    },
    {
        icon: <Users size={18} strokeWidth={1.5} />,
        label: 'Add Contact',
        description: 'Journalist or outlet',
    },
];

export const QuickActions: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-black/5">
                <h4 className="text-sm font-medium">Actions</h4>
            </div>
            <div className="p-2">
                {ACTIONS.map((action, idx) => (
                    <button
                        key={idx}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group text-left"
                    >
                        <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-100 transition-colors">
                            {action.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-black">{action.label}</span>
                                {action.count && (
                                    <span className="text-[10px] font-medium bg-teal-600 text-white px-1.5 py-0.5 rounded-full">
                                        {action.count}
                                    </span>
                                )}
                            </div>
                            <p className="text-[11px] text-black/40">{action.description}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
