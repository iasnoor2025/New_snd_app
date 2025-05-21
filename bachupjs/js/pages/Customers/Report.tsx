import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, BreadcrumbItem } from '@/types';
import AdminLayout from '@/layouts/AdminLayout';
import { Customer } from '@/types/models';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import {
  ArrowLeft,
  Download,
  RefreshCw,
  Search,
  User
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: route('dashboard'),
  },
  {
    title: 'Customers',
    href: route('customers.index'),
  },
  {
    title: 'Customer Report',
  },
];

interface CityData {
  count: number;
  active: number;
  inactive: number;
}

interface Props extends PageProps {
  customers: Customer[];
  cities: string[];
  stats: {
    total: number;
    active: number;
    inactive: number;
  };
  byCity: Record<string, CityData>;
  filters: {
    status: string | null;
    city: string | null;
  };
  header?: React.ReactNode;
  user?: any; // Add proper user type based on your application
}

interface ReportFilters {
  status?: string;
  city?: string;
}

export default function Report({ customers, cities, stats, byCity, filters, header, user }: Props) {
  const [status, setStatus] = useState(filters.status || 'all');
  const [city, setCity] = useState(filters.city || 'all');
  const [isLoading, setIsLoading] = useState(false);

  const applyFilters = () => {
    setIsLoading(true);
    router.get(
      route('customers.report'),
      {
        status: status === 'all' ? undefined : status,
        city: city === 'all' ? undefined : city
      },
      {
        preserveState: true,
        replace: true,
        onFinish: () => setIsLoading(false)
      }
    );
  };

  const clearFilters = () => {
    setStatus('all');
    setCity('all');
    setIsLoading(true);
    router.get(
      route('customers.report'),
      {},
      {
        preserveState: true,
        replace: true,
        onFinish: () => setIsLoading(false)
      }
    );
  };

  const exportReport = () => {
    // Implement export functionality
    alert('Export functionality will be implemented here');
  };

  const getStatusBadge = (isActive: boolean) => {
    if (isActive) {
      return <Badge variant="default">Active</Badge>;
    }
    return <Badge variant="destructive">Inactive</Badge>;
  };

  return (
    <AdminLayout
      title="Customer Report"
      breadcrumbs={breadcrumbs}
      requiredPermission="customers.view"
      header={header}
      user={user}
    >
      <Head title="Customer Report" />
      <div className="flex h-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center">
              <Button variant="outline" asChild className="mr-4">
                <Link href={route('customers.index')}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Customers
                </Link>
              </Button>
              <CardTitle className="text-2xl font-bold">Customer Report</CardTitle>
            </div>
            <Button variant="outline" onClick={exportReport}>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid gap-4 md:grid-cols-4">
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
              <div className="flex items-center space-x-2 md:col-span-2">
                <Button type="button" onClick={applyFilters} disabled={isLoading}>
                  <Search className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
                <Button onClick={clearFilters} disabled={isLoading}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Total Customers</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Active Customers</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.active}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Inactive Customers</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.inactive}</div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Customers by City</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>City</TableHead>
                        <TableHead>Total Customers</TableHead>
                        <TableHead>Active Customers</TableHead>
                        <TableHead>Inactive Customers</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(byCity).length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center">
                            No city data found
                          </TableCell>
                        </TableRow>
                      ) : (
                        Object.entries(byCity).map(([cityName, data]) => (
                          <TableRow key={cityName}>
                            <TableCell>{cityName}</TableCell>
                            <TableCell>{data.count}</TableCell>
                            <TableCell>{data.active}</TableCell>
                            <TableCell>{data.inactive}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer List</CardTitle>
                <CardDescription>
                  Detailed view of all customers matching your filter criteria
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Contact Person</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center">
                            No customers found
                          </TableCell>
                        </TableRow>
                      ) : (
                        customers.map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell>
                              <Link
                                href={route('customers.show', { customer: customer.id })}
                                className="text-primary hover:underline"
                              >
                                {customer.company_name}
                              </Link>
                            </TableCell>
                            <TableCell>{customer.contact_person || '—'}</TableCell>
                            <TableCell>{customer.phone || '—'}</TableCell>
                            <TableCell>{customer.city || '—'}</TableCell>
                            <TableCell>{getStatusBadge(customer.is_active)}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
