import React, { useState, useEffect } from 'react';
import { Smile, Frown, Meh, RefreshCw } from 'lucide-react';

export const ToneChecker: React.FC = () => {
    const [tweet, setTweet] = useState("Excited to announce our Series B funding! #startup #tech");
    const [tone, setTone] = useState<'positive' | 'neutral' | 'negative'>('positive');
    const [analyzing, setAnalyzing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnalyzing(false);
            setTone(tweet.length > 50 ? 'positive' : 'neutral');
        }, 1000);
        return () => clearTimeout(timer);
    }, [tweet]);

    return (
        <div className="bg-white border border-black/10 rounded-xl p-4 h-full flex flex-col shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-black/40 mb-3 flex items-center justify-between">
                Social Tone Check
                {analyzing && <RefreshCw size={12} className="animate-spin" />}
            </h3>

            <textarea
                className="flex-1 w-full bg-gray-50 border border-black/5 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-black/20 transition-colors placeholder:text-black/20"
                placeholder="Draft your tweet here..."
                value={tweet}
                onChange={(e) => { setTweet(e.target.value); setAnalyzing(true); }}
            />

            <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xs text-black/40">Predicted Tone:</span>
                    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${tone === 'positive' ? 'bg-emerald-100 text-emerald-700' :
                            tone === 'neutral' ? 'bg-gray-100 text-gray-700' :
                                'bg-red-100 text-red-700'
                        }`}>
                        {tone === 'positive' && <Smile size={12} />}
                        {tone === 'neutral' && <Meh size={12} />}
                        {tone === 'negative' && <Frown size={12} />}
                        <span className="capitalize">{tone}</span>
                    </div>
                </div>
                <span className="text-[10px] text-black/30">{tweet.length}/280</span>
            </div>
        </div>
    );
};
