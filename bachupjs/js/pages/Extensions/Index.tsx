import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import {
  Search as SearchIcon,
  Filter as FilterIcon,
  Check as CheckIcon,
  X as XIcon,
  Eye as EyeIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Pagination } from '@/components/ui/pagination';

interface Extension {
  id: number;
  rental_id: number;
  rental_number: string;
  client_name: string;
  previous_end_date: string;
  new_end_date: string;
  duration_days: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  approver?: {
    id: number;
    name: string;
  };
  approved_at?: string;
}

interface Props extends PageProps {
  extensions: {
    data: Extension[];
    links: any[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
    per_page: number;
  };
  filters: {
    search?: string;
    status?: string;
  };
  success?: string;
}

export default function ExtensionsIndex({ auth, extensions, filters, success }: Props) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState(filters.search || '');
  const [statusFilter, setStatusFilter] = useState(filters.status || 'all');

  // Display success toast if provided
  React.useEffect(() => {
    if (success) {
      toast({
        title: "Success",
        description: success,
      })
    }
  }, [success]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    router.get(route('extensions.index'), {
      search: searchQuery,
      status: statusFilter,
    }, {
      preserveState: true,
      replace: true,
    })
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);

    router.get(route('extensions.index'), {
      search: searchQuery,
      status: value,
    }, {
      preserveState: true,
      replace: true,
    })
  };

  const handleQuickApprove = (id: number) => {
    router.post(route('extensions.approve', id));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  };

  const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Extensions', href: '/extensions' },
  ];

  return (
    <AdminLayout title="Rental Extensions" breadcrumbs={breadcrumbs} requiredPermission="rentals.view">
      <Head title="Rental Extensions" />

      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Rental Extensions</h1>
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search by rental number or customer..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full md:w-48">
                <Select
                  value={statusFilter}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" variant="secondary">
                <FilterIcon className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </form>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Rental</TableHead>
                  <TableHead>customer</TableHead>
                  <TableHead>Extension</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {extensions.data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No extension requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  extensions.data.map((extension) => (
                    <TableRow key={extension.id}>
                      <TableCell className="font-medium">{extension.id}</TableCell>
                      <TableCell>
                        <Link href={route('rentals.show', extension.rental_id)} className="text-blue-600 hover:underline">
                          {extension.rental_number}
                        </Link>
                      </TableCell>
                      <TableCell>{extension.client_name}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="text-gray-500">From: {format(new Date(extension.previous_end_date), 'MMM d, yyyy')}</div>
                          <div>To: {format(new Date(extension.new_end_date), 'MMM d, yyyy')}</div>
                        </div>
                      </TableCell>
                      <TableCell>{extension.duration_days} days</TableCell>
                      <TableCell>{getStatusBadge(extension.status)}</TableCell>
                      <TableCell className="whitespace-nowrap">{format(new Date(extension.created_at), 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Link href={route('extensions.show', extension.id)}>
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              <EyeIcon className="h-4 w-4" />
                              <span className="hidden sm:inline">View</span>
                            </Button>
                          </Link>

                          {extension.status === 'pending' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-600 hover:bg-green-50 flex items-center gap-1"
                              onClick={() => handleQuickApprove(extension.id)}
                            >
                              <CheckIcon className="h-4 w-4" />
                              <span className="hidden sm:inline">Approve</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {extensions.last_page > 1 && (
            <div className="py-4 px-4 flex justify-center">
              <Pagination
                currentPage={extensions.current_page}
                lastPage={extensions.last_page}
              />
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
