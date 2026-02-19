import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    Download,
    Mail,
    Search,
    Menu,
    ExternalLink,
    Globe,
    ArrowUpRight,
    FileText,
    FileArchive,
    ChevronRight,
    X
} from 'lucide-react';

// --- Mock Data ---

type ContentType = 'release' | 'insight' | 'update';

interface Author {
    name: string;
    role: string;
    avatar: string;
}

interface ContentItem {
    id: number;
    type: ContentType;
    title?: string; // Optional for 'update'
    content: string; // Excerpt or full tweet text
    category?: string;
    date: string;
    readTime?: string;
    image?: string;
    featured?: boolean;
    author?: Author;
}

const AUTHOR_CEO: Author = {
    name: "Elena Varas",
    role: "Founder & CEO",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
};

const AUTHOR_CTO: Author = {
    name: "David Chen",
    role: "Chief Technology Officer",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
};

const CONTENT: ContentItem[] = [
    // Featured Story
    {
        id: 1,
        type: 'insight',
        title: "Caybles Unveils 'Clarity': The First Cognitive PR Engine",
        content: "Marking a paradigm shift in reputation management, Clarity uses advanced predictive modeling to help Series B founders anticipate media sentiment before it happens. This tool isn't just about monitoring; it's about seeing around corners in a volatile news cycle.",
        category: "Product Launch",
        date: "Feb 12, 2026",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
        featured: true,
        author: AUTHOR_CEO
    },
    // CEO Updates (Tweets)
    {
        id: 101,
        type: 'update',
        content: "Just wrapped up our Series B announcement. The reception has been incredible. It proves that the market is hungry for AI tools that don't just generate text, but generate strategy. #ClarityLaunch",
        date: "2h ago",
        author: AUTHOR_CEO
    },
    {
        id: 102,
        type: 'update',
        content: "Policy isn't a barrier to innovation; it's the framework that makes innovation sustainable. Great discussion with the EU Tech Commission today.",
        date: "Feb 10",
        author: AUTHOR_CEO
    },
    {
        id: 103,
        type: 'update',
        content: "We're open-sourcing our sentiment analysis model 'VibeCheck' effectively immediately. Developers, have at it. 🚀",
        date: "Feb 08",
        author: AUTHOR_CTO
    },
    // Press Releases
    {
        id: 201,
        type: 'release',
        title: "Caybles Expands Operations to Singapore and London",
        content: "Expansion aims to support growing fintech ecosystem in Southeast Asia and policy markets in the UK.",
        category: "Corporate",
        date: "Jan 28, 2026",
        readTime: "3 min read"
    },
    {
        id: 202,
        type: 'release',
        title: "Quarterly Report: Caybles sees 400% YoY Growth in AI Vertical",
        content: "Fiscal year 2025 results exceed expectations driven by adoption of our automated outreach tools.",
        category: "Financials",
        date: "Jan 15, 2026",
        readTime: "4 min read"
    },
    {
        id: 203,
        type: 'release',
        title: "Strategic Partnership Announced with Global Green Data",
        content: "New partnership brings environmental data directly into the Caybles dashboard for ESG reporting.",
        category: "Partnerships",
        date: "Dec 12, 2025",
        readTime: "2 min read"
    },
    // Blog Posts (Insights)
    {
        id: 301,
        type: 'insight',
        title: "The Death of the Press Release? Why Narrative APIs are the Future",
        content: "In this op-ed, we discuss why traditional static PDF press releases are becoming obsolete in an age of real-time data consumption.",
        category: "Thought Leadership",
        date: "Jan 15, 2026",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800",
        author: AUTHOR_CEO
    },
    {
        id: 302,
        type: 'insight',
        title: "Navigating Crisis in the Age of Deepfakes",
        content: "How brands can protect their reputation when truth itself is under attack. A guide for modern communications officers.",
        category: "Guide",
        date: "Dec 05, 2025",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        author: AUTHOR_CTO
    }
];

const PRESS_CONTACT = {
    name: "Sarah Jenkins",
    role: "Head of Global Communications",
    email: "sarah.j@caybles.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
};

export const Newsroom: React.FC = () => {
    const [subbed, setSubbed] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    // Filter content
    const featuredStory = CONTENT.find(c => c.featured);
    const updates = CONTENT.filter(c => c.type === 'update');
    const releases = CONTENT.filter(c => c.type === 'release');
    const insights = CONTENT.filter(c => c.type === 'insight' && !c.featured);

    return (
        <div className="min-h-screen bg-[#FDFDFD] text-black font-sans selection:bg-black selection:text-white">
            <style>{`
                .clean-scrollbar::-webkit-scrollbar {
                    height: 6px;
                }
                .clean-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .clean-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(0, 0, 0, 0.05);
                    border-radius: 20px;
                }
                .clean-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: rgba(0, 0, 0, 0.15);
                }
                /* Firefox */
                .clean-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(0, 0, 0, 0.05) transparent;
                }
            `}</style>

            {/* Navigation Bar */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-black/5 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="font-serif text-2xl tracking-tighter hover:opacity-70 transition-opacity">Your company</Link>
                        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-black/60">
                            <a href="#" className="text-black">Newsroom</a>

                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`flex items-center transition-all duration-300 ${searchOpen ? 'w-48 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-black/5 rounded-full px-3 py-1.5 text-sm focus:outline-none"
                            />
                        </div>
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="p-2 hover:bg-black/5 rounded-full transition-colors"
                        >
                            {searchOpen ? <X size={20} strokeWidth={1.5} /> : <Search size={20} strokeWidth={1.5} className="text-black/60" />}
                        </button>
                        <button className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors">
                            <Menu size={20} strokeWidth={1.5} className="text-black/60" />
                        </button>
                        <a href="#press-kit" className="hidden md:flex items-center gap-2 bg-teal-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-teal-700 transition-colors ml-2">
                            <Download size={14} strokeWidth={2} /> Media Kit
                        </a>
                    </div>
                </div>
            </nav>

            <main className="pt-24 pb-20 px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Hero Section */}
                    <div className="mb-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-5 border-b border-black/10 mb-8">
                            <div>
                                <h1 className="font-serif text-4xl md:text-5xl mb-2 tracking-tight">Newsroom</h1>
                                <p className="text-lg text-black/60 max-w-xl font-light leading-relaxed">
                                    Official source for news, announcements, and executive perspectives.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                {[Globe].map((Icon, i) => (
                                    <a key={i} href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-black/10 text-black/60 hover:text-black hover:border-black transition-all">
                                        <Icon size={16} strokeWidth={1.5} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Featured Story */}
                        {featuredStory && (
                            <section className="group cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                                <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-2xl bg-black/5 order-2 lg:order-1 shadow-sm">
                                    <img
                                        src={featuredStory.image}
                                        alt={featuredStory.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-white text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-black/10">
                                            Featured Story
                                        </span>
                                    </div>
                                </div>
                                <div className="order-1 lg:order-2 space-y-6">
                                    <div className="flex items-center gap-3 text-sm text-black/50 font-medium tracking-wide">
                                        <span className="text-black uppercase text-xs font-bold">{featuredStory.category}</span>
                                        <span className="w-px h-3 bg-black/20" />
                                        <span>{featuredStory.date}</span>
                                    </div>
                                    <h2 className="font-serif text-4xl lg:text-5xl leading-[1.1] group-hover:opacity-70 transition-opacity">
                                        {featuredStory.title}
                                    </h2>
                                    <p className="text-lg text-black/60 leading-relaxed font-light">
                                        {featuredStory.content}
                                    </p>
                                    <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                                        {featuredStory.author && (
                                            <>
                                                <img src={featuredStory.author.avatar} alt="" className="w-8 h-8 rounded-full grayscale" />
                                                <div className="text-sm font-medium">{featuredStory.author.name}</div>
                                            </>
                                        )}
                                        <div className="text-sm text-black/40">· {featuredStory.readTime}</div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                        {/* Left Column: Main Content */}
                        <div className="lg:col-span-8 space-y-24">

                            {/* Executive Briefs (Tweets/Updates) */}
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-8 flex items-center gap-2">

                                    Executive Desk
                                </h3>
                                <div className="flex gap-4 overflow-x-auto pb-6 -mx-6 px-6 md:mx-0 md:px-0 clean-scrollbar snap-x">
                                    {updates.map((update) => (
                                        <div key={update.id} className="min-w-[300px] md:min-w-[350px] bg-white border border-black/10 rounded-xl p-6 hover:border-black/30 transition-all duration-300 snap-center group flex flex-col justify-between h-56">
                                            <div>
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={update.author?.avatar} alt="" className="w-8 h-8 rounded-full grayscale" />
                                                        <div>
                                                            <div className="text-sm font-bold leading-none">
                                                                {update.author?.name}
                                                            </div>
                                                            <div className="text-[10px] text-black/40 uppercase tracking-wide mt-1">{update.author?.role}</div>
                                                        </div>
                                                    </div>
                                                    <ArrowUpRight size={16} className="text-black/20 group-hover:text-black transition-colors" />
                                                </div>
                                                <p className="text-base leading-relaxed text-black/80 font-medium line-clamp-3">
                                                    "{update.content}"
                                                </p>
                                            </div>
                                            <div className="text-xs text-black/40 font-medium">
                                                Posted {update.date}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Blog / Insights Grid */}
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-8 border-b border-black/10 pb-4">
                                    Perspectives & Analysis
                                </h3>
                                <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
                                    {insights.map((article) => (
                                        <article key={article.id} className="group cursor-pointer flex flex-col h-full">
                                            <div className="aspect-[3/2] rounded-lg overflow-hidden bg-black/5 mb-5 relative">
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-black/50 font-bold uppercase tracking-widest mb-3">
                                                <span className="text-black">{article.category}</span>
                                            </div>
                                            <h3 className="font-serif text-2xl mb-3 group-hover:underline decoration-1 underline-offset-4 leading-tight">
                                                {article.title}
                                            </h3>
                                            <p className="text-black/60 text-sm leading-relaxed mb-4 line-clamp-3">
                                                {article.content}
                                            </p>
                                            <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-medium">
                                                <span className="text-black underline underline-offset-4 decoration-black/30 group-hover:decoration-black transition-all flex items-center gap-1">
                                                    Read Analysis <ChevronRight size={14} />
                                                </span>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>

                            {/* Press Releases List */}
                            <section>
                                <div className="flex items-center justify-between mb-8 border-b border-black/10 pb-4">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-black/40">
                                        Press Releases
                                    </h3>
                                    <a href="#" className="text-xs font-bold uppercase tracking-widest text-black/60 hover:text-black transition-colors">
                                        View Archive
                                    </a>
                                </div>
                                <div className="divide-y divide-black/5">
                                    {releases.map((release) => (
                                        <article key={release.id} className="group cursor-pointer py-6 first:pt-0 hover:bg-black/[0.01] transition-colors -mx-4 px-4 rounded-lg">
                                            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-2">
                                                <h3 className="font-serif text-xl md:text-2xl group-hover:opacity-70 transition-opacity">
                                                    {release.title}
                                                </h3>
                                                <span className="text-xs text-black/40 font-mono whitespace-nowrap shrink-0">
                                                    {release.date}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-black/50 mb-3">
                                                <span className="uppercase tracking-wider font-bold bg-black/5 px-2 py-0.5 rounded text-black/70">
                                                    {release.category}
                                                </span>
                                                <span>{release.readTime}</span>
                                            </div>
                                            <p className="text-black/60 text-sm md:text-base max-w-3xl line-clamp-2">
                                                {release.content}
                                            </p>
                                        </article>
                                    ))}
                                </div>
                            </section>

                            <div className="flex justify-center pt-8">
                                <button className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity">
                                    Load Older Stories
                                </button>
                            </div>
                        </div>

                        {/* Right Column: Sidebar */}
                        <aside className="lg:col-span-4 space-y-12 h-fit lg:sticky lg:top-24">

                            {/* Media Contact */}
                            <div className="bg-white p-6 border border-black/10 rounded-xl">
                                <h3 className="font-serif text-xl mb-6">Media Contact</h3>
                                <div className="flex items-start gap-4 mb-6">
                                    <img
                                        src={PRESS_CONTACT.avatar}
                                        alt={PRESS_CONTACT.name}
                                        className="w-12 h-12 rounded-full object-cover grayscale"
                                    />
                                    <div>
                                        <div className="font-bold text-base">{PRESS_CONTACT.name}</div>
                                        <div className="text-xs text-black/50 uppercase tracking-wide mb-1">{PRESS_CONTACT.role}</div>
                                    </div>
                                </div>
                                <a href={`mailto:${PRESS_CONTACT.email}`} className="flex items-center justify-center gap-2 w-full bg-teal-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors">
                                    <Mail size={16} /> Email Sarah
                                </a>
                                <p className="mt-4 text-xs text-black/40 text-center leading-relaxed">
                                    For urgent inquiries, please reference "Press Priority" in your subject line.
                                </p>
                            </div>

                            {/* Press Assets */}
                            <div id="press-kit">
                                <h3 className="uppercase tracking-wider text-xs font-bold text-black/40 mb-6">Downloads</h3>
                                <div className="space-y-3">
                                    {[
                                        { title: "Brand Guidelines", meta: "PDF • 2.4 MB", icon: FileText },
                                        { title: "Logos & Marks", meta: "ZIP • 14 MB", icon: FileArchive },
                                        { title: "Executive Photos", meta: "ZIP • 45 MB", icon: FileArchive }
                                    ].map((item, i) => (
                                        <button key={i} className="w-full flex items-center justify-between p-3 bg-white hover:border-black/30 border border-black/10 rounded-lg transition-all group text-left">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-black/5 text-black/60 rounded flex items-center justify-center">
                                                    <item.icon size={16} strokeWidth={1.5} />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm text-black/80">{item.title}</div>
                                                    <div className="text-[10px] text-black/40 font-mono">{item.meta}</div>
                                                </div>
                                            </div>
                                            <Download size={16} strokeWidth={1.5} className="text-black/20 group-hover:text-black transition-colors" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Subscribe Box */}
                            <div className="bg-[#1a1a1a] text-white p-8 rounded-xl relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="font-serif text-2xl mb-2">The Wire</h3>
                                    <p className="text-white/60 text-sm mb-6 leading-relaxed">
                                        Receive official updates directly to your inbox.
                                    </p>

                                    {!subbed ? (
                                        <form onSubmit={(e) => { e.preventDefault(); setSubbed(true); }} className="space-y-3">
                                            <input
                                                type="email"
                                                placeholder="name@publication.com"
                                                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-all"
                                                required
                                            />
                                            <button className="w-full bg-white text-black font-medium text-sm py-3 rounded-lg hover:bg-gray-200 transition-colors">
                                                Subscribe
                                            </button>
                                        </form>
                                    ) : (
                                        <div className="bg-white/10 border border-white/10 rounded-lg p-4 text-center animate-in fade-in zoom-in duration-300">
                                            <div className="font-medium text-sm">You are subscribed.</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="bg-white border-t border-black/5 py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="font-serif text-xl font-bold tracking-tighter text-black">CAYBLES.</div>
                    <div className="flex gap-6 text-xs font-medium text-black/40 uppercase tracking-widest">
                        <a href="#" className="hover:text-black transition-colors">Privacy</a>
                        <a href="#" className="hover:text-black transition-colors">Terms</a>
                        <a href="#" className="hover:text-black transition-colors">Sitemap</a>
                    </div>
                    <div className="text-xs text-black/40">© 2026 Caybles Inc.</div>
                </div>
            </footer>
        </div>
    );
}
