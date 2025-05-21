import React, { useState, useEffect } from "react";
import { Link, router } from '@inertiajs/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import CrudButtons from '@/components/shared/CrudButtons';
import { usePermission } from '@/hooks/usePermission';
import PagedPagination from '@/components/shared/PagedPagination';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, ChevronDown, ChevronUp, Search } from 'lucide-react';
import ActionButton, { ActionType } from '@/components/shared/ActionButton';
import LoadingState from '@/components/shared/LoadingState';
import { cn } from '@/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Column<T> {
  id: string;
  header: React.ReactNode;
  accessorKey?: keyof T;
  accessorFn?: (row: T) => React.ReactNode;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  sortFn?: (a: T, b: T) => number;
  className?: string;
}

export interface Action<T> {
  label: string;
  icon?: React.ReactNode;
  action: ActionType | 'custom';
  onClick?: (row: T) => void;
  show?: (row: T) => boolean;
  permission?: string;
  disabled?: (row: T) => boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  resourceType: string;
  resourceName?: string;
  isLoading?: boolean;
  emptyMessage?: string;
  showSearch?: boolean;
  showActionColumn?: boolean;
  actions?: Action<T>[];
  idField?: keyof T;
  getRowId?: (row: T) => number;
  onRowClick?: (row: T) => void;
  rowClassName?: string | ((row: T) => string);
  containerClassName?: string;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  currentPage?: number;
  lastPage?: number;
  total?: number;
  handlePageChange?: (page: number) => void;
  emptyState?: {
    title?: string;
    message?: string;
    actionText?: string;
    createRoute?: string;
  };
  onRefresh?: () => void;
  hideActions?: boolean;
  title?: string;
  subtitle?: string;
  initialSortField?: string;
  initialSortDirection?: 'asc' | 'desc';
}

/**
 * A reusable DataTable component that supports columns, pagination, empty states, and CRUD actions
 *
 * @example
 * <DataTable
 *   data={customers}
 *   columns={[
 *     {
 *       key: 'company_name',
 *       header: 'Company Name',
 *       cell: (customer) => <Link href={route('customers.show', { customer: customer.id })}>{customer.company_name}</Link>
 *     },
 *     {
 *       key: 'contact_person',
 *       header: 'Contact Person',
 *       cell: (customer) => customer.contact_person
 *     }
 *   ]}
 *   resourceType="customers"
 *   permissionResourceName="clients"
 *   keyField="id"
 *   resourceNameField="company_name"
 *   currentPage={customers.current_page}
 *   lastPage={customers.last_page}
 *   total={customers.total}
 *   handlePageChange={(page) => router.get(route('customers.index', { page }))}
 *   emptyState={{
 *     title: 'No customers found',
 *     message: 'Try adjusting your search filters or create a new customer',
 *     actionText: 'Add Customer',
 *     createRoute: 'customers.create'
 *   }}
 * />
 */
export function DataTable<T extends object>({
  data,
  columns,
  resourceType,
  resourceName = resourceType.replace(/s$/, ''),
  isLoading = false,
  emptyMessage = 'No data available',
  showSearch = false,
  showActionColumn = true,
  actions = [
    { label: 'View', action: 'view' },
    { label: 'Edit', action: 'edit' },
    { label: 'Delete', action: 'delete' },
  ],
  idField = 'id' as keyof T,
  getRowId,
  onRowClick,
  rowClassName,
  containerClassName,
  searchPlaceholder = 'Search...',
  searchKeys = [],
  currentPage = 1,
  lastPage = 1,
  total,
  handlePageChange,
  emptyState,
  onRefresh,
  hideActions = false,
  title,
  subtitle,
  initialSortField,
  initialSortDirection = 'asc',
}: DataTableProps<T>) {
  const { hasPermission } = usePermission();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string | undefined>(initialSortField);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(initialSortDirection);
  const [filteredData, setFilteredData] = useState<T[]>(data);

  const handleCreateItem = () => {
    if (emptyState?.createRoute) {
      router.visit(route(emptyState.createRoute));
    } else {
      router.visit(route(`${resourceType}.create`));
    }
  };

  // Determine if create button should be shown based on permissions
  const canCreate = () => {
    if (emptyState?.createRoute) {
      return hasPermission(emptyState.createRoute);
    }
    return hasPermission(`${resourceType}.create`);
  };

  // Filter data based on search query
  useEffect(() => {
    if (!searchQuery || searchKeys.length === 0) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) => {
      return searchKeys.some((key) => {
        const value = item[key];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchQuery.toLowerCase());
      })
    })

    setFilteredData(filtered);
  }, [data, searchQuery, searchKeys]);

  // Sort data based on sort field and direction
  const sortedData = React.useMemo(() => {
    if (!sortField) return filteredData;

    const column = columns.find((col) => col.id === sortField);
    if (!column) return filteredData;

    return [...filteredData].sort((a, b) => {
      // Use custom sort function if provided
      if (column.sortFn) {
        return sortDirection === 'asc'
          ? column.sortFn(a, b)
          : column.sortFn(b, a);
      }

      // Otherwise use accessorKey or accessorFn
      let valueA, valueB;

      if (column.accessorKey) {
        valueA = a[column.accessorKey];
        valueB = b[column.accessorKey];
      } else if (column.accessorFn) {
        valueA = column.accessorFn(a);
        valueB = column.accessorFn(b);
      } else {
        return 0;
      }

      // Handle different value types
      if (valueA === valueB) return 0;

      if (valueA === null || valueA === undefined) return sortDirection === 'asc' ? -1 : 1;
      if (valueB === null || valueB === undefined) return sortDirection === 'asc' ? 1 : -1;

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return sortDirection === 'asc'
        ? valueA > valueB ? 1 : -1
        : valueA < valueB ? 1 : -1;
    })
  }, [filteredData, sortField, sortDirection, columns]);

  // Calculate pagination
  const paginatedData = React.useMemo(() => {
    if (!handlePageChange) return sortedData;

    const { currentPage } = handlePageChange;
    const pageSize = 10; // Assuming a default pageSize
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    return sortedData.slice(start, end);
  }, [sortedData, handlePageChange]);

  // Toggle sort
  const handleSort = (columnId: string) => {
    if (sortField === columnId) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(columnId);
      setSortDirection('asc');
    }
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Get sorted indicator
  const getSortIndicator = (columnId: string) => {
    if (sortField !== columnId) return null;

    return sortDirection === 'asc'
      ? <ChevronUp className="h-4 w-4 ml-1" />
      : <ChevronDown className="h-4 w-4 ml-1" />
  };

  // Get the ID for a row
  const getRowIdentifier = (row: T): number => {
    if (getRowId) {
      return getRowId(row);
    }

    const id = row[idField];
    return typeof id === 'number' ? id : parseInt(String(id), 10);
  };

  // Get cell value for a row
  const getCellValue = (row: T, column: Column<T>) => {
    if (column.cell) {
      return column.cell(row);
    }

    if (typeof column.accessorKey === 'function') {
      return column.accessorKey(row);
    }

    const value = row[column.accessorKey];
    return value !== null && value !== undefined ? String(value) : '';
  };

  // Get class name for a row
  const getRowClass = (row: T): string => {
    if (typeof rowClassName === 'function') {
      return rowClassName(row);
    }

    return rowClassName || '';
  };

  // Render loading state
  if (isLoading) {
    return (
      <Card className={containerClassName}>
        {title && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </CardHeader>
        )}
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render error state
  if (!isLoading && !paginatedData.length) {
    return (
      <Card className={containerClassName}>
        {title && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </CardHeader>
        )}
        <CardContent>
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="text-destructive text-lg font-medium">Error loading data</div>
            <p className="text-muted-foreground">{emptyMessage}</p>
            {onRefresh && (
              <Button onClick={onRefresh} variant="outline">
                Try Again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn('w-full', containerClassName)}>
      {/* Table header with title and search */}
      {(title || showSearch) && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          {title && (
            <div>
              <h2 className="text-xl font-semibold">{title}</h2>
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          )}

          {showSearch && searchKeys.length > 0 && (
            <div className="w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={searchPlaceholder}
                  className="pl-8 w-full md:w-[250px]"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className={column.sortable ? "cursor-pointer" : ""}
                  onClick={column.sortable ? () => handleSort(column.id) : undefined}
                  <div className="flex items-center">
                    {column.header}
                    {column.sortable && getSortIndicator(column.id)}
                  </div>
                </TableHead>
              ))}

              {showActionColumn && (
                <TableHead className="text-right">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (showActionColumn ? 1 : 0)} className="h-24 text-center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, i) => (
                <TableRow
                  key={getRowIdentifier(row) || i}
                  className={cn(
                    onRowClick && 'cursor-pointer hover:bg-muted/50',
                    getRowClass(row)
                  )}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  {columns.map((column) => (
                    <TableCell key={column.id} className={column.className}>
                      {getCellValue(row, column)}
                    </TableCell>
                  ))}

                  {showActionColumn && (
                    <TableCell className="text-right">
                      {actions.length <= 2 ? (
                        <div className="flex justify-end space-x-2">
                          {actions
                            .filter(action => !action.show || action.show(row))
                            .map((action, i) => (
                              <ActionButton
                                key={i}
                                action={action.action as ActionType}
                                resourceType={resourceType}
                                resourceId={getRowIdentifier(row)}
                                resourceName={`${resourceName} ${getRowIdentifier(row)}`}
                                onClick={action.onClick ? () => action.onClick?.(row) : undefined}
                                customIcon={action.icon}
                                buttonText={action.label}
                                requiredPermission={action.permission}
                                disabled={action.disabled ? action.disabled(row) : false}
                              />
                            ))}
                        </div>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {actions
                              .filter(action => !action.show || action.show(row))
                              .map((action, i) => (
                                <DropdownMenuItem
                                  key={i}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (action.onClick) {
                                      action.onClick(row);
                                    }
                                  }}
                                  disabled={action.disabled ? action.disabled(row) : false}
                                  {action.icon && <span className="mr-2">{action.icon}</span>}
                                  {action.label}
                                </DropdownMenuItem>
                              ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {data.length > 0 && lastPage > 1 && handlePageChange && (
        <div className="mt-4 flex items-center justify-end space-x-2">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium">
              {Math.min(
                (handlePageChange.currentPage - 1) * 10 + 1,
                data.length
              )}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(
                handlePageChange.currentPage * 10,
                data.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium">{data.length}</span> results
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, handlePageChange.currentPage - 1))}
                  disabled={handlePageChange.currentPage === 1}
                />
              </PaginationItem>

              {Array.from({ length: Math.ceil(data.length / 10) }).map((_, i) => {
                // Limit number of pagination links
                const pageNum = i + 1;
                const totalPages = Math.ceil(data.length / 10);

                // Show first, last, current, and pages around current
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  Math.abs(pageNum - handlePageChange.currentPage) <= 1
                ) {
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={pageNum === handlePageChange.currentPage}
                        onClick={() => handlePageChange(pageNum)}
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }

                // Show ellipsis
                if (
                  (pageNum === 2 && handlePageChange.currentPage > 3) ||
                  (pageNum === totalPages - 1 && handlePageChange.currentPage < totalPages - 2)
                ) {
                  return (
                    <PaginationItem key={i}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                return null;
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(Math.min(
                      Math.ceil(data.length / 10),
                      handlePageChange.currentPage + 1
                    ))
                  }
                  disabled={
                    handlePageChange.currentPage ===
                    Math.ceil(data.length / 10)
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default DataTable;
