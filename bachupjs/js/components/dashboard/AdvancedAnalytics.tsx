import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';
import { useState } from 'react';
import {
    Download,
    Filter,
    TrendingUp,
    DollarSign,
    Users,
    Wrench,
    Calendar,
    Clock
} from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface AdvancedAnalyticsProps {
    data: {
        revenue: {
            date: string;
            amount: number;
            growth: number;
        }[];
        equipment: {
            category: string;
            count: number;
            utilization: number;
        }[];
        customers: {
            date: string;
            new: number;
            active: number;
            churned: number;
        }[];
        maintenance: {
            date: string;
            scheduled: number;
            completed: number;
            pending: number;
        }[];
    };
    isLoading?: boolean;
}

export function AdvancedAnalytics({ data, isLoading = false }: AdvancedAnalyticsProps) {
    const [timeRange, setTimeRange] = useState('month');
    const [activeTab, setActiveTab] = useState('revenue');

    const handleExport = () => {
        // Implement export functionality
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-[400px] w-full" />
                <Skeleton className="h-[400px] w-full" />
                <Skeleton className="h-[400px] w-full" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Advanced Analytics</h2>
                <div className="flex items-center space-x-2">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select time range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="week">Last 7 Days</SelectItem>
                            <SelectItem value="month">Last 30 Days</SelectItem>
                            <SelectItem value="quarter">Last 90 Days</SelectItem>
                            <SelectItem value="year">Last 365 Days</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={handleExport}>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="revenue">
                        <DollarSign className="mr-2 h-4 w-4" />
                        Revenue
                    </TabsTrigger>
                    <TabsTrigger value="equipment">
                        <Wrench className="mr-2 h-4 w-4" />
                        Equipment
                    </TabsTrigger>
                    <TabsTrigger value="customers">
                        <Users className="mr-2 h-4 w-4" />
                        Customers
                    </TabsTrigger>
                    <TabsTrigger value="maintenance">
                        <Calendar className="mr-2 h-4 w-4" />
                        Maintenance
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="revenue" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue Trends</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data.revenue}>
                                        <defs>
                                            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis
                                            dataKey="date"
                                            className="text-sm"
                                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                        />
                                        <YAxis
                                            className="text-sm"
                                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--background))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '0.5rem',
                                            }}
                                            labelStyle={{
                                                color: 'hsl(var(--foreground))',
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="amount"
                                            stroke="#8884d8"
                                            fillOpacity={1}
                                            fill="url(#colorAmount)"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="growth"
                                            stroke="#82ca9d"
                                            fillOpacity={1}
                                            fill="url(#colorGrowth)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="equipment" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Equipment Categories</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[400px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={data.equipment}
                                                dataKey="count"
                                                nameKey="category"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={150}
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                {data.equipment.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={COLORS[index % COLORS.length]}
                                                        stroke="hsl(var(--background))"
                                                        strokeWidth={2}
                                                    />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'hsl(var(--background))',
                                                    border: '1px solid hsl(var(--border))',
                                                    borderRadius: '0.5rem',
                                                }}
                                                labelStyle={{
                                                    color: 'hsl(var(--foreground))',
                                                }}
                                            />
                                            <Legend
                                                verticalAlign="bottom"
                                                height={36}
                                                formatter={(value) => (
                                                    <span className="text-sm text-muted-foreground">{value}</span>
                                                )}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Equipment Utilization</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[400px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={data.equipment}>
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                            <XAxis
                                                dataKey="category"
                                                className="text-sm"
                                                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                            />
                                            <YAxis
                                                className="text-sm"
                                                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'hsl(var(--background))',
                                                    border: '1px solid hsl(var(--border))',
                                                    borderRadius: '0.5rem',
                                                }}
                                                labelStyle={{
                                                    color: 'hsl(var(--foreground))',
                                                }}
                                            />
                                            <Bar
                                                dataKey="utilization"
                                                fill="hsl(var(--primary))"
                                                radius={[4, 4, 0, 0]}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="customers" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Acquisition & Retention</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data.customers}>
                                        <defs>
                                            <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorChurned" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis
                                            dataKey="date"
                                            className="text-sm"
                                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                        />
                                        <YAxis
                                            className="text-sm"
                                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--background))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '0.5rem',
                                            }}
                                            labelStyle={{
                                                color: 'hsl(var(--foreground))',
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="new"
                                            stroke="#8884d8"
                                            fillOpacity={1}
                                            fill="url(#colorNew)"
                                            name="New Customers"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="active"
                                            stroke="#82ca9d"
                                            fillOpacity={1}
                                            fill="url(#colorActive)"
                                            name="Active Customers"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="churned"
                                            stroke="#ffc658"
                                            fillOpacity={1}
                                            fill="url(#colorChurned)"
                                            name="Lost Customers"
                                        />
                                        <Legend
                                            verticalAlign="bottom"
                                            height={36}
                                            formatter={(value) => (
                                                <span className="text-sm text-muted-foreground">{value}</span>
                                            )}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="maintenance" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Maintenance Activities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data.maintenance}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis
                                            dataKey="date"
                                            className="text-sm"
                                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                        />
                                        <YAxis
                                            className="text-sm"
                                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--background))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '0.5rem',
                                            }}
                                            labelStyle={{
                                                color: 'hsl(var(--foreground))',
                                            }}
                                        />
                                        <Legend
                                            verticalAlign="bottom"
                                            height={36}
                                            formatter={(value) => (
                                                <span className="text-sm text-muted-foreground">{value}</span>
                                            )}
                                        />
                                        <Bar dataKey="scheduled" stackId="a" fill="#8884d8" name="Scheduled" />
                                        <Bar dataKey="completed" stackId="a" fill="#82ca9d" name="Completed" />
                                        <Bar dataKey="pending" stackId="a" fill="#ffc658" name="Pending" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
