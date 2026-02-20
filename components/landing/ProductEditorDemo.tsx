import React from 'react';
import { ChevronLeft, Bold, Italic, Underline, AlignLeft, List, Link, Image as ImageIcon, FileText, ChevronDown } from 'lucide-react';

const WORKING_DOCS = [
    { id: 1, title: 'Series B Fact Sheet', type: 'doc' },
    { id: 2, title: 'Founder Bio', type: 'doc' },
];

const ATTACHED_DOCS = [
    { id: 3, name: 'Brand Guidelines.pdf', type: 'pdf' },
];

export const ProductEditorDemo: React.FC = () => (
    <div className="demo-container">
        {/* Header with Toolbar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-black/[0.06] bg-white">
            <div className="flex items-center gap-2">
                <button className="w-6 h-6 flex items-center justify-center hover:bg-black/[0.04] rounded-lg transition-colors">
                    <ChevronLeft className="w-3.5 h-3.5 text-black/40" />
                </button>
                <div className="h-3 w-px bg-black/10" />
                <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 bg-blue-50 rounded-md flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-xs font-medium">Series B Announcement</span>
                        <span className="text-[9px] px-1 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded">Draft</span>
                    </div>
                </div>
                
                {/* Toolbar */}
                <div className="h-3 w-px bg-black/10 mx-0.5" />
                <div className="flex items-center gap-0.5">
                    <button className="p-1 rounded hover:bg-teal-50 text-teal-600">
                        <Bold className="w-3 h-3" />
                    </button>
                    <button className="p-1 rounded hover:bg-teal-50 text-teal-600">
                        <Italic className="w-3 h-3" />
                    </button>
                    <button className="p-1 rounded hover:bg-teal-50 text-teal-600">
                        <Underline className="w-3 h-3" />
                    </button>
                    <div className="w-px h-2.5 bg-black/10 mx-0.5" />
                    <button className="p-1 rounded hover:bg-teal-50 text-teal-600">
                        <AlignLeft className="w-3 h-3" />
                    </button>
                    <button className="p-1 rounded hover:bg-teal-50 text-teal-600">
                        <List className="w-3 h-3" />
                    </button>
                    <button className="p-1 rounded hover:bg-teal-50 text-teal-600">
                        <Link className="w-3 h-3" />
                    </button>
                </div>
            </div>
            
            <button className="px-2.5 py-1 bg-teal-600 text-white text-[10px] font-medium rounded-md hover:bg-teal-700 transition-colors">
                Publish
            </button>
        </div>

        {/* Main Content */}
        <div className="flex h-[260px]">
            {/* Left: LinkedIn Editor */}
            <div className="flex-1 overflow-hidden bg-[#F0F2F5]">
                <div className="max-w-md mx-auto px-3 py-3">
                    <div className="bg-white border border-black/[0.08] rounded-lg shadow-sm">
                        {/* LinkedIn Header */}
                        <div className="flex items-center gap-2 px-3 py-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-blue-600" />
                            <div className="flex-1">
                                <p className="text-xs font-semibold text-black">Alex Chen</p>
                                <p className="text-[10px] text-black/60">CEO @ Acme</p>
                                <div className="flex items-center gap-1 text-[9px] text-black/50">
                                    <span>Just now</span>
                                    <span>•</span>
                                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        {/* Editor Content - Compact */}
                        <div className="px-3 pb-2">
                            <div className="text-xs leading-relaxed text-black/90 min-h-[50px] outline-none">
                                <p>We're excited to announce our Series B funding.</p>
                                <p className="mt-1">We started Caybles to make PR accessible to every founder — not just those with $20k/month agency retainers.</p>
                                <p className="mt-1 text-blue-600">#SeriesB #Startup</p>
                            </div>
                        </div>
                        
                        {/* Image Placeholder */}
                        <div className="mx-3 mb-2 h-20 rounded-md border-2 border-dashed border-black/20 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center cursor-pointer hover:border-black/40 transition-colors">
                            <div className="text-center">
                                <ImageIcon className="w-5 h-5 mx-auto mb-1 text-black/30" />
                                <p className="text-[10px] text-black/50">Add photo</p>
                            </div>
                        </div>
                        
                        {/* LinkedIn Actions */}
                        <div className="flex items-center gap-1 px-3 py-1.5 border-t border-black/[0.06]">
                            <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors flex items-center gap-1">
                                <ImageIcon className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-medium">Media</span>
                            </button>
                            <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors flex items-center gap-1">
                                <FileText className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-medium">Article</span>
                            </button>
                        </div>
                        
                        {/* LinkedIn Footer */}
                        <div className="flex items-center justify-between px-3 py-2 border-t border-black/[0.06]">
                            <div className="flex items-center gap-1.5">
                                <div className="w-5 h-5 rounded-full bg-gray-200" />
                                <button className="flex items-center gap-0.5 text-[10px] text-black/60 hover:bg-black/[0.04] px-1.5 py-0.5 rounded-md transition-colors">
                                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                    </svg>
                                    <span>Anyone</span>
                                    <ChevronDown className="w-3 h-3" />
                                </button>
                            </div>
                            <button className="px-3 py-1 bg-teal-600 text-white text-[11px] font-medium rounded-full">
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Sidebar */}
            <div className="w-52 flex flex-col bg-[#FAF9F6] border-l border-black/[0.06] flex-shrink-0">
                {/* Quest Docs Section - Reduced */}
                <div className="px-2.5 py-2 border-b border-black/[0.06]">
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-medium text-teal-900">Quest docs</span>
                        <span className="text-[9px] px-1.5 py-0.5 bg-teal-100 text-teal-700 rounded-full">3</span>
                    </div>
                    <div className="space-y-0.5">
                        {WORKING_DOCS.map(doc => (
                            <button
                                key={doc.id}
                                className="w-full flex items-center gap-1.5 px-1.5 py-1 text-left hover:bg-white rounded-md transition-colors group border border-transparent hover:border-black/5"
                            >
                                <div className="w-4 h-4 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-2.5 h-2.5 text-blue-600" />
                                </div>
                                <span className="text-[10px] text-black/70 truncate group-hover:text-teal-700">{doc.title}</span>
                            </button>
                        ))}
                        {ATTACHED_DOCS.map(doc => (
                            <button
                                key={doc.id}
                                className="w-full flex items-center gap-1.5 px-1.5 py-1 text-left hover:bg-white rounded-md transition-colors group border border-transparent hover:border-black/5"
                            >
                                <div className="w-4 h-4 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-2.5 h-2.5 text-red-600" />
                                </div>
                                <span className="text-[10px] text-black/70 truncate group-hover:text-teal-700">{doc.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Brand Context Section */}
                <div className="px-2.5 py-2 bg-gradient-to-br from-amber-50 via-amber-50/70 to-white border-b border-black/[0.06]">
                    <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[11px] font-medium text-amber-900">Brand context</span>
                        <span className="text-[8px] px-1 py-0.5 bg-amber-200 text-amber-800 rounded font-medium">On</span>
                    </div>
                    <p className="text-[9px] text-amber-700/60 leading-relaxed">
                        Voice: Professional yet approachable
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="px-2.5 py-1.5 border-t border-black/[0.06]">
                    <div className="flex flex-wrap gap-1">
                        {['Shorter', 'More punchy', 'Add CTA'].map((action) => (
                            <button
                                key={action}
                                className="px-2 py-0.5 bg-white border border-black/[0.08] hover:border-black/20 rounded-full text-[9px] text-black/70 transition-colors"
                            >
                                {action}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input */}
                <div className="p-2.5 border-t border-black/[0.06]">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Ask AI..."
                            className="w-full text-[11px] font-serif pr-6 py-1 bg-transparent border-b border-black/[0.08] focus:border-black/30 outline-none transition-colors placeholder:text-black/30 placeholder:font-sans"
                        />
                        <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-black/60 hover:text-black transition-colors">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
