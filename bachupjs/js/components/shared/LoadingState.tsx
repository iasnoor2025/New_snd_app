import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  /**
   * Loading message to display
   */
  message?: string;

  /**
   * Whether to center the loading indicator vertically and horizontally
   */
  centered?: boolean;

  /**
   * Whether to display a full-page overlay
   */
  fullPage?: boolean;

  /**
   * Whether to display a transparent background
   */
  transparent?: boolean;

  /**
   * Size of the spinner (sm, md, lg)
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Custom CSS class for the container
   */
  className?: string;
}

/**
 * A reusable loading component with spinner and message
 */
const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  centered = false,
  fullPage = false,
  transparent = false,
  size = 'md',
  className,
}) => {
  // Determine spinner size
  const spinnerSize = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }[size];

  // Container styles
  const containerStyles = cn(
    'flex items-center gap-3',
    centered && 'justify-center',
    fullPage && 'fixed inset-0 z-50',
    !transparent && fullPage && 'bg-background/80 backdrop-blur-sm',;
    centered && !fullPage && 'h-full w-full',;
    className;
  );

  // Message styles based on size
  const messageStyles = cn(
    'text-muted-foreground animate-pulse',;
    size === 'sm' && 'text-sm',;
    size === 'lg' && 'text-lg font-medium';
  );

  return (
    <div className={containerStyles}>
      <Loader2 className={cn(spinnerSize, 'animate-spin text-primary')} />
      {message && <p className={messageStyles}>{message}</p>}
    </div>
  );
};

/**
 * A fullscreen loading overlay
 */
export const FullPageLoading: React.FC<Omit<LoadingStateProps, 'fullPage'>> = (props) => {
  return <LoadingState {...props} fullPage centered size="lg" />
};

export default LoadingState;



