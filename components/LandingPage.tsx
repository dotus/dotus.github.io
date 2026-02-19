import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles, Bot, User, Calendar, Send, BarChart3, Clock, ChevronRight, Menu, X } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { CayblesLogo } from './ui/CayblesLogo';
import { PerspectiveCard } from './ui/PerspectiveCard';

// Demo data
const DEMO_QUESTS = [
    { id: 1, title: 'AI Policy Framework 2026', type: 'Blog Post', status: 'draft', author: 'M', time: '3h ago', priority: 'hot' },
    { id: 2, title: 'Q1 Strategy Memo', type: 'Strategy Memo', status: 'draft', author: 'S', time: '1d ago' },
    { id: 3, title: 'Series B Funding Announcement', type: 'Press Release', status: 'review', author: 'M', time: '2h ago', priority: 'hot' },
];

const DEMO_DISTRIBUTIONS = [
    { id: 1, title: 'Series B Funding Announcement', status: 'Sent', opened: 3, responses: 1, time: '2h ago' },
    { id: 2, title: 'Product Launch V3', status: 'Scheduled', time: 'Tomorrow 9:00 AM' },
];

export const LandingPage: React.FC = () => {
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showNavCta, setShowNavCta] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 50);
            setShowNavCta(scrollY > window.innerHeight - 100);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openWaitlist = () => setIsWaitlistOpen(true);
    const closeWaitlist = () => setIsWaitlistOpen(false);

    return (
        <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
            {/* Fixed Background with wave filter */}
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
                    className="w-full h-full object-cover opacity-80 scale-110"
                    style={{ filter: 'url(#hero-wave-filter)' }}
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-black/60 backdrop-blur-xl border-white/10' : 'bg-transparent border-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex justify-between items-center h-20">
                        <CayblesLogo size="full" theme="light" height={36} />
                        <div className={`flex items-center gap-6 transition-all duration-500 ${showNavCta ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                            <button
                                onClick={openWaitlist}
                                className="group bg-white text-black px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-gray-200 transition-all flex items-center gap-2"
                            >
                                Join Waitlist
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative z-10">
                {/* Hero Section */}
                <motion.section 
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="min-h-screen flex flex-col overflow-hidden relative"
                >
                    {/* Gradient decorations */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-teal-500/10 to-transparent rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-purple-500/10 to-transparent rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/3 pointer-events-none" />
                    
                    {/* Animated grid background */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

                    {/* Floating product preview cards */}
                    <motion.div 
                        initial={{ opacity: 0, x: 100, rotate: 5 }}
                        animate={{ opacity: 0.15, x: 0, rotate: 12 }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                        className="absolute top-1/4 right-10 md:right-20 w-64 h-80 bg-white rounded-xl shadow-2xl hidden lg:block pointer-events-none"
                        style={{ transform: 'perspective(1000px) rotateY(-15deg) rotateX(5deg)' }}
                    >
                        <div className="p-4 h-full">
                            <div className="flex gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-20 bg-gray-100 rounded mt-4"></div>
                                <div className="flex gap-2 mt-4">
                                    <div className="h-16 bg-teal-100 rounded flex-1"></div>
                                    <div className="h-16 bg-blue-100 rounded flex-1"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: -100, rotate: -5 }}
                        animate={{ opacity: 0.1, x: 0, rotate: -8 }}
                        transition={{ duration: 1.2, delay: 0.7 }}
                        className="absolute bottom-1/4 left-10 md:left-20 w-56 h-72 bg-white rounded-xl shadow-2xl hidden lg:block pointer-events-none"
                        style={{ transform: 'perspective(1000px) rotateY(15deg) rotateX(-5deg)' }}
                    >
                        <div className="p-4 h-full">
                            <div className="h-3 bg-gray-200 rounded w-1/3 mb-4"></div>
                            <div className="space-y-3">
                                <div className="h-12 bg-gray-100 rounded"></div>
                                <div className="h-12 bg-gray-100 rounded"></div>
                                <div className="h-12 bg-teal-50 rounded border border-teal-100"></div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Hero Content */}
                    <div className="flex-1 flex items-center justify-center px-6 pt-32 pb-16 relative z-10">
                        <div className="max-w-5xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="mb-8"
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-xs font-medium tracking-widest uppercase backdrop-blur-sm">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                    Coming Soon
                                </span>
                            </motion.div>
                            
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-tighter leading-[0.85] mb-8"
                                style={{ fontFamily: '"Instrument Serif", serif' }}
                            >
                                Your story,
                                <br />
                                <span className="text-white/40">told.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed mb-12"
                            >
                                The modern PR workspace. Track announcements from draft to publication, 
                                reach the right journalists, and never miss a deadline.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="flex flex-col sm:flex-row items-center justify-center gap-6"
                            >
                                <button
                                    onClick={openWaitlist}
                                    className="group flex items-center gap-3 px-10 py-5 bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-gray-200 transition-all shadow-[0_0_60px_rgba(255,255,255,0.3)] hover:shadow-[0_0_80px_rgba(255,255,255,0.4)]"
                                >
                                    Join the Waitlist
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <a
                                    href="#tour"
                                    className="group flex items-center gap-2 text-white/60 hover:text-white text-sm uppercase tracking-widest transition-colors"
                                >
                                    See how it works
                                    <span className="w-6 h-px bg-white/30 group-hover:w-10 group-hover:bg-white transition-all"></span>
                                </a>
                            </motion.div>

                            {/* Location */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="mt-20 flex items-center justify-center gap-4 text-white/30 text-xs uppercase tracking-[0.3em] font-mono"
                            >
                                <span>London</span>
                                <span className="w-8 h-px bg-white/20"></span>
                                <span>Hong Kong</span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Trusted By Logos */}
                    <TrustedByLogos />
                </motion.section>

                {/* Product Tour Section */}
                <div id="tour" className="relative bg-black">
                    {/* Section 01: Quests */}
                    <ProductFeature
                        number="01"
                        overline="Campaign Management"
                        title="Every announcement is a quest"
                        description="From press releases to blog posts, track every piece of content through your pipeline. Draft, review, approve, publish — all in one place."
                        align="left"
                    >
                        <QuestsDemo />
                    </ProductFeature>

                    {/* Section 02: Quest Creator */}
                    <ProductFeature
                        number="02"
                        overline="Organization"
                        title="Create quests in seconds"
                        description="Start with a title and synopsis. Add timeline events, attach documents, set your distribution list. Everything you need to organize your announcement."
                        align="right"
                    >
                        <QuestCreatorDemo />
                    </ProductFeature>

                    {/* Section 03: Quest Detail */}
                    <ProductFeature
                        number="03"
                        overline="Collaboration"
                        title="Everything in one place"
                        description="The quest detail view brings together your documents, timeline, outreach campaigns, team comments, and version history. No more hunting through emails and Slack."
                        align="left"
                    >
                        <QuestDetailDemo />
                    </ProductFeature>

                    {/* Section 04: Product Editor */}
                    <ProductFeature
                        number="04"
                        overline="Content Creation"
                        title="Craft your story"
                        description="A powerful editor for press releases, blog posts, and social content. AI-assisted drafting with your brand voice, real-time collaboration, and multi-platform formatting."
                        align="right"
                    >
                        <ProductEditorDemo />
                    </ProductFeature>

                    {/* Section 05: Distributions */}
                    <ProductFeature
                        number="05"
                        overline="Outreach"
                        title="Reach the right journalists"
                        description="Built-in media database with outreach tracking. See who's opened your pitch, who responded, and follow up at the right time."
                        align="left"
                    >
                        <DistributionsDemo />
                    </ProductFeature>

                    {/* Section 06: Calendar */}
                    <ProductFeature
                        number="06"
                        overline="Planning"
                        title="Never miss a deadline"
                        description="Visual calendar with embargo management, review deadlines, and launch dates. Your entire PR timeline at a glance."
                        align="right"
                    >
                        <CalendarDemo />
                    </ProductFeature>
                </div>

                {/* Hybrid Section */}
                <section className="py-32 px-6 border-t border-white/10 bg-black">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-20 items-center">
                            <div className="space-y-8">
                                <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/40">The Best of Both Worlds</span>
                                <h2 
                                    className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1]"
                                    style={{ fontFamily: '"Instrument Serif", serif' }}
                                >
                                    AI does the heavy lifting.
                                    <br />
                                    <span className="text-white/50">You nail the nuance.</span>
                                </h2>
                                <p className="text-xl text-white/60 leading-relaxed font-light">
                                    Our AI drafts the first version, suggests journalists, and tracks responses. 
                                    You bring the strategy, the relationships, and the final polish that makes 
                                    your story land.
                                </p>
                                <div className="flex items-center gap-8 pt-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
                                            <Bot className="w-5 h-5 text-teal-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">AI Drafting</p>
                                            <p className="text-xs text-white/40">Instant first drafts</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                            <User className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Human Review</p>
                                            <p className="text-xs text-white/40">Expert polish</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <HybridDemo />
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="py-32 px-6 border-t border-white/10 bg-black">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-20">
                            <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/40">Pricing</span>
                            <h2 
                                className="text-5xl md:text-6xl font-bold tracking-tighter mt-6"
                                style={{ fontFamily: '"Instrument Serif", serif' }}
                            >
                                Start free. Scale as you grow.
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <PricingCard
                                name="Starter"
                                price="Free"
                                description="For founders just getting started with PR."
                                features={["3 active quests", "Basic media database", "Email outreach", "Basic analytics"]}
                                cta="Join Waitlist"
                                onCta={openWaitlist}
                            />
                            <PricingCard
                                name="Professional"
                                price="$99"
                                period="/month"
                                description="For growing companies with regular announcements."
                                features={["Unlimited quests", "Advanced media database", "Campaign scheduling", "Embargo management", "Priority support"]}
                                cta="Join Waitlist"
                                onCta={openWaitlist}
                                highlighted
                            />
                            <PricingCard
                                name="Concierge"
                                price="Custom"
                                description="Your dedicated PR strategist embedded in your team."
                                features={["Everything in Pro", "Dedicated PR expert", "Embedded in your Slack", "Strategy & planning", "White-glove service"]}
                                cta="Talk to Us"
                                onCta={openWaitlist}
                            />
                        </div>
                    </div>
                </section>

                {/* We Wrote the Headlines Section */}
                <JournalistSection />

                {/* Final CTA */}
                <section className="py-40 px-6 border-t border-white/10 bg-black relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-teal-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                    </div>
                    <div className="max-w-4xl mx-auto text-center space-y-10 relative">
                        <h2 
                            className="text-6xl md:text-8xl font-bold tracking-tighter"
                            style={{ fontFamily: '"Instrument Serif", serif' }}
                        >
                            Ready to tell
                            <br />
                            <span className="text-white/50">your story?</span>
                        </h2>
                        <button
                            onClick={openWaitlist}
                            className="group inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-bold uppercase tracking-wider text-base hover:bg-gray-200 transition-all shadow-[0_0_60px_rgba(255,255,255,0.3)]"
                        >
                            Join the Waitlist
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </button>
                        <p className="text-white/40 text-sm max-w-md mx-auto">
                            Early access rolling out soon. Join the waitlist to secure your spot.
                        </p>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-16 px-6 border-t border-white/10 bg-black">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <CayblesLogo size="full" theme="light" height={28} />
                            <p className="text-white/30 text-sm font-mono uppercase tracking-wider">
                                © 2026 Caybles Inc. London, Hong Kong
                            </p>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Waitlist Modal */}
            <WaitlistModal isOpen={isWaitlistOpen} onClose={closeWaitlist} />
        </div>
    );
};

// Trusted By Logos Component
const TrustedByLogos: React.FC = () => {
    return (
        <div className="relative mt-auto pt-12 pb-12 z-40">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="mb-6">
                    <span className="text-white/50 text-xs uppercase tracking-[0.3em] font-mono">Trusted By</span>
                </div>
                <div className="overflow-hidden relative py-4 rounded-xl">
                    <div className="flex animate-scroll w-[200%]">
                        <div className="flex justify-around items-center w-1/2 px-12 gap-20 opacity-30 brightness-0 invert hover:opacity-60 transition-all duration-500">
                            <span className="text-2xl font-bold tracking-tighter">CNBC</span>
                            <span className="text-2xl font-bold tracking-tighter">TechCrunch</span>
                            <span className="text-2xl font-bold tracking-tighter">WIRED</span>
                            <span className="text-2xl font-bold tracking-tighter">The Verge</span>
                        </div>
                        <div className="flex justify-around items-center w-1/2 px-12 gap-20 opacity-30 brightness-0 invert hover:opacity-60 transition-all duration-500">
                            <span className="text-2xl font-bold tracking-tighter">CNBC</span>
                            <span className="text-2xl font-bold tracking-tighter">TechCrunch</span>
                            <span className="text-2xl font-bold tracking-tighter">WIRED</span>
                            <span className="text-2xl font-bold tracking-tighter">The Verge</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Product Feature Section Component
const ProductFeature: React.FC<{
    number: string;
    overline: string;
    title: string;
    description: string;
    align: 'left' | 'right';
    children: React.ReactNode;
}> = ({ number, overline, title, description, align, children }) => {
    return (
        <section className="py-32 px-6 border-t border-white/10">
            <div className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center ${align === 'right' ? 'md:grid-flow-dense' : ''}`}>
                <div className={`space-y-6 ${align === 'right' ? 'md:col-start-2' : ''}`}>
                    <div className="flex items-center gap-4">
                        <span className="text-5xl font-bold text-white/10">{number}</span>
                        <span className="text-xs font-mono uppercase tracking-[0.3em] text-teal-400">{overline}</span>
                    </div>
                    <h2 
                        className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.1]"
                        style={{ fontFamily: '"Instrument Serif", serif' }}
                    >
                        {title}
                    </h2>
                    <p className="text-lg text-white/60 leading-relaxed font-light">{description}</p>
                </div>
                <div className={align === 'right' ? 'md:col-start-1' : ''}>
                    {children}
                </div>
            </div>
        </section>
    );
};

// Journalist Section with Press Badge
const JournalistSection: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="py-40 px-6 border-t border-white/10 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    <motion.div style={{ y, opacity }} className="space-y-8">
                        <h2 
                            className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]"
                            style={{ fontFamily: '"Instrument Serif", serif' }}
                        >
                            WE WROTE
                            <br />
                            THE HEADLINES.
                        </h2>
                        <p className="text-xl text-white/60 leading-relaxed font-light max-w-lg">
                            We aren't guessing what newsrooms want. We know. Because for years, 
                            <span className="text-white font-medium border-b border-white/30"> we were the ones deleting bad pitches</span> and publishing the good ones.
                        </p>
                        <div className="flex items-center gap-2 pt-4">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                <span className="text-xl">📰</span>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 -ml-2">
                                <span className="text-xl">✍️</span>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 -ml-2">
                                <span className="text-xl">📺</span>
                            </div>
                        </div>
                    </motion.div>
                    <div className="flex justify-center md:justify-end">
                        <PerspectiveCard intensity={15}>
                            <div className="relative w-64 md:w-80">
                                {/* Lanyard */}
                                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-6 h-32 bg-gradient-to-b from-gray-800 to-gray-900 z-0">
                                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #333 2px, #333 4px)' }}></div>
                                </div>
                                {/* Clip */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-8 bg-gradient-to-b from-gray-300 to-gray-400 rounded-sm shadow-lg z-10"></div>
                                {/* Badge */}
                                <div className="bg-white rounded-xl overflow-hidden shadow-2xl relative z-20">
                                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                        <div className="text-center p-6">
                                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-black flex items-center justify-center">
                                                <CayblesLogo size="small" theme="light" height={40} />
                                            </div>
                                            <p className="text-black font-bold text-lg tracking-tight">PRESS</p>
                                            <p className="text-black/60 text-sm">Caybles Media</p>
                                            <div className="mt-4 pt-4 border-t border-black/10">
                                                <p className="text-black/40 text-xs uppercase tracking-wider">Verified Journalist</p>
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

// Demo Components (keeping the same implementation)
const QuestsDemo: React.FC = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-2xl shadow-black/50">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div>
                <h3 className="font-semibold text-gray-900">Quests</h3>
                <p className="text-xs text-gray-500">Track from draft to publication</p>
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-teal-600 text-white text-xs font-medium rounded-lg">New Quest</button>
        </div>
        <div className="p-4 grid grid-cols-4 gap-3">
            {['Draft', 'In Review', 'Ready', 'Published'].map((col, i) => (
                <div key={col} className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-gray-600">{col}</span>
                        <span className="text-gray-400">{[2, 1, 2, 0][i]}</span>
                    </div>
                    <div className="space-y-2">
                        {DEMO_QUESTS.filter(q => 
                            (col === 'Draft' && q.status === 'draft') ||
                            (col === 'In Review' && q.status === 'review') ||
                            (col === 'Ready' && q.status === 'ready')
                        ).map(quest => (
                            <div key={quest.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[10px] px-1.5 py-0.5 bg-gray-200 rounded text-gray-600">{quest.type}</span>
                                    {quest.priority && <span className="text-[10px] px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded">Hot</span>}
                                </div>
                                <h4 className="text-xs font-medium text-gray-900 mb-2 line-clamp-2">{quest.title}</h4>
                                <div className="flex items-center justify-between">
                                    <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px]">{quest.author}</div>
                                    <span className="text-[10px] text-gray-400">{quest.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const QuestCreatorDemo: React.FC = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-2xl shadow-black/50">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">←</div>
            <div className="flex-1">
                <input type="text" placeholder="Quest Title" className="w-full text-lg font-semibold placeholder:text-gray-300 border-none outline-none" defaultValue="Series B Funding Announcement" />
            </div>
            <div className="flex gap-2">
                <span className="px-2 py-1 bg-gray-100 text-xs rounded">Press Release</span>
                <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>In Review
                </span>
            </div>
        </div>
        <div className="p-4">
            <div className="flex gap-2 border-b border-gray-100 mb-4">
                {['Overview', 'Timeline', 'Distribution', 'Documents'].map((tab, i) => (
                    <button key={tab} className={`px-3 py-2 text-xs font-medium ${i === 0 ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500'}`}>{tab}</button>
                ))}
            </div>
            <div className="space-y-4">
                <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1.5">Synopsis</label>
                    <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 min-h-[80px]">Announcing our $25M Series B led by Andreessen Horowitz. Funds will accelerate product development and expand into European markets.</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-medium text-gray-600 block mb-1.5">Author</label>
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                            <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs">M</div>
                            <span className="text-sm">Mithil Shah</span>
                            <span className="text-xs text-gray-400 ml-auto">Editor</span>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-600 block mb-1.5">Priority</label>
                        <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg border border-orange-100">
                            <span className="text-orange-500">🔥</span>
                            <span className="text-sm text-orange-700">Hot Priority</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const QuestDetailDemo: React.FC = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-2xl shadow-black/50">
        <div className="p-4 border-b border-gray-100">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">←</div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600">Press Release</span>
                            <span className="text-xs px-2 py-0.5 bg-orange-100 rounded text-orange-600 flex items-center gap-1">🔥 Hot</span>
                        </div>
                        <h3 className="font-semibold text-gray-900">Series B Funding Announcement</h3>
                    </div>
                </div>
                <span className="text-xs px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg border border-amber-200">In Review</span>
            </div>
        </div>
        <div className="p-4">
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">Announcing our $25M Series B led by Andreessen Horowitz...</div>
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Product Outputs</h4>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-lg">📄</div>
                                <div className="flex-1">
                                    <span className="text-sm font-medium text-gray-900">Series B Press Release</span>
                                    <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded ml-2">Final</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                        <p className="text-xs font-semibold text-green-900 uppercase mb-1">Distribution</p>
                        <p className="text-sm font-medium text-green-900">📧 Sent</p>
                        <p className="text-xs text-green-700">3 opened · 1 response</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ProductEditorDemo: React.FC = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-2xl shadow-black/50">
        <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600">←</button>
                <span className="text-sm font-medium text-gray-900">Series B Press Release</span>
                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">Final</span>
            </div>
            <button className="px-3 py-1.5 bg-teal-600 text-white text-xs font-medium rounded">Publish</button>
        </div>
        <div className="grid grid-cols-4 h-[320px]">
            <div className="col-span-1 border-r border-gray-100 bg-gray-50/50 p-3">
                <div className="flex gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center"><Sparkles className="w-3 h-3 text-white" /></div>
                    <div className="bg-white p-2 rounded-lg rounded-tl-none text-xs text-gray-700 shadow-sm">I've drafted the intro. Want me to adjust?</div>
                </div>
                <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs">Y</div>
                    <div className="bg-teal-50 p-2 rounded-lg rounded-tl-none text-xs text-gray-700 border border-teal-100">Make it punchier.</div>
                </div>
            </div>
            <div className="col-span-2 p-6 overflow-y-auto">
                <h1 className="text-xl font-bold text-gray-900 mb-4">[Company] Raises $25M Series B</h1>
                <p className="text-sm text-gray-600 leading-relaxed"><strong>San Francisco, CA — January 15, 2026</strong> — [Company], the leading platform for AI-powered workflow automation, today announced it has raised $25 million in Series B funding...</p>
            </div>
            <div className="col-span-1 border-l border-gray-100 p-3">
                <p className="text-xs font-semibold text-gray-900 uppercase mb-2">Generate For</p>
                <div className="space-y-1">
                    {['Press Release', 'Twitter Thread', 'LinkedIn Post'].map((item, i) => (
                        <button key={item} className={`w-full text-left px-2 py-1.5 rounded text-xs ${i === 0 ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50 text-gray-600'}`}>{item}</button>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const DistributionsDemo: React.FC = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-2xl shadow-black/50">
        <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Active Distributions</h3>
            <p className="text-xs text-gray-500">Track your outreach campaigns</p>
        </div>
        <div className="p-4 space-y-3">
            {DEMO_DISTRIBUTIONS.map(dist => (
                <div key={dist.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><Send className="w-5 h-5 text-teal-600" /></div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{dist.title}</h4>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${dist.status === 'Sent' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>{dist.status}</span>
                        </div>
                        <p className="text-xs text-gray-500">{dist.status === 'Sent' ? `${dist.opened} opened · ${dist.responses} responses` : dist.time}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const CalendarDemo: React.FC = () => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-gray-900">January 2026</h3>
                    <p className="text-xs text-gray-500">2 events today</p>
                </div>
            </div>
            <div className="p-4">
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-2">
                    {days.map(d => <span key={d}>{d}</span>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 31 }, (_, i) => (
                        <button key={i} className={`aspect-square flex items-center justify-center text-xs rounded-lg ${i + 1 === 15 ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>{i + 1}</button>
                    ))}
                </div>
                <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-3 p-2 bg-violet-50 rounded-lg">
                        <div className="w-1 h-8 rounded-full bg-violet-400"></div>
                        <div className="flex-1">
                            <p className="text-xs font-medium text-gray-900">Series B Funding Announcement</p>
                            <p className="text-[10px] text-gray-500">Embargo Lift · 09:00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HybridDemo: React.FC = () => (
    <div className="relative">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0"><Sparkles className="w-4 h-4 text-white" /></div>
                <div className="flex-1 bg-white/10 rounded-lg rounded-tl-none p-3">
                    <p className="text-sm text-white/80">I've drafted the Series B announcement based on your FAQ doc. I've highlighted the 40% ARR growth and new market expansion.</p>
                </div>
            </div>
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center flex-shrink-0"><User className="w-4 h-4 text-white" /></div>
                <div className="flex-1 bg-white/20 rounded-lg rounded-tl-none p-3">
                    <p className="text-sm text-white">Great start. Let's lead with the customer milestone instead — 10M users is stronger than the revenue number for this audience.</p>
                </div>
            </div>
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0"><Sparkles className="w-4 h-4 text-white" /></div>
                <div className="flex-1 bg-white/10 rounded-lg rounded-tl-none p-3">
                    <p className="text-sm text-white/80">Updated. New lead: "10 million users later, we're announcing our Series B..."</p>
                    <div className="mt-2 flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-green-400">Ready for review</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const PricingCard: React.FC<{
    name: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    cta: string;
    onCta: () => void;
    highlighted?: boolean;
}> = ({ name, price, period, description, features, cta, onCta, highlighted }) => (
    <div className={`relative p-8 rounded-2xl border transition-all ${highlighted ? 'bg-white text-black border-white scale-105' : 'bg-white/5 backdrop-blur-sm border-white/10 text-white hover:bg-white/10'}`}>
        {highlighted && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-teal-600 text-white text-xs font-bold uppercase tracking-wider rounded-full">Most Popular</span>}
        <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">{name}</h3>
            <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold" style={{ fontFamily: '"Instrument Serif", serif' }}>{price}</span>
                {period && <span className={highlighted ? 'text-gray-600' : 'text-white/60'}>{period}</span>}
            </div>
            <p className={`mt-2 text-sm ${highlighted ? 'text-gray-600' : 'text-white/60'}`}>{description}</p>
        </div>
        <ul className="space-y-3 mb-8">
            {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${highlighted ? 'text-teal-600' : 'text-teal-400'}`} />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
        <button onClick={onCta} className={`w-full py-4 font-bold uppercase tracking-wider text-sm transition-colors ${highlighted ? 'bg-black text-white hover:bg-gray-800' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'}`}>
            {cta}
        </button>
    </div>
);

const WaitlistModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [state, handleSubmit] = useForm("xeeoyadw");

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]" />
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                        <div className="bg-[#0a0a0a] w-full max-w-md pointer-events-auto shadow-2xl border border-white/10 relative overflow-hidden">
                            <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-500 hover:bg-white/10 hover:text-white transition-colors z-10">
                                <X className="w-4 h-4" />
                            </button>
                            <div className="p-8 md:p-12">
                                {state.succeeded ? (
                                    <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
                                        <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center text-teal-500 mb-2">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white tracking-tight">You're on the list!</h2>
                                        <p className="text-gray-400">We'll be in touch when early access opens.</p>
                                        <button onClick={onClose} className="mt-6 px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">Close</button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-8">
                                            <h2 className="text-3xl font-bold tracking-tighter uppercase leading-none text-white" style={{ fontFamily: '"Instrument Serif", serif' }}>Join Waitlist</h2>
                                            <p className="text-gray-400 mt-2 text-lg leading-relaxed">Be among the first to experience Caybles.</p>
                                        </div>
                                        <form className="space-y-5" onSubmit={handleSubmit}>
                                            <div className="space-y-1">
                                                <label htmlFor="waitlist-name" className="text-sm font-bold uppercase tracking-wider text-gray-300">Name</label>
                                                <input id="waitlist-name" name="name" type="text" className="w-full bg-white/5 border-b border-white/10 p-3 text-white focus:outline-none focus:border-white transition-colors placeholder:text-gray-600" placeholder="Jane Doe" required />
                                                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1 block" />
                                            </div>
                                            <div className="space-y-1">
                                                <label htmlFor="waitlist-email" className="text-sm font-bold uppercase tracking-wider text-gray-300">Work Email</label>
                                                <input id="waitlist-email" type="email" name="email" className="w-full bg-white/5 border-b border-white/10 p-3 text-white focus:outline-none focus:border-white transition-colors placeholder:text-gray-600" placeholder="jane@company.com" required />
                                                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1 block" />
                                            </div>
                                            <div className="space-y-1">
                                                <label htmlFor="waitlist-company" className="text-sm font-bold uppercase tracking-wider text-gray-300">Company</label>
                                                <input id="waitlist-company" name="company" type="text" className="w-full bg-white/5 border-b border-white/10 p-3 text-white focus:outline-none focus:border-white transition-colors placeholder:text-gray-600" placeholder="Acme Inc" />
                                            </div>
                                            <button type="submit" disabled={state.submitting} className="w-full bg-white text-black h-12 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center gap-2 group transition-all mt-4">
                                                {state.submitting ? 'Joining...' : 'Join Waitlist'}
                                                {!state.submitting && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
