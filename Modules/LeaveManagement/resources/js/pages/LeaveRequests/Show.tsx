import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/Modules/LeaveManagement/Resources/js/Modules/LeaveManagement/Resources/js/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Modules/LeaveManagement/Resources/js/Modules/LeaveManagement/Resources/js/components/ui/card';
import { Badge } from '@/Modules/LeaveManagement/Resources/js/Modules/LeaveManagement/Resources/js/components/ui/badge';
import { CalendarDays, ArrowLeft, Edit, Trash2, Check, X, RotateCw } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '@/Modules/LeaveManagement/Resources/js/layouts/AdminLayout';
import { LeaveRequest } from '@/Modules/LeaveManagement/Resources/js/types/models';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/Modules/LeaveManagement/Resources/js/Modules/LeaveManagement/Resources/js/components/ui/breadcrumb';
import { formatDate } from '@/Modules/LeaveManagement/Resources/js/utils/format';
import { usePermission } from '@/Modules/LeaveManagement/Resources/js/hooks/usePermission';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/Modules/LeaveManagement/Resources/js/components/ui/dialog';
import { Label } from '@/Modules/LeaveManagement/Resources/js/components/ui/label';
import { Input } from '@/Modules/LeaveManagement/Resources/js/components/ui/input';
import { Textarea } from '@/Modules/LeaveManagement/Resources/js/components/ui/textarea';
import { useState } from 'react';

interface Props {
  leaveRequest: LeaveRequest;
}

export default function LeaveRequestShow({ leaveRequest }: Props) {
  const { hasPermission } = usePermission();
  const [isReturnDialogOpen, setIsReturnDialogOpen] = useState(false);
  const [returnDate, setReturnDate] = useState('');
  const [returnNotes, setReturnNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debug permissions
  console.log('Edit permission:', hasPermission('leave-requests.edit'));
  console.log('Delete permission:', hasPermission('leave-requests.delete'));

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case 'cancelled':
        return <Badge className="bg-gray-100 text-gray-800">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status || 'Unknown'}</Badge>;
    }
  };

  const getLeaveTypeName = (type: string) => {
    const leaveTypes = {
      annual: 'Annual Leave',
      sick: 'Sick Leave',
      personal: 'Personal Leave',
      unpaid: 'Unpaid Leave',
      maternity: 'Maternity Leave',
      paternity: 'Paternity Leave',
      bereavement: 'Bereavement Leave',
      other: 'Other',
    };
    return leaveTypes[type as keyof typeof leaveTypes] || type;
  };

  const handleDelete = () => {
    console.log('Attempting to delete leave request:', leaveRequest.id);
    if (confirm('Are you sure you want to delete this leave request?')) {
      router.delete(route('leave-requests.destroy', leaveRequest.id), {
        onSuccess: () => {
          console.log('Delete successful');
          toast.success('Leave request deleted successfully');
          router.visit(route('leave-requests.index'));
        },
        onError: (errors) => {
          console.error('Delete failed:', errors);
          toast.error(errors.error || 'Failed to delete leave request');
        },
      });
    }
  };

  const handleApprove = () => {
    router.put(route('leave-requests.approve', leaveRequest.id), {}, {
      onSuccess: () => {
        toast.success('Leave request approved successfully');
      },
      onError: (errors) => {
        toast.error(errors.error || 'Failed to approve leave request');
      },
    });
  };

  const handleReject = () => {
    router.put(route('leave-requests.reject', leaveRequest.id), {}, {
      onSuccess: () => {
        toast.success('Leave request rejected successfully');
      },
      onError: (errors) => {
        toast.error(errors.error || 'Failed to reject leave request');
      },
    });
  };

  const handleReturn = () => {
    setIsSubmitting(true);
    router.put(route('leave-requests.return', leaveRequest.id), {
      return_date: returnDate,
      notes: returnNotes,
    }, {
      onSuccess: () => {
        toast.success('Employee has been marked as returned from leave');
        setIsReturnDialogOpen(false);
        router.reload();
      },
      onError: (errors) => {
        toast.error(errors.error || 'Failed to mark employee as returned');
      },
      onFinish: () => {
        setIsSubmitting(false);
      },
    });
  };

  // Calculate the number of days
  const startDate = new Date(leaveRequest.start_date);
  const endDate = new Date(leaveRequest.end_date);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates

  return (
    <AdminLayout>
      <Head title="View Leave Request" />
      <div className="container mx-auto py-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbItem>
            <BreadcrumbLink href={route('dashboard')}>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={route('leave-requests.index')}>Leave Requests</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>View</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <CalendarDays className="h-8 w-8 mr-2 text-primary" />
            <h1 className="text-2xl font-bold">Leave Request Details</h1>
          </div>
          <div className="flex space-x-2">
            <Link href={route('leave-requests.index')}>
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Leave Requests
              </Button>
            </Link>

            {hasPermission('leave-requests.edit') && (
              <Link href={route('leave-requests.edit', leaveRequest.id)}>
                <Button variant="outline" className="text-blue-600">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </Link>
            )}

            {hasPermission('leave-requests.delete') && (
              <Button variant="outline" className="text-red-600" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 shadow-md">
            <CardHeader className="bg-muted/50">
              <CardTitle>Leave Request Information</CardTitle>
              <CardDescription>
                Details of the leave request
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Employee</h3>
                    <p className="text-base font-medium mt-1">
                      {leaveRequest.employee?.first_name} {leaveRequest.employee?.last_name}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Leave Type</h3>
                    <p className="text-base font-medium mt-1">
                      {getLeaveTypeName(leaveRequest.leave_type)}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                    <div className="mt-1">
                      {getStatusBadge(leaveRequest.status)}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Start Date</h3>
                    <p className="text-base font-medium mt-1">
                      {formatDate(leaveRequest.start_date)}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">End Date</h3>
                    <p className="text-base font-medium mt-1">
                      {formatDate(leaveRequest.end_date)}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Duration</h3>
                    <p className="text-base font-medium mt-1">
                      {diffDays} day{diffDays !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-muted-foreground">Reason</h3>
                <p className="text-base mt-1 p-3 bg-muted/20 rounded-md">
                  {leaveRequest.reason || 'No reason provided'}
                </p>
              </div>

              {leaveRequest.notes && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-muted-foreground">Additional Notes</h3>
                  <p className="text-base mt-1 p-3 bg-muted/20 rounded-md">
                    {leaveRequest.notes}
                  </p>
                </div>
              )}

              {leaveRequest.status === 'approved' && !leaveRequest.return_date && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-muted-foreground">Return Status</h3>
                  <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-800">
                      Employee has not returned from leave yet.
                      {leaveRequest.is_overdue_for_return && (
                        <span className="font-semibold"> (Overdue)</span>
                      )}
                    </p>
                  </div>
                </div>
              )}

              {leaveRequest.return_date && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-muted-foreground">Return Information</h3>
                  <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800">
                      Employee returned on {formatDate(leaveRequest.return_date)}
                      {leaveRequest.returner && (
                        <span> (Marked by {leaveRequest.returner.name})</span>
                      )}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>

            {leaveRequest.status === 'pending' && hasPermission('leave-requests.approve') && (
              <CardFooter className="flex justify-end space-x-2 border-t p-6">
                <Button
                  variant="outline"
                  className="text-red-600"
                  onClick={handleReject}
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleApprove}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </CardFooter>
            )}

            {leaveRequest.status === 'approved' && !leaveRequest.return_date && hasPermission('leave-requests.edit') && (
              <CardFooter className="flex justify-end space-x-2 border-t p-6">
                <Dialog open={isReturnDialogOpen} onOpenChange={setIsReturnDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <RotateCw className="mr-2 h-4 w-4" />
                      Mark as Returned
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Mark Employee as Returned</DialogTitle>
                      <DialogDescription>
                        Record the employee's return from leave
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="return_date">Return Date</Label>
                        <Input
                          id="return_date"
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          min={leaveRequest.end_date}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="return_notes">Notes (Optional)</Label>
                        <Textarea
                          id="return_notes"
                          value={returnNotes}
                          onChange={(e) => setReturnNotes(e.target.value)}
                          placeholder="Add any notes about the return..."
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsReturnDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleReturn}
                        disabled={!returnDate || isSubmitting}
                      >
                        {isSubmitting ? 'Processing...' : 'Mark as Returned'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            )}
          </Card>

          <Card className="shadow-md">
            <CardHeader className="bg-muted/50">
              <CardTitle>Leave Balance</CardTitle>
              <CardDescription>
                Current leave balance for {leaveRequest.employee?.first_name}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Annual Leave</span>
                  <span className="font-medium">{leaveRequest.employee?.annual_leave_balance || 0} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Sick Leave</span>
                  <span className="font-medium">{leaveRequest.employee?.sick_leave_balance || 0} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Personal Leave</span>
                  <span className="font-medium">{leaveRequest.employee?.personal_leave_balance || 0} days</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="text-sm font-medium mb-3">Leave History</h3>
                {leaveRequest.employee?.recent_leaves?.length > 0 ? (
                  <div className="space-y-3">
                    {leaveRequest.employee.recent_leaves.map((leave, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <div>
                          <span>{getLeaveTypeName(leave.type)}</span>
                          <span className="text-muted-foreground ml-2">
                            ({formatDate(leave.start_date)} - {formatDate(leave.end_date)})
                          </span>
                        </div>
                        <div>{getStatusBadge(leave.status)}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No recent leave history</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
