import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { type BreadcrumbItem } from '@/types';
import { Role, Permission } from '@/types/models';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { usePermission } from '@/hooks/usePermission';
import { useToast } from '@/components/ui/use-toast';

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
    title: 'Create',
    href: '/users/create',
  },
];

interface Props {
  roles: Role[];
  permissions: Permission[];
}

export default function Create({ roles = [], permissions = [] }: Props) {
  const { hasPermission } = usePermission();
  const { toast } = useToast();
  const canEditPermissions = hasPermission('permissions.edit');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    roles: [] as string[],
    permissions: [] as string[],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleToggle = (roleId: number) => {
    const roleIdStr = roleId.toString();
    const isChecked = !formData.roles.includes(roleIdStr);
    
    setFormData(prev => ({
      ...prev,
      roles: isChecked
        ? [...prev.roles, roleIdStr]
        : prev.roles.filter(id => id !== roleIdStr),
    }));
  };

  const handlePermissionToggle = (permissionId: number) => {
    const permissionIdStr = permissionId.toString();
    const isChecked = !formData.permissions.includes(permissionIdStr);
    
    setFormData(prev => ({
      ...prev,
      permissions: isChecked
        ? [...prev.permissions, permissionIdStr]
        : prev.permissions.filter(id => id !== permissionIdStr),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    router.post(route('users.store'), formData, {
      onSuccess: () => {
        setIsSubmitting(false);
        toast({
          title: "Success",
          description: "User created successfully"
        })
      },
      onError: (errors) => {
        setErrors(errors);
        setIsSubmitting(false);
        toast({
          title: "Error",
          description: "Failed to create user",
          variant: "destructive"
        })
      },
    })
  };

  return (
    <AdminLayout title="Create User" breadcrumbs={breadcrumbs} requiredPermission="users.create">
      <Head title="Create User" />
      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Create User</h1>
          <Button variant="outline" asChild>
            <Link href={route('users.index')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 mr-2">
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Back to Users
            </Link>
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>Create a new user account and assign roles.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="password_confirmation">Confirm Password</Label>
                <Input 
                  id="password_confirmation" 
                  name="password_confirmation" 
                  type="password" 
                  value={formData.password_confirmation} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="grid gap-2">
                <Label>Roles</Label>
                <div className="border rounded-md p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {roles.map((role) => (
                      <div key={role.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`role-${role.id}`} 
                          checked={formData.roles.includes(role.id.toString())} 
                          onCheckedChange={() => handleRoleToggle(role.id)} 
                        />
                        <Label htmlFor={`role-${role.id}`} className="cursor-pointer">
                          {role.display_name || role.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                {errors.roles && (
                  <p className="text-sm text-red-500">{errors.roles}</p>
                )}
              </div>
              
              {canEditPermissions && (
                  <Separator />
                  
                  <div className="grid gap-2">
                    <Label>Direct Permissions</Label>
                    <div className="border rounded-md p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {permissions.map((permission) => (
                          <div key={permission.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`permission-${permission.id}`} 
                              checked={formData.permissions.includes(permission.id.toString())} 
                              onCheckedChange={() => handlePermissionToggle(permission.id)} 
                            />
                            <Label htmlFor={`permission-${permission.id}`} className="cursor-pointer">
                              {permission.display_name || permission.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <Button type="button" variant="outline" asChild>
                <Link href={route('users.index')}>Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create User'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
}
</Input>
</Input>

