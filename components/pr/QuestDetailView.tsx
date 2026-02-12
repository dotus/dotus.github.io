import React, { useState, useEffect, useRef } from 'react';
import { 
    FileText, FileSpreadsheet, Image as ImageIcon, Link2, 
    Download, Upload, Plus, Clock, 
    History, CheckCircle2, Flame, ChevronDown,
    ChevronLeft, Mail, Copy, Calendar, Edit3,
    X, Users
} from 'lucide-react';
import { Quest } from './StatsOverview';
import { ProductSection } from './ProductSection';

interface AttachedDoc {
    id: number;
    name: string;
    fileType: 'doc' | 'sheet' | 'slide' | 'pdf' | 'image' | 'link';
    size?: string;
    source?: string;
    uploadedAt: string;
    uploadedBy: string;
}

interface WorkingDoc {
    id: number;
    title: string;
    type: 'doc' | 'sheet' | 'slide';
    lastEdited: string;
}

interface TimelineEvent {
    id: number;
    type: 'embargo' | 'publish' | 'event' | 'custom' | 'deadline' | 'launch';
    title: string;
    date: string;
    time?: string;
}

interface Comment {
    id: number;
    user: string;
    userInitial: string;
    role: string;
    text: string;
    time: string;
}

interface Version {
    id: number;
    version: string;
    author: string;
    date: string;
    changes: string;
}

const MOCK_WORKING_DOCS: WorkingDoc[] = [
    { id: 1, title: 'Series B Press Release', type: 'doc', lastEdited: '2h ago' },
    { id: 2, title: 'Q1 Messaging Framework', type: 'slide', lastEdited: '1d ago' },
    { id: 3, title: 'Media Contact List', type: 'sheet', lastEdited: '3d ago' },
];

const MOCK_ATTACHED: AttachedDoc[] = [
    { id: 4, name: 'Investor Fact Sheet.pdf', fileType: 'pdf', size: '1.2 MB', source: 'Dropbox', uploadedAt: '1d ago', uploadedBy: 'Sarah' },
    { id: 5, name: 'Founder Headshots', fileType: 'image', source: 'Google Drive', uploadedAt: '2d ago', uploadedBy: 'John' },
    { id: 6, name: 'A16Z Guidelines', fileType: 'link', source: 'Notion', uploadedAt: '4d ago', uploadedBy: 'Sarah' },
    { id: 7, name: 'Term Sheet v3.pdf', fileType: 'pdf', size: '450 KB', uploadedAt: '1w ago', uploadedBy: 'Mike' },
];

const MOCK_COMMENTS: Comment[] = [
    { id: 1, user: 'Sarah Jenkins', userInitial: 'S', role: 'Partner', text: 'The quote from the CTO is strong. Should we include something about engineering culture?', time: '2h ago' },
    { id: 2, user: 'Mike Chen', userInitial: 'M', role: 'Editor', text: 'Embargo confirmed with TechCrunch. 24hr exclusive.', time: '4h ago' },
];

const MOCK_VERSIONS: Version[] = [
    { id: 1, version: 'v2.1', author: 'Mithil', date: '2h ago', changes: 'Added CTO quote' },
    { id: 2, version: 'v2.0', author: 'Sarah', date: 'Yesterday', changes: 'Major rewrite' },
    { id: 3, version: 'v1.2', author: 'Mithil', date: '3d ago', changes: 'Initial draft' },
];

const FILE_ICONS: Record<string, React.ReactNode> = {
    doc: <FileText size={18} className="text-blue-600" />,
    sheet: <FileSpreadsheet size={18} className="text-green-600" />,
    slide: <FileText size={18} className="text-orange-600" />,
    pdf: <FileText size={18} className="text-red-600" />,
    image: <ImageIcon size={18} className="text-purple-600" />,
    link: <Link2 size={18} className="text-gray-600" />,
};

const TIMETYPE_STYLES: Record<string, { bg: string; text: string; border: string; label: string }> = {
    embargo: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', label: 'Embargo' },
    publish: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Publish' },
    event: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', label: 'Event' },
    custom: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200', label: 'Custom' },
    deadline: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: 'Deadline' },
    launch: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', label: 'Launch' },
};

interface QuestDetailViewProps {
    quest: Quest;
    onClose: () => void;
    onOpenEditor?: () => void;
    onOpenProduct?: (product: import('./ProductSection').ProductOutput) => void;
    onCreateProduct?: () => void;
    highlightedEventId?: number | null;
}

// Helper to get storage key for this quest's timeline
const getTimelineStorageKey = (questId: number) => `quest_timeline_${questId}`;

// Helper to get storage key for quest metadata
const getQuestMetadataKey = (questId: number) => `quest_metadata_${questId}`;

const QUEST_TYPES = [
    { id: 'Press Release', label: 'Press Release', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { id: 'Blog Post', label: 'Blog Post', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'Strategy Memo', label: 'Strategy Memo', color: 'bg-violet-50 text-violet-700 border-violet-200' },
];

// Calendar event ID to quest timeline mapping (since IDs don't match)
const CALENDAR_EVENT_MAP: Record<number, { date: string; type: string }> = {
    1: { date: '2026-01-15', type: 'embargo' },    // Series B Embargo Lift
    2: { date: '2026-01-15', type: 'deadline' },   // Series B Partner Review
    3: { date: '2026-01-22', type: 'launch' },     // Product V3 Launch
    4: { date: '2026-01-20', type: 'deadline' },   // Q1 Strategy Review
    5: { date: '2026-02-05', type: 'embargo' },    // Partnership PR
};

const QUEST_STATUSES = [
    { id: 'draft', label: 'Draft', color: 'bg-gray-100 text-gray-700 border-gray-200', dot: '#6B7280' },
    { id: 'review', label: 'In Review', color: 'bg-amber-50 text-amber-700 border-amber-200', dot: '#F59E0B' },
    { id: 'ready', label: 'Ready', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: '#10B981' },
    { id: 'live', label: 'Published', color: 'bg-blue-50 text-blue-700 border-blue-200', dot: '#3B82F6' },
];

// Editable Field Component
interface EditableFieldProps {
    value: string;
    onSave: (newValue: string) => void;
    className?: string;
    inputClassName?: string;
    multiline?: boolean;
    rows?: number;
}

const EditableField: React.FC<EditableFieldProps> = ({ 
    value, 
    onSave, 
    className = '', 
    inputClassName = '',
    multiline = false,
    rows = 3
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleSave = () => {
        if (editValue.trim() !== value) {
            onSave(editValue.trim());
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditValue(value);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !multiline) {
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    if (isEditing) {
        return (
            <div className="relative">
                {multiline ? (
                    <textarea
                        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                        rows={rows}
                        className={inputClassName}
                    />
                ) : (
                    <input
                        ref={inputRef as React.RefObject<HTMLInputElement>}
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                        className={inputClassName}
                    />
                )}
            </div>
        );
    }

    return (
        <div 
            className={`group relative cursor-pointer ${className}`}
            onClick={() => setIsEditing(true)}
        >
            <span>{value}</span>
            <button 
                className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-black/[0.04] rounded-md"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                }}
            >
                <Edit3 size={14} className="text-black/40" />
            </button>
        </div>
    );
};

export const QuestDetailView: React.FC<QuestDetailViewProps> = ({ 
    quest, 
    onClose, 
    onOpenEditor,
    onOpenProduct,
    onCreateProduct,
    highlightedEventId 
}) => {
    // Defensive check - should not happen but prevents crashes
    if (!quest) {
        return <div className="h-full flex items-center justify-center text-black/40">Quest not found</div>;
    }
    const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'distribution' | 'documents' | 'activity'>('overview');
    const [showComment, setShowComment] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
    
    // Quest metadata state (toggleable)
    const [questType, setQuestType] = useState(quest.type);
    const [questStatus, setQuestStatus] = useState(quest.status);
    const [isHot, setIsHot] = useState(quest.priority === 'high');
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    
    // Track last saved state to determine if there are unsaved changes
    const [lastSavedState, setLastSavedState] = useState({
        type: quest.type,
        status: quest.status,
        isHot: quest.priority === 'high',
    });
    
    // Track if changes were made (compare against last saved state, not original quest)
    const hasChanges = questType !== lastSavedState.type || questStatus !== lastSavedState.status || isHot !== lastSavedState.isHot;
    const [isSaving, setIsSaving] = useState(false);
    const [savedMessage, setSavedMessage] = useState<string | null>(null);
    
    // Timeline state with sessionStorage persistence
    const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
    const [editingEventId, setEditingEventId] = useState<number | null>(null);
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [newEventType, setNewEventType] = useState<'embargo' | 'publish' | 'event' | 'custom' | 'deadline' | 'launch'>('embargo');
    const [newEventTitle, setNewEventTitle] = useState('');
    const [newEventDate, setNewEventDate] = useState('');
    const [newEventTime, setNewEventTime] = useState('');
    
    const typeDropdownRef = useRef<HTMLDivElement>(null);
    const statusDropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target as Node)) {
                setShowTypeDropdown(false);
            }
            if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
                setShowStatusDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Load quest metadata from sessionStorage on mount
    useEffect(() => {
        const metadataKey = getQuestMetadataKey(quest.id);
        const stored = sessionStorage.getItem(metadataKey);
        
        if (stored) {
            try {
                const metadata = JSON.parse(stored);
                if (metadata.type) setQuestType(metadata.type);
                if (metadata.status) setQuestStatus(metadata.status);
                if (metadata.isHot !== undefined) setIsHot(metadata.isHot);
                // Update last saved state to match loaded data
                setLastSavedState({
                    type: metadata.type || quest.type,
                    status: metadata.status || quest.status,
                    isHot: metadata.isHot !== undefined ? metadata.isHot : quest.priority === 'high',
                });
            } catch {
                // Use defaults if parse fails
            }
        }
    }, [quest.id]);

    // Load timeline from sessionStorage on mount, or use defaults
    useEffect(() => {
        const storageKey = getTimelineStorageKey(quest.id);
        const stored = sessionStorage.getItem(storageKey);
        
        if (stored) {
            try {
                setTimeline(JSON.parse(stored));
            } catch {
                // Fallback to defaults if parse fails
                setDefaultTimeline();
            }
        } else {
            setDefaultTimeline();
        }
    }, [quest.id]);

    const setDefaultTimeline = () => {
        const defaults: TimelineEvent[] = [
            { id: Date.now(), type: 'embargo', title: 'TechCrunch exclusive', date: quest.deadline?.split(',')[0] || '2026-01-15', time: '09:00' },
            { id: Date.now() + 1, type: 'publish', title: 'Public announcement', date: '2026-01-15', time: '10:00' },
        ];
        setTimeline(defaults);
        saveTimelineToStorage(defaults);
    };

    // Save to sessionStorage whenever timeline changes
    const saveTimelineToStorage = (events: TimelineEvent[]) => {
        const storageKey = getTimelineStorageKey(quest.id);
        sessionStorage.setItem(storageKey, JSON.stringify(events));
    };

    // Auto-select Timeline tab and scroll to highlighted event
    useEffect(() => {
        if (highlightedEventId && timeline.length > 0) {
            // Find matching event by date + type since IDs don't match
            const calendarEvent = CALENDAR_EVENT_MAP[highlightedEventId];
            if (calendarEvent) {
                const matchingEvent = timeline.find(e => 
                    e.date === calendarEvent.date && e.type === calendarEvent.type
                );
                
                if (matchingEvent) {
                    setActiveTab('timeline');
                    // Store the matching timeline event ID for highlighting
                    const timer = setTimeout(() => {
                        const el = document.querySelector(`[data-event-id="${matchingEvent.id}"]`);
                        if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            el.classList.add('highlighted-event');
                            setTimeout(() => el.classList.remove('highlighted-event'), 2000);
                        }
                    }, 200);
                    return () => clearTimeout(timer);
                }
            }
        }
    }, [highlightedEventId, timeline]);

    const copyEmail = (email: string) => {
        navigator.clipboard.writeText(email);
        setCopiedEmail(email);
        setTimeout(() => setCopiedEmail(null), 2000);
    };

    const addEvent = () => {
        if (!newEventTitle || !newEventDate) return;
        
        const newEvent: TimelineEvent = {
            id: Date.now(),
            type: newEventType,
            title: newEventTitle,
            date: newEventDate,
            time: newEventTime || undefined,
        };
        
        const updated = [...timeline, newEvent];
        setTimeline(updated);
        saveTimelineToStorage(updated);
        
        // Reset form
        setShowAddEvent(false);
        setNewEventType('embargo');
        setNewEventTitle('');
        setNewEventDate('');
        setNewEventTime('');
    };

    const updateEvent = (id: number, updates: Partial<TimelineEvent>) => {
        const updated = timeline.map(e => e.id === id ? { ...e, ...updates } : e);
        setTimeline(updated);
        saveTimelineToStorage(updated);
    };

    const deleteEvent = (id: number) => {
        const updated = timeline.filter(e => e.id !== id);
        setTimeline(updated);
        saveTimelineToStorage(updated);
    };

    const formatDateDisplay = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Save quest metadata to sessionStorage
    const handleSave = () => {
        setIsSaving(true);
        
        const metadata = {
            type: questType,
            status: questStatus,
            isHot: isHot,
            savedAt: new Date().toISOString(),
        };
        
        const metadataKey = getQuestMetadataKey(quest.id);
        sessionStorage.setItem(metadataKey, JSON.stringify(metadata));
        
        // Update last saved state so button disappears
        setLastSavedState({
            type: questType,
            status: questStatus,
            isHot: isHot,
        });
        
        // Show success message briefly
        setSavedMessage('Saved');
        setTimeout(() => {
            setIsSaving(false);
            setSavedMessage(null);
        }, 1500);
    };

    const getEventStyle = (type: string) => {
        return TIMETYPE_STYLES[type] || TIMETYPE_STYLES.custom;
    };

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Header - turns slightly red when hot */}
            <div className={`flex items-center justify-between px-6 py-4 border-b transition-colors duration-300 ${isHot ? 'bg-red-50/50 border-red-100' : 'border-black/[0.06]'}`}>
                <div className="flex items-center gap-3">
                    <button onClick={onClose} className="p-2 hover:bg-black/[0.03] rounded-lg transition-colors">
                        <ChevronLeft size={18} className="text-black/40" />
                    </button>
                    <div className="h-4 w-px bg-black/10" />
                    
                    {/* Status Selector Dropdown */}
                    <div className="relative" ref={statusDropdownRef}>
                        <button
                            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                            className={`
                                flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium rounded-lg border transition-all
                                ${QUEST_STATUSES.find(s => s.id === questStatus)?.color || QUEST_STATUSES[0].color}
                            `}
                        >
                            <span 
                                className="w-1.5 h-1.5 rounded-full" 
                                style={{ backgroundColor: QUEST_STATUSES.find(s => s.id === questStatus)?.dot || '#6B7280' }}
                            />
                            {QUEST_STATUSES.find(s => s.id === questStatus)?.label || 'Draft'}
                            <ChevronDown size={12} className="opacity-60" />
                        </button>
                        
                        {showStatusDropdown && (
                            <div className="absolute top-full left-0 mt-1 bg-white border border-black/10 rounded-xl shadow-lg py-1 z-50 min-w-[140px]">
                                {QUEST_STATUSES.map(status => (
                                    <button
                                        key={status.id}
                                        onClick={() => {
                                            setQuestStatus(status.id as any);
                                            setShowStatusDropdown(false);
                                        }}
                                        className={`
                                            w-full flex items-center gap-2 px-3 py-2 text-[12px] text-left transition-colors
                                            ${questStatus === status.id ? 'bg-gray-50' : 'hover:bg-gray-50'}
                                        `}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: status.dot }} />
                                        {status.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Type Selector Dropdown */}
                    <div className="relative" ref={typeDropdownRef}>
                        <button
                            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                            className={`
                                flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium rounded-lg border transition-all
                                ${QUEST_TYPES.find(t => t.id === questType)?.color || QUEST_TYPES[0].color}
                            `}
                        >
                            {questType}
                            <ChevronDown size={12} className="opacity-60" />
                        </button>
                        
                        {showTypeDropdown && (
                            <div className="absolute top-full left-0 mt-1 bg-white border border-black/10 rounded-xl shadow-lg py-1 z-50 min-w-[160px]">
                                {QUEST_TYPES.map(type => (
                                    <button
                                        key={type.id}
                                        onClick={() => {
                                            setQuestType(type.id as any);
                                            setShowTypeDropdown(false);
                                        }}
                                        className={`
                                            w-full flex items-center gap-2 px-3 py-2 text-[12px] text-left transition-colors
                                            ${questType === type.id ? 'bg-gray-50' : 'hover:bg-gray-50'}
                                        `}
                                    >
                                        <span className={`w-2 h-2 rounded-full ${type.color.split(' ')[0].replace('bg-', 'bg-').replace('50', '500')}`} />
                                        {type.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Hot Toggle */}
                    <button
                        onClick={() => setIsHot(!isHot)}
                        className={`
                            flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-lg border transition-all
                            ${isHot 
                                ? 'bg-red-50 text-red-700 border-red-200' 
                                : 'bg-gray-50 text-gray-400 border-gray-200 hover:text-gray-600 hover:border-gray-300'
                            }
                        `}
                    >
                        <Flame size={14} className={isHot ? 'fill-current' : ''} />
                        {isHot ? 'Hot' : 'Mark Hot'}
                    </button>
                    
                    {/* Save Button - appears when changes made */}
                    {hasChanges && (
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium bg-black text-white rounded-lg hover:bg-black/90 transition-all disabled:opacity-70"
                        >
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>
                    )}
                    
                    {/* Saved confirmation */}
                    {savedMessage && !hasChanges && (
                        <span className="text-[12px] text-emerald-600 font-medium">
                            {savedMessage}
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-2xl mx-auto px-6 py-8">
                    {/* Editable Title */}
                    <EditableField 
                        value={quest.title}
                        onSave={(newTitle) => console.log('Title updated:', newTitle)}
                        className="text-2xl font-serif font-medium text-black mb-3"
                        inputClassName="text-2xl font-serif font-medium w-full px-3 py-2 border border-black/20 rounded-lg outline-none focus:border-black"
                        multiline={false}
                    />
                    
                    {/* Editable Synopsis */}
                    <EditableField 
                        value={quest.synopsis}
                        onSave={(newSynopsis) => console.log('Synopsis updated:', newSynopsis)}
                        className="text-[15px] text-black/50 leading-relaxed mb-6"
                        inputClassName="text-[15px] w-full px-3 py-2 border border-black/20 rounded-lg outline-none focus:border-black resize-none"
                        multiline={true}
                        rows={3}
                    />

                    {/* Meta */}
                    <div className="flex items-center gap-6 py-4 border-y border-black/[0.06] mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-[10px]">{quest.author[0]}</div>
                            <div>
                                <p className="text-[13px] font-medium">{quest.author}</p>
                                <p className="text-[11px] text-black/40">{quest.authorRole}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-[13px] text-black/40">
                            <Clock size={14} />
                            <span>{quest.updated}</span>
                        </div>
                    </div>

                    {/* Product Section */}
                    <div className="mb-6">
                        <ProductSection 
                            questId={quest.id}
                            workingDocs={MOCK_WORKING_DOCS}
                            attachedDocs={MOCK_ATTACHED}
                            onOpenProduct={onOpenProduct || (() => {})}
                            onCreateNew={onCreateProduct || (() => {})}
                        />
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-1 mb-6 overflow-x-auto">
                        {[
                            { id: 'overview', label: 'Overview', count: MOCK_COMMENTS.length },
                            { id: 'timeline', label: 'Timeline', count: timeline.length },
                            { id: 'distribution', label: 'Distribution', count: quest.emailDL.length + 1 },
                            { id: 'documents', label: 'Documents', count: MOCK_WORKING_DOCS.length + MOCK_ATTACHED.length },
                            { id: 'activity', label: 'History', count: MOCK_VERSIONS.length },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-3 py-1.5 text-[12px] font-medium rounded-md transition-colors whitespace-nowrap ${
                                    activeTab === tab.id ? 'bg-black text-white' : 'text-black/50 hover:text-black hover:bg-black/[0.03]'
                                }`}
                            >
                                {tab.label}
                                <span className="ml-1.5 opacity-60">{tab.count}</span>
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'overview' && (
                        <div className="space-y-4">
                            {MOCK_COMMENTS.map(c => (
                                <div key={c.id} className="flex gap-3 p-4 bg-gray-50 rounded-xl">
                                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs shrink-0">{c.userInitial}</div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[13px] font-medium">{c.user}</span>
                                            <span className="text-[11px] text-black/40">{c.role}</span>
                                            <span className="text-[11px] text-black/30">{c.time}</span>
                                        </div>
                                        <p className="text-[14px] text-black/70">{c.text}</p>
                                    </div>
                                </div>
                            ))}
                            {!showComment ? (
                                <button onClick={() => setShowComment(true)} className="w-full py-3 text-[13px] text-black/40 hover:text-black border border-dashed border-black/10 rounded-xl hover:border-black/20 transition-colors">
                                    Add comment...
                                </button>
                            ) : (
                                <div className="p-3 border border-black/10 rounded-xl">
                                    <textarea className="w-full text-[14px] resize-none outline-none placeholder:text-black/30" rows={3} placeholder="Write a comment..." autoFocus />
                                    <div className="flex justify-end gap-2 mt-2">
                                        <button onClick={() => setShowComment(false)} className="px-3 py-1.5 text-[12px] text-black/50 hover:text-black">Cancel</button>
                                        <button className="px-3 py-1.5 text-[12px] bg-black text-white rounded-md">Post</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'timeline' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-semibold text-black/40 uppercase tracking-wide">Key Dates</span>
                                <button 
                                    onClick={() => setShowAddEvent(true)}
                                    className="flex items-center gap-1 text-[11px] text-black/50 hover:text-black transition-colors"
                                >
                                    <Plus size={12} />
                                    Add
                                </button>
                            </div>

                            <div className="space-y-2">
                                {[...timeline].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(event => {
                                    // Check if this event matches the highlighted calendar event
                                    const calendarEvent = highlightedEventId ? CALENDAR_EVENT_MAP[highlightedEventId] : null;
                                    const isHighlighted = calendarEvent ? 
                                        (event.date === calendarEvent.date && event.type === calendarEvent.type) : false;
                                    const style = getEventStyle(event.type);
                                    
                                    return (
                                        <div 
                                            key={event.id}
                                            data-event-id={event.id}
                                            className={`
                                                group flex items-center gap-3 p-3 rounded-xl transition-all
                                                ${isHighlighted 
                                                    ? 'bg-violet-50 border-2 border-violet-200 shadow-sm highlighted-event' 
                                                    : 'bg-gray-50 hover:bg-gray-100 border border-transparent'
                                                }
                                            `}
                                        >
                                            {editingEventId === event.id ? (
                                                <div className="flex-1 flex flex-col gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <select 
                                                            value={event.type}
                                                            onChange={(e) => updateEvent(event.id, { type: e.target.value as any })}
                                                            className="text-[12px] bg-white border border-black/10 rounded px-2 py-1"
                                                        >
                                                            <option value="embargo">Embargo</option>
                                                            <option value="publish">Publish</option>
                                                            <option value="event">Event</option>
                                                            <option value="deadline">Deadline</option>
                                                            <option value="launch">Launch</option>
                                                            <option value="custom">Custom</option>
                                                        </select>
                                                        <input 
                                                            type="text" 
                                                            value={event.title}
                                                            onChange={(e) => updateEvent(event.id, { title: e.target.value })}
                                                            className="text-[12px] bg-white border border-black/10 rounded px-2 py-1 flex-1"
                                                            placeholder="Event title"
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <input 
                                                            type="date" 
                                                            value={event.date}
                                                            onChange={(e) => updateEvent(event.id, { date: e.target.value })}
                                                            className="text-[12px] bg-white border border-black/10 rounded px-2 py-1"
                                                        />
                                                        <input 
                                                            type="time" 
                                                            value={event.time || ''}
                                                            onChange={(e) => updateEvent(event.id, { time: e.target.value })}
                                                            className="text-[12px] bg-white border border-black/10 rounded px-2 py-1 w-24"
                                                        />
                                                        <button onClick={() => setEditingEventId(null)} className="p-1 hover:bg-black/5 rounded">
                                                            <CheckCircle2 size={14} className="text-emerald-600" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${style.bg} ${style.text} ${style.border}`}>
                                                        {style.label}
                                                    </span>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-[13px] font-medium truncate">{event.title}</p>
                                                        <p className="text-[11px] text-black/40">
                                                            {formatDateDisplay(event.date)}
                                                            {event.time && ` • ${event.time}`}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => setEditingEventId(event.id)} className="p-1 hover:bg-black/5 rounded">
                                                            <Edit3 size={12} className="text-black/40" />
                                                        </button>
                                                        <button onClick={() => deleteEvent(event.id)} className="p-1 hover:bg-black/5 rounded">
                                                            <X size={12} className="text-red-400" />
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {showAddEvent && (
                                <div className="p-3 bg-gray-50 rounded-xl border border-black/[0.06]">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <select 
                                                value={newEventType}
                                                onChange={(e) => setNewEventType(e.target.value as any)}
                                                className="text-[12px] bg-white border border-black/10 rounded px-2 py-1"
                                            >
                                                <option value="embargo">Embargo</option>
                                                <option value="publish">Publish</option>
                                                <option value="event">Event</option>
                                                <option value="deadline">Deadline</option>
                                                <option value="launch">Launch</option>
                                                <option value="custom">Custom</option>
                                            </select>
                                            <input 
                                                type="text" 
                                                placeholder="Event title"
                                                value={newEventTitle}
                                                onChange={(e) => setNewEventTitle(e.target.value)}
                                                className="text-[12px] bg-white border border-black/10 rounded px-2 py-1 flex-1"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="date" 
                                                value={newEventDate}
                                                onChange={(e) => setNewEventDate(e.target.value)}
                                                className="text-[12px] bg-white border border-black/10 rounded px-2 py-1"
                                            />
                                            <input 
                                                type="time" 
                                                value={newEventTime}
                                                onChange={(e) => setNewEventTime(e.target.value)}
                                                className="text-[12px] bg-white border border-black/10 rounded px-2 py-1 w-24"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2 mt-3">
                                        <button onClick={() => setShowAddEvent(false)} className="px-3 py-1 text-[11px] text-black/50 hover:text-black">Cancel</button>
                                        <button onClick={addEvent} className="px-3 py-1 text-[11px] bg-black text-white rounded">Add</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'distribution' && (
                        <div className="space-y-6">
                            {/* Unique Quest Email */}
                            <div className="p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center">
                                        <Mail size={12} className="text-violet-600" />
                                    </div>
                                    <span className="text-[11px] font-semibold text-violet-700 uppercase tracking-wide">Quest Email</span>
                                </div>
                                <p className="text-[13px] text-black/60 mb-3">
                                    Send docs, comments, or questions directly to this quest
                                </p>
                                <button
                                    onClick={() => copyEmail(quest.uniqueEmail)}
                                    className="w-full flex items-center justify-between gap-3 bg-white border border-violet-200 px-4 py-3 rounded-lg hover:border-violet-300 hover:shadow-sm transition-all group"
                                >
                                    <span className="text-[15px] font-medium text-violet-700">{quest.uniqueEmail}</span>
                                    <Copy size={16} className={`transition-colors ${copiedEmail === quest.uniqueEmail ? 'text-green-600' : 'text-violet-300 group-hover:text-violet-500'}`} />
                                </button>
                            </div>

                            {/* Distribution List */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Users size={14} className="text-black/40" />
                                    <span className="text-[11px] font-medium text-black/60 uppercase tracking-wide">Distribution List</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {quest.emailDL.map(email => (
                                        <button
                                            key={email}
                                            onClick={() => copyEmail(email)}
                                            className="group flex items-center gap-1.5 text-[12px] bg-gray-50 border border-black/[0.08] px-3 py-2 rounded-lg hover:border-black/20 hover:bg-gray-100 transition-colors"
                                        >
                                            <Mail size={12} className="text-black/30" />
                                            {email}
                                            <Copy size={12} className={`transition-colors ${copiedEmail === email ? 'text-green-600' : 'text-black/20 group-hover:text-black/40'}`} />
                                        </button>
                                    ))}
                                </div>
                                <button className="flex items-center gap-2 text-[12px] text-black/40 hover:text-black transition-colors mt-4">
                                    <Plus size={14} />
                                    Add email
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'documents' && (
                        <div className="space-y-6">
                            {/* Working Documents Section */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[11px] font-semibold text-black/40 uppercase tracking-wide">Working Documents</span>
                                    <button 
                                        onClick={onOpenEditor}
                                        className="flex items-center gap-1 text-[11px] text-black/50 hover:text-black transition-colors"
                                    >
                                        <Plus size={12} />
                                        New Doc
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {MOCK_WORKING_DOCS.map(doc => (
                                        <button
                                            key={doc.id}
                                            onClick={onOpenEditor}
                                            className="group text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-transparent hover:border-black/5"
                                        >
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-3 shadow-sm">
                                                {FILE_ICONS[doc.type]}
                                            </div>
                                            <p className="text-[13px] font-medium text-black mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                                {doc.title}
                                            </p>
                                            <span className="text-[10px] text-black/40">{doc.lastEdited}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Attached Files Section */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[11px] font-semibold text-black/40 uppercase tracking-wide">Attached Files</span>
                                    <button className="flex items-center gap-1.5 text-[11px] text-black/50 hover:text-black transition-colors">
                                        <Upload size={12} />
                                        Upload
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {MOCK_ATTACHED.map(file => (
                                        <div 
                                            key={file.id} 
                                            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors group"
                                        >
                                            <div className="w-9 h-9 bg-white border border-black/[0.06] rounded-lg flex items-center justify-center">
                                                {FILE_ICONS[file.fileType]}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[14px] font-medium text-black truncate">{file.name}</p>
                                                <p className="text-[11px] text-black/40">
                                                    {file.size || file.source} • {file.uploadedAt}
                                                </p>
                                            </div>
                                            <button className="p-2 hover:bg-black/[0.05] rounded-lg text-black/30 hover:text-black transition-colors opacity-0 group-hover:opacity-100">
                                                <Download size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'activity' && (
                        <div className="space-y-0">
                            {MOCK_VERSIONS.map((v, i) => (
                                <div key={v.id} className="flex gap-4 relative pb-6">
                                    {i !== MOCK_VERSIONS.length - 1 && <div className="absolute left-[9px] top-6 bottom-0 w-px bg-black/[0.06]" />}
                                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                        <History size={11} className="text-black/30" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[13px] font-medium">{v.version}</span>
                                            <span className="text-[12px] text-black/40">{v.author} • {v.date}</span>
                                        </div>
                                        <p className="text-[13px] text-black/60 mt-0.5">{v.changes}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
