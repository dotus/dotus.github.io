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
    const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0.8]);

    return (
        <section ref={containerRef} id="journalists" className="relative h-[400vh] bg-black">

            {/* Sticky Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center border-b border-black">

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
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        {/* Left: Typography & Message */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="flex flex-col justify-center h-full order-2 lg:order-1"
                        >
                            <h2 className="text-6xl md:text-6xl font-bold mb-2 text-white">
                                WE WROTE <br />
                                THE HEADLINES.
                            </h2>


                            <div className="text-white py-2 max-w-lg">
                                <p className="text-xl md:text-2xl leading-relaxed font-light">
                                    We aren't guessing what newsrooms want. We know. Because for years, <span className="font-bold border-b-2 border-white">we were the ones deleting bad pitches</span> and publishing the good ones.
                                </p>
                            </div>
                        </motion.div>

                        {/* Right: Visual Proof (The Realistic Press Badge) */}
                        {/* Added pendulum motion wrapper */}
                        <motion.div
                            className="relative flex justify-center lg:justify-end py-12 order-1 lg:order-2 perspective-1000"
                            initial={{ rotateZ: 5 }}
                            animate={{
                                rotateZ: [-2, 2, -2],
                                y: [-10, 0, -10]
                            }}
                            transition={{
                                rotateZ: {
                                    duration: 7,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                },
                                y: {
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }}
                            style={{ transformOrigin: "top center" }}
                        >
                            <PerspectiveCard className="w-full max-w-[480px] mx-auto" intensity={20}>
                                <div className="relative w-full aspect-[3/4.8] select-none group">

                                    {/* 1. Lanyard Strap (Woven Fabric Texture) */}
                                    <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-8 h-48 bg-[#111] z-0 shadow-2xl origin-bottom flex flex-col items-center overflow-hidden">
                                        {/* Fabric Weave Pattern */}
                                        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(45deg, #333 25%, transparent 25%, transparent 50%, #333 50%, #333 75%, transparent 75%, transparent)', backgroundSize: '4px 4px' }}></div>
                                        {/* Vertical stitching */}
                                        <div className="absolute left-1 top-0 bottom-0 w-[1px] border-l border-dashed border-gray-600 opacity-50"></div>
                                        <div className="absolute right-1 top-0 bottom-0 w-[1px] border-r border-dashed border-gray-600 opacity-50"></div>

                                        {/* Repeated Branding on Lanyard */}
                                        <div className="h-full flex flex-col gap-12 py-4 opacity-40">
                                            <span className="text-[8px] font-bold text-white tracking-[0.3em] -rotate-90 whitespace-nowrap">STRIFE</span>
                                            <span className="text-[8px] font-bold text-white tracking-[0.3em] -rotate-90 whitespace-nowrap">STRIFE</span>
                                        </div>
                                    </div>

                                    {/* 2. Metal Clip Mechanism */}
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
                                        {/* The Metal Loop */}
                                        <div className="w-8 h-8 rounded-full border-[3px] border-gray-300 bg-transparent shadow-sm relative z-0"></div>
                                        {/* The Clamp Body */}
                                        <div className="w-14 h-10 bg-gradient-to-b from-gray-200 via-gray-100 to-gray-300 rounded-sm shadow-lg relative -mt-5 z-10 border border-gray-400 flex flex-col items-center justify-end pb-2">
                                            {/* Metallic sheen */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-black/10 rounded-sm pointer-events-none"></div>
                                            <div className="w-10 h-1 bg-black/20 rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]"></div>
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

                                        {/* Automated Continuous Shimmer */}
                                        <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
                                            <motion.div
                                                className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 blur-sm"
                                                initial={{ left: "-150%" }}
                                                animate={{ left: "200%" }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 3.5,
                                                    repeatDelay: 3,
                                                    ease: "easeInOut"
                                                }}
                                            />
                                        </div>
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