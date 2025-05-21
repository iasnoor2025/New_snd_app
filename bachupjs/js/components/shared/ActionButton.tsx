import React, { useRef, useState } from 'react';
import { router } from '@inertiajs/react';
import { Eye, Edit, Trash2, Plus, Download, Upload, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Permission from '@/components/Permission';
import { toast } from 'sonner';
import { route } from '@/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ToastService } from "@/components/shared/ToastManager";

// Supported action types
export type ActionType = 'view' | 'edit' | 'delete' | 'create' | 'download' | 'upload' | 'custom';

// Supported button variants
export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

// Supported button sizes
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

// Props for ActionButton
export interface ActionButtonProps {
  // Required props
  action: ActionType;
  resourceType: string;

  // Optional props
  resourceId?: number;
  resourceName?: string;
  onClick?: () => void;
  customRoute?: string;
  customIcon?: React.ReactNode;
  customText?: string;
  disabled?: boolean;

  // Permission handling
  permissionResourceName?: string;
  requiredPermission?: string;

  // UI customization
  buttonText?: string;
  buttonVariant?: ButtonVariant;
  buttonSize?: ButtonSize;
  showText?: boolean;
  showTooltip?: boolean;
  tooltipText?: string;
  className?: string;

  // For delete confirmation
  confirmTitle?: string;
  confirmMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  skipConfirmation?: boolean;
}

/**
 * ActionButton component for CRUD operations with permission checks
 * and consistent styling.
 *
 * @example
 * // View button
 * <ActionButton action="view" resourceType="customers" resourceId={1} />
 *
 * // Edit button with custom styling
 * <ActionButton
 *   action="edit"
 *   resourceType="customers"
 *   resourceId={1}
 *   buttonVariant="secondary"
 *   showText
 * />
 *
 * // Delete button with confirmation
 * <ActionButton
 *   action="delete"
 *   resourceType="customers"
 *   resourceId={1}
 *   resourceName="Customer XYZ"
 * />
 */
const ActionButton: React.FC<ActionButtonProps> = ({
  action,
  resourceType,
  resourceId,
  resourceName = 'this item',
  onClick,
  customRoute,
  customIcon,
  customText,
  disabled = false,
  permissionResourceName,
  requiredPermission,
  buttonText,
  buttonVariant,
  buttonSize = 'icon',
  showText = false,
  showTooltip = true,
  tooltipText,
  className = '',
  confirmTitle,
  confirmMessage,
  successMessage,
  errorMessage,
  skipConfirmation = false,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Determine permission name for the resource
  const permName = permissionResourceName || resourceType;

  // Maps for icons, text, and variants by action type
  const actionMaps = {
    icons: {
      view: <Eye className="h-4 w-4" />,
      edit: <Edit className="h-4 w-4" />,
      delete: <Trash2 className="h-4 w-4" />,
      create: <Plus className="h-4 w-4" />,
      download: <Download className="h-4 w-4" />,
      upload: <Upload className="h-4 w-4" />,
      custom: <MoreHorizontal className="h-4 w-4" />,
    },
    text: {
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      create: 'Create',
      download: 'Download',
      upload: 'Upload',
      custom: 'Action',
    },
    tooltips: {
      view: `View ${resourceName || 'details'}`,
      edit: `Edit ${resourceName || 'item'}`,
      delete: `Delete ${resourceName || 'item'}`,
      create: `Create new ${resourceType.replace(/s$/, '')}`,
      download: `Download ${resourceName || 'file'}`,
      upload: `Upload to ${resourceName || 'system'}`,
      custom: customText || 'Custom action',
    },
    variants: {
      view: 'outline' as ButtonVariant,
      edit: 'outline' as ButtonVariant,
      delete: 'destructive' as ButtonVariant,
      create: 'default' as ButtonVariant,
      download: 'outline' as ButtonVariant,
      upload: 'outline' as ButtonVariant,
      custom: 'secondary' as ButtonVariant,
    },
    permissions: {
      view: `${permName}.view`,
      edit: `${permName}.edit`,
      delete: `${permName}.delete`,
      create: `${permName}.create`,
      download: `${permName}.view`,
      upload: `${permName}.edit`,
      custom: `${permName}.view`,
    }
  };

  // Get values from maps or use custom/default values
  const icon = customIcon || actionMaps.icons[action];
  const text = buttonText || customText || actionMaps.text[action];
  const tooltip = tooltipText || actionMaps.tooltips[action];
  const variant = buttonVariant || actionMaps.variants[action];
  const permission = requiredPermission || actionMaps.permissions[action];

  // Check if confirmation is needed
  const needsConfirmation =
    !skipConfirmation &&
    (action === 'delete' ||
     (action === 'custom' && customText?.toLowerCase().includes('delete')));

  // Get URL for routes
  const getActionUrl = () => {
    if (customRoute) return customRoute;

    // Handle cases where resourceId might be undefined
    if (action !== 'create' && resourceId === undefined) {
      console.error(`resourceId is required for ${action} action`);
      return '#';
    }

    try {
      // Generate route URL based on action type
      switch(action) {
        case 'view':
          return route(`${resourceType}.show`, resourceId);
        case 'edit':
          return route(`${resourceType}.edit`, resourceId);
        case 'create':
          return route(`${resourceType}.create`);
        case 'delete':
          return route(`${resourceType}.destroy`, resourceId);
        default:
          console.warn(`No URL defined for ${action} action`);
          return '#';
      }
    } catch (error) {
      console.error(`Error generating URL for ${resourceType}.${action} with ID ${resourceId}:`, error);

      // Fallback direct URL construction if route function fails
      const slug = resourceType.endsWith('s') ? resourceType : `${resourceType}s`;

      switch(action) {
        case 'view':
          return `/${slug}/${resourceId}`;
        case 'edit':
          return `/${slug}/${resourceId}/edit`;
        case 'create':
          return `/${slug}/create`;
        case 'delete':
          return `/${slug}/${resourceId}`;
        default:
          return '#';
      }
    }
  };

  // Handle button click
  const handleAction = () => {
    if (isLoading) return; // Prevent multiple clicks

    if (onClick) {
      onClick();
      return;
    }

    // For delete actions with confirmation
    if (action === 'delete' && needsConfirmation) {
      setConfirmOpen(true);
      return;
    }

    // For delete actions without confirmation
    if (action === 'delete' && !needsConfirmation) {
      performDelete();
      return;
    }

    // For view actions
    if (action === 'view') {
      try {
        const url = getActionUrl();
        console.log(`Navigating to: ${url}`);

        // Use Inertia router with proper error handling
        router.visit(url, {
          preserveScroll: true,
          onBefore: () => {
            setIsLoading(true);
            return true;
          },
          onSuccess: () => {
            setIsLoading(false);
          },
          onError: (errors) => {
            setIsLoading(false);
            console.error('Navigation error:', errors);
            ToastService.error('Failed to navigate to view page');
          },
        })
        return;
      } catch (error) {
        setIsLoading(false);
        console.error('Navigation error:', error);
        ToastService.error('Failed to navigate to view page');
        return;
      }
    }

    // Handle other actions
    try {
      const url = getActionUrl();
      router.visit(url, {
        preserveScroll: true,
        onBefore: () => {
          setIsLoading(true);
          return true;
        },
        onSuccess: () => {
          setIsLoading(false);
        },
        onError: (errors) => {
          setIsLoading(false);
          console.error('Action error:', errors);
          ToastService.error('Failed to perform action');
        },
      })
    } catch (error) {
      setIsLoading(false);
      console.error('Action error:', error);
      ToastService.error('Failed to perform action');
    }
  };

  // Perform delete action
  const performDelete = () => {
    if (!resourceId) {
      console.error('resourceId is required for delete action');
      return;
    }

    router.delete(getActionUrl(), {
      onSuccess: () => {
        toast.success(successMessage || `${resourceName} deleted successfully`);
      },
      onError: (errors) => {
        toast.error(errorMessage || `Failed to delete ${resourceName}`);
        console.error('Delete errors:', errors);
      }
    })
  };

  // Render button with optional tooltip
  const buttonElement = (
    <Button
      variant={variant}
      size={buttonSize}
      onClick={handleAction}
      className={className}
      disabled={disabled}
      type="button"
    >
      {customIcon}
      {showText && <span className={buttonSize === 'icon' ? 'sr-only' : 'ml-2'}>{text}</span>}
    </Button>
  );

  // Render button with permission check
  return (
    <>
      <Permission permission={permission}>
        {showTooltip ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {buttonElement}
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          buttonElement
        )}
      </Permission>

      {/* Confirmation Dialog */}
      {needsConfirmation && (
        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{confirmTitle || 'Confirm Deletion'}</AlertDialogTitle>
              <AlertDialogDescription>
                {confirmMessage || `Are you sure you want to delete ${resourceName}? This action cannot be undone.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={performDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default ActionButton;


