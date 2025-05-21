import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/Modules/Payroll/Resources/js/types';
import AdminLayout from '@/Modules/Payroll/Resources/js/layouts/AdminLayout';
import { Button } from '@/Modules/Payroll/Resources/js/Modules/Payroll/Resources/js/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Modules/Payroll/Resources/js/Modules/Payroll/Resources/js/components/ui/card';
import { format } from 'date-fns';
import { ArrowLeft, Download, Printer } from 'lucide-react';
import { useToast } from '@/Modules/Payroll/Resources/js/Modules/Payroll/Resources/js/components/ui/use-toast';
import { Badge } from '@/Modules/Payroll/Resources/js/Modules/Payroll/Resources/js/components/ui/badge';
import { Separator } from '@/Modules/Payroll/Resources/js/Modules/Payroll/Resources/js/components/ui/separator';
import { Alert, AlertDescription } from '@/Modules/Payroll/Resources/js/Modules/Payroll/Resources/js/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface Props extends PageProps {
    settlement: {
        id: number;
        employee: {
            id: number;
            employee_id: string;
            first_name: string;
            last_name: string;
            basic_salary: number;
            leave_balance: number;
        };
        last_working_day: string;
        leave_encashment: number;
        unpaid_salary: number;
        unpaid_overtime: number;
        deductions: number;
        gratuity: number;
        total_payable: number;
        status: string;
        notes: string;
        agreement_terms: string;
        created_at: string;
        updated_at: string;
        approved_by?: {
            id: number;
            name: string;
        };
        approved_at?: string;
        completed_at?: string;
        deductions_list: Array<{
            type: string;
            description: string;
            amount: number;
            reference_number?: string;
            notes?: string;
        }>;
    };
}

export default function Show({ auth, settlement }: Props) {
    const { toast } = useToast();

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        // TODO: Implement PDF download
        toast({
            title: 'Coming Soon',
            description: 'PDF download functionality will be available soon.',
        });
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
            pending: 'secondary',
            approved: 'default',
            rejected: 'destructive',
            completed: 'default',
        };

        return (
            <Badge variant={variants[status] || 'outline'} className="capitalize">
                {status}
            </Badge>
        );
    };

    return (
        <AdminLayout title="Final Settlement Details" requiredPermission="final-settlements.view">
            <Head title="Final Settlement Details" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-2xl font-bold">Final Settlement Details</CardTitle>
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" onClick={handlePrint}>
                                <Printer className="mr-2 h-4 w-4" />
                                Print
                            </Button>
                            <Button variant="outline" onClick={handleDownload}>
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href={route('employees.show', settlement.employee.id)}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Employee
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-muted-foreground">Employee Information</h3>
                                    <dl className="space-y-2">
                                        <div className="flex justify-between border-b pb-2">
                                            <dt className="text-sm font-medium">Employee ID</dt>
                                            <dd className="text-sm">{settlement.employee.employee_id}</dd>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <dt className="text-sm font-medium">Name</dt>
                                            <dd className="text-sm">
                                                {settlement.employee.first_name} {settlement.employee.last_name}
                                            </dd>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <dt className="text-sm font-medium">Last Working Day</dt>
                                            <dd className="text-sm">
                                                {format(new Date(settlement.last_working_day), 'PPP')}
                                            </dd>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <dt className="text-sm font-medium">Status</dt>
                                            <dd className="text-sm">{getStatusBadge(settlement.status)}</dd>
                                        </div>
                                    </dl>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-muted-foreground">Settlement Details</h3>
                                    <dl className="space-y-2">
                                        <div className="flex justify-between border-b pb-2">
                                            <dt className="text-sm font-medium">Leave Balance</dt>
                                            <dd className="text-sm">{settlement.employee.leave_balance} days</dd>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <dt className="text-sm font-medium">Leave Encashment</dt>
                                            <dd className="text-sm">SAR {settlement.leave_encashment.toFixed(2)}</dd>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <dt className="text-sm font-medium">Unpaid Salary</dt>
                                            <dd className="text-sm">SAR {settlement.unpaid_salary.toFixed(2)}</dd>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <dt className="text-sm font-medium">Unpaid Overtime</dt>
                                            <dd className="text-sm">SAR {settlement.unpaid_overtime.toFixed(2)}</dd>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <dt className="text-sm font-medium">Gratuity</dt>
                                            <dd className="text-sm">SAR {settlement.gratuity.toFixed(2)}</dd>
                                        </div>
                                        <div className="flex justify-between border-b pb-2 font-semibold">
                                            <dt className="text-sm">Total Payable</dt>
                                            <dd className="text-sm">SAR {settlement.total_payable.toFixed(2)}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            {settlement.deductions_list.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-muted-foreground">Deductions</h3>
                                    <div className="space-y-4">
                                        {settlement.deductions_list.map((deduction, index) => (
                                            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                <div>
                                                    <p className="text-sm font-medium">Type</p>
                                                    <p className="text-sm">{deduction.type}</p>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <p className="text-sm font-medium">Description</p>
                                                    <p className="text-sm">{deduction.description}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">Amount</p>
                                                    <p className="text-sm">SAR {deduction.amount.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {settlement.notes && (
                                <div className="space-y-2">
                                    <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
                                    <p className="text-sm whitespace-pre-wrap">{settlement.notes}</p>
                                </div>
                            )}

                            {settlement.agreement_terms && (
                                <div className="space-y-2">
                                    <h3 className="text-sm font-medium text-muted-foreground">Agreement Terms</h3>
                                    <p className="text-sm whitespace-pre-wrap">{settlement.agreement_terms}</p>
                                </div>
                            )}

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-muted-foreground">Settlement Timeline</h3>
                                <dl className="space-y-2">
                                    <div className="flex justify-between border-b pb-2">
                                        <dt className="text-sm font-medium">Created At</dt>
                                        <dd className="text-sm">
                                            {format(new Date(settlement.created_at), 'PPP p')}
                                        </dd>
                                    </div>
                                    {settlement.approved_by && (
                                        <div className="flex justify-between border-b pb-2">
                                            <dt className="text-sm font-medium">Approved By</dt>
                                            <dd className="text-sm">{settlement.approved_by.name}</dd>
                                        </div>
                                    )}
                                    {settlement.approved_at && (
                                        <div className="flex justify-between border-b pb-2">
                                            <dt className="text-sm font-medium">Approved At</dt>
                                            <dd className="text-sm">
                                                {format(new Date(settlement.approved_at), 'PPP p')}
                                            </dd>
                                        </div>
                                    )}
                                    {settlement.completed_at && (
                                        <div className="flex justify-between border-b pb-2">
                                            <dt className="text-sm font-medium">Completed At</dt>
                                            <dd className="text-sm">
                                                {format(new Date(settlement.completed_at), 'PPP p')}
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
