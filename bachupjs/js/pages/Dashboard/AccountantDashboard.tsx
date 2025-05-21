import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FinancialReports } from '@/components/dashboard/FinancialReports';
import { PaymentStatus } from '@/components/dashboard/PaymentStatus';
import { InvoiceOverview } from '@/components/dashboard/InvoiceOverview';
import { RevenueAnalytics } from '@/components/dashboard/RevenueAnalytics';
import { usePermission } from '@/hooks/usePermission';

interface Props {
    financialReports: any[];
    payments: any[];
    invoices: any[];
    revenueData: any;
}

export const AccountantDashboard: FC<Props> = ({
    financialReports,
    payments,
    invoices,
    revenueData
}) => {
    const canViewReports = usePermission('reports.view');
    const canViewPayments = usePermission('payments.view');
    const canViewInvoices = usePermission('invoices.view');

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${revenueData.totalRevenue.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {payments.filter(p => p.status === 'pending').length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Unpaid Invoices</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {invoices.filter(i => i.status === 'unpaid').length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {revenueData.monthlyGrowth}%
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="reports" className="space-y-4">
                <TabsList>
                    {canViewReports && (
                        <TabsTrigger value="reports">Financial Reports</TabsTrigger>
                    )}
                    {canViewPayments && (
                        <TabsTrigger value="payments">Payment Status</TabsTrigger>
                    )}
                    {canViewInvoices && (
                        <TabsTrigger value="invoices">Invoice Overview</TabsTrigger>
                    )}
                    <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
                </TabsList>

                {canViewReports && (
                    <TabsContent value="reports" className="space-y-4">
                        <FinancialReports reports={financialReports} />
                    </TabsContent>
                )}

                {canViewPayments && (
                    <TabsContent value="payments" className="space-y-4">
                        <PaymentStatus payments={payments} />
                    </TabsContent>
                )}

                {canViewInvoices && (
                    <TabsContent value="invoices" className="space-y-4">
                        <InvoiceOverview invoices={invoices} />
                    </TabsContent>
                )}

                <TabsContent value="revenue" className="space-y-4">
                    <RevenueAnalytics data={revenueData} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AccountantDashboard;
