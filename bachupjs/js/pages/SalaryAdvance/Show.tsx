import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { format } from 'date-fns';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';

interface Props extends PageProps {
    advance: {
        id: number;
        employee: {
            id: number;
            first_name: string;
            last_name: string;
            salary: number;
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
        created_at: string;
        updated_at: string;
    };
}

export default function Show({ auth, advance }: Props) {
    const { post, processing } = useForm();

    const handleApprove = () => {
        post(route('salary-advances.approve', advance.id));
    };

    const handleReject = () => {
        post(route('salary-advances.reject', advance.id));
    };

    const getStatusColor = (status: Props['advance']['status']) => {
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Salary Advance Details</h2>}
            <Head title="Salary Advance Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <Link href={route('salary-advances.index')}>
                            <Button variant="outline">Back to List</Button>
                        </Link>
                        {advance.status === 'pending' && (
                            <div className="flex space-x-4">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="text-red-600">
                                            Reject
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Reject Salary Advance</DialogTitle>
                                            <DialogDescription>
                                                Are you sure you want to reject this salary advance request?
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button
                                                variant="outline"
                                                onClick={() => document.querySelector('dialog')?.close()}
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                onClick={handleReject}
                                                disabled={processing}
                                                Reject Request
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>Approve</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Approve Salary Advance</DialogTitle>
                                            <DialogDescription>
                                                Are you sure you want to approve this salary advance request?
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button
                                                variant="outline"
                                                onClick={() => document.querySelector('dialog')?.close()}
                                                Cancel
                                            </Button>
                                            <Button onClick={handleApprove} disabled={processing}>
                                                Approve Request
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        )}
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Advance Request Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Employee</h3>
                                    <p className="mt-1 text-lg">
                                        {advance.employee.first_name} {advance.employee.last_name}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                                    <p className="mt-1">
                                        <span
                                            className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                                                advance.status
                                            )}`}
                                            {advance.status.charAt(0).toUpperCase() + advance.status.slice(1)}
                                        </span>
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                                    <p className="mt-1 text-lg">${advance.amount.toFixed(2)}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Advance Date</h3>
                                    <p className="mt-1">
                                        {format(new Date(advance.advance_date), 'MMMM d, yyyy')}
                                    </p>
                                </div>

                                <div className="md:col-span-2">
                                    <h3 className="text-sm font-medium text-gray-500">Reason</h3>
                                    <p className="mt-1 whitespace-pre-wrap">{advance.reason}</p>
                                </div>

                                {advance.approved_by && (
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Approved By</h3>
                                            <p className="mt-1">{advance.approved_by.name}</p>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Approved At</h3>
                                            <p className="mt-1">
                                                {format(new Date(advance.approved_at!), 'MMMM d, yyyy h:mm a')}
                                            </p>
                                        </div>
                                    </>
                                )}

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                                    <p className="mt-1">
                                        {format(new Date(advance.created_at), 'MMMM d, yyyy h:mm a')}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                                    <p className="mt-1">
                                        {format(new Date(advance.updated_at), 'MMMM d, yyyy h:mm a')}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
