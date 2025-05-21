import { useEffect, useState } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDistanceToNow, format } from 'date-fns';

interface MaintenanceRecord {
    id: number;
    equipment_id: number;
    maintenance_type: string;
    status: string;
    scheduled_at: string;
    created_at: string;
}

interface MaintenanceAlert {
    id: number;
    equipment_id: number;
    alert_type: string;
    severity: string;
    message: string;
    due_date: string;
    status: string;
    created_at: string;
}

interface MaintenanceDashboardProps {
    equipmentId: number;
}

export function MaintenanceDashboard({ equipmentId }: MaintenanceDashboardProps) {
    const { toast } = useToast();
    const [records, setRecords] = useState<MaintenanceRecord[]>([]);
    const [alerts, setAlerts] = useState<MaintenanceAlert[]>([]);

    // Subscribe to maintenance records
    const { isConnected: isRecordConnected } = useWebSocket({
        channel: `equipment.${equipmentId}`,
        event: 'App\\Events\\MaintenanceRecordCreated',
        onMessage: (data) => {
            setRecords(prev => [data, ...prev].slice(0, 10));
            toast({
                title: "New Maintenance Record",
                description: `${data.maintenance_type} maintenance scheduled for ${formatDistanceToNow(new Date(data.scheduled_at))}`,
                variant: "default",
            })
        },
    })

    // Subscribe to maintenance alerts
    const { isConnected: isAlertConnected } = useWebSocket({
        channel: `equipment.${equipmentId}`,
        event: 'App\\Events\\MaintenanceAlertCreated',
        onMessage: (data) => {
            setAlerts(prev => [data, ...prev].slice(0, 10));
            toast({
                title: "Maintenance Alert",
                description: data.message,
                variant: data.severity === 'high' ? 'destructive' : 'default',
            })
        },
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'scheduled':
                return 'bg-blue-500';
            case 'in_progress':
                return 'bg-yellow-500';
            case 'completed':
                return 'bg-green-500';
            case 'cancelled':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'low':
                return 'bg-blue-500';
            case 'medium':
                return 'bg-yellow-500';
            case 'high':
                return 'bg-red-500';
            case 'critical':
                return 'bg-purple-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Maintenance Dashboard</span>
                        <div className="flex items-center space-x-2">
                            <Badge variant={isRecordConnected && isAlertConnected ? "success" : "destructive"}>
                                {isRecordConnected && isAlertConnected ? "Connected" : "Disconnected"}
                            </Badge>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="records">
                        <TabsList>
                            <TabsTrigger value="records">Maintenance Records</TabsTrigger>
                            <TabsTrigger value="alerts">Alerts</TabsTrigger>
                        </TabsList>

                        <TabsContent value="records">
                            <div className="space-y-2">
                                {records.map((record) => (
                                    <div
                                        key={record.id}
                                        className="flex items-start justify-between p-3 rounded-lg border"
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <Badge className={getStatusColor(record.status)}>
                                                    {record.status}
                                                </Badge>
                                                <span className="font-medium">
                                                    {record.maintenance_type}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Scheduled for {formatDistanceToNow(new Date(record.scheduled_at))}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Created {formatDistanceToNow(new Date(record.created_at))} ago
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="alerts">
                            <div className="space-y-2">
                                {alerts.map((alert) => (
                                    <div
                                        key={alert.id}
                                        className="flex items-start justify-between p-3 rounded-lg border"
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <Badge className={getSeverityColor(alert.severity)}>
                                                    {alert.severity}
                                                </Badge>
                                                <span className="font-medium">
                                                    {alert.alert_type}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {alert.message}
                                            </p>
                                            {alert.due_date && (
                                                <p className="text-sm text-muted-foreground">
                                                    Due {formatDistanceToNow(new Date(alert.due_date))}
                                                </p>
                                            )}
                                            <p className="text-xs text-muted-foreground">
                                                Created {formatDistanceToNow(new Date(alert.created_at))} ago
                                            </p>
                                        </div>
                                        <Badge variant={alert.status === 'active' ? 'default' : 'success'}>
                                            {alert.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
