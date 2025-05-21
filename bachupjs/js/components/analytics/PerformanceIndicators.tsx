import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformanceData {
    equipment_uptime: number;
    maintenance_efficiency: number;
    rental_conversion_rate: number;
    customer_retention_rate: number;
    average_response_time: number;
    cost_per_rental: number;
    additional_metrics: {
        peak_hours: Record<string, number>
        popular_equipment: Record<string, number>
        maintenance_costs: Record<string, number>
    };
}

interface PerformanceIndicatorsProps {
    data?: PerformanceData;
    isLoading: boolean;
}

export function PerformanceIndicators({ data, isLoading }: PerformanceIndicatorsProps) {
    if (isLoading) {
        return <PerformanceIndicatorsSkeleton />
    }

    if (!data) {
        return null;
    }

    const peakHoursData = Object.entries(data.additional_metrics.peak_hours).map(([hour, count]) => ({
        hour: `${hour}:00`,
        count,
    }));

    const popularEquipmentData = Object.entries(data.additional_metrics.popular_equipment).map(([id, count]) => ({
        id,
        count,
    }));

    const maintenanceCostsData = Object.entries(data.additional_metrics.maintenance_costs).map(([id, cost]) => ({
        id,
        cost,
    }));

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Equipment Uptime</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.equipment_uptime.toFixed(1)}%</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Maintenance Efficiency</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.maintenance_efficiency.toFixed(1)}%</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rental Conversion</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.rental_conversion_rate.toFixed(1)}%</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Customer Retention</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.customer_retention_rate.toFixed(1)}%</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Peak Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={peakHoursData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="hour" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Popular Equipment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={popularEquipmentData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="id" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Response Time & Costs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="text-sm font-medium text-muted-foreground">Average Response Time</div>
                                <div className="text-2xl font-bold">{data.average_response_time} minutes</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-muted-foreground">Cost per Rental</div>
                                <div className="text-2xl font-bold">${data.cost_per_rental.toFixed(2)}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-muted-foreground">Efficiency Score</div>
                                <div className="text-2xl font-bold">
                                    {((data.equipment_uptime + data.maintenance_efficiency) / 2).toFixed(1)}%
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Maintenance Costs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={maintenanceCostsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="id" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value: number) => [`$${value.toLocaleString()}`, 'Cost']}
                                    />
                                    <Bar dataKey="cost" fill="#ffc658" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function PerformanceIndicatorsSkeleton() {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-[100px]" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-[120px]" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 2 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-4 w-[150px]" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-[300px] w-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 2 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-4 w-[150px]" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-[300px] w-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
