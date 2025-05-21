import React, { useState, useEffect } from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Custom LineChart wrapper component
interface LineChartProps {
  data: any[];
  categories: string[];
  index: string;
  colors: string[];
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
  showGridLines?: boolean;
  startEndOnly?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  yAxisWidth?: number;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  categories,
  index,
  colors,
  valueFormatter,
  showLegend = true,
  showGridLines = true,
  startEndOnly = false,
  showXAxis = true,
  showYAxis = true,
  yAxisWidth = 40
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
        {showXAxis && (
          <XAxis
            dataKey={index}
            tickFormatter={startEndOnly ? (value, index) => (index === 0 || index === data.length - 1 ? value : '') : undefined}
          />
        )}
        {showYAxis && <YAxis width={yAxisWidth} tickFormatter={valueFormatter} />}
        <Tooltip formatter={valueFormatter} />
        {showLegend && <Legend />}
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[i % colors.length]}
            activeDot={{ r: 8 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

const AssetValueTrendChart: React.FC = () => {
  // In a real application, you would fetch this data from the backend
  // For now, we'll generate sample data
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    generateSampleData();
  }, []);

  const generateSampleData = () => {
    const now = new Date();
    const data = [];

    // Generate 12 months of data
    for (let i = 0; i < 12; i++) {
      const date = new Date(now);
      date.setMonth(now.getMonth() - 11 + i);

      // Initial value declines over time
      const initialValue = 500000 - (i * 5000);

      // Current value declines more rapidly
      const currentValue = initialValue - (i * 15000) - (i * i * 500);

      // Accumulated depreciation is the difference
      const depreciation = initialValue - currentValue;

      data.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        'Original Value': initialValue,
        'Current Value': currentValue,
        'Accumulated Depreciation': depreciation,
      })
    }

    setChartData(data);
  };

  // Format currency values for chart
  const formatMoney = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <LineChart
      data={chartData}
      categories={['Original Value', 'Current Value', 'Accumulated Depreciation']}
      index="month"
      colors={['#3B82F6', '#10B981', '#F97316']}
      valueFormatter={formatMoney}
      showLegend={true}
      showGridLines={true}
      startEndOnly={false}
      showXAxis={true}
      showYAxis={true}
      yAxisWidth={65}
    />
  );
};

export default AssetValueTrendChart;
