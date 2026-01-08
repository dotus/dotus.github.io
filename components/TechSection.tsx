import React from 'react';
import { GridPattern } from './ui/Dither';
import { motion } from 'framer-motion';
import { PenTool, UserCheck } from 'lucide-react';

export const TechSection: React.FC = () => {
    return (
        <section id="technology" className="py-32 bg-[#f9f9f9] text-black relative overflow-hidden border-b border-black">
            <GridPattern opacity={0.03} />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-20"
                >
                    <h2 className="text-6xl font-bold mb-6  ">
                        A humanoid approach<br />

                    </h2>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed font-light ">
                        Our AI bots integrate into your team's workflow to ask questions, gather context, and draft your story, which is <span className="font-semibold text-black">always rewritten by a human expert</span>.
                    </p>
                </motion.div>

                {/* 2 Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">

                    {/* Left: Context Ingestion */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="relative z-10 bg-white border border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] group hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] transition-all flex flex-col h-full"
                    >
                        <h3 className="text-2xl font-bold mb-3  uppercase">Your Company's Context</h3>
                        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                            Our bots live in your chats and help us understand your product as well as you do.
                        </p>

                        {/* Visual: Slack Mockup */}
                        <div className="mt-auto border border-gray-100 bg-gray-50 p-4 rounded-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gray-200"></div>
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center text-white text-sm font-bold">S</div>
                                    <div className="bg-white border border-gray-200 p-2 text-sm rounded-sm w-full shadow-sm">
                                        <span className="font-bold block mb-1 text-black">Strife Bot</span>
                                        How did the Q3 investor call go? Any new metrics we can share?
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-row-reverse">
                                    <div className="w-6 h-6 bg-gray-300 rounded-sm"></div>
                                    <div className="bg-blue-50 border border-blue-100 p-2 text-sm rounded-sm w-3/4 shadow-sm text-right text-blue-900">
                                        ARR is up 40%. Retention is 110%.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Expert Review */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative z-10 bg-white border border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] group hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] transition-all flex flex-col h-full"
                    >
                        <h3 className="text-2xl font-bold mb-3 tracking-tight uppercase">We do the work ourselves</h3>
                        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                            Sleep soundly. An editor reviews every output to catch nuance, prevent hallucinations, and protect your reputation before it goes live.
                        </p>

                        {/* Visual: Detailed Editor View */}
                        <div className="mt-auto border border-gray-200 bg-white rounded-sm relative overflow-hidden font-serif leading-relaxed text-lg shadow-sm">

                            {/* Editor Toolbar */}
                            <div className="bg-gray-50 border-b border-gray-200 p-2 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                <div className="h-3 w-px bg-gray-300 mx-1"></div>       </div>

                            {/* Document Content with Edits */}
                            <div className="p-6 pb-24 relative">
                                <p className="text-gray-800">
                                    We are thrilled to announce that our platform has processed over <span className="bg-red-100 text-red-800 line-through decoration-red-500 decoration-2">10 million users</span> <span className="bg-green-100 text-green-800 font-medium">10 million daily events</span> since the mainnet launch.
                                </p>

                                {/* Editor Cursor/Tooltip - Positioned safely at bottom right with flex alignment to avoid clipping */}
                                <div className="absolute bottom-4 right-4 z-20 flex items-end gap-3 max-w-full">
                                    <div className="bg-black text-white text-[10px] p-3 rounded-2xl rounded-br-none shadow-xl w-[180px] font-sans leading-snug relative mb-4">
                                        <span className="font-bold block mb-1 text-gray-400 uppercase text-[8px]">Sarah (Partner)</span>
                                        Precision matters here to avoid SEC scrutiny. Corrected metric.

                                        {/* Pointer Triangle */}
                                        <div className="absolute -bottom-2 -right-0 w-3 h-3 bg-black" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
                                    </div>

                                    <div className="w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden flex-shrink-0 relative z-30 bg-gray-200">
                                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop" alt="Editor" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>



            </div>
        </section>
    );
};