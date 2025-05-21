import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: number;
  type: string;
  user: string;
  timestamp: string;
  description: string;
}

interface RecentActivityProps {
  data?: Activity[];
  isLoading?: boolean;
}

// Function to get icon based on activity type
const getActivityIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'login':
      return '🔐';
    case 'create':
      return '➕';
    case 'update':
      return '✏️';
    case 'delete':
      return '🗑️';
    case 'export':
      return '📤';
    case 'import':
      return '📥';
    case 'payment':
      return '💰';
    case 'rental':
      return '🚚';
    case 'return':
      return '↩️';
    default:
      return '📋';
  }
};

const RecentActivity: React.FC<RecentActivityProps> = ({ data = [], isLoading = false }) => {
  // Render loading skeleton
  if (isLoading && (!data || data.length === 0)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start space-x-4 mb-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No recent activities found
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className="bg-muted h-8 w-8 rounded-full flex items-center justify-center">
                  <span role="img" aria-label={activity.type}>
                    {getActivityIcon(activity.type)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.description}</p>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <span>{activity.user}</span>
                    <span className="mx-1">•</span>
                    <time dateTime={activity.timestamp}>
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </time>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
