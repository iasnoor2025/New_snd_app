import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../../../../resources/js/layouts/AdminLayout';
import { PageProps } from '../../../../../../resources/js/types';
import { Payroll } from '../../../../../../resources/js/types/payroll'; 
import { Employee } from '../../../../../../resources/js/types/employee';
import { Button } from '../../../../../../resources/js/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../../resources/js/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../../../resources/js/components/ui/table';
import { Badge } from '../../../../../../resources/js/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../../../../../../resources/js/components/ui/dialog';
import { Input } from '../../../../../../resources/js/components/ui/input';
import { Label } from '../../../../../../resources/js/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../../../resources/js/components/ui/select';
import { format } from 'date-fns';

interface Props extends PageProps {
    payrolls: {
        data: Payroll[];
        links: any;
    };
    employees: Employee[];
    filters: {
        employee_id?: number;
        month?: string;
        status?: string;
    };
    hasRecords: boolean;
}

export default function Index({ auth, payrolls, employees, filters, hasRecords }: Props) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        month: new Date().toISOString().slice(0, 7),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('payroll.generate'), {
            onSuccess: () => setShowModal(false),
        });
    };

    const handleFilter = (key: string, value: string) => {
        router.get(
            route('payroll.index'),
            { ...filters, [key]: value },
            { preserveState: true }
        );
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
            pending: 'secondary',
            approved: 'default',
            paid: 'default',
            cancelled: 'destructive',
        };

        return (
            <Badge variant={variants[status] || 'default'}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    return (
        <AdminLayout
            title="Payroll Management"
            breadcrumbs={[
                { title: 'Payroll', href: route('payroll.index') },
            ]}
            requiredPermission="payrolls.view"
        >
            <Head title="Payroll Management" />

            <div className="container mx-auto py-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Payroll Records</CardTitle>
                        <div className="flex gap-2">
                            <Button onClick={() => setShowModal(true)}>
                                Generate Payroll
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => router.post(route('payroll.generate-monthly'))}
                            >
                                Generate Monthly
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex gap-4">
                                <Input
                                    type="month"
                                    value={filters.month || ''}
                                    onChange={(e) => handleFilter('month', e.target.value)}
                                    className="w-48"
                                />
                                <Select
                                    value={filters.status || ''}
                                    onValueChange={(value) => handleFilter('status', value)}
                                >
                                    <SelectTrigger className="w-48">
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All Status</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="approved">Approved</SelectItem>
                                        <SelectItem value="paid">Paid</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select
                                    value={filters.employee_id?.toString() || ''}
                                    onValueChange={(value) => handleFilter('employee_id', value)}
                                >
                                    <SelectTrigger className="w-48">
                                        <SelectValue placeholder="All Employees" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All Employees</SelectItem>
                                        {employees?.map((employee) => (
                                            <SelectItem key={employee.id} value={employee.id.toString()}>
                                                {employee.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Employee</TableHead>
                                        <TableHead>Month</TableHead>
                                        <TableHead>Base Salary</TableHead>
                                        <TableHead>Overtime</TableHead>
                                        <TableHead>Bonus</TableHead>
                                        <TableHead>Deductions</TableHead>
                                        <TableHead>Final Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {hasRecords && payrolls?.data?.length > 0 ? (
                                        payrolls.data.map((payroll) => (
                                            <TableRow key={payroll.id}>
                                                <TableCell>{payroll.employee.name}</TableCell>
                                                <TableCell>
                                                    {format(new Date(payroll.salary_month), 'MMM yyyy')}
                                                </TableCell>
                                                <TableCell>${payroll.base_salary.toFixed(2)}</TableCell>
                                                <TableCell>${payroll.overtime_amount.toFixed(2)}</TableCell>
                                                <TableCell>${payroll.bonus.toFixed(2)}</TableCell>
                                                <TableCell>
                                                    ${(payroll.deduction.toFixed(2) + (payroll.advance_deduction || 0).toFixed(2))}
                                                </TableCell>
                                                <TableCell>${payroll.net_salary.toFixed(2)}</TableCell>
                                                <TableCell>{getStatusBadge(payroll.status)}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() => router.get(route('payroll.show', { payroll: payroll.id }))}
                                                    >
                                                        View
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={9} className="text-center py-8">
                                                <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                    <p>No payroll records found</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Generate Payroll</DialogTitle>
                        <DialogDescription>
                            Select the month for which you want to generate payroll records.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="month">Select Month</Label>
                                <Input
                                    type="month"
                                    id="month"
                                    value={data.month}
                                    onChange={e => setData('month', e.target.value)}
                                    required
                                />
                                {errors.month && (
                                    <p className="text-sm text-red-500">{errors.month}</p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                Generate
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
