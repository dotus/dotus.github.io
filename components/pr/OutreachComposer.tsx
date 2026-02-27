import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    ArrowLeft01Icon,
    ArrowRight01Icon,
    ArrowRight02Icon,
    CheckmarkSquare03Icon,
    CheckmarkCircle02Icon,
    Tick02Icon,
    Clock01Icon,
    File01Icon,
    File02Icon,
    Loading03Icon,
    TextAlignLeftIcon,
    Search01Icon,
    Building03Icon,
    Attachment01Icon,
    Link01Icon,
    UserIcon,
    Calendar01Icon,
    NewOfficeIcon,
    Tag01Icon,
    TextFontIcon,
    StarIcon,
} from '@hugeicons/core-free-icons';
import { Quest, OutreachCampaign, JournalistContact, MOCK_JOURNALISTS, getOutreachStorageKey, getRecommendedJournalists, MOCK_BRAND_ASSETS, PITCH_TEMPLATES, MOCK_QUEST_DOCS } from './StatsOverview';


interface OutreachComposerProps {
    quest: Quest;
    onClose: () => void;
    onCampaignSent?: (campaign: OutreachCampaign) => void;
}



// Template Variable Button Component
interface TemplateVarProps {
    label: string;
    code: string;
    icon: any;
    onInsert: () => void;
}

const TemplateVar: React.FC<TemplateVarProps> = ({ label, code, icon, onInsert }) => (
    <button
        onClick={onInsert}
        className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-100 hover:bg-teal-50 border border-transparent hover:border-teal-200 transition-all group"
        title={`Insert ${label}`}
    >
        <HugeiconsIcon icon={icon} size={10} className="text-black/30 group-hover:text-teal-600" />
        <span className="text-[10px] font-medium text-black/60 group-hover:text-teal-700">{code}</span>
    </button>
);

// Step 2 Component: Compose Pitch with Brand Assets & Quest Docs
interface Step2Props {
    quest: Quest;
    pitchSubject: string;
    setPitchSubject: (s: string) => void;
    pitchBody: string;
    setPitchBody: (s: string) => void;
    onCopy: () => void;
    copied: boolean;
}

const Step2ComposePitch: React.FC<Step2Props> = ({
    quest,
    pitchSubject,
    setPitchSubject,
    pitchBody,
    setPitchBody,
    onCopy,
    copied
}) => {
    const [showNarrative, setShowNarrative] = useState(false);
    const [attachedDocs, setAttachedDocs] = useState<number[]>([]);
    const [copiedNarrative, setCopiedNarrative] = useState(false);

    // Quest documents from mock data
    const questDocs = MOCK_QUEST_DOCS;

    const handleCopyNarrative = () => {
        navigator.clipboard.writeText(MOCK_BRAND_ASSETS.narrative);
        setCopiedNarrative(true);
        setTimeout(() => setCopiedNarrative(false), 2000);
    };

    const toggleDoc = (id: number) => {
        setAttachedDocs(prev => 
            prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
        );
    };

    const insertNarrative = () => {
        setPitchBody(prev => prev + '\n\n' + MOCK_BRAND_ASSETS.narrative);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-5"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl">Compose Your Pitch</h2>
                <button
                    onClick={onCopy}
                    className="flex items-center gap-2 text-[13px] text-black/50 hover:text-black px-3 py-2 rounded-lg hover:bg-black/[0.03] transition-colors"
                >
                    {copied ? <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} /> : <HugeiconsIcon icon={File02Icon} size={16} />}
                    {copied ? 'Copied' : 'Copy Pitch'}
                </button>
            </div>

            <div className="grid grid-cols-12 gap-5">
                {/* Left: Main Editor */}
                <div className="col-span-8 space-y-5">
                    {/* Subject */}
                    <div className="bg-white rounded-xl border border-black/10 p-5">
                        <label className="block text-[11px] font-medium text-black/50 uppercase tracking-wide mb-3">
                            Subject Line
                        </label>
                        <input
                            type="text"
                            value={pitchSubject}
                            onChange={(e) => setPitchSubject(e.target.value)}
                            className="w-full px-4 py-3 text-[15px] border border-black/10 rounded-lg focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/10"
                            placeholder="Enter subject line..."
                        />
                    </div>

                    {/* Body */}
                    <div className="bg-white rounded-xl border border-black/10 p-5">
                        <label className="block text-[11px] font-medium text-black/50 uppercase tracking-wide mb-3">
                            Pitch Content
                        </label>
                        <textarea
                            value={pitchBody}
                            onChange={(e) => setPitchBody(e.target.value)}
                            rows={16}
                            className="w-full px-4 py-3 text-[14px] border border-black/10 rounded-lg focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/10 resize-none font-mono leading-relaxed"
                            placeholder="Write your pitch..."
                        />
                        {/* Template Variables */}
                        <div className="mt-3 pt-3 border-t border-black/[0.06] space-y-2">
                            <p className="text-[11px] text-black/40">Click to insert variables:</p>
                            <div className="flex flex-wrap gap-1.5">
                                <TemplateVar label="Name" code="{{name}}" icon={UserIcon} onInsert={() => setPitchBody(prev => prev + '{{name}}')} />
                                <TemplateVar label="Outlet" code="{{outlet}}" icon={NewOfficeIcon} onInsert={() => setPitchBody(prev => prev + '{{outlet}}')} />
                                <TemplateVar label="First Name" code="{{firstName}}" icon={UserIcon} onInsert={() => setPitchBody(prev => prev + '{{firstName}}')} />
                                <TemplateVar label="Quest Title" code="{{title}}" icon={TextFontIcon} onInsert={() => setPitchBody(prev => prev + '{{title}}')} />
                                <TemplateVar label="Embargo Date" code="{{embargoDate}}" icon={Calendar01Icon} onInsert={() => setPitchBody(prev => prev + '{{embargoDate}}')} />
                                <TemplateVar label="Founder" code="{{founder}}" icon={UserIcon} onInsert={() => setPitchBody(prev => prev + '{{founder}}')} />
                                <TemplateVar label="Topic" code="{{topic}}" icon={Tag01Icon} onInsert={() => setPitchBody(prev => prev + '{{topic}}')} />
                            </div>
                        </div>
                        <div className="flex items-center justify-end mt-2 text-[12px] text-black/40">
                            <span>{pitchBody.length} characters</span>
                        </div>
                    </div>
                </div>

                {/* Right: Reference Panel */}
                <div className="col-span-4 space-y-4">
                    {/* Brand Narrative Card */}
                    <div className="bg-gradient-to-br from-teal-50/50 to-emerald-50/30 rounded-xl border border-teal-100/60 p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center">
                                    <HugeiconsIcon icon={Building03Icon} size={14} className="text-teal-600" />
                                </div>
                                <span className="text-[12px] font-semibold text-black/80">Brand Narrative</span>
                            </div>
                            <button
                                onClick={() => setShowNarrative(!showNarrative)}
                                className="text-[11px] text-teal-600 hover:text-teal-700 font-medium"
                            >
                                {showNarrative ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        
                        {showNarrative && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="space-y-3"
                            >
                                <p className="text-[12px] text-black/70 leading-relaxed">
                                    {MOCK_BRAND_ASSETS.narrative}
                                </p>
                                <div className="flex items-center gap-2 pt-2 border-t border-teal-100/50">
                                    <button
                                        onClick={handleCopyNarrative}
                                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-teal-700 bg-white/80 hover:bg-white rounded-lg transition-colors"
                                    >
                                        {copiedNarrative ? <HugeiconsIcon icon={CheckmarkCircle02Icon} size={12} /> : <HugeiconsIcon icon={File02Icon} size={12} />}
                                        {copiedNarrative ? 'Copied' : 'Copy'}
                                    </button>
                                    <button
                                        onClick={insertNarrative}
                                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                                    >
                                        Insert
                                    </button>
                                </div>
                            </motion.div>
                        )}
                        
                        {!showNarrative && (
                            <p className="text-[12px] text-black/50 line-clamp-2">
                                {MOCK_BRAND_ASSETS.narrative}
                            </p>
                        )}
                    </div>

                    {/* Quest Documents */}
                    <div className="bg-white rounded-xl border border-black/10 p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                                    <HugeiconsIcon icon={Attachment01Icon} size={14} className="text-gray-600" />
                                </div>
                                <span className="text-[12px] font-semibold text-black/80">Quest Documents</span>
                            </div>
                            {attachedDocs.length > 0 && (
                                <span className="text-[10px] font-medium text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                                    {attachedDocs.length} attached
                                </span>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            {questDocs.map(doc => {
                                const isAttached = attachedDocs.includes(doc.id);
                                return (
                                    <button
                                        key={doc.id}
                                        onClick={() => toggleDoc(doc.id)}
                                        className={`
                                            w-full flex items-center gap-2.5 p-2.5 rounded-lg text-left transition-all
                                            ${isAttached 
                                                ? 'bg-teal-50/50 border border-teal-100' 
                                                : 'bg-gray-50/50 border border-transparent hover:border-black/5 hover:bg-gray-50'
                                            }
                                        `}
                                    >
                                        <div className="w-4 flex items-center justify-center shrink-0">
                                            {isAttached && <HugeiconsIcon icon={Tick02Icon} size={14} className="text-teal-600" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-[12px] font-medium truncate ${isAttached ? 'text-teal-700' : 'text-black/70'}`}>
                                                {doc.name}
                                            </p>
                                            <p className="text-[10px] text-black/40">{doc.size}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {attachedDocs.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-black/[0.04]">
                                <p className="text-[11px] text-black/50">
                                    These documents will be attached to your outreach emails
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Quick Tips */}
                    <div className="bg-amber-50/50 rounded-xl border border-amber-100/60 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-[10px] font-bold">
                                !
                            </div>
                            <span className="text-[11px] font-semibold text-amber-800">Pro Tip</span>
                        </div>
                        <p className="text-[11px] text-amber-700/80 leading-relaxed">
                            Keep your pitch under 200 words. Journalists receive hundreds of emails daily — be concise and lead with the news.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Step 3 Component: Select Journalists
interface Step3Props {
    quest: Quest;
    selectedJournalists: JournalistContact[];
    onToggleJournalist: (journalist: JournalistContact) => void;
    onSendCampaign: () => void;
    isSending: boolean;
}

const ContactRow: React.FC<{ contact: JournalistContact, selected: boolean, onToggle: (j: JournalistContact) => void, isRecommended: boolean }> = ({ contact, selected, onToggle, isRecommended }) => (
    <button
        onClick={() => onToggle(contact)}
        className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all group relative overflow-hidden
            ${selected 
                ? 'bg-teal-50 border-teal-200 shadow-sm ring-1 ring-teal-500/10'
                : isRecommended
                    ? 'bg-[#EBA832]/[0.04] border-[#EBA832]/30 hover:bg-[#EBA832]/[0.08] hover:border-[#EBA832]/50 hover:shadow-sm'
                    : 'bg-white border-black/[0.06] hover:border-black/20 hover:shadow-sm'
            }
        `}
    >
        <div className="w-5 flex justify-center flex-shrink-0 z-10">
            {selected ? (
                <HugeiconsIcon icon={CheckmarkSquare03Icon} size={18} className="text-teal-600" />
            ) : (
                <div className={`w-4 h-4 rounded border-2 transition-colors ${isRecommended ? 'border-[#EBA832]/40 group-hover:border-[#EBA832]/60' : 'border-black/20 group-hover:border-black/40'}`} />
            )}
        </div>
        <div className="flex-1 min-w-0 z-10">
            <div className="flex items-center gap-1.5">
                <span className={`text-[14px] font-medium truncate ${selected ? 'text-teal-900' : 'text-black'}`}>
                    {contact.name}
                </span>
                {isRecommended && (
                    <div className="flex items-center" title="Recommended Match">
                        <HugeiconsIcon icon={StarIcon} size={12} className={selected ? 'text-teal-500' : 'text-[#EBA832]'} />
                    </div>
                )}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-black/50 mt-0.5">
                <span className={`font-medium ${selected ? 'text-teal-700' : isRecommended ? 'text-[#EBA832]/90' : 'text-black/60'}`}>
                    {contact.outlet}
                </span>
                <span className={`w-1 h-1 rounded-full ${selected ? 'bg-teal-200' : isRecommended ? 'bg-[#EBA832]/30' : 'bg-black/20'}`} />
                <span className={`truncate ${selected ? 'text-teal-600/80' : ''}`}>{contact.focus}</span>
            </div>
        </div>
    </button>
);

const Step3SelectJournalists: React.FC<Step3Props> = ({
    quest,
    selectedJournalists,
    onToggleJournalist,
    onSendCampaign,
    isSending
}) => {
    const [activeTab, setActiveTab] = useState<'journalist' | 'influencer'>('journalist');
    const [searchQuery, setSearchQuery] = useState('');
    
    // Filter base lists by active tab
    const allOfActiveType = MOCK_JOURNALISTS.filter(j => (j.category || 'journalist') === activeTab);
    const recommendedAll = getRecommendedJournalists(quest);
    const recommendedOfActiveType = recommendedAll.filter(j => (j.category || 'journalist') === activeTab).slice(0, 4);
    
    // Get additional
    const recommendedIds = new Set(recommendedOfActiveType.map(j => j.id));
    const additionalOfActiveType = allOfActiveType.filter(j => !recommendedIds.has(j.id));
    
    // Apply search query
    const searchFilter = (j: JournalistContact) => 
        j.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.outlet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.focus.toLowerCase().includes(searchQuery.toLowerCase());

    const filteredRecommended = searchQuery ? recommendedOfActiveType.filter(searchFilter) : recommendedOfActiveType;
    const filteredAdditional = searchQuery ? additionalOfActiveType.filter(searchFilter) : additionalOfActiveType;

    const isSelected = (journalist: JournalistContact) => 
        selectedJournalists.some(j => j.id === journalist.id);

    const selectAllRecommended = () => {
        filteredRecommended.forEach(j => {
            if (!isSelected(j)) onToggleJournalist(j);
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-serif text-2xl">Select Contacts</h2>
                    <p className="text-[13px] text-black/50 mt-1">
                        {selectedJournalists.length > 0 ? (
                            <span className="text-black font-medium">{selectedJournalists.length} selected</span>
                        ) : (
                            'Choose who to pitch this story to'
                        )}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {selectedJournalists.length > 0 && (
                        <button
                            onClick={() => selectedJournalists.forEach(j => onToggleJournalist(j))}
                            className="text-[12px] text-black/40 hover:text-black transition-colors"
                        >
                            Clear all
                        </button>
                    )}
                    <button
                        onClick={onSendCampaign}
                        disabled={isSending || selectedJournalists.length === 0}
                        className="flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg text-[13px] font-medium hover:bg-teal-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {isSending ? (
                            <>
                                <HugeiconsIcon icon={Loading03Icon} size={16} className="animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
                                Send
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="max-w-3xl mx-auto">
                {/* Tabs & Search Unified Header */}
                <div className="bg-white rounded-xl border border-black/10 p-2 mb-6 flex items-center justify-between shadow-sm">
                    <div className="flex bg-gray-50 p-1 rounded-lg">
                        <button 
                            onClick={() => setActiveTab('journalist')}
                            className={`px-5 py-1.5 text-[13px] font-medium rounded-md transition-all ${activeTab === 'journalist' ? 'bg-white text-teal-700 shadow-sm border border-black/[0.04]' : 'text-black/50 hover:text-black/70'}`}
                        >
                            Journalists
                        </button>
                        <button 
                            onClick={() => setActiveTab('influencer')}
                            className={`px-5 py-1.5 text-[13px] font-medium rounded-md transition-all ${activeTab === 'influencer' ? 'bg-white text-teal-700 shadow-sm border border-black/[0.04]' : 'text-black/50 hover:text-black/70'}`}
                        >
                            Influencers
                        </button>
                    </div>
                    
                    <div className="relative w-64 mr-1">
                        <HugeiconsIcon 
                            icon={Search01Icon} 
                            size={16} 
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30" 
                        />
                        <input
                            type="text"
                            placeholder={`Search ${activeTab}s...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border-transparent rounded-lg text-[13px] placeholder:text-black/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black/10 transition-all"
                        />
                    </div>
                </div>

                {/* Selected Pills */}
                {selectedJournalists.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6 p-4 bg-teal-50/50 rounded-xl border border-teal-100">
                        {selectedJournalists.map((journalist) => (
                            <span 
                                key={journalist.id}
                                className="inline-flex items-center gap-1.5 text-[12px] bg-white border border-teal-200 text-teal-800 pl-2.5 pr-1.5 py-1 rounded-md shadow-sm"
                            >
                                {journalist.name}
                                <span className="text-teal-600/50 text-[10px]">({journalist.category || 'journalist'})</span>
                                <button 
                                    onClick={() => onToggleJournalist(journalist)}
                                    className="hover:bg-teal-100 rounded w-4 h-4 flex items-center justify-center transition-colors text-teal-600 hover:text-teal-900 ml-1"
                                >
                                    &times;
                                </button>
                            </span>
                        ))}
                    </div>
                )}

                <div className="space-y-6">
                    {/* Recommended Section */}
                    {filteredRecommended.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#EBA832]" />
                                    <h3 className="text-[13px] font-semibold text-[#EBA832] uppercase tracking-wide">Recommended for you</h3>
                                </div>
                                <button
                                    onClick={selectAllRecommended}
                                    className="text-[11px] font-medium text-black/40 hover:text-black transition-colors bg-white border border-black/10 px-2 py-1 rounded"
                                >
                                    Select All
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {filteredRecommended.map((contact) => (
                                    <ContactRow 
                                        key={contact.id} 
                                        contact={contact} 
                                        selected={isSelected(contact)} 
                                        onToggle={onToggleJournalist}
                                        isRecommended={true}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Additional Section */}
                    <div>
                        {filteredRecommended.length > 0 && (
                            <h3 className="text-[13px] font-semibold text-black/50 uppercase tracking-wide mb-3 mt-2">More {activeTab === 'journalist' ? 'Journalists' : 'Influencers'}</h3>
                        )}

                        <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 pb-2">
                            {filteredAdditional.length === 0 ? (
                                <div className="col-span-2 text-center py-10 bg-white rounded-xl border border-black/[0.06]">
                                    <p className="text-[13px] text-black/40">No {activeTab}s found matching "{searchQuery}"</p>
                                </div>
                            ) : (
                                filteredAdditional.map((contact) => (
                                    <ContactRow 
                                        key={contact.id} 
                                        contact={contact} 
                                        selected={isSelected(contact)} 
                                        onToggle={onToggleJournalist}
                                        isRecommended={false}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const OutreachComposer: React.FC<OutreachComposerProps> = ({ 
    quest, 
    onClose,
    onCampaignSent
}) => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedTemplate, setSelectedTemplate] = useState<'exclusive' | 'embargo' | 'followup'>('embargo');
    const [pitchSubject, setPitchSubject] = useState('');
    const [pitchBody, setPitchBody] = useState('');
    const [selectedJournalists, setSelectedJournalists] = useState<JournalistContact[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [copied, setCopied] = useState(false);

    // Initialize pitch content when template changes
    useEffect(() => {
        const template = PITCH_TEMPLATES[selectedTemplate];
        const subject = template.subject.replace('{{title}}', quest.title);
        const body = template.body
            .replace(/{{title}}/g, quest.title)
            .replace('{{synopsis}}', quest.synopsis)
            .replace('{{topic}}', quest.tags[0] || 'technology')
            .replace('{{founder}}', quest.author)
            .replace('{{embargoDate}}', quest.deadline?.split(',')[0] || 'TBD')
            .replace('{{embargoTime}}', quest.deadline?.split(',')[1]?.trim() || '9:00 AM')
            .replace('{{sender}}', quest.author);
        setPitchSubject(subject);
        setPitchBody(body);
    }, [selectedTemplate, quest]);

    const handleSendCampaign = () => {
        setIsSending(true);
        
        setTimeout(() => {
            const newCampaign: OutreachCampaign = {
                id: `campaign_${Date.now()}`,
                status: 'sent',
                sentAt: new Date().toISOString(),
                sentBy: quest.author,
                journalists: selectedJournalists.length > 0 ? selectedJournalists : MOCK_JOURNALISTS.slice(0, 3),
                pitchContent: pitchBody,
                subject: pitchSubject,
                openRate: 0,
                responseCount: 0,
            };
            
            const storageKey = getOutreachStorageKey(quest.id);
            sessionStorage.setItem(storageKey, JSON.stringify(newCampaign));
            
            onCampaignSent?.(newCampaign);
            setIsSending(false);
            onClose();
        }, 2000);
    };

    const toggleJournalist = (journalist: JournalistContact) => {
        setSelectedJournalists(prev => {
            const exists = prev.find(j => j.id === journalist.id);
            if (exists) {
                return prev.filter(j => j.id !== journalist.id);
            }
            return [...prev, journalist];
        });
    };

    const copyPitch = () => {
        navigator.clipboard.writeText(`Subject: ${pitchSubject}\n\n${pitchBody}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const canProceed = () => {
        if (step === 1) return true;
        if (step === 2) return pitchSubject.trim() && pitchBody.trim();
        if (step === 3) return true;
        return false;
    };

    return (
        <div className="h-full flex flex-col bg-[#FAF9F6] relative">

            {/* Header */}
            <div className="h-16 border-b border-black/5 bg-white px-6 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-black/[0.03] rounded-lg transition-colors"
                    >
                        <HugeiconsIcon icon={ArrowLeft01Icon} size={20} className="text-black/40" />
                    </button>
                    <div className="h-6 w-px bg-black/10" />
                    <div>
                        <h1 className="font-serif text-lg font-medium">Outreach Campaign</h1>
                        <p className="text-[12px] text-black/50">{quest.title}</p>
                    </div>
                </div>
                
                {/* Step Indicator */}
                <div className="flex items-center gap-2">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center">
                            <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-medium
                                ${step === s ? 'bg-teal-600 text-white' : 
                                  step > s ? 'bg-teal-100 text-teal-700' : 'bg-black/5 text-black/40'}
                            `}>
                                {step > s ? (
                                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} />
                                ) : (
                                    s
                                )}
                            </div>
                            {s < 3 && (
                                <div className={`
                                    w-8 h-px mx-1
                                    ${step > s ? 'bg-teal-300' : 'bg-black/10'}
                                `} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto p-8">
                    {/* Step 1: Template Selection */}
                    {step === 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="text-center mb-10">
                                <h2 className="font-serif text-2xl mb-2">Choose a Template</h2>
                                <p className="text-black/50">Select the pitch style that fits your outreach strategy</p>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                {(['exclusive', 'embargo', 'followup'] as const).map((template) => (
                                    <button
                                        key={template}
                                        onClick={() => setSelectedTemplate(template)}
                                        className={`
                                            p-5 rounded-xl border-2 text-left transition-all relative
                                            ${selectedTemplate === template
                                                ? 'border-teal-600 bg-teal-50/30'
                                                : 'border-black/[0.06] hover:border-teal-200 hover:bg-teal-50/20'
                                            }
                                        `}
                                    >
                                        {/* Checkmark - no box */}
                                        {selectedTemplate === template && (
                                            <div className="absolute top-4 right-4">
                                                <HugeiconsIcon icon={CheckmarkSquare03Icon} size={20} className="text-teal-600" />
                                            </div>
                                        )}
                                        
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className={`
                                                w-10 h-10 rounded-lg flex items-center justify-center
                                                ${selectedTemplate === template ? 'bg-teal-600 text-white' : 'bg-black/5 text-black/40'}
                                            `}>
                                                {template === 'exclusive' ? <HugeiconsIcon icon={File01Icon} size={20} /> : 
                                                          template === 'embargo' ? <HugeiconsIcon icon={Clock01Icon} size={20} /> : 
                                                          <HugeiconsIcon icon={TextAlignLeftIcon} size={20} />}
                                            </div>
                                        </div>
                                        <div className={`text-[15px] font-medium capitalize mb-1 ${
                                            selectedTemplate === template ? 'text-teal-700' : 'text-black/70'
                                        }`}>
                                            {PITCH_TEMPLATES[template].label}
                                        </div>
                                        <div className="text-[13px] text-black/50">
                                            {PITCH_TEMPLATES[template].description}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Compose Pitch */}
                    {step === 2 && (
                        <Step2ComposePitch 
                            quest={quest}
                            pitchSubject={pitchSubject}
                            setPitchSubject={setPitchSubject}
                            pitchBody={pitchBody}
                            setPitchBody={setPitchBody}
                            onCopy={copyPitch}
                            copied={copied}
                        />
                    )}

                    {/* Step 3: Select Journalists */}
                    {step === 3 && (
                        <Step3SelectJournalists 
                            quest={quest}
                            selectedJournalists={selectedJournalists}
                            onToggleJournalist={toggleJournalist}
                            onSendCampaign={handleSendCampaign}
                            isSending={isSending}
                        />
                    )}
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="h-16 border-t border-black/5 bg-white px-6 flex items-center justify-between shrink-0">
                <button
                    onClick={() => setStep(prev => (prev > 1 ? (prev - 1) as 1 | 2 | 3 : prev))}
                    disabled={step === 1}
                    className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-black/50 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
                    Back
                </button>
                
                {step < 3 && (
                    <button
                        onClick={() => setStep(prev => (prev + 1) as 1 | 2 | 3)}
                        disabled={!canProceed()}
                        className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white rounded-lg text-[13px] font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Continue
                        <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                    </button>
                )}
            </div>
        </div>
    );
};
