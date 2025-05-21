import React from 'react';
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Ban 
} from 'lucide-react';

interface PaymentStatusBadgeProps {
  status: 'unpaid' | 'partial' | 'paid' | 'overdue';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * A component to display payment status with appropriate styling
 */
export default function PaymentStatusBadge({ status, size = 'md' }: PaymentStatusBadgeProps) {
  const iconSize = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const getIconClass = iconSize[size];
  
  switch (status.toLowerCase()) {
    case 'paid':
      return (
        <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
          <CheckCircle className={`${getIconClass} mr-1`} />
          Paid
        </Badge>
      );
    case 'partial':
      return (
        <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
          <Clock className={`${getIconClass} mr-1`} />
          Partial
        </Badge>
      );
    case 'overdue':
      return (
        <Badge className="bg-red-100 text-red-800 flex items-center gap-1 animate-pulse">
          <AlertTriangle className={`${getIconClass} mr-1`} />
          Overdue
        </Badge>
      );
    case 'unpaid':
      return (
        <Badge className="bg-gray-100 text-gray-800 flex items-center gap-1">
          <Ban className={`${getIconClass} mr-1`} />
          Unpaid
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>
  }
} 