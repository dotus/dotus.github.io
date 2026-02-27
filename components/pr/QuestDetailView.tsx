import React, { useState, useEffect, useRef } from 'react';
import {
    FileText, FileSpreadsheet, Image as ImageIcon, Link2,
    Download, Upload, Plus, Clock,
    History, CheckCircle2, Flame, ChevronDown,
    ChevronLeft, Mail, Copy, Calendar, Edit3,
    X, Users, Send, Trash2, MoreHorizontal
} from 'lucide-react';
import { EditableField } from '../ui/EditableField';
import { Quest, OutreachCampaign, getOutreachStorageKey } from './StatsOverview';
import { ProductSection } from './ProductSection';
import { OutreachSection } from './OutreachSection';


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

// Approved quotes for use across the quest
interface QuestQuote {
    id: number;
    text: string;
    speaker: string;
    role: string;
    tags: string[];
    usageCount: number;
}

const MOCK_QUEST_QUOTES: QuestQuote[] = [
    { 
        id: 1, 
        text: "This funding round represents a pivotal moment for our company's growth trajectory.", 
        speaker: "Mithil Aggarwal", 
        role: "CEO",
        tags: ['Funding', 'CEO'],
        usageCount: 3
    },
    { 
        id: 2, 
        text: "We're not just building a product; we're reshaping how the industry operates.", 
        speaker: "Sarah Jenkins", 
        role: "Head of Product",
        tags: ['Vision', 'Product'],
        usageCount: 1
    },
    { 
        id: 3, 
        text: "Our customers have been asking for this, and we're thrilled to deliver.", 
        speaker: "Mike Chen", 
        role: "CTO",
        tags: ['Customer', 'Tech'],
        usageCount: 0
    },
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
    onDelete?: (id: number) => void;
    onOpenProduct?: (product: import('./ProductSection').ProductOutput) => void;
    onCreateProduct?: () => void;
    onOpenOutreach?: () => void;
    highlightedEventId?: number | null;
    defaultTab?: 'overview' | 'timeline' | 'distribution' | 'documents' | 'quotes' | 'activity';
}

// Helper to get storage key for this quest's timeline
const getTimelineStorageKey = (questId: number) => `quest_timeline_${questId}`;

// Helper to get storage key for quest metadata
const getQuestMetadataKey = (questId: number) => `quest_metadata_${questId}`;

const QUEST_TYPES = [
    { id: 'Press Release', label: 'Press Release', color: 'bg-gray-100 text-gray-700 border-gray-200' },
    { id: 'Blog Post', label: 'Blog Post', color: 'bg-gray-100 text-gray-700 border-gray-200' },
    { id: 'Strategy Memo', label: 'Strategy Memo', color: 'bg-gray-100 text-gray-700 border-gray-200' },
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



export const QuestDetailView: React.FC<QuestDetailViewProps> = ({
    quest,
    onClose,
    onDelete,
    onOpenEditor,
    onOpenProduct,
    onCreateProduct,
    onOpenOutreach,
    highlightedEventId,
    defaultTab = 'overview'
}) => {
    // Defensive check - should not happen but prevents crashes
    if (!quest) {
        return <div className="h-full flex items-center justify-center text-black/40">Quest not found</div>;
    }
    const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'distribution' | 'documents' | 'quotes' | 'activity'>(defaultTab);
    const [campaign, setCampaign] = useState<OutreachCampaign | undefined>(quest.outreachCampaign);
    const [showComment, setShowComment] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

    // Quotes state
    const [questQuotes, setQuestQuotes] = useState<QuestQuote[]>(MOCK_QUEST_QUOTES);
    const [showAddQuoteDialog, setShowAddQuoteDialog] = useState(false);
    const [newQuoteText, setNewQuoteText] = useState('');
    const [newQuoteSpeaker, setNewQuoteSpeaker] = useState('');
    const [newQuoteRole, setNewQuoteRole] = useState('');
    const [newQuoteTags, setNewQuoteTags] = useState('');

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

    // Load campaign from sessionStorage on mount
    useEffect(() => {
        const storageKey = getOutreachStorageKey(quest.id);
        const stored = sessionStorage.getItem(storageKey);
        if (stored) {
            try {
                setCampaign(JSON.parse(stored));
            } catch {
                // Ignore parse errors
            }
        }
    }, [quest.id]);

    // Handle campaign updates
    const handleCampaignUpdate = (newCampaign: OutreachCampaign | undefined) => {
        setCampaign(newCampaign);

        // Auto-add campaign send date to timeline
        if (newCampaign?.status === 'sent' && newCampaign.sentAt) {
            const sendDate = new Date(newCampaign.sentAt);
            const dateStr = sendDate.toISOString().split('T')[0];
            const timeStr = sendDate.toTimeString().slice(0, 5);

            // Check if we already have this event
            const existingEvent = timeline.find(e =>
                e.title === 'Outreach Campaign Sent' && e.date === dateStr
            );

            if (!existingEvent) {
                const campaignEvent: TimelineEvent = {
                    id: Date.now(),
                    type: 'event',
                    title: 'Outreach Campaign Sent',
                    date: dateStr,
                    time: timeStr,
                };
                const updated = [...timeline, campaignEvent];
                setTimeline(updated);
                saveTimelineToStorage(updated);
            }
        }
    };

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
        <div className="h-full flex flex-col bg-[#FAF9F6] relative">

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

                    {/* Delete Button */}
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this quest?')) {
                                if (onDelete) onDelete(quest.id);
                            }
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all border border-transparent hover:border-red-100"
                    >
                        <Trash2 size={14} />
                        Delete
                    </button>

                    {/* Save Button - appears when changes made */}
                    {hasChanges && (
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all disabled:opacity-70"
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
                            <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px]">{quest.author[0]}</div>
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
                            onOpenProduct={onOpenProduct || (() => { })}
                            onCreateNew={onCreateProduct || (() => { })}
                        />
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-1 mb-6 overflow-x-auto">
                        {[
                            { id: 'overview', label: 'Overview', count: MOCK_COMMENTS.length },
                            { id: 'timeline', label: 'Timeline', count: timeline.length },
                            { id: 'distribution', label: 'Distribution', count: quest.emailDL.length + 1 },
                            { id: 'quotes', label: 'Quotes', count: questQuotes.length },
                            { id: 'documents', label: 'Documents', count: MOCK_WORKING_DOCS.length + MOCK_ATTACHED.length },
                            { id: 'activity', label: 'History', count: MOCK_VERSIONS.length },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-3 py-1.5 text-[12px] font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === tab.id ? 'bg-teal-600 text-white' : 'text-black/50 hover:text-black hover:bg-black/[0.03]'
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
                                    <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs shrink-0">{c.userInitial}</div>
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
                                        <button className="px-3 py-1.5 text-[12px] bg-teal-600 text-white rounded-md">Post</button>
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
                                        <button onClick={addEvent} className="px-3 py-1 text-[11px] bg-teal-600 text-white rounded">Add</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'distribution' && (
                        <div className="space-y-6">
                            {/* Outreach Section - Main Feature */}
                            <div>
                                <div className="mb-3">
                                    <span className="text-[11px] font-medium text-black/60 uppercase tracking-wide">Outreach Campaign</span>
                                </div>
                                <OutreachSection
                                    quest={{ ...quest, status: questStatus }}
                                    onCampaignUpdate={handleCampaignUpdate}
                                    onOpenComposer={onOpenOutreach}
                                />
                            </div>

                            {/* Divider */}
                            <div className="border-t border-black/[0.06]" />

                            {/* Unique Quest Email */}
                            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                        <Mail size={12} className="text-blue-600" />
                                    </div>
                                    <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wide">Quest Email</span>
                                </div>
                                <p className="text-[13px] text-black/60 mb-3">
                                    Send docs, comments, or questions directly to this quest
                                </p>
                                <button
                                    onClick={() => copyEmail(quest.uniqueEmail)}
                                    className="w-full flex items-center justify-between gap-3 bg-white border border-blue-200 px-4 py-3 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
                                >
                                    <span className="text-[15px] font-medium text-blue-700">{quest.uniqueEmail}</span>
                                    <Copy size={16} className={`transition-colors ${copiedEmail === quest.uniqueEmail ? 'text-green-600' : 'text-blue-300 group-hover:text-blue-500'}`} />
                                </button>
                            </div>

                            {/* Distribution List */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-[11px] font-medium text-black/60 uppercase tracking-wide">Distribution List</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {quest.emailDL.map(email => (
                                        <button
                                            key={email}
                                            onClick={() => copyEmail(email)}
                                            className="group flex items-center gap-1.5 text-[12px] bg-gray-50 border border-black/[0.08] px-3 py-2 rounded-lg hover:border-teal-300 hover:bg-teal-50/30 transition-colors"
                                        >
                                            {email}
                                            <Copy size={12} className={`transition-colors ${copiedEmail === email ? 'text-green-600' : 'text-black/20 group-hover:text-teal-600'}`} />
                                        </button>
                                    ))}
                                </div>
                                <button className="flex items-center gap-2 text-[12px] text-black/40 hover:text-teal-600 transition-colors mt-4">
                                    <Plus size={14} />
                                    Add email
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'quotes' && (
                        <div className="space-y-4">
                            {/* Quotes Header */}
                            <div className="flex items-center justify-between">
                                <p className="text-[13px] text-black/50">
                                    Internally approved quotes for use across this quest
                                </p>
                                <button 
                                    onClick={() => setShowAddQuoteDialog(true)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
                                >
                                    <Plus size={12} />
                                    Add Quote
                                </button>
                            </div>
                            
                            {/* Quotes List */}
                            <div className="space-y-3">
                                {questQuotes.map((quote) => (
                                    <div 
                                        key={quote.id} 
                                        className="group p-5 bg-gray-50/50 rounded-xl border border-transparent hover:border-teal-200 hover:bg-teal-50/20 transition-all relative"
                                    >
                                        {/* Delete Button - visible on hover */}
                                        <button
                                            onClick={() => setQuestQuotes(prev => prev.filter(q => q.id !== quote.id))}
                                            className="absolute top-3 right-3 p-2 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 text-black/20 rounded-lg transition-all"
                                            title="Delete quote"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                        
                                        <p className="text-[15px] text-black/80 leading-relaxed mb-4 italic pr-8">
                                            &ldquo;{quote.text}&rdquo;
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-[11px] font-semibold">
                                                    {quote.speaker.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <span className="text-[13px] font-medium text-black">{quote.speaker}</span>
                                                    <span className="text-[12px] text-black/40 ml-1.5">{quote.role}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(`"${quote.text}" — ${quote.speaker}, ${quote.role}`);
                                                }}
                                                className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-black/40 hover:text-teal-600 hover:bg-white rounded-lg transition-all"
                                                title="Copy quote with attribution"
                                            >
                                                <Copy size={14} />
                                                Copy
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-black/[0.04]">
                                            {quote.tags.map(tag => (
                                                <span key={tag} className="text-[10px] px-2.5 py-0.5 bg-white text-black/50 rounded-full border border-black/[0.04]">
                                                    {tag}
                                                </span>
                                            ))}
                                            <span className="text-[10px] text-black/30 ml-auto">
                                                Used {quote.usageCount} time{quote.usageCount !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                    </div>
                                ))}
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
                            {/* Campaign Activity - shown if campaign exists */}
                            {campaign?.status === 'sent' && (
                                <div className="flex gap-4 relative pb-6">
                                    <div className="absolute left-[9px] top-6 bottom-0 w-px bg-black/[0.06]" />
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                        <Send size={11} className="text-emerald-600" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[13px] font-medium text-emerald-700">Outreach Campaign Sent</span>
                                            <span className="text-[12px] text-black/40">
                                                {campaign.sentBy} • {campaign.sentAt ? new Date(campaign.sentAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recently'}
                                            </span>
                                        </div>
                                        <p className="text-[13px] text-black/60 mt-0.5">
                                            Sent to {campaign.journalists.length} journalist{campaign.journalists.length > 1 ? 's' : ''}
                                            {campaign.openRate !== undefined && campaign.openRate > 0 && (
                                                <span className="text-emerald-600"> • {campaign.openRate}% opened</span>
                                            )}
                                        </p>
                                        <div className="mt-2 flex flex-wrap gap-1.5">
                                            {campaign.journalists.map(j => (
                                                <span key={j.id} className="text-[10px] bg-gray-50 text-black/60 px-2 py-0.5 rounded">
                                                    {j.name} ({j.outlet})
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

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

            {/* Add Quote Dialog */}
            {showAddQuoteDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div 
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                        onClick={() => setShowAddQuoteDialog(false)}
                    />
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06]">
                            <h3 className="font-serif text-lg font-medium">Add New Quote</h3>
                            <button 
                                onClick={() => setShowAddQuoteDialog(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={16} className="text-black/40" />
                            </button>
                        </div>
                        
                        {/* Form */}
                        <div className="p-5 space-y-4">
                            <div>
                                <label className="block text-[11px] font-medium text-black/50 uppercase tracking-wide mb-2">
                                    Quote Text
                                </label>
                                <textarea
                                    value={newQuoteText}
                                    onChange={(e) => setNewQuoteText(e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2.5 text-[14px] border border-black/10 rounded-lg focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/10 resize-none"
                                    placeholder="Enter the quote..."
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[11px] font-medium text-black/50 uppercase tracking-wide mb-2">
                                        Speaker Name
                                    </label>
                                    <input
                                        type="text"
                                        value={newQuoteSpeaker}
                                        onChange={(e) => setNewQuoteSpeaker(e.target.value)}
                                        className="w-full px-3 py-2.5 text-[14px] border border-black/10 rounded-lg focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/10"
                                        placeholder="e.g. John Smith"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-medium text-black/50 uppercase tracking-wide mb-2">
                                        Role
                                    </label>
                                    <input
                                        type="text"
                                        value={newQuoteRole}
                                        onChange={(e) => setNewQuoteRole(e.target.value)}
                                        className="w-full px-3 py-2.5 text-[14px] border border-black/10 rounded-lg focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/10"
                                        placeholder="e.g. CEO"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-[11px] font-medium text-black/50 uppercase tracking-wide mb-2">
                                    Tags (comma separated)
                                </label>
                                <input
                                    type="text"
                                    value={newQuoteTags}
                                    onChange={(e) => setNewQuoteTags(e.target.value)}
                                    className="w-full px-3 py-2.5 text-[14px] border border-black/10 rounded-lg focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/10"
                                    placeholder="e.g. Vision, Product"
                                />
                            </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-black/[0.06] bg-gray-50/50">
                            <button
                                onClick={() => setShowAddQuoteDialog(false)}
                                className="px-4 py-2 text-[13px] font-medium text-black/60 hover:text-black hover:bg-black/[0.05] rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (newQuoteText.trim() && newQuoteSpeaker.trim()) {
                                        const newQuote: QuestQuote = {
                                            id: Date.now(),
                                            text: newQuoteText.trim(),
                                            speaker: newQuoteSpeaker.trim(),
                                            role: newQuoteRole.trim() || 'Team Member',
                                            tags: newQuoteTags.split(',').map(t => t.trim()).filter(Boolean),
                                            usageCount: 0,
                                        };
                                        setQuestQuotes(prev => [newQuote, ...prev]);
                                        setNewQuoteText('');
                                        setNewQuoteSpeaker('');
                                        setNewQuoteRole('');
                                        setNewQuoteTags('');
                                        setShowAddQuoteDialog(false);
                                    }
                                }}
                                disabled={!newQuoteText.trim() || !newQuoteSpeaker.trim()}
                                className="px-4 py-2 text-[13px] font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                Add Quote
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
