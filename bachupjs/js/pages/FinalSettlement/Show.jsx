import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { format } from 'date-fns';

export default function Show({ auth, finalSettlement }) {
    const { post, processing } = useForm();

    const handleApprove = () => {
        post(route('final-settlements.approve', finalSettlement.id));
    };

    const handleProcessPayment = () => {
        post(route('final-settlements.process-payment', finalSettlement.id));
    };

    const handleCancel = () => {
        if (confirm('Are you sure you want to cancel this final settlement?')) {
            post(route('final-settlements.cancel', finalSettlement.id));
        }
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            paid: 'bg-blue-100 text-blue-800',
            cancelled: 'bg-red-100 text-red-800',
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Final Settlement Details</h2>}
            <Head title="Final Settlement Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Settlement Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Employee</h3>
                                        <p className="mt-1">{finalSettlement.employee.name}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Status</h3>
                                        <p className="mt-1">{getStatusBadge(finalSettlement.status)}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Settlement Date</h3>
                                        <p className="mt-1">{format(new Date(finalSettlement.settlement_date), 'MMMM dd, yyyy')}</p>
                                    </div>
                                    {finalSettlement.approver && (
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Approved By</h3>
                                            <p className="mt-1">{finalSettlement.approver.name}</p>
                                        </div>
                                    )}
                                    {finalSettlement.approved_at && (
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Approved At</h3>
                                            <p className="mt-1">{format(new Date(finalSettlement.approved_at), 'PPpp')}</p>
                                        </div>
                                    )}
                                    {finalSettlement.payer && (
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Paid By</h3>
                                            <p className="mt-1">{finalSettlement.payer.name}</p>
                                        </div>
                                    )}
                                    {finalSettlement.paid_at && (
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Paid At</h3>
                                            <p className="mt-1">{format(new Date(finalSettlement.paid_at), 'PPpp')}</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Settlement Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
                                        <p className="mt-1 text-lg font-semibold">${finalSettlement.total_amount.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Breakdown</h3>
                                        <div className="mt-2 space-y-2">
                                            <div className="flex justify-between">
                                                <span>Basic Salary</span>
                                                <span>${finalSettlement.basic_salary.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Allowances</span>
                                                <span>${finalSettlement.allowances.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Deductions</span>
                                                <span>-${finalSettlement.deductions.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Unpaid Leave</span>
                                                <span>-${finalSettlement.unpaid_leave.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Other Adjustments</span>
                                                <span>${finalSettlement.other_adjustments.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {finalSettlement.notes && (
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                                            <p className="mt-1 whitespace-pre-wrap">{finalSettlement.notes}</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                        {finalSettlement.status === 'pending' && auth.user.hasRole(['admin', 'hr']) && (
                                <Button
                                    onClick={handleApprove}
                                    disabled={processing}
                                    Approve Settlement
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleCancel}
                                    disabled={processing}
                                    Cancel Settlement
                                </Button>
                            </>
                        )}
                        {finalSettlement.status === 'approved' && auth.user.hasRole(['admin', 'hr']) && (
                            <Button
                                onClick={handleProcessPayment}
                                disabled={processing}
                                Process Payment
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
