import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Building03Icon,
    TargetIcon,
    UserMultipleIcon,
    File01Icon,
    PlusSignIcon,
    Copy01Icon,
    Tick02Icon,
    QuoteDownIcon,
    Link01Icon,
    ArrowUpRightIcon,
    Download04Icon,
    WorkIcon,
    Calendar03Icon,
    Location01Icon,
    StarsIcon,
    MessageMultiple01Icon,
    PencilEdit01Icon,
    Cancel01Icon,
    Pdf01Icon,
    Doc01Icon,
    FileZipIcon,
    Image01Icon,
    GridTableIcon,
} from '@hugeicons/core-free-icons';
import { EditableField } from '../ui/EditableField';
import { GridBackground } from '../ui/GridBackground';
import { MOCK_BRAND_ASSETS, CLIENT_QUOTES, CLIENT_MESSAGING, CLIENT_CONFIG, CLIENT_PERSONNEL } from './StatsOverview';

// Use centralized client data
const APPROVED_QUOTES = CLIENT_QUOTES;
const MESSAGING_VARIANTS = [
    { id: 'investor', label: 'Investor Pitch', text: CLIENT_MESSAGING.investor },
    { id: 'media', label: 'Media/Press', text: CLIENT_MESSAGING.media },
    { id: 'customer', label: 'Customer', text: CLIENT_MESSAGING.customer },
];
const { companyName, links } = CLIENT_CONFIG;

export const BrandAssetsView: React.FC = () => {
    const [assets, setAssets] = useState(MOCK_BRAND_ASSETS);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [showAllQuotes, setShowAllQuotes] = useState(false);
    const [activeVariant, setActiveVariant] = useState('investor');
    const [isEditingNarrative, setIsEditingNarrative] = useState(false);
    const [narrativeValue, setNarrativeValue] = useState(assets.narrative);

    const handleUpdateNarrative = (newNarrative: string) => {
        setAssets({ ...assets, narrative: newNarrative });
        setIsEditingNarrative(false);
    };

    const handleCancelNarrative = () => {
        setNarrativeValue(assets.narrative);
        setIsEditingNarrative(false);
    };

    const handleUpdateBusinessDetail = (key: keyof typeof assets.businessDetails, value: string) => {
        setAssets({
            ...assets,
            businessDetails: { ...assets.businessDetails, [key]: value }
        });
    };

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const displayedQuotes = showAllQuotes ? APPROVED_QUOTES : APPROVED_QUOTES.slice(0, 2);

    return (
        <div className="h-full overflow-y-auto bg-[#FAF9F6] relative">
            <GridBackground />
            
            <div className="max-w-[1200px] mx-auto p-8 pb-20 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-10"
                >
                    <div className="flex items-center gap-4">
                  
                        <div>
                            <h2 className="font-serif text-2xl font-medium text-black">Brand Assets</h2>
                            <p className="text-sm text-black/50">Core messaging, boilerplate text, and approved quotes for consistent PR.</p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-12 gap-6">
                    {/* Left Column */}
                    <div className="col-span-12 lg:col-span-7 space-y-6">
                        
                        {/* Quick Copy - Messaging Variants */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.05 }}
                            className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-teal-100/60 shadow-[0_2px_8px_rgba(13,148,136,0.06),0_8px_24px_rgba(13,148,136,0.04)] hover:shadow-[0_4px_16px_rgba(13,148,136,0.12),0_16px_48px_rgba(13,148,136,0.08)] hover:border-teal-200/80 transition-all duration-500 p-5 overflow-hidden"
                        >
                            {/* Subtle gradient accent */}
                           
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <HugeiconsIcon icon={StarsIcon} size={16} className="text-teal-600" />
                                    <h3 className="text-[13px] font-semibold text-black/80">Quick Copy</h3>
                                </div>
                                <div className="flex items-center gap-1 bg-white/80 rounded-lg p-0.5 border border-teal-100">
                                    {MESSAGING_VARIANTS.map(v => (
                                        <button
                                            key={v.id}
                                            onClick={() => setActiveVariant(v.id)}
                                            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
                                                activeVariant === v.id 
                                                    ? 'bg-teal-600 text-white' 
                                                    : 'text-black/50 hover:text-black'
                                            }`}
                                        >
                                            {v.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <AnimatePresence mode="wait">
                                {MESSAGING_VARIANTS.map(variant => (
                                    variant.id === activeVariant && (
                                        <motion.div
                                            key={variant.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="relative"
                                        >
                                            <p className="text-[14px] text-black/80 leading-relaxed pr-10">
                                                {variant.text}
                                            </p>
                                            <button
                                                onClick={() => handleCopy(variant.text, `variant-${variant.id}`)}
                                                className="absolute top-0 right-0 p-2 rounded-lg bg-white border border-teal-100 text-teal-600 hover:bg-teal-50 transition-all shadow-sm"
                                                title="Copy to clipboard"
                                            >
                                                {copiedId === `variant-${variant.id}` ? (
                                                    <HugeiconsIcon icon={Tick02Icon} size={14} />
                                                ) : (
                                                    <HugeiconsIcon icon={Copy01Icon} size={14} />
                                                )}
                                            </button>
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* Core Narrative with Edit Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.03),0_8px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),0_16px_48px_rgba(0,0,0,0.04)] hover:border-black/[0.1] transition-all duration-500 p-5 relative overflow-hidden"
                        >
                            {/* Corner accent */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <HugeiconsIcon icon={TargetIcon} size={16} className="text-black/40" />
                                    <h3 className="text-[13px] font-semibold text-black/70">Core Narrative</h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    {!isEditingNarrative && (
                                        <>
                                            <button 
                                                onClick={() => setIsEditingNarrative(true)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
                                            >
                                                <HugeiconsIcon icon={PencilEdit01Icon} size={12} />
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleCopy(assets.narrative, 'narrative')}
                                                className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-black/50 hover:text-black hover:bg-black/5 rounded-lg transition-colors"
                                                title="Copy"
                                            >
                                                {copiedId === 'narrative' ? (
                                                    <HugeiconsIcon icon={Tick02Icon} size={12} className="text-teal-600" />
                                                ) : (
                                                    <HugeiconsIcon icon={Copy01Icon} size={12} />
                                                )}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            
                            {isEditingNarrative ? (
                                <div className="space-y-3">
                                    <textarea
                                        value={narrativeValue}
                                        onChange={(e) => setNarrativeValue(e.target.value)}
                                        rows={4}
                                        className="text-[15px] w-full p-4 border border-black/10 rounded-xl outline-none focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/10 resize-none bg-gray-50/50 transition-all"
                                        autoFocus
                                    />
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleUpdateNarrative(narrativeValue)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                                        >
                                            <HugeiconsIcon icon={Tick02Icon} size={12} />
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancelNarrative}
                                            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-black/50 hover:text-black hover:bg-black/5 rounded-lg transition-colors"
                                        >
                                            <HugeiconsIcon icon={Cancel01Icon} size={12} />
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-[15px] text-black/80 leading-relaxed">
                                    {assets.narrative}
                                </p>
                            )}
                        </motion.div>

                        {/* Business Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.15 }}
                            className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.03),0_8px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),0_16px_48px_rgba(0,0,0,0.04)] hover:border-black/[0.1] transition-all duration-500 p-5"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <HugeiconsIcon icon={Building03Icon} size={16} className="text-black/40" />
                                <h3 className="text-[13px] font-semibold text-black/70">Business Details</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <DetailCard 
                                    icon={<HugeiconsIcon icon={TargetIcon} size={14} />} 
                                    label="Mission" 
                                    value={assets.businessDetails.mission} 
                                    onSave={(v) => handleUpdateBusinessDetail('mission', v)} 
                                />
                                <DetailCard 
                                    icon={<HugeiconsIcon icon={WorkIcon} size={14} />} 
                                    label="Vision" 
                                    value={assets.businessDetails.vision} 
                                    onSave={(v) => handleUpdateBusinessDetail('vision', v)} 
                                />
                                <DetailCard 
                                    icon={<HugeiconsIcon icon={Calendar03Icon} size={14} />} 
                                    label="Founded" 
                                    value={assets.businessDetails.founded} 
                                    onSave={(v) => handleUpdateBusinessDetail('founded', v)} 
                                />
                                <DetailCard 
                                    icon={<HugeiconsIcon icon={Location01Icon} size={14} />} 
                                    label="Headquarters" 
                                    value={assets.businessDetails.headquarters} 
                                    onSave={(v) => handleUpdateBusinessDetail('headquarters', v)} 
                                />
                            </div>
                        </motion.div>

                        {/* Approved Quotes */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.03),0_8px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),0_16px_48px_rgba(0,0,0,0.04)] hover:border-black/[0.1] transition-all duration-500 p-5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <HugeiconsIcon icon={QuoteDownIcon} size={16} className="text-black/40" />
                                    <h3 className="text-[13px] font-semibold text-black/70">Approved Quotes</h3>
                                    <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">{APPROVED_QUOTES.length}</span>
                                </div>
                                <button className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors">
                                    <HugeiconsIcon icon={PlusSignIcon} size={12} />
                                    Add Quote
                                </button>
                            </div>
                            
                            <div className="space-y-3">
                                {displayedQuotes.map((quote) => (
                                    <div 
                                        key={quote.id} 
                                        className="group p-4 rounded-xl bg-white/50 border border-black/[0.04] hover:border-teal-200/60 hover:bg-gradient-to-br hover:from-teal-50/30 hover:to-emerald-50/20 hover:shadow-[0_2px_8px_rgba(13,148,136,0.08)] transition-all duration-300 relative overflow-hidden"
                                    >
                                        {/* Subtle left accent */}
                                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 to-emerald-400 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center text-[10px] font-semibold shrink-0">
                                                {quote.speaker.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[14px] text-black/80 leading-relaxed mb-2 italic">
                                                    &ldquo;{quote.text}&rdquo;
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[12px] font-medium text-black">{quote.speaker}</span>
                                                        <span className="text-[10px] text-black/40">{quote.role}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={() => handleCopy(`"${quote.text}" — ${quote.speaker}, ${quote.role}`, `quote-${quote.id}`)}
                                                            className="p-1.5 rounded-md text-black/30 hover:text-teal-600 hover:bg-teal-100 transition-all"
                                                            title="Copy quote with attribution"
                                                        >
                                                            {copiedId === `quote-${quote.id}` ? (
                                                                <HugeiconsIcon icon={Tick02Icon} size={14} />
                                                            ) : (
                                                                <HugeiconsIcon icon={Copy01Icon} size={14} />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    {quote.tags.map(tag => (
                                                        <span key={tag} className="text-[9px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">{tag}</span>
                                                    ))}
                                                    <span className="text-[9px] text-black/30 flex items-center gap-1">
                                                        <HugeiconsIcon icon={MessageMultiple01Icon} size={10} />
                                                        Used {quote.usageCount} times
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {APPROVED_QUOTES.length > 2 && (
                                <button 
                                    onClick={() => setShowAllQuotes(!showAllQuotes)}
                                    className="w-full mt-3 py-2 text-[11px] font-medium text-black/40 hover:text-teal-600 transition-colors flex items-center justify-center gap-1"
                                >
                                    {showAllQuotes ? 'Show less' : `Show ${APPROVED_QUOTES.length - 2} more`}
                                </button>
                            )}
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="col-span-12 lg:col-span-5 space-y-6">
      

                        {/* Key Personnel */}
                        

                        {/* Key Documents */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.03),0_8px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),0_16px_48px_rgba(0,0,0,0.04)] hover:border-black/[0.1] transition-all duration-500 p-5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <HugeiconsIcon icon={File01Icon} size={16} className="text-black/40" />
                                    <h3 className="text-[13px] font-semibold text-black/70">Key Documents</h3>
                                </div>
                                <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors">
                                    <HugeiconsIcon icon={PlusSignIcon} size={12} />
                                    Upload
                                </button>
                            </div>
                            <div className="space-y-1">
                                {assets.keyDocuments.map((doc, idx) => (
                                    <motion.div
                                        key={doc.id}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.05 }}
                                    >
                                        <DocumentRow 
                                            doc={doc} 
                                            onCopy={() => handleCopy(doc.name, `doc-${doc.id}`)} 
                                            copied={copiedId === `doc-${doc.id}`} 
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.25 }}
                            className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.03),0_8px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),0_16px_48px_rgba(0,0,0,0.04)] hover:border-black/[0.1] transition-all duration-500 p-5"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <HugeiconsIcon icon={Link01Icon} size={16} className="text-black/40" />
                                <h3 className="text-[13px] font-semibold text-black/70">Quick Links</h3>
                            </div>
                            <div className="space-y-2">
                                <QuickLink label="Website" url={links.website} />
                                <QuickLink label="Press Kit" url={links.pressKit} />
                                <QuickLink label="Media Inquiries" url={links.mediaInquiries} isEmail />
                                <QuickLink label="Brand Guidelines" url={links.brandGuidelines} />
                            </div>
                        </motion.div>

                        {/* Key Clients */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.03),0_8px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),0_16px_48px_rgba(0,0,0,0.04)] hover:border-black/[0.1] transition-all duration-500 p-5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <HugeiconsIcon icon={WorkIcon} size={16} className="text-black/40" />
                                    <h3 className="text-[13px] font-semibold text-black/70">Key Clients</h3>
                                </div>
                                <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors">
                                    <HugeiconsIcon icon={PlusSignIcon} size={12} />
                                    Add
                                </button>
                            </div>
                            <div className="space-y-2">
                                {assets.clients.map(client => (
                                    <div 
                                        key={client.id} 
                                        className="p-3 rounded-xl bg-white/50 border border-black/[0.04] hover:border-teal-200/50 hover:bg-gradient-to-r hover:from-teal-50/20 hover:to-transparent hover:shadow-[0_2px_8px_rgba(13,148,136,0.06)] transition-all duration-300 group relative overflow-hidden"
                                    >
                                        {/* Hover glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-teal-100/0 via-teal-100/20 to-teal-100/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-sm font-medium text-black">{client.name}</p>
                                            <span className="text-[10px] text-black/40">{client.since}</span>
                                        </div>
                                        <p className="text-[12px] text-black/50">{client.description}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.15 }}
                            className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.03),0_8px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),0_16px_48px_rgba(0,0,0,0.04)] hover:border-black/[0.1] transition-all duration-500 p-5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <HugeiconsIcon icon={UserMultipleIcon} size={16} className="text-black/40" />
                                    <h3 className="text-[13px] font-semibold text-black/70">Spokespersons</h3>
                                </div>
                                <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors">
                                    <HugeiconsIcon icon={PlusSignIcon} size={12} />
                                    Add
                                </button>
                            </div>
                            <div className="space-y-3">
                                {assets.personnel.map((person) => (
                                    <div 
                                        key={person.id} 
                                        className="flex items-start gap-3 p-3 rounded-xl bg-white/50 border border-black/[0.04] hover:border-teal-200/50 hover:bg-gradient-to-r hover:from-teal-50/20 hover:to-transparent hover:shadow-[0_2px_8px_rgba(13,148,136,0.06)] transition-all duration-300 group relative overflow-hidden"
                                    >
                                        {/* Subtle hover line */}
                                        <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-teal-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center font-semibold text-sm shadow-sm shrink-0">
                                            {person.image}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-0.5">
                                                <p className="font-medium text-sm text-black">{person.name}</p>
                                                <span className="text-[10px] text-black/30">{person.role}</span>
                                            </div>
                                            <p className="text-[12px] text-black/50 line-clamp-2">{person.bio}</p>
                                        </div>
                                        <button 
                                            onClick={() => handleCopy(`${person.name}, ${person.role}: ${person.bio}`, `person-${person.id}`)}
                                            className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-black/5 rounded-lg text-black/30 hover:text-teal-600 transition-all shrink-0"
                                        >
                                            {copiedId === `person-${person.id}` ? (
                                                <HugeiconsIcon icon={Tick02Icon} size={14} />
                                            ) : (
                                                <HugeiconsIcon icon={Copy01Icon} size={14} />
                                            )}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Stat Card Component
const StatCard = ({ label, value }: { label: string; value: string }) => (
    <div className="group bg-white/80 backdrop-blur-sm rounded-xl border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(13,148,136,0.1)] hover:border-teal-200/50 hover:bg-gradient-to-br hover:from-teal-50/30 hover:to-emerald-50/20 transition-all duration-300 p-3 text-center relative overflow-hidden">
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <p className="text-xl font-serif font-medium text-black relative z-10">{value}</p>
        <p className="text-[10px] text-black/40 uppercase tracking-wide mt-0.5 relative z-10">{label}</p>
    </div>
);

// Detail Card Component
const DetailCard = ({ 
    icon, 
    label, 
    value, 
    onSave,
    className = ''
}: { 
    icon: React.ReactNode, 
    label: string, 
    value: string, 
    onSave: (v: string) => void,
    className?: string
}) => (
    <div className={`group p-3 rounded-xl bg-white/60 border border-black/[0.04] hover:border-teal-200/50 hover:bg-gradient-to-br hover:from-teal-50/30 hover:to-emerald-50/10 hover:shadow-[0_2px_8px_rgba(13,148,136,0.06)] transition-all duration-300 relative overflow-hidden ${className}`}>
        {/* Subtle corner accent on hover */}
        <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-teal-100/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="flex items-center gap-1.5 mb-2">
            <span className="text-black/30">{icon}</span>
            <span className="text-[10px] font-medium text-black/40 uppercase tracking-wide">{label}</span>
        </div>
        <div className="min-h-[24px]">
            <EditableField
                value={value}
                onSave={onSave}
                className="text-[13px] text-black/80 font-medium block"
                inputClassName="text-[13px] w-full p-2 border border-black/10 rounded-lg outline-none focus:border-teal-500/50 bg-gray-50/50 transition-all"
                multiline={false}
            />
        </div>
    </div>
);

// Document Row Component
const DocumentRow = ({ 
    doc, 
    onCopy,
    copied 
}: { 
    doc: { id: number; name: string; type: string; size: string; updated: string };
    onCopy: () => void;
    copied: boolean;
}) => {
    const getIcon = () => {
        switch (doc.type) {
            case 'pdf': return <HugeiconsIcon icon={Pdf01Icon} size={16} className="text-red-500" />;
            case 'doc': return <HugeiconsIcon icon={Doc01Icon} size={16} className="text-blue-500" />;
            case 'sheet': return <HugeiconsIcon icon={GridTableIcon} size={16} className="text-emerald-500" />;
            case 'zip': return <HugeiconsIcon icon={FileZipIcon} size={16} className="text-amber-500" />;
            case 'image': return <HugeiconsIcon icon={Image01Icon} size={16} className="text-purple-500" />;
            default: return <HugeiconsIcon icon={File01Icon} size={16} className="text-gray-500" />;
        }
    };

    return (
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/40 border border-transparent hover:border-teal-200/40 hover:bg-gradient-to-r hover:from-teal-50/20 hover:to-transparent hover:shadow-[0_2px_8px_rgba(13,148,136,0.05)] group transition-all duration-300 cursor-pointer relative overflow-hidden">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 border border-black/[0.04] flex items-center justify-center shrink-0">
                    {getIcon()}
                </div>
                <div>
                    <p className="text-[13px] font-medium text-black group-hover:text-teal-600 transition-colors">{doc.name}</p>
                    <p className="text-[10px] text-black/40">{doc.size} • {doc.updated}</p>
                </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 relative z-10">
                <button 
                    onClick={onCopy}
                    className="p-1.5 hover:bg-teal-50 rounded-lg text-black/30 hover:text-teal-600 transition-all"
                    title="Copy filename"
                >
                    {copied ? <HugeiconsIcon icon={Tick02Icon} size={14} /> : <HugeiconsIcon icon={Copy01Icon} size={14} />}
                </button>
                <button className="p-1.5 hover:bg-teal-50 rounded-lg text-black/30 hover:text-teal-600 transition-all">
                    <HugeiconsIcon icon={Download04Icon} size={14} />
                </button>
            </div>
        </div>
    );
};

// Quick Link Component
const QuickLink = ({ label, url, isEmail }: { label: string; url: string; isEmail?: boolean }) => (
    <a 
        href={isEmail ? `mailto:${url}` : `https://${url}`}
        className="flex items-center justify-between p-2.5 rounded-xl bg-white/40 border border-black/[0.04] hover:border-teal-200/60 hover:bg-gradient-to-r hover:from-teal-50/30 hover:to-emerald-50/10 hover:shadow-[0_2px_8px_rgba(13,148,136,0.08)] transition-all duration-300 group relative overflow-hidden"
    >
        {/* Shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        <div className="relative z-10">
            <p className="text-[12px] font-medium text-black group-hover:text-teal-700 transition-colors">{label}</p>
            <p className="text-[11px] text-black/40">{url}</p>
        </div>
        <div className="w-6 h-6 rounded-lg bg-transparent group-hover:bg-teal-50 flex items-center justify-center transition-all relative z-10">
            <HugeiconsIcon icon={ArrowUpRightIcon} size={12} className="text-black/20 group-hover:text-teal-600 transition-colors" />
        </div>
    </a>
);
