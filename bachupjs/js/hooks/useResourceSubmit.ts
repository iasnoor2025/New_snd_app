import { useState } from 'react';
import axios from 'axios';
import { ToastService } from '@/components/shared/ToastManager';
import { router } from '@inertiajs/react';

type ResourceType = 'manpower' | 'equipment' | 'material' | 'fuel' | 'expense';

interface UseResourceSubmitProps {
    projectId: number;
    type: ResourceType;
    onSuccess?: () => void;
}

export function useResourceSubmit({ projectId, type, onSuccess }: UseResourceSubmitProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            const endpoint = `/api/projects/${projectId}/resources/${type}`;
            const response = await axios.post(endpoint, data);

            if (response.data.success) {
                ToastService.success(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully`);
                if (onSuccess) {
                    onSuccess();
                } else {
                    router.reload();
                }
            } else {
                ToastService.error(response.data.message || 'Failed to add resource');
            }
        } catch (error: any) {
            console.error('Error submitting form:', error);
            ToastService.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdate = async (id: number, data: any) => {
        setIsSubmitting(true);
        try {
            const endpoint = `/api/projects/${projectId}/resources/${type}/${id}`;
            const response = await axios.put(endpoint, data);

            if (response.data.success) {
                ToastService.success(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully`);
                if (onSuccess) {
                    onSuccess();
                } else {
                    router.reload();
                }
            } else {
                ToastService.error(response.data.message || 'Failed to update resource');
            }
        } catch (error: any) {
            console.error('Error updating form:', error);
            ToastService.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        setIsSubmitting(true);
        try {
            const endpoint = `/api/projects/${projectId}/resources/${type}/${id}`;
            const response = await axios.delete(endpoint);

            if (response.data.success) {
                ToastService.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`);
                if (onSuccess) {
                    onSuccess();
                } else {
                    router.reload();
                }
            } else {
                ToastService.error(response.data.message || 'Failed to delete resource');
            }
        } catch (error: any) {
            console.error('Error deleting resource:', error);
            ToastService.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        isSubmitting,
        handleSubmit,
        handleUpdate,
        handleDelete
    };
}
