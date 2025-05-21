import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Invoice, Payment, Rental } from '@/types/models';
import AdminLayout from '@/layouts/AdminLayout';
import { formatCurrency, formatDate } from '@/utils/format';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { 
    Users as UsersIcon, 
    Wrench as WrenchIcon, 
    Store as StoreIcon, 
    FileText as FileTextIcon, 
    DollarSign as DollarSignIcon, 
    BarChart as BarChartIcon,
    TrendingUp,
    Activity,
    Calendar,
    Clock
} from 'lucide-react';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface Props extends PageProps {
    stats: {
        customers: number;
        equipment: number;
        rentals: number;
        invoices: number;
        payments: number;
    };
    recentActivity: {
        rentals: Rental[];
        invoices: Invoice[];
        payments: Payment[];
    };
    charts: {
        monthlyRevenue: {
            month: string;
            total: number;
        }[];
    };
}

export default function Index({ auth, stats, recentActivity, charts }: Props) {
    // Helper function to get status badge
    const getStatusBadge = (status: string) => {
        if (!status) return <Badge variant="secondary">Unknown</Badge>
        
        switch (status.toLowerCase()) {
            case 'active':
                return <Badge variant="default">{status}</Badge>
            case 'pending':
                return <Badge variant="secondary">{status}</Badge>
            case 'completed':
                return <Badge variant="outline">{status}</Badge>
            case 'cancelled':
                return <Badge variant="destructive">{status}</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    };

    return (
        <AdminLayout title="Reports Dashboard" breadcrumbs={[
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Reports', href: route('reports.index') }
        ]}>
            <Head title="Reports Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-8 bg-background">
                {/* Welcome Section */}
                <Card className="border-none shadow-none bg-gradient-to-r from-primary/10 via-primary/5 to-background">
                    <CardContent className="flex justify-between items-center p-6">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">System Reports</h2>
                            <p className="text-muted-foreground mt-2">Detailed reports for all aspects of your business</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">{formatDate(new Date().toISOString(), 'dddd, DD MMMM YYYY')}</p>
                            <p className="text-sm font-medium">Saudi Arabia</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-4 flex-wrap">
                    <Button asChild variant="default">
                        <Link href={route('reports.revenue')}>
                            <FileText className="h-4 w-4 mr-2" />
                            Revenue Report
                        </Link>
                    </Button>
                    <Button asChild variant="default">
                        <Link href={route('reports.revenue')}>
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Revenue Analysis
                        </Link>
                    </Button>
                    <Button asChild variant="default">
                        <Link href={route('dashboard')}>
                            <Activity className="h-4 w-4 mr-2" />
                            Activity Dashboard
                        </Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href={route('dashboard')}>
                            <Calendar className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <Link href={route('customers.index')} className="transition-transform hover:scale-105">
                        <Card className="border-l-4 border-blue-500 hover:shadow-lg transition-all">
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center">
                                    <UsersIcon className="h-8 w-8 text-blue-500 mb-2" />
                                    <CardTitle className="text-lg font-semibold">customers</CardTitle>
                                    <p className="text-3xl font-bold mt-2">{stats.customers}</p>
                                    <div className="mt-4">
                                        <span className="text-primary hover:text-primary/90">View customers</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    
                    <Link href={route('equipment.index')} className="transition-transform hover:scale-105">
                        <Card className="border-l-4 border-green-500 hover:shadow-lg transition-all">
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center">
                                    <WrenchIcon className="h-8 w-8 text-green-500 mb-2" />
                                    <CardTitle className="text-lg font-semibold">Equipment</CardTitle>
                                    <p className="text-3xl font-bold mt-2">{stats.equipment}</p>
                                    <div className="mt-4">
                                        <span className="text-primary hover:text-primary/90">View Equipment</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    
                    <Link href={route('rentals.index')} className="transition-transform hover:scale-105">
                        <Card className="border-l-4 border-yellow-500 hover:shadow-lg transition-all">
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center">
                                    <StoreIcon className="h-8 w-8 text-yellow-500 mb-2" />
                                    <CardTitle className="text-lg font-semibold">Rentals</CardTitle>
                                    <p className="text-3xl font-bold mt-2">{stats.rentals}</p>
                                    <div className="mt-4">
                                        <span className="text-primary hover:text-primary/90">View Rentals</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    
                    <Link href={route('invoices.index')} className="transition-transform hover:scale-105">
                        <Card className="border-l-4 border-red-500 hover:shadow-lg transition-all">
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center">
                                    <FileTextIcon className="h-8 w-8 text-red-500 mb-2" />
                                    <CardTitle className="text-lg font-semibold">Invoices</CardTitle>
                                    <p className="text-3xl font-bold mt-2">{stats.invoices}</p>
                                    <div className="mt-4">
                                        <span className="text-primary hover:text-primary/90">View Invoices</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    
                    <Link href={route('payments.index')} className="transition-transform hover:scale-105">
                        <Card className="border-l-4 border-purple-500 hover:shadow-lg transition-all">
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center">
                                    <DollarSignIcon className="h-8 w-8 text-purple-500 mb-2" />
                                    <CardTitle className="text-lg font-semibold">Payments</CardTitle>
                                    <p className="text-3xl font-bold mt-2">{stats.payments}</p>
                                    <div className="mt-4">
                                        <span className="text-primary hover:text-primary/90">View Payments</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    
                    <Link href={route('reports.revenue')} className="transition-transform hover:scale-105">
                        <Card className="border-l-4 border-orange-500 hover:shadow-lg transition-all">
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center">
                                    <BarChartIcon className="h-8 w-8 text-orange-500 mb-2" />
                                    <CardTitle className="text-lg font-semibold">Revenue</CardTitle>
                                    <p className="text-3xl font-bold mt-2">{formatCurrency(charts.monthlyRevenue.reduce((sum, item) => sum + item.total, 0))}</p>
                                    <div className="mt-4">
                                        <span className="text-primary hover:text-primary/90">View Report</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                <Card className="hover:shadow-lg transition-all">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
                        <CardDescription>View recent rentals, invoices, and payments</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ErrorBoundary>
                            <Tabs defaultValue="rentals">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="rentals">Rentals</TabsTrigger>
                                    <TabsTrigger value="invoices">Invoices</TabsTrigger>
                                    <TabsTrigger value="payments">Payments</TabsTrigger>
                                </TabsList>
                                
                                <TabsContent value="rentals">
                                    <div className="rounded-md border mt-4">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Rental #</TableHead>
                                                    <TableHead>customer</TableHead>
                                                    <TableHead>Start Date</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Amount</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {recentActivity.rentals.map((rental) => (
                                                    <TableRow key={rental.id}>
                                                        <TableCell className="font-medium">
                                                            <Link href={route('rentals.show', rental.id)} className="text-primary hover:underline">
                                                                {rental.rental_number}
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell>{rental.customer?.company_name}</TableCell>
                                                        <TableCell>{formatDate(rental.start_date)}</TableCell>
                                                        <TableCell>{getStatusBadge(rental.status)}</TableCell>
                                                        <TableCell>{formatCurrency(rental.total_amount)}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </TabsContent>
                                
                                <TabsContent value="invoices">
                                    <div className="rounded-md border mt-4">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Invoice #</TableHead>
                                                    <TableHead>customer</TableHead>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Amount</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {recentActivity.invoices.map((invoice) => (
                                                    <TableRow key={invoice.id}>
                                                        <TableCell className="font-medium">
                                                            <Link href={route('invoices.show', invoice.id)} className="text-primary hover:underline">
                                                                {invoice.invoice_number}
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell>{invoice.customer?.company_name}</TableCell>
                                                        <TableCell>{formatDate(invoice.issue_date)}</TableCell>
                                                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                                                        <TableCell>{formatCurrency(invoice.total_amount)}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </TabsContent>
                                
                                <TabsContent value="payments">
                                    <div className="rounded-md border mt-4">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Payment #</TableHead>
                                                    <TableHead>customer</TableHead>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead>Method</TableHead>
                                                    <TableHead>Amount</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {recentActivity.payments.map((payment) => (
                                                    <TableRow key={payment.id}>
                                                        <TableCell className="font-medium">
                                                            <Link href={route('payments.show', payment.id)} className="text-primary hover:underline">
                                                                {payment.payment_number}
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell>{payment.customer?.company_name}</TableCell>
                                                        <TableCell>{formatDate(payment.payment_date)}</TableCell>
                                                        <TableCell>{payment.payment_method}</TableCell>
                                                        <TableCell>{formatCurrency(payment.amount)}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </ErrorBoundary>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
} 