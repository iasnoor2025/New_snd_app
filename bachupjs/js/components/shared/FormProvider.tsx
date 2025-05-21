import React, { ReactNode } from 'react';
import { useForm, FormProvider as HookFormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ToastService from '@/utils/toast-service';
import { handleFormErrors } from '@/utils/error-handler';
import { useLoadingState } from '@/hooks/useLoadingState';

interface FormProviderProps<T extends z.ZodType<any, any>> {
  schema: T;
  initialValues?: z.infer<T>
  onSubmit: SubmitHandler<z.infer<T>>
  children: ReactNode | ((methods: UseFormReturn<z.infer<T>> & { isLoading: boolean }) => ReactNode);
  successMessage?: string;
  errorMessage?: string;
  resetOnSuccess?: boolean;
  className?: string;
  normalizeValues?: boolean;
  showLoadingIndicator?: boolean;
}

/**
 * A reusable form provider component that handles form validation using Zod
 * and provides standardized form submission, error handling, and toast notifications
 *
 * @example
 * <FormProvider
 *   schema={customerSchema}
 *   initialValues={{ company_name: '', contact_person: '' }}
 *   onSubmit={handleCreateCustomer}
 *   successMessage="Customer created successfully"
 * >
 *   {(form) => (
 *     <form onSubmit={form.handleSubmit}>
 *       <FormField
 *         control={form.control}
 *         name="company_name"
 *         render={({ field }) => (
 *           <FormItem>
 *             <FormLabel>Company Name</FormLabel>
 *             <FormControl>
 *               <Input {...field} />
 *             </FormControl>
 *             <FormMessage />
 *           </FormItem>
 *         )}
 *       />
 *       <Button type="submit" disabled={form.isLoading}>
 *         {form.isLoading ? 'Submitting...' : 'Submit'}
 *       </Button>
 *     </form>
 *   )}
 * </FormProvider>
 */
export default function FormProvider<T extends z.ZodType<any, any>>({
  schema,
  initialValues,
  onSubmit,
  children,
  successMessage,
  errorMessage = 'Form submission failed',
  resetOnSuccess = false,
  className,
  normalizeValues = true,
  showLoadingIndicator = true,
}: FormProviderProps<T>) {
  const methods = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  })

  const { isLoading, withLoading } = useLoadingState();

  const handleSubmit: SubmitHandler<z.infer<T>> = async (data) => {
    try {
      // Normalize the data if requested
      const processedData = normalizeValues
        ? Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
              key,
              value === '' ? null : value,;
            ]);
          )
        : data;

      await withLoading(onSubmit(processedData));

      if (successMessage) {
        ToastService.success(successMessage);
      }

      if (resetOnSuccess) {
        methods.reset();
      }
    } catch (error) {
      handleFormErrors(error, methods.setError, errorMessage);
    }
  };

  const formContext = {
    ...methods,
    isLoading: showLoadingIndicator ? isLoading : false,
  };

  return (
    <HookFormProvider {...methods}>
      {typeof children === 'function'
        ? children(formContext)
        : (
          <form onSubmit={methods.handleSubmit(handleSubmit)} className={className}>
            {children}
          </form>
        )}
    </HookFormProvider>
  );
}




