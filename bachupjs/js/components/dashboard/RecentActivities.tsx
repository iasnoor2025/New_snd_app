import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatTimestamp } from '@/utils/dashboard';
import { Activity, Clock, User } from 'lucide-react';

interface Activity {
    id: number;
    type: string;
    description: string;
    timestamp: string;
    user?: {
        name: string;
        avatar?: string;
    };
}

interface Props {
    activities: Activity[];
}

export const RecentActivities: FC<Props> = ({ activities }) => {
    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'timesheet':
                return <Clock className="h-4 w-4" />
            case 'leave':
                return <Activity className="h-4 w-4" />
            default:
                return <Activity className="h-4 w-4" />
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-4">
                            <div className="mt-1">
                                {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {activity.description}
                                </p>
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    {activity.user && (
                                        <div className="flex items-center space-x-1">
                                            <User className="h-3 w-3" />
                                            <span>{activity.user.name}</span>
                                        </div>
                                    )}
                                    <span>•</span>
                                    <span>{formatTimestamp(activity.timestamp)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
