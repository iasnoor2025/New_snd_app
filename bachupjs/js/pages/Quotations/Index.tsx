import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { PageProps, BreadcrumbItem } from "@/types";
import { Quotation } from "@/types/models";
import AdminLayout from "@/layouts/AdminLayout";
import { format } from "date-fns";
import { Pagination } from "@/components/ui/pagination";
import { usePermission } from "@/hooks/usePermission";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Icons
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
  Printer,
  Trash,
  Check,
  X
} from "lucide-react";
import { toast } from "sonner";
import CreateButton from "@/components/shared/CreateButton";
import CrudButtons from "@/components/shared/CrudButtons";
import Permission from "@/components/Permission";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Quotations',
    href: '/quotations',
  },
];

interface Props extends PageProps {
  quotations: {
    data: Array<Quotation & {
      customer: {
        company_name: string;
      }
    }>
    meta: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
    };
  };
  filters: {
    search: string;
    status: string;
  };
}

export default function Index({ auth, quotations, filters }: Props) {
  const { hasPermission } = usePermission();
  const canCreateQuotations = hasPermission('quotations.create');
  const canEditQuotations = hasPermission('quotations.edit');
  const canDeleteQuotations = hasPermission('quotations.delete');
  const canViewQuotations = hasPermission('quotations.view');

  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [statusFilter, setStatusFilter] = useState(filters.status || "all");

  // Get status badge with appropriate color
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>
      case "draft":
        return <Badge variant="secondary">Draft</Badge>
      case "sent":
        return <Badge variant="outline" className="text-blue-600 border-blue-400">Sent</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "expired":
        return <Badge variant="destructive" className="bg-orange-500 hover:bg-orange-600">Expired</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  };

  // Format currency
  const formatCurrency = (amount: number | null | undefined) => {
    if (amount === null || amount === undefined || isNaN(Number(amount))) {
      return "SAR 0.00";
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "SAR",
    }).format(Number(amount));
  };

  // Search form submit handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  // Apply filters
  const applyFilters = () => {
    router.get(
      route("quotations.index"),
      {
        search: searchQuery,
        status: statusFilter === 'all' ? '' : statusFilter
      },
      { preserveState: true, replace: true }
    );
  };

  // Handle status filter change
  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    router.get(
      route("quotations.index"),
      {
        search: searchQuery,
        status: value === 'all' ? '' : value
      },
      { preserveState: true, replace: true }
    );
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    if (quotations?.meta) {
      router.get(
        route("quotations.index", { page }),
        { search: searchQuery, status: statusFilter },
        { preserveState: true }
      );
    }
  };

  // Handle quotation approve
  const handleApprove = (quotationId: number) => {
    router.post(route("quotations.approve", quotationId), {}, {
      onSuccess: () => toast.success("Quotation approved successfully"),
      onError: () => toast.error("Failed to approve quotation"),
    })
  };

  // Handle quotation reject
  const handleReject = (quotationId: number) => {
    router.post(route("quotations.reject", quotationId), {}, {
      onSuccess: () => toast.success("Quotation rejected successfully"),
      onError: () => toast.error("Failed to reject quotation"),
    })
  };

  // Handle quotation delete
  const handleDelete = (quotationId: number) => {
    if (confirm("Are you sure you want to delete this quotation?")) {
      router.delete(route("quotations.destroy", quotationId), {
        onSuccess: () => toast.success("Quotation deleted successfully"),
        onError: () => toast.error("Failed to delete quotation"),
      })
    }
  };

  return (
    <AdminLayout title="Quotations" breadcrumbs={breadcrumbs} requiredPermission="quotations.view">
      <Head title="Quotations" />

      <div className="flex h-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Quotations</CardTitle>
            <div className="flex items-center space-x-2">
              <Permission permission="quotations.create">
                <Link href={route("quotations.create")} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Quotation
                </Link>
              </Permission>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="mb-6 flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <Input
                  type="text"
                  placeholder="Search quotations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex-1 min-w-[180px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="all" value="all">All Statuses</SelectItem>
                    <SelectItem key="draft" value="draft">Draft</SelectItem>
                    <SelectItem key="sent" value="sent">Sent</SelectItem>
                    <SelectItem key="approved" value="approved">Approved</SelectItem>
                    <SelectItem key="rejected" value="rejected">Rejected</SelectItem>
                    <SelectItem key="expired" value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  router.get(route('quotations.index'));
                }}
                Clear Filters
              </Button>
            </form>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quote Number</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Valid Until</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotations.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        No quotations found
                      </TableCell>
                    </TableRow>
                  ) : (
                    quotations.data.map((quotation) => (
                      <TableRow key={quotation.id}>
                        <TableCell className="font-medium">
                          <Link
                            href={route("quotations.show", quotation.id)}
                            className="text-primary hover:underline"
                            {quotation.quotation_number}
                          </Link>
                        </TableCell>
                        <TableCell>{quotation.customer?.company_name || 'N/A'}</TableCell>
                        <TableCell>
                          {quotation.issue_date ? format(new Date(quotation.issue_date), "MMM dd, yyyy") : "-"}
                        </TableCell>
                        <TableCell>
                          {quotation.valid_until ? format(new Date(quotation.valid_until), "MMM dd, yyyy") : "-"}
                        </TableCell>
                        <TableCell>{formatCurrency(quotation.total_amount)}</TableCell>
                        <TableCell>{getStatusBadge(quotation.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Permission permission="quotations.view">
                              <Button asChild size="icon" variant="ghost">
                                <Link href={route("quotations.show", quotation.id)}>
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </Link>
                              </Button>
                            </Permission>

                            {quotation.status !== "approved" && quotation.status !== "rejected" && (
                              <Permission permission="quotations.edit">
                                <Button asChild size="icon" variant="ghost">
                                  <Link href={route("quotations.edit", quotation.id)}>
                                    <Pencil className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Link>
                                </Button>
                              </Permission>
                            )}

                            <Permission permission="quotations.approve">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleApprove(quotation.id)}
                                disabled={quotation.status === "approved" || quotation.status === "rejected"}
                                <Check className="h-4 w-4 text-green-500" />
                                <span className="sr-only">Approve</span>
                              </Button>
                            </Permission>

                            <Permission permission="quotations.reject">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleReject(quotation.id)}
                                disabled={quotation.status === "approved" || quotation.status === "rejected"}
                                <X className="h-4 w-4 text-red-500" />
                                <span className="sr-only">Reject</span>
                              </Button>
                            </Permission>

                            <Button asChild size="icon" variant="ghost">
                              <Link href={route("quotations.print", quotation.id)} target="_blank">
                                <Printer className="h-4 w-4" />
                                <span className="sr-only">Print</span>
                              </Link>
                            </Button>

                            {quotation.status !== "approved" && (
                              <Permission permission="quotations.delete">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => handleDelete(quotation.id)}
                                  <Trash className="h-4 w-4 text-red-500" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </Permission>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {quotations?.meta && quotations.meta.last_page > 1 && (
              <div className="flex items-center justify-center py-4">
                <Pagination
                  currentPage={quotations.meta.current_page}
                  totalPages={quotations.meta.last_page}
                  baseUrl={route('quotations.index')}
                  query={{
                    search: searchQuery,
                    status: statusFilter === 'all' ? '' : statusFilter
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
