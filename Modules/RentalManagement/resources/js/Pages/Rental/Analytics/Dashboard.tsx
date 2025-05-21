import { FC } from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Modules/RentalManagement/Resources/js/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Modules/RentalManagement/Resources/js/Components/ui/select';
import { LineChart, BarChart, PieChart, MapChart } from '@/Modules/RentalManagement/Resources/js/Components/ui/charts';
import { formatCurrency, formatPercentage } from '@/Modules/RentalManagement/Resources/js/lib/utils';

interface Props {
    analytics: {
        revenue: {
            total: number;
            average: number;
            by_status: Record<string, number>;
            trends: Array<{ date: string; amount: number }>;
        };
        equipment: {
            total: number;
            active: number;
            utilization_rate: number;
            popular: Array<{ name: string; count: number }>;
        };
        customers: {
            total: number;
            active: number;
            retention_rate: number;
            top_customers: Array<{ name: string; revenue: number }>;
        };
        performance: {
            avg_rental_duration: number;
            on_time_delivery: number;
            customer_satisfaction: number;
            revenue_per_equipment: number;
        };
        gps_tracking: {
            active_tracking: {
                count: number;
                percentage: number;
            };
            location_history: {
                total_points: number;
                recent_movements: Array<{
                    equipment_id: number;
                    name: string;
                    from: { latitude: number; longitude: number };
                    to: { latitude: number; longitude: number };
                    timestamp: string;
                }>;
            };
            alerts: {
                movement_alerts: Array<{
                    equipment_id: number;
                    type: string;
                    message: string;
                    timestamp: string;
                }>;
                geofence_violations: Array<{
                    equipment_id: number;
                    geofence_id: number;
                    violation_type: string;
                    timestamp: string;
                }>;
                active_alerts: Array<{
                    equipment_id: number;
                    name: string;
                    type: string;
                    message: string;
                    timestamp: string;
                }>;
            };
            equipment_locations: Array<{
                equipment_id: number;
                name: string;
                latitude: number;
                longitude: number;
                last_update: string;
            }>;
        };
    };
    period: string;
}

export const Dashboard: FC<Props> = ({ analytics, period }) => {
    const handlePeriodChange = (value: string) => {
        window.location.href = route('rentals.analytics.index', { period: value });
    };

    return (
        <>
            <Head title="Rental Analytics" />

            <div className="container mx-auto py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Rental Analytics</h1>
                    <Select value={period} onValueChange={handlePeriodChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="week">Last Week</SelectItem>
                            <SelectItem value="month">Last Month</SelectItem>
                            <SelectItem value="quarter">Last Quarter</SelectItem>
                            <SelectItem value="year">Last Year</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Revenue</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(analytics.revenue.total)}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Equipment Utilization</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatPercentage(analytics.equipment.utilization_rate)}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Retention</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatPercentage(analytics.customers.retention_rate)}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Satisfaction</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatPercentage(analytics.performance.customer_satisfaction)}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Active GPS Tracking</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {analytics.gps_tracking.active_tracking.count}
                            </div>
                            <p className="text-sm text-gray-500">
                                {formatPercentage(analytics.gps_tracking.active_tracking.percentage)} of equipment
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Location History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {analytics.gps_tracking.location_history.total_points}
                            </div>
                            <p className="text-sm text-gray-500">tracking points recorded</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Active Alerts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {analytics.gps_tracking.alerts.active_alerts.length}
                            </div>
                            <p className="text-sm text-gray-500">current alerts</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Geofence Violations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {analytics.gps_tracking.alerts.geofence_violations.length}
                            </div>
                            <p className="text-sm text-gray-500">violations detected</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue Trends</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <LineChart
                                data={analytics.revenue.trends}
                                xKey="date"
                                yKey="amount"
                                height={300}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue by Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <PieChart
                                data={Object.entries(analytics.revenue.by_status).map(([key, value]) => ({
                                    name: key,
                                    value,
                                }))}
                                height={300}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Equipment Locations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <MapChart
                                data={analytics.gps_tracking.equipment_locations}
                                height={400}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Movements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <MapChart
                                data={analytics.gps_tracking.location_history.recent_movements}
                                height={400}
                                showPaths
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Alerts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {analytics.gps_tracking.alerts.active_alerts.map((alert) => (
                                    <div
                                        key={`${alert.equipment_id}-${alert.timestamp}`}
                                        className="p-4 bg-yellow-50 rounded-lg"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-medium text-yellow-800">
                                                    {alert.name} - {alert.type}
                                                </p>
                                                <p className="text-sm text-yellow-600">{alert.message}</p>
                                            </div>
                                            <span className="text-xs text-yellow-500">
                                                {new Date(alert.timestamp).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Geofence Violations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {analytics.gps_tracking.alerts.geofence_violations.map((violation) => (
                                    <div
                                        key={`${violation.equipment_id}-${violation.timestamp}`}
                                        className="p-4 bg-red-50 rounded-lg"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-medium text-red-800">
                                                    Equipment #{violation.equipment_id}
                                                </p>
                                                <p className="text-sm text-red-600">
                                                    {violation.violation_type}
                                                </p>
                                            </div>
                                            <span className="text-xs text-red-500">
                                                {new Date(violation.timestamp).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};
