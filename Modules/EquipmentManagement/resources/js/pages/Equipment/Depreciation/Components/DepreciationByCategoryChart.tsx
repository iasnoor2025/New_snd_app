import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Custom BarChart wrapper component
interface BarChartProps {
  data: any[];
  categories: string[];
  index: string;
  colors: string[];
  valueFormatter?: (value: number) => string;
  layout?: 'horizontal' | 'vertical';
  stack?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  categories,
  index,
  colors,
  valueFormatter,
  layout = 'horizontal',
  stack = true
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={data}
        layout={layout}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {layout === 'horizontal' ? (
          <XAxis dataKey={index} />
        ) : (
          <XAxis type="number" tickFormatter={valueFormatter} />
        )}
        {layout === 'horizontal' ? (
          <YAxis tickFormatter={valueFormatter} />
        ) : (
          <YAxis dataKey={index} type="category" />
        )}
        <Tooltip formatter={valueFormatter} />
        <Legend />
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[i % colors.length]}
            stackId={stack ? "stack" : undefined}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

interface Category {
  category_id: number;
  category_name: string;
  count: number;
  original_value: number;
  current_value: number;
  depreciation: number;
}

interface DepreciationByCategoryChartProps {
  categories: Category[];
}

const DepreciationByCategoryChart: React.FC<DepreciationByCategoryChartProps> = ({ categories }) => {
  // Sort categories by original value for better visualization
  const sortedCategories = [...categories].sort((a, b) => b.original_value - a.original_value);

  // Prepare data for the chart
  const chartData = sortedCategories.map(category => ({
    name: category.category_name,
    "Original Value": category.original_value,
    "Current Value": category.current_value,
    "Depreciation": category.depreciation,
  }));

  // Formatter for currency values in the chart
  const formatMoney = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <BarChart
      data={chartData}
      categories={['Original Value', 'Current Value', 'Depreciation']}
      colors={['#3B82F6', '#10B981', '#F59E0B']}
      index="name"
      valueFormatter={formatMoney}
      layout="vertical"
      stack={false}
    />
  );
};

export default DepreciationByCategoryChart;
