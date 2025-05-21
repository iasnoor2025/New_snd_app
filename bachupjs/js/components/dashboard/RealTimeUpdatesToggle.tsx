import React, { useEffect, useState } from 'react';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { useGlobalState } from '../../providers/GlobalStateProvider';
import { toggleRealTimeUpdates } from '../../services/realTimeService';
import useLoadingState from '../../hooks/useLoadingState';

interface RealTimeUpdatesToggleProps {
  className?: string;
}

export const RealTimeUpdatesToggle: React.FC<RealTimeUpdatesToggleProps> = ({ className }) => {
  const { state, dispatch } = useGlobalState();
  const { isRealTimeEnabled } = state.dashboardData;
  const { isLoading, error, withLoading } = useLoadingState('realTimeToggle');
  const [hasError, setHasError] = useState(false);

  // Toggle real-time updates
  const handleToggle = async (checked: boolean) => {
    try {
      await withLoading(async () => {
        const result = await toggleRealTimeUpdates(checked);
        if (result.success) {
          dispatch({
            type: 'TOGGLE_REAL_TIME_UPDATES',
            payload: checked,
          })
          setHasError(false);
        }
      })
    } catch (error) {
      setHasError(true);
      console.error('Error toggling real-time updates:', error);
    }
  };

  // Update timestamp when real-time updates are enabled
  useEffect(() => {
    if (isRealTimeEnabled) {
      const updateTimestamp = () => {
        dispatch({
          type: 'SET_DASHBOARD_LAST_UPDATED',
          payload: new Date().toISOString(),
        })
      };

      // Update timestamp immediately
      updateTimestamp();

      // Update timestamp every minute
      const interval = setInterval(updateTimestamp, 60000);

      return () => clearInterval(interval);
    }
  }, [isRealTimeEnabled, dispatch]);

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Switch
        id="real-time-updates"
        checked={isRealTimeEnabled}
        onCheckedChange={handleToggle}
        disabled={isLoading}
        aria-label="Toggle real-time updates"
      />
      <Label htmlFor="real-time-updates" className="text-sm cursor-pointer">
        Real-time updates
      </Label>
      {isLoading && <span className="text-xs text-muted-foreground ml-2">Updating...</span>}
      {hasError && <span className="text-xs text-destructive ml-2">Failed to update</span>}
    </div>
  );
};

export default RealTimeUpdatesToggle;
