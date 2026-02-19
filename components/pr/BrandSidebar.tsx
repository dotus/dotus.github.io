import React, { useState } from 'react';
import { ShieldCheck, Download, Edit2, ChevronDown, ChevronRight, Hash, Send } from 'lucide-react';

export const BrandSidebar: React.FC = () => {
    const [openSection, setOpenSection] = useState<string | null>('narrative');
    const [tweet, setTweet] = useState("Excited to announce our Series B! #tech");

    const toggle = (id: string) => setOpenSection(openSection === id ? null : id);

    return (
        <div className="flex flex-col gap-6 h-full">
            {/* Context Section */}
            <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-black/5 flex justify-between items-center">
                    <h2 className="font-serif text-lg">Brand Context</h2>
                </div>

                {/* Narrative Accordion */}
                <div className="border-b border-black/5">
                    <button
                        onClick={() => toggle('narrative')}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
                    >
                        <span className="text-sm font-medium">Core Narrative</span>
                        {openSection === 'narrative' ? <ChevronDown size={16} className="text-black/40" /> : <ChevronRight size={16} className="text-black/40" />}
                    </button>
                    {openSection === 'narrative' && (
                        <div className="p-4 pt-0 text-sm text-black/70 leading-relaxed animate-in slide-in-from-top-2">
                            "Strife Relations is democratizing high-end PR for the next generation of policy and tech founders."
                            <button className="flex items-center gap-2 text-xs text-black/40 mt-3 hover:text-black transition-colors">
                                <Edit2 size={12} /> Edit Narrative
                            </button>
                        </div>
                    )}
                </div>

                {/* Assets Accordion */}
                <div>
                    <button
                        onClick={() => toggle('assets')}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
                    >
                        <span className="text-sm font-medium">Brand Assets</span>
                        {openSection === 'assets' ? <ChevronDown size={16} className="text-black/40" /> : <ChevronRight size={16} className="text-black/40" />}
                    </button>
                    {openSection === 'assets' && (
                        <div className="p-4 pt-0 space-y-2 animate-in slide-in-from-top-2">
                            <AssetRow label="Logo Pack" type="ZIP" />
                            <AssetRow label="Founder Headshots" type="JPG" />
                            <AssetRow label="Boilerplate" type="DOC" />
                        </div>
                    )}
                </div>
            </div>

            {/* Social / Tone Section */}
            <div className="bg-white rounded-xl border border-black/5 shadow-sm p-4">
                <h3 className="font-serif text-lg mb-3 flex items-center gap-2">
                    <Hash size={18} className="text-black/40" /> Social Tone
                </h3>
                <textarea
                    className="w-full bg-gray-50 border border-black/5 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-black/20 transition-colors mb-3 h-24"
                    placeholder="Draft a post..."
                    value={tweet}
                    onChange={(e) => setTweet(e.target.value)}
                />
                <div className="flex justify-between items-center">
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">● Positive</span>
                    <button className="text-xs font-medium text-black/60 hover:text-black flex items-center gap-1">
                        <ShieldCheck size={12} /> Review
                    </button>
                </div>
            </div>

            {/* Global Partner Review */}
            <div className="bg-gradient-to-br from-[#0a0a0a] to-[#2a2a2a] rounded-xl p-6 text-white text-center mt-auto shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
                <h3 className="font-serif text-xl mb-2">Partner Review</h3>
                <p className="text-white/60 text-xs mb-4">Request a comprehensive strategy audit from our experts.</p>
                <button className="w-full bg-white text-black py-2.5 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors shadow-lg active:scale-95 duration-200">
                    Request Audit
                </button>
            </div>
        </div>
    );
};

const AssetRow = ({ label, type }: { label: string, type: string }) => (
    <div className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 rounded-lg -mx-2 transition-colors">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-[10px] font-bold text-black/40">{type}</div>
            <span className="text-sm text-black/80">{label}</span>
        </div>
        <Download size={14} className="text-black/20 group-hover:text-black transition-colors" />
    </div>
);
