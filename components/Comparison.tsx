import React from 'react';
import { motion } from 'framer-motion';
import { GridPattern } from './ui/Dither';
import { Check } from 'lucide-react';

export const Comparison: React.FC = () => {
    return (
        <section className="py-32 bg-transparent text-white border-b border-white/10 relative overflow-hidden">
            <GridPattern opacity={0.1} />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* LEFT: The Visual Drama (The Invoice) */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-white/5 blur-2xl rounded-full opacity-20"></div>

                        {/* The Legacy Receipt */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative bg-white text-black p-8 shadow-2xl transform -rotate-2 max-w-md mx-auto lg:mx-0 border border-gray-300"
                        >
                            {/* Receipt Header */}
                            <div className="text-center border-b-2 border-black pb-6 mb-6 border-dashed">
                                <h3 className="font-serif italic text-2xl text-gray-600">Legacy Agency Inc.</h3>
                                <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mt-1">Monthly Retainer • NYC Office</p>
                            </div>

                            {/* Line Items */}
                            <div className="space-y-3 font-mono text-xs md:text-sm text-gray-500 mb-8">
                                <div className="flex justify-between">
                                    <span>Account Manager (10hrs)</span>
                                    <span>$3,500.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Junior Associate (40hrs)</span>
                                    <span>$6,000.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Strategy Retainer</span>
                                    <span>$8,000.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Overhead / T&E</span>
                                    <span>$2,500.00</span>
                                </div>
                                <div className="flex justify-between italic opacity-50">
                                    <span>"Relationship Building"</span>
                                    <span>$5,000.00</span>
                                </div>
                            </div>

                            {/* The Total */}
                            <div className="border-t-2 border-black pt-6 flex justify-between items-end relative pb-2">
                                <span className="font-bold text-sm uppercase tracking-widest">Total Due</span>
                                <span className="font-serif text-4xl md:text-5xl font-bold text-gray-900 relative z-10">$25,000</span>

                                {/* The Violent Strike Through Animation */}
                                <div className="absolute -right-6 top-1/2 w-64 h-32 pointer-events-none z-20 -translate-y-1/2">
                                    <svg viewBox="0 0 300 150" className="w-full h-full drop-shadow-xl mix-blend-multiply">
                                        <motion.path
                                            d="M 20 75 L 280 65 L 30 85 L 270 70 L 40 90 L 260 60"
                                            fill="transparent"
                                            stroke="#ef4444" // Red-500
                                            strokeWidth="12"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            initial={{ pathLength: 0, opacity: 0.9 }}
                                            whileInView={{ pathLength: 1, opacity: 0.9 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: 0.5, ease: "easeInOut" }}
                                        />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>

                        {/* The Strife Post-It / Overlay */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 1 }}
                            className="absolute -bottom-6 -right-6 md:-right-12 bg-black border border-white/20 p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)] max-w-[260px] z-30"
                        >
                            <div className="text-xs font-bold uppercase text-green-400 mb-2 tracking-widest flex items-center gap-2">
                                <Check className="w-4 h-4 border border-green-400 rounded-full p-0.5" /> The Strife Model
                            </div>
                            <div className="text-3xl font-bold text-white mb-2 tracking-tighter leading-none">
                                Pay for output, not overhead
                            </div>

                        </motion.div>
                    </div>

                    {/* RIGHT: The Narrative */}
                    <div>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-12 leading-[0.9]">
                            Unbeatable <br />
                            <span className="serif-accent italic font-light text-gray-400 lowercase">pricing.</span>
                        </h2>

                        <div className="space-y-12">
                            {[
                                {
                                    title: "Zero Bloat",
                                    desc: "Traditional agencies bill for hours and account management. We bill for outputs."
                                },
                                {
                                    title: "AI Efficiency",
                                    desc: "Automation handles the research and drafting. You don't pay for the days we save."
                                },
                                {
                                    title: "Your budget",
                                    desc: "We work within your constraints, and scale up or down instantly."
                                }
                            ].map((item, i) => (
                                <div key={i} className="group">
                                    <h4 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wide mb-3 flex items-center gap-4">
                                        <div className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform"></div>
                                        {item.title}
                                    </h4>
                                    <p className="text-gray-300 text-lg pl-6 border-l border-white/10 group-hover:border-white/40 transition-colors leading-relaxed max-w-md">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};