import { useState, useCallback } from 'react';
import { resourceService } from '@/services/resourceService';
import { ToastService } from '@/components/shared/ToastManager';

type ResourceType = 'manpower' | 'equipment' | 'material' | 'fuel' | 'expense';

interface UseResourceFormModalProps {
    projectId: number;
    type: ResourceType;
    onSuccess?: () => void;
}

export function useResourceFormModal({ projectId, type, onSuccess }: UseResourceFormModalProps) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedResource, setSelectedResource] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const openCreateModal = useCallback(() => {
        setSelectedResource(null);
        setIsCreateModalOpen(true);
    }, []);

    const openEditModal = useCallback((resource: any) => {
        setSelectedResource(resource);
        setIsEditModalOpen(true);
    }, []);

    const closeCreateModal = useCallback(() => {
        setIsCreateModalOpen(false);
        setSelectedResource(null);
    }, []);

    const closeEditModal = useCallback(() => {
        setIsEditModalOpen(false);
        setSelectedResource(null);
    }, []);

    const handleCreate = useCallback(async (data: any) => {
        setIsLoading(true);
        try {
            await resourceService.createResource(projectId, type, data);
            ToastService.success(`${type.charAt(0).toUpperCase() + type.slice(1)} resource created successfully`);
            onSuccess?.();
            closeCreateModal();
        } catch (error) {
            console.error('Error creating resource:', error);
            ToastService.error('Failed to create resource');
        } finally {
            setIsLoading(false);
        }
    }, [projectId, type, onSuccess, closeCreateModal]);

    const handleUpdate = useCallback(async (data: any) => {
        if (!selectedResource?.id) return;

        setIsLoading(true);
        try {
            await resourceService.updateResource(projectId, type, selectedResource.id, data);
            ToastService.success(`${type.charAt(0).toUpperCase() + type.slice(1)} resource updated successfully`);
            onSuccess?.();
            closeEditModal();
        } catch (error) {
            console.error('Error updating resource:', error);
            ToastService.error('Failed to update resource');
        } finally {
            setIsLoading(false);
        }
    }, [projectId, type, selectedResource?.id, onSuccess, closeEditModal]);

    const handleDelete = useCallback(async () => {
        if (!selectedResource?.id) return;

        setIsLoading(true);
        try {
            await resourceService.deleteResource(projectId, type, selectedResource.id);
            ToastService.success(`${type.charAt(0).toUpperCase() + type.slice(1)} resource deleted successfully`);
            onSuccess?.();
            closeEditModal();
        } catch (error) {
            console.error('Error deleting resource:', error);
            ToastService.error('Failed to delete resource');
        } finally {
            setIsLoading(false);
        }
    }, [projectId, type, selectedResource?.id, onSuccess, closeEditModal]);

    return {
        isCreateModalOpen,
        isEditModalOpen,
        selectedResource,
        isLoading,
        openCreateModal,
        openEditModal,
        closeCreateModal,
        closeEditModal,
        handleCreate,
        handleUpdate,
        handleDelete
    };
}



