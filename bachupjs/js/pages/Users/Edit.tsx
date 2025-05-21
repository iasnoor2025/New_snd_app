import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { type BreadcrumbItem } from '@/types';
import { User, Role, Permission } from '@/types/models';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { usePermission } from '@/hooks/usePermission';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';

interface Props {
  user: User & {
    roles: Role[];
    permissions: Permission[];
  };
  roles: Role[];
  directPermissions: Permission[];
  allPermissions: Permission[];
}

export default function Edit({ user, roles, directPermissions, allPermissions }: Props) {
  const { hasPermission } = usePermission();
  const { toast } = useToast();
  const canEditUser = hasPermission('users.edit');
  const canEditRoles = hasPermission('roles.edit');
  const canEditPermissions = hasPermission('permissions.edit');
  
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: '',
    password_confirmation: '',
    roles: user.roles.map(role => role.id.toString()),
    permissions: directPermissions.map(permission => permission.id.toString()),
  })
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleRoleChange = (roleId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      roles: checked
        ? [...prev.roles, roleId]
        : prev.roles.filter(id => id !== roleId),
    }));
  };
  
  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, permissionId]
        : prev.permissions.filter(id => id !== permissionId),
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post(route('users.update', user.id), {
      _method: 'PUT',
      ...formData,
    }, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "User updated successfully"
        })
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to update user",
          variant: "destructive"
        })
      },
    })
  };
  
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Users',
      href: '/users',
    },
    {
      title: user.name,
      href: `/users/${user.id}`,
    },
    {
      title: 'Edit',
      href: `/users/${user.id}/edit`,
    },
  ];

  if (!canEditUser) {
    return (
      <AdminLayout title="Access Denied" breadcrumbs={breadcrumbs}>
        <Head title="Access Denied" />
        <div className="flex h-full flex-1 flex-col gap-4 p-4">
          <Alert variant="destructive">
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You do not have permission to edit users.
            </AlertDescription>
          </Alert>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`Edit User: ${user.name}`} breadcrumbs={breadcrumbs}>
      <Head title={`Edit User: ${user.name}`} />
      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Edit User</h1>
          <Button variant="outline" asChild>
            <Link href={route('users.show', user.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to User
            </Link>
          </Button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>Edit basic user details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input 
                      id="password" 
                      name="password" 
                      type="password" 
                      value={formData.password} 
                      onChange={handleChange} 
                      placeholder="Leave blank to keep current password" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password_confirmation">Confirm New Password</Label>
                    <Input 
                      id="password_confirmation" 
                      name="password_confirmation" 
                      type="password" 
                      value={formData.password_confirmation} 
                      onChange={handleChange} 
                      placeholder="Leave blank to keep current password" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {canEditRoles && (
              <Card>
                <CardHeader>
                  <CardTitle>Roles</CardTitle>
                  <CardDescription>Assign roles to this user</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {roles.map((role) => (
                      <div key={role.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`role-${role.id}`} 
                          checked={formData.roles.includes(role.id.toString())} 
                          onCheckedChange={(checked) => handleRoleChange(role.id.toString(), checked as boolean)} 
                        />
                        <Label htmlFor={`role-${role.id}`} className="cursor-pointer">
                          {role.display_name || role.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {canEditPermissions && (
              <Card>
                <CardHeader>
                  <CardTitle>Direct Permissions</CardTitle>
                  <CardDescription>Assign permissions directly to this user</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {allPermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`permission-${permission.id}`} 
                          checked={formData.permissions.includes(permission.id.toString())} 
                          onCheckedChange={(checked) => handlePermissionChange(permission.id.toString(), checked as boolean)} 
                        />
                        <Label htmlFor={`permission-${permission.id}`} className="cursor-pointer">
                          {permission.display_name || permission.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" asChild>
                <Link href={route('users.show', user.id)}>Cancel</Link>
              </Button>
              <Button type="submit">Update User</Button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
} 
</Input>
</Input>

