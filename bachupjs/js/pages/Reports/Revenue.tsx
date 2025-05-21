import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/format';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, TrendingUp, CreditCard, Users, FileText, Printer, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface RevenueByClient {
  company_name: string;
  total: number;
}

interface RevenueByMethod {
  payment_method: string;
  total: number;
}

interface MonthlyRevenue {
  month: string;
  total: number;
}

interface Props {
  monthlyRevenue: MonthlyRevenue[];
  revenueByClient: RevenueByClient[];
  revenueByMethod: RevenueByMethod[];
  totalRevenue: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658', '#8dd1e1'];

export default function Revenue({ monthlyRevenue, revenueByClient, revenueByMethod, totalRevenue }: Props) {
  // Format data for charts
  const formattedMonthlyRevenue = monthlyRevenue.map(item => ({
    ...item,
    month: item.month.substring(5), // Just show MM format
    formattedTotal: formatCurrency(item.total)
  }));

  return (
    <AdminLayout title="Revenue Report" breadcrumbs={[
      { title: 'Dashboard', href: '/dashboard' },
      { title: 'Reports', href: route('reports.index') },
      { title: 'Revenue Report', href: route('reports.revenue') }
    ]}>
      <Head title="Revenue Report" />
      
      <div className="container mx-auto p-8 space-y-6 bg-background">
        {/* Welcome Section */}
        <Card className="border-none shadow-none bg-gradient-to-r from-primary/10 via-primary/5 to-background">
          <CardContent className="flex justify-between items-center p-6">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <DollarSign className="h-8 w-8 mr-2 text-green-600" />
                Revenue Report
              </h1>
              <p className="text-muted-foreground mt-2">Detailed analysis of revenue and sales</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 flex-wrap">
          <Button asChild variant="default">
            <Link href={route('reports.revenue')}>
              <FileText className="h-4 w-4 mr-2" />
              Export PDF
            </Link>
          </Button>
          <Button asChild variant="default">
            <Link href={route('reports.revenue')}>
              <Printer className="h-4 w-4 mr-2" />
              Print Report
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={route('reports.index')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Reports
            </Link>
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white shadow hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <DollarSign className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle className="text-lg font-semibold">Total Revenue</CardTitle>
                <p className="text-3xl font-bold mt-2">{formatCurrency(totalRevenue)}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <TrendingUp className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle className="text-lg font-semibold">Monthly Average</CardTitle>
                <p className="text-3xl font-bold mt-2">
                  {formatCurrency(monthlyRevenue.length > 0 
                    ? totalRevenue / monthlyRevenue.length 
                    : 0)}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <CreditCard className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle className="text-lg font-semibold">Payment Methods</CardTitle>
                <p className="text-3xl font-bold mt-2">{revenueByMethod.length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <Users className="h-10 w-10 text-orange-600 mb-2" />
                <CardTitle className="text-lg font-semibold">Top customers</CardTitle>
                <p className="text-3xl font-bold mt-2">{revenueByClient.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white shadow">
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
              <CardDescription>Revenue trends over the past months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={formattedMonthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="total" fill="#8884d8" name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow">
            <CardHeader>
              <CardTitle>Revenue by Payment Method</CardTitle>
              <CardDescription>Distribution of revenue across payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueByMethod}
                      dataKey="total"
                      nameKey="payment_method"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label={({ payment_method, percent }) => 
                        `${payment_method}: ${(percent * 100).toFixed(0)}%`
                      }
                      {revenueByMethod.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white shadow">
            <CardHeader>
              <CardTitle>Top customers by Revenue</CardTitle>
              <CardDescription>customers generating the most revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>customer</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">% of Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenueByClient.map((customer, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{customer.company_name}</TableCell>
                      <TableCell className="text-right">{formatCurrency(customer.total)}</TableCell>
                      <TableCell className="text-right">
                        {((customer.total / totalRevenue) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-white shadow">
            <CardHeader>
              <CardTitle>Revenue by Payment Method</CardTitle>
              <CardDescription>Breakdown of revenue by payment type</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">% of Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenueByMethod.map((method, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{method.payment_method}</TableCell>
                      <TableCell className="text-right">{formatCurrency(method.total)}</TableCell>
                      <TableCell className="text-right">
                        {((method.total / totalRevenue) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
} 