import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CayblesLogo } from './ui/CayblesLogo';
import {
    QuestsDemo,
    QuestCreatorDemo,
    ProductEditorDemo,
    DistributionsDemo,
    CalendarDemo,
    PricingCard,
    WaitlistModal,
    TrustedByLogos,
    JournalistSection,
} from './landing';
import {
    SmoothScrollProvider,
    ScrollReveal,
    StaggerContainer,
    StaggerItem,
    MagneticElement,
    ScrollProgressBar,
    useSmoothScroll,
} from './SmoothScroll';

const DEMO_TIMELINE = [
    { id: 1, title: 'Embargo Lift', date: 'Jan 15', time: '09:00', type: 'embargo', color: 'violet' },
    { id: 2, title: 'Partner Review Due', date: 'Jan 15', time: '17:00', type: 'deadline', color: 'red' },
    { id: 3, title: 'Press Release Final', date: 'Jan 14', time: 'Done', type: 'complete', color: 'green' },
];

// Animated gradient orb that follows scroll
const GradientOrbs: React.FC = () => {
    const { scrollYProgress } = useSmoothScroll();
    const orb1Y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
    const orb2Y = useTransform(scrollYProgress, [0, 1], ['20%', '80%']);
    const orb3Y = useTransform(scrollYProgress, [0, 1], ['50%', '30%']);

    return (
        <>
            <motion.div
                className="fixed top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-teal-500/20 to-transparent rounded-full blur-3xl opacity-40 pointer-events-none z-0"
                style={{ y: orb1Y }}
            />
            <motion.div
                className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-purple-500/20 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none z-0"
                style={{ y: orb2Y }}
            />
            <motion.div
                className="fixed top-1/2 left-1/2 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl opacity-20 pointer-events-none z-0 -translate-x-1/2"
                style={{ y: orb3Y }}
            />
        </>
    );
};

// Navigation with scroll-aware behavior
const Navigation: React.FC<{ onOpenWaitlist: () => void }> = ({ onOpenWaitlist }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showNavCta, setShowNavCta] = useState(false);
    const [navReady, setNavReady] = useState(false);
    const { scrollY } = useSmoothScroll();

    useEffect(() => {
        const unsubscribe = scrollY.on('change', (latest) => {
            setIsScrolled(latest > 50);
            setShowNavCta(latest > window.innerHeight - 100);
        });
        return unsubscribe;
    }, [scrollY]);

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-black/60 backdrop-blur-xl border-white/10' : 'bg-transparent border-transparent'}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            onAnimationComplete={() => setNavReady(true)}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex justify-between items-center h-20">
                    <MagneticElement strength={20}>
                        {navReady && <CayblesLogo size="full" theme="white" height={48} />}
                    </MagneticElement>
                    <motion.div
                        className="flex items-center gap-6"
                        initial={false}
                        animate={{
                            opacity: showNavCta ? 1 : 0,
                            y: showNavCta ? 0 : -20,
                            pointerEvents: showNavCta ? 'auto' : 'none',
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        <MagneticElement strength={15}>
                            <button
                                onClick={onOpenWaitlist}
                                className="group bg-white text-black px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-gray-200 transition-all flex items-center gap-2"
                            >
                                Join Waitlist
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </MagneticElement>
                    </motion.div>
                </div>
            </div>
        </motion.nav>
    );
};

// Hero Section with immersive animations
const HeroSection: React.FC<{ onOpenWaitlist: () => void }> = ({ onOpenWaitlist }) => {
    const { scrollYProgress } = useSmoothScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
    const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -100]);
    const blurAmount = useTransform(scrollYProgress, [0, 0.15], [0, 20]);

    return (
        <motion.section
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            className="min-h-screen flex flex-col overflow-hidden relative"
        >
            <motion.div
                className="absolute inset-0 bg-black/0"
                style={{ backdropFilter: useTransform(blurAmount, (v) => `blur(${v}px)`) }}
            />

            {/* Floating Cards - Background decoration, scaled */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Card 1: Kanban - Top right at 1/3 vertical */}
                <motion.div
                    className="absolute top-[8%] sm:top-[33%] -right-8 sm:right-0 lg:right-8 origin-top-right"
                    style={{ transform: 'scale(var(--hero-card-scale, 0.5))' }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <FloatingKanbanCard />
                </motion.div>

                {/* Card 2: Timeline - Bottom left */}
                <motion.div
                    className="absolute bottom-1/4 -left-8 sm:left-0 lg:left-8 origin-bottom-left"
                    style={{ transform: 'scale(var(--hero-card-scale, 0.5))' }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 0.5, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    <FloatingTimelineCard />
                </motion.div>

                {/* Card 3: Deadline - Top left area, hidden on mobile */}
                <motion.div
                    className="absolute top-24 left-1/4 hidden md:block origin-top-left"
                    style={{ transform: 'scale(var(--hero-card-scale, 0.5))' }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 0.4, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <FloatingDeadlineCard />
                </motion.div>

                {/* Card 4: Product - Bottom right, hidden on smaller screens */}
                <motion.div
                    className="absolute bottom-20 right-1/4 hidden lg:block origin-bottom-right"
                    style={{ transform: 'scale(var(--hero-card-scale, 0.5))' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.35, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                >
                    <FloatingProductCard />
                </motion.div>
            </div>

            {/* Hero Content */}
            <div className="flex-1 flex items-center justify-center px-6 pt-32 pb-16 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-7xl md:text-9xl lg:text-[8rem] font-serif mb-8"
                    >
                        Your story,
                        <br />
                        <span className="text-white/40">told</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-12"
                    >
                        The PR toolkit for growing businesses
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <MagneticElement strength={25}>
                            <button
                                onClick={onOpenWaitlist}
                                className="group flex items-center gap-3 px-10 py-5 bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-gray-200 transition-all shadow-[0_0_60px_rgba(255,255,255,0.3)]"
                            >
                                Join the Waitlist
                            </button>
                        </MagneticElement>
                        <MagneticElement strength={15}>
                            <a
                                href="#tour"
                                className="group flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-white/60 hover:text-white text-sm uppercase tracking-widest transition-colors"
                            >
                                <span>See how it works</span>
                                {/* Scroll indicator inline on desktop, below on mobile */}
                                <motion.div
                                    className="w-4 h-6 sm:w-5 sm:h-8 border-2 border-current rounded-full flex justify-center"
                                    animate={{ y: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <motion.div
                                        className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-current rounded-full mt-1 sm:mt-1.5"
                                        animate={{ y: [0, 6, 0], opacity: [1, 0, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                </motion.div>
                            </a>
                        </MagneticElement>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

// Feature Section Component with zigzag layout
interface FeatureSectionProps {
    title: string;
    description: string;
    children: React.ReactNode;
    reversed?: boolean;
    gradient: string;
    textColor: string;
    accentColor: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
    title,
    description,
    children,
    reversed = false,
    gradient,
    textColor,
    accentColor,
}) => {
    return (
        <section className={`py-32 px-6 ${gradient} ${textColor} relative overflow-hidden`}>
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-20 items-center relative">
                <ScrollReveal
                    className={`space-y-6 ${reversed ? 'order-1 md:order-2' : ''}`}
                    y={60}
                    delay={0.1}
                >
                    <motion.h2
                        className="text-5xl md:text-6xl font-serif"
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 40 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        className={`text-lg md:text-xl ${accentColor} font-light leading-relaxed`}
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 30 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {description}
                    </motion.p>
                </ScrollReveal>
                <ScrollReveal
                    className={`overflow-visible ${reversed ? 'order-2 md:order-1' : ''}`}
                    y={80}
                    delay={0.3}
                    scale={0.95}
                >
                    {children}
                </ScrollReveal>
            </div>
        </section>
    );
};

// Main Landing Page Component
export const LandingPage: React.FC = () => {
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

    const openWaitlist = () => setIsWaitlistOpen(true);
    const closeWaitlist = () => setIsWaitlistOpen(false);

    return (
        <SmoothScrollProvider>
            <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
                <ScrollProgressBar color="bg-[#0D9488]" />
                <GradientOrbs />

                {/* Fixed Background */}
                <div className="fixed inset-0 z-0">
                    <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
                        <defs>
                            <filter id="hero-wave-filter">
                                <feTurbulence type="fractalNoise" baseFrequency="0.002 0.003" numOctaves="1" result="warp">
                                    <animate attributeName="baseFrequency" dur="20s" values="0.002 0.003; 0.002 0.005; 0.002 0.003" repeatCount="indefinite" />
                                </feTurbulence>
                                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warp" />
                            </filter>
                        </defs>
                    </svg>
                    <img
                        src="/hero-bg.png"
                        alt=""
                        className="w-full h-full object-cover opacity-60 scale-110"
                        style={{ filter: 'url(#hero-wave-filter)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
                </div>

                <Navigation onOpenWaitlist={openWaitlist} />

                <div className="relative z-10">
                    <HeroSection onOpenWaitlist={openWaitlist} />

                    <div id="tour" className="relative">
                        {/* Feature 1: Kanban */}
                        <FeatureSection
                            title="Yes, one size fits all"
                            description="Big announcement or small update: plan, track, review, and publish it all in one hub."
                            gradient="bg-gradient-to-br from-[#FAF9F6] via-white to-teal-50/30"
                            textColor="text-gray-900"
                            accentColor="text-gray-500"
                        >
                            <QuestsDemo />
                        </FeatureSection>

                        {/* Feature 2: Quest Creator */}
                        <FeatureSection
                            title="Everything for your campaign, in one place"
                            description="Centralize docs and emails, draft new assets, track announcements and deadlines, and schedule social posts for launches big or small."
                            reversed
                            gradient="bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]"
                            textColor="text-white"
                            accentColor="text-white/50"
                        >
                            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(45,212,191,0.15) 0%, transparent 60%)' }} />
                            <QuestCreatorDemo />
                        </FeatureSection>

                        {/* Feature 3: Editor */}
                        <FeatureSection
                            title="Craft your story"
                            description="A powerful editor for press releases, blog posts, and social content. AI-assisted drafting with your brand voice, real-time collaboration, and multi-platform formatting."
                            gradient="bg-gradient-to-br from-[#FAF9F6] via-white to-gray-50/50"
                            textColor="text-gray-900"
                            accentColor="text-gray-500"
                        >
                            <ProductEditorDemo />
                        </FeatureSection>

                        {/* Feature 4: Distributions */}
                        <FeatureSection
                            title="Reach the right journalists"
                            description="Built-in media database with outreach tracking. See who's opened your pitch, who responded, and follow up at the right time."
                            reversed
                            gradient="bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]"
                            textColor="text-white"
                            accentColor="text-white/50"
                        >
                            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 60%)' }} />
                            <DistributionsDemo />
                        </FeatureSection>

                        {/* Feature 5: Calendar */}
                        <section className="py-32 px-6 text-white relative overflow-hidden">
                            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 70% 70%, rgba(251,191,36,0.12) 0%, transparent 60%)' }} />
                            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center relative">
                                <ScrollReveal className="space-y-6" y={60}>
                                    <h2 className="text-5xl md:text-6xl font-serif">
                                        Never miss a deadline
                                    </h2>
                                    <p className="text-lg md:text-xl text-white/50 font-light">
                                        Entire PR timeline with embargoes, deadlines, and launch dates.
                                    </p>
                                </ScrollReveal>
                                <ScrollReveal y={80} delay={0.2}>
                                    <CalendarDemo />
                                </ScrollReveal>
                            </div>
                        </section>
                    </div>

                    {/* Pricing Section */}
                    <section className="py-32 px-6 bg-[#FAF9F6] text-gray-900">
                        <div className="max-w-4xl mx-auto">
                            <ScrollReveal className="text-center mb-16">
                                <h2 className="text-5xl md:text-6xl font-serif">
                                    Simple pricing.
                                </h2>
                                <p className="mt-4 text-lg text-gray-500 font-light">
                                    Start free. Scale when you need to.
                                </p>
                            </ScrollReveal>

                            <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8" staggerDelay={0.15}>
                                <StaggerItem>
                                    <PricingCard
                                        name="Free"
                                        price="$0"
                                        priceSubtext="/month"
                                        description="Basic campaign management for small teams."
                                        features={["3 active quests", "Basic editor", "Email support"]}
                                        cta="Get Started"
                                        onCta={openWaitlist}
                                    />
                                </StaggerItem>
                                <StaggerItem>
                                    <PricingCard
                                        name="Scale"
                                        price="$29"
                                        priceSubtext="/month + credits"
                                        description="Everything in Free, plus AI credits for content generation."
                                        features={["Unlimited quests", "AI-powered content", "Inject internal docs", "Brand assets", "Priority support", "Monthly spending limits"]}
                                        cta="Start Free Trial"
                                        onCta={openWaitlist}
                                        highlighted
                                    />
                                </StaggerItem>
                            </StaggerContainer>

                            <ScrollReveal delay={0.4}>
                                <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-200">
                                    <p className="text-gray-900 font-medium mb-1">Need a Caybles expert to review your campaigns?</p>
                                    <p className="text-sm text-gray-500 mb-4">Our seasoned experts also provide strategy, planning, and editorial support.</p>
                                    <MagneticElement strength={10}>
                                        <button
                                            onClick={openWaitlist}
                                            className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
                                        >
                                            Talk to us →
                                        </button>
                                    </MagneticElement>
                                </div>
                            </ScrollReveal>
                        </div>
                    </section>

                    <JournalistSection />

                    {/* CTA Section */}
                    <section className="py-40 px-6 text-white relative overflow-hidden">
                        <div className="absolute inset-0">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-teal-500/10 via-purple-500/10 to-teal-500/10 rounded-full blur-3xl opacity-30" />
                        </div>
                        <div className="max-w-4xl mx-auto text-center space-y-10 relative">
                            <ScrollReveal>
                                <h2 className="text-6xl md:text-8xl font-serif">
                                    Ready to tell
                                    <br />
                                    <span className="text-white/40">your story?</span>
                                </h2>
                            </ScrollReveal>
                            <ScrollReveal delay={0.2}>
                                <MagneticElement strength={30}>
                                    <button
                                        onClick={openWaitlist}
                                        className="group inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-bold uppercase tracking-wider text-base hover:bg-gray-200 transition-all shadow-[0_0_80px_rgba(255,255,255,0.2)]"
                                    >
                                        Join the Waitlist
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                    </button>
                                </MagneticElement>
                            </ScrollReveal>
                            <ScrollReveal delay={0.4}>
                                <p className="text-white/30 text-sm max-w-md mx-auto font-light">
                                    Early access rolling out soon. Join the waitlist to secure your spot.
                                </p>
                            </ScrollReveal>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="py-16 px-6 border-t border-white/10">
                        <div className="max-w-6xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="flex flex-col md:flex-row items-center justify-between gap-6"
                            >
                                <MagneticElement strength={15}>
                                    <CayblesLogo size="full" theme="light" height={58} />
                                </MagneticElement>
                                <p className="text-white/30 text-sm font-mono uppercase tracking-wider">
                                    © 2026 Caybles Inc.
                                </p>
                            </motion.div>
                        </div>
                    </footer>
                </div>

                <WaitlistModal isOpen={isWaitlistOpen} onClose={closeWaitlist} />
            </div>
        </SmoothScrollProvider>
    );
};

// Floating Card Components
const FloatingKanbanCard: React.FC = () => (
    <motion.div
        className="bg-gradient-to-br from-teal-50/90 to-white/90 rounded-xl shadow-2xl overflow-hidden border border-teal-100/50 backdrop-blur-sm"
        whileHover={{ scale: 1.02, rotateY: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
    >
        <div className="p-3 border-b border-black/5 bg-gray-50/50">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="ml-2 text-xs font-medium text-gray-600">Quests</span>
            </div>
        </div>
        <div className="p-3 grid grid-cols-3 gap-2 bg-[#FAF9F6]">
            <div className="space-y-2">
                <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Draft</div>
                <div className="bg-white rounded-lg p-2 space-y-1 border border-black/5">
                    <div className="h-1.5 bg-gray-300 rounded w-3/4" />
                    <div className="h-1.5 bg-gray-300 rounded w-1/2" />
                    <div className="flex items-center gap-1 mt-2">
                        <div className="w-4 h-4 rounded-full bg-teal-500 text-[8px] flex items-center justify-center text-white font-bold">M</div>
                        <span className="text-[8px] text-gray-400">3h</span>
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Review</div>
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-2 space-y-1">
                    <div className="flex items-center gap-1">
                        <span className="text-[8px] px-1 bg-red-100 text-red-700 rounded">Hot</span>
                    </div>
                    <div className="h-1.5 bg-amber-200 rounded w-full" />
                </div>
            </div>
            <div className="space-y-2">
                <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Ready</div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-2 space-y-1">
                    <div className="h-1.5 bg-emerald-200 rounded w-5/6" />
                    <div className="h-1.5 bg-emerald-200 rounded w-2/3" />
                </div>
            </div>
        </div>
    </motion.div>
);

const FloatingTimelineCard: React.FC = () => (
    <motion.div
        className="bg-gradient-to-br from-violet-50/80 to-white/80 rounded-xl shadow-xl overflow-hidden border border-violet-200/50 backdrop-blur-sm"
        whileHover={{ scale: 1.02, rotateY: 5 }}
        transition={{ type: 'spring', stiffness: 300 }}
    >
        <div className="p-3 border-b border-violet-200/50 bg-violet-100/50 flex items-center gap-2">
            <ClockIcon className="w-3.5 h-3.5 text-violet-600" />
            <span className="text-[11px] font-semibold text-violet-800">Timeline</span>
        </div>
        <div className="p-3">
            {DEMO_TIMELINE.map((event, i) => (
                <div key={event.id} className="flex items-start gap-2 mb-2 last:mb-0">
                    <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${
                        event.color === 'violet' ? 'bg-violet-500' :
                        event.color === 'red' ? 'bg-red-500' : 'bg-emerald-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium text-violet-900">{event.title}</p>
                        <p className="text-[9px] text-violet-700/70">{event.date} · {event.time}</p>
                    </div>
                    {i === 0 && <span className="text-[8px] px-1.5 py-0.5 bg-violet-200 text-violet-800 rounded-full flex-shrink-0">Next</span>}
                </div>
            ))}
        </div>
    </motion.div>
);

const ClockIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
    </svg>
);

const FloatingDeadlineCard: React.FC = () => (
    <motion.div
        className="bg-amber-50 rounded-xl shadow-xl overflow-hidden border border-amber-200/50 backdrop-blur-sm"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
    >
        <div className="p-3 border-b border-amber-200/50 bg-amber-100/50 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-amber-800">Deadline Alert</span>
        </div>
        <div className="p-3 bg-gradient-to-br from-amber-50 to-white">
            <p className="text-sm font-medium text-amber-900 mb-1">Embargo Lift</p>
            <p className="text-[11px] text-amber-700/70 mb-2">Series B Funding</p>
            <div className="flex items-center gap-1.5 text-amber-700">
                <ClockIcon className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">In 2 hours</span>
            </div>
        </div>
    </motion.div>
);

const FloatingProductCard: React.FC = () => (
    <motion.div
        className="bg-gradient-to-br from-blue-50/70 to-white/70 rounded-xl shadow-xl overflow-hidden border border-blue-200/40 backdrop-blur-sm"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
    >
        <div className="p-2.5 border-b border-blue-200/40 bg-blue-100/40 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="text-[10px] font-medium text-blue-800">LinkedIn Post</span>
            <span className="ml-auto text-[9px] px-1.5 py-0.5 bg-blue-200 text-blue-800 rounded-full">Draft</span>
        </div>
        <div className="p-3">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-500 to-blue-600" />
                <div>
                    <p className="text-[10px] font-medium text-blue-900">Jason Chan</p>
                    <p className="text-[8px] text-blue-700/60">Just now</p>
                </div>
            </div>
            <p className="text-[11px] text-blue-900/80 leading-relaxed line-clamp-3">
                Excited to announce our $25M Series B led by XVI Capital to accelerate product development...
            </p>
        </div>
    </motion.div>
);
