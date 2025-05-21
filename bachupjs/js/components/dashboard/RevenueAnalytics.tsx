import React from 'react';
import RealTimeChart from './RealTimeChart';
import { ChartData } from '../../services/realTimeService';

interface RevenueAnalyticsProps {
  data?: ChartData;
  isLoading?: boolean;
}

const RevenueAnalytics: React.FC<RevenueAnalyticsProps> = ({ data, isLoading = false }) => {
  return (
    <RealTimeChart
      title="Revenue Analytics"
      chartType="line"
      initialData={data}
      height={350}
      refreshInterval={60000} // 1 minute
    />
  );
};

export default RevenueAnalytics;
