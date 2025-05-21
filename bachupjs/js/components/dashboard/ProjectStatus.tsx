import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Calendar, MoreHorizontal, Users } from 'lucide-react';
import { formatTimestamp } from '@/utils/dashboard';
import { Progress } from '../ui/progress';
import { Skeleton } from '../ui/skeleton';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

type ProjectStatus = 'active' | 'completed' | 'on_hold' | 'cancelled';

interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  progress: number;
  teamSize: number;
  budget: number;
  spent: number;
}

interface ProjectStatusData {
  completed: number;
  inProgress: number;
  pending: number;
}

interface ProjectStatusProps {
  projects: Project[];
  data?: ProjectStatusData;
  isLoading?: boolean;
}

export const ProjectStatus: React.FC<ProjectStatusProps> = ({ projects, data, isLoading = false }) => {
  const activeCount = projects.filter(p => p.status === 'active').length;
  const completedCount = projects.filter(p => p.status === 'completed').length;
  const onHoldCount = projects.filter(p => p.status === 'on_hold').length;

  const getStatusBadgeClass = (status: ProjectStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'completed':
        return 'bg-blue-500';
      case 'on_hold':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getBudgetStatus = (project: Project) => {
    const budgetPercentage = (project.spent / project.budget) * 100;

    if (budgetPercentage > 100) {
      return { text: 'Over Budget', class: 'text-red-500' };
    } else if (budgetPercentage >= 90) {
      return { text: 'Near Limit', class: 'text-yellow-500' };
    } else {
      return { text: 'Under Budget', class: 'text-green-500' };
    }
  };

  // Default data if none provided
  const statusData = data || {
    completed: 0,
    inProgress: 0,
    pending: 0,
  };

  // Chart data
  const chartData: ChartData<'pie'> = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        data: [statusData.completed, statusData.inProgress, statusData.pending],
        backgroundColor: [
          'rgba(34, 197, 94, 0.7)',  // green
          'rgba(59, 130, 246, 0.7)', // blue
          'rgba(249, 115, 22, 0.7)', // orange
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(249, 115, 22, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw as number;
            const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  // Calculate total projects
  const totalProjects = statusData.completed + statusData.inProgress + statusData.pending;

  // Calculate percentages
  const completedPercentage = totalProjects > 0
    ? Math.round((statusData.completed / totalProjects) * 100)
    : 0;
  const inProgressPercentage = totalProjects > 0
    ? Math.round((statusData.inProgress / totalProjects) * 100)
    : 0;
  const pendingPercentage = totalProjects > 0
    ? Math.round((statusData.pending / totalProjects) * 100)
    : 0;

  // Render loading skeleton
  if (isLoading && !data) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold" data-testid="active-count">
                {activeCount}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Completed Projects</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold" data-testid="completed-count">
                {completedCount}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>On Hold</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold" data-testid="on-hold-count">
                {onHoldCount}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
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
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold" data-testid="active-count">
              {activeCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completed Projects</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold" data-testid="completed-count">
              {completedCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>On Hold</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold" data-testid="on-hold-count">
              {onHoldCount}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Project Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[220px]">
            <Pie data={chartData} options={chartOptions} />
                      </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
              <p className="text-sm font-medium text-green-800 dark:text-green-300">Completed</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{statusData.completed}</p>
              <p className="text-xs text-green-600 dark:text-green-400">{completedPercentage}%</p>
                      </div>
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">In Progress</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{statusData.inProgress}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400">{inProgressPercentage}%</p>
                      </div>
            <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg">
              <p className="text-sm font-medium text-orange-800 dark:text-orange-300">Pending</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{statusData.pending}</p>
              <p className="text-xs text-orange-600 dark:text-orange-400">{pendingPercentage}%</p>
                        </div>
                      </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectStatus;


