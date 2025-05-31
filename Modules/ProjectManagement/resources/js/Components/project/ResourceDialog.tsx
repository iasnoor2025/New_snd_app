import React, { useEffect } from 'react';
import { XIcon } from 'lucide-react';
import ResourceForm from './ResourceForm';
import ErrorBoundary from '@/components/ErrorBoundary';

export type ResourceType = 'manpower' | 'equipment' | 'material' | 'fuel' | 'expense';

export interface ResourceDialogProps {
    projectId: number;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    initialType?: ResourceType;
    initialData?: any;
    onSuccess?: () => void;
}

export default function ResourceDialog({
    projectId,
    isOpen = false,
    onOpenChange = () => {},
    initialType = 'manpower',
    initialData = null,
    onSuccess = () => {}
}: ResourceDialogProps) {
    const title = initialData
        ? `Edit ${initialType.charAt(0).toUpperCase() + initialType.slice(1)}`
        : `Add ${initialType.charAt(0).toUpperCase() + initialType.slice(1)}`;

    // Only render the dialog when it's actually open
    if (!isOpen) {
        return null;
    }

    // Add body overflow hidden to prevent scrolling when dialog is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Handle ESC key to close dialog
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onOpenChange(false);
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onOpenChange]);

    // Close on backdrop click
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onOpenChange(false);
        }
    };

    return (
        <ErrorBoundary>
            <div
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
                onClick={handleBackdropClick}
            >
                <div
                    className="bg-white rounded-lg shadow-lg max-w-[500px] w-full relative"
                    onClick={e => e.stopPropagation()}
                    {/* Close button */}
                    <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={() => onOpenChange(false)}
                        <XIcon className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </button>

                    {/* Header */}
                    <div className="p-6 border-b">
                        <h2 className="text-lg font-semibold">{title}</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {initialData
                                ? `Update the details for this ${initialType} resource.`
                                : `Add a new ${initialType} resource to the project.`}
                        </p>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        <ResourceForm
                            type={initialType}
                            projectId={projectId}
                            onSuccess={() => {
                                onSuccess();
                                onOpenChange(false);
                            }}
                            initialData={initialData}
                        />
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
}

