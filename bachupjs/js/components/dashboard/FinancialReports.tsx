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

interface Props {
    reports: {
        id: number;
        name: string;
        type: string;
        date: string;
        status: string;
        amount: number;
        description: string;
    }[];
}

export const FinancialReports: FC<Props> = ({ reports }) => {
    const getTypeBadge = (type: string) => {
        switch (type.toLowerCase()) {
            case 'income':
                return <Badge variant="success">Income</Badge>
            case 'expense':
                return <Badge variant="destructive">Expense</Badge>
            case 'tax':
                return <Badge variant="warning">Tax</Badge>
            default:
                return <Badge variant="secondary">{type}</Badge>
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return <Badge variant="success">Completed</Badge>
            case 'pending':
                return <Badge variant="warning">Pending</Badge>
            case 'failed':
                return <Badge variant="destructive">Failed</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    };

    const handleDownload = (id: number) => {
        // Handle download logic
        console.log('Downloading report:', id);
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{reports.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Income</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${reports
                                .filter(r => r.type === 'income')
                                .reduce((acc, r) => acc + r.amount, 0)
                                .toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Expenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${reports
                                .filter(r => r.type === 'expense')
                                .reduce((acc, r) => acc + r.amount, 0)
                                .toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Financial Reports</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Report</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reports.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <FileText className="h-4 w-4" />
                                            <span>{report.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{getTypeBadge(report.type)}</TableCell>
                                    <TableCell>{formatDate(report.date)}</TableCell>
                                    <TableCell>
                                        ${report.amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDownload(report.id)}
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
