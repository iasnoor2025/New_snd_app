import { useCallback } from 'react';
import { useResourceStore } from '@/stores/resourceStore';
import { resourceService } from '@/services/resourceService';
import { ToastService } from '@/components/shared/ToastManager';
import type { ResourceType } from '@/types/projectResources';

interface UseResourceOperationsProps {
    projectId: number;
    type: ResourceType;
}

export function useResourceOperations({ projectId, type }: UseResourceOperationsProps) {
    const { setLoading, setError } = useResourceStore();

    const createResource = useCallback(async (data: any) => {
        setLoading(true);
        setError(null);
        try {
            await resourceService.createResource(projectId, type, data);
            ToastService.success(`${type.charAt(0).toUpperCase() + type.slice(1)} resource created successfully`);
            return true;
        } catch (error) {
            console.error('Error creating resource:', error);
            setError('Failed to create resource');
            ToastService.error('Failed to create resource');
            return false;
        } finally {
            setLoading(false);
        }
    }, [projectId, type, setLoading, setError]);

    const updateResource = useCallback(async (resourceId: number, data: any) => {
        setLoading(true);
        setError(null);
        try {
            await resourceService.updateResource(projectId, type, resourceId, data);
            ToastService.success(`${type.charAt(0).toUpperCase() + type.slice(1)} resource updated successfully`);
            return true;
        } catch (error) {
            console.error('Error updating resource:', error);
            setError('Failed to update resource');
            ToastService.error('Failed to update resource');
            return false;
        } finally {
            setLoading(false);
        }
    }, [projectId, type, setLoading, setError]);

    const deleteResource = useCallback(async (resourceId: number) => {
        setLoading(true);
        setError(null);
        try {
            await resourceService.deleteResource(projectId, type, resourceId);
            ToastService.success(`${type.charAt(0).toUpperCase() + type.slice(1)} resource deleted successfully`);
            return true;
        } catch (error) {
            console.error('Error deleting resource:', error);
            setError('Failed to delete resource');
            ToastService.error('Failed to delete resource');
            return false;
        } finally {
            setLoading(false);
        }
    }, [projectId, type, setLoading, setError]);

    return {
        createResource,
        updateResource,
        deleteResource,
    };
}
