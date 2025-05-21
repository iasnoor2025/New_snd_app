import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select } from '@/Components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Badge } from '@/Components/ui/badge';
import { format } from 'date-fns';

export default function Index({ auth, salaryAdvances, filters }) {
    const { data, setData, get } = useForm({
        status: filters.status || '',
        employee_id: filters.employee_id || '',
    })

    const handleFilter = (e) => {
        e.preventDefault();
        get(route('salary-advances.index'), {
            preserveState: true,
            preserveScroll: true,
        })
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Salary Advances</h2>}
            <Head title="Salary Advances" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-gray-900">Salary Advance Requests</h3>
                        <Button
                            onClick={() => window.location = route('salary-advances.create')}
                            New Request
                        </Button>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Advance Requests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleFilter} className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Select
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                    <option value="">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                    <option value="deducted">Deducted</option>
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
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Advance Date</TableHead>
                                            <TableHead>Deduction Start</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {salaryAdvances.data.map((advance) => (
                                            <TableRow key={advance.id}>
                                                <TableCell>{advance.employee.name}</TableCell>
                                                <TableCell>${advance.amount.toFixed(2)}</TableCell>
                                                <TableCell>{format(new Date(advance.advance_date), 'MMM dd, yyyy')}</TableCell>
                                                <TableCell>{format(new Date(advance.deduction_start_date), 'MMM dd, yyyy')}</TableCell>
                                                <TableCell>{getStatusBadge(advance.status)}</TableCell>
                                                <TableCell>
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => window.location = route('salary-advances.show', advance.id)}
                                                            View
                                                        </Button>
                                                        {advance.status === 'pending' && auth.user.hasRole(['admin', 'hr']) && (
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => window.location = route('salary-advances.approve', advance.id)}
                                                                    Approve
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => window.location = route('salary-advances.reject', advance.id)}
                                                                    Reject
                                                                </Button>
                                                            </>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="mt-4">
                                {salaryAdvances.links && (
                                    <div className="flex justify-center">
                                        {salaryAdvances.links.map((link, i) => (
                                            <Button
                                                key={i}
                                                variant={link.active ? "default" : "outline"}
                                                className="mx-1"
                                                onClick={() => get(link.url)}
                                                disabled={!link.url}
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
