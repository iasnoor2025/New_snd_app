import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SystemHealth, UserActivity, SystemMetrics as SystemMetricsType } from '@/types/dashboard';

interface Props {
    metrics: {
        system_health: SystemHealth;
        user_activity: UserActivity;
    };
}

export const SystemMetrics: FC<Props> = ({ metrics }) => {
    const { system_health, user_activity } = metrics;

    const cpuData = system_health.cpu_trend.map((value, index) => ({
        name: `T-${system_health.cpu_trend.length - index}`,
        value
    }));

    const memoryData = system_health.memory_trend.map((value, index) => ({
        name: `T-${system_health.memory_trend.length - index}`,
        value
    }));

    const diskData = system_health.disk_trend.map((value, index) => ({
        name: `T-${system_health.disk_trend.length - index}`,
        value
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>System Metrics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div>
                        <h4 className="text-sm font-medium mb-2">CPU Usage</h4>
                        <ResponsiveContainer width="100%" height={100}>
                            <LineChart data={cpuData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium mb-2">Memory Usage</h4>
                        <ResponsiveContainer width="100%" height={100}>
                            <LineChart data={memoryData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium mb-2">Disk Usage</h4>
                        <ResponsiveContainer width="100%" height={100}>
                            <LineChart data={diskData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#ffc658" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold">{user_activity.logins_today}</div>
                            <div className="text-sm text-gray-500">Logins Today</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold">{user_activity.active_users}</div>
                            <div className="text-sm text-gray-500">Active Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold">{user_activity.recent_registrations}</div>
                            <div className="text-sm text-gray-500">New Users (7d)</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
