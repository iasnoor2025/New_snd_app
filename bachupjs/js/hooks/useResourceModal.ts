import { useState, useCallback } from 'react';
import { useProjectResourcesStore } from '@/stores/projectResources';
import { resourceService } from '@/services/resourceService';
import { ToastService } from '@/components/shared/ToastManager';
import type { ResourceType } from '@/types/projectResources';
import { manpowerSchema } from '@/schemas/resourceSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

interface UseResourceModalOptions {
    projectId: number;
    type: ResourceType;
    onSuccess?: () => void;
}

type ManpowerFormData = z.infer<typeof manpowerSchema>

export function useResourceModal({ projectId, type, onSuccess }: UseResourceModalOptions) {
    const {
        isCreateModalOpen,
        isEditModalOpen,
        isDeleteModalOpen,
        selectedResource,
        isLoading,
        setCreateModalOpen,
        setEditModalOpen,
        setDeleteModalOpen,
        setSelectedResource,
        setLoading,
    } = useProjectResourcesStore();

    const form = useForm<ManpowerFormData>({
        resolver: zodResolver(manpowerSchema),
        defaultValues: {
            employee_id: undefined,
            worker_name: '',
            job_title: '',
            start_date: '',
            end_date: '',
            daily_rate: 0,
            total_days: 0,
            notes: '',
        },
    })

    const handleCreate = useCallback(async (data: ManpowerFormData) => {
        setLoading(true);
        try {
            await resourceService.createManpower(projectId, data);
            ToastService.success('Manpower resource created successfully');
            setCreateModalOpen(false);
            form.reset();
            onSuccess?.();
        } catch (error) {
            console.error('Error creating manpower resource:', error);
            ToastService.error('Failed to create manpower resource');
        } finally {
            setLoading(false);
        }
    }, [projectId, setCreateModalOpen, setLoading, onSuccess, form]);

    const handleUpdate = useCallback(async (data: ManpowerFormData) => {
        if (!selectedResource) return;
        setLoading(true);
        try {
            await resourceService.updateManpower(projectId, selectedResource.id, data);
            ToastService.success('Manpower resource updated successfully');
            setEditModalOpen(false);
            form.reset();
            onSuccess?.();
        } catch (error) {
            console.error('Error updating manpower resource:', error);
            ToastService.error('Failed to update manpower resource');
        } finally {
            setLoading(false);
        }
    }, [projectId, selectedResource, setEditModalOpen, setLoading, onSuccess, form]);

    const handleDelete = useCallback(async () => {
        if (!selectedResource) return;
        setLoading(true);
        try {
            await resourceService.deleteManpower(projectId, selectedResource.id);
            ToastService.success('Manpower resource deleted successfully');
            setDeleteModalOpen(false);
            onSuccess?.();
        } catch (error) {
            console.error('Error deleting manpower resource:', error);
            ToastService.error('Failed to delete manpower resource');
        } finally {
            setLoading(false);
        }
    }, [projectId, selectedResource, setDeleteModalOpen, setLoading, onSuccess]);

    const openCreateModal = useCallback(() => {
        setSelectedResource(null);
        form.reset();
        setCreateModalOpen(true);
    }, [setSelectedResource, setCreateModalOpen, form]);

    const openEditModal = useCallback((resource: any) => {
        setSelectedResource(resource);
        form.reset({
            employee_id: resource.employee_id,
            worker_name: resource.worker_name,
            job_title: resource.job_title,
            start_date: resource.start_date,
            end_date: resource.end_date,
            daily_rate: resource.daily_rate,
            total_days: resource.total_days,
            notes: resource.notes,
        })
        setEditModalOpen(true);
    }, [setSelectedResource, setEditModalOpen, form]);

    const openDeleteModal = useCallback((resource: any) => {
        setSelectedResource(resource);
        setDeleteModalOpen(true);
    }, [setSelectedResource, setDeleteModalOpen]);

    return {
        isCreateModalOpen,
        isEditModalOpen,
        isDeleteModalOpen,
        selectedResource,
        isLoading,
        form,
        openCreateModal,
        openEditModal,
        openDeleteModal,
        handleCreate,
        handleUpdate,
        handleDelete,
    };
}
