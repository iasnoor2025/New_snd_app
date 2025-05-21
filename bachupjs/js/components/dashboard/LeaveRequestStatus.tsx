import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatTimestamp } from '@/utils/dashboard';
import { Calendar, Edit } from 'lucide-react';

interface LeaveRequest {
    id: number;
    startDate: string;
    endDate: string;
    type: string;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
    approvedBy?: string;
}

interface Props {
    leaveRequests: LeaveRequest[];
}

export const LeaveRequestStatus: FC<Props> = ({ leaveRequests }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'bg-green-500';
            case 'pending':
                return 'bg-yellow-500';
            case 'rejected':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const pendingRequests = leaveRequests.filter(lr => lr.status === 'pending').length;
    const approvedRequests = leaveRequests.filter(lr => lr.status === 'approved').length;

    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Pending Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span className="text-2xl font-bold">{pendingRequests}</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Approved Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span className="text-2xl font-bold">{approvedRequests}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Leave Requests</CardTitle>
                        <Button>Request Leave</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>End Date</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Approved By</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaveRequests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell>{request.type}</TableCell>
                                    <TableCell>{formatTimestamp(request.startDate)}</TableCell>
                                    <TableCell>{formatTimestamp(request.endDate)}</TableCell>
                                    <TableCell>{request.reason}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(request.status)}>
                                            {request.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{request.approvedBy || '-'}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon">
                                            <Edit className="h-4 w-4" />
                                        </Button>
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
