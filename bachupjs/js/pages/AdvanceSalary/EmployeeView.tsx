import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import axios from 'axios';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

interface AdvanceSalary {
    id: number;
    request_date: string;
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
    remarks: string;
    payroll_month: string;
    is_deducted: boolean;
}

interface User {
    id: number;
}

interface Auth {
    user: User;
}

interface CustomPageProps extends InertiaPageProps {
    auth: Auth;
}

export default function EmployeeView() {
    const { auth } = usePage<CustomPageProps>().props;
    const [advances, setAdvances] = useState<AdvanceSalary[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        amount: '',
        remarks: '',
        payroll_month: ''
    })

    const fetchAdvances = async () => {
        try {
            const response = await axios.get('/api/advance-salaries');
            setAdvances(response.data.data);
        } catch (error) {
            toast.error('Failed to fetch advance salary requests');
        }
    };

    useEffect(() => {
        fetchAdvances();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`/api/employees/${auth.user.id}/advance-salary`, formData);
            toast.success('Advance salary request submitted successfully');
            setIsDialogOpen(false);
            fetchAdvances();
            setFormData({ amount: '', remarks: '', payroll_month: '' })
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to submit request');
        }
    };

    return (
        <>
            <Head title="Advance Salary" />

            <div className="container mx-auto py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Advance Salary Requests</h1>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>Request Advance Salary</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Request Advance Salary</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Amount</label>
                                    <Input
                                        type="number"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Payroll Month (Optional)</label>
                                    <Input
                                        type="month"
                                        value={formData.payroll_month}
                                        onChange={(e) => setFormData({ ...formData, payroll_month: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Remarks</label>
                                    <Textarea
                                        value={formData.remarks}
                                        onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                                    />
                                </div>
                                <Button type="submit" className="w-full">Submit Request</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Your Advance Salary Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Request Date</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Payroll Month</TableHead>
                                    <TableHead>Deduction Status</TableHead>
                                    <TableHead>Remarks</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {advances.map((advance) => (
                                    <TableRow key={advance.id}>
                                        <TableCell>{new Date(advance.request_date).toLocaleDateString()}</TableCell>
                                        <TableCell>${advance.amount}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                advance.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                advance.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {advance.status}
                                            </span>
                                        </TableCell>
                                        <TableCell>{advance.payroll_month || 'Not specified'}</TableCell>
                                        <TableCell>
                                            {advance.is_deducted ? 'Deducted' : 'Not deducted'}
                                        </TableCell>
                                        <TableCell>{advance.remarks || '-'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
