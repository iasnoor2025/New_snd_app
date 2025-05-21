import React from 'react';
import { Link } from '@inertiajs/react';
import { Equipment } from '@/types/models';
import { Badge } from '@/components/ui/badge';
import DataTable from '@/components/shared/DataTable';

interface EquipmentDataTableProps {
  equipment: Equipment[];
  currentPage?: number;
  lastPage?: number;
  total?: number;
  handlePageChange?: (page: number) => void;
  onRefresh?: () => void;
}

export default function EquipmentDataTable({
  equipment,
  currentPage,
  lastPage,
  total,
  handlePageChange,
  onRefresh
}: EquipmentDataTableProps) {
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string, label: string }> = {
      available: { color: "bg-green-100 text-green-800 hover:bg-green-100", label: "Available" },
      rented: { color: "bg-blue-100 text-blue-800 hover:bg-blue-100", label: "Rented" },
      maintenance: { color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100", label: "Maintenance" },
      out_of_service: { color: "bg-red-100 text-red-800 hover:bg-red-100", label: "Out of Service" }
    };

    const statusInfo = statusMap[status.toLowerCase()] || { color: "bg-gray-100 text-gray-800 hover:bg-gray-100", label: status };

    return (
      <Badge
        variant="secondary"
        className={statusInfo.color}
        {statusInfo.label}
      </Badge>
    );
  };

  return (
    <DataTable
      data={equipment}
      columns={[
        {
          key: 'name',
          header: 'Equipment Name',
          cell: (item) => (
            <Link
              href={route('equipment.show', { equipment: item.id })}
              className="font-medium text-primary hover:underline"
              {item.name}
            </Link>
          )
        },
        {
          key: 'model',
          header: 'Model / Make',
          cell: (item) => {
            if (!item.model && !item.make) return '—';
            return `${item.model || ''}${item.make ? (item.model ? ' / ' : '') + item.make : ''}`;
          }
        },
        {
          key: 'serial_number',
          header: 'Serial Number',
          cell: (item) => item.serial_number || '—'
        },
        {
          key: 'category',
          header: 'Category',
          cell: (item) => item.category || '—'
        },
        {
          key: 'status',
          header: 'Status',
          cell: (item) => getStatusBadge(item.status)
        },
        {
          key: 'daily_rate',
          header: 'Daily Rate',
          cell: (item) => item.daily_rate ? `$${parseFloat(item.daily_rate.toString()).toFixed(2)}` : '—'
        }
      ]}
      resourceType="equipment"
      keyField="id"
      resourceNameField="name"
      currentPage={currentPage}
      lastPage={lastPage}
      total={total}
      handlePageChange={handlePageChange}
      onRefresh={onRefresh}
      emptyState={{
        title: "No equipment found",
        message: "Try adjusting your search filters or add new equipment.",
        actionText: "Add Equipment",
        createRoute: "equipment.create"
      }}
    />
  );
}
