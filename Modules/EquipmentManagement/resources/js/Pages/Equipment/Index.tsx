import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { PageProps, BreadcrumbItem } from '@/Modules/EquipmentManagement/Resources/js/types';
import AdminLayout from '@/Modules/EquipmentManagement/Resources/js/layouts/AdminLayout';
import { Equipment } from '@/Modules/EquipmentManagement/Resources/js/types/models';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/card';
import { Button } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/button';
import { Badge } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/badge';
import { Input } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/table';
import { Search, Plus, RefreshCw } from 'lucide-react';
import CreateButton from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/shared/CreateButton';
import CrudButtons from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/shared/CrudButtons';
import { formatCurrency } from '@/Modules/EquipmentManagement/Resources/js/utils/format';

interface PaginatedData<T> {
  data: T[];
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
  from: number;
  to: number;
}

interface Props extends PageProps {
  equipment: PaginatedData<Equipment>;
  categories: string[];
  statuses: Record<string, string>;
  filters?: Record<string, any>;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: route('dashboard'),
  },
  {
    title: 'Equipment',
    href: route('equipment.index'),
  },
];

export default function Index({ equipment, categories = [], statuses = {}, filters = {} }: Props) {
  const [searchQuery, setSearchQuery] = useState(filters.search || '');
  const [selectedCategory, setSelectedCategory] = useState(filters.category || 'all');
  const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({ search: searchQuery });
  };

  const applyFilters = (newFilters: Record<string, any>) => {
    const updatedFilters = {
      ...(selectedCategory !== 'all' ? { category: selectedCategory } : {}),
      ...(selectedStatus !== 'all' ? { status: selectedStatus } : {}),
      ...(searchQuery ? { search: searchQuery } : {}),
      ...newFilters,
    };

    setIsLoading(true);
    router.get(route('equipment.index'), updatedFilters, {
      preserveState: true,
      replace: true,
      onFinish: () => setIsLoading(false),
    });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setIsLoading(true);
    router.get(route('equipment.index'), {}, {
      preserveState: true,
      replace: true,
      onFinish: () => setIsLoading(false),
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return <Badge variant="default">Available</Badge>;
      case 'rented':
        return <Badge variant="secondary">Rented</Badge>;
      case 'maintenance':
        return <Badge variant="outline">Maintenance</Badge>;
      case 'out_of_service':
        return <Badge variant="destructive">Out of Service</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AdminLayout title="Equipment" breadcrumbs={breadcrumbs} requiredPermission="equipment.view">
      <Head title="Equipment" />

      <div className="flex h-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Equipment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="mb-6">
              <div className="grid gap-4 md:grid-cols-4 items-end">
                <div>
                  <Input
                    type="text"
                    placeholder="Search by name, model, serial number or door number"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      {Object.entries(statuses).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 justify-between md:justify-end">
                  <div className="flex space-x-2">
                    <Button type="submit" disabled={isLoading}>
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetFilters}
                      disabled={isLoading}
                    >
                      Clear Filters
                    </Button>
                  </div>
                  <CreateButton
                    resourceType="equipment"
                    buttonText="Add Equipment"
                  />
                </div>
              </div>
            </form>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Door Number</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Serial Number</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Daily Rate</TableHead>
                    <TableHead className="w-[100px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {equipment.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center">
                        No equipment found
                      </TableCell>
                    </TableRow>
                  ) : (
                    equipment.data.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.door_number || '—'}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.model}</TableCell>
                        <TableCell>{item.serial_number}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>{formatCurrency(item.daily_rate)}</TableCell>
                        <TableCell className="flex justify-end">
                          <CrudButtons
                            resourceType="equipment"
                            resourceId={item.id}
                            resourceName={item.name}
                            className="flex justify-end"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {equipment.last_page > 1 && (
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Showing {equipment.from} to {equipment.to} of {equipment.total} items
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyFilters({ page: equipment.current_page - 1 })}
                    disabled={equipment.current_page === 1 || isLoading}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyFilters({ page: equipment.current_page + 1 })}
                    disabled={equipment.current_page === equipment.last_page || isLoading}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
