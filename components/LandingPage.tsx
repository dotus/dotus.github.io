import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles, Bot, User, Calendar, Send, BarChart3, Clock, ChevronRight } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { CayblesLogo } from './ui/CayblesLogo';

// Demo data matching the PRDashboard
const DEMO_QUESTS = [
    { id: 1, title: 'AI Policy Framework 2026', type: 'Blog Post', status: 'draft', author: 'M', time: '3h ago', priority: 'hot' },
    { id: 2, title: 'Q1 Strategy Memo', type: 'Strategy Memo', status: 'draft', author: 'S', time: '1d ago' },
    { id: 3, title: 'Series B Funding Announcement', type: 'Press Release', status: 'review', author: 'M', time: '2h ago', priority: 'hot' },
    { id: 4, title: 'New CTO Appointment', type: 'Press Release', status: 'ready', author: 'J', time: 'Yesterday' },
    { id: 5, title: 'Product Launch V3', type: 'Blog Post', status: 'ready', author: 'S', time: '2d ago', priority: 'hot' },
];

const DEMO_DISTRIBUTIONS = [
    { id: 1, title: 'Series B Funding Announcement', status: 'Sent', opened: 3, responses: 1, time: '2h ago' },
    { id: 2, title: 'Product Launch V3', status: 'Scheduled', time: 'Tomorrow 9:00 AM' },
];

const DEMO_EVENTS = [
    { id: 1, title: 'Series B Funding Announcement', subtitle: 'Embargo Lift', time: '09:00', type: 'embargo' },
    { id: 2, title: 'Partner Review Due', subtitle: 'Due', time: '17:00', type: 'due' },
];

export const LandingPage: React.FC = () => {
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

    const openWaitlist = () => setIsWaitlistOpen(true);
    const closeWaitlist = () => setIsWaitlistOpen(false);

    return (
        <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
            {/* Fixed Background */}
            <div className="fixed inset-0 z-0">
                <img
                    src="/hero-bg.png"
                    alt="Field of flowers"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <CayblesLogo size="small" theme="dark" height={28} />
                    <button
                        onClick={openWaitlist}
                        className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors"
                    >
                        Join Waitlist
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative z-10">
                {/* Hero Section */}
                <motion.section 
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="min-h-screen flex items-center justify-center px-6 pt-20"
                >
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-medium tracking-wider uppercase mb-6">
                                Coming Soon
                            </span>
                        </motion.div>
                        
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none"
                        >
                            Your story,
                            <br />
                            <span className="text-white/60">told.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light"
                        >
                            The modern PR workspace. Track your announcements from draft to publication, 
                            reach the right journalists, and never miss a deadline.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <button
                                onClick={openWaitlist}
                                className="group flex items-center gap-2 px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-gray-200 transition-all"
                            >
                                Join the Waitlist
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <a
                                href="#tour"
                                className="text-white/60 hover:text-white text-sm uppercase tracking-wider transition-colors"
                            >
                                See how it works
                            </a>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Product Tour Section */}
                <div id="tour" className="relative">
                    {/* Quests Feature */}
                    <FeatureSection
                        number="01"
                        title="Every announcement is a quest"
                        description="From press releases to blog posts, track every piece of content through your pipeline. Draft, review, approve, publish — all in one place."
                        align="left"
                    >
                        <QuestsDemo />
                    </FeatureSection>

                    {/* Quest Creation Feature */}
                    <FeatureSection
                        number="02"
                        title="Create quests in seconds"
                        description="Start with a title and synopsis. Add timeline events, attach documents, set your distribution list. Everything you need to organize your announcement."
                        align="right"
                    >
                        <QuestCreatorDemo />
                    </FeatureSection>

                    {/* Quest Detail Feature */}
                    <FeatureSection
                        number="03"
                        title="Everything in one place"
                        description="The quest detail view brings together your documents, timeline, outreach campaigns, team comments, and version history. No more hunting through emails and Slack."
                        align="left"
                    >
                        <QuestDetailDemo />
                    </FeatureSection>

                    {/* Product Editor Feature */}
                    <FeatureSection
                        number="04"
                        title="Craft your story"
                        description="A powerful editor for press releases, blog posts, and social content. AI-assisted drafting with your brand voice, real-time collaboration, and multi-platform formatting."
                        align="right"
                    >
                        <ProductEditorDemo />
                    </FeatureSection>

                    {/* Distributions Feature */}
                    <FeatureSection
                        number="05"
                        title="Reach the right journalists"
                        description="Built-in media database with outreach tracking. See who's opened your pitch, who responded, and follow up at the right time."
                        align="left"
                    >
                        <DistributionsDemo />
                    </FeatureSection>

                    {/* Calendar Feature */}
                    <FeatureSection
                        number="06"
                        title="Never miss a deadline"
                        description="Visual calendar with embargo management, review deadlines, and launch dates. Your entire PR timeline at a glance."
                        align="right"
                    >
                        <CalendarDemo />
                    </FeatureSection>
                </div>

                {/* Hybrid Approach Section */}
                <section className="py-32 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="space-y-6">
                                <span className="text-xs font-mono uppercase tracking-widest text-white/40">The Best of Both Worlds</span>
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                                    AI does the heavy lifting.
                                    <br />
                                    <span className="text-white/60">You nail the nuance.</span>
                                </h2>
                                <p className="text-lg text-white/60 leading-relaxed">
                                    Our AI drafts the first version, suggests journalists, and tracks responses. 
                                    You bring the strategy, the relationships, and the final polish that makes 
                                    your story land.
                                </p>
                                <div className="flex items-center gap-4 pt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                            <Bot className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm">AI Drafting</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm">Human Review</span>
                                    </div>
                                </div>
                            </div>
                            <HybridDemo />
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="py-32 px-6 border-t border-white/10">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-xs font-mono uppercase tracking-widest text-white/40">Pricing</span>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mt-4">
                                Start free. Scale as you grow.
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Starter */}
                            <PricingCard
                                name="Starter"
                                price="Free"
                                description="For founders just getting started with PR."
                                features={[
                                    "3 active quests",
                                    "Basic media database",
                                    "Email outreach",
                                    "Basic analytics"
                                ]}
                                cta="Join Waitlist"
                                onCta={openWaitlist}
                            />

                            {/* Professional */}
                            <PricingCard
                                name="Professional"
                                price="$99"
                                period="/month"
                                description="For growing companies with regular announcements."
                                features={[
                                    "Unlimited quests",
                                    "Advanced media database",
                                    "Campaign scheduling",
                                    "Embargo management",
                                    "Priority support"
                                ]}
                                cta="Join Waitlist"
                                onCta={openWaitlist}
                                highlighted
                            />

                            {/* Concierge */}
                            <PricingCard
                                name="Concierge"
                                price="Custom"
                                description="Your dedicated PR strategist embedded in your team."
                                features={[
                                    "Everything in Pro",
                                    "Dedicated PR expert",
                                    "Embedded in your Slack",
                                    "Strategy & planning",
                                    "White-glove service"
                                ]}
                                cta="Talk to Us"
                                onCta={openWaitlist}
                            />
                        </div>
                    </div>
                </section>

                {/* Credibility Section */}
                <section className="py-32 px-6 border-t border-white/10">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">
                            We Wrote the Headlines
                        </h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            We aren't guessing what newsrooms want. We know. Because for years, 
                            we were the ones deleting bad pitches and publishing the good ones.
                        </p>
                        <div className="flex items-center justify-center gap-8 pt-8 opacity-50">
                            <span className="text-2xl font-bold tracking-tighter">CNBC</span>
                            <span className="text-2xl font-bold tracking-tighter">TechCrunch</span>
                            <span className="text-2xl font-bold tracking-tighter">WIRED</span>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-32 px-6 border-t border-white/10">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
                            Ready to tell
                            <br />
                            your story?
                        </h2>
                        <button
                            onClick={openWaitlist}
                            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold uppercase tracking-wider text-base hover:bg-gray-200 transition-all"
                        >
                            Join the Waitlist
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-white/40 text-sm">
                            Early access rolling out soon. Join the waitlist to secure your spot.
                        </p>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 px-6 border-t border-white/10">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-2">
                            <CayblesLogo size="small" theme="dark" height={20} />
                        </div>
                        <p className="text-white/40 text-sm">
                            © 2026 Caybles Inc. London, Hong Kong
                        </p>
                    </div>
                </footer>
            </div>

            {/* Waitlist Modal */}
            <WaitlistModal isOpen={isWaitlistOpen} onClose={closeWaitlist} />
        </div>
    );
};

// Feature Section Component
const FeatureSection: React.FC<{
    number: string;
    title: string;
    description: string;
    align: 'left' | 'right';
    children: React.ReactNode;
}> = ({ number, title, description, align, children }) => {
    return (
        <section className="py-24 px-6 border-t border-white/10">
            <div className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center ${align === 'right' ? 'md:grid-flow-dense' : ''}`}>
                <div className={`space-y-6 ${align === 'right' ? 'md:col-start-2' : ''}`}>
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40">{number}</span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">{title}</h2>
                    <p className="text-lg text-white/60 leading-relaxed">{description}</p>
                </div>
                <div className={align === 'right' ? 'md:col-start-1' : ''}>
                    {children}
                </div>
            </div>
        </section>
    );
};

// Quests Demo Component
const QuestsDemo: React.FC = () => {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-gray-900">Quests</h3>
                    <p className="text-xs text-gray-500">Track from draft to publication</p>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-teal-600 text-white text-xs font-medium rounded-lg">
                    New Quest
                </button>
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
};

// Distributions Demo Component
const DistributionsDemo: React.FC = () => {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Active Distributions</h3>
                <p className="text-xs text-gray-500">Track your outreach campaigns</p>
            </div>
            <div className="p-4 space-y-3">
                {DEMO_DISTRIBUTIONS.map(dist => (
                    <div key={dist.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                            <Send className="w-5 h-5 text-teal-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <h4 className="text-sm font-medium text-gray-900 truncate">{dist.title}</h4>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                                    dist.status === 'Sent' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                                }`}>{dist.status}</span>
                            </div>
                            <p className="text-xs text-gray-500">
                                {dist.status === 'Sent' ? `${dist.opened} opened · ${dist.responses} responses · ${dist.time}` : dist.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Quest Creator Demo Component
const QuestCreatorDemo: React.FC = () => {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-600">&larr;</span>
                </div>
                <div className="flex-1">
                    <input 
                        type="text" 
                        placeholder="Quest Title"
                        className="w-full text-lg font-semibold placeholder:text-gray-300 border-none outline-none"
                        defaultValue="Series B Funding Announcement"
                    />
                </div>
                <div className="flex gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded">Press Release</span>
                    <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        In Review
                    </span>
                </div>
            </div>
            <div className="p-4">
                <div className="flex gap-2 border-b border-gray-100 mb-4">
                    {['Overview', 'Timeline', 'Distribution', 'Documents'].map((tab, i) => (
                        <button 
                            key={tab} 
                            className={`px-3 py-2 text-xs font-medium ${i === 0 ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-medium text-gray-600 block mb-1.5">Synopsis</label>
                        <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 min-h-[80px]">
                            Announcing our $25M Series B led by Andreessen Horowitz. Funds will accelerate product development and expand into European markets.
                        </div>
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
                    <div>
                        <label className="text-xs font-medium text-gray-600 block mb-1.5">Timeline Events</label>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 p-2 bg-violet-50 rounded-lg border border-violet-100">
                                <div className="w-6 h-6 rounded bg-violet-200 flex items-center justify-center text-violet-700 text-xs">📅</div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">Embargo Lift</p>
                                    <p className="text-xs text-gray-500">Jan 15, 2026 at 09:00</p>
                                </div>
                                <span className="text-xs px-2 py-0.5 bg-violet-200 text-violet-700 rounded">Embargo</span>
                            </div>
                            <div className="flex items-center gap-3 p-2 bg-red-50 rounded-lg border border-red-100">
                                <div className="w-6 h-6 rounded bg-red-200 flex items-center justify-center text-red-700 text-xs">⏰</div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">Partner Review Due</p>
                                    <p className="text-xs text-gray-500">Jan 15, 2026 at 17:00</p>
                                </div>
                                <span className="text-xs px-2 py-0.5 bg-red-200 text-red-700 rounded">Deadline</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-600 block mb-1.5">Attached Documents</label>
                        <div className="flex flex-wrap gap-2">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                                <span className="text-blue-500">📄</span>
                                <span className="text-xs">Investor Fact Sheet.pdf</span>
                                <span className="text-xs text-gray-400">1.2 MB</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                                <span className="text-purple-500">🖼️</span>
                                <span className="text-xs">Founder Headshots</span>
                            </div>
                            <button className="flex items-center gap-1 px-3 py-1.5 border border-dashed border-gray-300 rounded-lg text-xs text-gray-500 hover:bg-gray-50">
                                <span>+</span> Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Quest Detail Demo Component
const QuestDetailDemo: React.FC = () => {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">&larr;</div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600">Press Release</span>
                                <span className="text-xs px-2 py-0.5 bg-orange-100 rounded text-orange-600 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                    Hot
                                </span>
                            </div>
                            <h3 className="font-semibold text-gray-900">Series B Funding Announcement</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg border border-amber-200 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            In Review
                        </span>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">&bull;&bull;&bull;</button>
                    </div>
                </div>
                {/* Tabs */}
                <div className="flex gap-1">
                    {['Overview', 'Product', 'Distribution', 'Documents', 'Activity'].map((tab, i) => (
                        <button 
                            key={tab}
                            className={`px-4 py-2 text-xs font-medium rounded-lg ${i === 0 ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="p-4">
                <div className="grid grid-cols-3 gap-4">
                    {/* Left Column - Main Content */}
                    <div className="col-span-2 space-y-4">
                        {/* Synopsis */}
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">Announcing our $25M Series B led by Andreessen Horowitz. Funds will accelerate product development and expand into European markets.</p>
                        </div>
                        
                        {/* Products Section */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-sm font-semibold text-gray-900">Product Outputs</h4>
                                <button className="text-xs text-teal-600 font-medium">+ Create New</button>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow cursor-pointer">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-lg">📄</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-900">Series B Press Release</span>
                                            <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded">Final</span>
                                        </div>
                                        <p className="text-xs text-gray-500">Press Release • Last edited 2h ago</p>
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs">M</div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow cursor-pointer">
                                    <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-lg">📝</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-900">Social Thread</span>
                                            <span className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded">Draft</span>
                                        </div>
                                        <p className="text-xs text-gray-500">Social Content • Last edited 4h ago</p>
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs">S</div>
                                </div>
                            </div>
                        </div>

                        {/* Comments */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Recent Comments</h4>
                            <div className="space-y-3">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs font-medium">S</div>
                                    <div className="flex-1">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-sm font-medium text-gray-900">Sarah Jenkins</span>
                                            <span className="text-xs text-gray-400">Partner</span>
                                            <span className="text-xs text-gray-400">2h ago</span>
                                        </div>
                                        <p className="text-sm text-gray-700 mt-0.5">The quote from the CTO is strong. Should we include something about engineering culture?</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-medium">M</div>
                                    <div className="flex-1">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-sm font-medium text-gray-900">Mike Chen</span>
                                            <span className="text-xs text-gray-400">Editor</span>
                                            <span className="text-xs text-gray-400">4h ago</span>
                                        </div>
                                        <p className="text-sm text-gray-700 mt-0.5">Embargo confirmed with TechCrunch. 24hr exclusive.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-4">
                        {/* Timeline */}
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">Timeline</h4>
                            <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                    <div className="w-4 h-4 rounded-full bg-violet-500 mt-0.5"></div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-900">Embargo Lift</p>
                                        <p className="text-[10px] text-gray-500">Jan 15, 09:00</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-4 h-4 rounded-full bg-red-500 mt-0.5"></div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-900">Partner Review</p>
                                        <p className="text-[10px] text-gray-500">Jan 15, 17:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Distribution Status */}
                        <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                            <h4 className="text-xs font-semibold text-green-900 uppercase tracking-wider mb-2">Distribution</h4>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-lg">📧</span>
                                <span className="text-sm font-medium text-green-900">Sent</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-green-700">
                                <span className="flex items-center gap-1">👁️ 3 opened</span>
                                <span className="flex items-center gap-1">💬 1 response</span>
                            </div>
                        </div>

                        {/* Version History */}
                        <div>
                            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">Version History</h4>
                            <div className="space-y-1">
                                <div className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs">
                                    <span className="font-medium text-gray-900">v2.1</span>
                                    <span className="text-gray-500">2h ago</span>
                                </div>
                                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded text-xs">
                                    <span className="text-gray-600">v2.0</span>
                                    <span className="text-gray-400">Yesterday</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Product Editor Demo Component
const ProductEditorDemo: React.FC = () => {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
            {/* Toolbar */}
            <div className="p-3 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600">&larr;</button>
                    <span className="text-sm font-medium text-gray-900">Series B Press Release</span>
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">Final</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded">Save</button>
                    <button className="px-3 py-1.5 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700">Publish</button>
                </div>
            </div>
            
            <div className="grid grid-cols-4 h-[400px]">
                {/* Left Sidebar - Chat */}
                <div className="col-span-1 border-r border-gray-100 bg-gray-50/50 p-3 flex flex-col">
                    <div className="flex-1 space-y-3 overflow-hidden">
                        <div className="flex gap-2">
                            <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-3 h-3 text-white" />
                            </div>
                            <div className="bg-white p-2 rounded-lg rounded-tl-none text-xs text-gray-700 shadow-sm">
                                I've drafted the intro based on your funding announcement. Want me to adjust the tone?
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center flex-shrink-0 text-white text-xs">Y</div>
                            <div className="bg-teal-50 p-2 rounded-lg rounded-tl-none text-xs text-gray-700 border border-teal-100">
                                Make it punchier. Lead with the customer impact.
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-3 h-3 text-white" />
                            </div>
                            <div className="bg-white p-2 rounded-lg rounded-tl-none text-xs text-gray-700 shadow-sm">
                                Done! Updated the lead paragraph. Also generated social snippets for Twitter and LinkedIn.
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                placeholder="Ask AI to edit..."
                                className="flex-1 px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg outline-none focus:border-teal-500"
                            />
                            <button className="p-2 bg-teal-600 text-white rounded-lg">
                                <Send className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Editor */}
                <div className="col-span-2 p-6 overflow-y-auto">
                    <div className="max-w-lg mx-auto">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">[Company] Raises $25M Series B to Accelerate Growth</h1>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                            <strong>San Francisco, CA — January 15, 2026</strong> — [Company], the leading platform for AI-powered workflow automation, today announced it has raised $25 million in Series B funding led by Andreessen Horowitz, with participation from existing investors Sequoia Capital and Index Ventures.
                        </p>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                            The funding will accelerate product development and expand the company's presence in European markets. Since its Series A in 2024, [Company] has grown its customer base to over 10,000 businesses worldwide.
                        </p>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                            "We're building the future of work," said CEO Jane Doe. "This investment allows us to double down on our mission to make powerful AI accessible to every team."
                        </p>
                        <div className="h-px bg-gray-200 my-6"></div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">About [Company]</p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            [Company] is the all-in-one platform for AI-powered workflow automation. Founded in 2023, the company serves over 10,000 customers globally.
                        </p>
                    </div>
                </div>

                {/* Right Sidebar - Formatting & Export */}
                <div className="col-span-1 border-l border-gray-100 p-3 space-y-4">
                    {/* Formatting Tools */}
                    <div>
                        <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">Format</h4>
                        <div className="flex flex-wrap gap-1">
                            {['B', 'I', 'U', '•', '1.', '"', '🔗'].map((tool) => (
                                <button key={tool} className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded text-xs text-gray-600">
                                    {tool}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Output Types */}
                    <div>
                        <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">Generate For</h4>
                        <div className="space-y-1">
                            {[
                                { icon: '📄', label: 'Press Release', active: true },
                                { icon: '🐦', label: 'Twitter Thread', active: false },
                                { icon: '💼', label: 'LinkedIn Post', active: false },
                                { icon: '📧', label: 'Email Newsletter', active: false },
                            ].map((item) => (
                                <button 
                                    key={item.label}
                                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs ${item.active ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'hover:bg-gray-50 text-gray-600'}`}
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Attachments */}
                    <div>
                        <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">Attachments</h4>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 p-1.5 bg-gray-50 rounded text-xs">
                                <span>📄</span>
                                <span className="truncate flex-1">Fact Sheet.pdf</span>
                            </div>
                            <button className="w-full flex items-center gap-1 p-1.5 text-xs text-gray-500 hover:bg-gray-50 rounded">
                                <span>+</span> Add file
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Calendar Demo Component
const CalendarDemo: React.FC = () => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const dates = Array.from({ length: 31 }, (_, i) => i + 1);
    
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-gray-900">January 2026</h3>
                    <p className="text-xs text-gray-500">2 events today</p>
                </div>
                <div className="flex gap-1">
                    <button className="p-1 hover:bg-gray-100 rounded">&lt;</button>
                    <button className="p-1 hover:bg-gray-100 rounded">&gt;</button>
                </div>
            </div>
            <div className="p-4">
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-2">
                    {days.map(d => <span key={d}>{d}</span>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {dates.map(date => (
                        <button
                            key={date}
                            className={`aspect-square flex items-center justify-center text-xs rounded-lg ${
                                date === 15 ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'
                            }`}
                        >
                            {date}
                        </button>
                    ))}
                </div>
                <div className="mt-4 space-y-2">
                    {DEMO_EVENTS.map(event => (
                        <div key={event.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                            <div className={`w-1 h-8 rounded-full ${event.type === 'embargo' ? 'bg-orange-400' : 'bg-red-400'}`} />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-gray-900 truncate">{event.title}</p>
                                <p className="text-[10px] text-gray-500">{event.subtitle}</p>
                            </div>
                            <span className="text-[10px] text-gray-400">{event.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Hybrid Demo Component
const HybridDemo: React.FC = () => {
    return (
        <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
                {/* AI Message */}
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 bg-white/10 rounded-lg rounded-tl-none p-3">
                        <p className="text-sm text-white/80">
                            I've drafted the Series B announcement based on your FAQ doc. 
                            I've highlighted the 40% ARR growth and new market expansion.
                        </p>
                    </div>
                </div>
                
                {/* Human Message */}
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 bg-white/20 rounded-lg rounded-tl-none p-3">
                        <p className="text-sm text-white">
                            Great start. Let's lead with the customer milestone instead — 
                            10M users is stronger than the revenue number for this audience.
                        </p>
                    </div>
                </div>

                {/* AI Response */}
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 bg-white/10 rounded-lg rounded-tl-none p-3">
                        <p className="text-sm text-white/80">
                            Updated. New lead: "10 million users later, we're announcing our Series B..."
                            Also adjusted the journalist shortlist to focus on consumer tech rather than fintech.
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-green-400" />
                            <span className="text-xs text-green-400">Ready for review</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Pricing Card Component
const PricingCard: React.FC<{
    name: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    cta: string;
    onCta: () => void;
    highlighted?: boolean;
}> = ({ name, price, period, description, features, cta, onCta, highlighted }) => {
    return (
        <div className={`relative p-8 rounded-2xl border ${
            highlighted 
                ? 'bg-white text-black border-white' 
                : 'bg-white/5 backdrop-blur-sm border-white/10 text-white'
        }`}>
            {highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-teal-600 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                    Most Popular
                </span>
            )}
            <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{name}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{price}</span>
                    {period && <span className={highlighted ? 'text-gray-600' : 'text-white/60'}>{period}</span>}
                </div>
                <p className={`mt-2 text-sm ${highlighted ? 'text-gray-600' : 'text-white/60'}`}>{description}</p>
            </div>
            <ul className="space-y-3 mb-8">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${highlighted ? 'text-teal-600' : 'text-teal-400'}`} />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <button
                onClick={onCta}
                className={`w-full py-3 font-bold uppercase tracking-wider text-sm transition-colors ${
                    highlighted
                        ? 'bg-black text-white hover:bg-gray-800'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
            >
                {cta}
            </button>
        </div>
    );
};

// Waitlist Modal Component
const WaitlistModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [state, handleSubmit] = useForm("xeeoyadw");

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.98 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-[#0a0a0a] w-full max-w-md pointer-events-auto shadow-2xl border border-white/10 relative overflow-hidden">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-gray-500 hover:bg-white/10 hover:text-white transition-colors z-10"
                            >
                                <span className="sr-only">Close</span>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="p-8 md:p-12">
                                {state.succeeded ? (
                                    <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
                                        <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center text-teal-500 mb-2">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white tracking-tight">You're on the list!</h2>
                                        <p className="text-gray-400">We'll be in touch when early access opens.</p>
                                        <button
                                            onClick={onClose}
                                            className="mt-6 px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                                        >
                                            Close
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-8">
                                            <h2 className="text-3xl font-bold tracking-tighter uppercase leading-none text-white">Join Waitlist</h2>
                                            <p className="text-gray-400 mt-2 text-lg leading-relaxed">
                                                Be among the first to experience Caybles.
                                            </p>
                                        </div>

                                        <form className="space-y-5" onSubmit={handleSubmit}>
                                            <div className="space-y-1">
                                                <label htmlFor="waitlist-name" className="text-md font-bold uppercase tracking-wider text-gray-300">Name</label>
                                                <input
                                                    id="waitlist-name"
                                                    name="name"
                                                    type="text"
                                                    className="w-full bg-white/5 border-b border-white/10 p-3 text-md text-white focus:outline-none focus:border-white focus:bg-white/10 transition-colors rounded-none placeholder:text-gray-600"
                                                    placeholder="Jane Doe"
                                                    required
                                                />
                                                <ValidationError
                                                    prefix="Name"
                                                    field="name"
                                                    errors={state.errors}
                                                    className="text-red-500 text-xs mt-1 block"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <label htmlFor="waitlist-email" className="text-md font-bold uppercase tracking-wider text-gray-300">Work Email</label>
                                                <input
                                                    id="waitlist-email"
                                                    type="email"
                                                    name="email"
                                                    className="w-full bg-white/5 border-b border-white/10 p-3 text-md text-white focus:outline-none focus:border-white focus:bg-white/10 transition-colors rounded-none placeholder:text-gray-600"
                                                    placeholder="jane@company.com"
                                                    required
                                                />
                                                <ValidationError
                                                    prefix="Email"
                                                    field="email"
                                                    errors={state.errors}
                                                    className="text-red-500 text-xs mt-1 block"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <label htmlFor="waitlist-company" className="text-md font-bold uppercase tracking-wider text-gray-300">Company</label>
                                                <input
                                                    id="waitlist-company"
                                                    name="company"
                                                    type="text"
                                                    className="w-full bg-white/5 border-b border-white/10 p-3 text-md text-white focus:outline-none focus:border-white focus:bg-white/10 transition-colors rounded-none placeholder:text-gray-600"
                                                    placeholder="Acme Inc"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={state.submitting}
                                                className="w-full bg-white text-black h-12 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group transition-all mt-4"
                                            >
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
