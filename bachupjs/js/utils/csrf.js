/**
 * CSRF Token Helper Functions
 */

/**
 * Refresh the CSRF token
 * This is useful when a token expires or a 419 error is received
 *
 * @returns {Promise<string>} The new CSRF token
 */
export const refreshCsrfToken = async () => {
    try {
        console.log('Starting CSRF token refresh');

        // First clear old cookies to avoid conflicts
        document.cookie = 'XSRF-TOKEN=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        // First try the sanctum/csrf-cookie endpoint
        const csrfResponse = await fetch('/sanctum/csrf-cookie', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Cache-Control': 'no-cache, no-store'
            }
        });

        if (!csrfResponse.ok) {
            console.warn('Failed to get CSRF cookie from sanctum endpoint:', csrfResponse.status);
        }

        // Wait a moment for cookies to be set
        await new Promise(resolve => setTimeout(resolve, 500));

        // Try to get the XSRF-TOKEN from cookies
        const xsrfToken = getCookie('XSRF-TOKEN');
        if (xsrfToken) {
            const decodedToken = decodeURIComponent(xsrfToken);

            // Update meta tag
            updateMetaToken(decodedToken);

            // Update axios headers
            updateAxiosToken(decodedToken);

            console.log('CSRF token refreshed from cookie:', decodedToken.substring(0, 10) + '...');
            return decodedToken;
        }

        // If no cookie was set, try the backup endpoint
        const response = await fetch('/get-csrf-token', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Cache-Control': 'no-cache, no-store'
            },
            credentials: 'include'
        });

        if (!response.ok) {
            // Try debug endpoint as a third option
            const debugResponse = await fetch('/debug/get-token', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Cache-Control': 'no-cache, no-store'
                }
            });

            if (debugResponse.ok) {
                const debugData = await debugResponse.json();
                if (debugData.csrf_token) {
                    // Update meta tag and axios headers
                    updateMetaToken(debugData.csrf_token);
                    updateAxiosToken(debugData.csrf_token);

                    console.log('CSRF token refreshed from debug endpoint:', debugData.csrf_token.substring(0, 10) + '...');

                    // Set token in cookies for consistency
                    document.cookie = `XSRF-TOKEN=${encodeURIComponent(debugData.csrf_token)}; path=/`;

                    // Add a bypass debug cookie for development
                    if (process.env.NODE_ENV === 'development') {
                        document.cookie = 'BYPASS_CSRF=1; path=/';
                    }

                    return debugData.csrf_token;
                }
            }

            throw new Error(`Failed to refresh CSRF token: ${response.status}`);
        }

        const data = await response.json();

        // Update meta tag and axios headers
        updateMetaToken(data.csrf_token);
        updateAxiosToken(data.csrf_token);

        // Set token in cookies for consistency
        document.cookie = `XSRF-TOKEN=${encodeURIComponent(data.csrf_token)}; path=/`;

        console.log('CSRF token refreshed from endpoint:', data.csrf_token.substring(0, 10) + '...');
        return data.csrf_token;
    } catch (error) {
        console.error('Error refreshing CSRF token:', error);

        // Try direct fallback route specifically for CSRF
        try {
            const fallbackResponse = await fetch('/debug/csrf', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Cache-Control': 'no-cache, no-store'
                }
            });

            if (fallbackResponse.ok) {
                const data = await fallbackResponse.json();
                if (data.meta_token) {
                    updateMetaToken(data.meta_token);
                    updateAxiosToken(data.meta_token);

                    // Set token in cookies for consistency
                    document.cookie = `XSRF-TOKEN=${encodeURIComponent(data.meta_token)}; path=/`;

                    return data.meta_token;
                }
            }
        } catch (fallbackError) {
            console.error('Fallback CSRF token request failed:', fallbackError);
        }

        // As a last resort, try to get the token from the meta tag
        const tokenElement = document.querySelector('meta[name="csrf-token"]');
        const metaToken = tokenElement ? tokenElement.getAttribute('content') : null;

        if (metaToken) {
            updateAxiosToken(metaToken);

            // Set token in cookies for consistency
            document.cookie = `XSRF-TOKEN=${encodeURIComponent(metaToken)}; path=/`;

            return metaToken;
        }

        console.error('All CSRF token refresh methods failed');
        return null;
    }
};

/**
 * Force synchronize token with server
 * This is a more aggressive approach to ensure the token is correct
 */
export const forceTokenSync = async () => {
    try {
        // Force clear all cookies
        document.cookie = 'XSRF-TOKEN=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'laravel_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        // Get a fresh token from the server
        const response = await fetch('/sanctum/csrf-cookie', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Cache-Control': 'no-cache, no-store'
            }
        });

        // Give time for cookies to be set
        await new Promise(resolve => setTimeout(resolve, 500));

        // Get token from cookie
        const xsrfToken = getCookie('XSRF-TOKEN');
        if (xsrfToken) {
            const decodedToken = decodeURIComponent(xsrfToken);
            updateMetaToken(decodedToken);
            updateAxiosToken(decodedToken);
            console.log('Token force synced:', decodedToken.substring(0, 10) + '...');
            return decodedToken;
        }

        // Fallback to regular refresh
        return await refreshCsrfToken();
    } catch (error) {
        console.error('Force token sync failed:', error);
        return null;
    }
};

/**
 * Alias for refreshCsrfToken - added to match function name in Login component
 *
 * @returns {Promise<string>} The CSRF token
 */
export const fetchCSRFToken = async () => {
    // For login specifically, use the force sync to ensure token matching
    return await forceTokenSync();
};

/**
 * Get a cookie by name
 */
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

/**
 * Update the meta tag with a new token
 */
const updateMetaToken = (token) => {
    const tokenElement = document.querySelector('meta[name="csrf-token"]');
    if (tokenElement) {
        tokenElement.setAttribute('content', token);
    } else {
        // If no meta tag exists, create one
        const meta = document.createElement('meta');
        meta.name = 'csrf-token';
        meta.content = token;
        document.head.appendChild(meta);
    }
};

/**
 * Update axios headers with the token
 */
const updateAxiosToken = (token) => {
    if (window.axios) {
        window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
        // Also set X-XSRF-TOKEN which Laravel may check
        window.axios.defaults.headers.common['X-XSRF-TOKEN'] = token;

        // Ensure credentials are included with each request
        window.axios.defaults.withCredentials = true;
    }
};

/**
 * Initialize CSRF handling on page load
 * This is useful to call when initializing your application
 */
export const initCsrf = () => {
    // Set up initial token from meta tag
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (token) {
        updateAxiosToken(token);
        // Set token in cookies for consistency
        document.cookie = `XSRF-TOKEN=${encodeURIComponent(token)}; path=/`;
        console.log('CSRF initialized with token:', token.substring(0, 10) + '...');
    } else {
        console.warn('No CSRF token found in meta tag');
        // Try to immediately refresh the token
        refreshCsrfToken().then(newToken => {
            if (newToken) {
                console.log('CSRF token refreshed during initialization');
            } else {
                console.error('Failed to initialize CSRF token');
            }
        });
    }

    // Add debug bypass for development
    if (process.env.NODE_ENV === 'development') {
        document.cookie = 'BYPASS_CSRF=1; path=/';
    }

    // Listen for 419 responses and automatically refresh the token
    if (window.axios) {
        window.axios.interceptors.response.use(
            response => response,
            async error => {
                if (error.response && (error.response.status === 419 || error.response.status === 401)) {
                    console.log('CSRF token expired (419). Refreshing...');
                    try {
                        // Use force sync for 419 errors
                        const newToken = await forceTokenSync();
                        if (!newToken) {
                            console.error('Failed to get a new CSRF token');
                            return Promise.reject(error);
                        }

                        console.log('Successfully refreshed CSRF token after 419 error');

                        // Retry the failed request with the new token
                        const originalRequest = error.config;
                        if (originalRequest && !originalRequest._retry) {
                            originalRequest._retry = true;

                            // Update the token in request headers
                            originalRequest.headers['X-CSRF-TOKEN'] = newToken;
                            originalRequest.headers['X-XSRF-TOKEN'] = newToken;

                            // Add bypass header in development
                            if (process.env.NODE_ENV === 'development') {
                                originalRequest.headers['X-Bypass-CSRF'] = '1';
                            }

                            // If the original request was posting form data with a token
                            if (originalRequest.data) {
                                try {
                                    // Handle FormData
                                    if (originalRequest.data instanceof FormData) {
                                        originalRequest.data.set('_token', newToken);
                                        if (process.env.NODE_ENV === 'development') {
                                            originalRequest.data.set('_bypass_csrf', '1');
                                        }
                                    }
                                    // Handle JSON data - need to parse and reserialize
                                    else if (typeof originalRequest.data === 'string') {
                                        try {
                                            const jsonData = JSON.parse(originalRequest.data);
                                            if (jsonData._token) {
                                                jsonData._token = newToken;
                                                if (process.env.NODE_ENV === 'development') {
                                                    jsonData._bypass_csrf = '1';
                                                }
                                                originalRequest.data = JSON.stringify(jsonData);
                                            }
                                        } catch (e) {
                                            console.error('Error updating token in JSON string', e);
                                        }
                                    }
                                    // Handle object data
                                    else if (typeof originalRequest.data === 'object' && originalRequest.data._token) {
                                        originalRequest.data._token = newToken;
                                        if (process.env.NODE_ENV === 'development') {
                                            originalRequest.data._bypass_csrf = '1';
                                        }
                                    }
                                } catch (e) {
                                    console.error('Error updating token in request data:', e);
                                }
                            }

                            return window.axios(originalRequest);
                        }
                    } catch (refreshError) {
                        console.error('Failed to refresh CSRF token:', refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );
    }
};

export default {
    refreshCsrfToken,
    fetchCSRFToken,
    forceTokenSync,
    initCsrf
};
