import React, { useState, useEffect } from 'react';
import { 
    Plus, FilePlus, ChevronRight
} from 'lucide-react';
import type { ProductOutput, OutputType } from './ProductCreator';
export type { ProductOutput, OutputType };

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

const OUTPUT_TYPES: { id: OutputType; label: string }[] = [
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

    return (
        <div className="p-4 border border-black/[0.06] rounded-xl bg-white">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <span className="text-[11px] font-semibold text-black/40 uppercase tracking-wide">
                        Product
                    </span>
                    <button 
                        onClick={onCreateNew}
                        className="flex items-center gap-1 text-[10px] text-black bg-black/5 hover:bg-black/10 px-2 py-1 rounded-md transition-colors border border-black/10"
                    >
                        <Plus size={12} />
                        New
                    </button>
                </div>
                <span className="text-[11px] text-black/30">{products.length}</span>
            </div>
            
            {products.length === 0 ? (
                <button 
                    onClick={onCreateNew}
                    className="w-full flex items-center justify-center gap-2 py-4 border border-dashed border-black/20 rounded-xl text-black/40 hover:text-black hover:border-black/40 hover:bg-black/[0.02] transition-all"
                >
                    <Plus size={16} />
                    <span className="text-[13px]">Create content</span>
                </button>
            ) : (
                <div className="space-y-2">
                    {products.map(product => {
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
    );
};
