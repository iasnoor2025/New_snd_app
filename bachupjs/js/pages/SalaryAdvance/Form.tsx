import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { format } from 'date-fns';

interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    salary: number;
}

interface Props extends PageProps {
    employees: Employee[];
    advance?: {
        id: number;
        employee_id: number;
        amount: number;
        advance_date: string;
        reason: string;
        status: 'pending' | 'approved' | 'deducted';
    };
}

export default function Form({ auth, employees, advance }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        employee_id: advance?.employee_id || '',
        amount: advance?.amount || '',
        advance_date: advance?.advance_date || format(new Date(), 'yyyy-MM-dd'),
        reason: advance?.reason || '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (advance) {
            put(route('salary-advances.update', advance.id));
        } else {
            post(route('salary-advances.store'));
        }
    };

    const selectedEmployee = employees.find((emp) => emp.id === Number(data.employee_id));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {advance ? 'Edit Salary Advance' : 'Create Salary Advance'}
                </h2>
            }
            <Head title={advance ? 'Edit Salary Advance' : 'Create Salary Advance'} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {advance ? 'Edit Salary Advance Request' : 'New Salary Advance Request'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Employee
                                        </label>
                                        <Select
                                            value={data.employee_id.toString()}
                                            onValueChange={(value) => setData('employee_id', value)}
                                            disabled={!!advance}
                                            <option value="">Select Employee</option>
                                            {employees.map((employee) => (
                                                <option key={employee.id} value={employee.id}>
                                                    {employee.first_name} {employee.last_name}
                                                </option>
                                            ))}
                                        </Select>
                                        {errors.employee_id && (
                                            <p className="mt-1 text-sm text-red-600">{errors.employee_id}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Advance Date
                                        </label>
                                        <Input
                                            type="date"
                                            value={data.advance_date}
                                            onChange={(e) => setData('advance_date', e.target.value)}
                                        />
                                        {errors.advance_date && (
                                            <p className="mt-1 text-sm text-red-600">{errors.advance_date}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Amount
                                        </label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            value={data.amount}
                                            onChange={(e) => setData('amount', e.target.value)}
                                            placeholder="Enter amount"
                                        />
                                        {errors.amount && (
                                            <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                                        )}
                                        {selectedEmployee && (
                                            <p className="mt-1 text-sm text-gray-500">
                                                Monthly Salary: ${selectedEmployee.salary.toFixed(2)}
                                            </p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Reason
                                        </label>
                                        <Textarea
                                            value={data.reason}
                                            onChange={(e) => setData('reason', e.target.value)}
                                            placeholder="Enter reason for advance"
                                            rows={4}
                                        />
                                        {errors.reason && (
                                            <p className="mt-1 text-sm text-red-600">{errors.reason}</p>
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
                                    <Button type="submit" disabled={processing}>
                                        {advance ? 'Update' : 'Create'} Request
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
