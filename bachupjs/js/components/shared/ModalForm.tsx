import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import FormProvider from '@/components/shared/FormProvider';
import { z } from 'zod';
import { SubmitHandler } from 'react-hook-form';

interface ModalFormProps<T extends z.ZodType<any, any>> {
  trigger: ReactNode;
  title: string;
  description?: string;
  schema: T;
  defaultValues?: z.infer<T>
  onSubmit: SubmitHandler<z.infer<T>>
  children: ReactNode | ((close: () => void) => ReactNode);
  submitText?: string;
  cancelText?: string;
  successMessage?: string;
  errorMessage?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

/**
 * A reusable modal form component that combines Dialog with FormProvider
 *
 * @example
 * <ModalForm
 *   trigger={<Button>Add Customer</Button>}
 *   title="Create New Customer"
 *   description="Enter customer details"
 *   schema={customerSchema}
 *   defaultValues={{ company_name: '', contact_person: '' }}
 *   onSubmit={handleCreateCustomer}
 *   successMessage="Customer created successfully"
 * >
 *   {(close) => (
 *     <>
 *       <FormField
 *         name="company_name"
 *         label="Company Name"
 *         placeholder="Enter company name"
 *       />
 *       <FormField
 *         name="contact_person"
 *         label="Contact Person"
 *         placeholder="Enter contact person name"
 *       />
 *       <DialogFooter>
 *         <Button type="button" variant="outline" onClick={close}>Cancel</Button>
 *         <Button type="submit">Submit</Button>
 *       </DialogFooter>
 *     </>
 *   )}
 * </ModalForm>
 */
export default function ModalForm<T extends z.ZodType<any, any>>({
  trigger,
  title,
  description,
  schema,
  defaultValues,
  onSubmit,
  children,
  submitText = 'Submit',
  cancelText = 'Cancel',
  successMessage,
  errorMessage,
  isOpen,
  onOpenChange,
  size = 'md',
}: ModalFormProps<T>) {
  const [open, setOpen] = React.useState(false);

  // Use controlled state if provided, otherwise use internal state
  const dialogOpen = isOpen !== undefined ? isOpen : open;
  const setDialogOpen = onOpenChange || setOpen;

  // Determine dialog content max width based on size
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-[95vw]'
  };

  const handleSubmit: SubmitHandler<z.infer<T>> = async (data) => {
    try {
      await onSubmit(data);
      setDialogOpen(false);
    } catch (error) {
      // Error handling is done by FormProvider
      console.error('Modal form submission error:', error);
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className={sizeClasses[size]}>
        <FormProvider
          schema={schema}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          successMessage={successMessage}
          errorMessage={errorMessage}
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>

          <div className="py-4">
            {typeof children === 'function' ? children(handleClose) : children}
          </div>

          {typeof children !== 'function' && (
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                {cancelText}
              </Button>
              <Button type="submit">
                {submitText}
              </Button>
            </DialogFooter>
          )}
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
