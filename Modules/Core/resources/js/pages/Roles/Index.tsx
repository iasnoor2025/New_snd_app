import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Button } from '../../../../../../resources/js/components/ui/button';
import AdminLayout from '../../../../../../resources/js/layouts/AdminLayout';
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
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../../resources/js/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../../../resources/js/components/ui/table';

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
      <Card className="mt-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Roles</CardTitle>
          <Button onClick={() => Inertia.get(route('roles.create'))}>
            Create Role
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>
                  <div className="flex justify-end">
                    Actions
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map(role => (
                <TableRow key={role.id}>
                  <TableCell>{role.id}</TableCell>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button size="sm" onClick={() => Inertia.get(route('roles.edit', role.id))}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => openDeleteDialog(role)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
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
    </AdminLayout>
  );
};

export default RolesIndex;
