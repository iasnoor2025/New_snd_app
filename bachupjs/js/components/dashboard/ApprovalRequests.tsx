import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Clock, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { formatTimestamp } from '@/utils/dashboard';

type RequestType = 'timesheet' | 'leave' | 'expense';
type RequestStatus = 'pending' | 'approved' | 'rejected';

interface Submitter {
  name: string;
  position: string;
  avatar?: string;
}

interface ApprovalRequest {
  id: number;
  type: RequestType;
  status: RequestStatus;
  submittedBy: Submitter;
  submittedAt: string;
  details: {
    hours?: number;
    startDate?: string;
    endDate?: string;
    reason?: string;
    amount?: number;
  };
}

interface ApprovalRequestsProps {
  requests: ApprovalRequest[];
}

export const ApprovalRequests: React.FC<ApprovalRequestsProps> = ({ requests }) => {
  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;

  const statusClasses = {
    pending: 'bg-yellow-500',
    approved: 'bg-green-500',
    rejected: 'bg-red-500',
  };

  const getIcon = (type: RequestType) => {
    switch (type) {
      case 'timesheet':
        return <Clock className="h-4 w-4" />
      case 'leave':
        return <Calendar className="h-4 w-4" />
      case 'expense':
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  };

  const getRequestDetails = (request: ApprovalRequest) => {
    switch (request.type) {
      case 'timesheet':
        return <span>{request.details.hours} hours</span>
      case 'leave':
        return (
          <div>
            <div>{request.details.reason}</div>
            <div className="text-xs text-gray-500">
              {formatTimestamp(request.details.startDate!)} - {formatTimestamp(request.details.endDate!)}
            </div>
          </div>
        );
      case 'expense':
        return <span>${request.details.amount?.toFixed(2)}</span>
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold" data-testid="pending-count">
              {pendingCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Approved Today</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold" data-testid="approved-count">
              {approvedCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rejected Today</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold" data-testid="rejected-count">
              {rejectedCount}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Approval Requests</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Submitted At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map(request => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getIcon(request.type)}
                      <span>{request.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={request.submittedBy.avatar} />
                        <AvatarFallback>
                          {request.submittedBy.name
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{request.submittedBy.name}</div>
                        <div className="text-sm text-gray-500">{request.submittedBy.position}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRequestDetails(request)}</TableCell>
                  <TableCell>{formatTimestamp(request.submittedAt)}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white ${statusClasses[request.status]}`}
                      data-testid={`status-${request.status}`}
                      {request.status}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button size="sm" variant="outline">
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        <XCircle className="mr-1 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
