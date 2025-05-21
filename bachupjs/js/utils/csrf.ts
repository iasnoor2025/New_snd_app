import axios from 'axios';

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Track token refresh attempts to prevent infinite loops
let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 3;

/**
 * Fetch a fresh CSRF token from the sanctum endpoint with proper delay
 */
export const fetchCSRFToken = async (): Promise<string | null> => {
    if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
        console.error('Max CSRF token refresh attempts reached');
        return null;
    }

    refreshAttempts++;

    try {
        console.log('Fetching fresh CSRF token...');

        // Make a request to get a CSRF cookie
        const response = await axios.get('/sanctum/csrf-cookie', {
            withCredentials: true,
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        });

        // Give the browser time to set the cookie
        await new Promise(resolve => setTimeout(resolve, 100));

        // Get token from cookie
        const token = getCSRFTokenFromCookie();

        if (token) {
            console.log('CSRF token fetched successfully');
            refreshAttempts = 0; // Reset counter on success
            return token;
        } else {
            console.error('Failed to get CSRF token from cookie after fetch');
            return null;
        }
    } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
        return null;
    }
};

/**
 * Get CSRF token from cookies
 */
export const getCSRFTokenFromCookie = (): string | null => {
    // Check for Laravel's XSRF-TOKEN cookie
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('XSRF-TOKEN=')) {
            try {
                const encodedValue = cookie.substring('XSRF-TOKEN='.length);
                const token = decodeURIComponent(encodedValue);
                return token;
            } catch (error) {
                console.error('Error decoding CSRF token from cookie:', error);
            }
        }
    }
    return null;
};

/**
 * Force a CSRF token refresh by clearing current token and fetching a new one
 */
export const forceRefreshCSRFToken = async (): Promise<string | null> => {
    // Clear any existing CSRF cookies
    document.cookie = 'XSRF-TOKEN=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'laravel_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    // Fetch a fresh token
    return await fetchCSRFToken();
};

/**
 * Set up Axios to use CSRF tokens
 */
export const setupAxiosCSRF = (): void => {
    // Request interceptor to add CSRF token to headers
    axios.interceptors.request.use(
        async (config) => {
            // Skip for the CSRF token endpoint itself
            if (config.url === '/sanctum/csrf-cookie') {
                return config;
            }

            // Get token (or fetch if needed)
            let token = getCSRFTokenFromCookie();
            if (!token) {
                token = await fetchCSRFToken();
            }

            // Add token to headers if available
            if (token) {
                config.headers['X-CSRF-TOKEN'] = token;
                config.headers['X-XSRF-TOKEN'] = token;
            }

            return config;
        },
        (error) => Promise.reject(error)
    );

    // Response interceptor to handle CSRF errors
    axios.interceptors.response.use(
        response => response,
        async (error) => {
            const originalRequest = error.config;

            // Handle CSRF token mismatch (419)
            if (error.response?.status === 419 && !originalRequest._retry) {
                console.log('CSRF token mismatch. Refreshing token...');
                originalRequest._retry = true;

                try {
                    // Force a completely fresh token
                    const newToken = await forceRefreshCSRFToken();

                    if (newToken) {
                        // Update headers and retry
                        originalRequest.headers['X-CSRF-TOKEN'] = newToken;
                        originalRequest.headers['X-XSRF-TOKEN'] = newToken;
                        console.log('Retrying request with fresh token');
                        return axios(originalRequest);
                    } else {
                        console.error('Failed to refresh CSRF token');
                    }
                } catch (retryError) {
                    console.error('Error during token refresh:', retryError);
                }
            }

            return Promise.reject(error);
        }
    );
};

/**
 * Initialize CSRF token handling
 */
export const initCsrf = async (): Promise<void> => {
    // Get initial token
    const token = await fetchCSRFToken();

    if (!token) {
        console.warn('Failed to get initial CSRF token');
    }

    // Set up interceptors
    setupAxiosCSRF();

    console.log('CSRF protection initialized');
};

// For backwards compatibility
export const initCSRF = initCsrf;
