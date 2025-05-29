import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import { ResourceFormModal } from '@/Modules/ProjectManagement/resources/js/components/shared/ResourceFormModal';
import { useResourceFormModal } from '@/Modules/ProjectManagement/Resources/js/hooks/useResourceFormModal';
import { useResourceSubmit } from '@/Modules/ProjectManagement/Resources/js/hooks/useResourceSubmit';
import { formatCurrency } from '@/Modules/ProjectManagement/Resources/js/lib/utils';

interface MaterialTabProps {
    project: {
        id: string;
        name: string;
    };
    projectMaterials: any[];
}

export function MaterialTab({ project, projectMaterials }: MaterialTabProps) {
    const {
        isCreateModalOpen,
        isEditModalOpen,
        selectedResource,
        isLoading,
        openCreateModal,
        openEditModal,
        closeCreateModal,
        closeEditModal,
    } = useResourceFormModal({
        projectId: Number(project.id),
        type: 'material',
        onSuccess: () => {
            // Refresh the list of materials
            window.location.reload();
        }
    });

    const { isSubmitting, handleSubmit, handleUpdate, handleDelete } = useResourceSubmit({
        projectId: Number(project.id),
        type: 'material',
        onSuccess: () => {
            closeCreateModal();
            closeEditModal();
            window.location.reload();
        }
    });

    const handleDeleteClick = (material: any) => {
        if (window.confirm('Are you sure you want to delete this material?')) {
            handleDelete(material.id);
        }
    };

    const handleCreateSuccess = () => {
        // The form data is handled by the ResourceForm component
        window.location.reload();
    };

    const handleUpdateSuccess = () => {
        // The form data is handled by the ResourceForm component
        window.location.reload();
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button onClick={openCreateModal}>Add Material</Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>Total Cost</TableHead>
                        <TableHead>Date Used</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projectMaterials.map((material) => (
                        <TableRow key={material.id}>
                            <TableCell>{material.name}</TableCell>
                            <TableCell>{material.unit}</TableCell>
                            <TableCell>{material.quantity}</TableCell>
                            <TableCell>{formatCurrency(material.unit_price)}</TableCell>
                            <TableCell>{formatCurrency(material.quantity * material.unit_price)}</TableCell>
                            <TableCell>{material.date_used}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => openEditModal(material)}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDeleteClick(material)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <ResourceFormModal
                isOpen={isCreateModalOpen}
                onClose={closeCreateModal}
                title="Add Material"
                type="material"
                projectId={Number(project.id)}
                onSuccess={handleCreateSuccess}
            />

            <ResourceFormModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                title="Edit Material"
                type="material"
                projectId={Number(project.id)}
                initialData={selectedResource}
                onSuccess={handleUpdateSuccess}
            />
        </div>
    );
}

export default MaterialTab;
