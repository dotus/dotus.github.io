import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const JournalistSection: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const publications = [
        { name: "Financial Times", focus: "Tech & Finance" },
        { name: "The Guardian", focus: "Policy & Environment" },
        { name: "Reuters", focus: "Breaking News" },
        { name: "Bloomberg", focus: "Markets" },
        { name: "Wired", focus: "Innovation" },
        { name: "TechCrunch", focus: "Startups" },
    ];

    return (
        <section ref={containerRef} className="py-32 px-6 bg-[#0a0a0a] text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(45,212,191,0.08) 0%, transparent 50%)' }}></div>
            
            <div className="max-w-5xl mx-auto relative">
                <motion.div style={{ y, opacity }} className="text-center space-y-8">
                    {/* Clean serif headline matching other sections */}
                    <h2 className="text-5xl md:text-6xl text-white font-serif">
                        We wrote the headlines
                    </h2>
                    
                    <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
                        We aren't guessing what newsrooms want. We know. 
                        For years, <span className="text-white/80">we were the ones</span> deciding 
                        which stories made the cut.
                    </p>

                   

                    {/* Simple stat line */}
                    <div className="pt-12 flex items-center justify-center gap-12 text-center">
            
                        <div>
                            <p className="text-3xl font-serif text-white">1,000+</p>
                            <p className="text-xs text-white/40 uppercase tracking-wider mt-1">Stories Published</p>
                        </div>
                       
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
