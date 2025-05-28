import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../../resources/js/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../../../resources/js/components/ui/table';
import { Button } from '../../../../../../resources/js/components/ui/button';

interface Role {
  id: number;
  name: string;
}

interface Props {
  roles: Role[];
}

const RolesIndex: React.FC<Props> = ({ roles }) => {
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      Inertia.delete(route('roles.destroy', id));
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Roles</CardTitle>
        <Button onClick={() => Inertia.get(route('roles.create'))} className="mt-2">Create Role</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map(role => (
              <TableRow key={role.id}>
                <TableCell>{role.id}</TableCell>
                <TableCell>{role.name}</TableCell>
                <TableCell>
                  <Button size="sm" onClick={() => Inertia.get(route('roles.edit', role.id))}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(role.id)} className="ml-2">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RolesIndex;
