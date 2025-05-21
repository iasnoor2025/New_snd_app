import React from 'react';
import { router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Permission from '@/components/Permission';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PermissionActions } from '@/utils/permission-utils';
import { route } from '@/utils';

interface CreateButtonProps {
  // Required props
  resourceType?: string;  // e.g. 'customers', 'equipment', 'rentals'
  permission?: string;    // Direct permission string if needed
  href?: string;          // Direct href if needed

  // Optional props
  onClick?: () => void;
  createRoute?: string;  // Custom route, defaults to resourceType.create
  permissionResourceName?: string; // For permission mapping
  text?: string;
  buttonText?: string;   // For backward compatibility
  buttonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
  tooltip?: string;
  icon?: React.ReactNode;
  showTooltip?: boolean;
}

export default function CreateButton({
  resourceType,
  permission,
  href,
  onClick,
  createRoute,
  permissionResourceName,
  text,
  buttonText,
  buttonVariant = 'default',
  className = '',
  tooltip,
  icon = <Plus className="mr-2 h-4 w-4" />,
  showTooltip = true,
}: CreateButtonProps) {
  // Use buttonText for backward compatibility
  const buttonLabel = text || buttonText;

  // Generate button text if not provided
  const finalText = buttonLabel ||
    (resourceType ? `Add ${resourceType.replace(/s$/, '').replace(/^./, (str) => str.toUpperCase())}` : 'Create');

  // Generate tooltip if not provided
  const tooltipText = tooltip ||
    (resourceType ? `Create a new ${resourceType.replace(/s$/, '').toLowerCase()}` : 'Create new item');

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      if (onClick && typeof onClick === 'function') {
        onClick();
        return;
      }

      if (href) {
        router.visit(href);
        return;
      }

      if (resourceType) {
        const routeName = createRoute || `${resourceType}.create`;
        const url = route(routeName);
        if (url === '/') {
          console.error(`Route [${routeName}] not found. Falling back to direct URL.`);
          router.visit(`/${resourceType}/create`);
          return;
        }
        router.visit(url);
        return;
      }

      console.error('No valid navigation target provided');
    } catch (error) {
      console.error('Error in CreateButton navigation:', error);
    }
  };

  const renderButton = () => (
    <Button
      variant={buttonVariant}
      onClick={handleClick}
      className={className}
      type="button"
    >
      {icon}
      {finalText}
    </Button>
  );

  // If there's a direct permission, use it; otherwise use resource and action
  return (
    <Permission
      permission={permission}
      resource={resourceType ? (permissionResourceName || resourceType) : undefined}
      action={resourceType ? PermissionActions.CREATE : undefined}
    >
      {showTooltip ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {renderButton()}
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        renderButton()
      )}
    </Permission>
  );
}


