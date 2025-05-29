import React, { useState } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { EmployeeTimesheet } from '../../types/timesheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
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
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import {
  MoreHorizontal,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Loader2,
  Check
} from 'lucide-react';

interface TimesheetListProps {
  timesheets: EmployeeTimesheet[];
  isLoading: boolean;
  onApprove: () => void;
  onReject: () => void;
  onBulkApprove: (timesheetIds: number[]) => void;
}

const TimesheetList: React.FC<TimesheetListProps> = ({
  timesheets,
  isLoading,
  onApprove,
  onReject,
  onBulkApprove,
}) => {
  const [selectedTimesheets, setSelectedTimesheets] = useState<number[]>([]);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [timesheetToReject, setTimesheetToReject] = useState<number | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleToggleSelect = (id: number) => {
    setSelectedTimesheets((prev) =>
      prev.includes(id)
        ? prev.filter((timesheetId) => timesheetId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedTimesheets.length === timesheets.length) {
      setSelectedTimesheets([]);
    } else {
      setSelectedTimesheets(timesheets.map((timesheet) => timesheet.id));
    }
  };

  const handleApprove = async (id: number) => {
    setProcessing(true);
    try {
      await axios.post(`/api/timesheets/${id}/approve`);
      onApprove();
    } catch (error) {
      console.error('Error approving timesheet:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!timesheetToReject) return;

    setProcessing(true);
    try {
      await axios.post(`/api/timesheets/${timesheetToReject}/reject`, {
        reason: rejectReason,
      })
      setShowRejectDialog(false);
      setRejectReason('');
      setTimesheetToReject(null);
      onReject();
    } catch (error) {
      console.error('Error rejecting timesheet:', error);
    } finally {
      setProcessing(false);
    }
  };

  const openRejectDialog = (id: number) => {
    setTimesheetToReject(id);
    setShowRejectDialog(true);
  };

  const handleBulkApprove = async () => {
    if (selectedTimesheets.length === 0) return;

    setProcessing(true);
    try {
      await onBulkApprove(selectedTimesheets);
      setSelectedTimesheets([]);
    } catch (error) {
      console.error('Error bulk approving timesheets:', error);
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Approved</Badge>
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Rejected</Badge>
      default:
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>
    }
  };

  return (
    <div className="space-y-4">
      {selectedTimesheets.length > 0 && (
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
          <span className="text-sm">
            {selectedTimesheets.length} timesheet{selectedTimesheets.length > 1 ? 's' : ''} selected
          </span>
          <Button
            size="sm"
            onClick={handleBulkApprove}
            disabled={processing}
            className="flex items-center gap-1"
            {processing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            Approve Selected
          </Button>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={
                    selectedTimesheets.length === timesheets.length && timesheets.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  <span className="text-sm text-gray-500 mt-2 block">Loading timesheets...</span>
                </TableCell>
              </TableRow>
            ) : timesheets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <span className="text-sm text-gray-500">No timesheets found.</span>
                </TableCell>
              </TableRow>
            ) : (
              timesheets.map((timesheet) => (
                <TableRow key={timesheet.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedTimesheets.includes(timesheet.id)}
                      onCheckedChange={() => handleToggleSelect(timesheet.id)}
                      disabled={timesheet.status !== 'pending'}
                    />
                  </TableCell>
                  <TableCell>
                    {timesheet.employee?.first_name} {timesheet.employee?.last_name}
                  </TableCell>
                  <TableCell>{format(parseISO(timesheet.date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>Regular: {timesheet.regular_hours}h</span>
                      {timesheet.overtime_hours > 0 && (
                        <span className="text-xs text-orange-600">OT: {timesheet.overtime_hours}h</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {timesheet.project?.name || (
                      <span className="text-gray-400">Not assigned</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(timesheet.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        {timesheet.status === 'pending' && (
                            <DropdownMenuItem onClick={() => handleApprove(timesheet.id)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openRejectDialog(timesheet.id)}>
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </DropdownMenuItem>
                          </>
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

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Timesheet</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this timesheet. The employee will be notified.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="reject-reason">Reason for rejection</Label>
            <Textarea
              id="reject-reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Please specify why this timesheet is being rejected..."
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
              disabled={processing || !rejectReason.trim()}
              {processing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Rejecting...
                </>
              ) : (
                'Reject Timesheet'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TimesheetList;
