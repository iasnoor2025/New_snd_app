import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Button } from '../../../../../../resources/js/components/ui/button';
import AdminLayout from '@/layouts/AdminLayout';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '../../../../../../resources/js/components/ui/dialog';

interface Role {
  id: number;
  name: string;
}

interface Props {
  roles: Role[];
}

const RolesIndex: React.FC<Props> = ({ roles }) => {
  const [deleteRole, setDeleteRole] = useState<{ id: number; name: string } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDeleteDialog = (role: Role) => {
    setDeleteRole(role);
    setDialogOpen(true);
  };

  const handleDelete = () => {
    if (deleteRole) {
      Inertia.delete(route('roles.destroy', deleteRole.id));
      setDialogOpen(false);
      setDeleteRole(null);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDeleteRole(null);
  };

  return (
    <AdminLayout title="Roles" requiredPermission="roles.view">
      <Head title="Roles" />
      <div className="container mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Roles</h1>
          <Button onClick={() => Inertia.get(route('roles.create'))} className="px-6 py-2 text-lg">Create Role</Button>
        </div>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roles.map(role => (
                <tr key={role.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{role.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{role.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" onClick={() => Inertia.get(route('roles.edit', role.id))}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => openDeleteDialog(role)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Role</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the role{' '}
                <span className="font-semibold">{deleteRole?.name}</span>? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={handleDialogClose}>Cancel</Button>
              </DialogClose>
              <Button variant="destructive" onClick={handleDelete}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default RolesIndex;
