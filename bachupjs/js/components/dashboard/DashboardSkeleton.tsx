import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export const DashboardSkeleton: React.FC = () => {
    return (
        <div className="p-4 space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-8 w-36" />
            </div>

            {/* Two-column layout for top metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* System Overview */}
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-48" />
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

                {/* Project Status */}
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-48" />
                    </CardHeader>
                    <CardContent>
                        <div className="h-[220px] flex items-center justify-center">
                            <Skeleton className="h-[200px] w-[200px] rounded-full" />
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-2">
                            <Skeleton className="h-16 w-full" />
                            <Skeleton className="h-16 w-full" />
                            <Skeleton className="h-16 w-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Revenue Analytics */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-8 w-36" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[300px] w-full" />
                </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-48" />
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
        </div>
    );
};

export default DashboardSkeleton;
