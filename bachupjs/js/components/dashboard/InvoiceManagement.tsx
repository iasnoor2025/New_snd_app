import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Eye, Send } from 'lucide-react';
import { formatDate } from '@/utils/format';

interface Props {
    invoices: {
        id: number;
        number: string;
        client: string;
        amount: number;
        issueDate: string;
        dueDate: string;
        status: string;
        type: string;
    }[];
}

export const InvoiceManagement: FC<Props> = ({ invoices }) => {
    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'paid':
                return <Badge variant="success">Paid</Badge>
            case 'pending':
                return <Badge variant="warning">Pending</Badge>
            case 'overdue':
                return <Badge variant="destructive">Overdue</Badge>
            case 'draft':
                return <Badge variant="secondary">Draft</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    };

    const getTypeBadge = (type: string) => {
        switch (type.toLowerCase()) {
            case 'income':
                return <Badge variant="success">Income</Badge>
            case 'expense':
                return <Badge variant="destructive">Expense</Badge>
            default:
                return <Badge variant="secondary">{type}</Badge>
        }
    };

    const handleView = (id: number) => {
        // Handle view logic
        console.log('Viewing invoice:', id);
    };

    const handleDownload = (id: number) => {
        // Handle download logic
        console.log('Downloading invoice:', id);
    };

    const handleSend = (id: number) => {
        // Handle send logic
        console.log('Sending invoice:', id);
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Invoices</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{invoices.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Paid</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {invoices.filter(i => i.status === 'paid').length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Pending</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {invoices.filter(i => i.status === 'pending').length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Overdue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {invoices.filter(i => i.status === 'overdue').length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Invoices</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice #</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Issue Date</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell>{invoice.number}</TableCell>
                                    <TableCell>{invoice.client}</TableCell>
                                    <TableCell>
                                        ${invoice.amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell>{formatDate(invoice.issueDate)}</TableCell>
                                    <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                                    <TableCell>{getTypeBadge(invoice.type)}</TableCell>
                                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleView(invoice.id)}
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDownload(invoice.id)}
                                                <Download className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleSend(invoice.id)}
                                                <Send className="h-4 w-4" />
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
    );
};
