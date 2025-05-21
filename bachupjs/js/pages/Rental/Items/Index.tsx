import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';

interface RentalItem {
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
}

interface Props extends PageProps {
    rentalId: number;
    rentalItems: RentalItem[];
}

export default function Index({ auth, rentalId, rentalItems }: Props) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Rental Items</h2>}
            <Head title="Rental Items" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Rental Items</CardTitle>
                            <div className="space-x-4">
                                <Button
                                    variant="outline"
                                    onClick={() => window.location.href = route('rentals.items.bulk-create', { rental: rentalId })}
                                    Bulk Add Items
                                </Button>
                                <Button
                                    onClick={() => window.location.href = route('rentals.items.create', { rental: rentalId })}
                                    Add Item
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Equipment</TableHead>
                                        <TableHead>Operator</TableHead>
                                        <TableHead>Rate</TableHead>
                                        <TableHead>Days</TableHead>
                                        <TableHead>Discount</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rentalItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.equipment.name}</TableCell>
                                            <TableCell>{item.operator?.name ?? '-'}</TableCell>
                                            <TableCell>
                                                {formatCurrency(item.rate)} / {item.rate_type}
                                            </TableCell>
                                            <TableCell>{item.days}</TableCell>
                                            <TableCell>{item.discount_percentage}%</TableCell>
                                            <TableCell>{formatCurrency(item.total_amount)}</TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                        <a href={route('rentals.items.show', { rental: rentalId, item: item.id })}>
                                                            View
                                                        </a>
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                        <a href={route('rentals.items.edit', { rental: rentalId, item: item.id })}>
                                                            Edit
                                                        </a>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
