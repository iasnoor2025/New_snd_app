import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, BreadcrumbItem } from '@/types';
import { Invoice } from '@/types/models';
import AdminLayout from '@/layouts/AdminLayout';
import { formatCurrency, formatDate } from '@/utils/format';
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
import {
  Printer as PrinterIcon,
  RotateCw as ArrowPathIcon,
  Calendar as CalendarIcon
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ErrorBoundary from '@/components/ErrorBoundary';
import CreateButton from '@/components/shared/CreateButton';
import CrudButtons from '@/components/shared/CrudButtons';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Invoices', href: '/invoices' }
];

interface Props extends PageProps {
  invoices: {
    data: Invoice[];
    current_page: number;
    per_page: number;
    last_page: number;
    total: number;
  };
  filters: {
    search?: string;
    status?: string;
    date_from?: string;
    date_to?: string;
  };
}

export default function Index({ auth, invoices = { data: [], current_page: 1, per_page: 10, last_page: 1, total: 0 }, filters }: Props) {
  const { hasPermission } = usePermission();
  const [search, setSearch] = useState(filters.search || '');
  const [status, setStatus] = useState(filters.status || 'all');
  const [startDate, setStartDate] = useState<Date | undefined>(
    filters.date_from ? new Date(filters.date_from) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    filters.date_to ? new Date(filters.date_to) : undefined
  );

  const canPrintInvoice = hasPermission('invoices.print');

  const handleSearch = () => {
    router.get(route('invoices.index'), {
      search,
      status: status === 'all' ? undefined : status,
      date_from: startDate ? format(startDate, 'yyyy-MM-dd') : '',
      date_to: endDate ? format(endDate, 'yyyy-MM-dd') : '',
    }, {
      preserveState: true,
      replace: true,
    })
  };

  const handleReset = () => {
    setSearch('');
    setStatus('all');
    setStartDate(undefined);
    setEndDate(undefined);
    router.get(route('invoices.index'), {}, {
      preserveState: true,
      replace: true,
    })
  };

  const handlePageChange = (page: number) => {
    router.get(route('invoices.index'), {
      page,
      search,
      status: status === 'all' ? undefined : status,
      date_from: startDate ? format(startDate, 'yyyy-MM-dd') : '',
      date_to: endDate ? format(endDate, 'yyyy-MM-dd') : '',
    }, {
      preserveState: true,
      replace: true,
    })
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>
      case 'cancelled':
        return <Badge className="bg-gray-100 text-gray-800">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  };

  return (
    <AdminLayout title="Invoice Management" breadcrumbs={breadcrumbs} requiredPermission="invoices.view">
      <Head title="Invoice Management" />

      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
            <div className="flex items-center space-x-2">
              <CreateButton
                resourceType="invoices"
                buttonText="Create Invoice"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  placeholder="Search by invoice number or customer"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <ErrorBoundary>
                  <Select
                    value={status}
                    onValueChange={setStatus}
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </ErrorBoundary>
              </div>

              <div className="flex items-center space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, 'PPP') : <span>From Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, 'PPP') : <span>To Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Button onClick={handleSearch}>
                  Search
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  <ArrowPathIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices?.data?.length > 0 ? (
                    invoices.data.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">
                          <Link href={route('invoices.show', invoice.id)} className="text-blue-600 hover:text-blue-800">
                            {invoice.invoice_number}
                          </Link>
                        </TableCell>
                        <TableCell>{invoice.customer?.company_name || 'N/A'}</TableCell>
                        <TableCell>{formatDate(invoice.issue_date)}</TableCell>
                        <TableCell>{formatDate(invoice.due_date)}</TableCell>
                        <TableCell>{formatCurrency(invoice.total_amount)}</TableCell>
                        <TableCell>
                          {getStatusBadge(invoice.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <CrudButtons
                              resourceType="invoices"
                              resourceId={invoice.id}
                              resourceName={`Invoice #${invoice.invoice_number}`}
                            />

                            {canPrintInvoice && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      onClick={() => window.open(route('invoices.print', invoice.id), '_blank')}
                                      <PrinterIcon className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Print Invoice</p>
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
                      <TableCell colSpan={7} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <div className="text-lg font-medium">No invoices found</div>
                          <div className="text-sm text-muted-foreground">
                            Try adjusting your filters or create a new invoice.
                          </div>
                          <CreateButton
                            resourceType="invoices"
                            buttonText="Create Invoice"
                            buttonVariant="default"
                            className="mt-2"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {invoices?.last_page > 1 && (
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Showing {invoices?.current_page === 1 ? 1 : (invoices?.current_page - 1) * invoices?.per_page + 1}
                  {' to '}
                  {invoices?.current_page === invoices?.last_page ? invoices?.total : invoices?.current_page * invoices?.per_page}
                  {' of '}
                  {invoices?.total} invoices
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(1)}
                    disabled={invoices?.current_page === 1}
                    First
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(invoices?.current_page - 1)}
                    disabled={invoices?.current_page === 1}
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(invoices?.current_page + 1)}
                    disabled={invoices?.current_page === invoices?.last_page}
                    Next
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(invoices?.last_page)}
                    disabled={invoices?.current_page === invoices?.last_page}
                    Last
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
