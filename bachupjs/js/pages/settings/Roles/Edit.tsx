import React, { useState, useEffect } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import AdminLayout from '@/layouts/AdminLayout';
import ProtectedPage from '@/components/ProtectedPage';
import { useToast } from '@/components/ui/use-toast';

interface Permission {
  id: number;
  name: string;
}

interface PermissionGroup {
  [key: string]: Permission[];
}

interface Role {
  id: number;
  name: string;
  display_name?: string;
  description?: string;
  permissions: Permission[];
}

interface Props {
  role: Role;
  permissions: PermissionGroup;
  selectedPermissions: number[];
}

export default function EditRole({ role, permissions, selectedPermissions: initialSelectedPermissions }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: role.name,
    display_name: role.display_name || '',
    description: role.description || '',
  })
  const { toast } = useToast();
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>(initialSelectedPermissions);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('roles.update', role.id), {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Role updated successfully"
        })
        router.visit(route('roles.index'));
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to update role. Please check the form for errors.",
          variant: "destructive"
        })
      }
    })
  };

  const handlePermissionChange = (permissionId: number) => {
    setSelectedPermissions(prev => {
      if (prev.includes(permissionId)) {
        return prev.filter(id => id !== permissionId);
      } else {
        return [...prev, permissionId];
      }
    })
  };

  const handleSelectAllInGroup = (groupPermissions: Permission[], checked: boolean) => {
    const permissionIds = groupPermissions.map(p => p.id);
    
    if (checked) {
      // Add all permissions from this group that aren't already selected
      setSelectedPermissions(prev => {
        const newPermissions = [...prev];
        permissionIds.forEach(id => {
          if (!newPermissions.includes(id)) {
            newPermissions.push(id);
          }
        })
        return newPermissions;
      })
    } else {
      // Remove all permissions from this group
      setSelectedPermissions(prev => 
        prev.filter(id => !permissionIds.includes(id))
      );
    }
  };

  const isGroupFullySelected = (groupPermissions: Permission[]) => {
    return groupPermissions.every(permission => 
      selectedPermissions.includes(permission.id)
    );
  };

  const isGroupPartiallySelected = (groupPermissions: Permission[]) => {
    return groupPermissions.some(permission => 
      selectedPermissions.includes(permission.id)
    ) && !isGroupFullySelected(groupPermissions);
  };

  return (
    <AdminLayout>
      <Head title={`Edit Role: ${role.name}`} />
      <ProtectedPage permission="roles.edit" title={`Edit Role: ${role.name}`}>
        <div className="container mx-auto py-6">
          <div className="mb-6">
            <Link href={route('roles.index')} className="flex items-center text-sm text-gray-500 hover:text-gray-700">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Roles
            </Link>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Edit Role: {role.name}</CardTitle>
              <CardDescription>
                Update role details and permissions.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Role Name (System Name)</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter role name (e.g. admin, manager)"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="display_name">Display Name</Label>
                  <Input
                    id="display_name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter display name (e.g. Admin, Manager)"
                    className={errors.display_name ? 'border-red-500' : ''}
                  />
                  {errors.display_name && (
                    <p className="text-red-500 text-sm mt-1">{errors.display_name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter role description"
                    className={errors.description ? 'border-red-500' : ''}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <Label>Permissions</Label>
                  {errors.permissions && (
                    <p className="text-red-500 text-sm mt-1">{errors.permissions}</p>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(permissions).map(([group, groupPermissions]) => (
                      <Card key={group} className="overflow-hidden">
                        <CardHeader className="bg-muted py-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`group-${group}`}
                              checked={isGroupFullySelected(groupPermissions)}
                              indeterminate={isGroupPartiallySelected(groupPermissions)}
                              onCheckedChange={(checked) => 
                                handleSelectAllInGroup(groupPermissions, checked as boolean)
                              }
                            />
                            <Label htmlFor={`group-${group}`} className="font-medium capitalize">
                              {group}
                            </Label>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="space-y-2">
                            {groupPermissions.map((permission) => (
                              <div key={permission.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`permission-${permission.id}`}
                                  checked={selectedPermissions.includes(permission.id)}
                                  onCheckedChange={() => handlePermissionChange(permission.id)}
                                />
                                <Label htmlFor={`permission-${permission.id}`} className="text-sm">
                                  {permission.name.split('.')[1]}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={() => router.visit(route('roles.index'))}>
                  Cancel
                </Button>
                <Button type="submit">Update Role</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </ProtectedPage>
    </AdminLayout>
  );
} 