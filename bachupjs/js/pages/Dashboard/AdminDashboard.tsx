import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SystemOverview } from '@/components/dashboard/SystemOverview';
import { UserManagement } from '@/components/dashboard/UserManagement';
import { RoleManagement } from '@/components/dashboard/RoleManagement';
import { SystemMetrics } from '@/components/dashboard/SystemMetrics';
import { usePermission } from '@/hooks/usePermission';

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

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive' | 'suspended';
    lastLogin: string;
}

interface Permission {
    id: number;
    name: string;
    description: string;
}

interface Role {
    id: number;
    name: string;
    description: string;
    permissions: Permission[];
    userCount: number;
    isSystem: boolean;
}

interface SystemMetrics {
    healthScore: number;
    cpuHistory: {
        timestamp: string;
        usage: number;
    }[];
    memoryHistory: {
        timestamp: string;
        usage: number;
    }[];
    diskHistory: {
        timestamp: string;
        usage: number;
    }[];
    resourceDistribution: {
        name: string;
        value: number;
    }[];
}

interface Props {
    systemData: SystemData;
    users: User[];
    roles: Role[];
    metrics: SystemMetrics;
}

export const AdminDashboard: FC<Props> = ({
    systemData,
    users,
    roles,
    metrics
}) => {
    const canViewUsers = usePermission('users.view');
    const canViewRoles = usePermission('roles.view');

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {systemData.totalUsers}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {systemData.activeUsers} active
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Roles</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {systemData.activeRoles}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {systemData.totalRoles} total
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">System Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {systemData.status}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Uptime: {systemData.uptime}h
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">System Health</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {metrics.healthScore}%
                        </div>
                        <p className="text-xs text-muted-foreground">
                            CPU: {systemData.cpuUsage}% | Memory: {systemData.memoryUsage}%
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">System Overview</TabsTrigger>
                    {canViewUsers && (
                        <TabsTrigger value="users">User Management</TabsTrigger>
                    )}
                    {canViewRoles && (
                        <TabsTrigger value="roles">Role Management</TabsTrigger>
                    )}
                    <TabsTrigger value="metrics">System Metrics</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <SystemOverview data={systemData} />
                </TabsContent>

                {canViewUsers && (
                    <TabsContent value="users" className="space-y-4">
                        <UserManagement users={users} />
                    </TabsContent>
                )}

                {canViewRoles && (
                    <TabsContent value="roles" className="space-y-4">
                        <RoleManagement roles={roles} />
                    </TabsContent>
                )}

                <TabsContent value="metrics" className="space-y-4">
                    <SystemMetrics metrics={metrics} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminDashboard;
