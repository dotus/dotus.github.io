import React from 'react';
import { Sparkles, User, CheckCircle2 } from 'lucide-react';

export const HybridDemo: React.FC = () => (
    <div className="relative min-w-[280px]">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 space-y-4">
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 bg-white/10 rounded-lg rounded-tl-none p-4 min-w-0">
                    <p className="text-sm text-white/80 leading-relaxed break-words">
                        I've drafted the Series B announcement based on your FAQ doc. I've highlighted the 40% ARR growth and new market expansion.
                    </p>
                </div>
            </div>
            
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 bg-white/20 rounded-lg rounded-tl-none p-4 min-w-0">
                    <p className="text-sm text-white leading-relaxed break-words">
                        Great start. Let's lead with the customer milestone instead — 10M users is stronger than the revenue number for this audience.
                    </p>
                </div>
            </div>
            
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 bg-white/10 rounded-lg rounded-tl-none p-4 min-w-0">
                    <p className="text-sm text-white/80 leading-relaxed break-words">
                        Updated. New lead: "10 million users later, we're announcing our Series B..." Also adjusted the journalist shortlist to focus on consumer tech rather than fintech.
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs text-emerald-400 font-medium">Ready for review</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
