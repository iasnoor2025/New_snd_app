import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { FinalSettlement, FinalSettlementStatus } from '../../types/finalSettlement';
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
import { Textarea } from '../ui/textarea';
import {
  MoreHorizontal,
  Eye,
  FileText,
  CheckCircle,
  XCircle,
  CreditCard,
  Printer,
  Loader2
} from 'lucide-react';

interface FinalSettlementListProps {
  settlements: FinalSettlement[];
  isLoading: boolean;
  onViewSettlement: (settlement: FinalSettlement) => void;
  onApproveSettlement: (settlementId: number) => void;
  onRejectSettlement: (settlementId: number, reason: string) => void;
  onProcessPayment: (settlementId: number, paymentMethod: string, reference: string) => void;
}

const FinalSettlementList: React.FC<FinalSettlementListProps> = ({
  settlements,
  isLoading,
  onViewSettlement,
  onApproveSettlement,
  onRejectSettlement,
  onProcessPayment,
}) => {
  const [statusFilter, setStatusFilter] = useState<FinalSettlementStatus | 'all'>('all');
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedSettlementId, setSelectedSettlementId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [paymentReference, setPaymentReference] = useState('');
  const [processing, setProcessing] = useState(false);

  const filteredSettlements = settlements.filter(
    (settlement) => statusFilter === 'all' || settlement.status === statusFilter;
  );

  const handleOpenRejectDialog = (settlementId: number) => {
    setSelectedSettlementId(settlementId);
    setRejectionReason('');
    setShowRejectDialog(true);
  };

  const handleReject = async () => {
    if (!selectedSettlementId) return;

    setProcessing(true);
    try {
      await onRejectSettlement(selectedSettlementId, rejectionReason);
      setShowRejectDialog(false);
      setSelectedSettlementId(null);
      setRejectionReason('');
    } catch (error) {
      console.error('Error rejecting settlement:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleOpenPaymentDialog = (settlementId: number) => {
    setSelectedSettlementId(settlementId);
    setPaymentMethod('bank_transfer');
    setPaymentReference('');
    setShowPaymentDialog(true);
  };

  const handleProcessPayment = async () => {
    if (!selectedSettlementId) return;

    setProcessing(true);
    try {
      await onProcessPayment(selectedSettlementId, paymentMethod, paymentReference);
      setShowPaymentDialog(false);
      setSelectedSettlementId(null);
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status: FinalSettlementStatus) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">Draft</Badge>
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>
      case 'approved':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Approved</Badge>
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Rejected</Badge>
      case 'paid':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Paid</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="status-filter" className="text-sm whitespace-nowrap">
            Filter by status:
          </Label>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as FinalSettlementStatus | 'all')}
            <SelectTrigger id="status-filter" className="w-[160px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Exit Date</TableHead>
              <TableHead>Settlement Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Deductions</TableHead>
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
                  <span className="text-sm text-gray-500 mt-2 block">Loading settlements...</span>
                </TableCell>
              </TableRow>
            ) : filteredSettlements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  <FileText className="h-6 w-6 text-gray-400 mx-auto" />
                  <span className="text-sm text-gray-500 mt-2 block">No settlement records found.</span>
                </TableCell>
              </TableRow>
            ) : (
              filteredSettlements.map((settlement) => (
                <TableRow key={settlement.id}>
                  <TableCell className="font-medium">{settlement.id}</TableCell>
                  <TableCell>
                    {settlement.employee?.first_name} {settlement.employee?.last_name}
                  </TableCell>
                  <TableCell>{format(parseISO(settlement.exit_date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{format(parseISO(settlement.settlement_date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>
                    ${settlement.total_settlement_amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="text-red-600">
                    -${settlement.total_deduction_amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="font-medium">
                    ${settlement.final_amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell>{getStatusBadge(settlement.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewSettlement(settlement)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.open(`/final-settlements/${settlement.id}/print`, '_blank')}>
                          <Printer className="mr-2 h-4 w-4" />
                          Print Settlement
                        </DropdownMenuItem>

                        {/* Status-specific actions */}
                        {(settlement.status === 'draft' || settlement.status === 'pending') && (
                          <DropdownMenuItem onClick={() => onApproveSettlement(settlement.id)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                        )}

                        {(settlement.status === 'draft' || settlement.status === 'pending') && (
                          <DropdownMenuItem onClick={() => handleOpenRejectDialog(settlement.id)}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                          </DropdownMenuItem>
                        )}

                        {settlement.status === 'approved' && (
                          <DropdownMenuItem onClick={() => handleOpenPaymentDialog(settlement.id)}>
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

export default FinalSettlementList;


