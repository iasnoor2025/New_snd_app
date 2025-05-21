import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface ResourceModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    onSubmit?: () => void;
    isLoading?: boolean;
    submitText?: string;
    showFooter?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
};

export function ResourceModal({
    isOpen,
    onClose,
    title,
    children,
    onSubmit,
    isLoading = false,
    submitText = 'Save',
    showFooter = true,
    size = 'md',
}: ResourceModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={sizeClasses[size]}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {children}
                </div>
                {showFooter && (
                    <div className="flex justify-end space-x-2 mt-4">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                            Cancel
                        </Button>
                        {onSubmit && (
                            <Button
                                onClick={onSubmit}
                                disabled={isLoading}
                                {isLoading && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {submitText}
                            </Button>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
