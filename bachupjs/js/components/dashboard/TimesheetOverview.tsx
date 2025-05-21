import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatTimestamp } from '@/utils/dashboard';
import { Clock, Edit } from 'lucide-react';

interface Timesheet {
    id: number;
    date: string;
    hours: number;
    project: string;
    description: string;
    status: 'pending' | 'approved' | 'rejected';
}

interface Props {
    timesheets: Timesheet[];
}

export const TimesheetOverview: FC<Props> = ({ timesheets }) => {
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

    const totalHours = timesheets.reduce((acc, ts) => acc + ts.hours, 0);
    const pendingHours = timesheets;
        .filter(ts => ts.status === 'pending');
        .reduce((acc, ts) => acc + ts.hours, 0);

    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span className="text-2xl font-bold">{totalHours}h</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Pending Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span className="text-2xl font-bold">{pendingHours}h</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Recent Timesheets</CardTitle>
                        <Button>Add Timesheet</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Project</TableHead>
                                <TableHead>Hours</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {timesheets.map((timesheet) => (
                                <TableRow key={timesheet.id}>
                                    <TableCell>{formatTimestamp(timesheet.date)}</TableCell>
                                    <TableCell>{timesheet.project}</TableCell>
                                    <TableCell>{timesheet.hours}h</TableCell>
                                    <TableCell>{timesheet.description}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(timesheet.status)}>
                                            {timesheet.status}
                                        </Badge>
                                    </TableCell>
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


