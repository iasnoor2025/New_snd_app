import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ChartData as ChartDataType } from '../../services/realTimeService';
import { fetchChartData } from '../../services/realTimeService';
import { Skeleton } from '../ui/skeleton';
import useLoadingState from '../../hooks/useLoadingState';
import { useGlobalState } from '../../providers/GlobalStateProvider';

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

interface RealTimeChartProps {
  title: string;
  chartType: 'line' | 'bar' | 'pie';
  endpoint?: string;
  initialData?: ChartDataType;
  height?: number;
  refreshInterval?: number;
}

type PeriodOption = '7days' | '30days' | '90days' | '1year';

const RealTimeChart: React.FC<RealTimeChartProps> = ({
  title,
  chartType,
  initialData,
  height = 300,
  refreshInterval = 30000, // 30 seconds by default
}) => {
  const { state } = useGlobalState();
  const { isRealTimeEnabled } = state.dashboardData;
  const [chartData, setChartData] = useState<ChartDataType | null>(initialData || null);
  const [period, setPeriod] = useState<PeriodOption>('30days');
  const { isLoading, error, withLoading } = useLoadingState(`chart_${title}`);

  // Fetch chart data based on period
  const fetchData = async () => {
    try {
      await withLoading(async () => {
        const data = await fetchChartData(chartType, period);
        setChartData(data);
      })
    } catch (err) {
      console.error('Error fetching chart data:', err);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [period]);

  // Set up real-time refresh interval
  useEffect(() => {
    if (!isRealTimeEnabled) return;

    const intervalId = setInterval(() => {
      fetchData();
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [isRealTimeEnabled, period, refreshInterval]);

  // Chart options
  const options: ChartOptions<'line' | 'bar' | 'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: chartType !== 'pie' ? {
      y: {
        beginAtZero: true,
      },
    } : undefined,
  };

  // Handle period change
  const handlePeriodChange = (value: string) => {
    setPeriod(value as PeriodOption);
  };

  // Render the appropriate chart
  const renderChart = () => {
    if (!chartData) return null;

    switch (chartType) {
      case 'line':
        return <Line data={chartData as ChartData<'line'>} options={options} height={height} />
      case 'bar':
        return <Bar data={chartData as ChartData<'bar'>} options={options} height={height} />
      case 'pie':
        return <Pie data={chartData as ChartData<'pie'>} options={options} height={height} />
      default:
        return null;
    }
  };

  // Render loading skeleton
  if (isLoading && !chartData) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">
            <Skeleton className="h-6 w-48" />
          </CardTitle>
          <Skeleton className="h-8 w-28" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <Select value={period} onValueChange={handlePeriodChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="1year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {error && <p className="text-destructive text-sm mb-2">Error loading chart: {error}</p>}
        <div style={{ height: `${height}px` }}>
          {renderChart()}
        </div>
        {isRealTimeEnabled && (
          <div className="mt-2 text-xs text-muted-foreground">
            Auto-refreshing every {refreshInterval / 1000} seconds
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeChart;
