import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { usePermission } from '@/hooks/usePermission';
import { useTranslation } from 'react-i18next';

interface CrudButtonsProps {
  resourceType: string;
  resourceId: number;
  resourceName?: string;
  className?: string;
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  onDelete?: () => void;
  viewRoute?: string;
  onView?: () => void;
  hideView?: boolean;
  additionalActions?: Array<{
    label: string;
    icon?: React.ReactNode;
    href?: string;
    onClick?: () => void;
    permission?: string;
  }>;
  [key: string]: any;
}

const CrudButtons: React.FC<CrudButtonsProps> = ({
  resourceType,
  resourceId,
  resourceName = 'this item',
  className = '',
  showView = true,
  showEdit = true,
  showDelete = true,
  onDelete,
  additionalActions = [],
  viewRoute,
  onView,
  hideView,
  ...props
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { hasPermission } = usePermission();
  const { t } = useTranslation(['common']);

  const hasViewPermission = hasPermission(`${resourceType}.view`);
  const hasEditPermission = hasPermission(`${resourceType}.edit`);
  const hasDeletePermission = hasPermission(`${resourceType}.delete`);

  const handleDelete = () => {
    setIsDeleting(true);

    router.delete(`/${resourceType}/${resourceId}`, {
      onSuccess: () => {
        toast.success(t('common:messages.delete_success', { resource: resourceName }));
        if (onDelete) onDelete();
      },
      onError: (errors) => {
        toast.error(errors.message || t('common:messages.delete_error'));
      },
      onFinish: () => {
        setIsDeleting(false);
        setIsDeleteDialogOpen(false);
      }
    });
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showView && hasViewPermission && (
        <Button variant="outline" size="icon" asChild title={t('common:actions.view')}>
          <Link href={`/${resourceType}/${resourceId}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      )}

      {showEdit && hasEditPermission && (
        <Button variant="outline" size="icon" asChild title={t('common:actions.edit')}>
          <Link href={`/${resourceType}/${resourceId}/edit`}>
            <Pencil className="h-4 w-4" />
          </Link>
        </Button>
      )}

      {(showDelete || additionalActions.length > 0) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {additionalActions.map((action, index) => {
              if (action.permission && !hasPermission(action.permission)) {
                return null;
              }

              if (action.href) {
                return (
                  <DropdownMenuItem key={index} asChild>
                    <Link href={action.href} className="flex items-center cursor-pointer">
                      {action.icon && <span className="mr-2">{action.icon}</span>}
                      {action.label}
                    </Link>
                  </DropdownMenuItem>
                );
              }

              return (
                <DropdownMenuItem
                  key={index}
                  onClick={action.onClick}
                  className="cursor-pointer"
                >
                  {action.icon && <span className="mr-2">{action.icon}</span>}
                  {action.label}
                </DropdownMenuItem>
              );
            })}

            {showDelete && hasDeletePermission && (
              <DropdownMenuItem
                className="text-destructive cursor-pointer"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {t('common:actions.delete')}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('common:dialogs.confirm_delete.title')}</DialogTitle>
            <DialogDescription>
              {t('common:dialogs.confirm_delete.description', { resource: resourceName })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isDeleting}>{t('common:actions.cancel')}</Button>
            </DialogClose>
            <Button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('common:actions.deleting')}
                </>
              ) : (
                t('common:actions.delete')
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CrudButtons;

