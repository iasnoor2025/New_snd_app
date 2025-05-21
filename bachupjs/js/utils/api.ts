import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { router } from '@inertiajs/react';
import { getErrorMessage, retryWithBackoff } from '@/utils/error-utils';

// Token expiration check
const isTokenExpired = (expiresAt: string | null): boolean => {
    if (!expiresAt) return true;
    return new Date(expiresAt) <= new Date();
};

/**
 * Creates a configured axios instance with interceptors for CSRF handling
 * @param config Optional axios configuration
 * @returns Configured axios instance
 */
export const createApiClient = (config: AxiosRequestConfig = {}): AxiosInstance => {
  // Create axios instance with default config
  const api = axios.create({
    baseURL: '/api',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    timeout: 15000, // 15 second timeout
    validateStatus: (status) => status < 500 // Retry on 5xx errors
  })

  // Add request interceptor
  api.interceptors.request.use(
    async (config) => {
      try {
        // Get CSRF token from meta tag
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) {
          config.headers['X-CSRF-TOKEN'] = token;
        }

        // Get Sanctum token from session storage
        const sanctumToken = sessionStorage.getItem('sanctum_token');
        const tokenExpiresAt = sessionStorage.getItem('token_expires_at');

        // Check if token is expired or about to expire (within 5 minutes)
        if (sanctumToken && isTokenExpired(tokenExpiresAt)) {
          try {
            // Try to refresh the token
            const refreshResponse = await axios.post('/api/tokens/refresh', {}, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': `Bearer ${sanctumToken}`
              },
              withCredentials: true,
              validateStatus: (status) => status < 500
            })

            if (refreshResponse.data?.token) {
              sessionStorage.setItem('sanctum_token', refreshResponse.data.token);
              sessionStorage.setItem('token_expires_at', refreshResponse.data.expires_at);
              config.headers['Authorization'] = `Bearer ${refreshResponse.data.token}`;
            } else {
              throw new Error('Invalid token refresh response');
            }
          } catch (refreshError: any) {
            console.error('Token refresh failed:', refreshError);
            if (refreshError.response?.status === 401 || refreshError.response?.status === 403) {
              // Clear tokens and redirect to login
              sessionStorage.removeItem('sanctum_token');
              sessionStorage.removeItem('token_expires_at');
              window.location.href = '/login';
              return Promise.reject(refreshError);
            }
            // For other errors, try to continue with the current token
            if (sanctumToken) {
              config.headers['Authorization'] = `Bearer ${sanctumToken}`;
            }
          }
        } else if (sanctumToken) {
          config.headers['Authorization'] = `Bearer ${sanctumToken}`;
        }

        return config;
      } catch (error) {
        console.error('Error in request interceptor:', error);
        return Promise.reject(error);
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If the error is 401 and we haven't tried to refresh the token yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Try to refresh the token
          const response = await api.post('/api/tokens/refresh', {}, {
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('sanctum_token')}`
            },
            validateStatus: (status) => status < 500
          })

          if (response.data?.token) {
            // Store the new token
            sessionStorage.setItem('sanctum_token', response.data.token);
            sessionStorage.setItem('token_expires_at', response.data.expires_at);

            // Update the original request with the new token
            originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;

            // Retry the original request
            return api(originalRequest);
          }
        } catch (refreshError: any) {
          console.error('Token refresh failed:', refreshError);
          if (refreshError.response?.status === 401 || refreshError.response?.status === 403) {
            // Clear tokens and redirect to login
            sessionStorage.removeItem('sanctum_token');
            sessionStorage.removeItem('token_expires_at');
            window.location.href = '/login';
          }
          return Promise.reject(refreshError);
        }
      }

      // Handle CSRF token mismatch
      if (error.response?.status === 419) {
        try {
          // Get new CSRF token
          await axios.get('/sanctum/csrf-cookie');
          const newToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
          if (newToken) {
            originalRequest.headers['X-CSRF-TOKEN'] = newToken;
            return api(originalRequest);
          }
        } catch (csrfError) {
          console.error('CSRF token refresh failed:', csrfError);
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};

// Create a default API client
export const apiClient = createApiClient();

/**
 * Wrapper for API GET requests with error handling
 * @param url API endpoint
 * @param config Axios request config
 * @returns Promise with response data
 */
export const apiGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  } catch (error) {
    console.error(`API GET error for ${url}:`, error);
    throw error;
  }
};

/**
 * Wrapper for API POST requests with error handling
 * @param url API endpoint
 * @param data Request payload
 * @param config Axios request config
 * @returns Promise with response data
 */
export const apiPost = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  } catch (error) {
    console.error(`API POST error for ${url}:`, error);
    throw error;
  }
};

/**
 * Wrapper for API PUT requests with error handling
 * @param url API endpoint
 * @param data Request payload
 * @param config Axios request config
 * @returns Promise with response data
 */
export const apiPut = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
  } catch (error) {
    console.error(`API PUT error for ${url}:`, error);
    throw error;
  }
};

/**
 * Wrapper for API DELETE requests with error handling
 * @param url API endpoint
 * @param config Axios request config
 * @returns Promise with response data
 */
export const apiDelete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  } catch (error) {
    console.error(`API DELETE error for ${url}:`, error);
    throw error;
  }
};

/**
 * Wrapper for API requests with retry capability for transient errors
 * @param fn API function to call
 * @param maxRetries Maximum number of retries
 * @param initialDelay Initial delay in ms
 * @returns Promise with response data
 */
export const apiWithRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  initialDelay = 1000
): Promise<T> => {
  return retryWithBackoff(fn, maxRetries, initialDelay);
};
