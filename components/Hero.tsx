import React, { useState, useEffect, useRef } from 'react';
import { PerspectiveCard } from './ui/PerspectiveCard';
import { DitherPattern } from './ui/Dither';
import { Bot, Search, Bell, Hash, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrustedBy } from './TrustedBy';

interface HeroProps {
    onOpenModal: () => void;
}

const STEPS = [
    { id: 0, label: "Trigger" },
    { id: 1, label: "Approval" },
    { id: 2, label: "AI Draft" },
    { id: 3, label: "Feedback" },
    { id: 4, label: "Expert Review" },
    { id: 5, label: "Sign Off" },
    { id: 6, label: "Launch" }
];

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
    const [step, setStep] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Animation sequence logic
    useEffect(() => {
        if (intervalRef.current) clearTimeout(intervalRef.current);

        const nextStep = (step + 1) % STEPS.length;
        const delay = 1500;

        intervalRef.current = setTimeout(() => {
            setStep(nextStep);
        }, delay);

        return () => {
            if (intervalRef.current) clearTimeout(intervalRef.current);
        };
    }, [step]);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (scrollRef.current) {
            setTimeout(() => {
                scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
            }, 100);
        }
    }, [step]);

    const handleManualStep = (index: number) => {
        // Simply update step, useEffect will handle the continuation
        setStep(index);
    };

    return (
        <section className="relative min-h-screen flex flex-col overflow-hidden border-b border-black pt-28 lg:pt-32 pb-0 bg-transparent">

            {/* Dither Pattern - Z-10 */}
            <DitherPattern opacity={0.2} className="z-10 mix-blend-overlay" />

            {/* Gradient decoration like Footer */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-gray-800/50 to-black/50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none z-0" />

            {/* Floating Elements - Z-20 */}
            <div className="absolute top-0 left-0 w-full h-full z-20 opacity-20 pointer-events-none mix-blend-overlay overflow-hidden">
                <div className="w-full h-2 bg-white/10 absolute top-1/4 animate-pulse blur-sm" style={{ animationDuration: '4s' }}></div>
                <div className="w-full h-20 bg-cyan-500/10 absolute bottom-1/3 blur-xl animate-bounce" style={{ animationDuration: '8s' }}></div>
            </div>

            {/* Main Content - Z-30 */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-30 flex-1 flex flex-col">

                {/* DESKTOP TIMELINE (Hidden on Mobile) */}
                <div className="hidden lg:block w-full max-w-4xl mx-auto relative z-50 mb-16 pt-2">
                    <div className="relative flex items-center justify-between px-2">
                        {/* Track Line */}
                        <div className="absolute top-1/2 left-0 w-full h-[3px] -translate-y-1/2 bg-white/20 -z-10 rounded-full"></div>
                        <motion.div
                            className="absolute top-1/2 left-0 h-[3px] -translate-y-1/2 bg-white -z-10 origin-left rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />

                        {STEPS.map((s, i) => {
                            const isActive = i <= step;
                            const isCurrent = i === step;

                            return (
                                <div key={s.id} className="relative group cursor-pointer" onClick={() => handleManualStep(i)}>
                                    <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 z-20 box-content ${isActive ? 'bg-white border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-black/50 border-white/40 hover:border-white'}`}></div>

                                    {/* Label */}
                                    <div className={`absolute top-8 left-1/2 -translate-x-1/2 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${isCurrent ? 'text-white translate-y-0 opacity-100' : 'text-gray-400 group-hover:text-gray-200 opacity-70'}`}>
                                        {s.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center flex-1">
                    {/* Left Column: Text Content */}
                    <div className="space-y-10 relative z-40">

                        <h1 className="text-3xl md:text-6xl font-bold  leading-[0.9] text-white drop-shadow-lg">
                            THE VCs OF <br />
                            STORYTELLING
                        </h1>

                        {/* Refined Subhead Presentation */}
                        <p className="text-2xl md:text-3xl font-light text-gray-300 max-w-lg leading-tight drop-shadow-md">
                            by journalists for founders in <span className="underline text-white">tech</span>, <span className="underline text-white">environment</span> and <span className="underline text-white">funding</span> <br />

                        </p>

                        <div className="flex flex-col items-start gap-3">
                            <button
                                onClick={onOpenModal}
                                className="group bg-white text-black px-6 py-3 md:px-8 md:py-4 text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-gray-200 hover:text-black border border-white transition-all rounded-none flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                            >
                                Be our pilot now
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>
                            <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-widest font-mono">
                                <span>Hong Kong</span>
                                <span className="w-1 h-1 bg-white/40 rounded-full" />
                                <span>London</span>
                            </div>
                        </div>
                    </div>

                    {/* MOBILE TIMELINE (Inserted between Text and Visual on Mobile) */}
                    <div className="lg:hidden w-full mb-4 mt-2">
                        <div className="flex flex-col items-start gap-2 border-l-2 border-white/20 pl-4">
                            <div className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                                Workflow Step {step + 1}/{STEPS.length}
                            </div>
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-2xl font-bold text-white uppercase tracking-tighter"
                            >
                                {STEPS[step].label}
                            </motion.div>
                            {/* Progress Line */}
                            <div className="w-full h-[2px] bg-white/10 mt-1 relative overflow-hidden max-w-[200px]">
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-white"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: The Visual (Slack Interface) - GLASS VERSION */}
                    <div className="relative w-full flex items-center justify-center lg:justify-end min-h-[450px] lg:min-h-[500px]">
                        <PerspectiveCard className="w-full" intensity={5}>
                            {/* Main Glass Container */}
                            <div className="w-full bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl rounded-lg overflow-hidden flex flex-col h-[450px] md:h-[550px] font-sans text-sm relative ring-1 ring-white/10 mx-auto">

                                {/* Slack Sidebar */}
                                <div className="flex h-full">
                                    {/* Icon Rail */}
                                    <div className="w-12 md:w-14 bg-white/5 border-r border-white/10 flex flex-col items-center py-4 gap-4 flex-shrink-0 backdrop-blur-sm">
                                        <div className="w-8 h-8 bg-white rounded-md overflow-hidden flex items-center justify-center shadow-lg">
                                            <img src="/logo.png" alt="S" className="w-full h-full object-contain" />
                                        </div>
                                        <div className="w-6 h-6 bg-white/20 rounded-md" />
                                        <div className="w-6 h-6 bg-white/20 rounded-md" />
                                    </div>
                                    {/* Channel Rail */}
                                    <div className="w-40 bg-black/40 border-r border-white/10 text-gray-300 flex flex-col py-3 hidden sm:flex flex-shrink-0 backdrop-blur-sm">
                                        <div className="px-3 mb-4 flex items-center justify-between font-bold text-white hover:bg-white/10 py-1 cursor-pointer text-xs rounded mx-1 transition-colors">
                                            Strife Corp <span className="text-[8px]">▼</span>
                                        </div>
                                        <div className="px-3 mb-2 text-[10px] opacity-50 uppercase tracking-wider font-bold">Channels</div>
                                        <div className="flex flex-col gap-0.5">
                                            {['all-hands', 'engineering'].map(c => (
                                                <div key={c} className="px-3 py-0.5 hover:bg-white/10 cursor-pointer flex items-center gap-2 opacity-70 text-xs transition-colors">
                                                    <Hash className="w-2.5 h-2.5" /> {c}
                                                </div>
                                            ))}
                                            <div className="px-3 py-0.5 bg-white/10 text-white cursor-pointer flex items-center gap-2 font-bold text-xs border-l-2 border-white">
                                                <Hash className="w-2.5 h-2.5" /> pr-launches
                                            </div>
                                        </div>
                                    </div>

                                    {/* Main Chat Area */}
                                    <div className="flex-1 flex flex-col bg-transparent relative min-w-0">
                                        {/* Header */}
                                        <div className="h-10 border-b border-white/10 flex items-center justify-between px-4 bg-white/5 flex-shrink-0 backdrop-blur-md">
                                            <div className="font-bold flex items-center gap-1 text-xs sm:text-sm truncate text-white">
                                                <Hash className="w-3 h-3 text-gray-400" /> pr-launches
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-400 hidden sm:flex">
                                                <Search className="w-3 h-3 text-white/50" />
                                                <Bell className="w-3 h-3 text-white/50" />
                                            </div>
                                        </div>

                                        {/* Messages Container */}
                                        <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth">

                                            {/* Step 0: Bot Suggestion */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex gap-3 group"
                                            >
                                                <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center text-black flex-shrink-0 shadow-sm">
                                                    <Bot className="w-4 h-4" />
                                                </div>
                                                <div className="w-full min-w-0">
                                                    <div className="flex items-baseline gap-2 flex-wrap">
                                                        <span className="font-bold text-xs sm:text-sm text-white">Strife Bot</span>
                                                        <span className="bg-white/20 text-gray-200 px-1 rounded text-[9px] font-bold uppercase tracking-wide">APP</span>
                                                        <span className="text-[10px] text-gray-400">10:24 AM</span>
                                                    </div>
                                                    <p className="text-gray-300 text-xs sm:text-sm mt-0.5 leading-relaxed">
                                                        I detected a new deployment: <strong className="text-white">Z-Core V2</strong>. Changelog indicates 50% latency improvement. <strong className="text-white">Should I draft an announcement?</strong>
                                                    </p>
                                                </div>
                                            </motion.div>

                                            {/* Step 1: User Enthusiastic Reply */}
                                            <AnimatePresence>
                                                {step >= 1 && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="flex gap-3"
                                                    >
                                                        <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0 shadow-[0_0_10px_rgba(37,99,235,0.5)]">JD</div>
                                                        <div>
                                                            <div className="flex items-baseline gap-2">
                                                                <span className="font-bold text-xs sm:text-sm text-white">John Doe</span>
                                                                <span className="text-[10px] text-gray-400">10:25 AM</span>
                                                            </div>
                                                            <p className="text-gray-200 text-xs sm:text-sm mt-0.5">Yes we need this!!! 🚀</p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Step 2: Bot Draft */}
                                            <AnimatePresence>
                                                {step >= 2 && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="flex gap-3 group"
                                                    >
                                                        <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center text-black flex-shrink-0 shadow-sm">
                                                            <Bot className="w-4 h-4" />
                                                        </div>
                                                        <div className="w-full min-w-0">
                                                            <div className="flex items-baseline gap-2">
                                                                <span className="font-bold text-xs sm:text-sm text-white">Strife Bot</span>
                                                                <span className="bg-white/20 text-gray-200 px-1 rounded text-[9px] font-bold uppercase tracking-wide">APP</span>
                                                                <span className="text-[10px] text-gray-400">10:25 AM</span>
                                                            </div>
                                                            <p className="text-gray-300 mb-2 text-xs sm:text-sm mt-0.5">Here is the first draft based on technical docs.</p>

                                                            <motion.div
                                                                initial={{ opacity: 0, scale: 0.95 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                className="border border-white/20 rounded-md max-w-sm overflow-hidden bg-white/5 backdrop-blur-sm"
                                                            >
                                                                <div className="bg-white/10 px-2 py-1.5 flex items-center gap-2 border-b border-white/10">
                                                                    <FileText className="w-3 h-3 text-blue-400" />
                                                                    <span className="font-bold text-[10px] text-white">draft_z_core_v1.pdf</span>
                                                                </div>
                                                                <div className="p-2 opacity-70">
                                                                    <div className="h-1.5 w-3/4 bg-white/20 rounded mb-1.5"></div>
                                                                    <div className="h-1.5 w-full bg-white/10 rounded mb-1"></div>
                                                                    <div className="h-1.5 w-5/6 bg-white/10 rounded"></div>
                                                                </div>
                                                            </motion.div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Step 3: User Feedback */}
                                            <AnimatePresence>
                                                {step >= 3 && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="flex gap-3"
                                                    >
                                                        <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0 shadow-[0_0_10px_rgba(37,99,235,0.5)]">JD</div>
                                                        <div>
                                                            <div className="flex items-baseline gap-2">
                                                                <span className="font-bold text-xs sm:text-sm text-white">John Doe</span>
                                                                <span className="text-[10px] text-gray-400">10:28 AM</span>
                                                            </div>
                                                            <p className="text-gray-200 text-xs sm:text-sm mt-0.5">Good start, but make it punchier. Less jargon.</p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Step 4: Human Expert Intervention */}
                                            <AnimatePresence>
                                                {step >= 4 && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="flex gap-3 pl-3 relative"
                                                    >
                                                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-green-400 to-transparent opacity-50"></div>
                                                        <div className="w-8 h-8 bg-gray-200 rounded-sm overflow-hidden flex-shrink-0 shadow-sm ring-1 ring-white">
                                                            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop" alt="Sarah" className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="w-full min-w-0">
                                                            <div className="flex items-baseline gap-2">
                                                                <span className="font-bold text-xs sm:text-sm text-white">Sarah (Partner)</span>
                                                                <span className="text-[10px] text-gray-400">10:35 AM</span>
                                                            </div>
                                                            <p className="text-gray-300 text-xs sm:text-sm mb-2 mt-0.5">
                                                                I've stripped the jargon and focused the lead on "instant load" benefits.
                                                            </p>
                                                            <div className="border border-green-500/30 rounded-md max-w-xs overflow-hidden bg-green-500/10 backdrop-blur-sm">
                                                                <div className="bg-green-500/20 px-2 py-1.5 flex items-center justify-between border-b border-green-500/20">
                                                                    <div className="flex items-center gap-2">
                                                                        <FileText className="w-3 h-3 text-green-400" />
                                                                        <span className="font-bold text-[10px] text-green-100">draft_z_core_final.pdf</span>
                                                                    </div>
                                                                    <span className="text-[8px] uppercase font-bold text-black bg-green-400 px-1 rounded shadow-[0_0_10px_rgba(74,222,128,0.3)]">Polished</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Step 5: User Approval */}
                                            <AnimatePresence>
                                                {step >= 5 && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="flex gap-3"
                                                    >
                                                        <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0 shadow-[0_0_10px_rgba(37,99,235,0.5)]">JD</div>
                                                        <div>
                                                            <div className="flex items-baseline gap-2">
                                                                <span className="font-bold text-xs sm:text-sm text-white">John Doe</span>
                                                                <span className="text-[10px] text-gray-400">10:36 AM</span>
                                                            </div>
                                                            <p className="text-gray-200 text-xs sm:text-sm mt-0.5">Perfect. Launch it.</p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Step 6: Launch Confirmation */}
                                            <AnimatePresence>
                                                {step >= 6 && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="flex gap-3"
                                                    >
                                                        <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center text-black flex-shrink-0 shadow-sm">
                                                            <Bot className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <div className="flex items-baseline gap-2">
                                                                <span className="font-bold text-xs sm:text-sm text-white">Strife Bot</span>
                                                                <span className="bg-white/20 text-gray-200 px-1 rounded text-[9px] font-bold uppercase tracking-wide">APP</span>
                                                                <span className="text-[10px] text-gray-400">10:36 AM</span>
                                                            </div>
                                                            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-2 py-1 rounded text-[10px] sm:text-xs font-bold border border-green-500/30 mt-1">
                                                                <CheckCircle2 className="w-3 h-3" />
                                                                Distributed to Wire Services
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                        </div>

                                        {/* Input Area */}
                                        <div className="p-3 sm:p-4 border-t border-white/10 bg-white/5 mt-auto backdrop-blur-md">
                                            <div className="border border-white/10 rounded-md p-2 flex justify-between items-center bg-black/20 hover:border-white/20 transition-colors h-9 sm:h-10">
                                                <span className="text-gray-400 text-xs sm:text-sm">Message #pr-launches</span>
                                                <div className="flex gap-1 sm:gap-2 text-gray-400">
                                                    <span className="font-mono font-bold text-[10px] sm:text-xs border border-white/10 rounded px-1 bg-white/5">Aa</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </PerspectiveCard>
                    </div>
                </div>
            </div>

            {/* Trusted By Logos - Overlaid at bottom */}
            <TrustedBy />
        </section>
    );
};