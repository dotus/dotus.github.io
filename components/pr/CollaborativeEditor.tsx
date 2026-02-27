import React from 'react';
import { Bold, Italic, List, Undo, Redo, Share2, Printer, Settings } from 'lucide-react';
import { CLIENT_PERSONNEL } from './StatsOverview';

export const CollaborativeEditor: React.FC = () => {
    return (
        <div className="flex flex-col h-full bg-white">
            {/* Toolbar - More robust like GDocs */}
            <div className="flex items-center justify-between p-2 px-4 border-b border-black/5 bg-[#F9F9F9]">
                <div className="flex items-center gap-1">
                    <button className="p-1.5 hover:bg-black/5 rounded transition-colors text-black/60"><Undo size={14} /></button>
                    <button className="p-1.5 hover:bg-black/5 rounded transition-colors text-black/60"><Redo size={14} /></button>
                    <button className="p-1.5 hover:bg-black/5 rounded transition-colors text-black/60"><Printer size={14} /></button>
                    <div className="w-px h-4 bg-black/10 mx-2" />
                    <select className="bg-transparent text-sm font-medium text-black/80 hover:bg-black/5 p-1 rounded outline-none cursor-pointer">
                        <option>Normal text</option>
                        <option>Heading 1</option>
                        <option>Heading 2</option>
                    </select>
                    <div className="w-px h-4 bg-black/10 mx-2" />
                    <button className="p-1.5 hover:bg-black/5 rounded transition-colors text-black/60"><Bold size={14} /></button>
                    <button className="p-1.5 hover:bg-black/5 rounded transition-colors text-black/60"><Italic size={14} /></button>
                    <button className="p-1.5 hover:bg-black/5 rounded transition-colors text-black/60"><List size={14} /></button>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-xs text-white font-medium shadow-sm z-10" title="You">ME</div>
                        <div className="w-8 h-8 rounded-full bg-purple-600 border-2 border-white flex items-center justify-center text-xs text-white font-medium shadow-sm z-0" title={`${CLIENT_PERSONNEL[1].name} (${CLIENT_PERSONNEL[1].role})`}>{CLIENT_PERSONNEL[1].initials}</div>
                    </div>
                    <button className="px-4 py-2 bg-[#C2E7FF] text-[#001D35] text-xs font-semibold rounded-full hover:bg-[#B3DEFF] flex items-center gap-2 transition-colors">
                        <Share2 size={12} /> Share
                    </button>
                    <button className="p-2 hover:bg-black/5 rounded-full"><Settings size={16} className="text-black/40" /></button>
                </div>
            </div>

            {/* Document Paper Effect */}
            <div className="flex-1 overflow-y-auto bg-[#F0F2F5] p-8 flex justify-center">
                <div className="w-full max-w-[850px] bg-white min-h-[1100px] shadow-sm border border-black/5 p-20 relative">
                    {/* Safe area indicators or mock rulers could go here */}

                    <div className="font-serif text-lg leading-loose text-black/90">
                        <h1 className="text-4xl font-bold mb-8 text-black tracking-tight">Nebula AI: Redefining Search with Neural Graphics - Draft v1</h1>

                        <p className="mb-6">
                            <span className="bg-purple-100/50 px-1 rounded relative group cursor-help border-b-2 border-purple-400/50 transition-colors hover:bg-purple-200/50">
                                Nebula AI
                                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 opacity-0 group-hover:opacity-100 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] whitespace-nowrap pointer-events-none transform translate-y-2 group-hover:translate-y-0 z-50">
                                    <div className="bg-white border border-black/5 rounded-xl overflow-hidden flex flex-col min-w-[280px]">
                                        <div className="p-3 border-b border-black/5 flex items-center gap-3 bg-gray-50/50">
                                            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-[10px] text-white font-bold">{CLIENT_PERSONNEL[1].initials}</div>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-bold text-black flex items-center gap-1.5">
                                                    {CLIENT_PERSONNEL[1].name}
                                                    <span className="text-[9px] bg-black text-white px-1.5 py-0.5 rounded-full uppercase tracking-tighter">{CLIENT_PERSONNEL[1].role}</span>
                                                </span>
                                                <span className="text-[9px] text-black/40">2h ago</span>
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <p className="text-[12px] text-black/80 leading-relaxed whitespace-normal italic">
                                                "Should we mention the specific GPU architecture? It might add more technical weight for the tier-1 tech press."
                                            </p>
                                        </div>
                                        <div className="px-3 pb-3">
                                            <div className="flex items-center gap-2 bg-black/[0.03] rounded-lg px-2 py-1.5 border border-black/5">
                                                <input type="text" placeholder={`Reply to ${CLIENT_PERSONNEL[1].name.split(' ')[0]}...`} className="bg-transparent text-[11px] outline-none flex-1 placeholder:text-black/30" />
                                                <button className="text-[10px] font-bold text-blue-600 hover:text-blue-700">Send</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Arrow */}
                                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-black/5 rotate-45"></div>
                                </div>
                            </span>
                            , the leader in neural graphics and spatial computing, today announced the launch of "Orion," the first GPU-accelerated search engine that visualizes information in real-time 3D space.
                        </p>
                        <p className="mb-6">
                            Founded in 2025 by a team of former NVIDIA and OpenAI researchers, Nebula AI has raised $45M in Series A funding to pursue its vision of an immersive web experience that goes beyond traditional browser constraints.
                        </p>
                        <p className="mb-6 text-black/80">
                            "Traditional search is limited by 2D lists and flat text. Orion brings information to life in a way that resonates with how we perceive the world," said the CTO.
                        </p>

                        <p className="text-black/40 italic mt-12 border-l-2 border-black/10 pl-4 py-2">
                            [Insert quote from Lead Investor regarding spatial web growth...]
                        </p>

                        {/* Fake Cursor */}
                        <div className="absolute top-[320px] left-[180px] w-0.5 h-6 bg-purple-500 animate-pulse z-10">
                            <div className="absolute -top-5 -left-2 bg-purple-500 text-white text-[9px] px-2 py-0.5 rounded font-bold shadow-sm">{CLIENT_PERSONNEL[1].name.split(' ')[0]}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
