import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { PageProps, BreadcrumbItem } from '@/types';
import AdminLayout from '@/layouts/AdminLayout';
import { Customer } from '@/types/models';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
import { Search } from 'lucide-react';
import { usePermission } from '@/hooks/usePermission';
import CreateButton from '@/components/shared/CreateButton';
import Permission from '@/components/Permission';
import ActionButton from '@/components/shared/ActionButton';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: route('dashboard'),
  },
  {
    title: 'Customers',
    href: route('customers.index'),
  },
];

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
  customers: PaginatedData<Customer>
  filters?: {
    search?: string;
    status?: string;
    city?: string;
  };
  cities?: string[];
}

export default function Index({ auth, customers, filters = {}, cities = [] }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [status, setStatus] = useState<string>(filters.status || 'all');
  const [city, setCity] = useState<string>(filters.city || 'all');
  const [isLoading, setIsLoading] = useState(false);
  const { hasPermission } = usePermission();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    router.get(
      route('customers.index'),
      {
        search,
        status: status === 'all' ? undefined : status,
        city: city === 'all' ? undefined : city
      },
      {
        preserveState: true,
        onFinish: () => setIsLoading(false)
      }
    );
  };

  const getStatusBadge = (isActive: boolean) => {
    if (isActive) {
      return <Badge variant="default">Active</Badge>;
    }
    return <Badge variant="destructive">Inactive</Badge>;
  };

  return (
    <AdminLayout
      title="Customers"
      breadcrumbs={breadcrumbs}
      requiredPermission="customers.view"
      header={undefined}
      user={auth.user}
    >
      <Head title="Customers" />

      <div className="flex h-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="mb-6">
              <div className="grid gap-4 md:grid-cols-3 items-end">
                <div>
                  <Input
                    type="text"
                    placeholder="Search customers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
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
                      onClick={() => {
                        setSearch('');
                        setStatus('all');
                        setCity('all');
                        router.get(route('customers.index'));
                      }}
                      disabled={isLoading}
                    >
                      Clear
                    </Button>
                  </div>
                  <CreateButton
                    resourceType="customers"
                    buttonText="Add Customer"
                  />
                </div>
              </div>
            </form>

            <div id="advanced-filters" className="mb-6 grid gap-4 md:grid-cols-2 hidden">
              <div>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {cities.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={() => document.getElementById('advanced-filters')?.classList.toggle('hidden')} className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                </Button>
                <Button type="button" onClick={handleSearch} className="flex-1" disabled={isLoading}>
                  Apply Filters
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        No customers found
                      </TableCell>
                    </TableRow>
                  ) : (
                    customers.data.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>{customer.company_name}</TableCell>
                        <TableCell>{customer.contact_person || '—'}</TableCell>
                        <TableCell>{customer.email || '—'}</TableCell>
                        <TableCell>{customer.phone || '—'}</TableCell>
                        <TableCell>{customer.country || '—'}</TableCell>
                        <TableCell>{getStatusBadge(customer.is_active)}</TableCell>
                        <TableCell className="text-right w-[100px]">
                          <div className="flex justify-end space-x-2">
                            <ActionButton
                              action="view"
                              resourceType="customers"
                              resourceId={customer.id}
                              resourceName={customer.company_name}
                            />
                            <ActionButton
                              action="edit"
                              resourceType="customers"
                              resourceId={customer.id}
                              resourceName={customer.company_name}
                            />
                            <ActionButton
                              action="delete"
                              resourceType="customers"
                              resourceId={customer.id}
                              resourceName={customer.company_name}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {customers.last_page > 1 && (
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Showing {customers.from} to {customers.to} of {customers.total} customers
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.get(route('customers.index', { page: customers.current_page - 1 }))}
                    disabled={customers.current_page === 1 || isLoading}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.get(route('customers.index', { page: customers.current_page + 1 }))}
                    disabled={customers.current_page === customers.last_page || isLoading}
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
