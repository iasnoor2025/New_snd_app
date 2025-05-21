import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Loader2, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';

interface AdvanceSalaryRequest {
  id: number;
  employee_id: number;
  employee_name: string;
  amount: number;
  repayment_months: number;
  reason: string;
  requested_date: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  notes?: string;
}

export const AdvanceSalaryApproval: React.FC = () => {
  const [requests, setRequests] = useState<AdvanceSalaryRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [viewRequest, setViewRequest] = useState<AdvanceSalaryRequest | null>(null);
  const [approvalNotes, setApprovalNotes] = useState('');
  const [rejectionNotes, setRejectionNotes] = useState('');
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/advance-salary/requests');
      setRequests(response.data.data);
    } catch (error) {
      console.error('Error fetching advance salary requests:', error);
      toast.error('Failed to load advance salary requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async () => {
    if (!viewRequest) return;

    setProcessingId(viewRequest.id);
    try {
      await axios.post(`/api/advance-salary/approve/${viewRequest.id}`, {
        notes: approvalNotes
      })
      toast.success('Request approved successfully');
      fetchRequests();
      setShowApprovalDialog(false);
      setApprovalNotes('');
    } catch (error) {
      console.error('Error approving request:', error);
      toast.error('Failed to approve request');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async () => {
    if (!viewRequest) return;

    setProcessingId(viewRequest.id);
    try {
      await axios.post(`/api/advance-salary/reject/${viewRequest.id}`, {
        notes: rejectionNotes
      })
      toast.success('Request rejected');
      fetchRequests();
      setShowRejectionDialog(false);
      setRejectionNotes('');
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast.error('Failed to reject request');
    } finally {
      setProcessingId(null);
    }
  };

  const openViewDialog = (request: AdvanceSalaryRequest) => {
    setViewRequest(request);
    setShowViewDialog(true);
  };

  const openApprovalDialog = () => {
    setShowApprovalDialog(true);
    setShowViewDialog(false);
  };

  const openRejectionDialog = () => {
    setShowRejectionDialog(true);
    setShowViewDialog(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success" className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Approved</Badge>
      case 'rejected':
        return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="h-3 w-3" /> Rejected</Badge>
      case 'pending':
      default:
        return <Badge variant="outline" className="flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Pending</Badge>
    }
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  };

  return (
      <Card>
        <CardHeader>
          <CardTitle>Advance Salary Requests</CardTitle>
          <CardDescription>
            Review and approve employee requests for salary advances
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No advance salary requests found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Repayment</TableHead>
                    <TableHead>Requested Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted On</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.employee_name}</TableCell>
                      <TableCell>{formatCurrency(request.amount)}</TableCell>
                      <TableCell>{request.repayment_months} months</TableCell>
                      <TableCell>{formatDate(request.requested_date)}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>{formatDate(request.created_at)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openViewDialog(request)}
                          disabled={processingId === request.id}
                          className="flex items-center gap-1"
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Request Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Advance Salary Request</DialogTitle>
            <DialogDescription>
              Review the details of the advance salary request.
            </DialogDescription>
          </DialogHeader>

          {viewRequest && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-semibold">Employee</h4>
                  <p className="text-sm">{viewRequest.employee_name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Amount</h4>
                  <p className="text-sm">{formatCurrency(viewRequest.amount)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Repayment</h4>
                  <p className="text-sm">{viewRequest.repayment_months} months</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold">Status</h4>
                <div className="mt-1">{getStatusBadge(viewRequest.status)}</div>
              </div>

              <div>
                <h4 className="text-sm font-semibold">Reason</h4>
                <p className="text-sm mt-1 p-3 bg-muted rounded-md">{viewRequest.reason}</p>
              </div>

              {viewRequest.notes && (
                <div>
                  <h4 className="text-sm font-semibold">Notes</h4>
                  <p className="text-sm mt-1 p-3 bg-muted rounded-md">{viewRequest.notes}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold">Requested Date</h4>
                  <p className="text-sm">{formatDate(viewRequest.requested_date)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Submitted On</h4>
                  <p className="text-sm">{formatDate(viewRequest.created_at)}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:justify-start">
            {viewRequest && viewRequest.status === 'pending' && (
                <Button
                  type="button"
                  variant="default"
                  onClick={openApprovalDialog}
                  disabled={processingId === viewRequest.id}
                  Approve
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={openRejectionDialog}
                  disabled={processingId === viewRequest.id}
                  Reject
                </Button>
              </>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowViewDialog(false)}
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approval Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Advance Salary Request</DialogTitle>
            <DialogDescription>
              You are about to approve this advance salary request. Add any notes for record keeping.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Label htmlFor="approvalNotes">Approval Notes (Optional)</Label>
            <Textarea
              id="approvalNotes"
              placeholder="Add any notes about this approval..."
              value={approvalNotes}
              onChange={(e) => setApprovalNotes(e.target.value)}
              rows={3}
              className="mt-2"
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowApprovalDialog(false)}
              disabled={processingId === viewRequest?.id}
              Cancel
            </Button>
            <Button
              onClick={handleApprove}
              disabled={processingId === viewRequest?.id}
              {processingId === viewRequest?.id ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                'Confirm Approval'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Advance Salary Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this advance salary request.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Label htmlFor="rejectionNotes" className="text-destructive">Rejection Reason (Required)</Label>
            <Textarea
              id="rejectionNotes"
              placeholder="Enter reason for rejection..."
              value={rejectionNotes}
              onChange={(e) => setRejectionNotes(e.target.value)}
              rows={3}
              className="mt-2"
              required
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRejectionDialog(false)}
              disabled={processingId === viewRequest?.id}
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={processingId === viewRequest?.id || !rejectionNotes.trim()}
              {processingId === viewRequest?.id ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                'Confirm Rejection'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdvanceSalaryApproval;
