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

export default function Index({ auth, finalSettlements, filters }) {
    const { data, setData, get } = useForm({
        status: filters.status || '',
        employee_id: filters.employee_id || '',
    })

    const handleFilter = (e) => {
        e.preventDefault();
        get(route('final-settlements.index'), {
            preserveState: true,
            preserveScroll: true,
        })
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Final Settlements</h2>}
            <Head title="Final Settlements" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-gray-900">Final Settlement Requests</h3>
                        <Button
                            onClick={() => window.location = route('final-settlements.create')}
                            New Settlement
                        </Button>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Settlement Requests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleFilter} className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Select
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
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
                                            <TableHead>Settlement Date</TableHead>
                                            <TableHead>Total Amount</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {finalSettlements.data.map((settlement) => (
                                            <TableRow key={settlement.id}>
                                                <TableCell>{settlement.employee.name}</TableCell>
                                                <TableCell>{format(new Date(settlement.settlement_date), 'MMM dd, yyyy')}</TableCell>
                                                <TableCell>${settlement.total_amount.toFixed(2)}</TableCell>
                                                <TableCell>{getStatusBadge(settlement.status)}</TableCell>
                                                <TableCell>
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => window.location = route('final-settlements.show', settlement.id)}
                                                            View
                                                        </Button>
                                                        {settlement.status === 'pending' && auth.user.hasRole(['admin', 'hr']) && (
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => window.location = route('final-settlements.approve', settlement.id)}
                                                                    Approve
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => window.location = route('final-settlements.cancel', settlement.id)}
                                                                    Cancel
                                                                </Button>
                                                            </>
                                                        )}
                                                        {settlement.status === 'approved' && auth.user.hasRole(['admin', 'hr']) && (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => window.location = route('final-settlements.process-payment', settlement.id)}
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
                                {finalSettlements.links && (
                                    <div className="flex justify-center">
                                        {finalSettlements.links.map((link, i) => (
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
