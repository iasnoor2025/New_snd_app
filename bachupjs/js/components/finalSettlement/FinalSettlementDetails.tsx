import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { FinalSettlement, SettlementComponent } from '../../types/finalSettlement';
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
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  CreditCard,
  Download,
  Loader2,
  Printer,
  CalendarDays,
  User,
  Clock,
  DollarSign,
  FileCheck,
  Briefcase,
  AlertCircle,
  BadgeCheck,
} from 'lucide-react';

interface FinalSettlementDetailsProps {
  settlement: FinalSettlement;
  onBack: () => void;
  onApprove: () => void;
  onReject: (reason: string) => void;
  onProcessPayment: (paymentMethod: string, reference: string) => void;
}

const FinalSettlementDetails: React.FC<FinalSettlementDetailsProps> = ({
  settlement,
  onBack,
  onApprove,
  onReject,
  onProcessPayment,
}) => {
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [paymentReference, setPaymentReference] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleOpenRejectDialog = () => {
    setRejectionReason('');
    setShowRejectDialog(true);
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) return;

    setProcessing(true);
    try {
      await onReject(rejectionReason);
      setShowRejectDialog(false);
    } catch (error) {
      console.error('Error rejecting settlement:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleOpenPaymentDialog = () => {
    setPaymentMethod('bank_transfer');
    setPaymentReference('');
    setShowPaymentDialog(true);
  };

  const handleProcessPayment = async () => {
    setProcessing(true);
    try {
      await onProcessPayment(paymentMethod, paymentReference);
      setShowPaymentDialog(false);
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
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'approved':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getComponentTypeColor = (type: string) => {
    switch (type) {
      case 'salary':
        return 'bg-blue-50 text-blue-700';
      case 'leave_encashment':
        return 'bg-green-50 text-green-700';
      case 'bonus':
        return 'bg-purple-50 text-purple-700';
      case 'gratuity':
        return 'bg-indigo-50 text-indigo-700';
      case 'notice_period':
        return 'bg-yellow-50 text-yellow-700';
      case 'advance_recovery':
        return 'bg-red-50 text-red-700';
      case 'equipment_recovery':
        return 'bg-orange-50 text-orange-700';
      case 'deduction':
        return 'bg-pink-50 text-pink-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const formatComponentType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const hasPendingDocuments = settlement.documents
    ? settlement.documents.some(doc => doc.is_mandatory && !doc.is_submitted)
    : false;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Final Settlement Details</CardTitle>
            <CardDescription>
              Settlement for {settlement.employee?.first_name} {settlement.employee?.last_name}{' '}
              - Exit Date: {format(parseISO(settlement.exit_date), 'MMMM dd, yyyy')}
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
              onClick={() => window.open(`/final-settlements/${settlement.id}/print`, '_blank')}
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => window.open(`/final-settlements/${settlement.id}/download`, '_blank')}
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
                    {settlement.employee?.first_name} {settlement.employee?.last_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {settlement.employee?.position?.name || 'No Position'} â€¢{' '}
                    {settlement.employee?.department?.name || 'No Department'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <FileCheck className="h-4 w-4" />
                    <span>Settlement ID</span>
                  </div>
                  <span className="font-medium">#{settlement.id}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>Exit Date</span>
                  </div>
                  <span className="font-medium">
                    {format(parseISO(settlement.exit_date), 'MMM dd, yyyy')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>Settlement Date</span>
                  </div>
                  <span className="font-medium">
                    {format(parseISO(settlement.settlement_date), 'MMM dd, yyyy')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Notice Period</span>
                  </div>
                  <span className="font-medium">
                    {settlement.notice_period_served ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Served
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Not Served
                      </Badge>
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <BadgeCheck className="h-4 w-4" />
                    <span>Status</span>
                  </div>
                  <Badge variant="outline" className={getStatusColor(settlement.status)}>
                    {settlement.status.charAt(0).toUpperCase() + settlement.status.slice(1)}
                  </Badge>
                </div>
              </div>

              <Separator />

              {settlement.status === 'approved' && (
                <div className="space-y-3">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Approved Information
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Approved By:</div>
                    <div className="font-medium">{settlement.approver?.name || 'N/A'}</div>
                    <div className="text-gray-500">Approved Date:</div>
                    <div className="font-medium">
                      {settlement.approved_at
                        ? format(parseISO(settlement.approved_at), 'MMM dd, yyyy')
                        : 'N/A'}
                    </div>
                  </div>
                </div>
              )}

              {settlement.status === 'rejected' && (
                <div className="space-y-3">
                  <h4 className="font-medium text-sm flex items-center gap-2 text-red-600">
                    <XCircle className="h-4 w-4" />
                    Rejection Information
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Rejected By:</div>
                    <div className="font-medium">{settlement.approver?.name || 'N/A'}</div>
                    <div className="text-gray-500">Rejected Date:</div>
                    <div className="font-medium">
                      {settlement.approved_at
                        ? format(parseISO(settlement.approved_at), 'MMM dd, yyyy')
                        : 'N/A'}
                    </div>
                  </div>
                  {settlement.notes && (
                    <div className="mt-2 text-sm">
                      <div className="text-gray-500">Reason:</div>
                      <div className="p-2 bg-red-50 rounded-md text-red-800 mt-1">{settlement.notes}</div>
                    </div>
                  )}
                </div>
              )}

              {settlement.status === 'paid' && (
                <div className="space-y-3">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-green-600" />
                    Payment Information
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Paid By:</div>
                    <div className="font-medium">{settlement.payer?.name || 'N/A'}</div>
                    <div className="text-gray-500">Payment Date:</div>
                    <div className="font-medium">
                      {settlement.paid_at
                        ? format(parseISO(settlement.paid_at), 'MMM dd, yyyy')
                        : 'N/A'}
                    </div>
                    <div className="text-gray-500">Method:</div>
                    <div className="font-medium capitalize">
                      {settlement.payment_method?.replace('_', ' ') || 'N/A'}
                    </div>
                    <div className="text-gray-500">Reference:</div>
                    <div className="font-medium">{settlement.payment_reference || 'N/A'}</div>
                  </div>
                </div>
              )}

              {/* Document Submission Status */}
              {settlement.documents && settlement.documents.length > 0 && (
                <div className="space-y-3 pt-3">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <FileCheck className="h-4 w-4" />
                    Document Submission
                  </h4>
                  <div className="space-y-2">
                    {settlement.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between text-sm border-b pb-2"
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${doc.is_submitted ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          <span>{doc.name}</span>
                          {doc.is_mandatory && (
                            <Badge variant="outline" className="text-xs">Required</Badge>
                          )}
                        </div>
                        <span>
                          {doc.is_submitted ? (
                            <span className="text-green-600">Submitted</span>
                          ) : (
                            <span className="text-red-600">Pending</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Center column - Settlement Components */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="font-medium text-base flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Settlement Breakdown
              </h3>

              <Card>
                <ScrollArea className="h-[350px]">
                  <div className="p-4 space-y-3">
                    {settlement.components && settlement.components.length > 0 ? (
                      settlement.components.map((component) => (
                        <div
                          key={component.id}
                          className="flex items-center justify-between p-3 rounded-md border"
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <Badge className={getComponentTypeColor(component.type)}>
                                {formatComponentType(component.type)}
                              </Badge>
                            </div>
                            <span className="text-sm text-gray-600 mt-1">
                              {component.description}
                            </span>
                            {component.calculation_notes && (
                              <span className="text-xs text-gray-500 mt-1 italic">
                                {component.calculation_notes}
                              </span>
                            )}
                          </div>
                          <span
                            className={`font-medium ${
                              component.is_deduction ? 'text-red-600' : 'text-gray-900'
                            }`}
                            {component.is_deduction ? '-' : ''}{formatCurrency(component.amount)}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500 space-y-2">
                        <AlertCircle className="h-8 w-8" />
                        <div>No settlement components available</div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="border-t p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Total Settlement Amount</span>
                      <span>{formatCurrency(settlement.total_settlement_amount)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Total Deductions</span>
                      <span className="text-red-600">
                        -{formatCurrency(settlement.total_deduction_amount)}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between items-center font-semibold">
                      <span>FINAL AMOUNT</span>
                      <span className="text-lg">{formatCurrency(settlement.final_amount)}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Notice Period Warning */}
              {!settlement.notice_period_served && (
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Notice Period Not Served</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        The employee did not serve the full notice period of {settlement.notice_period_days} days.
                        Appropriate deductions have been applied to the final settlement.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Pending Documents Warning */}
              {hasPendingDocuments && settlement.status !== 'paid' && (
                <div className="bg-orange-50 border border-orange-200 p-3 rounded-md">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-800">Pending Required Documents</h4>
                      <p className="text-sm text-orange-700 mt-1">
                        Some required documents have not been submitted.
                        It is recommended to complete document submission before finalizing payment.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {settlement.notes && (
            <div className="mt-4 p-3 border rounded-md bg-gray-50">
              <h4 className="text-sm font-medium mb-1">Notes</h4>
              <p className="text-sm text-gray-600">{settlement.notes}</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-end">
          {(settlement.status === 'draft' || settlement.status === 'pending') && (
              <Button
                variant="outline"
                onClick={handleOpenRejectDialog}
                className="flex items-center gap-1 mr-2"
                <XCircle className="h-4 w-4" />
                Reject
              </Button>
              <Button
                onClick={onApprove}
                className="flex items-center gap-1"
                <CheckCircle className="h-4 w-4" />
                Approve Settlement
              </Button>
            </>
          )}
          {settlement.status === 'approved' && (
            <Button
              onClick={handleOpenPaymentDialog}
              className="flex items-center gap-1"
              <CreditCard className="h-4 w-4" />
              Process Payment
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Rejection Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Final Settlement</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this settlement.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="rejection-reason">Reason for rejection</Label>
            <Textarea
              id="rejection-reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Please explain why this settlement is being rejected..."
              className="mt-2"
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRejectDialog(false)}
              disabled={processing}
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={processing || !rejectionReason.trim()}
              {processing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Rejecting...
                </>
              ) : (
                'Reject Settlement'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Processing Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Process Settlement Payment</DialogTitle>
            <DialogDescription>
              Enter payment details to complete the final settlement payment.
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

            {hasPendingDocuments && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-700">
                    <strong>Warning:</strong> Some required documents are still pending.
                    It is recommended to collect all required documents before processing payment.
                  </div>
                </div>
              </div>
            )}
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

export default FinalSettlementDetails;


