import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import axios from 'axios';

interface Employee {
    id: number;
    name: string;
    position: string;
    basic_salary: number;
    total_allowances: number;
    advance_approved: boolean;
}

export default function AdminView() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEligibleEmployees = async () => {
        try {
            const response = await axios.get('/advance-salary/eligible');
            setEmployees(response.data);
        } catch (error) {
            toast.error('Failed to fetch eligible employees');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEligibleEmployees();
    }, []);

    const handleToggleEligibility = async (employeeId: number, eligible: boolean) => {
        try {
            await axios.post(`/advance-salary/${employeeId}/toggle-eligibility`, { eligible })
            toast.success('Eligibility updated successfully');
            fetchEligibleEmployees();
        } catch (error) {
            toast.error('Failed to update eligibility');
        }
    };

    const handleToggleApproval = async (employeeId: number, approved: boolean) => {
        try {
            await axios.post(`/advance-salary/${employeeId}/toggle-approval`, { approved })
            toast.success('Approval updated successfully');
            fetchEligibleEmployees();
        } catch (error) {
            toast.error('Failed to update approval');
        }
    };

    return (
        <>
            <Head title="Advance Salary Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Advance Salary Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Employee Name</TableHead>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Basic Salary</TableHead>
                                        <TableHead>Total Allowances</TableHead>
                                        <TableHead>Eligible for Advance</TableHead>
                                        <TableHead>Current Month Approved</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center">
                                                Loading...
                                            </TableCell>
                                        </TableRow>
                                    ) : employees.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center">
                                                No eligible employees found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        employees.map((employee) => (
                                            <TableRow key={employee.id}>
                                                <TableCell>{employee.name}</TableCell>
                                                <TableCell>{employee.position}</TableCell>
                                                <TableCell>{employee.basic_salary.toFixed(2)}</TableCell>
                                                <TableCell>{employee.total_allowances.toFixed(2)}</TableCell>
                                                <TableCell>
                                                    <Switch
                                                        checked={true}
                                                        onCheckedChange={(checked) =>
                                                            handleToggleEligibility(employee.id, checked)
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Switch
                                                        checked={employee.advance_approved}
                                                        onCheckedChange={(checked) =>
                                                            handleToggleApproval(employee.id, checked)
                                                        }
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
