import React from 'react';
import ActionButton from '@/components/shared/ActionButton';

interface CrudButtonsProps {
  // Required props
  resourceType: string;  // e.g. 'customers', 'equipment', 'rentals'
  resourceId: number;

  // Optional props
  resourceName?: string; // Used in delete confirmation
  onDelete?: () => void; // Custom delete handler
  onView?: () => void;   // Custom view handler
  onEdit?: () => void;   // Custom edit handler
  viewRoute?: string;    // Custom route name for view, defaults to {resourceType}.show
  editRoute?: string;    // Custom route name for edit, defaults to {resourceType}.edit
  deleteRoute?: string;  // Custom route name for delete, defaults to {resourceType}.destroy

  // Allows mapping permissions to a different resource name if needed
  permissionResourceName?: string; // e.g. 'clients' for 'customers'

  // Optional UI customization
  hideView?: boolean;
  hideEdit?: boolean;
  hideDelete?: boolean;
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showViewButton?: boolean; // For backward compatibility, defaults to true

  // Custom messages
  viewTooltip?: string;
  editTooltip?: string;
  deleteTooltip?: string;
  deleteConfirmTitle?: string;
  deleteConfirmMessage?: string;
  deleteSuccessMessage?: string;
  deleteErrorMessage?: string;
}

export default function CrudButtons({
  resourceType,
  resourceId,
  resourceName = 'this item',
  onDelete,
  onView,
  onEdit,
  viewRoute,
  editRoute,
  deleteRoute,
  permissionResourceName,
  hideView = false,
  hideEdit = false,
  hideDelete = false,
  buttonSize = 'icon',
  className = '',
  showViewButton = true,
  viewTooltip,
  editTooltip,
  deleteTooltip,
  deleteConfirmTitle,
  deleteConfirmMessage,
  deleteSuccessMessage,
  deleteErrorMessage,
}: CrudButtonsProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {!hideView && showViewButton && (
        <ActionButton
          action="view"
          resourceType={resourceType}
          resourceId={resourceId}
          resourceName={resourceName}
          customRoute={viewRoute}
          onClick={onView}
          permissionResourceName={permissionResourceName}
          buttonSize={buttonSize}
          tooltipText={viewTooltip}
        />
      )}

      {!hideEdit && (
        <ActionButton
          action="edit"
          resourceType={resourceType}
          resourceId={resourceId}
          resourceName={resourceName}
          customRoute={editRoute}
          onClick={onEdit}
          permissionResourceName={permissionResourceName}
          buttonSize={buttonSize}
          tooltipText={editTooltip}
        />
      )}

      {!hideDelete && (
        <ActionButton
          action="delete"
          resourceType={resourceType}
          resourceId={resourceId}
          resourceName={resourceName}
          customRoute={deleteRoute}
          onClick={onDelete}
          permissionResourceName={permissionResourceName}
          buttonSize={buttonSize}
          tooltipText={deleteTooltip}
          confirmTitle={deleteConfirmTitle}
          confirmMessage={deleteConfirmMessage}
          successMessage={deleteSuccessMessage}
          errorMessage={deleteErrorMessage}
        />
      )}
    </div>
  );
}
