import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Modules/Payroll/Resources/js/Layouts/AuthenticatedLayout';
import { Button } from '@/Modules/Payroll/Resources/js/Components/ui/button';
import { Input } from '@/Modules/Payroll/Resources/js/Components/ui/input';
import { Select } from '@/Modules/Payroll/Resources/js/Components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/Modules/Payroll/Resources/js/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Modules/Payroll/Resources/js/Components/ui/table';
import { Badge } from '@/Modules/Payroll/Resources/js/Components/ui/badge';
import { format } from 'date-fns';

export default function Index({ auth, payrolls, filters }) {
    const { data, setData, get } = useForm({
        month: filters.month || '',
        status: filters.status || '',
        employee_id: filters.employee_id || '',
    });

    const handleFilter = (e) => {
        e.preventDefault();
        get(route('payrolls.index'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-blue-100 text-blue-800',
            paid: 'bg-green-100 text-green-800',
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Payroll Management</h2>}
        >
            <Head title="Payroll Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payroll List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleFilter} className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                                <Input
                                    type="month"
                                    value={data.month}
                                    onChange={e => setData('month', e.target.value)}
                                    placeholder="Select Month"
                                />
                                <Select
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                >
                                    <option value="">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="paid">Paid</option>
                                    <option value="cancelled">Cancelled</option>
                                </Select>
                                <Input
                                    type="text"
                                    value={data.employee_id}
                                    onChange={e => setData('employee_id', e.target.value)}
                                    placeholder="Employee ID"
                                />
                                <Button type="submit">Filter</Button>
                            </form>

                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Employee</TableHead>
                                            <TableHead>Month</TableHead>
                                            <TableHead>Base Salary</TableHead>
                                            <TableHead>Net Salary</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {payrolls.data.map((payroll) => (
                                            <TableRow key={payroll.id}>
                                                <TableCell>{payroll.employee.name}</TableCell>
                                                <TableCell>{format(new Date(payroll.payroll_month), 'MMM yyyy')}</TableCell>
                                                <TableCell>${payroll.base_salary.toFixed(2)}</TableCell>
                                                <TableCell>${payroll.net_salary.toFixed(2)}</TableCell>
                                                <TableCell>{getStatusBadge(payroll.status)}</TableCell>
                                                <TableCell>
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => window.location = route('payrolls.show', payroll.id)}
                                                        >
                                                            View
                                                        </Button>
                                                        {payroll.status === 'pending' && (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => window.location = route('payrolls.approve', payroll.id)}
                                                            >
                                                                Approve
                                                            </Button>
                                                        )}
                                                        {payroll.status === 'approved' && (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => window.location = route('payrolls.process-payment', payroll.id)}
                                                            >
                                                                Process Payment
                                                            </Button>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="mt-4">
                                {payrolls.links && (
                                    <div className="flex justify-center">
                                        {payrolls.links.map((link, i) => (
                                            <Button
                                                key={i}
                                                variant={link.active ? "default" : "outline"}
                                                className="mx-1"
                                                onClick={() => get(link.url)}
                                                disabled={!link.url}
                                            >
                                                {link.label}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
