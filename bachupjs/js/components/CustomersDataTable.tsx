import React from 'react';
import { Link } from '@inertiajs/react';
import { Customer } from '@/types/models';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/shared/DataTable';
import { formatCurrency } from '@/utils';
import { Eye, Edit, Trash2, UserPlus } from 'lucide-react';

interface CustomersDataTableProps {
  customers: Customer[];
  isLoading?: boolean;
  currentPage?: number;
  lastPage?: number;
  total?: number;
  handlePageChange?: (page: number) => void;
  onRefresh?: () => void;
}

/**
 * Customer-specific implementation of DataTable
 */
export default function CustomersDataTable({
  customers,
  isLoading = false,
  currentPage,
  lastPage,
  total,
  handlePageChange,
  onRefresh
}: CustomersDataTableProps) {
  // Status badge component
  const getStatusBadge = (isActive: boolean) => {
    if (isActive) {
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
          Active
        </Badge>
      );
    }
    return (
      <Badge
        variant="outline"
        className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200"
        Inactive
      </Badge>
    );
  };

  return (
    <DataTable
      data={customers}
      isLoading={isLoading}
      columns={[
        {
          id: 'company_name',
          header: 'Company Name',
          accessorKey: 'company_name',
          sortable: true,
          cell: (row) => (
            <Link
              href={route('customers.show', { customer: row.id })}
              className="font-medium text-blue-600 hover:underline"
              {row.company_name}
            </Link>
          )
        },
        {
          id: 'contact_person',
          header: 'Contact Person',
          accessorKey: 'contact_person',
          sortable: true,
          cell: (row) => row.contact_person || '—'
        },
        {
          id: 'email',
          header: 'Email',
          accessorKey: 'email',
          cell: (row) => row.email || '—'
        },
        {
          id: 'phone',
          header: 'Phone',
          accessorKey: 'phone',
          cell: (row) => row.phone || '—'
        },
        {
          id: 'credit_limit',
          header: 'Credit Limit',
          accessorKey: 'credit_limit',
          sortable: true,
          cell: (row) => (row.credit_limit ? formatCurrency(row.credit_limit) : '—')
        },
        {
          id: 'status',
          header: 'Status',
          accessorKey: 'is_active',
          cell: (row) => getStatusBadge(row.is_active)
        }
      ]}
      resourceType="customers"
      resourceName="customer"
      idField="id"
      actions={[
        {
          label: 'View',
          action: 'view',
          icon: <Eye className="h-4 w-4" />,
          permission: 'clients.view'
        },
        {
          label: 'Edit',
          action: 'edit',
          icon: <Edit className="h-4 w-4" />,
          permission: 'clients.edit'
        },
        {
          label: 'Delete',
          action: 'delete',
          icon: <Trash2 className="h-4 w-4" />,
          permission: 'clients.delete',
          // Only allow deleting customers with no rentals
          show: (customer) => customer.rentals_count === 0
        }
      ]}
      currentPage={currentPage}
      lastPage={lastPage}
      total={total}
      handlePageChange={handlePageChange}
      showSearch={true}
      searchPlaceholder="Search customers..."
      searchFields={['company_name', 'contact_person', 'email', 'phone']}
      emptyMessage="No customers found. Try adjusting your search or add a new customer."
    />
  );
}
