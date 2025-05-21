import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ResourceForm from '@/components/project/ResourceForm';
import ErrorBoundary from '@/components/ErrorBoundary';

interface ResourceFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    type: 'manpower' | 'equipment' | 'material' | 'fuel' | 'expense';
    projectId: number;
    projectEndDate?: string;
    initialData?: any;
    onSuccess?: () => void;
}

export function ResourceFormModal({
    isOpen,
    onClose,
    title,
    type,
    projectId,
    projectEndDate,
    initialData,
    onSuccess
}: ResourceFormModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <ErrorBoundary>
                    <ResourceForm
                        type={type}
                        projectId={projectId}
                        projectEndDate={projectEndDate}
                        initialData={initialData}
                        onSuccess={() => {
                            onSuccess?.();
                            onClose();
                        }}
                    />
                </ErrorBoundary>
            </DialogContent>
        </Dialog>
    );
}
