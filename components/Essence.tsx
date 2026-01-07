import React from 'react';
import { DitherPattern } from './ui/Dither';
import { motion } from 'framer-motion';

export const Essence: React.FC = () => {
    return (
        <section className="py-32 md:py-48 bg-transparent text-white relative border-b border-white/10 overflow-hidden flex items-center justify-center">
            <DitherPattern opacity={0.15} />

            {/* Subtle radial glow to lift text off background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>

            <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.9] mb-6 drop-shadow-sm">
                        We don't just <br className="hidden md:block" />
                        take clients.
                    </h2>
                    <p className="serif-accent italic text-4xl md:text-7xl text-gray-400 mb-12 drop-shadow-md">
                        We make bets.
                    </p>

                    <div className="w-px h-20 bg-gradient-to-b from-white/0 via-white/20 to-white/0 mx-auto mb-10"></div>

                    <p className="text-lg md:text-xl font-light text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        We only work with founders that align with our values and whose vision we believe will make a difference.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};