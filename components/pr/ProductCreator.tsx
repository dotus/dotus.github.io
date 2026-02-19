import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    ArrowLeft01Icon,
    ArrowRight01Icon,
    CheckmarkCircle02Icon,
    CheckmarkSquare02Icon,
    Clock01Icon,
    File01Icon,
    File02Icon,
    Image01Icon,
    Link01Icon,
    ArrowRight02Icon,
    Loading03Icon,
    MagicWand01Icon,
    TextAlignLeftIcon,
    FileAddIcon,
    TwitterIcon,
    Linkedin01Icon,
    InstagramIcon,
    GlobalIcon,
    FileAttachmentIcon,
    SlideIcon,
    Pdf01Icon,
    MinusSignIcon,
    PlusSignIcon,
} from '@hugeicons/core-free-icons';
import type { ProductOutput, OutputType } from './ProductSection';
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

interface ProductCreatorProps {
    questId: number;
    workingDocs: WorkingDoc[];
    attachedDocs: AttachedDoc[];
    onClose: () => void;
    onCreated: (product: ProductOutput) => void;
}

const OUTPUT_TYPES: { id: OutputType; label: string; icon: typeof TwitterIcon; description: string; suggestedWords: number }[] = [
    { id: 'x-post', label: 'X Post', icon: TwitterIcon, description: 'Short-form social post', suggestedWords: 50 },
    { id: 'linkedin-post', label: 'LinkedIn Post', icon: Linkedin01Icon, description: 'Professional post', suggestedWords: 150 },
    { id: 'instagram-post', label: 'Instagram Post', icon: InstagramIcon, description: 'Visual-first caption', suggestedWords: 100 },
    { id: 'press-release', label: 'Press Release', icon: FileAttachmentIcon, description: 'Formal announcement', suggestedWords: 500 },
    { id: 'blog-post', label: 'Blog Post', icon: GlobalIcon, description: 'Long-form content', suggestedWords: 800 },
    { id: 'website-copy', label: 'Website Copy', icon: TextAlignLeftIcon, description: 'Landing page content', suggestedWords: 300 },
    { id: 'investor-doc', label: 'Investor Document', icon: File01Icon, description: 'Investor update', suggestedWords: 600 },
];

const FILE_ICONS: Record<string, typeof File01Icon> = {
    doc: File01Icon,
    sheet: File02Icon,
    slide: SlideIcon,
    pdf: Pdf01Icon,
    image: Image01Icon,
    link: Link01Icon,
};

const AI_GENERATED_CONTENT: Record<OutputType, string> = {
    'x-post': `We're thrilled to announce our $50M Series B led by A16Z!`,
    'linkedin-post': `I'm incredibly proud to announce that we've raised $50M in Series B funding.`,
    'instagram-post': `Big news! We just raised $50M to democratize AI for every developer.`,
    'press-release': `FOR IMMEDIATE RELEASE\n\nAI Infrastructure Pioneer Secures $50M Series B.`,
    'blog-post': `Announcing Our $50M Series B: Building the Future of AI Infrastructure.`,
    'website-copy': `The Infrastructure for Intelligent Applications.`,
    'investor-doc': `[Company Name] - Series B Update\nDate: January 2026`
};

const STEPS = [
    { id: 1, label: 'Content Type' },
    { id: 2, label: 'Source Docs' },
    { id: 3, label: 'AI Options' },
    { id: 4, label: 'Review' },
];

export const ProductCreator: React.FC<ProductCreatorProps> = ({ questId, workingDocs, attachedDocs, onClose, onCreated }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedOutputType, setSelectedOutputType] = useState<OutputType | null>(null);
    const [selectedDocs, setSelectedDocs] = useState<number[]>([]);
    const [wordCount, setWordCount] = useState<number>(0);
    const [additionalInstructions, setAdditionalInstructions] = useState('');
    const [useAI, setUseAI] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationStep, setGenerationStep] = useState<'reading' | 'analyzing' | 'generating' | 'complete'>('reading');
    const [readingProgress, setReadingProgress] = useState(0);

    const handleOutputTypeSelect = (type: OutputType) => {
        setSelectedOutputType(type);
        const suggested = OUTPUT_TYPES.find(t => t.id === type)?.suggestedWords || 100;
        setWordCount(suggested);
    };

    const toggleDocSelection = (docId: number) => {
        setSelectedDocs(prev => 
            prev.includes(docId) 
                ? prev.filter(id => id !== docId)
                : [...prev, docId]
        );
    };

    const selectAllDocs = () => {
        const allDocIds = [...workingDocs, ...attachedDocs].map(d => d.id);
        const allSelected = allDocIds.every(id => selectedDocs.includes(id));
        setSelectedDocs(allSelected ? [] : allDocIds);
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1: return selectedOutputType !== null;
            case 2: return true;
            case 3: return true;
            case 4: return true;
            default: return false;
        }
    };

    const nextStep = () => {
        if (currentStep < 4) setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const startGeneration = async () => {
        if (!selectedOutputType) return;
        
        setIsGenerating(true);
        
        if (useAI) {
            setGenerationStep('reading');
            const docsToRead = [...workingDocs, ...attachedDocs].filter(d => selectedDocs.includes(d.id));
            const totalDocs = Math.max(docsToRead.length, 1);
            
            for (let i = 0; i < totalDocs; i++) {
                await new Promise(r => setTimeout(r, 400));
                setReadingProgress(Math.round(((i + 1) / totalDocs) * 100));
            }
            
            await new Promise(r => setTimeout(r, 300));
            setGenerationStep('analyzing');
            await new Promise(r => setTimeout(r, 800));
            
            setGenerationStep('generating');
            await new Promise(r => setTimeout(r, 1200));
        }
        
        const newProduct: ProductOutput & { questId: number } = {
            id: Date.now(),
            questId: questId,
            type: selectedOutputType,
            title: `${OUTPUT_TYPES.find(t => t.id === selectedOutputType)?.label} - ${new Date().toLocaleDateString()}`,
            content: useAI ? AI_GENERATED_CONTENT[selectedOutputType] : '',
            wordCount: useAI ? AI_GENERATED_CONTENT[selectedOutputType].split(/\s+/).length : 0,
            status: 'draft',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            selectedDocs: selectedDocs,
            instructions: additionalInstructions,
        };
        
        setGenerationStep('complete');
        await new Promise(r => setTimeout(r, 400));
        
        setIsGenerating(false);
        onCreated(newProduct);
    };

    const selectedTypeConfig = OUTPUT_TYPES.find(t => t.id === selectedOutputType);
    const hasDocs = workingDocs.length > 0 || attachedDocs.length > 0;
    const totalDocs = workingDocs.length + attachedDocs.length;

    const [direction, setDirection] = useState(0);

    const handleNext = () => {
        setDirection(1);
        nextStep();
    };

    const handleBack = () => {
        setDirection(-1);
        prevStep();
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    };

    // Get min/max for word count slider
    const getWordCountRange = () => {
        if (!selectedOutputType) return { min: 50, max: 1000 };
        if (selectedOutputType === 'x-post') return { min: 30, max: 280 };
        if (selectedOutputType.includes('post')) return { min: 100, max: 500 };
        return { min: 200, max: 2000 };
    };
    const { min, max } = getWordCountRange();
    const sliderPercentage = ((wordCount - min) / (max - min)) * 100;

    if (isGenerating) {
        return (
            <div className="h-full flex flex-col bg-[#FAF9F6]">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-black/[0.06] bg-white">
                    <button onClick={onClose} className="p-2 hover:bg-black/[0.04] rounded-lg">
                        <HugeiconsIcon icon={ArrowLeft01Icon} size={18} className="text-black/40" />
                    </button>
                    <span className="text-[14px] font-medium">Creating Content</span>
                </div>
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="text-center max-w-sm">
                        <HugeiconsIcon icon={Loading03Icon} size={40} className="animate-spin text-teal-600 mx-auto mb-6" />
                        <h3 className="text-[18px] font-medium mb-2">
                            {useAI ? (
                                <>
                                    {generationStep === 'reading' && 'Reading your documents...'}
                                    {generationStep === 'analyzing' && 'Analyzing your style...'}
                                    {generationStep === 'generating' && 'Writing your draft...'}
                                    {generationStep === 'complete' && 'All set!'}
                                </>
                            ) : 'Creating your document...'}
                        </h3>
                        {useAI && generationStep === 'reading' && (
                            <>
                                <p className="text-[14px] text-black/50 mb-3">{readingProgress}% complete</p>
                                <div className="w-56 h-2 bg-gray-100 rounded-full mx-auto overflow-hidden">
                                    <div className="h-full bg-teal-600 rounded-full transition-all duration-300" style={{ width: `${readingProgress}%` }} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-[#FAF9F6]">
            {/* Header with Progress - Teal Active States */}
            <div className="px-5 py-3 border-b border-black/[0.06] bg-white">
                <div className="flex items-center gap-4">
                    <button onClick={onClose} className="p-2 hover:bg-black/[0.04] rounded-lg transition-colors flex-shrink-0">
                        <HugeiconsIcon icon={ArrowLeft01Icon} size={18} className="text-black/40" />
                    </button>
                    
                    {/* Progress Steps - Teal for active/current */}
                    <div className="flex items-center gap-1.5 overflow-x-auto">
                        {STEPS.map((step, index) => (
                            <React.Fragment key={step.id}>
                                <div className="flex items-center gap-2">
                                    {/* Step indicator - cleaner without circle bg for completed */}
                                    {currentStep > step.id ? (
                                        <HugeiconsIcon icon={CheckmarkSquare02Icon} size={18} className="text-teal-600" />
                                    ) : (
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium transition-colors ${
                                            currentStep === step.id 
                                                ? 'bg-teal-600 text-white' 
                                                : 'bg-gray-100 text-black/40'
                                        }`}>
                                            {step.id}
                                        </div>
                                    )}
                                    <span className={`text-[11px] whitespace-nowrap ${
                                        currentStep >= step.id ? 'text-teal-700 font-medium' : 'text-black/40'
                                    }`}>
                                        {step.label}
                                    </span>
                                </div>
                                {index < STEPS.length - 1 && (
                                    <HugeiconsIcon icon={ArrowRight02Icon} size={12} className={`mx-1 flex-shrink-0 ${
                                        currentStep > step.id ? 'text-teal-600' : 'text-black/20'
                                    }`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden relative">
                <AnimatePresence mode="wait" custom={direction}>
                    {/* Step 1: Content Type - Teal Selection */}
                    {currentStep === 1 && (
                        <motion.div
                            key="step1"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 overflow-y-auto p-6"
                        >
                            <div className="max-w-xl mx-auto">
                                <h2 className="text-[20px] font-medium mb-2">What would you like to create?</h2>
                                <p className="text-[14px] text-black/50 mb-6">Choose the format that best fits your content strategy.</p>
                                
                                <div className="space-y-3">
                                    {OUTPUT_TYPES.map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => handleOutputTypeSelect(type.id)}
                                            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                                                selectedOutputType === type.id
                                                    ? 'border-teal-600 bg-teal-50'
                                                    : 'bg-white border-black/[0.08] hover:border-teal-200'
                                            }`}
                                        >
                                            <div className={`p-3 rounded-xl ${selectedOutputType === type.id ? 'bg-teal-100 text-teal-700' : 'bg-gray-50 text-black/60'}`}>
                                                <HugeiconsIcon icon={type.icon} size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <p className={`text-[15px] font-medium ${selectedOutputType === type.id ? 'text-teal-900' : 'text-black'}`}>
                                                    {type.label}
                                                </p>
                                                <p className={`text-[13px] mt-0.5 ${selectedOutputType === type.id ? 'text-teal-600' : 'text-black/50'}`}>
                                                    {type.description} • ~{type.suggestedWords} words
                                                </p>
                                            </div>
                                            {selectedOutputType === type.id && (
                                                <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} className="text-teal-600" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Source Documents - Teal Selection */}
                    {currentStep === 2 && (
                        <motion.div
                            key="step2"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 overflow-y-auto p-6"
                        >
                            <div className="max-w-xl mx-auto">
                                <h2 className="text-[20px] font-medium mb-2">Select source documents</h2>
                                <p className="text-[14px] text-black/50 mb-6">
                                    Choose documents to reference. These help the AI understand your context.
                                </p>
                                
                                {!hasDocs ? (
                                    <div className="p-8 bg-white border border-black/[0.06] rounded-xl text-center">
                                        <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <HugeiconsIcon icon={FileAddIcon} size={20} className="text-teal-600" />
                                        </div>
                                        <p className="text-[15px] font-medium text-black/70">No documents available</p>
                                        <p className="text-[13px] text-black/40 mt-1">Continue without source documents</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {workingDocs.length > 0 && (
                                            <div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <p className="text-[12px] font-semibold text-teal-700 uppercase tracking-wider">Working Documents</p>
                                                    <button
                                                        onClick={selectAllDocs}
                                                        className="text-[12px] text-teal-600 hover:text-teal-700 font-medium"
                                                    >
                                                        {selectedDocs.length === totalDocs ? 'Deselect All' : 'Select All'}
                                                    </button>
                                                </div>
                                                <div className="space-y-2">
                                                    {workingDocs.map(doc => (
                                                        <button
                                                            key={doc.id}
                                                            onClick={() => toggleDocSelection(doc.id)}
                                                            className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                                                                selectedDocs.includes(doc.id)
                                                                    ? 'bg-teal-50 border-teal-200'
                                                                    : 'bg-white border-black/[0.04] hover:border-teal-100'
                                                            }`}
                                                        >
                                                            {selectedDocs.includes(doc.id) && (
                                                                <HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} className="text-teal-600 flex-shrink-0" />
                                                            )}
                                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${selectedDocs.includes(doc.id) ? 'bg-teal-100' : 'bg-gray-50'}`}>
                                                                <HugeiconsIcon icon={FILE_ICONS[doc.type]} size={20} className={selectedDocs.includes(doc.id) ? 'text-teal-600' : 'text-blue-600'} />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className={`text-[14px] font-medium truncate ${selectedDocs.includes(doc.id) ? 'text-teal-900' : 'text-black'}`}>{doc.title}</p>
                                                                <p className={`text-[12px] ${selectedDocs.includes(doc.id) ? 'text-teal-600' : 'text-black/40'}`}>{doc.lastEdited}</p>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        
                                        {attachedDocs.length > 0 && (
                                            <div>
                                                <p className="text-[12px] font-semibold text-teal-700 uppercase tracking-wider mb-3">Attached Files</p>
                                                <div className="space-y-2">
                                                    {attachedDocs.map(doc => (
                                                        <button
                                                            key={doc.id}
                                                            onClick={() => toggleDocSelection(doc.id)}
                                                            className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                                                                selectedDocs.includes(doc.id)
                                                                    ? 'bg-teal-50 border-teal-200'
                                                                    : 'bg-white border-black/[0.04] hover:border-teal-100'
                                                            }`}
                                                        >
                                                            {selectedDocs.includes(doc.id) && (
                                                                <HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} className="text-teal-600 flex-shrink-0" />
                                                            )}
                                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${selectedDocs.includes(doc.id) ? 'bg-teal-100' : 'bg-gray-50'}`}>
                                                                <HugeiconsIcon icon={FILE_ICONS[doc.fileType]} size={20} className={selectedDocs.includes(doc.id) ? 'text-teal-600' : 'text-black/60'} />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className={`text-[14px] font-medium truncate ${selectedDocs.includes(doc.id) ? 'text-teal-900' : 'text-black'}`}>{doc.name}</p>
                                                                <p className={`text-[12px] ${selectedDocs.includes(doc.id) ? 'text-teal-600' : 'text-black/40'}`}>{doc.source} • {doc.uploadedAt}</p>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                
                                <div className="mt-6 p-4 bg-teal-50 rounded-xl border border-teal-100">
                                    <p className="text-[13px] text-teal-800">
                                        <span className="font-semibold">{selectedDocs.length}</span> of <span className="font-semibold">{totalDocs}</span> documents selected
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: AI Options - Teal Highlights & Improved Slider */}
                    {currentStep === 3 && (
                        <motion.div
                            key="step3"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 overflow-y-auto p-6"
                        >
                            <div className="max-w-xl mx-auto">
                                <h2 className="text-[20px] font-medium mb-2">Draft options</h2>
                                <p className="text-[14px] text-black/50 mb-6">Configure how your content should be created.</p>
                                
                                {/* AI Toggle with Magic Icon */}
                                <div className="p-5 bg-white border border-black/[0.06] rounded-xl mb-4">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${useAI ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-black/30'}`}>
                                            <HugeiconsIcon icon={MagicWand01Icon} size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-[15px] font-medium">Let AI write a first draft</p>
                                                <button
                                                    onClick={() => setUseAI(!useAI)}
                                                    className={`relative w-12 h-7 rounded-full transition-colors ${useAI ? 'bg-teal-600' : 'bg-gray-200'}`}
                                                >
                                                    <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${useAI ? 'translate-x-5' : ''}`} />
                                                </button>
                                            </div>
                                            <p className="text-[13px] text-black/50 mt-1">
                                                We'll analyze your previous published content to match your brand voice and style.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* AI Configuration */}
                                <AnimatePresence>
                                    {useAI && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="bg-white rounded-xl border border-black/[0.06] p-5 space-y-5">
                                                {/* Word Count - Fixed Slider */}
                                                <div>
                                                    <div className="flex items-center justify-between mb-4">
                                                        <label className="text-[14px] font-medium">Length target</label>
                                                        <div className="flex items-center gap-2">
                                                            <button 
                                                                onClick={() => setWordCount(Math.max(min, wordCount - 10))}
                                                                className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                                            >
                                                                <HugeiconsIcon icon={MinusSignIcon} size={14} />
                                                            </button>
                                                            <span className="text-[14px] font-semibold px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg min-w-[80px] text-center">{wordCount}</span>
                                                            <button 
                                                                onClick={() => setWordCount(Math.min(max, wordCount + 10))}
                                                                className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                                            >
                                                                <HugeiconsIcon icon={PlusSignIcon} size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Interactive Slider */}
                                                    <div className="relative h-3">
                                                        {/* Track background */}
                                                        <div className="absolute inset-0 bg-gray-100 rounded-full" />
                                                        {/* Filled track */}
                                                        <div 
                                                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-150 pointer-events-none"
                                                            style={{ width: `${sliderPercentage}%` }}
                                                        />
                                                        {/* Tick marks */}
                                                        <div className="absolute inset-0 flex justify-between px-2 pointer-events-none">
                                                            <div className="w-px h-full bg-white/50" />
                                                            <div className="w-px h-full bg-white/50" />
                                                            <div className="w-px h-full bg-white/50" />
                                                            <div className="w-px h-full bg-white/50" />
                                                            <div className="w-px h-full bg-white/50" />
                                                        </div>
                                                        {/* Native range input - visible and functional */}
                                                        <input
                                                            type="range"
                                                            min={min}
                                                            max={max}
                                                            step={10}
                                                            value={wordCount}
                                                            onChange={(e) => setWordCount(parseInt(e.target.value))}
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                            style={{ WebkitAppearance: 'none', appearance: 'none' }}
                                                        />
                                                        {/* Custom thumb overlay */}
                                                        <div 
                                                            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md border border-gray-200 pointer-events-none transition-all duration-150"
                                                            style={{ left: `calc(${sliderPercentage}% - 8px)` }}
                                                        />
                                                    </div>
                                                    
                                                    <div className="flex justify-between mt-2">
                                                        <span className="text-[11px] text-black/40 font-medium">{min}</span>
                                                        <span className="text-[11px] text-black/40">Brief</span>
                                                        <span className="text-[11px] text-black/40">Standard</span>
                                                        <span className="text-[11px] text-black/40">Detailed</span>
                                                        <span className="text-[11px] text-black/40 font-medium">{max}</span>
                                                    </div>
                                                </div>
                                                
                                                {/* Instructions */}
                                                <div>
                                                    <label className="text-[14px] font-medium block mb-2">
                                                        Specific instructions <span className="text-black/40 font-normal">(optional)</span>
                                                    </label>
                                                    <textarea
                                                        value={additionalInstructions}
                                                        onChange={(e) => setAdditionalInstructions(e.target.value)}
                                                        placeholder="e.g., Focus on technical aspects, mention specific features..."
                                                        rows={3}
                                                        className="w-full p-3 text-[14px] border border-black/[0.08] rounded-xl resize-none outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 placeholder:text-black/30"
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 4: Review */}
                    {currentStep === 4 && (
                        <motion.div
                            key="step4"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 overflow-y-auto p-6"
                        >
                            <div className="max-w-xl mx-auto">
                                <h2 className="text-[20px] font-medium mb-2">Review & create</h2>
                                <p className="text-[14px] text-black/50 mb-6">Double-check your selections before creating.</p>
                                
                                <div className="space-y-4">
                                    {/* Content Type Summary */}
                                    <div className="p-5 bg-white border border-black/[0.06] rounded-xl">
                                        <p className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider mb-3">Content Type</p>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-teal-50 rounded-lg">
                                                {selectedTypeConfig && <HugeiconsIcon icon={selectedTypeConfig.icon} size={20} className="text-teal-600" />}
                                            </div>
                                            <div>
                                                <p className="text-[15px] font-medium">{selectedTypeConfig?.label}</p>
                                                <p className="text-[13px] text-black/50">~{selectedTypeConfig?.suggestedWords} words suggested</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Documents Summary */}
                                    <div className="p-5 bg-white border border-black/[0.06] rounded-xl">
                                        <p className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider mb-3">Source Documents</p>
                                        <p className="text-[14px]">
                                            <span className="font-medium">{selectedDocs.length}</span> documents selected
                                            {selectedDocs.length === 0 && (
                                                <span className="text-black/50"> (none — AI will use general knowledge)</span>
                                            )}
                                        </p>
                                    </div>

                                    {/* AI Options Summary */}
                                    <div className="p-5 bg-white border border-black/[0.06] rounded-xl">
                                        <p className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider mb-3">Draft Options</p>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[14px]">AI first draft</span>
                                                <span className={`text-[13px] font-medium ${useAI ? 'text-teal-600' : 'text-black/40'}`}>
                                                    {useAI ? 'Enabled' : 'Disabled'}
                                                </span>
                                            </div>
                                            {useAI && (
                                                <>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[14px] text-black/60">Target length</span>
                                                        <span className="text-[14px] font-medium">{wordCount} words</span>
                                                    </div>
                                                    {additionalInstructions && (
                                                        <div className="pt-2 border-t border-black/[0.06]">
                                                            <span className="text-[13px] text-black/60">Instructions: </span>
                                                            <span className="text-[13px]">{additionalInstructions}</span>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer Navigation */}
            <div className="px-6 py-4 border-t border-black/[0.06] bg-white">
                <div className="max-w-xl mx-auto flex items-center justify-between">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className="flex items-center gap-2 px-4 py-2.5 text-[14px] font-medium text-black/60 hover:text-black hover:bg-black/[0.04] rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
                        Back
                    </button>
                    
                    {currentStep < 4 ? (
                        <button
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white text-[14px] font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Continue
                            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                        </button>
                    ) : (
                        <button
                            onClick={startGeneration}
                            className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white text-[14px] font-medium rounded-lg hover:bg-teal-700 transition-colors"
                        >
                            {useAI ? (
                                <>
                                    <HugeiconsIcon icon={MagicWand01Icon} size={16} />
                                    Generate
                                </>
                            ) : (
                                <>
                                    <HugeiconsIcon icon={FileAddIcon} size={16} />
                                    Create
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
