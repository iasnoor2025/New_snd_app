import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from 'axios';

// Types for dashboard data
export interface DashboardData {
  projectStatus: {
    completed: number;
    inProgress: number;
    pending: number;
  };
  revenueData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  };
  systemMetrics: {
    cpu: number;
    memory: number;
    storage: number;
    network: number;
  };
  recentActivities: {
    id: number;
    type: string;
    user: string;
    timestamp: string;
    description: string;
  }[];
}

// Echo instance
let echoInstance: Echo | null = null;

// Initialize Echo
export const initializeEcho = (): Echo => {
  if (!echoInstance) {
    window.Pusher = Pusher;

    echoInstance = new Echo({
      broadcaster: 'pusher',
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      forceTLS: true,
    })
  }

  return echoInstance;
};

// Subscribe to dashboard updates channel
export const subscribeToDashboardUpdates = (callback: (data: DashboardData) => void): (() => void) => {
  const echo = initializeEcho();

  echo.channel('dashboard-updates')
    .listen('DashboardDataUpdated', (event: { data: DashboardData }) => {
      callback(event.data);
    })

  // Return unsubscribe function
  return () => {
    echo.leave('dashboard-updates');
  };
};

// Fetch dashboard data
export const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    const response = await axios.get('/api/dashboard/data');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

// Enable or disable real-time updates
export const toggleRealTimeUpdates = async (enabled: boolean): Promise<{ success: boolean }> => {
  try {
    const response = await axios.post('/api/dashboard/real-time-updates', { enabled })
    return response.data;
  } catch (error) {
    console.error('Error toggling real-time updates:', error);
    throw error;
  }
};

// Chart data type definitions for type safety
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
  }[];
}

export interface BarChartData extends ChartData {}
export interface LineChartData extends ChartData {}
export interface PieChartData extends ChartData {}

// Fetch chart data with type safety
export const fetchChartData = async (chartType: 'bar' | 'line' | 'pie', period: string): Promise<ChartData> => {
  try {
    const response = await axios.get(`/api/dashboard/chart-data`, {
      params: { type: chartType, period }
    })
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${chartType} chart data:`, error);
    throw error;
  }
};
