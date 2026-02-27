import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Copy01Icon,
    Tick02Icon,
    ArrowRight01Icon,
    Pdf01Icon,
    Doc01Icon,
    FileZipIcon,
    Image01Icon,
    GridTableIcon,
    File01Icon,
    ArrowUpRightIcon,
    Link01Icon,
} from '@hugeicons/core-free-icons';
import { MOCK_BRAND_ASSETS, CLIENT_CONFIG } from './StatsOverview';

const KEY_LINKS = [
    { label: 'Website', url: CLIENT_CONFIG.links.website },
    { label: 'Press Kit', url: CLIENT_CONFIG.links.pressKit },
    { label: 'Brand Guidelines', url: CLIENT_CONFIG.links.brandGuidelines },
];

interface BrandAssetsOverviewProps {
    onViewFullAssets?: () => void;
}

export const BrandAssetsOverview: React.FC<BrandAssetsOverviewProps> = ({ onViewFullAssets }) => {
    const [copiedNarrative, setCopiedNarrative] = useState(false);

    const handleCopyNarrative = () => {
        navigator.clipboard.writeText(MOCK_BRAND_ASSETS.narrative);
        setCopiedNarrative(true);
        setTimeout(() => setCopiedNarrative(false), 2000);
    };

    const getDocIcon = (type: string) => {
        switch (type) {
            case 'pdf': return <HugeiconsIcon icon={Pdf01Icon} size={14} className="text-red-500" />;
            case 'doc': return <HugeiconsIcon icon={Doc01Icon} size={14} className="text-blue-500" />;
            case 'sheet': return <HugeiconsIcon icon={GridTableIcon} size={14} className="text-emerald-500" />;
            case 'zip': return <HugeiconsIcon icon={FileZipIcon} size={14} className="text-amber-500" />;
            case 'image': return <HugeiconsIcon icon={Image01Icon} size={14} className="text-purple-500" />;
            default: return <HugeiconsIcon icon={File01Icon} size={14} className="text-gray-500" />;
        }
    };

    // Get first 3 docs
    const topDocs = MOCK_BRAND_ASSETS.keyDocuments.slice(0, 3);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.03)] overflow-hidden group hover:shadow-[0_4px_16px_rgba(13,148,136,0.08)] hover:border-teal-200/50 transition-all duration-500"
        >
            {/* Header - No Icon */}
            <div className="px-5 py-4 border-b border-black/[0.04] flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-black">Brand Assets</h3>
                    <p className="text-[11px] text-black/40 mt-0.5">Core messaging & key documents</p>
                </div>
                {onViewFullAssets && (
                    <button 
                        onClick={onViewFullAssets}
                        className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
                    >
                        View All
                        <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
                    </button>
                )}
            </div>

            <div className="p-5">
                <div className="grid grid-cols-2 gap-6">
                    {/* Left: Core Narrative */}
                    <div className="space-y-3">
                        <span className="text-[11px] font-medium text-black/50 uppercase tracking-wide">Core Narrative</span>
                        <div className="relative">
                            <p className="text-[13px] text-black/70 leading-relaxed pr-8 line-clamp-4">
                                {MOCK_BRAND_ASSETS.narrative}
                            </p>
                            <button
                                onClick={handleCopyNarrative}
                                className="absolute top-0 right-0 p-1.5 rounded-lg bg-gray-50 hover:bg-teal-50 text-black/30 hover:text-teal-600 transition-all"
                                title="Copy to clipboard"
                            >
                                {copiedNarrative ? (
                                    <HugeiconsIcon icon={Tick02Icon} size={12} className="text-teal-600" />
                                ) : (
                                    <HugeiconsIcon icon={Copy01Icon} size={12} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Right: Key Documents & Links */}
                    <div className="space-y-4">
                        {/* Documents */}
                        <div className="space-y-2">
                            <span className="text-[11px] font-medium text-black/50 uppercase tracking-wide">Key Documents</span>
                            <div className="space-y-1">
                                {topDocs.map(doc => (
                                    <div 
                                        key={doc.id}
                                        className="flex items-center gap-2.5 p-2 rounded-lg bg-gray-50/50 border border-transparent hover:border-teal-100/50 hover:bg-teal-50/20 transition-all cursor-pointer group/doc"
                                    >
                                        <div className="w-6 h-6 rounded-md bg-white border border-black/[0.04] flex items-center justify-center shrink-0">
                                            {getDocIcon(doc.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[12px] font-medium text-black truncate group-hover/doc:text-teal-700 transition-colors">{doc.name}</p>
                                            <p className="text-[10px] text-black/40">{doc.type.toUpperCase()} • {doc.size}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-2 pt-3 border-t border-black/[0.04]">
                            <span className="text-[11px] font-medium text-black/50 uppercase tracking-wide">Quick Links</span>
                            <div className="flex flex-wrap gap-2">
                                {KEY_LINKS.map(link => (
                                    <a 
                                        key={link.label}
                                        href={`https://${link.url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-50 hover:bg-teal-50 border border-transparent hover:border-teal-100/50 transition-all group/link"
                                    >
                                        <HugeiconsIcon icon={Link01Icon} size={12} className="text-black/30 group-hover/link:text-teal-600" />
                                        <span className="text-[11px] font-medium text-black/70 group-hover/link:text-teal-700">{link.label}</span>
                                        <HugeiconsIcon icon={ArrowUpRightIcon} size={10} className="text-black/20 group-hover/link:text-teal-600" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
