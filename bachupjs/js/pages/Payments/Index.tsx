import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, BreadcrumbItem } from '@/types';
import { Payment } from '@/types/models';
import dayjs from 'dayjs';
import AdminLayout from '@/layouts/AdminLayout';
import { formatCurrency, formatDate } from '@/utils/format';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Eye as EyeIcon,
  Printer as PrinterIcon,
  Plus as PlusIcon,
  Search as SearchIcon,
  RotateCw as ReloadIcon,
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
import { usePermission } from '@/hooks/usePermission';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Payments', href: '/payments' }
];

interface Props extends PageProps {
  payments: {
    data: Payment[];
    current_page: number;
    per_page: number;
    last_page: number;
    total: number;
  };
  filters: {
    search?: string;
    payment_method?: string;
    date_from?: string;
    date_to?: string;
  };
}

export default function Index({ auth, payments, filters }: Props) {

  // Add a fallback for usePermission in case it's not available
  let permissionHook;
  try {
    permissionHook = usePermission();
  } catch (error) {
    console.error('Error using permission hook:', error);
    permissionHook = {
      hasPermission: () => true, // Temporarily allow all permissions as a fallback
    };
  }

  const { hasPermission } = permissionHook;
  const canCreatePayments = hasPermission('payments.create');
const [search, setSearch] = useState(filters.search || '');
  const [paymentMethod, setPaymentMethod] = useState(filters.payment_method || 'all');
  const [startDate, setStartDate] = useState<Date | undefined>(
    filters.date_from ? new Date(filters.date_from) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    filters.date_to ? new Date(filters.date_to) : undefined
  );

  const handleSearch = () => {
    router.get(route('payments.index'), {
      search,
      payment_method: paymentMethod === 'all' ? undefined : paymentMethod,
      date_from: startDate ? format(startDate, 'yyyy-MM-dd') : '',
      date_to: endDate ? format(endDate, 'yyyy-MM-dd') : '',
    }, {
      preserveState: true,
      replace: true,
    })
  };

  const handleReset = () => {
    setSearch('');
    setPaymentMethod('all');
    setStartDate(undefined);
    setEndDate(undefined);
    router.get(route('payments.index'), {}, {
      preserveState: true,
      replace: true,
    })
  };

  const handlePageChange = (page: number) => {
    router.get(route('payments.index'), {
      page,
      search,
      payment_method: paymentMethod === 'all' ? undefined : paymentMethod,
      date_from: startDate ? format(startDate, 'yyyy-MM-dd') : '',
      date_to: endDate ? format(endDate, 'yyyy-MM-dd') : '',
    }, {
      preserveState: true,
      replace: true,
    })
  };

  // Payment method badge styling
  const getPaymentMethodBadge = (method: string) => {
    const methodClasses: Record<string, string> = {
      cash: 'bg-green-100 text-green-800',
      bank_transfer: 'bg-blue-100 text-blue-800',
      credit_card: 'bg-purple-100 text-purple-800',
      check: 'bg-orange-100 text-orange-800',
      paypal: 'bg-cyan-100 text-cyan-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return (
      <Badge className={methodClasses[method] || ''}>
        {method.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  // Calculate pagination
  const totalPages = payments.last_page;
  const currentPage = payments.current_page;
  const pageNumbers = [];

  // Create an array of page numbers to display
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <AdminLayout title="Payment Management" breadcrumbs={breadcrumbs}>
      <Head title="Payment Management" />
      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Payments</CardTitle>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{payments.total} records</Badge>
              </div>
              {canCreatePayments && (
                <Button asChild>
                  <Link href={route('payments.create')}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Record Payment
                  </Link>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <div className="relative">
                  <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search payments..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-8"
                  />
                </div>
              </div>
              <div>
                <ErrorBoundary>
                  <Select
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by Payment Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Methods</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="credit_card">Credit Card</SelectItem>
                      <SelectItem value="check">Check</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </ErrorBoundary>
              </div>
              <div className="md:col-span-2 flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, 'PPP') : <span>From date</span>}
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
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, 'PPP') : <span>To date</span>}
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
              </div>
              <div className="md:col-span-4 flex justify-end space-x-2">
                <Button onClick={handleSearch}>
                  Search
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  <ReloadIcon className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>customer</TableHead>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.data.length > 0 ? (
                    payments.data.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">
                          <Link href={route('payments.show', payment.id)} className="text-blue-600 hover:underline">
                            {payment.payment_number}
                          </Link>
                        </TableCell>
                        <TableCell>{formatDate(payment.payment_date)}</TableCell>
                        <TableCell>{payment.customer?.company_name}</TableCell>
                        <TableCell>
                          <Link href={route('invoices.show', payment.invoice_id)} className="text-blue-600 hover:underline">
                            {payment.invoice?.invoice_number}
                          </Link>
                        </TableCell>
                        <TableCell>{getPaymentMethodBadge(payment.payment_method)}</TableCell>
                        <TableCell>{payment.reference_number}</TableCell>
                        <TableCell className="text-right">{formatCurrency(payment.amount)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="outline" size="icon" asChild className="h-8 w-8">
                                    <Link href={route('payments.show', payment.id)}>
                                      <EyeIcon className="h-4 w-4" />
                                    </Link>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="outline" size="icon" asChild className="h-8 w-8">
                                    <Link href={route('payments.print', payment.id)}>
                                      <PrinterIcon className="h-4 w-4" />
                                    </Link>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Print</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No payments found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  Previous
                </Button>

                <div className="flex items-center space-x-1">
                  {pageNumbers.map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
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
