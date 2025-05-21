import React, { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { GlobalStateProvider, useGlobalState } from '../../providers/GlobalStateProvider';
import SystemOverview from './SystemOverview';
import RevenueAnalytics from './RevenueAnalytics';
import RecentActivity from './RecentActivity';
import ProjectStatus from './ProjectStatus';
import { DashboardErrorBoundary } from './DashboardErrorBoundary';
import { DashboardSkeleton } from './DashboardSkeleton';
import RealTimeUpdatesToggle from './RealTimeUpdatesToggle';
import {
  fetchDashboardData,
  subscribeToDashboardUpdates,
  DashboardData
} from '../../services/realTimeService';
import useLoadingState from '../../hooks/useLoadingState';
import { format } from 'date-fns';

const DashboardContent: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const { isRealTimeEnabled, lastUpdated } = state.dashboardData;
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const { isLoading, error, withLoading } = useLoadingState('dashboardData');

  // Fetch dashboard data on initial load
  useEffect(() => {
    const loadDashboardData = async () => {
      await withLoading(async () => {
        const data = await fetchDashboardData();
        setDashboardData(data);
        dispatch({
          type: 'SET_DASHBOARD_LAST_UPDATED',
          payload: new Date().toISOString(),
        })
      })
    };

    loadDashboardData();
  }, [withLoading, dispatch]);

  // Subscribe to real-time updates when enabled
  useEffect(() => {
    if (!isRealTimeEnabled) return;

    const unsubscribe = subscribeToDashboardUpdates((data) => {
      setDashboardData(data);
      dispatch({
        type: 'SET_DASHBOARD_LAST_UPDATED',
        payload: new Date().toISOString(),
      })
    })

    return () => {
      unsubscribe();
    };
  }, [isRealTimeEnabled, dispatch]);

  if (isLoading && !dashboardData) {
    return <DashboardSkeleton />
  }

  const formattedLastUpdated = lastUpdated
    ? format(new Date(lastUpdated), 'MMM d, yyyy h:mm a')
    : 'Not available';

    return (
    <div className="p-4 space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          {lastUpdated && (
            <span className="text-xs text-muted-foreground">
              Last updated: {formattedLastUpdated}
            </span>
          )}
          <RealTimeUpdatesToggle />
        </div>
        </div>

      {error && (
        <Card className="p-4 bg-destructive/10 border-destructive">
          <p className="text-destructive">Error loading dashboard data: {error}</p>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardErrorBoundary>
          <SystemOverview data={dashboardData?.systemMetrics} isLoading={isLoading} />
        </DashboardErrorBoundary>

        <DashboardErrorBoundary>
          <ProjectStatus data={dashboardData?.projectStatus} isLoading={isLoading} />
        </DashboardErrorBoundary>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <DashboardErrorBoundary>
          <RevenueAnalytics data={dashboardData?.revenueData} isLoading={isLoading} />
        </DashboardErrorBoundary>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <DashboardErrorBoundary>
          <RecentActivity data={dashboardData?.recentActivities} isLoading={isLoading} />
        </DashboardErrorBoundary>
      </div>
    </div>
  );
};

const DashboardLayout: React.FC = () => {
    return (
    <GlobalStateProvider>
      <DashboardContent />
    </GlobalStateProvider>
    );
};

export default DashboardLayout;


