import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Payroll, PayrollItem } from '../../types/payroll';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';
import {
  ArrowLeft,
  CheckCircle,
  CreditCard,
  Download,
  Loader2,
  Printer,
  FileText,
  CalendarDays,
  Clock,
  ChevronsUpDown,
  AlertCircle,
  User,
  BadgeCheck,
  DollarSign,
} from 'lucide-react';

interface PayrollDetailsProps {
  payroll: Payroll;
  onBack: () => void;
  onApprove: () => void;
  onProcessPayment: (paymentMethod: string, reference: string) => void;
}

const PayrollDetails: React.FC<PayrollDetailsProps> = ({
  payroll,
  onBack,
  onApprove,
  onProcessPayment,
}) => {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [paymentReference, setPaymentReference] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleProcessPayment = async () => {
    setProcessing(true);
    try {
      await onProcessPayment(paymentMethod, paymentReference);
      setShowPaymentDialog(false);
      setPaymentMethod('bank_transfer');
      setPaymentReference('');
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      setProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'approved':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getItemTypeColor = (type: string) => {
    switch (type) {
      case 'base_salary':
        return 'bg-blue-50 text-blue-700';
      case 'overtime':
        return 'bg-orange-50 text-orange-700';
      case 'allowances':
        return 'bg-green-50 text-green-700';
      case 'bonus':
        return 'bg-purple-50 text-purple-700';
      case 'tax':
        return 'bg-red-50 text-red-700';
      case 'insurance':
        return 'bg-indigo-50 text-indigo-700';
      case 'deduction':
        return 'bg-pink-50 text-pink-700';
      case 'advance':
        return 'bg-amber-50 text-amber-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Payroll Details</CardTitle>
            <CardDescription>
              Payroll for {payroll.employee?.first_name} {payroll.employee?.last_name} -{' '}
              {format(parseISO(payroll.payroll_month), 'MMMM yyyy')}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={onBack}
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => window.open(`/payroll/${payroll.id}/print`, '_blank')}
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => window.open(`/payroll/${payroll.id}/download`, '_blank')}
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pb-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column - Employee & Status Info */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {payroll.employee?.first_name} {payroll.employee?.last_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {payroll.employee?.position?.name || 'No Position'} •{' '}
                    {payroll.employee?.department?.name || 'No Department'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Payroll ID</span>
                  </div>
                  <span className="font-medium">#{payroll.id}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>Period</span>
                  </div>
                  <span className="font-medium">
                    {format(parseISO(payroll.payroll_month), 'MMMM yyyy')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Hours Worked</span>
                  </div>
                  <span className="font-medium">{payroll.total_worked_hours} hours</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span>Overtime</span>
                  </div>
                  <span className="font-medium">{payroll.overtime_hours} hours</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <BadgeCheck className="h-4 w-4" />
                    <span>Status</span>
                  </div>
                  <Badge variant="outline" className={getStatusColor(payroll.status)}>
                    {payroll.status.charAt(0).toUpperCase() + payroll.status.slice(1)}
                  </Badge>
                </div>
              </div>

              <Separator />

              {payroll.status === 'approved' && (
                <div className="space-y-3">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Approved Information
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Approved By:</div>
                    <div className="font-medium">{payroll.approver?.name || 'N/A'}</div>
                    <div className="text-gray-500">Approved Date:</div>
                    <div className="font-medium">
                      {payroll.approved_at
                        ? format(parseISO(payroll.approved_at), 'MMM dd, yyyy')
                        : 'N/A'}
                    </div>
                  </div>
                </div>
              )}

              {payroll.status === 'paid' && (
                <div className="space-y-3">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-green-600" />
                    Payment Information
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Paid By:</div>
                    <div className="font-medium">{payroll.payer?.name || 'N/A'}</div>
                    <div className="text-gray-500">Payment Date:</div>
                    <div className="font-medium">
                      {payroll.paid_at
                        ? format(parseISO(payroll.paid_at), 'MMM dd, yyyy')
                        : 'N/A'}
                    </div>
                    <div className="text-gray-500">Method:</div>
                    <div className="font-medium capitalize">
                      {payroll.payment_method?.replace('_', ' ') || 'N/A'}
                    </div>
                    <div className="text-gray-500">Reference:</div>
                    <div className="font-medium">{payroll.payment_reference || 'N/A'}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Center column - Payroll Items */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="font-medium text-base flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Payroll Breakdown
              </h3>

              <Card>
                <ScrollArea className="h-[350px]">
                  <div className="p-4 space-y-3">
                    {payroll.items && payroll.items.length > 0 ? (
                      payroll.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2 rounded-md border"
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <Badge className={getItemTypeColor(item.type)}>
                                {item.type.replace('_', ' ')}
                              </Badge>
                              {item.is_taxable && (
                                <span className="text-xs text-gray-500">(Taxable)</span>
                              )}
                            </div>
                            <span className="text-sm text-gray-600 mt-1">
                              {item.description}
                            </span>
                          </div>
                          <span
                            className={`font-medium ${
                              item.amount < 0 ? 'text-red-600' : 'text-gray-900'
                            }`}
                            {formatCurrency(item.amount)}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500 space-y-2">
                        <AlertCircle className="h-8 w-8" />
                        <div>No detailed items available</div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="border-t p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Base Salary</span>
                      <span>{formatCurrency(payroll.base_salary)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Overtime</span>
                      <span>{formatCurrency(payroll.overtime_amount)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Bonuses</span>
                      <span>{formatCurrency(payroll.bonus_amount)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Deductions</span>
                      <span className="text-red-600">
                        -{formatCurrency(payroll.deduction_amount)}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between items-center font-semibold">
                      <span>FINAL AMOUNT</span>
                      <span className="text-lg">{formatCurrency(payroll.final_amount)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {payroll.notes && (
            <div className="mt-4 p-3 border rounded-md bg-gray-50">
              <h4 className="text-sm font-medium mb-1">Notes</h4>
              <p className="text-sm text-gray-600">{payroll.notes}</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-end">
          {payroll.status === 'pending' && (
            <Button
              onClick={onApprove}
              className="flex items-center gap-1"
              <CheckCircle className="h-4 w-4" />
              Approve Payroll
            </Button>
          )}
          {payroll.status === 'approved' && (
            <Button
              onClick={() => setShowPaymentDialog(true)}
              className="flex items-center gap-1"
              <CreditCard className="h-4 w-4" />
              Process Payment
            </Button>
          )}
        </CardFooter>
      </Card>

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

export default PayrollDetails;
