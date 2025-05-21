import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
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
    budget: {
        total: number;
        spent: number;
        remaining: number;
        categories: {
            id: number;
            name: string;
            allocated: number;
            spent: number;
            status: string;
        }[];
        monthlySpending: {
            month: string;
            amount: number;
        }[];
    };
}

export const BudgetOverview: FC<Props> = ({ budget }) => {
    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'under':
                return <Badge variant="success">Under Budget</Badge>
            case 'over':
                return <Badge variant="destructive">Over Budget</Badge>
            case 'at':
                return <Badge variant="warning">At Budget</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    };

    const getProgressColor = (percentage: number) => {
        if (percentage >= 90) return 'bg-destructive';
        if (percentage >= 75) return 'bg-warning';
        return 'bg-primary';
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Budget</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${budget.total.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Spent</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${budget.spent.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Remaining</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${budget.remaining.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Monthly Spending</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={budget.monthlySpending}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="amount" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Budget Categories</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {budget.categories.map((category) => {
                            const percentage = (category.spent / category.allocated) * 100;
                            return (
                                <div key={category.id} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium">{category.name}</div>
                                        <div className="flex items-center space-x-2">
                                            <span>
                                                ${category.spent.toLocaleString()} / $
                                                {category.allocated.toLocaleString()}
                                            </span>
                                            {getStatusBadge(category.status)}
                                        </div>
                                    </div>
                                    <Progress
                                        value={percentage}
                                        className={getProgressColor(percentage)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
