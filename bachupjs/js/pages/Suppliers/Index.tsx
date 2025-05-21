import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, BreadcrumbItem } from '@/types';
import AdminLayout from '@/layouts/AdminLayout';
import { Supplier } from '@/types/models';
import { usePermission } from '@/hooks/usePermission';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  Mail as MailIcon, 
  Phone as PhoneIcon,
  RotateCw as ArrowPathIcon
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ErrorBoundary from '@/components/ErrorBoundary';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Suppliers', href: '/suppliers' }
];

interface Props extends PageProps {
  suppliers: {
    data: Supplier[];
    current_page: number;
    per_page: number;
    last_page: number;
    total: number;
  };
  filters?: {
    search?: string;
    status?: string;
  };
}

export default function Index({ auth, suppliers, filters = { search: '', status: 'all' } }: Props) {
  const { hasPermission } = usePermission();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');

  const canCreateSupplier = hasPermission('suppliers.create');
  const canEditSupplier = hasPermission('suppliers.edit');
  const canDeleteSupplier = hasPermission('suppliers.delete');

  const handleSearch = () => {
    router.get(route('suppliers.index'), {
      search: searchTerm,
      status: selectedStatus === 'all' ? undefined : selectedStatus,
    }, {
      preserveState: true,
      replace: true,
    })
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    router.get(route('suppliers.index'), {}, {
      preserveState: true,
      replace: true,
    })
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this supplier?')) {
      router.delete(route('suppliers.destroy', id), {
        onSuccess: () => toast({
          title: "Success",
          description: "Supplier deleted successfully"
        }),
        onError: () => toast({
          title: "Error",
          description: "Failed to delete supplier",
          variant: "destructive"
        }),
      })
    }
  };

  return (
    <AdminLayout title="Supplier Management" breadcrumbs={breadcrumbs} requiredPermission="suppliers.view">
      <Head title="Supplier Management" />

      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Suppliers</CardTitle>
            <div className="flex items-center space-x-2">
              {canCreateSupplier && (
                <Button asChild>
                  <Link href={route('suppliers.create')}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Supplier
                  </Link>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  placeholder="Search suppliers"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <ErrorBoundary>
                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </ErrorBoundary>
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
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliers.data.length > 0 ? (
                    suppliers.data.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">
                          <Link href={route('suppliers.show', supplier.id)} className="text-blue-600 hover:text-blue-800">
                            {supplier.name}
                          </Link>
                        </TableCell>
                        <TableCell>{supplier.contact_person}</TableCell>
                        <TableCell>
                          <a href={`mailto:${supplier.email}`} className="flex items-center text-blue-600 hover:text-blue-800">
                            <MailIcon className="mr-2 h-4 w-4" />
                            {supplier.email}
                          </a>
                        </TableCell>
                        <TableCell>
                          <a href={`tel:${supplier.phone}`} className="flex items-center text-blue-600 hover:text-blue-800">
                            <PhoneIcon className="mr-2 h-4 w-4" />
                            {supplier.phone}
                          </a>
                        </TableCell>
                        <TableCell>
                          {supplier.is_active ? 
                            <Badge className="bg-green-100 text-green-800">Active</Badge> : 
                            <Badge className="bg-red-100 text-red-800">Inactive</Badge>
                          }
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href={route('suppliers.show', supplier.id)}>
                                      <EyeIcon className="h-4 w-4" />
                                    </Link>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            {canEditSupplier && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="outline" size="sm" asChild>
                                      <Link href={route('suppliers.edit', supplier.id)}>
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
                            
                            {canDeleteSupplier && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      variant="destructive" 
                                      size="sm" 
                                      onClick={() => handleDelete(supplier.id)}
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
                      <TableCell colSpan={6} className="h-24 text-center">
                        No suppliers found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {suppliers.last_page > 1 && (
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (suppliers.current_page > 1) {
                      router.get(
                        route('suppliers.index'),
                        {
                          page: suppliers.current_page - 1,
                          search: searchTerm,
                          status: selectedStatus === 'all' ? undefined : selectedStatus,
                        },
                        {
                          preserveState: true,
                          replace: true,
                        }
                      );
                    }
                  }}
                  disabled={suppliers.current_page <= 1}
                  Previous
                </Button>
                <span className="text-sm">
                  Page {suppliers.current_page} of {suppliers.last_page}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (suppliers.current_page < suppliers.last_page) {
                      router.get(
                        route('suppliers.index'),
                        {
                          page: suppliers.current_page + 1,
                          search: searchTerm,
                          status: selectedStatus === 'all' ? undefined : selectedStatus,
                        },
                        {
                          preserveState: true,
                          replace: true,
                        }
                      );
                    }
                  }}
                  disabled={suppliers.current_page >= suppliers.last_page}
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