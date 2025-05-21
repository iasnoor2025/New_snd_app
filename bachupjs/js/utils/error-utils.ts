import { AxiosError } from 'axios';

/**
 * Gets a user-friendly error message from various error types
 * @param error Any error type
 * @returns A formatted error message string
 */
export const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
        // Handle Axios errors
        if (error.response?.status === 404) {
            return 'The requested resource was not found';
        } else if (error.response?.status === 403) {
            return 'You do not have permission to access this resource';
        } else if (error.response?.status === 401) {
            return 'Your session has expired. Please refresh the page and try again';
        } else if (error.response?.status === 409) {
            return 'The document service is currently processing another request. Please try again in a moment.';
        } else if (error.response?.status === 413) {
            return 'The file you are trying to upload is too large';
        } else if (error.response?.status === 415) {
            return 'The file type is not supported';
        } else if (error.response?.status === 422) {
            // Validation errors
            const validationErrors = error.response.data?.errors;
            if (validationErrors) {
                const errorMessages = Object.values(validationErrors).flat();
                return errorMessages.join(', ');
            }
            return error.response.data?.message || 'Validation failed';
        } else if (error.response?.status === 500) {
            return 'An internal server error occurred. Please try again later';
        }

        // Generic error with status code
        return `Request failed with status code ${error.response?.status || 'unknown'}: ${error.response?.data?.message || error.message}`;
    } else if (error instanceof Error) {
        // Handle standard JS errors
        return error.message;
    } else if (typeof error === 'string') {
        // Handle string errors
        return error;
    }

    // Fallback for unknown error types
    return 'An unknown error occurred';
};

/**
 * Enhanced retry with backoff function with better handling for 409 conflicts
 * @param fn The function to retry
 * @param maxRetries Maximum number of retries
 * @param initialDelay Initial delay in ms
 * @returns The function result or throws an error
 */
export const retryWithBackoff = async (fn: () => Promise<any>, maxRetries = 5, initialDelay = 1000): Promise<any> => {
    let retries = 0;

    const execute = async (): Promise<any> => {
        try {
            return await fn();
        } catch (err) {
            if (retries >= maxRetries) {
                console.error(`Max retries (${maxRetries}) exceeded, giving up`);
                throw err;
            }

            // Check specifically for 409 conflicts
            if (err instanceof AxiosError && err.response?.status === 409) {
                retries++;

                // Add more randomness to prevent retry storms and increase with each retry
                const jitter = Math.random() * 2000 * retries;
                // More aggressive backoff for conflicts
                const delay = initialDelay * Math.pow(2.5, retries) + jitter;

                console.info(`409 Conflict detected on retry ${retries}/${maxRetries}, waiting ${delay.toFixed(2)}ms`);

                await new Promise(resolve => setTimeout(resolve, delay));
                return execute();
            }

            // Other errors use standard backoff with less aggressive timing
            retries++;
            const jitter = Math.random() * 1000;
            const delay = initialDelay * Math.pow(1.5, retries) + jitter;

            console.info(`Error on retry ${retries}/${maxRetries}, waiting ${delay.toFixed(2)}ms`, {
                status: err instanceof AxiosError ? err.response?.status : 'unknown'
            })

            await new Promise(resolve => setTimeout(resolve, delay));
            return execute();
        }
    };

    return execute();
};
