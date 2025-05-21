import { useState } from 'react';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { getErrorMessage } from '@/utils/error-utils';
import { router } from '@inertiajs/react';

interface UseFormSubmitOptions<T> {
  /**
   * The route to submit the form to
   */
  route: string;

  /**
   * HTTP method to use for submission
   */
  method?: 'post' | 'put' | 'patch';

  /**
   * Called on successful submission with the server response
   */
  onSuccess?: (data: any) => void;

  /**
   * Custom error handler for form submission errors
   */
  onError?: (error: string, errors?: Record<string, string[]>) => void;

  /**
   * Success message to display after successful submission
   */
  successMessage?: string;

  /**
   * Whether to reset the form after successful submission
   */
  resetOnSuccess?: boolean;

  /**
   * Whether to preserve form state for Inertia
   */
  preserveState?: boolean;

  /**
   * Whether to preserve scroll position for Inertia
   */
  preserveScroll?: boolean;

  /**
   * Whether to redirect on successful submission using the location in the response
   */
  useRedirect?: boolean;
}

/**
 * Custom hook for handling form submissions with consistent error handling
 * @param options Configuration options for the form submission
 * @returns Form submission handler and loading state
 */
export const useFormSubmit = <T>(options: UseFormSubmitOptions<T>) => {
  const {
    route,
    method = 'post',
    onSuccess,
    onError,
    successMessage,
    resetOnSuccess = true,
    preserveState = true,
    preserveScroll = true,
    useRedirect = false,
  } = options;

  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handles form submission with consistent error handling
   * @param data Form data to submit
   */
  const handleSubmit = async (data: T) => {
    setIsSubmitting(true);

    try {
      router.visit(route, {
        method,
        data,
        preserveState,
        preserveScroll,
        onSuccess: (page) => {
          setIsSubmitting(false);

          // Show success message if provided
          if (successMessage) {
            toast.success(successMessage);
          }

          // Call custom success handler if provided
          if (onSuccess) {
            onSuccess(page);
          }

          // Redirect if useRedirect is true and there's a redirect location
          if (useRedirect && page.props.redirect) {
            router.visit(page.props.redirect);
          }
        },
        onError: (errors) => {
          setIsSubmitting(false);

          // Handle validation errors
          if (Object.keys(errors).length > 0) {
            // Call custom error handler if provided
            if (onError) {
              onError(
                'Please correct the errors below.',
                errors as Record<string, string[]>
              );
            } else {
              // Default error handling - show toast with first error
              const firstError = Object.values(errors)[0];
              toast.error(
                Array.isArray(firstError) ? firstError[0] : firstError
              );
            }
          }
        },
        onFinish: () => {
          setIsSubmitting(false);
        }
      })
    } catch (error) {
      setIsSubmitting(false);

      // Handle unexpected errors
      const errorMessage = getErrorMessage(error);

      if (onError) {
        onError(errorMessage);
      } else {
        toast.error(`An error occurred: ${errorMessage}`);
      }

      console.error('Form submission error:', error);
    }
  };

  return {
    handleSubmit,
    isSubmitting,
  };
};
