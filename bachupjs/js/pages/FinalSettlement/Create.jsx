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
        settlement_date: new Date().toISOString().split('T')[0],
        notes: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('final-settlements.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Final Settlement</h2>}
            <Head title="Create Final Settlement" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>New Final Settlement</CardTitle>
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
                                    <Label htmlFor="settlement_date">Settlement Date</Label>
                                    <Input
                                        id="settlement_date"
                                        type="date"
                                        value={data.settlement_date}
                                        onChange={e => setData('settlement_date', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    {errors.settlement_date && (
                                        <p className="mt-1 text-sm text-red-600">{errors.settlement_date}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="notes">Notes</Label>
                                    <Textarea
                                        id="notes"
                                        value={data.notes}
                                        onChange={e => setData('notes', e.target.value)}
                                        className="mt-1 block w-full"
                                        placeholder="Enter any additional notes"
                                        rows={4}
                                    />
                                    {errors.notes && (
                                        <p className="mt-1 text-sm text-red-600">{errors.notes}</p>
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
                                        Create Settlement
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
