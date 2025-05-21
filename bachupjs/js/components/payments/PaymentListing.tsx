import React from 'react';
import { Link } from '@inertiajs/react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye as EyeIcon, 
  Printer as PrinterIcon, 
  Download as DownloadIcon,
  FileText as ReceiptIcon
} from 'lucide-react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';

interface Payment {
  id: number;
  payment_number?: string;
  amount: number;
  date?: string;
  payment_date?: string;
  status?: 'pending' | 'completed' | 'failed';
  method?: string;
  payment_method?: string;
  reference?: string;
  reference_number?: string;
  notes?: string;
  receipt_path?: string;
  customer?: {
    id: number;
    company_name: string;
  };
  invoice?: {
    id: number;
    invoice_number: string;
  };
  invoice_id?: number;
  rental_id?: number;
}

interface PaymentListingProps {
  payments: Payment[];
  showClient?: boolean;
  showInvoice?: boolean;
  showRental?: boolean;
  type?: 'standalone' | 'rental';
}

export default function PaymentListing({ 
  payments, 
  showClient = true, 
  showInvoice = true,
  showRental = false,
  type = 'standalone'
}: PaymentListingProps) {
  
  // Payment method badge styling
  const getPaymentMethodBadge = (method: string) => {
    const methodClasses: Record<string, string> = {
      cash: 'bg-green-100 text-green-800',
      bank_transfer: 'bg-blue-100 text-blue-800',
      credit_card: 'bg-purple-100 text-purple-800',
      check: 'bg-orange-100 text-orange-800',
      cheque: 'bg-orange-100 text-orange-800',
      paypal: 'bg-cyan-100 text-cyan-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return (
      <Badge className={methodClasses[method] || ''}>
        {method.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  // Payment status badge
  const getStatusBadge = (status: string) => {
    const statusClasses: Record<string, string> = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
    };
    return (
      <Badge className={statusClasses[status] || ''}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {type === 'standalone' && <TableHead>Payment #</TableHead>}
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            {showClient && <TableHead>customer</TableHead>}
            {showInvoice && <TableHead>Invoice #</TableHead>}
            {showRental && <TableHead>Rental #</TableHead>}
            <TableHead>Method</TableHead>
            <TableHead>Reference</TableHead>
            {type === 'rental' && <TableHead>Status</TableHead>}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length > 0 ? (
            payments.map((payment) => (
              <TableRow key={payment.id}>
                {type === 'standalone' && (
                  <TableCell className="font-medium">
                    <Link href={route('payments.show', payment.id)} className="text-blue-600 hover:underline">
                      {payment.payment_number}
                    </Link>
                  </TableCell>
                )}
                <TableCell>
                  {format(new Date(payment.payment_date || payment.date || new Date()), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell>{formatCurrency(payment.amount)}</TableCell>
                {showClient && (
                  <TableCell>{payment.customer?.company_name || 'N/A'}</TableCell>
                )}
                {showInvoice && (
                  <TableCell>
                    {payment.invoice_id ? (
                      <Link href={route('invoices.show', payment.invoice_id)} className="text-blue-600 hover:underline">
                        {payment.invoice?.invoice_number || `#${payment.invoice_id}`}
                      </Link>
                    ) : 'N/A'}
                  </TableCell>
                )}
                {showRental && (
                  <TableCell>
                    {payment.rental_id ? (
                      <Link href={route('rentals.show', payment.rental_id)} className="text-blue-600 hover:underline">
                        #{payment.rental_id}
                      </Link>
                    ) : 'N/A'}
                  </TableCell>
                )}
                <TableCell>
                  {getPaymentMethodBadge(payment.payment_method || payment.method || 'other')}
                </TableCell>
                <TableCell>{payment.reference_number || payment.reference || 'N/A'}</TableCell>
                {type === 'rental' && (
                  <TableCell>{getStatusBadge(payment.status || 'completed')}</TableCell>
                )}
                <TableCell>
                  <div className="flex space-x-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" asChild className="h-8 w-8">
                            <Link href={type === 'standalone' 
                              ? route('payments.show', payment.id) 
                              : route('rentals.payments.show', [payment.rental_id, payment.id])}>
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
                    
                    {payment.receipt_path && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" asChild className="h-8 w-8">
                              <Link href={route('payments.receipt', payment.id)}>
                                <ReceiptIcon className="h-4 w-4" />
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Receipt</p>
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
              <TableCell colSpan={type === 'standalone' ? 8 : 7} className="h-24 text-center">
                No payments found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
} 