import React, { useState, useEffect, useRef } from 'react';
import { 
    ChevronLeft, Flame, ChevronDown, Plus, X, Check, Calendar,
    Clock, Users, Mail, Copy, Upload, FileText, FileSpreadsheet, FileImage,
    Link2, MoreHorizontal
} from 'lucide-react';

const QUEST_TYPES = [
    { id: 'Press Release', label: 'Press Release', color: 'bg-gray-100 text-gray-700 border-gray-200' },
    { id: 'Blog Post', label: 'Blog Post', color: 'bg-gray-100 text-gray-700 border-gray-200' },
    { id: 'Strategy Memo', label: 'Strategy Memo', color: 'bg-gray-100 text-gray-700 border-gray-200' },
];

const QUEST_STATUSES = [
    { id: 'draft', label: 'Draft', color: 'bg-gray-100 text-gray-700 border-gray-200', dot: '#6B7280' },
    { id: 'review', label: 'In Review', color: 'bg-amber-50 text-amber-700 border-amber-200', dot: '#F59E0B' },
    { id: 'ready', label: 'Ready', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: '#10B981' },
    { id: 'live', label: 'Published', color: 'bg-blue-50 text-blue-700 border-blue-200', dot: '#3B82F6' },
];

const TIMETYPE_STYLES: Record<string, { bg: string; text: string; border: string; label: string }> = {
    embargo: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', label: 'Embargo' },
    publish: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Publish' },
    event: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', label: 'Event' },
    custom: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200', label: 'Custom' },
    deadline: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: 'Deadline' },
    launch: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', label: 'Launch' },
};

interface TimelineEvent {
    id: number;
    type: 'embargo' | 'publish' | 'event' | 'custom' | 'deadline' | 'launch';
    title: string;
    date: string;
    time?: string;
}

interface AttachedDoc {
    id: number;
    name: string;
    fileType: string;
    size?: string;
}

interface NewQuestData {
    title: string;
    synopsis: string;
    type: string;
    status: string;
    isHot: boolean;
    author: string;
    authorRole: string;
    timeline: TimelineEvent[];
    emailDL: string[];
    attachedDocs: AttachedDoc[];
}

const NEW_QUEST_STORAGE_KEY = 'new_quest_draft';

interface NewQuestViewProps {
    onClose: () => void;
    onSave?: (quest: NewQuestData) => void;
}

export const NewQuestView: React.FC<NewQuestViewProps> = ({ onClose, onSave }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'distribution' | 'documents'>('overview');
    const [isSaving, setIsSaving] = useState(false);
    const [savedMessage, setSavedMessage] = useState<string | null>(null);
    
    // Form state
    const [title, setTitle] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [questType, setQuestType] = useState('Press Release');
    const [questStatus, setQuestStatus] = useState('draft');
    const [isHot, setIsHot] = useState(false);
    const [author, setAuthor] = useState('Mithil');
    const [authorRole, setAuthorRole] = useState('Editor');
    
    // Dropdowns
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    
    // Timeline
    const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [newEventType, setNewEventType] = useState<'embargo' | 'publish' | 'event' | 'custom' | 'deadline' | 'launch'>('embargo');
    const [newEventTitle, setNewEventTitle] = useState('');
    const [newEventDate, setNewEventDate] = useState('');
    const [newEventTime, setNewEventTime] = useState('');
    
    // Distribution
    const [emailDL, setEmailDL] = useState<string[]>([]);
    const [newEmail, setNewEmail] = useState('');
    const [uniqueEmail, setUniqueEmail] = useState('');
    const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
    
    // Documents
    const [attachedDocs, setAttachedDocs] = useState<AttachedDoc[]>([]);
    
    const typeDropdownRef = useRef<HTMLDivElement>(null);
    const statusDropdownRef = useRef<HTMLDivElement>(null);

    // Generate unique email based on title
    useEffect(() => {
        if (title) {
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30);
            setUniqueEmail(`${slug}@andalso.co`);
        } else {
            setUniqueEmail('new-quest@andalso.co');
        }
    }, [title]);

    // Load draft from sessionStorage
    useEffect(() => {
        const stored = sessionStorage.getItem(NEW_QUEST_STORAGE_KEY);
        if (stored) {
            try {
                const data: NewQuestData = JSON.parse(stored);
                setTitle(data.title || '');
                setSynopsis(data.synopsis || '');
                setQuestType(data.type || 'Press Release');
                setQuestStatus(data.status || 'draft');
                setIsHot(data.isHot || false);
                setAuthor(data.author || 'Mithil');
                setAuthorRole(data.authorRole || 'Editor');
                setTimeline(data.timeline || []);
                setEmailDL(data.emailDL || []);
                setAttachedDocs(data.attachedDocs || []);
            } catch {
                // Use defaults
            }
        }
    }, []);

    // Auto-save to sessionStorage
    useEffect(() => {
        const data: NewQuestData = {
            title,
            synopsis,
            type: questType,
            status: questStatus,
            isHot,
            author,
            authorRole,
            timeline,
            emailDL,
            attachedDocs,
        };
        sessionStorage.setItem(NEW_QUEST_STORAGE_KEY, JSON.stringify(data));
    }, [title, synopsis, questType, questStatus, isHot, author, authorRole, timeline, emailDL, attachedDocs]);

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

    const addEvent = () => {
        if (!newEventTitle || !newEventDate) return;
        const newEvent: TimelineEvent = {
            id: Date.now(),
            type: newEventType,
            title: newEventTitle,
            date: newEventDate,
            time: newEventTime || undefined,
        };
        setTimeline([...timeline, newEvent]);
        setShowAddEvent(false);
        setNewEventType('embargo');
        setNewEventTitle('');
        setNewEventDate('');
        setNewEventTime('');
    };

    const deleteEvent = (id: number) => {
        setTimeline(timeline.filter(e => e.id !== id));
    };

    const addEmail = () => {
        if (!newEmail || !newEmail.includes('@')) return;
        if (!emailDL.includes(newEmail)) {
            setEmailDL([...emailDL, newEmail]);
        }
        setNewEmail('');
    };

    const removeEmail = (email: string) => {
        setEmailDL(emailDL.filter(e => e !== email));
    };

    const copyEmail = (email: string) => {
        navigator.clipboard.writeText(email);
        setCopiedEmail(email);
        setTimeout(() => setCopiedEmail(null), 2000);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        
        Array.from(files).forEach(file => {
            const newDoc: AttachedDoc = {
                id: Date.now() + Math.random(),
                name: file.name,
                fileType: file.type.split('/')[1] || 'file',
                size: `${(file.size / 1024).toFixed(1)} KB`,
            };
            setAttachedDocs(prev => [...prev, newDoc]);
        });
    };

    const removeDoc = (id: number) => {
        setAttachedDocs(attachedDocs.filter(d => d.id !== id));
    };

    const handleSave = async () => {
        if (!title.trim()) {
            setActiveTab('overview');
            return;
        }
        
        setIsSaving(true);
        
        const questData: NewQuestData = {
            title,
            synopsis,
            type: questType,
            status: questStatus,
            isHot,
            author,
            authorRole,
            timeline,
            emailDL,
            attachedDocs,
        };
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (onSave) {
            onSave(questData);
        }
        
        // Clear draft
        sessionStorage.removeItem(NEW_QUEST_STORAGE_KEY);
        
        setSavedMessage('Quest created');
        setTimeout(() => {
            setIsSaving(false);
            onClose();
        }, 1000);
    };

    const formatDateDisplay = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getFileIcon = (fileType: string) => {
        if (fileType.includes('pdf')) return <FileText size={18} className="text-red-600" />;
        if (fileType.includes('image')) return <FileImage size={18} className="text-purple-600" />;
        if (fileType.includes('sheet') || fileType.includes('excel')) return <FileSpreadsheet size={18} className="text-green-600" />;
        return <FileText size={18} className="text-blue-600" />;
    };

    const tabs = [
        { id: 'overview', label: 'Overview', count: 0 },
        { id: 'timeline', label: 'Timeline', count: timeline.length },
        { id: 'distribution', label: 'Distribution', count: emailDL.length + 1 },
        { id: 'documents', label: 'Documents', count: attachedDocs.length },
    ] as const;

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Header - turns slightly red when hot */}
            <div className={`flex items-center justify-between px-6 py-4 border-b transition-colors duration-300 ${isHot ? 'bg-red-50/50 border-red-100' : 'border-black/[0.06]'}`}>
                <div className="flex items-center gap-3">
                    <button onClick={onClose} className="p-2 hover:bg-black/[0.03] rounded-lg transition-colors">
                        <ChevronLeft size={18} className="text-black/40" />
                    </button>
                    <div className="h-4 w-px bg-black/10" />
                    
                    <span className="text-sm font-medium text-black/60">New Quest</span>
                    
                    {/* Status Selector */}
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

                    {/* Type Selector */}
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
                </div>
                
                <div className="flex items-center gap-2">
                    {/* Create Button */}
                    <button
                        onClick={handleSave}
                        disabled={isSaving || !title.trim()}
                        className="flex items-center gap-1.5 px-4 py-1.5 text-[12px] font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? 'Creating...' : 'Create Quest'}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-2xl mx-auto px-6 py-8">
                    {/* Title Input */}
                    <input
                        type="text"
                        placeholder="Quest title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full text-2xl font-serif font-medium text-black placeholder:text-black/20 bg-transparent border-none outline-none mb-3"
                    />
                    <textarea
                        placeholder="Add a synopsis..."
                        value={synopsis}
                        onChange={(e) => setSynopsis(e.target.value)}
                        rows={2}
                        className="w-full text-[15px] text-black/70 placeholder:text-black/30 bg-transparent border-none outline-none resize-none mb-6"
                    />

                    {/* Meta */}
                    <div className="flex items-center gap-6 py-4 border-y border-black/[0.06] mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px]">{author[0]}</div>
                            <div>
                                <p className="text-[13px] font-medium">{author}</p>
                                <p className="text-[11px] text-black/40">{authorRole}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-[13px] text-black/40">
                            <Clock size={14} />
                            <span>Just now</span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-1 mb-6">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-3 py-1.5 text-[12px] font-medium rounded-md transition-colors whitespace-nowrap ${
                                    activeTab === tab.id ? 'bg-black text-white' : 'text-black/50 hover:text-black hover:bg-black/[0.03]'
                                }`}
                            >
                                {tab.label}
                                {tab.count > 0 && <span className="ml-1.5 opacity-60">{tab.count}</span>}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <div className="p-4 bg-gray-50/50 rounded-xl border border-black/[0.06]">
                                <h4 className="text-[13px] font-medium mb-3">Quest Settings</h4>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-[11px] text-black/50 uppercase tracking-wide">Author</label>
                                        <input
                                            type="text"
                                            value={author}
                                            onChange={(e) => setAuthor(e.target.value)}
                                            className="w-full mt-1 px-3 py-2 text-[13px] bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] text-black/50 uppercase tracking-wide">Role</label>
                                        <input
                                            type="text"
                                            value={authorRole}
                                            onChange={(e) => setAuthorRole(e.target.value)}
                                            className="w-full mt-1 px-3 py-2 text-[13px] bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black/20"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                                        <Check size={16} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-[13px] font-medium text-blue-900">Auto-save enabled</h4>
                                        <p className="text-[12px] text-blue-700/70 mt-1">
                                            Your progress is automatically saved as a draft. You can close and come back anytime.
                                        </p>
                                    </div>
                                </div>
                            </div>
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
                                    const style = TIMETYPE_STYLES[event.type];
                                    return (
                                        <div 
                                            key={event.id} 
                                            className="group flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                        >
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
                                            <button onClick={() => deleteEvent(event.id)} className="p-1 hover:bg-black/5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                <X size={14} className="text-red-400" />
                                            </button>
                                        </div>
                                    );
                                })}
                                {timeline.length === 0 && (
                                    <p className="text-[13px] text-black/30 py-4 text-center">No events yet. Add key dates for this quest.</p>
                                )}
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
                            {/* Unique Quest Email */}
                            <div className="p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center">
                                        <Mail size={12} className="text-violet-600" />
                                    </div>
                                    <span className="text-[11px] font-semibold text-violet-700 uppercase tracking-wide">Quest Email</span>
                                </div>
                                <p className="text-[13px] text-black/60 mb-3">
                                    This unique email will be created for your quest
                                </p>
                                <button
                                    onClick={() => copyEmail(uniqueEmail)}
                                    className="w-full flex items-center justify-between gap-3 bg-white border border-violet-200 px-4 py-3 rounded-lg hover:border-violet-300 transition-all group"
                                >
                                    <span className="text-[15px] font-medium text-violet-700">{uniqueEmail}</span>
                                    <Copy size={16} className={`transition-colors ${copiedEmail === uniqueEmail ? 'text-green-600' : 'text-violet-300 group-hover:text-violet-500'}`} />
                                </button>
                            </div>

                            {/* Distribution List */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Users size={14} className="text-black/40" />
                                    <span className="text-[11px] font-medium text-black/60 uppercase tracking-wide">Distribution List</span>
                                </div>
                                
                                <div className="flex gap-2 mb-3">
                                    <input
                                        type="email"
                                        placeholder="Add email..."
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && addEmail()}
                                        className="flex-1 px-3 py-2 text-[13px] bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black/20"
                                    />
                                    <button 
                                        onClick={addEmail}
                                        className="px-3 py-2 bg-teal-600 text-white rounded-lg text-[12px] font-medium hover:bg-teal-700 transition-colors"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                                
                                <div className="flex flex-wrap gap-2">
                                    {emailDL.map(email => (
                                        <div
                                            key={email}
                                            className="flex items-center gap-1.5 text-[12px] bg-gray-50 border border-black/[0.08] px-3 py-2 rounded-lg"
                                        >
                                            <Mail size={12} className="text-black/30" />
                                            {email}
                                            <button onClick={() => removeEmail(email)} className="ml-1 p-0.5 hover:bg-black/5 rounded">
                                                <X size={12} className="text-black/40" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {emailDL.length === 0 && (
                                    <p className="text-[12px] text-black/30 mt-2">No emails added yet.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'documents' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-semibold text-black/40 uppercase tracking-wide">Attachments</span>
                                <label className="flex items-center gap-1.5 text-[11px] text-black/50 hover:text-black transition-colors cursor-pointer">
                                    <Upload size={12} />
                                    Upload
                                    <input 
                                        type="file" 
                                        multiple 
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            
                            <div className="space-y-2">
                                {attachedDocs.map(file => (
                                    <div 
                                        key={file.id} 
                                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl group"
                                    >
                                        <div className="w-9 h-9 bg-white border border-black/[0.06] rounded-lg flex items-center justify-center">
                                            {getFileIcon(file.fileType)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[14px] font-medium text-black truncate">{file.name}</p>
                                            <p className="text-[11px] text-black/40">{file.size}</p>
                                        </div>
                                        <button 
                                            onClick={() => removeDoc(file.id)}
                                            className="p-2 hover:bg-black/[0.05] rounded-lg text-black/30 hover:text-red-400 transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                                {attachedDocs.length === 0 && (
                                    <div className="p-8 border-2 border-dashed border-black/10 rounded-xl text-center">
                                        <Upload size={24} className="text-black/20 mx-auto mb-2" />
                                        <p className="text-[13px] text-black/40">Drop files here or click to upload</p>
                                        <label className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 text-white rounded-lg text-[12px] font-medium cursor-pointer hover:bg-teal-700 transition-colors">
                                            <Plus size={14} />
                                            Select Files
                                            <input 
                                                type="file" 
                                                multiple 
                                                onChange={handleFileUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
