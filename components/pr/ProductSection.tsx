import React, { useState, useEffect } from 'react';
import {
    Plus, ChevronRight, ExternalLink, Eye, Share2, Clock, Bookmark
} from 'lucide-react';
export type OutputType = 'x-post' | 'linkedin-post' | 'instagram-post' | 'press-release' | 'blog-post' | 'website-copy' | 'investor-doc';

export interface ProductOutput {
    id: number;
    title: string;
    type: OutputType;
    status: 'draft' | 'editing' | 'ready' | 'published';
    wordCount: number;
    updatedAt: string;
    // Extended fields for blog posts / knowledge base articles
    subtitle?: string;
    excerpt?: string;
    author?: {
        name: string;
        role: string;
        initials: string;
    };
    publishedAt?: string;
    readTime?: string;
    category?: string;
    tags?: string[];
    featured?: boolean;
    content?: string;
    stats?: {
        views: number;
        shares: number;
    };
}

interface WorkingDoc {
    id: number;
    title: string;
    type: 'doc' | 'sheet' | 'slide';
    lastEdited: string;
}

interface AttachedDoc {
    id: number;
    name: string;
    fileType: 'doc' | 'sheet' | 'slide' | 'pdf' | 'image' | 'link';
    size?: string;
    source?: string;
    uploadedAt: string;
    uploadedBy: string;
}

interface ProductSectionProps {
    questId: number;
    workingDocs: WorkingDoc[];
    attachedDocs: AttachedDoc[];
    onOpenProduct: (product: ProductOutput) => void;
    onCreateNew: () => void;
}

const OUTPUT_TYPES: { id: OutputType; label: string; icon?: string }[] = [
    { id: 'x-post', label: 'X Post' },
    { id: 'linkedin-post', label: 'LinkedIn Post' },
    { id: 'instagram-post', label: 'Instagram Post' },
    { id: 'press-release', label: 'Press Release' },
    { id: 'blog-post', label: 'Blog Post' },
    { id: 'website-copy', label: 'Website Copy' },
    { id: 'investor-doc', label: 'Investor Document' },
];

// Helper to get storage key
const getProductsStorageKey = (questId: number) => `quest_products_${questId}`;

export const ProductSection: React.FC<ProductSectionProps> = ({ questId, onOpenProduct, onCreateNew }) => {
    const [products, setProducts] = useState<ProductOutput[]>([]);

    // Load products from sessionStorage
    useEffect(() => {
        const storageKey = getProductsStorageKey(questId);
        const stored = sessionStorage.getItem(storageKey);
        if (stored) {
            try {
                setProducts(JSON.parse(stored));
            } catch {
                setProducts([]);
            }
        }
    }, [questId]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'ready': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'editing': return 'bg-amber-50 text-amber-700 border-amber-200';
            default: return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const blogPosts = products.filter(p => p.type === 'blog-post');
    const otherProducts = products.filter(p => p.type !== 'blog-post');

    return (
        <div className="space-y-4">
            {/* Published Content Section - Blog Posts */}
            {blogPosts.length > 0 && (
                <div className="p-4 border border-black/[0.06] rounded-xl bg-white">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <span className="text-[11px] font-semibold text-black/40 uppercase tracking-wide">
                                Published Content
                            </span>
                            <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                                {blogPosts.length}
                            </span>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        {blogPosts.map(post => (
                            <div
                                key={post.id}
                                onClick={() => onOpenProduct(post)}
                                className="group cursor-pointer p-4 bg-gradient-to-br from-gray-50/50 to-white rounded-xl border border-black/[0.06] hover:border-teal-200 hover:shadow-sm transition-all"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-medium px-2 py-0.5 bg-black/5 text-black/60 rounded">
                                            {post.category || 'Blog Post'}
                                        </span>
                                        {post.featured && (
                                            <span className="text-[10px] font-medium px-2 py-0.5 bg-amber-50 text-amber-700 rounded flex items-center gap-1">
                                                <Bookmark size={9} />
                                                Featured
                                            </span>
                                        )}
                                        <span className={`text-[9px] px-2 py-0.5 rounded-full border ${getStatusColor(post.status)}`}>
                                            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                                        </span>
                                    </div>
                                    <ExternalLink size={14} className="text-black/20 group-hover:text-teal-600 transition-colors" />
                                </div>
                                
                                <h3 className="font-serif text-[16px] font-medium text-black mb-1 group-hover:text-teal-700 transition-colors">
                                    {post.title}
                                </h3>
                                
                                {post.subtitle && (
                                    <p className="text-[13px] text-black/50 mb-2 italic">
                                        {post.subtitle}
                                    </p>
                                )}
                                
                                <p className="text-[12px] text-black/40 leading-relaxed line-clamp-2 mb-3">
                                    {post.excerpt}
                                </p>
                                
                                <div className="flex items-center justify-between pt-3 border-t border-black/[0.04]">
                                    <div className="flex items-center gap-2">
                                        {post.author && (
                                            <>
                                                <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[9px]">
                                                    {post.author.initials}
                                                </div>
                                                <span className="text-[11px] text-black/50">{post.author.name}</span>
                                            </>
                                        )}
                                        {post.publishedAt && (
                                            <>
                                                <span className="text-black/20">·</span>
                                                <span className="text-[11px] text-black/40">{formatDate(post.publishedAt)}</span>
                                            </>
                                        )}
                                        {post.readTime && (
                                            <>
                                                <span className="text-black/20">·</span>
                                                <span className="text-[11px] text-black/40 flex items-center gap-1">
                                                    <Clock size={10} />
                                                    {post.readTime}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    
                                    {post.stats && (
                                        <div className="flex items-center gap-3 text-[11px] text-black/40">
                                            <span className="flex items-center gap-1">
                                                <Eye size={11} />
                                                {post.stats.views.toLocaleString()}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Share2 size={11} />
                                                {post.stats.shares}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Other Products */}
            <div className="p-4 border border-black/[0.06] rounded-xl bg-white">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <span className="text-[11px] font-semibold text-black/40 uppercase tracking-wide">
                            Products
                        </span>
                        <button
                            onClick={onCreateNew}
                            className="flex items-center gap-1 text-[10px] text-black bg-black/5 hover:bg-black/10 px-2 py-1 rounded-md transition-colors border border-black/10"
                        >
                            <Plus size={12} />
                            New
                        </button>
                    </div>
                    <span className="text-[11px] text-black/30">{otherProducts.length}</span>
                </div>

                {otherProducts.length === 0 ? (
                    <button
                        onClick={onCreateNew}
                        className="w-full flex items-center justify-center gap-2 py-4 border border-dashed border-black/20 rounded-xl text-black/40 hover:text-black hover:border-black/40 hover:bg-black/[0.02] transition-all"
                    >
                        <Plus size={16} />
                        <span className="text-[13px]">Create content</span>
                    </button>
                ) : (
                    <div className="space-y-2">
                        {otherProducts.map(product => {
                            const outputType = OUTPUT_TYPES.find(t => t.id === product.type);
                            return (
                                <button
                                    key={product.id}
                                    onClick={() => onOpenProduct(product)}
                                    className="w-full flex items-center gap-3 p-3 bg-white rounded-xl border border-black/[0.06] hover:border-black/20 hover:shadow-sm transition-all text-left group"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-medium truncate group-hover:text-black transition-colors">
                                            {product.title}
                                        </p>
                                        <p className="text-[11px] text-black/40">
                                            {outputType?.label} • {product.wordCount} words • {new Date(product.updatedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className={`text-[9px] px-2 py-0.5 rounded-full border ${getStatusColor(product.status)}`}>
                                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                                    </span>
                                    <ChevronRight size={14} className="text-black/20 group-hover:text-black/40" />
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
