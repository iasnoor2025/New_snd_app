import React from 'react';
import { Search, FileX, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: 'search' | 'file' | 'plus' | React.ReactNode;
  actionText?: string;
  onAction?: () => void;
  className?: string;
  permissions?: string[];
  permissionCheck?: () => boolean;
}

/**
 * EmptyState component for displaying when there's no data to show
 *
 * @example
 * <EmptyState
 *   title="No customers found"
 *   message="Try adjusting your filters or create a new customer."
 *   icon="search"
 *   actionText="Add Customer"
 *   onAction={() => router.visit(route('customers.create'))}
 * />
 */
export function EmptyState({
  title = 'No data found',
  message = 'No items to display. Try adjusting your filters or creating a new item.',
  icon = 'search',
  actionText,
  onAction,
  className,
  permissions,
  permissionCheck,
}: EmptyStateProps) {
  // Check if action button should be shown
  const shouldShowAction = actionText && onAction && (!permissions || !permissionCheck || permissionCheck());

  // Determine which icon to show
  const renderIcon = () => {
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon as React.ReactElement, {
        className: 'h-12 w-12 text-muted-foreground'
      })
    }

    switch (icon) {
      case 'search':
        return <Search className="h-12 w-12 text-muted-foreground" />
      case 'file':
        return <FileX className="h-12 w-12 text-muted-foreground" />
      case 'plus':
        return <PlusCircle className="h-12 w-12 text-muted-foreground" />
      default:
        return <Search className="h-12 w-12 text-muted-foreground" />
    }
  };

  return (
    <div className={cn(
      "flex h-[200px] w-full flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50",
      className
    )}>
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        {renderIcon()}
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        {shouldShowAction && (
          <Button
            className="mt-4"
            onClick={onAction}
            {actionText}
          </Button>
        )}
      </div>
    </div>
  );
}

export default EmptyState;
