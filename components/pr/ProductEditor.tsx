import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    ArrowLeft01Icon,
    Upload01Icon,
    Cancel01Icon,
    TwitterIcon,
    Linkedin01Icon,
    InstagramIcon,
    GlobalIcon,
    FileAttachmentIcon,
    Mail01Icon,
    Copy01Icon,
    Clock01Icon,
    Download01Icon,
    TextBoldIcon,
    TextItalicIcon,
    TextUnderlineIcon,
    LeftToRightListNumberIcon,
    LeftToRightListBulletIcon,
    Link01Icon,
    TextAlignLeftIcon,
    TextAlignCenterIcon,
    TextAlignRightIcon,
    TextFontIcon,
    CheckmarkCircle02Icon,
    Undo02Icon,
    Redo02Icon,
    MoreVerticalIcon,
    HeartAddIcon,
    MessageMultiple01Icon,
    Bookmark01Icon,
    Image01Icon,
    GiftIcon,
    Location01Icon,
    Calendar03Icon,
    File01Icon,
    File02Icon,
    ArrowDown01Icon,
    SentIcon,
    Loading03Icon,
    Share01Icon,
    CheckmarkSquare02Icon,
    StarIcon,
} from '@hugeicons/core-free-icons';
import { 
    X, ChevronLeft, Check, MoreHorizontal, Heart, MessageCircle, Bookmark, ImageIcon, Gift, Smile, MapPin, Calendar, FileText, ChevronDown,
    Bold, Italic, Underline, List, ListOrdered, Link, AlignLeft, AlignCenter, AlignRight, Type, Undo, Redo, Copy, Clock, Download, Send
} from 'lucide-react';
import type { ProductOutput, OutputType } from './ProductCreator';

const FILE_ICONS: Record<string, typeof File01Icon> = {
    doc: File01Icon,
    sheet: File02Icon,
    slide: FileAttachmentIcon,
    pdf: File02Icon,
    image: Image01Icon,
    link: Link01Icon,
};

interface ChatMessage {
    id: number;
    role: 'user' | 'agent';
    content: string;
    timestamp: string;
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

interface ProductEditorProps {
    product: ProductOutput;
    workingDocs?: WorkingDoc[];
    attachedDocs?: AttachedDoc[];
    onClose: () => void;
    onUpdate: (updated: ProductOutput) => void;
}

const OUTPUT_TYPES: { id: OutputType; label: string; icon: typeof TwitterIcon }[] = [
    { id: 'x-post', label: 'X Post', icon: TwitterIcon },
    { id: 'linkedin-post', label: 'LinkedIn Post', icon: Linkedin01Icon },
    { id: 'instagram-post', label: 'Instagram Post', icon: InstagramIcon },
    { id: 'press-release', label: 'Press Release', icon: FileAttachmentIcon },
    { id: 'blog-post', label: 'Blog Post', icon: GlobalIcon },
    { id: 'website-copy', label: 'Website Copy', icon: GlobalIcon },
    { id: 'investor-doc', label: 'Investor Document', icon: FileAttachmentIcon },
];

const PUBLISH_CHANNELS: { id: string; label: string; icon: typeof TwitterIcon; connected: boolean }[] = [
    { id: 'x', label: 'X (Twitter)', icon: TwitterIcon, connected: true },
    { id: 'linkedin', label: 'LinkedIn', icon: Linkedin01Icon, connected: true },
    { id: 'instagram', label: 'Instagram', icon: InstagramIcon, connected: false },
    { id: 'website', label: 'Company Website', icon: GlobalIcon, connected: true },
    { id: 'prnewswire', label: 'PR Newswire', icon: FileAttachmentIcon, connected: false },
    { id: 'email', label: 'Email Distribution', icon: Mail01Icon, connected: true },
];

const QUICK_ACTIONS = [
    'Make it shorter',
    'Expand this',
    'More professional',
    'Add CTA',
];

export const ProductEditor: React.FC<ProductEditorProps> = ({ 
    product, 
    workingDocs = [], 
    attachedDocs = [], 
    onClose, 
    onUpdate 
}) => {
    const [currentProduct, setCurrentProduct] = useState<ProductOutput>(product);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [chatInput, setChatInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showPublishDialog, setShowPublishDialog] = useState(false);
    const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
    const [isPublishing, setIsPublishing] = useState(false);
    const [publishComplete, setPublishComplete] = useState(false);
    const [copied, setCopied] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [activeFormats, setActiveFormats] = useState<string[]>([]);
    const [uploadedImages, setUploadedImages] = useState<string[]>(() => {
        // Load from sessionStorage on init
        const saved = sessionStorage.getItem(`product-images-${product.id}`);
        return saved ? JSON.parse(saved) : [];
    });
    const [isDragging, setIsDragging] = useState(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [titleValue, setTitleValue] = useState(product.title);
    
    const editorRef = useRef<HTMLDivElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const chatInputRef = useRef<HTMLInputElement>(null);

    // Initialize
    useEffect(() => {
        const content = product.content || '';
        setWordCount(content.split(/\s+/).filter(w => w.length > 0).length);
        setCharCount(content.length);
        setTitleValue(product.title);
        
        // Delay setting editor content to ensure DOM is ready
        // Use a longer delay for social post types to ensure conditional rendering completes
        const timer = setTimeout(() => {
            if (editorRef.current) {
                editorRef.current.innerHTML = content ? formatContentToHTML(content) : '';
            }
        }, 50);

        setChatMessages([
            {
                id: Date.now(),
                role: 'agent',
                content: 'Hi! I can help you refine this content. What would you like me to adjust?',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
        ]);
        
        return () => clearTimeout(timer);
    }, [product]);
    
    // Re-initialize editor content when product type changes (for conditional rendering)
    useEffect(() => {
        const content = product.content || '';
        const timer = setTimeout(() => {
            if (editorRef.current) {
                editorRef.current.innerHTML = content ? formatContentToHTML(content) : '';
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [product.type]);

    // Scroll chat to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    // Update active formats on selection change
    useEffect(() => {
        const updateActiveFormats = () => {
            const formats = [];
            if (document.queryCommandState('bold')) formats.push('bold');
            if (document.queryCommandState('italic')) formats.push('italic');
            if (document.queryCommandState('underline')) formats.push('underline');
            if (document.queryCommandState('justifyLeft')) formats.push('justifyLeft');
            if (document.queryCommandState('justifyCenter')) formats.push('justifyCenter');
            if (document.queryCommandState('justifyRight')) formats.push('justifyRight');
            if (document.queryCommandState('insertUnorderedList')) formats.push('insertUnorderedList');
            if (document.queryCommandState('insertOrderedList')) formats.push('insertOrderedList');
            setActiveFormats(formats);
        };

        document.addEventListener('selectionchange', updateActiveFormats);
        return () => document.removeEventListener('selectionchange', updateActiveFormats);
    }, []);

    const formatContentToHTML = (text: string): string => {
        if (!text) return '';
        // Simple HTML conversion - preserve paragraphs
        return text
            .split('\n\n')
            .map(p => p.trim() ? `<p>${p.replace(/\n/g, '<br>')}</p>` : '')
            .join('');
    };

    const getContentFromEditor = (): string => {
        if (!editorRef.current) return '';
        const html = editorRef.current.innerHTML;
        // Convert HTML to plain text with paragraph breaks
        const temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.innerText || '';
    };

    // Use a ref to track if we're processing content to avoid cursor jumping
    const isProcessingContent = useRef(false);
    const contentUpdateTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleContentChange = useCallback(() => {
        if (isProcessingContent.current) return;
        
        const content = getContentFromEditor();
        const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
        const charCount = content.length;
        
        // Update local stats immediately without triggering re-render of editor
        setWordCount(wordCount);
        setCharCount(charCount);
        
        // Debounce the parent update to prevent cursor jumping
        if (contentUpdateTimeout.current) {
            clearTimeout(contentUpdateTimeout.current);
        }
        
        contentUpdateTimeout.current = setTimeout(() => {
            const updated = { 
                ...currentProduct, 
                content, 
                updatedAt: new Date().toISOString() 
            };
            setCurrentProduct(updated);
            onUpdate(updated);
        }, 500);
    }, [currentProduct, onUpdate]);

    // Image handling
    const saveImagesToSession = (images: string[]) => {
        sessionStorage.setItem(`product-images-${currentProduct.id}`, JSON.stringify(images));
    };

    const handleImageUpload = (files: FileList | null) => {
        if (!files) return;
        
        Array.from(files).forEach(file => {
            if (!file.type.startsWith('image/')) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                if (result) {
                    const newImages = [...uploadedImages, result];
                    setUploadedImages(newImages);
                    saveImagesToSession(newImages);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleImageUpload(e.dataTransfer.files);
    };

    const removeImage = (index: number) => {
        const newImages = uploadedImages.filter((_, i) => i !== index);
        setUploadedImages(newImages);
        saveImagesToSession(newImages);
    };

    const execCommand = (command: string, value: string = '') => {
        // Save selection before executing command
        const selection = window.getSelection();
        const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
        
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        
        // Restore selection if needed
        if (range && selection) {
            selection.removeAllRanges();
            selection.addRange(range);
        }
        
        handleContentChange();
        
        // Update active formats immediately
        setTimeout(() => {
            const formats = [];
            if (document.queryCommandState('bold')) formats.push('bold');
            if (document.queryCommandState('italic')) formats.push('italic');
            if (document.queryCommandState('underline')) formats.push('underline');
            setActiveFormats(formats);
        }, 0);
    };

    // Auto-link URLs in content
    const autoLinkUrls = (text: string): string => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">$1</a>');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
            e.preventDefault();
            execCommand('bold');
        } else if ((e.metaKey || e.ctrlKey) && e.key === 'i') {
            e.preventDefault();
            execCommand('italic');
        } else if ((e.metaKey || e.ctrlKey) && e.key === 'u') {
            e.preventDefault();
            execCommand('underline');
        } else if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
            e.preventDefault();
            execCommand('undo');
        } else if ((e.metaKey || e.ctrlKey) && e.key === 'y') {
            e.preventDefault();
            execCommand('redo');
        }
    };

    const processEditRequest = async (input: string) => {
        const lowerInput = input.toLowerCase();
        const currentContent = currentProduct.content;
        let responseText = '';
        let updatedContent = currentContent;
        
        // Simulate processing time based on content length
        const processingTime = Math.min(800 + currentContent.length * 2, 2000);
        await new Promise(r => setTimeout(r, processingTime));
        
        if (lowerInput.includes('shorter') || lowerInput.includes('concise')) {
            responseText = 'Tightened the copy by removing filler words and condensing ideas.';
            // Actually shorten the content
            const sentences = currentContent.split(/[.!?]+/).filter(s => s.trim());
            if (sentences.length > 1) {
                // Keep first 60% of sentences
                updatedContent = sentences.slice(0, Math.max(1, Math.ceil(sentences.length * 0.6))).map(s => s.trim()).join('. ') + '.';
            } else {
                // If only one sentence, remove filler words
                updatedContent = currentContent
                    .replace(/\b(very|really|quite|rather|just|actually|basically|literally)\b/gi, '')
                    .replace(/\s+/g, ' ')
                    .trim();
            }
        } else if (lowerInput.includes('longer') || lowerInput.includes('expand')) {
            responseText = 'Added supporting details and context to strengthen the narrative.';
            const expansions: Record<string, string> = {
                'x-post': '\n\nThis is a significant milestone that reflects the hard work of our entire team.',
                'linkedin-post': '\n\nOver the past year, we\'ve listened to your feedback and worked tirelessly to deliver value. This achievement represents not just our success, but the trust you\'ve placed in us. Thank you for being part of this journey.',
                'instagram-post': '\n\nSwipe to see more behind-the-scenes moments from this incredible journey. 💫',
                'default': '\n\nWe believe this represents an important step forward in our mission to deliver exceptional value to our customers and community.'
            };
            updatedContent = currentContent + (expansions[currentProduct.type] || expansions.default);
        } else if (lowerInput.includes('professional') || lowerInput.includes('formal')) {
            responseText = 'Elevated the tone with more precise language and structure.';
            // Transform to professional tone
            updatedContent = currentContent
                .replace(/\b(great|awesome|cool|nice|good)\b/gi, 'exceptional')
                .replace(/\b(get|got)\b/gi, 'obtain')
                .replace(/\b(big|huge)\b/gi, 'significant')
                .replace(/\b(we're|we are)\b/gi, 'we are')
                .replace(/!{2,}/g, '.')
                .replace(/\?/g, '.');
        } else if (lowerInput.includes('casual') || lowerInput.includes('friendly')) {
            responseText = 'Relaxed the tone to feel more conversational and approachable.';
            // Transform to casual tone
            updatedContent = currentContent
                .replace(/\b(exceptional|outstanding|remarkable)\b/gi, 'great')
                .replace(/\b(obtain|acquire|secure)\b/gi, 'get')
                .replace(/\b(significant|substantial)\b/gi, 'big')
                .replace(/\.(\s+)(?=[A-Z])/g, '!$1')
                .replace(/we are\b/gi, "we're");
        } else if (lowerInput.includes('call-to-action') || lowerInput.includes('cta')) {
            responseText = 'Added a clear call-to-action to drive engagement.';
            const ctas: Record<string, string> = {
                'x-post': ' What do you think? Let us know below! 👇',
                'linkedin-post': '\n\nLearn more about what this means for you: [link in comments]',
                'instagram-post': '\n\nTap the link in bio to learn more ✨',
                'default': '\n\nReady to learn more? Get in touch today.'
            };
            updatedContent = currentContent + (ctas[currentProduct.type] || ctas.default);
        } else {
            responseText = 'Made the requested adjustments to your content.';
        }
        
        return { responseText, updatedContent };
    };

    const handleSendMessage = async () => {
        if (!chatInput.trim() || isProcessing) return;
        
        const inputText = chatInput; // Capture before clearing
        
        const userMessage: ChatMessage = {
            id: Date.now(),
            role: 'user',
            content: inputText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        
        setChatMessages(prev => [...prev, userMessage]);
        setChatInput('');
        setIsProcessing(true);
        
        try {
            const { responseText, updatedContent } = await processEditRequest(inputText);
            
            // Apply changes if content was modified
            if (updatedContent !== currentProduct.content && editorRef.current) {
                editorRef.current.innerHTML = formatContentToHTML(updatedContent);
                const updated = { 
                    ...currentProduct, 
                    content: updatedContent, 
                    updatedAt: new Date().toISOString() 
                };
                setCurrentProduct(updated);
                setWordCount(updatedContent.split(/\s+/).filter(w => w.length > 0).length);
                setCharCount(updatedContent.length);
                onUpdate(updated);
            }
            
            const agentMsg: ChatMessage = {
                id: Date.now() + 1,
                role: 'agent',
                content: responseText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            
            setChatMessages(prev => [...prev, agentMsg]);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleQuickAction = (action: string) => {
        if (isProcessing) return;
        setChatInput(action);
        // Use requestAnimationFrame instead of setTimeout for smoother flow
        requestAnimationFrame(() => {
            handleSendMessage();
        });
    };

    const handlePublish = async () => {
        setIsPublishing(true);
        await new Promise(r => setTimeout(r, 2000));
        
        const updated = { 
            ...currentProduct, 
            status: 'published' as const, 
            channel: selectedChannels.join(', ')
        };
        setCurrentProduct(updated);
        onUpdate(updated);
        
        setIsPublishing(false);
        setPublishComplete(true);
        
        setTimeout(() => {
            setShowPublishDialog(false);
            setPublishComplete(false);
            setSelectedChannels([]);
        }, 2000);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(currentProduct.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const typeConfig = OUTPUT_TYPES.find(t => t.id === currentProduct.type);

    const ToolbarButton = ({ 
        onClick, 
        icon: Icon, 
        title, 
        isActive = false 
    }: { 
        onClick: () => void; 
        icon: React.ElementType; 
        title: string; 
        isActive?: boolean;
    }) => (
        <button
            onClick={onClick}
            className={`p-2 rounded-lg transition-colors ${
                isActive 
                    ? 'bg-teal-600 text-white' 
                    : 'hover:bg-teal-50 text-teal-600'
            }`}
            title={title}
        >
            <Icon size={16} />
        </button>
    );

    return (
        <div className="h-full flex flex-col bg-[#FAF9F6]">
            {/* Header with Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-black/[0.06] bg-white flex-shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={onClose} className="p-2 hover:bg-black/[0.04] rounded-lg transition-colors">
                        <HugeiconsIcon icon={ArrowLeft01Icon} size={18} className="text-black/40" />
                    </button>
                    <div className="h-4 w-px bg-black/10" />
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            {typeConfig && <HugeiconsIcon icon={typeConfig.icon} size={14} />}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                {isEditingTitle ? (
                                    <input
                                        type="text"
                                        value={titleValue}
                                        onChange={(e) => setTitleValue(e.target.value)}
                                        onBlur={() => {
                                            setIsEditingTitle(false);
                                            if (titleValue.trim() && titleValue !== currentProduct.title) {
                                                const updated = { 
                                                    ...currentProduct, 
                                                    title: titleValue.trim(),
                                                    updatedAt: new Date().toISOString() 
                                                };
                                                setCurrentProduct(updated);
                                                onUpdate(updated);
                                                // Also update in quest products storage
                                                const questId = (currentProduct as any).questId;
                                                if (questId) {
                                                    const storageKey = `quest_products_${questId}`;
                                                    const stored = sessionStorage.getItem(storageKey);
                                                    if (stored) {
                                                        const products = JSON.parse(stored);
                                                        const updatedProducts = products.map((p: ProductOutput) => 
                                                            p.id === currentProduct.id ? { ...p, title: titleValue.trim() } : p
                                                        );
                                                        sessionStorage.setItem(storageKey, JSON.stringify(updatedProducts));
                                                    }
                                                }
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.currentTarget.blur();
                                            } else if (e.key === 'Escape') {
                                                setTitleValue(currentProduct.title);
                                                setIsEditingTitle(false);
                                            }
                                        }}
                                        autoFocus
                                        className="text-[14px] font-medium px-2 py-1 -ml-2 border border-black/20 rounded outline-none focus:border-black"
                                    />
                                ) : (
                                    <button
                                        onClick={() => setIsEditingTitle(true)}
                                        className="text-[14px] font-medium hover:bg-black/[0.04] px-2 py-1 -ml-2 rounded transition-colors"
                                        title="Click to edit title"
                                    >
                                        {currentProduct.title}
                                    </button>
                                )}
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
                                    currentProduct.status === 'published' 
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                        : currentProduct.status === 'ready'
                                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                                        : 'bg-amber-50 text-amber-700 border-amber-200'
                                }`}>
                                    {currentProduct.status.charAt(0).toUpperCase() + currentProduct.status.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Toolbar - merged into header */}
                    <div className="h-6 w-px bg-black/10 mx-1" />
                    <div className="flex items-center gap-0.5">
                        <ToolbarButton 
                            onClick={() => execCommand('bold')} 
                            icon={Bold} 
                            title="Bold (Ctrl+B)" 
                            isActive={activeFormats.includes('bold')}
                        />
                        <ToolbarButton 
                            onClick={() => execCommand('italic')} 
                            icon={Italic} 
                            title="Italic (Ctrl+I)" 
                            isActive={activeFormats.includes('italic')}
                        />
                        <ToolbarButton 
                            onClick={() => execCommand('underline')} 
                            icon={Underline} 
                            title="Underline (Ctrl+U)" 
                            isActive={activeFormats.includes('underline')}
                        />
                        <div className="w-px h-4 bg-black/10 mx-1" />
                        <ToolbarButton 
                            onClick={() => execCommand('justifyLeft')} 
                            icon={AlignLeft} 
                            title="Align Left" 
                            isActive={activeFormats.includes('justifyLeft')}
                        />
                        <ToolbarButton 
                            onClick={() => execCommand('justifyCenter')} 
                            icon={AlignCenter} 
                            title="Align Center" 
                            isActive={activeFormats.includes('justifyCenter')}
                        />
                        <ToolbarButton 
                            onClick={() => execCommand('justifyRight')} 
                            icon={AlignRight} 
                            title="Align Right" 
                            isActive={activeFormats.includes('justifyRight')}
                        />
                        <div className="w-px h-4 bg-black/10 mx-1" />
                        <ToolbarButton 
                            onClick={() => execCommand('insertUnorderedList')} 
                            icon={List} 
                            title="Bullet List" 
                            isActive={activeFormats.includes('insertUnorderedList')}
                        />
                        <ToolbarButton 
                            onClick={() => execCommand('insertOrderedList')} 
                            icon={ListOrdered} 
                            title="Numbered List" 
                            isActive={activeFormats.includes('insertOrderedList')}
                        />
                        <div className="w-px h-4 bg-black/10 mx-1" />
                        <ToolbarButton 
                            onClick={() => { 
                                const url = prompt('Enter URL:'); 
                                if (url) execCommand('createLink', url); 
                            }} 
                            icon={Link} 
                            title="Insert Link" 
                        />
                        <ToolbarButton onClick={() => execCommand('undo')} icon={Undo} title="Undo (Ctrl+Z)" />
                        <ToolbarButton onClick={() => execCommand('redo')} icon={Redo} title="Redo (Ctrl+Y)" />
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <button onClick={copyToClipboard} className="flex items-center gap-2 px-3 py-2 text-[12px] font-medium text-black/70 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors">
                        {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 text-[12px] font-medium text-black/70 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors">
                        <Download size={14} />
                        Export
                    </button>
                    <button 
                        onClick={() => setShowPublishDialog(true)}
                        disabled={currentProduct.status === 'published'}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-[12px] font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <HugeiconsIcon icon={Upload01Icon} size={14} />
                        {currentProduct.status === 'published' ? 'Published' : 'Publish'}
                    </button>
                </div>
            </div>

            {/* Content - Split View */}
            <div className="flex-1 flex overflow-hidden min-h-0">
                {/* Left: Editor */}
                <div className="flex-1 overflow-y-auto min-h-0 bg-[#F0F2F5]">
                    {currentProduct.type === 'instagram-post' ? (
                        /* InstagramIcon Preview Editor */
                        <div className="max-w-md mx-auto px-4 py-8">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => handleImageUpload(e.target.files)}
                                className="hidden"
                            />
                            <div className="bg-white rounded-xl shadow-sm border border-black/[0.08] overflow-hidden">
                                {/* InstagramIcon Header */}
                                <div className="flex items-center gap-3 px-4 py-3 border-b border-black/[0.06]">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-[2px]">
                                        <div className="w-full h-full rounded-full bg-white p-[2px]">
                                            <div className="w-full h-full rounded-full bg-gray-200" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[13px] font-semibold">yourbrand</p>
                                        <p className="text-[11px] text-black/50">Original audio</p>
                                    </div>
                                    <MoreHorizontal size={20} className="text-black/60" />
                                </div>
                                
                                {/* InstagramIcon Image Area */}
                                {uploadedImages.length > 0 ? (
                                    <div className="relative aspect-square">
                                        <img src={uploadedImages[0]} alt="" className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => removeImage(0)}
                                            className="absolute top-2 right-2 p-2 bg-teal-600/80 hover:bg-teal-600 text-white rounded-full transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    /* InstagramIcon Drag & Drop Zone */
                                    <div
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`aspect-square flex items-center justify-center cursor-pointer transition-all ${
                                            isDragging 
                                                ? 'bg-purple-50 border-2 border-dashed border-purple-500' 
                                                : 'bg-gradient-to-br from-gray-100 to-gray-200'
                                        }`}
                                    >
                                        <div className="text-center">
                                            <HugeiconsIcon icon={InstagramIcon} size={48} className={`mx-auto mb-2 transition-colors ${isDragging ? 'text-purple-500' : 'text-black/20'}`} />
                                            <p className={`text-[13px] ${isDragging ? 'text-purple-600' : 'text-black/40'}`}>
                                                {isDragging ? 'Drop photo here' : 'Tap or drag to add photo'}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                
                                {/* InstagramIcon Actions */}
                                <div className="flex items-center justify-between px-4 py-3">
                                    <div className="flex items-center gap-4">
                                        <Heart size={24} className="text-black" />
                                        <MessageCircle size={24} className="text-black" />
                                        <Send size={24} className="text-black rotate-12" />
                                    </div>
                                    <Bookmark size={24} className="text-black" />
                                </div>
                                
                                {/* InstagramIcon Caption (Editable) */}
                                <div className="px-4 pb-4">
                                    <div className="flex items-start gap-2">
                                        <span className="text-[13px] font-semibold flex-shrink-0">yourbrand</span>
                                        <div
                                            ref={editorRef}
                                            contentEditable
                                            suppressContentEditableWarning
                                            onInput={handleContentChange}
                                            onKeyDown={handleKeyDown}
                                            className="flex-1 text-[13px] leading-relaxed outline-none min-h-[20px] [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-black/30"
                                            data-placeholder="Write a caption..."
                                        />
                                    </div>
                                    <p className="text-[11px] text-black/40 mt-1">{new Date().toLocaleDateString()}</p>
                                </div>
                            </div>
                            
                            <div className="mt-4 text-center text-[12px] text-black/40">
                                {charCount} characters
                            </div>
                        </div>
                    ) : currentProduct.type === 'x-post' ? (
                        /* X (Twitter) Preview Editor */
                        <div className="max-w-xl mx-auto px-4 py-8">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => handleImageUpload(e.target.files)}
                                className="hidden"
                            />
                            <div className="bg-white border border-black/[0.08] rounded-xl shadow-sm">
                                {/* X Compose Header */}
                                <div className="flex items-center justify-between px-4 py-3 border-b border-black/[0.06]">
                                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                                    <button className="px-4 py-1.5 bg-teal-600 text-white text-[13px] font-medium rounded-full opacity-50">
                                        Post
                                    </button>
                                </div>
                                
                                {/* X Compose Area */}
                                <div className="p-4">
                                    <div className="flex gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0" />
                                        <div className="flex-1">
                                            <div
                                                ref={editorRef}
                                                contentEditable
                                                suppressContentEditableWarning
                                                onInput={handleContentChange}
                                                onKeyDown={handleKeyDown}
                                                onMouseUp={() => {
                                                    // Update active formats on selection change
                                                    setTimeout(() => {
                                                        const formats = [];
                                                        if (document.queryCommandState('bold')) formats.push('bold');
                                                        if (document.queryCommandState('italic')) formats.push('italic');
                                                        if (document.queryCommandState('underline')) formats.push('underline');
                                                        setActiveFormats(formats);
                                                    }, 0);
                                                }}
                                                className="text-[17px] leading-relaxed outline-none min-h-[80px] [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-black/30"
                                                data-placeholder="What is happening?!"
                                            />
                                            
                                            {/* Uploaded Images Grid */}
                                            {uploadedImages.length > 0 && (
                                                <div className={`grid gap-2 mt-3 ${uploadedImages.length === 1 ? 'grid-cols-1' : uploadedImages.length === 2 ? 'grid-cols-2' : 'grid-cols-2'}`}>
                                                    {uploadedImages.map((img, idx) => (
                                                        <div key={idx} className={`relative group rounded-xl overflow-hidden ${uploadedImages.length === 1 ? 'aspect-video' : 'aspect-square'}`}>
                                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                                            <button
                                                                onClick={() => removeImage(idx)}
                                                                className="absolute top-2 right-2 p-1.5 bg-teal-600/80 hover:bg-teal-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-colors"
                                                            >
                                                                <X size={14} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            
                                            {/* Drag & Drop Zone */}
                                            {uploadedImages.length === 0 && (
                                                <div
                                                    onDragOver={handleDragOver}
                                                    onDragLeave={handleDragLeave}
                                                    onDrop={handleDrop}
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className={`mt-3 aspect-video rounded-xl border-2 border-dashed cursor-pointer transition-all flex items-center justify-center ${
                                                        isDragging 
                                                            ? 'border-blue-500 bg-blue-50' 
                                                            : 'border-black/20 hover:border-black/40 bg-gray-50'
                                                    }`}
                                                >
                                                    <div className="text-center">
                                                        <ImageIcon size={32} className={`mx-auto mb-2 transition-colors ${isDragging ? 'text-blue-500' : 'text-black/30'}`} />
                                                        <p className={`text-[13px] ${isDragging ? 'text-blue-600' : 'text-black/50'}`}>
                                                            {isDragging ? 'Drop images here' : 'Drag photos or click to add'}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* X Reply Settings */}
                                            <div className="flex items-center gap-1 text-blue-500 mt-3">
                                                <HugeiconsIcon icon={GlobalIcon} size={14} />
                                                <span className="text-[13px] font-medium">Everyone can reply</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* X Toolbar */}
                                <div className="flex items-center justify-between px-4 py-3 border-t border-black/[0.06]">
                                    <div className="flex items-center gap-1">
                                        <button 
                                            onClick={() => fileInputRef.current?.click()}
                                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                                        >
                                            <ImageIcon size={20} />
                                        </button>
                                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                                            <Gift size={20} />
                                        </button>
                                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                                            <List size={20} />
                                        </button>
                                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                                            <Smile size={20} />
                                        </button>
                                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                                            <Clock size={20} />
                                        </button>
                                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                                            <MapPin size={20} />
                                        </button>
                                    </div>
                                    
                                    {/* Character Count */}
                                    <div className="flex items-center gap-3">
                                        {charCount > 0 && (
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                                charCount > 280 ? 'border-red-500' : charCount > 250 ? 'border-yellow-500' : 'border-blue-500'
                                            }`}>
                                                <span className={`text-[10px] font-medium ${
                                                    charCount > 280 ? 'text-red-500' : 'text-black/60'
                                                }`}>
                                                    {280 - charCount}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-4 text-center text-[12px] text-black/40">
                                {charCount}/280 characters • {uploadedImages.length} image{uploadedImages.length !== 1 ? 's' : ''}
                            </div>
                        </div>
                    ) : currentProduct.type === 'linkedin-post' ? (
                        /* LinkedIn Preview Editor */
                        <div className="max-w-xl mx-auto px-4 py-8">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => handleImageUpload(e.target.files)}
                                className="hidden"
                            />
                            <div className="bg-white border border-black/[0.08] rounded-xl shadow-sm">
                                {/* LinkedIn Header */}
                                <div className="flex items-center gap-3 px-4 py-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800" />
                                    <div className="flex-1">
                                        <p className="text-[14px] font-semibold text-black">Your Name</p>
                                        <p className="text-[12px] text-black/60">Product Marketing at Company</p>
                                        <div className="flex items-center gap-1 text-[12px] text-black/50">
                                            <span>Just now</span>
                                            <span>•</span>
                                            <HugeiconsIcon icon={GlobalIcon} size={12} />
                                        </div>
                                    </div>
                                </div>
                                
                                {/* LinkedIn Editor */}
                                <div className="px-4 pb-4">
                                    <div
                                        ref={editorRef}
                                        contentEditable
                                        suppressContentEditableWarning
                                        onInput={handleContentChange}
                                        onKeyDown={handleKeyDown}
                                        onMouseUp={() => {
                                            // Update active formats on selection change
                                            setTimeout(() => {
                                                const formats = [];
                                                if (document.queryCommandState('bold')) formats.push('bold');
                                                if (document.queryCommandState('italic')) formats.push('italic');
                                                if (document.queryCommandState('underline')) formats.push('underline');
                                                setActiveFormats(formats);
                                            }, 0);
                                        }}
                                        className="text-[14px] leading-relaxed outline-none min-h-[100px] [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-black/30"
                                        data-placeholder="What do you want to talk about?"
                                    />
                                </div>
                                
                                {/* LinkedIn Hashtag Suggestion */}
                                <div className="px-4 pb-3">
                                    <button className="text-[14px] text-blue-600 font-medium hover:underline">
                                        Add hashtag
                                    </button>
                                </div>
                                
                                {/* LinkedIn Images */}
                                {uploadedImages.length > 0 ? (
                                    <div className="mx-4 mb-4">
                                        <div className={`grid gap-2 ${uploadedImages.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                            {uploadedImages.map((img, idx) => (
                                                <div key={idx} className={`relative group rounded-lg overflow-hidden ${uploadedImages.length === 1 ? 'aspect-video' : 'aspect-square'}`}>
                                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                                    <button
                                                        onClick={() => removeImage(idx)}
                                                        className="absolute top-2 right-2 p-1.5 bg-teal-600/80 hover:bg-teal-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-colors"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    /* LinkedIn Drag & Drop Zone */
                                    <div
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`mx-4 mb-4 aspect-video rounded-lg border-2 border-dashed cursor-pointer transition-all flex items-center justify-center ${
                                            isDragging 
                                                ? 'border-blue-500 bg-blue-50' 
                                                : 'border-black/20 hover:border-black/40 bg-gradient-to-br from-gray-100 to-gray-200'
                                        }`}
                                    >
                                        <div className="text-center">
                                            <ImageIcon size={32} className={`mx-auto mb-2 transition-colors ${isDragging ? 'text-blue-500' : 'text-black/30'}`} />
                                            <p className={`text-[13px] ${isDragging ? 'text-blue-600' : 'text-black/50'}`}>
                                                {isDragging ? 'Drop images here' : 'Drag photos or click to add'}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                
                                {/* LinkedIn Actions */}
                                <div className="flex items-center justify-between px-4 py-3 border-t border-black/[0.06]">
                                    <div className="flex items-center gap-1">
                                        <button 
                                            onClick={() => fileInputRef.current?.click()}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
                                        >
                                            <ImageIcon size={20} />
                                            <span className="text-[13px] font-medium">Media</span>
                                        </button>
                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2">
                                            <Calendar size={20} />
                                            <span className="text-[13px] font-medium">Event</span>
                                        </button>
                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2">
                                            <FileText size={20} />
                                            <span className="text-[13px] font-medium">Write article</span>
                                        </button>
                                    </div>
                                </div>
                                
                                {/* LinkedIn Footer */}
                                <div className="flex items-center justify-between px-4 py-3 border-t border-black/[0.06]">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-200" />
                                        <button className="flex items-center gap-1 text-[13px] text-black/60 hover:bg-black/[0.04] px-2 py-1 rounded-lg transition-colors">
                                            <HugeiconsIcon icon={GlobalIcon} size={14} />
                                            <span>Anyone</span>
                                            <ChevronDown size={14} />
                                        </button>
                                    </div>
                                    <button className="px-4 py-1.5 bg-teal-600 text-white text-[13px] font-medium rounded-full opacity-50">
                                        Post
                                    </button>
                                </div>
                            </div>
                            
                            <div className="mt-4 text-center text-[12px] text-black/40">
                                {charCount} characters • {uploadedImages.length} image{uploadedImages.length !== 1 ? 's' : ''}
                            </div>
                        </div>
                    ) : (
                        /* Standard Editor for other types */
                        <div className="max-w-3xl mx-auto px-8 py-8 bg-[#FAF9F6] min-h-full">
                            <div className="flex items-center gap-3 mb-6 text-[11px] text-black/40">
                                <span className="px-2 py-1 bg-gray-100 rounded-full">{typeConfig?.label}</span>
                                <span>•</span>
                                <span>{new Date(currentProduct.createdAt).toLocaleDateString()}</span>
                            </div>
                            
                            <div
                                ref={editorRef}
                                contentEditable
                                suppressContentEditableWarning
                                onInput={handleContentChange}
                                onKeyDown={handleKeyDown}
                                onMouseUp={() => {
                                    // Update active formats on click/selection
                                    setTimeout(() => {
                                        const formats = [];
                                        if (document.queryCommandState('bold')) formats.push('bold');
                                        if (document.queryCommandState('italic')) formats.push('italic');
                                        if (document.queryCommandState('underline')) formats.push('underline');
                                        if (document.queryCommandState('justifyLeft')) formats.push('justifyLeft');
                                        if (document.queryCommandState('justifyCenter')) formats.push('justifyCenter');
                                        if (document.queryCommandState('justifyRight')) formats.push('justifyRight');
                                        if (document.queryCommandState('insertUnorderedList')) formats.push('insertUnorderedList');
                                        if (document.queryCommandState('insertOrderedList')) formats.push('insertOrderedList');
                                        setActiveFormats(formats);
                                    }, 0);
                                }}
                                className="min-h-[400px] text-[16px] leading-[1.8] outline-none font-serif [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-black/30"
                                data-placeholder="Start writing..."
                            />
                            
                            <div className="mt-8 pt-6 border-t border-black/[0.06] flex items-center justify-between">
                                <div className="text-[12px] text-black/40">
                                    {wordCount} words • {charCount} characters
                                </div>
                                <div className="text-[12px] text-black/40">
                                    Saved {new Date(currentProduct.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Editor */}
                <div className="w-80 flex flex-col bg-[#FAF9F6] border-l border-black/[0.06] flex-shrink-0">


                    {/* Quest Context - Distinct Section */}
                    <div className="bg-gray-50/50 border-b border-black/[0.08]">
                        {/* Quest Docs - Half Height with Scroll */}
                        {(workingDocs.length > 0 || attachedDocs.length > 0) && (
                            <div className="px-4 py-3 border-b border-black/[0.06]">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">

                                        <span className="text-[13px] font-medium text-teal-900">Quest docs</span>
                                    </div>
                                    <span className="text-[11px] px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full">{workingDocs.length + attachedDocs.length}</span>
                                </div>
                                <div className="max-h-[120px] overflow-y-auto space-y-1 pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                                    {workingDocs.map(doc => (
                                        <button
                                            key={doc.id}
                                            onClick={() => {
                                                const mention = `@${doc.title.replace(/\s+/g, '')} `;
                                                setChatInput(prev => prev + mention);
                                                chatInputRef.current?.focus();
                                            }}
                                            className="w-full flex items-center gap-2 px-2 py-1.5 text-left hover:bg-white rounded-lg transition-colors group border border-transparent hover:border-black/5"
                                        >
                                            <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                <HugeiconsIcon icon={File01Icon} size={12} className="text-blue-600" />
                                            </div>
                                            <span className="text-[12px] text-black/70 truncate group-hover:text-teal-700">{doc.title}</span>
                                        </button>
                                    ))}
                                    {attachedDocs.map(doc => (
                                        <button
                                            key={doc.id}
                                            onClick={() => {
                                                const mention = `@${doc.name.replace(/\s+/g, '')} `;
                                                setChatInput(prev => prev + mention);
                                                chatInputRef.current?.focus();
                                            }}
                                            className="w-full flex items-center gap-2 px-2 py-1.5 text-left hover:bg-white rounded-lg transition-colors group border border-transparent hover:border-black/5"
                                        >
                                            <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                <HugeiconsIcon icon={FILE_ICONS[doc.fileType] || File02Icon} size={12} className="text-gray-600" />
                                            </div>
                                            <span className="text-[12px] text-black/70 truncate group-hover:text-teal-700">{doc.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Brand Assets - Distinct Section */}
                        <div className="px-4 py-3 bg-gradient-to-br from-amber-50 via-amber-50/70 to-white">
                            <div className="flex items-center gap-2 mb-2">

                                <span className="text-[13px] font-medium text-amber-900">Brand context</span>
                                <span className="text-[10px] px-2 py-0.5 bg-amber-200 text-amber-800 rounded-full font-medium">Enabled</span>
                            </div>

                            <p className="text-[11px] text-amber-700/60 mt-2 leading-relaxed">
                                Your brand voice, key messaging, and recent announcements.
                            </p>
                        </div>
                        
                    </div>


                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                        {chatMessages.map((msg) => (
                            <div key={msg.id} className="space-y-1">
                                <div className={`text-[12px] ${msg.role === 'user' ? 'text-right' : ''}`}>
                                    <span className="text-black/40">
                                        {msg.role === 'user' ? 'You' : 'Teal'}
                                    </span>
                                </div>
                                <div className={`text-[14px] leading-relaxed font-serif ${
                                    msg.role === 'user' ? 'text-right text-black/70' : 'text-black'
                                }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isProcessing && (
                            <div className="space-y-1">
                                <div className="text-[12px] text-black/40">Teal</div>
                                <div className="flex items-center gap-2 text-black/50 font-serif">
                                    <span className="w-1 h-1 bg-black/30 rounded-full animate-bounce" />
                                    <span className="w-1 h-1 bg-black/30 rounded-full animate-bounce [animation-delay:0.1s]" />
                                    <span className="w-1 h-1 bg-black/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Quick Actions */}
                    <div className="px-4 py-3 border-t border-black/[0.06]">
                        <div className="flex flex-wrap gap-2">
                            {QUICK_ACTIONS.map((action) => (
                                <button
                                    key={action}
                                    onClick={() => handleQuickAction(action)}
                                    disabled={isProcessing}
                                    className="px-3 py-1.5 bg-white border border-black/[0.08] hover:border-black/20 rounded-full text-[12px] text-black/70 transition-colors disabled:opacity-50"
                                >
                                    {action}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-black/[0.06]">
                        <div className="relative">
                            <input
                                ref={chatInputRef}
                                type="text"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Ask Also to edit..."
                                disabled={isProcessing}
                                className="w-full text-[14px] font-serif pl-0 pr-10 py-2 bg-transparent border-b border-black/[0.08] focus:border-black/30 outline-none transition-colors placeholder:text-black/30 placeholder:font-sans disabled:opacity-50"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!chatInput.trim() || isProcessing}
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-[12px] text-black/60 hover:text-black transition-colors disabled:opacity-30"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Publish Dialog */}
            <AnimatePresence>
                {showPublishDialog && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-xl w-full max-w-sm overflow-hidden"
                        >
                            <div className="px-4 py-3 border-b border-black/[0.06] flex items-center justify-between">
                                <h3 className="text-[15px] font-medium">Select channels</h3>
                                <button onClick={() => setShowPublishDialog(false)} className="p-1.5 hover:bg-black/[0.04] rounded-lg transition-colors">
                                    <X size={16} className="text-black/40" />
                                </button>
                            </div>
                            
                            <div className="p-4">
                                <AnimatePresence mode="wait">
                                    {publishComplete ? (
                                        <motion.div 
                                            key="success"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-center py-8"
                                        >
                                            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Check size={24} className="text-emerald-600" />
                                            </div>
                                            <h4 className="text-[16px] font-medium mb-1">Published!</h4>
                                            <p className="text-[13px] text-black/50">Content is now live</p>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="channels" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <div className="space-y-1.5 mb-4 max-h-60 overflow-y-auto">
                                                {PUBLISH_CHANNELS.map((channel) => (
                                                    <button
                                                        key={channel.id}
                                                        onClick={() => {
                                                            if (!channel.connected) return;
                                                            setSelectedChannels(prev => 
                                                                prev.includes(channel.id)
                                                                    ? prev.filter(id => id !== channel.id)
                                                                    : [...prev, channel.id]
                                                            );
                                                        }}
                                                        disabled={!channel.connected}
                                                        className={`w-full flex items-center gap-3 p-2.5 rounded-lg border transition-all text-left ${
                                                            selectedChannels.includes(channel.id)
                                                                ? 'bg-gray-50 border-black/20'
                                                                : channel.connected
                                                                    ? 'bg-white border-black/[0.06] hover:border-black/10'
                                                                    : 'bg-gray-50 border-transparent opacity-50 cursor-not-allowed'
                                                        }`}
                                                    >
                                                        {selectedChannels.includes(channel.id) && <HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} className="text-teal-600 flex-shrink-0" />}
                                                        <div className="p-1.5 bg-gray-50 rounded-md"><HugeiconsIcon icon={channel.icon} size={16} /></div>
                                                        <div className="flex-1"><p className="text-[13px]">{channel.label}</p></div>
                                                        {!channel.connected && <span className="text-[11px] text-black/40">Connect</span>}
                                                    </button>
                                                ))}
                                            </div>
                                            
                                            <button
                                                onClick={handlePublish}
                                                disabled={selectedChannels.length === 0 || isPublishing}
                                                className="w-full flex items-center justify-center gap-2 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50"
                                            >
                                                {isPublishing ? (
                                                    <><HugeiconsIcon icon={Loading03Icon} size={14} className="animate-spin" /> Publishing...</>
                                                ) : (
                                                    <><HugeiconsIcon icon={Upload01Icon} size={14} /> Publish {selectedChannels.length > 0 && `(${selectedChannels.length})`}</>
                                                )}
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
