import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    ArrowLeft01Icon,
    ArrowRight01Icon,
    ArrowRight02Icon,
    CheckmarkSquare03Icon,
    CheckmarkCircle02Icon,
    Clock01Icon,
    File01Icon,
    File02Icon,
    Loading03Icon,
    TextAlignLeftIcon,
    Search01Icon,
} from '@hugeicons/core-free-icons';
import { Quest, OutreachCampaign, JournalistContact, MOCK_JOURNALISTS, getOutreachStorageKey, getRecommendedJournalists } from './StatsOverview';

interface OutreachComposerProps {
    quest: Quest;
    onClose: () => void;
    onCampaignSent?: (campaign: OutreachCampaign) => void;
}

const PITCH_TEMPLATES = {
    exclusive: {
        label: 'Exclusive',
        description: 'For top-tier exclusives',
        subject: 'Exclusive: {{title}}',
        body: `Hi {{name}},

I hope this finds you well. I saw your recent piece on {{topic}} and thought this would be right up your alley.

We're announcing {{title}} — {{synopsis}}

I'd love to offer you an exclusive on this story. I have {{founder}} available for an interview this week.

The embargo lifts on {{embargoDate}} at {{embargoTime}}.

Best regards,
{{sender}}`
    },
    embargo: {
        label: 'Embargo',
        description: 'Standard embargo pitch',
        subject: 'Embargo: {{title}}',
        body: `Hi {{name}},

Under embargo until {{embargoDate}} at {{embargoTime}}:

{{title}}

{{synopsis}}

I have {{founder}} available for interviews. Let me know if you're interested.

Best,
{{sender}}`
    },
    followup: {
        label: 'Follow-up',
        description: 'Checking in',
        subject: 'Re: {{title}}',
        body: `Hi {{name}},

Just following up on my previous email about {{title}}.

{{synopsis}}

Would you be interested in covering this? Happy to provide more details or connect you with {{founder}}.

Best,
{{sender}}`
    }
};

// Step 3 Component: Select Journalists
interface Step3Props {
    quest: Quest;
    selectedJournalists: JournalistContact[];
    onToggleJournalist: (journalist: JournalistContact) => void;
    onSendCampaign: () => void;
    isSending: boolean;
}

const Step3SelectJournalists: React.FC<Step3Props> = ({
    quest,
    selectedJournalists,
    onToggleJournalist,
    onSendCampaign,
    isSending
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const recommendedJournalists = getRecommendedJournalists(quest);
    
    // Get remaining journalists (not in recommended)
    const recommendedIds = new Set(recommendedJournalists.map(j => j.id));
    const additionalJournalists = MOCK_JOURNALISTS.filter(j => !recommendedIds.has(j.id));
    
    // Filter journalists based on search
    const filteredAdditional = searchQuery 
        ? additionalJournalists.filter(j => 
            j.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            j.outlet.toLowerCase().includes(searchQuery.toLowerCase()) ||
            j.focus.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : additionalJournalists;

    const isSelected = (journalist: JournalistContact) => 
        selectedJournalists.some(j => j.id === journalist.id);

    const selectAllRecommended = () => {
        recommendedJournalists.forEach(j => {
            if (!isSelected(j)) onToggleJournalist(j);
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
        >
            {/* Header with Send Button */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-serif text-2xl">Select Journalists</h2>
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

            {/* Selected Pills */}
            {selectedJournalists.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {selectedJournalists.map((journalist) => (
                        <span 
                            key={journalist.id}
                            className="inline-flex items-center gap-1.5 text-[12px] bg-[#EBA832] text-white pl-2.5 pr-1.5 py-1 rounded-md"
                        >
                            {journalist.name}
                            <button 
                                onClick={() => onToggleJournalist(journalist)}
                                className="hover:bg-white/20 rounded w-4 h-4 flex items-center justify-center transition-colors text-white/70 hover:text-white"
                            >
                                &times;
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <div className="max-w-3xl mx-auto space-y-4">
                {/* Recommended Section */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-[14px] font-medium text-[#EBA832]">Recommended</h3>
                        <button
                            onClick={selectAllRecommended}
                            className="text-[11px] text-black/50 hover:text-black"
                        >
                            Select All
                        </button>
                    </div>

                    <div className="space-y-1">
                        {recommendedJournalists.map((journalist) => {
                            const selected = isSelected(journalist);
                            return (
                                <button
                                    key={journalist.id}
                                    onClick={() => onToggleJournalist(journalist)}
                                    className={`
                                        w-full flex items-center gap-3 px-3 py-2 rounded-lg border text-left transition-all
                                        ${selected 
                                            ? 'bg-[#EBA832]/10 border-[#EBA832]/30' 
                                            : 'bg-white border-black/[0.06] hover:border-[#EBA832]/20 hover:bg-[#EBA832]/5'
                                        }
                                    `}
                                >
                                    {/* Checkmark */}
                                    <div className="w-5 flex justify-center flex-shrink-0">
                                        {selected && <HugeiconsIcon icon={CheckmarkSquare03Icon} size={18} className="text-[#EBA832]" />}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[14px] font-medium truncate">{journalist.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[11px] text-black/50">
                                            <span className="text-[#EBA832] font-medium">{journalist.outlet}</span>
                                            <span className="w-1 h-1 rounded-full bg-black/20" />
                                            <span>{journalist.focus}</span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Additional Journalists */}
                <div>
                    <h3 className="text-[14px] font-medium text-black/50 mb-2">More Contacts</h3>

                    {/* Search */}
                    <div className="relative mb-2">
                        <HugeiconsIcon 
                            icon={Search01Icon} 
                            size={16} 
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30" 
                        />
                        <input
                            type="text"
                            placeholder="Search journalists..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-white border border-black/10 rounded-lg text-[13px] placeholder:text-black/40 focus:outline-none focus:border-black/30"
                        />
                    </div>

                    <div className="space-y-1 max-h-[240px] overflow-y-auto">
                        {filteredAdditional.length === 0 ? (
                            <div className="text-center py-6 text-black/40">
                                <p className="text-[13px]">No journalists found</p>
                            </div>
                        ) : (
                            filteredAdditional.map((journalist) => {
                                const selected = isSelected(journalist);
                                return (
                                    <button
                                        key={journalist.id}
                                        onClick={() => onToggleJournalist(journalist)}
                                        className={`
                                            w-full flex items-center gap-3 px-3 py-2 rounded-lg border text-left transition-all
                                            ${selected 
                                                ? 'bg-black/[0.03] border-black/20' 
                                                : 'bg-white border-black/[0.06] hover:border-black/10 hover:bg-black/[0.02]'
                                            }
                                        `}
                                    >
                                        {/* Checkmark */}
                                        <div className="w-5 flex justify-center flex-shrink-0">
                                            {selected && <HugeiconsIcon icon={CheckmarkSquare03Icon} size={18} className="text-black" />}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[14px] font-medium truncate">{journalist.name}</div>
                                            <div className="flex items-center gap-2 text-[11px] text-black/50">
                                                <span className="text-black/60 font-medium">{journalist.outlet}</span>
                                                <span className="w-1 h-1 rounded-full bg-black/20" />
                                                <span className="truncate">{journalist.focus}</span>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })
                        )}
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
        <div className="h-full flex flex-col bg-[#FAF9F6]">
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
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="font-serif text-2xl">Compose Your Pitch</h2>
                                <button
                                    onClick={copyPitch}
                                    className="flex items-center gap-2 text-[13px] text-black/50 hover:text-black px-3 py-2 rounded-lg hover:bg-black/[0.03] transition-colors"
                                >
                                    {copied ? <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} /> : <HugeiconsIcon icon={File02Icon} size={16} />}
                                    {copied ? 'Copied' : 'Copy Pitch'}
                                </button>
                            </div>

                            {/* Subject */}
                            <div className="bg-white rounded-xl border border-black/10 p-6">
                                <label className="block text-[11px] font-medium text-black/50 uppercase tracking-wide mb-3">
                                    Subject Line
                                </label>
                                <input
                                    type="text"
                                    value={pitchSubject}
                                    onChange={(e) => setPitchSubject(e.target.value)}
                                    className="w-full px-4 py-3 text-[15px] border border-black/10 rounded-lg focus:outline-none focus:border-black/30"
                                    placeholder="Enter subject line..."
                                />
                            </div>

                            {/* Body */}
                            <div className="bg-white rounded-xl border border-black/10 p-6">
                                <label className="block text-[11px] font-medium text-black/50 uppercase tracking-wide mb-3">
                                    Pitch Content
                                </label>
                                <textarea
                                    value={pitchBody}
                                    onChange={(e) => setPitchBody(e.target.value)}
                                    rows={14}
                                    className="w-full px-4 py-3 text-[14px] border border-black/10 rounded-lg focus:outline-none focus:border-black/30 resize-none font-mono leading-relaxed"
                                    placeholder="Write your pitch..."
                                />
                                <div className="flex items-center justify-between mt-3 text-[12px] text-black/40">
                                    <span>Use {'{{name}}'} to personalize with journalist names</span>
                                    <span>{pitchBody.length} characters</span>
                                </div>
                            </div>
                        </motion.div>
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
