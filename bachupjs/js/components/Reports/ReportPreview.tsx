import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell
} from 'recharts';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface ReportPreviewProps {
    data: any;
    visualizationType: string;
}

const ReportPreview: React.FC<ReportPreviewProps> = ({
    data,
    visualizationType
}) => {
    if (!data || !data.results || data.results.length === 0) {
        return <div className="p-4 text-center text-muted-foreground">No data available</div>
    }

    const renderTable = () => {
        const columns = Object.keys(data.results[0]);

        return (
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map(column => (
                                <TableHead key={column}>{column}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.results.map((row: any, i: number) => (
                            <TableRow key={i}>
                                {columns.map(column => (
                                    <TableCell key={`${i}-${column}`}>
                                        {row[column] !== null && row[column] !== undefined ? row[column] : '-'}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

    const renderChart = () => {
        switch (visualizationType) {
            case 'bar':
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={data.results}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={data.xAxis || Object.keys(data.results[0])[0]} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {data.series.map((series: string, index: number) => (
                                <Bar
                                    key={series}
                                    dataKey={series}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                );

            case 'line':
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={data.results}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={data.xAxis || Object.keys(data.results[0])[0]} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {data.series.map((series: string, index: number) => (
                                <Line
                                    key={series}
                                    type="monotone"
                                    dataKey={series}
                                    stroke={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                );

            case 'pie':
                // For pie chart, we use the first numeric column as the value
                const valueKey = data.series[0] || Object.keys(data.results[0]).find(
                    key => typeof data.results[0][key] === 'number';
                ) || Object.keys(data.results[0])[1];

                const labelKey = data.xAxis || Object.keys(data.results[0])[0];

                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={data.results}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey={valueKey}
                                nameKey={labelKey}
                                {data.results.map((_: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                );

            case 'table':
            default:
                return renderTable();
        }
    };

    return (
        <div className="p-2">
            {renderChart()}
        </div>
    );
};

export default ReportPreview;


