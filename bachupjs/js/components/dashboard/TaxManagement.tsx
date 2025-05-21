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
import { Download, FileText } from 'lucide-react';
import { formatDate } from '@/utils/format';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface Props {
    taxData: {
        totalTax: number;
        paidTax: number;
        pendingTax: number;
        upcomingPayments: {
            id: number;
            type: string;
            amount: number;
            dueDate: string;
            status: string;
        }[];
        taxHistory: {
            month: string;
            amount: number;
        }[];
        taxReturns: {
            id: number;
            year: string;
            type: string;
            amount: number;
            status: string;
            filingDate: string;
        }[];
    };
}

export const TaxManagement: FC<Props> = ({ taxData }) => {
    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'paid':
                return <Badge variant="success">Paid</Badge>
            case 'pending':
                return <Badge variant="warning">Pending</Badge>
            case 'overdue':
                return <Badge variant="destructive">Overdue</Badge>
            case 'filed':
                return <Badge variant="success">Filed</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    };

    const getTypeBadge = (type: string) => {
        switch (type.toLowerCase()) {
            case 'income':
                return <Badge variant="success">Income Tax</Badge>
            case 'sales':
                return <Badge variant="warning">Sales Tax</Badge>
            case 'property':
                return <Badge variant="info">Property Tax</Badge>
            default:
                return <Badge variant="secondary">{type}</Badge>
        }
    };

    const handleDownload = (id: number) => {
        // Handle download logic
        console.log('Downloading tax return:', id);
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Tax</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${taxData.totalTax.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Paid Tax</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${taxData.paidTax.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Pending Tax</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${taxData.pendingTax.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Tax History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={taxData.taxHistory}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#8884d8"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Tax Payments</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {taxData.upcomingPayments.map((payment) => (
                                <TableRow key={payment.id}>
                                    <TableCell>{getTypeBadge(payment.type)}</TableCell>
                                    <TableCell>
                                        ${payment.amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell>{formatDate(payment.dueDate)}</TableCell>
                                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Tax Returns</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Year</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Filing Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {taxData.taxReturns.map((taxReturn) => (
                                <TableRow key={taxReturn.id}>
                                    <TableCell>{taxReturn.year}</TableCell>
                                    <TableCell>{getTypeBadge(taxReturn.type)}</TableCell>
                                    <TableCell>
                                        ${taxReturn.amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell>{formatDate(taxReturn.filingDate)}</TableCell>
                                    <TableCell>{getStatusBadge(taxReturn.status)}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDownload(taxReturn.id)}
                                            <Download className="h-4 w-4" />
                                        </Button>
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
