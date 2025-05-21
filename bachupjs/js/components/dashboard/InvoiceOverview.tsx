import { FC } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface Invoice {
    id: string;
    number: string;
    amount: number;
    status: 'paid' | 'unpaid' | 'overdue';
    dueDate: string;
    clientName: string;
}

interface Props {
    invoices: Invoice[];
}

export const InvoiceOverview: FC<Props> = ({ invoices }) => {
    const getStatusColor = (status: Invoice['status']) => {
        switch (status) {
            case 'paid':
                return 'bg-green-500';
            case 'unpaid':
                return 'bg-yellow-500';
            case 'overdue':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
    const unpaidAmount = invoices;
        .filter(invoice => invoice.status !== 'paid');
        .reduce((sum, invoice) => sum + invoice.amount, 0);

    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Invoiced</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Outstanding Amount</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(unpaidAmount)}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Invoice #</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.id}>
                                <TableCell>{invoice.number}</TableCell>
                                <TableCell>{invoice.clientName}</TableCell>
                                <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                                <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                                <TableCell>
                                    <Badge className={getStatusColor(invoice.status)}>
                                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};


