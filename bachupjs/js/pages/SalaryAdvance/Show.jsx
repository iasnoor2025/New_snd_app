import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { format } from 'date-fns';

export default function Show({ auth, salaryAdvance }) {
    const { post, processing } = useForm();

    const handleApprove = () => {
        post(route('salary-advances.approve', salaryAdvance.id));
    };

    const handleReject = () => {
        if (confirm('Are you sure you want to reject this salary advance request?')) {
            post(route('salary-advances.reject', salaryAdvance.id));
        }
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
            deducted: 'bg-blue-100 text-blue-800',
        };

        return (
            <Badge className={statusColors[status]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Salary Advance Details</h2>}
            <Head title="Salary Advance Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Advance Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Employee</h3>
                                        <p className="mt-1">{salaryAdvance.employee.name}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                                        <p className="mt-1">${salaryAdvance.amount.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Status</h3>
                                        <p className="mt-1">{getStatusBadge(salaryAdvance.status)}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Advance Date</h3>
                                        <p className="mt-1">{format(new Date(salaryAdvance.advance_date), 'MMMM dd, yyyy')}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Deduction Start Date</h3>
                                        <p className="mt-1">{format(new Date(salaryAdvance.deduction_start_date), 'MMMM dd, yyyy')}</p>
                                    </div>
                                    {salaryAdvance.approver && (
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Approved By</h3>
                                            <p className="mt-1">{salaryAdvance.approver.name}</p>
                                        </div>
                                    )}
                                    {salaryAdvance.approved_at && (
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Approved At</h3>
                                            <p className="mt-1">{format(new Date(salaryAdvance.approved_at), 'PPpp')}</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Request Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Reason</h3>
                                        <p className="mt-1 whitespace-pre-wrap">{salaryAdvance.reason}</p>
                                    </div>
                                    {salaryAdvance.notes && (
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                                            <p className="mt-1 whitespace-pre-wrap">{salaryAdvance.notes}</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                        {salaryAdvance.status === 'pending' && auth.user.hasRole(['admin', 'hr']) && (
                                <Button
                                    onClick={handleApprove}
                                    disabled={processing}
                                    Approve Request
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleReject}
                                    disabled={processing}
                                    Reject Request
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
