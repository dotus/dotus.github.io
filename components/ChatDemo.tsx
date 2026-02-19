import React, { useState, useEffect, useRef } from 'react';
import { PerspectiveCard } from './ui/PerspectiveCard';
import { DitherPattern } from './ui/Dither';
import { DiagonalStripes } from './ui/Stripes';
import { Bot, Send, Hash, MoreHorizontal, Sparkles, ChevronRight, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatDemo: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const startDemo = () => {
    if (step > 0) return;
    setStep(1); // User clicked approve
    setIsTyping(true);
    
    // Simulate AI processing time
    setTimeout(() => {
        setIsTyping(false);
        setStep(2); // AI responds
        
        // Simulate Human entering chat shortly after
        setTimeout(() => {
            setStep(3); // Human review
        }, 1500);
    }, 1500);
  };

  useEffect(() => {
    if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [step, isTyping]);

  return (
    <section className="py-32 bg-gray-100 border-b border-black relative overflow-hidden">
      <DiagonalStripes opacity={0.03} className="bg-fixed" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Text Side */}
            <div className="order-2 lg:order-1">
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.9] uppercase">
                    WE LIVE IN <br/>
                    <span className="serif-accent italic font-light text-gray-500 lowercase">your workflow.</span>
                </h2>
                <p className="text-xl text-gray-600 mb-10 border-l-4 border-black pl-6 leading-relaxed max-w-md">
                    We use bots to ask you the right questions at the right time, gathering context painlessly. Then, our AI drafts the materials.
                    <br/><br/>
                    <span className="font-bold text-black">But we never hit send without a human.</span> A senior partner reviews every draft to ensure it's pitch-perfect and hallucination-free.
                </p>
                
                <div className="flex flex-col gap-6">
                    {[
                        { title: "Proactive Extraction", desc: "Our bot asks: 'How did that meeting go?' so you don't have to write a brief." },
                        { title: "The Safety Layer", desc: "AI handles the grunt work. Humans handle the nuance, strategy, and final sign-off." },
                    ].map((item, i) => (
                        <div key={i} className="group flex gap-4 items-start p-4 border border-transparent hover:border-black hover:bg-white transition-all cursor-default">
                            <div className="mt-1 w-8 h-8 bg-black text-white flex items-center justify-center font-mono text-sm font-bold flex-shrink-0 transition-transform">
                                {i + 1}
                            </div>
                            <div>
                                <h4 className="font-bold uppercase tracking-wide text-sm mb-1">{item.title}</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Interactive Side */}
            <div className="order-1 lg:order-2">
                <PerspectiveCard className="w-full" intensity={5}>
                    <div className="bg-white text-black border border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,0.08)] min-h-[600px] flex flex-col relative z-10 font-sans">
                        {/* Window Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-gray-300 rounded-full" />
                                <div className="w-3 h-3 bg-gray-300 rounded-full" />
                                <div className="w-3 h-3 bg-gray-300 rounded-full" />
                            </div>
                            <div className="font-mono text-[10px] uppercase text-gray-400 flex items-center gap-2">
                                # public-relations
                            </div>
                            <MoreHorizontal className="w-4 h-4 text-gray-300" />
                        </div>

                        <div className="flex flex-1 overflow-hidden">
                            {/* Sidebar */}
                            <div className="w-16 md:w-48 bg-gray-50 border-r border-gray-100 hidden md:flex flex-col py-4">
                                <div className="px-4 mb-6">
                                    <div className="font-bold text-sm truncate text-black">Caybles</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    {['announcements', 'media-hits', 'strategy'].map(ch => (
                                        <div key={ch} className={`px-4 py-1 cursor-pointer flex items-center gap-2 text-sm ${ch === 'announcements' ? 'bg-white text-black shadow-sm font-medium' : 'text-gray-500 hover:text-black'}`}>
                                            <Hash className="w-3 h-3" />
                                            <span className="truncate capitalize">{ch}</span>
                                        </div>
                                    ))}
                                    <div className="mt-6 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Direct Messages</div>
                                    <div className="px-4 py-2 text-black flex items-center gap-2 text-sm bg-blue-50/50 border-r-2 border-blue-500">
                                        <Bot className="w-3 h-3" />
                                        <span className="truncate font-bold">Caybles AI</span>
                                    </div>
                                    <div className="px-4 py-1 text-gray-600 flex items-center gap-2 text-sm hover:bg-gray-100">
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                        <span className="truncate">Sarah (Partner)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Area */}
                            <div className="flex-1 flex flex-col bg-white relative">
                                <DitherPattern opacity={0.03} />
                                
                                {/* Messages */}
                                <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 font-sans text-sm">
                                    
                                    {/* Bot Proactive Message */}
                                    <div className="flex gap-4 group animate-fade-in">
                                        <div className="w-10 h-10 bg-black text-white flex items-center justify-center flex-shrink-0 rounded-full shadow-sm">
                                            <Bot className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="font-bold text-black">Caybles AI</span>
                                                <span className="text-xs text-gray-400">9:03 AM</span>
                                            </div>
                                            <div className="mt-2 bg-gray-50 p-4 rounded-r-xl rounded-bl-xl border border-gray-100">
                                                <p className="text-gray-800 leading-relaxed mb-3">
                                                    👋 Hey team! I noticed a new deployment to production regarding <strong>"Zero-Knowledge Encryption"</strong>. 
                                                </p>
                                                <p className="text-gray-800 leading-relaxed">
                                                    This aligns with the privacy narrative we discussed. Should I draft a pitch for our cybersecurity press list?
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* User Response (Step 0) */}
                                    <div className="flex gap-4 flex-row-reverse">
                                        <div className="w-10 h-10 bg-gray-200 flex items-center justify-center flex-shrink-0 rounded-full">
                                            <User className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-baseline gap-2 justify-end">
                                                <span className="text-xs text-gray-400">9:15 AM</span>
                                                <span className="font-bold text-black">You</span>
                                            </div>
                                            {step === 0 ? (
                                                <button 
                                                    onClick={startDemo}
                                                    className="mt-2 bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-l-xl rounded-br-xl hover:bg-blue-700 transition-colors shadow-md"
                                                >
                                                    Yes, good catch. Let's draft it.
                                                </button>
                                            ) : (
                                                <div className="mt-2 bg-blue-600 text-white px-4 py-3 rounded-l-xl rounded-br-xl shadow-md">
                                                    Yes, good catch. Let's draft it.
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Loading State */}
                                    {isTyping && (
                                         <div className="flex gap-4">
                                            <div className="w-10 h-10 bg-black text-white flex items-center justify-center flex-shrink-0 rounded-full">
                                                <Bot className="w-5 h-5" />
                                            </div>
                                            <div>
                                                 <span className="font-bold text-black text-xs uppercase tracking-wide">Caybles AI</span>
                                                 <div className="mt-2 flex gap-1 bg-gray-50 p-3 rounded-r-xl rounded-bl-xl w-16">
                                                     <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.0, delay: 0 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                                     <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.0, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                                     <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.0, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                                 </div>
                                            </div>
                                         </div>
                                    )}

                                    {/* AI Response */}
                                    <AnimatePresence>
                                        {step >= 2 && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex gap-4"
                                            >
                                                <div className="w-10 h-10 bg-black text-white flex items-center justify-center flex-shrink-0 relative rounded-full shadow-lg">
                                                    <Bot className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="font-bold text-black text-xs uppercase tracking-wide">Caybles AI</span>
                                                    </div>
                                                    
                                                    <div className="mt-2 bg-white p-4 border border-gray-200 rounded-r-xl rounded-bl-xl shadow-sm text-gray-700 text-sm leading-relaxed relative">
                                                        <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase text-gray-400">
                                                            <Sparkles className="w-3 h-3" />
                                                            Draft Generated
                                                        </div>
                                                        <p className="font-bold text-black mb-1">Subject: Reclaiming Privacy in FinTech</p>
                                                        <p className="text-gray-600 mb-2 line-clamp-2">
                                                            Hi [Name], given the recent breaches in the sector, I thought you'd be interested in how [Company] is implementing zero-knowledge proofs...
                                                        </p>
                                                        <div className="inline-flex items-center gap-1 text-[10px] font-mono bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                                            <AlertCircle className="w-3 h-3" />
                                                            Pending Human Review
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Human Intervention */}
                                    <AnimatePresence>
                                        {step >= 3 && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="flex gap-4"
                                            >
                                                <div className="w-10 h-10 relative flex-shrink-0">
                                                    <img 
                                                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop" 
                                                        alt="Sarah" 
                                                        className="w-full h-full rounded-full object-cover border-2 border-green-500 p-0.5" 
                                                    />
                                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                                                        <CheckCircle2 className="w-3 h-3 text-white" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="font-bold text-black">Sarah (Account Lead)</span>
                                                        <span className="text-xs text-gray-400">9:17 AM</span>
                                                    </div>
                                                    
                                                    <div className="mt-2 p-4 bg-green-50/50 border border-green-100 rounded-r-xl rounded-bl-xl shadow-sm text-gray-800">
                                                        <p className="leading-relaxed text-sm">
                                                            Good start. I've tweaked the opening to sound less technical and more news-worthy for the WSJ. 
                                                        </p>
                                                        <div className="mt-3 flex items-center gap-2">
                                                            <div className="bg-green-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-2 shadow-sm">
                                                                <CheckCircle2 className="w-3 h-3" />
                                                                Approved for Distribution
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <div ref={bottomRef} />
                                </div>

                                {/* Input Area */}
                                <div className="p-4 border-t border-gray-100 bg-white">
                                    <div className="border border-gray-200 bg-gray-50 p-3 flex justify-between items-center rounded-md">
                                        <span className="text-gray-400 text-sm px-2">Reply to thread...</span>
                                        <div className="p-1 bg-white rounded shadow-sm border border-gray-100">
                                            <Send className="w-3 h-3 text-gray-400" />
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
    </section>
  );
};