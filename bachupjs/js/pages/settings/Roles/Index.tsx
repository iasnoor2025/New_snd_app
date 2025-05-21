import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, BreadcrumbItem } from '@/types';
import AdminLayout from '@/layouts/AdminLayout';
import { usePermission } from '@/hooks/usePermission';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { 
  Plus as PlusIcon, 
  Eye as EyeIcon, 
  Pencil as PencilIcon, 
  Trash as TrashIcon, 
  RotateCw as ArrowPathIcon,
  Users as UsersIcon
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ErrorBoundary from '@/components/ErrorBoundary';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Settings', href: '/settings' },
  { title: 'Roles', href: '/settings/roles' }
];

interface Permission {
  id: number;
  name: string;
}

interface Role {
  id: number;
  name: string;
  display_name?: string;
  description?: string;
  permissions: Permission[];
}

interface Props extends PageProps {
  roles: {
    data: Role[];
    current_page?: number;
    per_page?: number;
    last_page?: number;
    total?: number;
  };
  filters?: {
    search?: string;
  };
}

export default function RolesIndex({ auth, roles, filters = { search: '' } }: Props) {
  const { hasPermission } = usePermission();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  
  // Ensure roles.data is always an array
  const rolesData = roles?.data || roles || [];

  const canCreateRole = hasPermission('roles.create');
  const canEditRole = hasPermission('roles.edit');
  const canDeleteRole = hasPermission('roles.delete');

  const handleSearch = () => {
    router.get(route('roles.index'), {
      search: searchTerm,
    }, {
      preserveState: true,
      replace: true,
    })
  };

  const resetFilters = () => {
    setSearchTerm('');
    router.get(route('roles.index'), {}, {
      preserveState: true,
      replace: true,
    })
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this role?')) {
      router.delete(route('roles.destroy', id), {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Role deleted successfully"
          })
        },
        onError: (errors) => {
          toast({
            title: "Error",
            description: errors.error || 'Failed to delete role',
            variant: "destructive"
          })
        },
      })
    }
  };

  return (
    <AdminLayout title="Roles Management" breadcrumbs={breadcrumbs} requiredPermission="roles.view">
      <Head title="Roles Management" />

      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Roles Management</CardTitle>
            <div className="flex items-center space-x-2">
              {canCreateRole && (
                <Button asChild>
                  <Link href={route('roles.create')}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add New Role
                  </Link>
                </Button>
              )}
              <Button variant="outline" asChild>
                <Link href={route('users.index')}>
                  <UsersIcon className="mr-2 h-4 w-4" />
                  View Users
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  placeholder="Search roles"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch}>
                  Search
                </Button>
                <Button variant="outline" onClick={resetFilters}>
                  <ArrowPathIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Display Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.isArray(rolesData) && rolesData.length > 0 ? (
                    rolesData.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium">
                          {role.name}
                        </TableCell>
                        <TableCell>{role.display_name || role.name}</TableCell>
                        <TableCell>{role.description || 'No description'}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {role.permissions.slice(0, 3).map((permission) => (
                              <Badge key={permission.id} variant="outline" className="mr-1">
                                {permission.name.replace(/\./g, ' ')}
                              </Badge>
                            ))}
                            {role.permissions.length > 3 && (
                              <Badge variant="outline">
                                +{role.permissions.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href={route('roles.show', role.id)}>
                                      <EyeIcon className="h-4 w-4" />
                                    </Link>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            {canEditRole && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="outline" size="sm" asChild>
                                      <Link href={route('roles.edit', role.id)}>
                                        <PencilIcon className="h-4 w-4" />
                                      </Link>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Edit</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            
                            {canDeleteRole && role.name !== 'admin' && role.name !== 'superadmin' && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      variant="destructive" 
                                      size="sm" 
                                      onClick={() => handleDelete(role.id)}
                                      <TrashIcon className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Delete</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No roles found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {roles.last_page && roles.last_page > 1 && (
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (roles.current_page && roles.current_page > 1) {
                      router.get(
                        route('roles.index'),
                        {
                          page: roles.current_page - 1,
                          search: searchTerm,
                        },
                        {
                          preserveState: true,
                          replace: true,
                        }
                      );
                    }
                  }}
                  disabled={!roles.current_page || roles.current_page <= 1}
                  Previous
                </Button>
                <span className="text-sm">
                  Page {roles.current_page || 1} of {roles.last_page}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (roles.current_page && roles.last_page && roles.current_page < roles.last_page) {
                      router.get(
                        route('roles.index'),
                        {
                          page: roles.current_page + 1,
                          search: searchTerm,
                        },
                        {
                          preserveState: true,
                          replace: true,
                        }
                      );
                    }
                  }}
                  disabled={!roles.current_page || !roles.last_page || roles.current_page >= roles.last_page}
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
} 