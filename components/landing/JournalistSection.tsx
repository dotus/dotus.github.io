import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const JournalistSection: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
    
    // Smooth spring animation for the main content
    const springY = useSpring(y, { stiffness: 100, damping: 30 });
    const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

    // Word-by-word reveal animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2,
            }
        }
    };

    const wordVariants = {
        hidden: { 
            opacity: 0, 
            y: 40,
            rotateX: -40,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    };

    const headline = "We wrote the headlines";
    const words = headline.split(" ");

    return (
        <section ref={containerRef} className="py-40 px-6 bg-[#0a0a0a] text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(45,212,191,0.08) 0%, transparent 50%)' }}></div>
            
            <div className="max-w-5xl mx-auto relative">
                <motion.div 
                    style={{ y: springY, opacity, scale: springScale }} 
                    className="text-center space-y-8"
                >
                    {/* Animated headline with word-by-word reveal */}
                    <motion.h2 
                        className="text-5xl md:text-6xl text-white font-serif overflow-hidden"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {words.map((word, i) => (
                            <motion.span
                                key={i}
                                className="inline-block mr-[0.25em]"
                                variants={wordVariants}
                                style={{ transformOrigin: 'center bottom' }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.h2>
                    
                    <motion.p 
                        className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        We aren't guessing what newsrooms want. We know. 
                        For years, <span className="text-white/80">we were the ones</span> deciding 
                        which stories made the cut.
                    </motion.p>

                    {/* Simple stat line */}
                    <motion.div 
                        className="pt-12 flex items-center justify-center gap-12 text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <p className="text-3xl font-serif text-white">1,000+</p>
                            <p className="text-xs text-white/40 uppercase tracking-wider mt-1">Stories Published</p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
