import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, UserCog } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '@/layouts/AdminLayout';
import ProtectedPage from '@/components/ProtectedPage';

interface Role {
  id: number;
  name: string;
}

interface Permission {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  roles: Role[];
  permissions: Permission[];
}

interface Props {
  users: User[];
  roles: Role[];
}

export default function UserRoles({ users, roles }: Props) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setSelectedRoles(user.roles.map(role => role.id));
    setIsDialogOpen(true);
  };

  const handleRoleChange = (roleId: number) => {
    setSelectedRoles(prev => {
      if (prev.includes(roleId)) {
        return prev.filter(id => id !== roleId);
      } else {
        return [...prev, roleId];
      }
    })
  };

  const handleSubmit = () => {
    if (!selectedUser) return;

    router.put(route('roles.update-user-roles', selectedUser.id), {
      roles: selectedRoles,
    }, {
      onSuccess: () => {
        toast.success('User roles updated successfully');
        setIsDialogOpen(false);
      },
      onError: () => {
        toast.error('Failed to update user roles');
      },
    })
  };

  return (
    <AdminLayout>
      <Head title="User Roles" />
      <ProtectedPage permission="users.manage" title="User Roles Management">
        <div className="container mx-auto py-6">
          <div className="flex items-center mb-6">
            <Link href={route('roles.index')}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Roles
              </Button>
            </Link>
            <h1 className="text-2xl font-bold ml-4">User Role Management</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Roles</CardTitle>
              <CardDescription>
                Manage user roles and permissions in the system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Current Roles</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.roles.map((role) => (
                            <Badge key={role.id} variant="outline">
                              {role.name}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(user)}
                          Edit Roles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {selectedUser ? `Edit Roles for ${selectedUser.name}` : 'Edit User Roles'}
                </DialogTitle>
                <DialogDescription>
                  Select the roles you want to assign to this user.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {roles.map((role) => (
                  <div key={role.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`role-${role.id}`}
                      checked={selectedRoles.includes(role.id)}
                      onCheckedChange={() => handleRoleChange(role.id)}
                    />
                    <Label htmlFor={`role-${role.id}`} className="capitalize">
                      {role.name}
                    </Label>
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </ProtectedPage>
    </AdminLayout>
  );
} 