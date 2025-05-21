import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { router } from '@inertiajs/react';

// Token expiration check
export const isTokenExpired = (expiresAt: string | null): boolean => {
  if (!expiresAt) return true;
  return new Date(expiresAt) <= new Date();
};

// Get auth token
export const getAuthToken = (): string | null => {
  return sessionStorage.getItem('sanctum_token');
};

// Set auth token
export const setAuthToken = (token: string, expiresAt: string): void => {
  sessionStorage.setItem('sanctum_token', token);
  sessionStorage.setItem('token_expires_at', expiresAt);
};

// Remove auth token
export const removeAuthToken = (): void => {
  sessionStorage.removeItem('sanctum_token');
  sessionStorage.removeItem('token_expires_at');
};

// Refresh auth token
export const refreshAuthToken = async (): Promise<boolean> => {
    try {
        // First try to get a fresh CSRF token
        await axios.get('/sanctum/csrf-cookie', {
            withCredentials: true
        })

        // Get current token
        const currentToken = getAuthToken();
        if (!currentToken) {
            console.error('No token available for refresh');
            router.visit('/login');
            return false;
        }

        const response = await axios.post('/api/tokens/refresh', {}, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': `Bearer ${currentToken}`
            },
            withCredentials: true
        })

        if (response.data?.token && response.data?.expires_at) {
            setAuthToken(response.data.token, response.data.expires_at);
            console.log('Token refreshed successfully');
            return true;
        }

        throw new Error('Invalid token response format');
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error('Failed to refresh token:', axiosError);

        if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
            removeAuthToken();
            router.visit('/login');
        }

        return false;
    }
};

// Ensure valid auth token
export const ensureValidAuthToken = async (): Promise<boolean> => {
  const token = getAuthToken();
  const expiresAt = sessionStorage.getItem('token_expires_at');

  if (!token || isTokenExpired(expiresAt)) {
    return await refreshAuthToken();
  }

  return true;
};

interface QueueItem {
  resolve: () => void;
  reject: (error: any) => void;
}

// Setup axios auth interceptor
export const setupAuthInterceptor = (): void => {
    let isRefreshing = false;
    let failedQueue: QueueItem[] = [];

    const processQueue = (error: any = null) => {
        failedQueue.forEach(prom => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve();
            }
        })
        failedQueue = [];
    };

    axios.interceptors.request.use(
        async (config) => {
            // Ensure withCredentials is set
            config.withCredentials = true;

            // Add CSRF token
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            if (token) {
                config.headers['X-CSRF-TOKEN'] = token;
            }

            // Add auth token if available
            const authToken = getAuthToken();
            if (authToken) {
                config.headers['Authorization'] = `Bearer ${authToken}`;
            }

            return config;
        },
        (error) => Promise.reject(error)
    );

    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

            // Handle unauthorized access
            if (error.response?.status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise<void>((resolve, reject) => {
                        failedQueue.push({ resolve, reject })
                    })
                        .then(() => axios(originalRequest))
                        .catch((err) => Promise.reject(err));
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const refreshed = await refreshAuthToken();
                    if (refreshed) {
                        const authToken = getAuthToken();
                        if (authToken && originalRequest.headers) {
                            originalRequest.headers['Authorization'] = `Bearer ${authToken}`;
                        }
                        processQueue();
                        return axios(originalRequest);
                    }
                } catch (refreshError) {
                    processQueue(refreshError);
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    );
};
