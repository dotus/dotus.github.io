import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Clock, 
    ArrowUpRight, 
    Share2, 
    Bookmark, 
    ChevronLeft,
    Eye,
    Hash,
    ArrowRight,
    Calendar
} from 'lucide-react';
import { MOCK_BLOG_POSTS, MOCK_QUESTS, type BlogPost, type Quest, CLIENT_PERSONNEL, CLIENT_QUOTES } from './StatsOverview';

interface KnowledgePageProps {
    onNavigateToQuest?: (quest: Quest) => void;
}

export const KnowledgePage: React.FC<KnowledgePageProps> = ({ onNavigateToQuest }) => {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [hoveredPost, setHoveredPost] = useState<string | null>(null);

    const featuredPost = MOCK_BLOG_POSTS.find(p => p.featured) || MOCK_BLOG_POSTS[0];
    const otherPosts = MOCK_BLOG_POSTS.filter(p => p.id !== featuredPost.id);

    const categories = ['All', ...Array.from(new Set(MOCK_BLOG_POSTS.map(p => p.category)))];

    const filteredPosts = activeCategory === 'All' 
        ? otherPosts 
        : otherPosts.filter(p => p.category === activeCategory);

    const handleQuestClick = (questId?: number) => {
        if (!questId || !onNavigateToQuest) return;
        const quest = MOCK_QUESTS.find(q => q.id === questId);
        if (quest) {
            onNavigateToQuest(quest);
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };

    if (selectedPost) {
        return (
            <ArticleReader 
                post={selectedPost} 
                onClose={() => setSelectedPost(null)}
                onNavigateToQuest={handleQuestClick}
                formatDate={formatDate}
            />
        );
    }

    return (
        <div className="h-full overflow-y-auto bg-[#FAF9F6] relative">
            {/* Grid Background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Main grid */}
                <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, #000 1px, transparent 1px),
                            linear-gradient(to bottom, #000 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAF9F6]/50" />
                {/* Top highlight */}
                <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-teal-50/30 to-transparent" />
            </div>

            <div className="relative max-w-7xl mx-auto px-8 py-12">
                {/* Elegant Header */}
                <header className="mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-end justify-between border-b border-black/10 pb-8"
                    >
                        <div>
                            <h1 className="font-serif text-5xl font-medium text-black tracking-tight">
                                Knowledge
                            </h1>
                        </div>
                        <div className="text-right">
                            <p className="font-serif text-6xl font-light text-black/10">
                                {String(MOCK_BLOG_POSTS.length).padStart(2, '0')}
                            </p>
                            <p className="text-[11px] uppercase tracking-wider text-black/40 -mt-2">
                                Articles
                            </p>
                        </div>
                    </motion.div>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="mt-6 text-lg text-black/50 max-w-2xl leading-relaxed font-light"
                    >
                        Thought leadership, company updates, and technical deep dives. 
                        This is how the world sees your expertise.
                    </motion.p>
                </header>

                {/* Category Filter - Minimal Pills */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="flex items-center gap-1 mb-12 overflow-x-auto pb-2 scrollbar-hide"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`relative px-4 py-2 text-sm transition-all duration-200 whitespace-nowrap rounded-lg ${
                                activeCategory === cat
                                    ? 'bg-teal-50 text-teal-700'
                                    : 'text-black/40 hover:text-black/70 hover:bg-black/[0.02]'
                            }`}
                        >
                            <span className={activeCategory === cat ? 'font-medium' : 'font-normal'}>
                                {cat}
                            </span>
                            {activeCategory === cat && (
                                <motion.div
                                    layoutId="activeCategory"
                                    className="absolute inset-0 bg-teal-50 rounded-lg -z-10 border border-teal-100"
                                    transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                                />
                            )}
                        </button>
                    ))}
                </motion.div>

                {/* Featured Article - Magazine Layout */}
                <motion.section 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-20"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-teal-600 bg-teal-50 px-4 py-2 rounded-full border border-teal-100">
                            Featured Story
                        </span>
                        <div className="flex-1 h-px bg-gradient-to-r from-teal-100 via-black/10 to-transparent" />
                    </div>

                    <article 
                        onClick={() => setSelectedPost(featuredPost)}
                        className="group cursor-pointer grid grid-cols-12 gap-8 items-center"
                    >
                        {/* Image Side */}
                        <div className="col-span-7">
                            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl shadow-black/5 group-hover:shadow-2xl group-hover:shadow-black/10 transition-all duration-500">
                                {featuredPost.coverImage ? (
                                    <img 
                                        src={featuredPost.coverImage} 
                                        alt={featuredPost.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <>
                                        {/* Abstract pattern */}
                                        <div className="absolute inset-0 opacity-30">
                                            <div className="absolute inset-0" style={{
                                                backgroundImage: `radial-gradient(circle at 30% 40%, rgba(13, 148, 136, 0.1) 0%, transparent 50%),
                                                                  radial-gradient(circle at 70% 60%, rgba(235, 168, 50, 0.08) 0%, transparent 50%)`
                                            }} />
                                        </div>
                                        {/* Letter mark */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="font-serif text-[180px] font-light text-black/5 group-hover:text-black/10 transition-colors duration-500 select-none">
                                                {featuredPost.title.charAt(0)}
                                            </span>
                                        </div>
                                    </>
                                )}
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                                {/* Read indicator */}
                                <div className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    <ArrowRight size={20} className="text-black" />
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="col-span-5 py-4">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-xs font-medium text-black/40 uppercase tracking-wider">
                                    {featuredPost.category}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-black/20" />
                                {featuredPost.relatedQuestId && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleQuestClick(featuredPost.relatedQuestId);
                                        }}
                                        className="text-xs font-medium text-teal-600 hover:text-teal-700 transition-colors flex items-center gap-1 group/quest"
                                    >
                                        <Hash size={11} />
                                        <span className="group-hover/quest:underline">{featuredPost.relatedQuestTitle}</span>
                                    </button>
                                )}
                            </div>

                            <h2 className="font-serif text-4xl font-medium text-black mb-4 leading-[1.15] group-hover:text-teal-700 transition-colors duration-300">
                                {featuredPost.title}
                            </h2>

                            {featuredPost.subtitle && (
                                <p className="text-xl text-black/50 mb-6 font-serif italic leading-relaxed">
                                    {featuredPost.subtitle}
                                </p>
                            )}

                            <p className="text-black/60 leading-relaxed mb-8 line-clamp-3">
                                {featuredPost.excerpt}
                            </p>

                            {/* Author & Meta */}
                            <div className="flex items-center justify-between pt-6 border-t border-black/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-white flex items-center justify-center text-sm font-medium shadow-md">
                                        {featuredPost.author.initials}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-black">{featuredPost.author.name}</p>
                                        <p className="text-xs text-black/40">{featuredPost.author.role}</p>
                                    </div>
                                </div>
                                <div className="text-right text-xs text-black/40">
                                    <p>{formatDate(featuredPost.publishedAt)}</p>
                                    <p className="flex items-center gap-1 justify-end mt-0.5">
                                        <Clock size={11} />
                                        {featuredPost.readTime}
                                    </p>
                                </div>
                            </div>

                            {/* Stats */}
                            {featuredPost.stats && (
                                <div className="flex items-center gap-6 mt-6 text-xs text-black/30">
                                    <span className="flex items-center gap-1.5">
                                        <Eye size={13} />
                                        {featuredPost.stats.views.toLocaleString()} views
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Share2 size={13} />
                                        {featuredPost.stats.shares} shares
                                    </span>
                                </div>
                            )}
                        </div>
                    </article>
                </motion.section>

                {/* Article Grid - Editorial Style */}
                <section>
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-4">
                            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-black/40">
                                More Articles
                            </h3>
                            <div className="w-12 h-px bg-black/10" />
                        </div>
                        <span className="text-xs text-black/30">
                            {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                        {filteredPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                onClick={() => setSelectedPost(post)}
                                onMouseEnter={() => setHoveredPost(post.id)}
                                onMouseLeave={() => setHoveredPost(null)}
                                className="group cursor-pointer"
                            >
                                {/* Card Image */}
                                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-5 shadow-md shadow-black/5 group-hover:shadow-lg group-hover:shadow-black/10 transition-all duration-300">
                                    {post.coverImage ? (
                                        <img 
                                            src={post.coverImage} 
                                            alt={post.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="font-serif text-8xl font-light text-black/5 group-hover:text-black/10 transition-colors duration-300 select-none">
                                                {post.title.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                    {/* Category badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="text-[10px] font-medium px-3 py-1.5 bg-white/90 backdrop-blur-sm text-black/70 rounded-full shadow-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                    {/* Hover arrow */}
                                    <div className={`absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 ${
                                        hoveredPost === post.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                    }`}>
                                        <ArrowUpRight size={16} className="text-black" />
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="space-y-3">
                                    {/* Quest link */}
                                    {post.relatedQuestId && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleQuestClick(post.relatedQuestId);
                                            }}
                                            className="text-[10px] font-medium text-teal-600 hover:text-teal-700 transition-colors flex items-center gap-1 group/quest"
                                        >
                                            <Hash size={9} />
                                            <span className="group-hover/quest:underline">{post.relatedQuestTitle}</span>
                                        </button>
                                    )}

                                    <h3 className="font-serif text-xl font-medium text-black leading-snug group-hover:text-teal-700 transition-colors duration-200">
                                        {post.title}
                                    </h3>

                                    <p className="text-sm text-black/50 leading-relaxed line-clamp-2">
                                        {post.excerpt}
                                    </p>

                                    {/* Meta */}
                                    <div className="flex items-center gap-3 pt-2 text-xs text-black/40">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-[9px] font-medium">
                                                {post.author.initials}
                                            </div>
                                            <span>{post.author.name}</span>
                                        </div>
                                        <span className="text-black/20">·</span>
                                        <span>{formatDate(post.publishedAt)}</span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </section>

                {/* Footer Quote */}
                <motion.footer 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-24 pt-12 border-t border-black/10"
                >
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="w-px h-16 bg-gradient-to-b from-transparent via-black/20 to-transparent mx-auto mb-8" />
                        <blockquote className="font-serif text-2xl text-black/60 italic leading-relaxed mb-4">
                            "{CLIENT_QUOTES[0].text}"
                        </blockquote>
                        <cite className="text-xs text-black/40 not-italic uppercase tracking-wider">
                            — {CLIENT_PERSONNEL[0].name}, {CLIENT_PERSONNEL[0].role}
                        </cite>
                    </div>
                </motion.footer>
            </div>
        </div>
    );
};

// Article Reader Component
interface ArticleReaderProps {
    post: BlogPost;
    onClose: () => void;
    onNavigateToQuest: (questId?: number) => void;
    formatDate: (date: string) => string;
}

const ArticleReader: React.FC<ArticleReaderProps> = ({ 
    post, 
    onClose, 
    onNavigateToQuest,
    formatDate 
}) => {
    const [showShareMenu, setShowShareMenu] = useState(false);

    const paragraphs = post.content.split('\n\n');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full overflow-y-auto bg-white relative"
        >
            {/* Grid background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #000 1px, transparent 1px),
                        linear-gradient(to bottom, #000 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Elegant Header Bar */}
            <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-black/5">
                <div className="max-w-3xl mx-auto px-8 h-16 flex items-center justify-between">
                    <button 
                        onClick={onClose}
                        className="flex items-center gap-2 text-sm text-black/40 hover:text-black transition-colors group"
                    >
                        <div className="w-8 h-8 rounded-full bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                            <ChevronLeft size={16} />
                        </div>
                        <span className="font-medium">Back to Knowledge</span>
                    </button>
                    
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setShowShareMenu(!showShareMenu)}
                            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 text-black/40 hover:text-black transition-colors"
                        >
                            <Share2 size={17} />
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 text-black/40 hover:text-black transition-colors">
                            <Bookmark size={17} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <article className="relative max-w-3xl mx-auto px-8 py-16">
                {/* Category & Quest Link */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-600 bg-teal-50 px-4 py-2 rounded-full border border-teal-100">
                        {post.category}
                    </span>
                    {post.relatedQuestId && (
                        <button
                            onClick={() => onNavigateToQuest(post.relatedQuestId)}
                            className="text-[11px] font-medium text-black/40 hover:text-teal-600 transition-colors flex items-center gap-1.5 group"
                        >
                            <Hash size={11} />
                            <span className="group-hover:underline">Linked to {post.relatedQuestTitle}</span>
                            <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    )}
                </div>

                {/* Title */}
                <h1 className="font-serif text-5xl md:text-6xl font-medium text-black mb-6 leading-[1.1] text-center">
                    {post.title}
                </h1>

                {/* Subtitle */}
                {post.subtitle && (
                    <p className="text-xl md:text-2xl text-black/50 mb-12 font-serif italic leading-relaxed text-center max-w-2xl mx-auto">
                        {post.subtitle}
                    </p>
                )}

                {/* Author Bar */}
                <div className="flex items-center justify-center gap-8 py-8 border-y border-black/10 mb-12">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-white flex items-center justify-center text-sm font-medium shadow-md">
                            {post.author.initials}
                        </div>
                        <div>
                            <p className="font-medium text-black">{post.author.name}</p>
                            <p className="text-sm text-black/40">{post.author.role}</p>
                        </div>
                    </div>
                    <div className="w-px h-8 bg-black/10" />
                    <div className="text-sm text-black/40 text-center">
                        <p className="flex items-center gap-2">
                            <Calendar size={14} />
                            {formatDate(post.publishedAt)}
                        </p>
                        <p className="flex items-center gap-2 mt-1">
                            <Clock size={14} />
                            {post.readTime}
                        </p>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-12 shadow-xl shadow-black/5">
                    {post.coverImage ? (
                        <img 
                            src={post.coverImage} 
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        <>
                            <div className="absolute inset-0 opacity-20">
                                <div className="absolute inset-0" style={{
                                    backgroundImage: `radial-gradient(circle at 30% 40%, rgba(13, 148, 136, 0.15) 0%, transparent 50%),
                                                      radial-gradient(circle at 70% 60%, rgba(235, 168, 50, 0.1) 0%, transparent 50%)`
                                }} />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-serif text-[200px] font-light text-black/5 select-none">
                                    {post.title.charAt(0)}
                                </span>
                            </div>
                        </>
                    )}
                </div>

                {/* Body */}
                <div className="prose prose-lg max-w-none">
                    {paragraphs.map((paragraph, idx) => {
                        const isHeading = paragraph.length < 80 && 
                            !paragraph.match(/[.!?]$/) && 
                            paragraph.split(' ').length < 12;

                        if (isHeading) {
                            return (
                                <h2 key={idx} className="font-serif text-2xl font-medium text-black mt-12 mb-6">
                                    {paragraph}
                                </h2>
                            );
                        }

                        if (paragraph.startsWith('First,') || paragraph.startsWith('Second,') || paragraph.startsWith('Third,')) {
                            return (
                                <p key={idx} className="text-lg text-black/70 leading-relaxed mb-4 pl-6 border-l-2 border-teal-200">
                                    <span className="font-medium text-black">{paragraph.split(',')[0]}:</span>
                                    {paragraph.split(',').slice(1).join(',')}
                                </p>
                            );
                        }

                        return (
                            <p key={idx} className="text-lg text-black/70 leading-relaxed mb-6">
                                {paragraph}
                            </p>
                        );
                    })}
                </div>

                {/* Tags */}
                <div className="mt-16 pt-8 border-t border-black/10">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {post.tags.map(tag => (
                            <span 
                                key={tag} 
                                className="text-xs px-4 py-2 bg-black/5 text-black/50 rounded-full hover:bg-black/10 hover:text-black/70 transition-colors cursor-pointer"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Stats & Share */}
                {post.stats && (
                    <div className="mt-12 flex items-center justify-center gap-8">
                        <div className="flex items-center gap-6 text-sm text-black/40">
                            <span className="flex items-center gap-2">
                                <Eye size={16} />
                                {post.stats.views.toLocaleString()} views
                            </span>
                            <span className="flex items-center gap-2">
                                <Share2 size={16} />
                                {post.stats.shares} shares
                            </span>
                        </div>
                    </div>
                )}

                {/* Source CTA */}
                {post.relatedQuestId && (
                    <div className="mt-12 p-8 bg-gradient-to-br from-teal-50/80 to-white rounded-2xl border border-teal-100 text-center">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-600 mb-3">
                            Source Material
                        </p>
                        <p className="text-black/60 mb-4">
                            This article was derived from the quest:
                        </p>
                        <button
                            onClick={() => onNavigateToQuest(post.relatedQuestId)}
                            className="inline-flex items-center gap-2 text-teal-700 font-medium hover:underline text-lg"
                        >
                            {post.relatedQuestTitle}
                            <ArrowUpRight size={18} />
                        </button>
                    </div>
                )}
            </article>
        </motion.div>
    );
};
