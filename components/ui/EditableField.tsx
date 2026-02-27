import React, { useState, useEffect, useRef } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { PencilEdit01Icon, Tick02Icon, Cancel01Icon } from '@hugeicons/core-free-icons';

export interface EditableFieldProps {
    value: string;
    onSave: (newValue: string) => void;
    className?: string;
    inputClassName?: string;
    multiline?: boolean;
    rows?: number;
}

export const EditableField: React.FC<EditableFieldProps> = ({
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
            <div className="w-full">
                {multiline ? (
                    <textarea
                        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
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
                        onKeyDown={handleKeyDown}
                        className={inputClassName}
                    />
                )}
                <div className="flex items-center gap-2 mt-2">
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                        <HugeiconsIcon icon={Tick02Icon} size={12} />
                        Save
                    </button>
                    <button
                        onClick={handleCancel}
                        className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-medium text-black/50 hover:text-black hover:bg-black/5 rounded-lg transition-colors"
                    >
                        <HugeiconsIcon icon={Cancel01Icon} size={12} />
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`group relative cursor-pointer rounded-lg -m-1 p-1 hover:bg-black/[0.02] transition-colors ${className}`}
            onClick={() => setIsEditing(true)}
        >
            <span>{value}</span>
            <button
                className="inline-flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-all px-2 py-1 bg-white border border-black/10 shadow-sm rounded-md text-[11px] text-black/50 hover:text-teal-600 hover:border-teal-200"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                }}
            >
                <HugeiconsIcon icon={PencilEdit01Icon} size={12} />
                Edit
            </button>
        </div>
    );
};
