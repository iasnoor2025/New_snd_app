import { FC, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface StockTrend {
    date: string;
    stock_level: number;
    demand: number;
    forecast: number;
}

interface SupplierMetric {
    supplier_name: string;
    delivery_score: number;
    quality_score: number;
    price_score: number;
    communication_score: number;
    overall_score: number;
}

interface CategoryPerformance {
    category: string;
    turnover_rate: number;
    stock_value: number;
    items_count: number;
}

interface AnalyticsData {
    stock_trends: StockTrend[];
    supplier_metrics: SupplierMetric[];
    category_performance: CategoryPerformance[];
}

export const InventoryAnalytics: FC = () => {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        fetchAnalyticsData();
    }, []);

    const fetchAnalyticsData = async () => {
        try {
            const response = await fetch('/api/inventory/analytics');
            const data = await response.json();
            setData(data);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to fetch analytics data',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading || !data) {
        return <AnalyticsSkeleton />
    }

    return (
        <div className="space-y-6">
            <Tabs defaultValue="trends" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="trends">Stock Trends</TabsTrigger>
                    <TabsTrigger value="suppliers">Supplier Performance</TabsTrigger>
                    <TabsTrigger value="categories">Category Analysis</TabsTrigger>
                </TabsList>

                <TabsContent value="trends">
                    <Card>
                        <CardHeader>
                            <CardTitle>Stock Level & Demand Trends</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data.stock_trends}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="stock_level"
                                            stroke="#8884d8"
                                            name="Stock Level"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="demand"
                                            stroke="#82ca9d"
                                            name="Actual Demand"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="forecast"
                                            stroke="#ffc658"
                                            name="Forecasted Demand"
                                            strokeDasharray="5 5"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="suppliers">
                    <Card>
                        <CardHeader>
                            <CardTitle>Supplier Performance Metrics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data.supplier_metrics}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="supplier_name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                            dataKey="delivery_score"
                                            fill="#8884d8"
                                            name="Delivery"
                                        />
                                        <Bar
                                            dataKey="quality_score"
                                            fill="#82ca9d"
                                            name="Quality"
                                        />
                                        <Bar
                                            dataKey="price_score"
                                            fill="#ffc658"
                                            name="Price"
                                        />
                                        <Bar
                                            dataKey="communication_score"
                                            fill="#ff7300"
                                            name="Communication"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="categories">
                    <Card>
                        <CardHeader>
                            <CardTitle>Category Performance Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data.category_performance}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="category" />
                                        <YAxis yAxisId="left" />
                                        <YAxis yAxisId="right" orientation="right" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                            yAxisId="left"
                                            dataKey="turnover_rate"
                                            fill="#8884d8"
                                            name="Turnover Rate"
                                        />
                                        <Bar
                                            yAxisId="right"
                                            dataKey="stock_value"
                                            fill="#82ca9d"
                                            name="Stock Value"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

const AnalyticsSkeleton: FC = () => {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-48" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[400px] w-full" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
