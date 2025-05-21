import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select } from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { format } from 'date-fns';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface SalaryAdvance {
    id: number;
    employee: {
        id: number;
        first_name: string;
        last_name: string;
    };
    amount: number;
    advance_date: string;
    reason: string;
    status: 'pending' | 'approved' | 'deducted';
    approved_by?: {
        id: number;
        name: string;
    };
    approved_at?: string;
}

interface Props extends PageProps {
    advances: {
        data: SalaryAdvance[];
        links: any[];
    };
    employees: {
        id: number;
        first_name: string;
        last_name: string;
    }[];
    filters: {
        employee_id?: number;
        status?: string;
    };
}

export default function Index({ auth, advances, employees, filters }: Props) {
    const [selectedEmployee, setSelectedEmployee] = useState(filters.employee_id?.toString() || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');

    const handleFilter = () => {
        router.get(
            route('salary-advances.index'),
            {
                employee_id: selectedEmployee || undefined,
                status: selectedStatus || undefined,
            },
            { preserveState: true }
        );
    };

    const getStatusColor = (status: SalaryAdvance['status']) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'deducted':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Salary Advances</h2>}
            <Head title="Salary Advances" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold">Advance Requests</h3>
                                <Link href={route('salary-advances.create')}>
                                    <Button>Create New Request</Button>
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <Select
                                    value={selectedEmployee}
                                    onValueChange={setSelectedEmployee}
                                    placeholder="Select Employee"
                                    <option value="">All Employees</option>
                                    {employees.map((employee) => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.first_name} {employee.last_name}
                                        </option>
                                    ))}
                                </Select>

                                <Select
                                    value={selectedStatus}
                                    onValueChange={setSelectedStatus}
                                    placeholder="Status"
                                    <option value="">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="deducted">Deducted</option>
                                </Select>

                                <Button onClick={handleFilter}>Apply Filters</Button>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Employee</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Reason</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Approved By</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {advances.data.map((advance) => (
                                        <TableRow key={advance.id}>
                                            <TableCell>
                                                {advance.employee.first_name} {advance.employee.last_name}
                                            </TableCell>
                                            <TableCell>${advance.amount.toFixed(2)}</TableCell>
                                            <TableCell>
                                                {format(new Date(advance.advance_date), 'MMM d, yyyy')}
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">{advance.reason}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                                                        advance.status
                                                    )}`}
                                                    {advance.status.charAt(0).toUpperCase() + advance.status.slice(1)}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {advance.approved_by ? (
                                                        {advance.approved_by.name}
                                                        <br />
                                                        <span className="text-xs text-gray-500">
                                                            {format(new Date(advance.approved_at!), 'MMM d, yyyy')}
                                                        </span>
                                                    </>
                                                ) : (
                                                    '-'
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Link href={route('salary-advances.show', advance.id)}>
                                                        <Button variant="outline" size="sm">
                                                            View
                                                        </Button>
                                                    </Link>
                                                    {advance.status === 'pending' && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                router.post(
                                                                    route('salary-advances.approve', advance.id)
                                                                )
                                                            }
                                                            Approve
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* Pagination */}
                            <div className="mt-4">
                                {/* Add your pagination component here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
