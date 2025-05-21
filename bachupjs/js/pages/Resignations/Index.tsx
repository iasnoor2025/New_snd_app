import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';

interface Resignation {
    id: number;
    employee: {
        id: number;
        employee_id: string;
        first_name: string;
        last_name: string;
    };
    last_working_day: string;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
    approved_by?: {
        name: string;
    };
    approved_at?: string;
    rejection_reason?: string;
}

interface Props {
    resignations: {
        data: Resignation[];
        links: any[];
    };
}

export default function Index({ resignations }: Props) {
    const getStatusBadge = (status: string) => {
        const variants = {
            pending: 'warning',
            approved: 'success',
            rejected: 'destructive',
        } as const;

        return (
            <Badge variant={variants[status as keyof typeof variants]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    return (
        <AdminLayout>
            <Head title="Resignations" />

            <div className="container mx-auto py-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Resignations</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Resignation Requests</CardTitle>
                        <CardDescription>
                            View and manage employee resignation requests
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Last Working Day</TableHead>
                                    <TableHead>Reason</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Submitted On</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {resignations.data.map((resignation) => (
                                    <TableRow key={resignation.id}>
                                        <TableCell>
                                            <Link
                                                href={route('employees.show', resignation.employee.id)}
                                                className="font-medium hover:underline"
                                                {resignation.employee.first_name} {resignation.employee.last_name}
                                            </Link>
                                            <div className="text-sm text-muted-foreground">
                                                {resignation.employee.employee_id}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {format(new Date(resignation.last_working_day), 'MMM dd, yyyy')}
                                        </TableCell>
                                        <TableCell className="max-w-md truncate">
                                            {resignation.reason}
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(resignation.status)}
                                        </TableCell>
                                        <TableCell>
                                            {format(new Date(resignation.created_at), 'MMM dd, yyyy')}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                    <Link href={route('resignations.show', resignation.id)}>
                                                        View Details
                                                    </Link>
                                                </Button>
                                                {resignation.status === 'pending' && (
                                                        <Button
                                                            variant="default"
                                                            size="sm"
                                                            asChild
                                                            <Link href={route('resignations.approve', resignation.id)}>
                                                                Approve
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            asChild
                                                            <Link href={route('resignations.reject', resignation.id)}>
                                                                Reject
                                                            </Link>
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
