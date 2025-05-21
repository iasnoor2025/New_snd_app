import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { type BreadcrumbItem } from '@/types';
import { User, Role, Permission } from '@/types/models';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { usePermission } from '@/hooks/usePermission';

interface Props {
  user: User & {
    roles: Role[];
    permissions: Permission[];
  };
}

export default function Show({ user }: Props) {
  const { hasPermission } = usePermission();
  const canEditUser = hasPermission('users.edit');

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
  ];

  return (
    <AdminLayout title={`User: ${user.name}`} breadcrumbs={breadcrumbs}>
      <Head title={`User: ${user.name}`} />
      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">User Details</h1>
          {canEditUser && (
            <Button asChild>
              <Link href={route('users.edit', user.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
                Edit User
              </Link>
            </Button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>Basic user details</CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString('ar-SA') : '-'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.updated_at ? new Date(user.updated_at).toLocaleDateString('ar-SA') : '-'}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Roles</CardTitle>
              <CardDescription>User assigned roles</CardDescription>
            </CardHeader>
            <CardContent>
              {user.roles && user.roles.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.roles.map((role) => (
                    <Badge key={role.id} variant="secondary" className="text-sm">
                      {role.display_name || role.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No roles assigned</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
            <CardDescription>Effective permissions for this user</CardDescription>
          </CardHeader>
          <CardContent>
            {user.permissions && user.permissions.length > 0 ? (
              <div className="grid gap-4">
                <div className="flex flex-wrap gap-2">
                  {user.permissions.map((permission) => (
                    <Badge key={permission.id} className="text-sm">
                      {permission.display_name || permission.name}
                    </Badge>
                  ))}
                </div>
                <Separator />
                <div className="text-sm text-gray-500">
                  <p>Permissions include those granted directly to the user and those inherited from roles.</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No permissions assigned</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
