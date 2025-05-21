import React, { useState } from 'react';
import { format, subMonths, addMonths, parseISO } from 'date-fns';
import { Payroll, PayrollStatus } from '../../types/payroll';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  MoreHorizontal,
  Eye,
  FileText,
  CheckCircle,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Printer,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

interface PayrollListProps {
  payrolls: Payroll[];
  isLoading: boolean;
  error: string | null;
  onViewPayroll: (payroll: Payroll) => void;
  onApprovePayroll: (payrollId: number) => void;
  onProcessPayment: (payrollId: number, paymentMethod: string, reference: string) => void;
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
}

const PayrollList: React.FC<PayrollListProps> = ({
  payrolls,
  isLoading,
  error,
  onViewPayroll,
  onApprovePayroll,
  onProcessPayment,
  selectedMonth,
  onMonthChange,
}) => {
  const [statusFilter, setStatusFilter] = useState<PayrollStatus | 'all'>('all');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedPayrollId, setSelectedPayrollId] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [paymentReference, setPaymentReference] = useState('');
  const [processing, setProcessing] = useState(false);

  const filteredPayrolls = payrolls.filter(
    (payroll) => statusFilter === 'all' || payroll.status === statusFilter;
  );

  const handlePreviousMonth = () => {
    onMonthChange(subMonths(selectedMonth, 1));
  };

  const handleNextMonth = () => {
    onMonthChange(addMonths(selectedMonth, 1));
  };

  const handleOpenPaymentDialog = (payrollId: number) => {
    setSelectedPayrollId(payrollId);
    setShowPaymentDialog(true);
  };

  const handleProcessPayment = async () => {
    if (!selectedPayrollId) return;

    setProcessing(true);
    try {
      await onProcessPayment(selectedPayrollId, paymentMethod, paymentReference);
      setShowPaymentDialog(false);
      setPaymentMethod('bank_transfer');
      setPaymentReference('');
      setSelectedPayrollId(null);
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status: PayrollStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>
      case 'approved':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Approved</Badge>
      case 'paid':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Paid</Badge>
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Cancelled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        {/* Month Navigation */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePreviousMonth}
            disabled={isLoading}
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium min-w-[120px] text-center">
            {format(selectedMonth, 'MMMM yyyy')}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextMonth}
            disabled={isLoading}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Label htmlFor="status-filter" className="text-sm whitespace-nowrap">
            Filter by status:
          </Label>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as PayrollStatus | 'all')}
            <SelectTrigger id="status-filter" className="w-[160px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Month</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Base Salary</TableHead>
              <TableHead>Overtime</TableHead>
              <TableHead>Final Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  <span className="text-sm text-gray-500 mt-2 block">Loading payroll data...</span>
                </TableCell>
              </TableRow>
            ) : filteredPayrolls.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  <FileText className="h-6 w-6 text-gray-400 mx-auto" />
                  <span className="text-sm text-gray-500 mt-2 block">No payroll records found.</span>
                </TableCell>
              </TableRow>
            ) : (
              filteredPayrolls.map((payroll) => (
                <TableRow key={payroll.id}>
                  <TableCell className="font-medium">{payroll.id}</TableCell>
                  <TableCell>
                    {payroll.employee?.first_name} {payroll.employee?.last_name}
                  </TableCell>
                  <TableCell>{format(parseISO(payroll.payroll_month), 'MMM yyyy')}</TableCell>
                  <TableCell>{payroll.total_worked_hours}</TableCell>
                  <TableCell>
                    ${payroll.base_salary.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell>
                    ${payroll.overtime_amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="font-medium">
                    ${payroll.final_amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell>{getStatusBadge(payroll.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewPayroll(payroll)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.open(`/payroll/${payroll.id}/print`, '_blank')}>
                          <Printer className="mr-2 h-4 w-4" />
                          Print Slip
                        </DropdownMenuItem>
                        {payroll.status === 'pending' && (
                          <DropdownMenuItem onClick={() => onApprovePayroll(payroll.id)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                        )}
                        {payroll.status === 'approved' && (
                          <DropdownMenuItem onClick={() => handleOpenPaymentDialog(payroll.id)}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Process Payment
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Payment Processing Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Process Payroll Payment</DialogTitle>
            <DialogDescription>
              Enter payment details to complete the payroll payment process.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="mobile_money">Mobile Money</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-reference">Reference Number</Label>
              <Input
                id="payment-reference"
                value={paymentReference}
                onChange={(e) => setPaymentReference(e.target.value)}
                placeholder="Transaction ID, check number, etc."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPaymentDialog(false)}
              disabled={processing}
              Cancel
            </Button>
            <Button
              onClick={handleProcessPayment}
              disabled={processing}
              {processing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Process Payment'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PayrollList;


