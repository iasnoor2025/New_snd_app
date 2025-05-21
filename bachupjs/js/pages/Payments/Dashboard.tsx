import React, { useState, lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps, BreadcrumbItem } from '@/types';
import AdminLayout from '@/layouts/AdminLayout';
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import PaymentStatusBadge from '@/components/shared/PaymentStatusBadge';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  List,
  BarChart3,
  Plus,
  ArrowRight,
  Clock
} from 'lucide-react';

// Lazy load the Chart component
const Chart = lazy(() => import('react-apexcharts'));

interface PaymentSummary {
  total_payments: number;
  total_amount: number;
  total_paid: number;
  total_pending: number;
  total_failed: number;
  payment_methods: {
    method: string;
    count: number;
    amount: number;
  }[];
  monthly_stats: {
    month: string;
    amount: number;
  }[];
  recent_payments: {
    id: number;
    payment_number: string;
    amount: number;
    payment_date: string;
    payment_method: string;
    customer: {
      id: number;
      company_name: string;
    };
    status: string;
  }[];
  overdue_payments: number;
  monthly_comparison: number;
  top_clients: {
    client_id: number;
    client_name: string;
    total_spent: number;
  }[];
  daily_trend: {
    date: string;
    amount: number;
  }[];
  current_period: string;
}

interface Props extends PageProps {
  payment_summary: PaymentSummary;
}

export default function Dashboard({ auth, payment_summary }: Props) {
  const [period, setPeriod] = useState<string>(payment_summary.current_period || 'month');

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Payments', href: '/payments' },
    { title: 'Dashboard', href: '/payments/dashboard' }
  ];

  const calculatePercentage = (value: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  return (
    <AdminLayout title="Payments Dashboard" breadcrumbs={breadcrumbs}>
      <Head title="Payments Dashboard" />

      <div className="flex h-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Payments Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href={route('payments.create')}>
                <Plus className="h-4 w-4 mr-2" />
                Record Payment
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue={period} onValueChange={setPeriod} className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
            <Button variant="outline" asChild>
              <Link href={route('payments.index')}>
                <List className="h-4 w-4 mr-2" />
                View All Payments
              </Link>
            </Button>
          </div>

          <TabsContent value="week" className="space-y-4">
            <PaymentMetricsDisplay summary={payment_summary} period="week" />
          </TabsContent>

          <TabsContent value="month" className="space-y-4">
            <PaymentMetricsDisplay summary={payment_summary} period="month" />
          </TabsContent>

          <TabsContent value="year" className="space-y-4">
            <PaymentMetricsDisplay summary={payment_summary} period="year" />
          </TabsContent>

          {/* Payment Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Trend</CardTitle>
              <CardDescription>
                Payment collection trend over time
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <PaymentTrendChart data={payment_summary.daily_trend} period={period} />
            </CardContent>
          </Card>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Recent Payments</CardTitle>
              <Button variant="ghost" size="sm" asChild className="gap-1">
                <Link href={route('payments.index')}>
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payment_summary.recent_payments.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    No recent payment data available
                  </div>
                ) : (
                  payment_summary.recent_payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between border-b last:border-0 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <Link href={route('payments.show', payment.id)} className="font-medium hover:underline">
                            {payment.payment_number}
                          </Link>
                          <div className="text-sm text-muted-foreground">
                            {payment.customer.company_name}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(payment.amount)}</div>
                        <div className="text-xs text-muted-foreground flex items-center justify-end gap-2">
                          {new Date(payment.payment_date).toLocaleDateString()}
                          <PaymentStatusBadge
                            status="paid"
                            size="sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Payment Methods</CardTitle>
                <CardDescription>Distribution by payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payment_summary.payment_methods.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      No payment method data available
                    </div>
                  ) : (
                    payment_summary.payment_methods.map((method) => (
                      <div key={method.method} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium capitalize">
                            {method.method.replace('_', ' ')}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {method.count} payments
                            </span>
                            <span className="text-sm font-medium">
                              {calculatePercentage(method.amount, payment_summary.total_amount)}%
                            </span>
                          </div>
                        </div>
                        <Progress
                          value={calculatePercentage(method.amount, payment_summary.total_amount)}
                          className="h-2"
                        />
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Top customers</CardTitle>
                <CardDescription>customers with highest payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {!payment_summary.top_clients || payment_summary.top_clients.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      No customer spending data available
                    </div>
                  ) : (
                    payment_summary.top_clients.map((customer) => (
                      <div key={customer.client_id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium truncate max-w-[150px]">
                            {customer.client_name}
                          </span>
                          <span className="text-sm font-medium">
                            {formatCurrency(customer.total_spent)}
                          </span>
                        </div>
                        <Progress
                          value={(customer.total_spent / (payment_summary.top_clients[0]?.total_spent || 1)) * 100}
                          className="h-2"
                        />
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

interface PaymentMetricsDisplayProps {
  summary: PaymentSummary;
  period: 'week' | 'month' | 'year';
}

function PaymentMetricsDisplay({ summary, period }: PaymentMetricsDisplayProps) {
  // Define a local calculatePercentage function
  const calculatePercentage = (value: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  const paidPercentage = calculatePercentage(summary.total_paid, summary.total_amount);
  const pendingPercentage = calculatePercentage(summary.total_pending, summary.total_amount);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(summary.total_amount)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {summary.total_payments} payments processed
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Amount Paid</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{formatCurrency(summary.total_paid)}</div>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Progress value={paidPercentage} className="h-1 w-full mr-2" />
            {paidPercentage}% of total
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{formatCurrency(summary.total_pending)}</div>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Progress value={pendingPercentage} className="h-1 w-full mr-2" />
            {pendingPercentage}% of total
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Trend</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {summary.monthly_comparison > 0 ? (
              <span className="text-green-600">+{summary.monthly_comparison}%</span>
            ) : (
              <span className="text-red-600">{summary.monthly_comparison}%</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Compared to previous {period}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

interface PaymentTrendChartProps {
  data: PaymentSummary['daily_trend'];
  period: string;
}

function PaymentTrendChart({ data, period }: PaymentTrendChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-40 text-muted-foreground">
        No payment trend data available
      </div>
    );
  }

  // Format dates based on period
  const formatDate = (date: string) => {
    const d = new Date(date);
    switch (period) {
      case 'week':
        return d.toLocaleDateString('en-US', { weekday: 'short' })
      case 'month':
        return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
      case 'year':
        return d.toLocaleDateString('en-US', { month: 'short' })
      default:
        return d.toLocaleDateString();
    }
  };

  // Prepare data for chart
  const chartData = {
    options: {
      chart: {
        id: 'payment-trend',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      grid: {
        borderColor: "#F3F4F6",
        padding: {
          left: 10,
          right: 10
        }
      },
      xaxis: {
        categories: data.map(item => formatDate(item.date)),
        labels: {
          style: {
            colors: '#6B7280'
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          formatter: function(value: number) {
            return formatCurrency(value).replace(/\.00$/, '');
          },
          style: {
            colors: '#6B7280'
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(value: number) {
            return formatCurrency(value);
          }
        }
      },
      colors: ['#10B981']
    },
    series: [
      {
        name: 'Payment Amount',
        data: data.map(item => item.amount)
      }
    ]
  };

  return (
    <div className="w-full h-80">
      <Suspense fallback={
        <div className="flex justify-center items-center h-40 text-muted-foreground">
          Loading chart...
        </div>
      }>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height="100%"
        />
      </Suspense>
    </div>
  );
}
