import { FC, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Button } from '@/Components/ui/button';
import { PlusIcon, PackageIcon, TruckIcon, ChartBarIcon } from 'lucide-react';
import { useToast } from '@/Hooks/use-toast';
import { InventoryItems } from './InventoryItems';
import { PurchaseOrders } from './PurchaseOrders';
import { StockMovements } from './StockMovements';
import { InventoryAnalytics } from './InventoryAnalytics';

interface InventoryStats {
    total_items: number;
    low_stock_items: number;
    out_of_stock_items: number;
    total_value: number;
    pending_orders: number;
    recent_movements: number;
}

export const InventoryDashboard: FC = () => {
    const [stats, setStats] = useState<InventoryStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        fetchInventoryStats();
    }, []);

    const fetchInventoryStats = async () => {
        try {
            const response = await fetch('/api/inventory/stats');
            const data = await response.json();
            setStats(data);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to fetch inventory statistics',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <InventoryDashboardSkeleton />
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Inventory Management</h1>
                <div className="flex gap-2">
                    <Button>
                        <PlusIcon className="w-4 h-4 mr-2" />
                        New Item
                    </Button>
                    <Button variant="outline">
                        <TruckIcon className="w-4 h-4 mr-2" />
                        New Order
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                        <PackageIcon className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.total_items}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats?.low_stock_items} items low in stock
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                        <ChartBarIcon className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${stats?.total_value.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {stats?.out_of_stock_items} items out of stock
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                        <TruckIcon className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.pending_orders}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats?.recent_movements} recent stock movements
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Stock Health</CardTitle>
                        <ChartBarIcon className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {Math.round(
                                ((stats?.total_items || 0) - (stats?.low_stock_items || 0)) /
                                    (stats?.total_items || 1) * 100
                            )}%
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Items in good stock level
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="items" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="items">Inventory Items</TabsTrigger>
                    <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
                    <TabsTrigger value="movements">Stock Movements</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="items" className="space-y-4">
                    <InventoryItems />
                </TabsContent>

                <TabsContent value="orders" className="space-y-4">
                    <PurchaseOrders />
                </TabsContent>

                <TabsContent value="movements" className="space-y-4">
                    <StockMovements />
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                    <InventoryAnalytics />
                </TabsContent>
            </Tabs>
        </div>
    );
};

const InventoryDashboardSkeleton: FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="h-8 w-48 bg-muted animate-pulse rounded" />
                <div className="flex gap-2">
                    <div className="h-10 w-32 bg-muted animate-pulse rounded" />
                    <div className="h-10 w-32 bg-muted animate-pulse rounded" />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                            <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                        </CardHeader>
                        <CardContent>
                            <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
                            <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="space-y-4">
                <div className="h-10 w-full bg-muted animate-pulse rounded" />
                <div className="h-[400px] w-full bg-muted animate-pulse rounded" />
            </div>
        </div>
    );
};

</div>
</div>
</div>
</div>
</div>
</div>
</div>

