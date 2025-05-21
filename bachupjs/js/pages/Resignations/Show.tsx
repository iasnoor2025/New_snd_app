import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Employee {
    id: number;
    employee_id: string;
    first_name: string;
    last_name: string;
}

interface Approver {
    name: string;
}

interface Resignation {
    id: number;
    employee: Employee;
    last_working_day: string;
    reason: string;
    notes: string | null;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
    approved_by?: Approver;
    approved_at?: string;
    rejection_reason?: string;
}

interface Props {
    resignation: Resignation;
}

export default function Show({ resignation }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        rejection_reason: '',
    })

    const handleReject = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('resignations.reject', resignation.id));
    };

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
            <Head title="Resignation Details" />

            <div className="container mx-auto py-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" asChild>
                            <Link href={route('resignations.index')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Resignations
                            </Link>
                        </Button>
                        <h1 className="text-2xl font-bold">Resignation Details</h1>
                    </div>
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Employee Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div>
                                    <h3 className="font-medium">Employee Name</h3>
                                    <Link
                                        href={route('employees.show', resignation.employee.id)}
                                        className="text-primary hover:underline"
                                        {resignation.employee.first_name} {resignation.employee.last_name}
                                    </Link>
                                </div>
                                <div>
                                    <h3 className="font-medium">Employee ID</h3>
                                    <p>{resignation.employee.employee_id}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Resignation Details</CardTitle>
                            <CardDescription>
                                Status: {getStatusBadge(resignation.status)}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div>
                                    <h3 className="font-medium">Last Working Day</h3>
                                    <p>{format(new Date(resignation.last_working_day), 'MMMM dd, yyyy')}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium">Reason for Resignation</h3>
                                    <p className="whitespace-pre-wrap">{resignation.reason}</p>
                                </div>
                                {resignation.notes && (
                                    <div>
                                        <h3 className="font-medium">Additional Notes</h3>
                                        <p className="whitespace-pre-wrap">{resignation.notes}</p>
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-medium">Submitted On</h3>
                                    <p>{format(new Date(resignation.created_at), 'MMMM dd, yyyy')}</p>
                                </div>
                                {resignation.approved_by && (
                                    <div>
                                        <h3 className="font-medium">Approved By</h3>
                                        <p>{resignation.approved_by.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {format(new Date(resignation.approved_at!), 'MMMM dd, yyyy')}
                                        </p>
                                    </div>
                                )}
                                {resignation.rejection_reason && (
                                    <div>
                                        <h3 className="font-medium">Rejection Reason</h3>
                                        <p className="whitespace-pre-wrap">{resignation.rejection_reason}</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {resignation.status === 'pending' && (
                        <div className="flex justify-end gap-4">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="destructive">Reject Resignation</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Reject Resignation</DialogTitle>
                                        <DialogDescription>
                                            Please provide a reason for rejecting this resignation request.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleReject}>
                                        <div className="grid gap-4 py-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="rejection_reason">Rejection Reason</Label>
                                                <Textarea
                                                    id="rejection_reason"
                                                    value={data.rejection_reason}
                                                    onChange={e => setData('rejection_reason', e.target.value)}
                                                    placeholder="Enter the reason for rejection..."
                                                    required
                                                    className="min-h-[100px]"
                                                />
                                                {errors.rejection_reason && (
                                                    <p className="text-sm text-red-500">{errors.rejection_reason}</p>
                                                )}
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" variant="destructive" disabled={processing}>
                                                Confirm Rejection
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                            <Button
                                variant="default"
                                asChild
                                <Link href={route('resignations.approve', resignation.id)}>
                                    Approve Resignation
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
