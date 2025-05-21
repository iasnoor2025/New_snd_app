import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RevenueAnalytics } from './RevenueAnalytics';
import { EquipmentUtilization } from './EquipmentUtilization';
import { CustomerMetrics } from './CustomerMetrics';
import { PerformanceIndicators } from './PerformanceIndicators';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { addDays } from 'date-fns';

interface AnalyticsData {
    revenue: {
        total_revenue: number;
        rental_revenue: number;
        maintenance_revenue: number;
        other_revenue: number;
        total_rentals: number;
        active_rentals: number;
        category_breakdown: Record<string, number>
    };
    utilization: {
        total_hours: number;
        active_hours: number;
        utilization_rate: number;
        rental_count: number;
        revenue_per_hour: number;
        usage_patterns: Record<string, number>
    };
    customer: {
        total_customers: number;
        active_customers: number;
        new_customers: number;
        returning_customers: number;
        average_rental_value: number;
        customer_satisfaction: number;
        demographic_data: {
            age_groups: Record<string, number>
            locations: Record<string, number>
        };
    };
    performance: {
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
    };
}

export function AnalyticsDashboard() {
    const [dateRange, setDateRange] = useState({
        from: addDays(new Date(), -30),
        to: new Date(),
    })
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/analytics?from=${dateRange.from.toISOString()}&to=${dateRange.to.toISOString()}`);
                if (response.ok) {
                    const data = await response.json();
                    setAnalyticsData(data);
                }
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnalytics();
    }, [dateRange]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
                <DateRangePicker
                    value={dateRange}
                    onValueChange={setDateRange}
                />
            </div>

            <Tabs defaultValue="revenue" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="utilization">Equipment Utilization</TabsTrigger>
                    <TabsTrigger value="customer">Customer Metrics</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>

                <TabsContent value="revenue">
                    <RevenueAnalytics
                        data={analyticsData?.revenue}
                        isLoading={isLoading}
                    />
                </TabsContent>

                <TabsContent value="utilization">
                    <EquipmentUtilization
                        data={analyticsData?.utilization}
                        isLoading={isLoading}
                    />
                </TabsContent>

                <TabsContent value="customer">
                    <CustomerMetrics
                        data={analyticsData?.customer}
                        isLoading={isLoading}
                    />
                </TabsContent>

                <TabsContent value="performance">
                    <PerformanceIndicators
                        data={analyticsData?.performance}
                        isLoading={isLoading}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
