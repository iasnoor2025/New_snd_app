import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { RentalStatus } from '@/types/models';

interface RentalStatusBadgeProps {
  status: RentalStatus | string;
  className?: string;
}

export function RentalStatusBadge({ status, className }: RentalStatusBadgeProps) {
  // Handle empty status
  const safeStatus = status || 'pending';

  const getStatusConfig = (statusValue: string) => {
    switch (statusValue.toLowerCase()) {
      case 'pending':
        return {
          label: 'Pending',
          variant: 'secondary' as const,
        };
      case 'quotation':
        return {
          label: 'Quotation',
          variant: 'secondary' as const,
        };
      case 'quotation_approved':
        return {
          label: 'Quotation Approved',
          variant: 'secondary' as const,
        };
      case 'mobilization':
        return {
          label: 'Mobilization',
          variant: 'warning' as const,
        };
      case 'mobilization_completed':
        return {
          label: 'Mobilization Completed',
          variant: 'warning' as const,
        };
      case 'active':
        return {
          label: 'Active',
          variant: 'success' as const,
        };
      case 'completed':
        return {
          label: 'Completed',
          variant: 'default' as const,
        };
      case 'invoice_prepared':
        return {
          label: 'Invoice Prepared',
          variant: 'default' as const,
        };
      case 'payment_pending':
        return {
          label: 'Payment Pending',
          variant: 'warning' as const,
        };
      case 'overdue':
        return {
          label: 'Overdue',
          variant: 'destructive' as const,
        };
      case 'closed':
        return {
          label: 'Closed',
          variant: 'outline' as const,
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          variant: 'destructive' as const,
        };
      default:
        return {
          label: statusValue || 'Unknown',
          variant: 'outline' as const,
        };
    }
  };

  const { label, variant } = getStatusConfig(safeStatus);

  return (
    <Badge
      variant={variant}
      className={cn('font-medium', className)}
      {label}
    </Badge>
  );
}



