import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '@/layouts/AdminLayout';
import ProtectedPage from '@/components/ProtectedPage';
import Permission from '@/components/Permission';
import { useToast } from '@/components/ui/use-toast';

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

interface Props {
  role: Role;
}

export default function ShowRole({ role }: Props) {
  const { toast } = useToast();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this role?')) {
      router.delete(route('roles.destroy', role.id), {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Role deleted successfully"
          })
          window.location.href = route('roles.index');
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to delete role",
            variant: "destructive"
          })
        }
      })
    }
  };

  return (
    <AdminLayout>
      <Head title={`Role: ${role.name}`} />
      <ProtectedPage permission="roles.view" title={`Role: ${role.name}`}>
        <div className="container mx-auto py-6">
          <div className="mb-6">
            <Link href={route('roles.index')} className="flex items-center text-sm text-gray-500 hover:text-gray-700">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Roles
            </Link>
          </div>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{role.display_name || role.name}</CardTitle>
                <CardDescription>Role details and permissions</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Permission permission="roles.edit">
                  <Link href={route('roles.edit', role.id)}>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                </Permission>
                <Permission permission="roles.delete">
                  <Button variant="destructive" size="sm" onClick={handleDelete}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </Permission>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Role Information</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="font-semibold">System Name:</span> {role.name}
                    </div>
                    <div>
                      <span className="font-semibold">Display Name:</span> {role.display_name || role.name}
                    </div>
                    <div>
                      <span className="font-semibold">Description:</span> {role.description || '-'}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Permissions</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <Badge key={permission.id} variant="secondary">
                        {permission.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ProtectedPage>
    </AdminLayout>
  );
} 