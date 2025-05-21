import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';

export default function Create({ auth, employees }) {
    const { data, setData, post, processing, errors } = useForm({
        employee_id: auth.user.hasRole(['admin', 'hr']) ? '' : auth.user.employee.id,
        amount: '',
        advance_date: new Date().toISOString().split('T')[0],
        deduction_start_date: '',
        reason: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('salary-advances.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Request Salary Advance</h2>}
            <Head title="Request Salary Advance" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>New Salary Advance Request</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {auth.user.hasRole(['admin', 'hr']) && (
                                    <div>
                                        <Label htmlFor="employee_id">Employee</Label>
                                        <Select
                                            id="employee_id"
                                            value={data.employee_id}
                                            onChange={e => setData('employee_id', e.target.value)}
                                            className="mt-1 block w-full"
                                            <option value="">Select Employee</option>
                                            {employees.map((employee) => (
                                                <option key={employee.id} value={employee.id}>
                                                    {employee.name}
                                                </option>
                                            ))}
                                        </Select>
                                        {errors.employee_id && (
                                            <p className="mt-1 text-sm text-red-600">{errors.employee_id}</p>
                                        )}
                                    </div>
                                )}

                                <div>
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        step="0.01"
                                        value={data.amount}
                                        onChange={e => setData('amount', e.target.value)}
                                        className="mt-1 block w-full"
                                        placeholder="Enter amount"
                                    />
                                    {errors.amount && (
                                        <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="advance_date">Advance Date</Label>
                                    <Input
                                        id="advance_date"
                                        type="date"
                                        value={data.advance_date}
                                        onChange={e => setData('advance_date', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    {errors.advance_date && (
                                        <p className="mt-1 text-sm text-red-600">{errors.advance_date}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="deduction_start_date">Deduction Start Date</Label>
                                    <Input
                                        id="deduction_start_date"
                                        type="date"
                                        value={data.deduction_start_date}
                                        onChange={e => setData('deduction_start_date', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    {errors.deduction_start_date && (
                                        <p className="mt-1 text-sm text-red-600">{errors.deduction_start_date}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="reason">Reason</Label>
                                    <Textarea
                                        id="reason"
                                        value={data.reason}
                                        onChange={e => setData('reason', e.target.value)}
                                        className="mt-1 block w-full"
                                        placeholder="Enter reason for advance"
                                        rows={4}
                                    />
                                    {errors.reason && (
                                        <p className="mt-1 text-sm text-red-600">{errors.reason}</p>
                                    )}
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => window.history.back()}
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        Submit Request
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
