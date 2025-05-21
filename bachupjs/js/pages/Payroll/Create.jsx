import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select } from '@/Components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';

export default function Create({ auth, employees, currentMonth }) {
    const { data, setData, post, processing, errors } = useForm({
        employee_id: '',
        month: currentMonth,
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('payrolls.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Generate Payroll</h2>}
            <Head title="Generate Payroll" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Generate New Payroll</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                                    <div>
                                        <Label htmlFor="month">Payroll Month</Label>
                                        <Input
                                            id="month"
                                            type="month"
                                            value={data.month}
                                            onChange={e => setData('month', e.target.value)}
                                            className="mt-1 block w-full"
                                        />
                                        {errors.month && (
                                            <p className="mt-1 text-sm text-red-600">{errors.month}</p>
                                        )}
                                    </div>
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
                                        Generate Payroll
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
