import { useState } from 'react';
import { router } from '@inertiajs/react';

interface UseResourceSubmitProps {
    projectId: number;
    type: string;
    onSuccess?: () => void;
}

interface UseResourceSubmitReturn {
    isSubmitting: boolean;
    handleSubmit: (data: any) => void;
    handleUpdate: (id: number, data: any) => void;
    handleDelete: (id: number) => void;
}

export function useResourceSubmit({
    projectId,
    type,
    onSuccess
}: UseResourceSubmitProps): UseResourceSubmitReturn {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (data: any) => {
        setIsSubmitting(true);
        
        router.post(`/projects/${projectId}/resources/${type}`, data, {
            onSuccess: () => {
                setIsSubmitting(false);
                onSuccess?.();
            },
            onError: () => {
                setIsSubmitting(false);
            }
        });
    };

    const handleUpdate = (id: number, data: any) => {
        setIsSubmitting(true);
        
        router.put(`/projects/${projectId}/resources/${type}/${id}`, data, {
            onSuccess: () => {
                setIsSubmitting(false);
                onSuccess?.();
            },
            onError: () => {
                setIsSubmitting(false);
            }
        });
    };

    const handleDelete = (id: number) => {
        setIsSubmitting(true);
        
        router.delete(`/projects/${projectId}/resources/${type}/${id}`, {
            onSuccess: () => {
                setIsSubmitting(false);
                onSuccess?.();
            },
            onError: () => {
                setIsSubmitting(false);
            }
        });
    };

    return {
        isSubmitting,
        handleSubmit,
        handleUpdate,
        handleDelete,
    };
}