import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface Props extends PageProps {
    rentalId: number;
    rentalItem: {
        id: number;
        equipment: {
            id: number;
            name: string;
        };
        operator: {
            id: number;
            name: string;
        } | null;
        rate: number;
        rate_type: string;
        days: number;
        discount_percentage: number;
        total_amount: number;
        notes: string | null;
    };
}

export default function Show({ auth, rentalId, rentalItem }: Props) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Rental Item Details</h2>}
            <Head title="Rental Item Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Rental Item Details</CardTitle>
                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    asChild
                                    <a href={route('rentals.items.edit', { rental: rentalId, item: rentalItem.id })}>
                                        Edit
                                    </a>
                                </Button>
                                <Button
                                    variant="outline"
                                    asChild
                                    <a href={route('rentals.items.index', { rental: rentalId })}>
                                        Back to List
                                    </a>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Equipment</h3>
                                        <p className="mt-1 text-sm text-gray-900">{rentalItem.equipment.name}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Operator</h3>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {rentalItem.operator?.name ?? 'No operator assigned'}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Rate</h3>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {formatCurrency(rentalItem.rate)} / {rentalItem.rate_type}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Days</h3>
                                        <p className="mt-1 text-sm text-gray-900">{rentalItem.days}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Discount</h3>
                                        <p className="mt-1 text-sm text-gray-900">{rentalItem.discount_percentage}%</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
                                        <p className="mt-1 text-sm text-gray-900">{formatCurrency(rentalItem.total_amount)}</p>
                                    </div>
                                </div>
                            </div>

                            {rentalItem.notes && (
                                <div className="mt-6">
                                    <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                                    <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{rentalItem.notes}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
