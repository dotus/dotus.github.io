import React, { useState } from 'react';
import { GridPattern } from './ui/Dither';
import {
    X, Check, Zap, Users, Globe, Smartphone,
    FileText, Briefcase, TrendingUp, ShieldAlert,
    ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Services: React.FC = () => {
    return (
        <section id="services" className="relative py-32 bg-[#f8f8f8] border-b border-black overflow-hidden">
            <GridPattern opacity={0.03} />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6 leading-[0.9]">
                        The Old Guard <span className="text-gray-400 font-serif italic lowercase tracking-normal">vs.</span> The Vanguard.
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed font-medium">
                        Traditional agencies were built for a slower world. We built Strife for yours.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* LEFT COLUMN: Traditional PR (The Problem) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-[#e5e5e5] border border-gray-300 p-8 md:p-12 relative overflow-hidden group grayscale hover:grayscale-0 transition-all duration-700"
                    >
                        {/* Background Noise */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")' }}></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6 opacity-60">
                                <Briefcase className="w-5 h-5" />
                                <span className="text-xs font-bold uppercase tracking-widest">Legacy Agency Inc.</span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 leading-tight">
                                Expensive. Bloated. <br />Disconnected.
                            </h3>

                            <div className="space-y-6 mb-12">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 flex-shrink-0">
                                        <X className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm uppercase mb-1">Draconian Retainers</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            Five-figure monthly minimums with 12-month lock-ins. You pay for their overhead, fancy offices, and "client relationship executives" who don't ship.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 flex-shrink-0">
                                        <ShieldAlert className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm uppercase mb-1">Zero Agility</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            Weeks to approve a press release. They don't speak startup, they speak corporate. By the time they move, the news cycle is gone.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* The "Invoice" Visual */}
                            <div className="bg-white p-6 shadow-xl border border-gray-200 transform rotate-1 opacity-80 group-hover:rotate-0 group-hover:opacity-100 transition-all duration-500 max-w-sm mx-auto lg:mx-0">
                                <div className="flex justify-between border-b pb-2 mb-2 border-dashed border-gray-300">
                                    <span className="font-mono text-[10px] text-gray-400">INVOICE #9921</span>
                                    <span className="font-mono text-[10px] text-red-500 font-bold">OVERDUE</span>
                                </div>
                                <div className="space-y-2 font-mono text-[10px] text-gray-500">
                                    <div className="flex justify-between"><span>Retainer (Oct)</span><span>$15,000</span></div>
                                    <div className="flex justify-between"><span>T&E</span><span>$2,400</span></div>
                                    <div className="flex justify-between pt-2 border-t border-gray-200 font-bold text-black text-xs"><span>Total</span><span>$17,400</span></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: Strife Relations (The Solution) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-black text-white p-8 md:p-12 relative overflow-hidden flex flex-col justify-between border border-gray-800 shadow-2xl"
                    >
                        {/* Tech Grid Background */}
                        <div className="absolute inset-0 z-0">
                            <GridPattern opacity={0.15} />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-transparent"></div>
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2 text-green-400">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs font-bold uppercase tracking-widest">System Online</span>
                                </div>
                                <div className="px-2 py-1 bg-white/10 border border-white/20 rounded text-[10px] uppercase font-bold tracking-wider text-white">
                                    Founder-Led
                                </div>
                            </div>

                            <h3 className="text-3xl md:text-5xl font-bold mb-8 leading-none tracking-tight">
                                Tech-Core. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Unbeatable Pricing.</span>
                            </h3>

                            <div className="space-y-8 mb-12">
                                <div className="flex gap-5">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-2">Unbeatable Pricing</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            We use technology to automate the heavy lifting, stripping away the bloat so
                                            we can offer pricing that traditional firms can't touch. You pay for output, not inputs.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-2">People to People</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            Tech is the engine, but connection is the fuel. We work closely with founders,
                                            embedding ourselves in your team to understand your vision like no one else.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Mission Callout - The "For the Bold" Section */}
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">We only work with the bold:</h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    <div className="bg-white/5 border border-white/10 p-3 rounded hover:bg-white/10 transition-colors flex items-center gap-2 group">
                                        <Smartphone className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                                        <span className="text-xs font-bold">Deep Tech</span>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-3 rounded hover:bg-white/10 transition-colors flex items-center gap-2 group">
                                        <Globe className="w-4 h-4 text-green-400 group-hover:text-green-300" />
                                        <span className="text-xs font-bold">Environment</span>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-3 rounded hover:bg-white/10 transition-colors flex items-center gap-2 group">
                                        <FileText className="w-4 h-4 text-yellow-400 group-hover:text-yellow-300" />
                                        <span className="text-xs font-bold">Policy Change</span>
                                    </div>
                                </div>
                                <p className="mt-4 text-[10px] uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                    <div className="w-1 h-1 bg-white rounded-full"></div>
                                    At the forefront of human business
                                </p>
                            </div>

                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};