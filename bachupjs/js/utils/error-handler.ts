import { ToastService } from "@/components/shared/ToastManager";
import { AxiosError } from "axios";

interface ErrorResponse {
  message?: string;
  errors?: Record<string, string[]>
  code?: string;
  status?: number;
}

type ErrorType = 'validation' | 'authentication' | 'authorization' | 'notFound' | 'server' | 'network' | 'unknown';

interface ErrorDetails {
  type: ErrorType;
  message: string;
  code?: string;
  status?: number;
}

/**
 * Determines the type of error from an Axios error response
 */
const getErrorType = (error: AxiosError): ErrorType => {
  const status = error.response?.status;

  if (!status) return 'network';
  if (status === 401) return 'authentication';
  if (status === 403) return 'authorization';
  if (status === 404) return 'notFound';
  if (status === 422) return 'validation';
  if (status >= 500) return 'server';

  return 'unknown';
};

/**
 * Extracts error details from an error object
 */
export const extractErrorDetails = (error: unknown): ErrorDetails => {
  if (error instanceof AxiosError) {
    const response = error.response?.data as ErrorResponse;
    const type = getErrorType(error);

    return {
      type,
      message: response?.message || error.message || 'An error occurred while processing your request',
      code: response?.code,
      status: error.response?.status
    };
  }

  if (error instanceof Error) {
    return {
      type: 'unknown',
      message: error.message
    };
  }

  return {
    type: 'unknown',
    message: 'An unexpected error occurred'
  };
};

/**
 * Handles API errors and displays appropriate toast messages
 */
export const handleApiError = (error: unknown): void => {
  const details = extractErrorDetails(error);

  switch (details.type) {
    case 'validation':
      ToastService.error('Please check your input and try again');
      break;
    case 'authentication':
      ToastService.error('Your session has expired. Please log in again.');
      break;
    case 'authorization':
      ToastService.error('You do not have permission to perform this action');
      break;
    case 'notFound':
      ToastService.error('The requested resource was not found');
      break;
    case 'server':
      ToastService.error('A server error occurred. Please try again later');
      break;
    case 'network':
      ToastService.error('Network error. Please check your connection');
      break;
    default:
      ToastService.error(details.message);
  }
};

/**
 * Handles validation errors and displays appropriate toast messages
 */
export const handleValidationError = (error: unknown): void => {
  const details = extractErrorDetails(error);

  if (details.type === 'validation') {
    const response = (error as AxiosError).response?.data as ErrorResponse;
    if (response?.errors) {
      const firstError = Object.values(response.errors)[0][0];
      ToastService.error(firstError);
    } else {
      ToastService.error(details.message);
    }
  } else {
    ToastService.error('Please check your input and try again');
  }
};

/**
 * Handles unexpected errors and displays appropriate toast messages
 */
export const handleUnexpectedError = (error: unknown): void => {
  console.error('Unexpected error:', error);
  const details = extractErrorDetails(error);
  ToastService.error(details.message);
};

/**
 * Handles form errors and returns them in a format suitable for form validation
 */
export const handleFormErrors = (error: unknown): Record<string, string[]> => {
  if (error instanceof AxiosError) {
    const response = error.response?.data as ErrorResponse;
    if (response?.errors) {
      return response.errors;
    }
  }
  return {};
};
