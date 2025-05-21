import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RoleStats as RoleStatsType } from '@/types/dashboard';
import { Shield, Users, Key } from 'lucide-react';

interface Props {
    roles: RoleStatsType;
}

export const RoleStats: FC<Props> = ({ roles }) => {
    const stats = {
        total: roles.total,
        distribution: roles.distribution,
        totalUsers: roles.distribution.reduce((sum, role) => sum + role.count, 0)
    };

    const statItems = [;
        {
            title: 'Total Roles',
            value: stats.total,
            icon: Shield,
            description: 'All defined roles'
        },
        {
            title: 'Total Role Assignments',
            value: stats.totalUsers,
            icon: Users,
            description: 'Total role assignments',
            color: 'text-green-500'
        }
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Role Statistics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    {statItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.title} className="text-center">
                                <div className="flex items-center justify-center mb-2">
                                    <Icon className={`h-4 w-4 mr-2 ${item.color || 'text-muted-foreground'}`} />
                                    <span className="text-sm font-medium">{item.title}</span>
                                </div>
                                <div className="text-2xl font-bold">{item.value}</div>
                                <p className="text-xs text-muted-foreground">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6">
                    <h4 className="text-sm font-medium mb-2">Role Distribution</h4>
                    <div className="space-y-2">
                        {stats.distribution.map((role) => (
                            <div key={role.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <div className="font-medium">{role.name}</div>
                                <div className="text-sm text-gray-500">
                                    {role.count} users
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

