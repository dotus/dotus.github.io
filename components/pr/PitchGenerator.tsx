import React, { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';

export const PitchGenerator: React.FC = () => {
    const [generated, setGenerated] = useState(false);
    const [copied, setCopied] = useState(false);

    const MOCK_PITCH = `Subject: Exclusive: AI-Native PR Agency Strife Relations raises mock Series B

Hi [Name],

I saw your recent piece on the evolution of agency models and thought this would be right up your alley.

Strife Relations is today announcing its Series B (mock) funding. What makes this interesting is their approach: completely eschewing the traditional account manager model for an AI-first collaborative dashboard that puts founders in direct control.

I have the CEO, [Founder Name], available for an interview this Thursday or Friday.

Attached is the full press release.

Best,
The Strife Team`;

    return (
        <div className="h-full flex flex-col max-w-3xl mx-auto py-8">
            <div className="text-center mb-10">
                <h1 className="font-serif text-4xl mb-4">AI Pitch Generator</h1>
                <p className="text-black/60">Turn your press release into a compelling email pitch in seconds.</p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-8 shadow-sm">
                {!generated ? (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Select Press Release</label>
                            <select className="w-full p-3 bg-gray-50 border border-black/10 rounded-lg">
                                <option>Series B Announcement (Draft v3)</option>
                                <option>New CTO Appointment</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Pitch Angle</label>
                            <div className="grid grid-cols-3 gap-3">
                                <button className="p-4 border border-black/10 rounded-lg hover:border-black/30 hover:bg-black/5 transition-all text-left">
                                    <div className="font-bold mb-1">Exclusive</div>
                                    <div className="text-xs text-black/50">For top-tier exclusives</div>
                                </button>
                                <button className="p-4 border-2 border-black rounded-lg bg-black/5 text-left relative">
                                    <div className="absolute top-2 right-2 text-black"><Check size={14} /></div>
                                    <div className="font-bold mb-1">Embargo</div>
                                    <div className="text-xs text-black/50">Standard embargo pitch</div>
                                </button>
                                <button className="p-4 border border-black/10 rounded-lg hover:border-black/30 hover:bg-black/5 transition-all text-left">
                                    <div className="font-bold mb-1">Follow-up</div>
                                    <div className="text-xs text-black/50">Checking in</div>
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => setGenerated(true)}
                            className="w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-black/90 transition-colors flex items-center justify-center gap-2"
                        >
                            <Sparkles size={18} /> Generate Pitch
                        </button>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-serif text-xl">Generated Draft</h3>
                            <div className="flex gap-2">
                                <button onClick={() => setGenerated(false)} className="text-sm text-black/40 hover:text-black px-3 py-1">Try Again</button>
                                <button
                                    onClick={() => { navigator.clipboard.writeText(MOCK_PITCH); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-black/80"
                                >
                                    {copied ? <Check size={14} /> : <Copy size={14} />}
                                    {copied ? 'Copied' : 'Copy Text'}
                                </button>
                            </div>
                        </div>
                        <div className="bg-gray-50 border border-black/5 rounded-xl p-6 whitespace-pre-wrap font-mono text-sm leading-relaxed text-black/80">
                            {MOCK_PITCH}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
