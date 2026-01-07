import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Services: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // --- Background Animation ---
    // Scale: Zoom in continuously
    const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
    // Opacity: Fade in quickly, stay, then maybe fade out slightly at the very end
    const bgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0.5]);


    // --- Phase 1: Your Mission Matters (The Warp) ---
    // We want this to start visible (or fade in quickly) and then "warp"
    // expanding outwards towards the viewer (scale up) and blending.

    // Timeline: Maximum time in the critical readable zone
    const titleOpacity = useTransform(
        scrollYProgress,
        [0, 0.05, 0.35, 0.45],
        [0, 1, 1, 0]
    );
    // Scale: VERY slow growth from 1-2x (most critical), then accelerate
    const titleScale = useTransform(
        scrollYProgress,
        [0.05, 0.25, 0.35, 0.45],
        [1, 2, 8, 50]
    );
    // Blur: Only at the very end when it's massive
    const titleBlur = useTransform(
        scrollYProgress,
        [0.35, 0.45],
        ["0px", "12px"]
    );


    // --- Phase 2: The Critique (Strategic Placement) ---
    // Timeline: 0.5 to 0.9
    // Appears after we've "broken through" the mission statement
    const textOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]);
    const textY = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], ["40px", "0px", "0px", "-40px"]);


    return (
        <section ref={containerRef} id="services" className="relative h-[400vh] bg-black">

            {/* Sticky Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Background Image */}
                <motion.div
                    style={{ scale: bgScale, opacity: bgOpacity }}
                    className="absolute inset-0 w-full h-full z-0"
                >
                    <img
                        src="/creation_of_adam.png"
                        alt="The Creation of Adam cinematic interpretation"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50" />
                </motion.div>

                {/* Content Overlay Container */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center text-white pointer-events-none">

                    {/* --- Group 1: The Warp Title --- */}
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        <motion.h2
                            style={{
                                opacity: titleOpacity,
                                scale: titleScale,
                                filter: useTransform(titleBlur, (v) => `blur(${v})`)
                            }}
                            className="text-6xl md:text-9xl font-bold tracking-tighter text-white z-20 origin-center"
                        >
                            Your mission <br /> matters.
                        </motion.h2>
                    </div>

                    {/* --- Group 2: The Strategic Critique --- */}
                    <motion.div
                        style={{ opacity: textOpacity, y: textY }}
                        className="absolute max-w-4xl px-6 md:px-12 flex flex-col items-center justify-center z-30 space-y-8"
                    >
                        <h3
                            className="text-4xl md:text-6xl uppercase font-bold text-white drop-shadow-lg text-center"
                        >
                            Legacy PR don't understand startups
                        </h3>

                        <p
                            className="text-xl md:text-3xl leading-relaxed font-light text-white/80 drop-shadow-md italic text-center max-w-2xl"
                            style={{ fontFamily: '"Instrument Serif", serif' }}
                        >
                            We leverage tech to deliver unbeatable pricing and foster deep human connection, amplifying stories of those shaping the future of <span className="underline font-bold decoration-white/50 underline-offset-4 decoration-1">policy</span>, <span className="underline font-bold decoration-white/50 underline-offset-4 decoration-1">environment</span>, <span className="underline font-bold decoration-white/50 underline-offset-4 decoration-1">funding</span> and <span className="underline font-bold decoration-white/50 underline-offset-4 decoration-1">tech</span>.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};