import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserStats as UserStatsType } from '@/types/dashboard';

interface Props {
    users: UserStatsType;
}

export const UserStats: FC<Props> = ({ users }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>User Statistics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold">{users.total}</div>
                        <div className="text-sm text-gray-500">Total Users</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold">{users.active}</div>
                        <div className="text-sm text-gray-500">Active Users</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold">{users.inactive}</div>
                        <div className="text-sm text-gray-500">Inactive Users</div>
                    </div>
                </div>

                <div className="mt-6">
                    <h4 className="text-sm font-medium mb-2">Recent Users</h4>
                    <div className="space-y-2">
                        {users.recent.map((user) => (
                            <div key={user.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                                <div className="text-sm text-gray-500">
                                    {new Date(user.created_at).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
