import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface TimesheetRecord {
    id: number;
    date: string;
    clock_in: string;
    clock_out: string;
    regular_hours: number;
    overtime_hours: number;
    status: 'pending' | 'approved' | 'rejected';
    notes?: string;
}

interface Props {
    records: TimesheetRecord[];
}

export default function TimesheetHistory({ records }: Props) {
    const calculateTotalHours = (record: TimesheetRecord) => {
        return record.regular_hours + record.overtime_hours;
    };

    const getStatusBadge = (status: TimesheetRecord['status']) => {
        return (
            <Badge
                variant={
                    status === 'approved'
                        ? 'success'
                        : status === 'rejected'
                        ? 'destructive'
                        : 'secondary'
                }
            >
                {status}
            </Badge>
        );
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Clock In</TableHead>
                        <TableHead>Clock Out</TableHead>
                        <TableHead>Regular Hours</TableHead>
                        <TableHead>Overtime Hours</TableHead>
                        <TableHead>Total Hours</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Notes</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {records.map((record) => (
                        <TableRow key={record.id}>
                            <TableCell>
                                {format(new Date(record.date), 'MMM dd, yyyy')}
                            </TableCell>
                            <TableCell>
                                {record.clock_in
                                    ? format(new Date(record.clock_in), 'hh:mm a')
                                    : '-'}
                            </TableCell>
                            <TableCell>
                                {record.clock_out
                                    ? format(new Date(record.clock_out), 'hh:mm a')
                                    : '-'}
                            </TableCell>
                            <TableCell>{record.regular_hours.toFixed(2)}</TableCell>
                            <TableCell>{record.overtime_hours.toFixed(2)}</TableCell>
                            <TableCell className="font-medium">
                                {calculateTotalHours(record).toFixed(2)}
                            </TableCell>
                            <TableCell>{getStatusBadge(record.status)}</TableCell>
                            <TableCell className="max-w-xs truncate">
                                {record.notes || '-'}
                            </TableCell>
                        </TableRow>
                    ))}
                    {records.length === 0 && (
                        <TableRow>
                            <TableCell
                                colSpan={8}
                                className="h-24 text-center text-muted-foreground"
                            >
                                No timesheet records found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
