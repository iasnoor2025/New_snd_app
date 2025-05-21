import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Employee {
    id: number;
    employee_id: string;
    first_name: string;
    last_name: string;
}

interface Props {
    employee: Employee;
}

export default function Create({ employee }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        last_working_day: '',
        reason: '',
        notes: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        post(route('resignations.store', employee.id));
    };

    return (
        <AdminLayout>
            <Head title="Submit Resignation" />

            <div className="container mx-auto py-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" asChild>
                            <Link href={route('employees.show', employee.id)}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Employee
                            </Link>
                        </Button>
                        <h1 className="text-2xl font-bold">Submit Resignation</h1>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Resignation Details</CardTitle>
                        <CardDescription>
                            Submit resignation request for {employee.first_name} {employee.last_name} ({employee.employee_id})
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="last_working_day">Last Working Day</Label>
                                <Input
                                    id="last_working_day"
                                    type="date"
                                    value={data.last_working_day}
                                    onChange={e => setData('last_working_day', e.target.value)}
                                    required
                                />
                                {errors.last_working_day && (
                                    <p className="text-sm text-red-500">{errors.last_working_day}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="reason">Reason for Resignation</Label>
                                <Textarea
                                    id="reason"
                                    value={data.reason}
                                    onChange={e => setData('reason', e.target.value)}
                                    placeholder="Please provide a detailed reason for your resignation..."
                                    required
                                    className="min-h-[100px]"
                                />
                                {errors.reason && (
                                    <p className="text-sm text-red-500">{errors.reason}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                                <Textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={e => setData('notes', e.target.value)}
                                    placeholder="Any additional information you'd like to provide..."
                                    className="min-h-[100px]"
                                />
                                {errors.notes && (
                                    <p className="text-sm text-red-500">{errors.notes}</p>
                                )}
                            </div>

                            <div className="flex justify-end gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    asChild
                                    <Link href={route('employees.show', employee.id)}>
                                        Cancel
                                    </Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    Submit Resignation
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
