import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button, ButtonProps } from '@/components/ui/button';

interface ConfirmDialogProps {
  title: string;
  description: string;
  triggerButton?: React.ReactNode;
  confirmButton?: {
    text?: string;
    variant?: ButtonProps['variant'];
  };
  cancelButton?: {
    text?: string;
    variant?: ButtonProps['variant'];
  };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm: () => void;
}

/**
 * A reusable confirmation dialog component
 *
 * @example
 * <ConfirmDialog
 *   title="Delete Customer"
 *   description="Are you sure you want to delete this customer? This action cannot be undone."
 *   triggerButton={
 *     <Button variant="destructive">Delete Customer</Button>
 *   }
 *   confirmButton={{
 *     text: "Delete",
 *     variant: "destructive"
 *   }}
 *   onConfirm={() => deleteCustomer(customer.id)}
 * />
 */
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  description,
  triggerButton,
  confirmButton = {
    text: 'Confirm',
    variant: 'default',
  },
  cancelButton = {
    text: 'Cancel',
    variant: 'outline',
  },
  open,
  onOpenChange,
  onConfirm,
}) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {triggerButton && (
        <AlertDialogTrigger asChild>
          {triggerButton}
        </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant={cancelButton.variant || 'outline'}>
              {cancelButton.text || 'Cancel'}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant={confirmButton.variant || 'default'}
              onClick={handleConfirm}
              {confirmButton.text || 'Confirm'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
