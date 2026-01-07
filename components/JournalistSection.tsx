import React, { useRef } from 'react';
import { GridPattern } from './ui/Dither';
import { PerspectiveCard } from './ui/PerspectiveCard';
import { motion, useScroll, useTransform } from 'framer-motion';

export const JournalistSection: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Background zoom-in effect
    const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 1]);

    // Phase 1: Headline animation (early scroll)
    const headlineOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const headlineY = useTransform(scrollYProgress, [0, 0.2], ["20px", "0px"]);

    // Phase 2: Description text (mid scroll)
    const textOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
    const textY = useTransform(scrollYProgress, [0.4, 0.7], ["30px", "0px"]);

    // Badge animation (fades in and stays)
    const badgeOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
    const badgeScale = useTransform(scrollYProgress, [0.1, 0.4], [0.8, 1]);

    return (
        <section ref={containerRef} id="journalists" className="relative h-[200vh] bg-black">

            {/* Sticky Container */}
            <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center border-b border-black">

                {/* Background Image with Zoom */}
                <motion.div
                    style={{ scale: bgScale, opacity: bgOpacity }}
                    className="absolute inset-0 w-full h-full z-0"
                >
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: 'url(/presswoman.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50" />
                </motion.div>

                <GridPattern opacity={0.05} />

                {/* Content */}
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full pt-28 lg:pt-0">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
                        {/* Left: Typography & Message */}
                        <div className="flex flex-col justify-center order-1 lg:order-1 text-center lg:text-left relative z-20">
                            <motion.h2
                                style={{ opacity: headlineOpacity, y: headlineY }}
                                className="text-4xl md:text-6xl font-bold mb-4 text-white"
                            >
                                WE WROTE <br className="hidden md:block" />
                                THE HEADLINES.
                            </motion.h2>


                            <motion.div
                                style={{ opacity: textOpacity, y: textY }}
                                className="text-white py-2 max-w-lg mx-auto lg:mx-0"
                            >
                                <p className="text-lg md:text-2xl leading-relaxed font-light">
                                    We aren't guessing what newsrooms want. We know. Because for years, <span className="font-bold border-b-2 border-white">we were the ones deleting bad pitches</span> and publishing the good ones.
                                </p>
                            </motion.div>
                        </div>

                        {/* Right: Visual Proof (The Realistic Press Badge) */}
                        <motion.div
                            className="relative flex justify-center lg:justify-end py-4 md:py-12 order-2 lg:order-2 perspective-1000"
                            style={{ opacity: badgeOpacity, scale: badgeScale }}
                        >
                            <PerspectiveCard className="w-full max-w-[280px] md:max-w-[480px] mx-auto lg:mr-0" intensity={20}>
                                <div className="relative w-full aspect-[3/4.8] select-none group">

                                    {/* 1. Lanyard Strap (Woven Fabric Texture) */}
                                    <div className="absolute -top-32 md:-top-40 left-1/2 -translate-x-1/2 w-6 md:w-8 h-40 md:h-48 bg-[#111] z-0 shadow-2xl origin-bottom flex flex-col items-center overflow-hidden">
                                        {/* Fabric Weave Pattern */}
                                        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(45deg, #333 25%, transparent 25%, transparent 50%, #333 50%, #333 75%, transparent 75%, transparent)', backgroundSize: '4px 4px' }}></div>
                                        {/* Vertical stitching */}
                                        <div className="absolute left-1 top-0 bottom-0 w-[1px] border-l border-dashed border-gray-600 opacity-50"></div>
                                        <div className="absolute right-1 top-0 bottom-0 w-[1px] border-r border-dashed border-gray-600 opacity-50"></div>

                                        {/* Repeated Branding on Lanyard */}
                                        <div className="h-full flex flex-col gap-8 md:gap-12 py-4 opacity-40">
                                            <span className="text-[6px] md:text-[8px] font-bold text-white tracking-[0.3em] -rotate-90 whitespace-nowrap">STRIFE</span>
                                            <span className="text-[6px] md:text-[8px] font-bold text-white tracking-[0.3em] -rotate-90 whitespace-nowrap">STRIFE</span>
                                        </div>
                                    </div>

                                    {/* 2. Metal Clip Mechanism */}
                                    <div className="absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
                                        {/* The Metal Loop */}
                                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-[2px] md:border-[3px] border-gray-300 bg-transparent shadow-sm relative z-0"></div>
                                        {/* The Clamp Body */}
                                        <div className="w-10 h-8 md:w-14 md:h-10 bg-gradient-to-b from-gray-200 via-gray-100 to-gray-300 rounded-sm shadow-lg relative -mt-4 md:-mt-5 z-10 border border-gray-400 flex flex-col items-center justify-end pb-1 md:pb-2">
                                            {/* Metallic sheen */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-black/10 rounded-sm pointer-events-none"></div>
                                            <div className="w-8 h-1 md:w-10 md:h-1 bg-black/20 rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]"></div>
                                        </div>
                                    </div>

                                    {/* 3. Main Badge with Image */}
                                    <div className="absolute inset-0 bg-white rounded-xl overflow-hidden relative z-20 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(0,0,0,0.15)]">
                                        {/* Slot Punch */}
                                        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-3 bg-[#151515] rounded-full z-30 shadow-[inset_0_1px_3px_rgba(0,0,0,0.9)] border-b border-white/10"></div>

                                        {/* Image covering the entire badge */}
                                        <img
                                            src="/presswoman.png"
                                            alt="Press Badge"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </PerspectiveCard>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
};