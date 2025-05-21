import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Badge } from '@/Components/ui/badge';
import { format } from 'date-fns';

interface Rental {
    id: number;
    product: {
        name: string;
        image: string;
    };
    start_date: string;
    end_date: string;
    total_amount: number;
    status: 'pending' | 'active' | 'completed' | 'cancelled';
    created_at: string;
}

interface Props extends PageProps {
    rentals: Rental[];
}

export default function RentalHistory({ rentals }: Props) {
    const getStatusColor = (status: Rental['status']) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-500';
            case 'active':
                return 'bg-green-500';
            case 'completed':
                return 'bg-blue-500';
            case 'cancelled':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
            <Head title="Rental History" />
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-8">Rental History</h1>

                <Card>
                    <CardHeader>
                        <CardTitle>Your Rentals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Start Date</TableHead>
                                    <TableHead>End Date</TableHead>
                                    <TableHead>Total Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Rented On</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rentals.map((rental) => (
                                    <TableRow key={rental.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={rental.product.image}
                                                    alt={rental.product.name}
                                                    className="w-10 h-10 object-cover rounded"
                                                />
                                                {rental.product.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {format(new Date(rental.start_date), 'MMM d, yyyy')}
                                        </TableCell>
                                        <TableCell>
                                            {format(new Date(rental.end_date), 'MMM d, yyyy')}
                                        </TableCell>
                                        <TableCell>
                                            ${rental.total_amount.toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={getStatusColor(rental.status)}>
                                                {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {format(new Date(rental.created_at), 'MMM d, yyyy')}
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
}
