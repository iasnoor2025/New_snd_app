import { useState, useCallback } from 'react';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import { ProjectResource, ResourceType } from '@/types/projectResources';

export const useProjectResources = (projectId: number) => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedResource, setSelectedResource] = useState<ProjectResource | null>(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleEdit = useCallback((resource: ProjectResource, type: ResourceType) => {
        setSelectedResource(resource);
        // Open appropriate edit modal based on type
        switch (type) {
            case 'manpower':
                router.visit(route('projects.manpower.edit', [projectId, resource.id]));
                break;
            case 'equipment':
                router.visit(route('projects.equipment.edit', [projectId, resource.id]));
                break;
            case 'material':
                router.visit(route('projects.materials.edit', [projectId, resource.id]));
                break;
            case 'fuel':
                router.visit(route('projects.fuel.edit', [projectId, resource.id]));
                break;
            case 'expense':
                router.visit(route('projects.expenses.edit', [projectId, resource.id]));
                break;
        }
    }, [projectId]);

    const handleDelete = useCallback((resource: ProjectResource, type: ResourceType) => {
        setSelectedResource(resource);
        setDeleteModalOpen(true);
    }, []);

    const handleDeleteConfirmed = useCallback(async () => {
        if (!selectedResource) return;

        setIsLoading(true);
        try {
            const routeName = `projects.${selectedResource.type}.destroy`;
            await router.delete(route(routeName, [projectId, selectedResource.id]));
            toast.success('Resource deleted successfully');
            setDeleteModalOpen(false);
            setSelectedResource(null);
        } catch (error) {
            toast.error('Failed to delete resource');
        } finally {
            setIsLoading(false);
        }
    }, [projectId, selectedResource]);

    return {
        isLoading,
        selectedResource,
        isDeleteModalOpen,
        setDeleteModalOpen,
        handleEdit,
        handleDelete,
        handleDeleteConfirmed,
    };
};



