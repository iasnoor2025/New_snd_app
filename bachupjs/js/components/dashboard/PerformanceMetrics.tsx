import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface Props {
    metrics: {
        overallScore: number;
        attendance: number;
        productivity: number;
        quality: number;
        teamCollaboration: number;
        monthlyTrends: {
            month: string;
            score: number;
        }[];
        departmentScores: {
            department: string;
            score: number;
        }[];
    };
}

export const PerformanceMetrics: FC<Props> = ({ metrics }) => {
    const getProgressColor = (score: number) => {
        if (score >= 75) return 'bg-green-500';
        if (score >= 50) return 'bg-yellow-500';
        if (score >= 25) return 'bg-blue-500';
        return 'bg-red-500';
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Overall Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="text-2xl font-bold">
                                {metrics.overallScore}%
                            </div>
                            <Progress
                                value={metrics.overallScore}
                                className={getProgressColor(metrics.overallScore)}
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Attendance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="text-2xl font-bold">
                                {metrics.attendance}%
                            </div>
                            <Progress
                                value={metrics.attendance}
                                className={getProgressColor(metrics.attendance)}
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Productivity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="text-2xl font-bold">
                                {metrics.productivity}%
                            </div>
                            <Progress
                                value={metrics.productivity}
                                className={getProgressColor(metrics.productivity)}
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Quality</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="text-2xl font-bold">
                                {metrics.quality}%
                            </div>
                            <Progress
                                value={metrics.quality}
                                className={getProgressColor(metrics.quality)}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Performance Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={metrics.monthlyTrends}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar
                                        dataKey="score"
                                        fill="#8884d8"
                                        name="Performance Score"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Department Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={metrics.departmentScores}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="department" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar
                                        dataKey="score"
                                        fill="#82ca9d"
                                        name="Department Score"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Team Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="text-2xl font-bold">
                            {metrics.teamCollaboration}%
                        </div>
                        <Progress
                            value={metrics.teamCollaboration}
                            className={getProgressColor(metrics.teamCollaboration)}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
