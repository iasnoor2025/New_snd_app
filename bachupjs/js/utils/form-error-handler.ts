import { UseFormSetError } from 'react-hook-form';
import { ZodType } from 'zod';
import { AxiosError } from 'axios';

interface ErrorResponse {
  errors?: Record<string, string[]>
  message?: string;
}

interface FormError {
  field: string;
  message: string;
  type?: string;
}

/**
 * Sets form errors based on Laravel validation errors
 */
export const setFormErrors = <T extends Record<string, any>>(
  errors: Record<string, string[]>,
  setError: UseFormSetError<T>
): void => {
  Object.entries(errors).forEach(([field, messages]) => {
    if (messages && messages.length > 0) {
      setError(field as keyof T, {
        type: 'server',
        message: messages[0],
      })
    }
  })
};

/**
 * Handles form submission errors by setting form errors
 */
export const handleFormErrors = <T extends Record<string, any>>(
  error: unknown,
  setError: UseFormSetError<T>
): string => {
  if (!error) {
    return 'An unknown error occurred';
  }

  // Handle Laravel validation errors
  if (error instanceof AxiosError) {
    const response = error.response?.data as ErrorResponse;

    if (response?.errors) {
      setFormErrors(response.errors, setError);
      return response.message || 'Please correct the errors in the form';
    }

    return response?.message || 'An error occurred during submission';
  }

  // Handle generic errors
  if (error instanceof Error) {
    return error.message;
  }

  return 'An error occurred during submission';
};

/**
 * Normalizes form values to match backend expectations
 */
export const normalizeFormValues = <T extends Record<string, any>>(
  values: T,
  schema: ZodType<any>
): Record<string, any> => {
  const result: Record<string, any> = {};

  // Convert any empty strings to null for optional fields
  Object.entries(values).forEach(([key, value]) => {
    // If value is empty string and field is optional in schema, set to null
    if (value === '') {
      const fieldSchema = schema.shape?.[key];
      if (fieldSchema && fieldSchema.isOptional()) {
        result[key] = null;
      } else {
        result[key] = value;
      }
    } else {
      result[key] = value;
    }
  })

  return result;
};

/**
 * Validates form values against a schema
 */
export const validateFormValues = <T extends Record<string, any>>(
  values: T,
  schema: ZodType<any>
): { success: boolean; errors?: FormError[] } => {
  try {
    schema.parse(values);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        errors: [{
          field: 'form',
          message: error.message
        }]
      };
    }
    return {
      success: false,
      errors: [{
        field: 'form',
        message: 'Validation failed'
      }]
    };
  }
};

export default {
  setFormErrors,
  handleFormErrors,
  normalizeFormValues,
  validateFormValues,
};
