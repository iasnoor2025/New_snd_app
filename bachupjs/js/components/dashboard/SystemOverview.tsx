import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Skeleton } from '../ui/skeleton';
import { formatUptime, getSystemStatusColor, getSystemStatusIcon } from '@/utils/dashboard';
import { Activity, Cpu, HardDrive, Database } from 'lucide-react';

interface SystemData {
    status: string;
    uptime: number;
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
    activeUsers: number;
    totalUsers: number;
    activeRoles: number;
    totalRoles: number;
    recentActivity: {
        timestamp: string;
        users: number;
        roles: number;
        systemLoad: number;
    }[];
}

interface SystemMetrics {
    cpu: number;
    memory: number;
    storage: number;
    network: number;
}

interface SystemOverviewProps {
    data?: SystemData;
    isLoading?: boolean;
}

const SystemOverview: React.FC<SystemOverviewProps> = ({ data, isLoading = false }) => {
    // Default metrics if data is not available
    const metrics = data || {
        cpuUsage: 0,
        memoryUsage: 0,
        diskUsage: 0,
        activeUsers: 0,
        totalUsers: 0,
        activeRoles: 0,
        totalRoles: 0,
        recentActivity: [],
    };

    const statusColor = getSystemStatusColor(data?.status || '');
    const statusIcon = getSystemStatusIcon(data?.status || '');

    // Get color based on usage percentage
    const getColorClass = (value: number): string => {
        if (value >= 90) return 'bg-destructive';
        if (value >= 70) return 'bg-warning';
        return 'bg-primary';
    };

    // Render loading skeleton
    if (isLoading && !data) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>
                        <Skeleton className="h-6 w-48" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-2 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-2 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-2 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-2 w-full" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2">
                        <div className={`h-2 w-2 rounded-full ${statusColor}`} />
                        <span className="text-sm font-medium">{data?.status || 'Loading...'}</span>
                    </div>
                    <div className="mt-4">
                        <div className="text-sm text-muted-foreground">Uptime</div>
                        <div className="text-lg font-medium">{formatUptime(data?.uptime || 0)}</div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Resource Usage</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Cpu className="h-4 w-4" />
                                    <span className="text-sm">CPU</span>
                                </div>
                                <span className="text-sm font-medium">{metrics.cpuUsage}%</span>
                            </div>
                            <Progress value={metrics.cpuUsage} className={getColorClass(metrics.cpuUsage)} />
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Database className="h-4 w-4" />
                                    <span className="text-sm">Memory</span>
                                </div>
                                <span className="text-sm font-medium">{metrics.memoryUsage}%</span>
                            </div>
                            <Progress value={metrics.memoryUsage} className={getColorClass(metrics.memoryUsage)} />
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <HardDrive className="h-4 w-4" />
                                    <span className="text-sm">Disk</span>
                                </div>
                                <span className="text-sm font-medium">{metrics.diskUsage}%</span>
                            </div>
                            <Progress value={metrics.diskUsage} className={getColorClass(metrics.diskUsage)} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>User Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Activity className="h-4 w-4" />
                                    <span className="text-sm">Active Users</span>
                                </div>
                                <span className="text-sm font-medium">{metrics.activeUsers}/{metrics.totalUsers}</span>
                            </div>
                            <Progress value={(metrics.activeUsers / metrics.totalUsers) * 100} className={getColorClass((metrics.activeUsers / metrics.totalUsers) * 100)} />
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Activity className="h-4 w-4" />
                                    <span className="text-sm">Active Roles</span>
                                </div>
                                <span className="text-sm font-medium">{metrics.activeRoles}/{metrics.totalRoles}</span>
                            </div>
                            <Progress value={(metrics.activeRoles / metrics.totalRoles) * 100} className={getColorClass((metrics.activeRoles / metrics.totalRoles) * 100)} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SystemOverview;


