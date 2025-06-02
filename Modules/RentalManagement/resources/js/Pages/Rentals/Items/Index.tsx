import { FC } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/Modules/RentalManagement/Resources/js/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Modules/RentalManagement/Resources/js/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Modules/RentalManagement/Resources/js/Components/ui/table';
import { formatCurrency } from '@/Modules/RentalManagement/Resources/js/lib/utils';
import { RentalItem } from '@/Modules/RentalManagement/Resources/js/types/rental';
import { getTranslation } from '@/utils/translation';

interface Props {
    rental: {
        id: number;
        items: RentalItem[];
    };
}

export const Index: FC<Props> = ({ rental }) => {
    const { props } = usePage();
    const locale = props.locale || 'en';

    return (
        <>
            <Head title="Rental Items" />

            <div className="container mx-auto py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Rental Items</h1>
                    <div className="space-x-2">
                        <Link href={`/rentals/${rental.id}/items/bulk-create`}>
                            <Button variant="outline">Bulk Add Items</Button>
                        </Link>
                        <Link href={`/rentals/${rental.id}/items/create`}>
                            <Button>Add Item</Button>
                        </Link>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Items List</CardTitle>
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
                                {rental.items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{getTranslation(item.equipment.name, locale)}</TableCell>
                                        <TableCell>{item.operator?.name || 'N/A'}</TableCell>
                                        <TableCell>{formatCurrency(item.rate)}</TableCell>
                                        <TableCell>{item.days}</TableCell>
                                        <TableCell>{item.discount_percentage}%</TableCell>
                                        <TableCell>{formatCurrency(item.total_amount)}</TableCell>
                                        <TableCell>
                                            <div className="space-x-2">
                                                <Link href={`/rentals/${rental.id}/items/${item.id}/edit`}>
                                                    <Button variant="outline" size="sm">Edit</Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default Index;
