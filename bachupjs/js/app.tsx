import React from 'react';
import '../css/app.css';
import './bootstrap';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Ziggy } from './ziggy';
import { getErrorMessage } from './utils/error-utils';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { router } from '@inertiajs/react';
import { handleApiError, handleValidationError, handleUnexpectedError } from '@/utils/error-handler';
import { AxiosError } from 'axios';
import { Toaster } from './components/ui/toaster';
import { GlobalStateProvider } from './providers/GlobalStateProvider';
// Import route function from Ziggy
import route from 'ziggy-js';

// Configure Axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true; // Important for CSRF cookie

// Add a request interceptor to ensure CSRF token is included in all requests
axios.interceptors.request.use(async (config) => {
    // Get CSRF token from meta tag
    const token = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    if (token) {
        config.headers['X-CSRF-TOKEN'] = token;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
})

// Prefetch CSRF token when the app starts
const prefetchCsrfToken = async () => {
    try {
        // This will set the CSRF cookie
        await axios.get('/sanctum/csrf-cookie');
        console.log('CSRF cookie set successfully');
    } catch (error) {
        console.error('Failed to set CSRF cookie:', error);
    }
};

prefetchCsrfToken();

// Create an axios instance for API calls that automatically includes CSRF token
const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})

// Add a response interceptor for handling common errors
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle specific HTTP errors
            if (error.response.status === 419) {
                console.error('CSRF token mismatch. Refreshing token...');
                // Try to get a fresh CSRF token and retry the request
                return axios.get('/sanctum/csrf-cookie')
                    .then(() => {
                        // Clone the original request and retry
                        const originalRequest = error.config;
                        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
                        if (token) {
                            originalRequest.headers['X-CSRF-TOKEN'] = token;
                        }
                        return axios(originalRequest);
                    })
            }

            // Handle authentication errors
            if (error.response.status === 401) {
                console.error('Authentication error. Redirecting to login...');
                // Redirect to login page or show login modal
                window.location.href = '/login';
            }
        }
        console.error('Axios interceptor caught an error:', error);
        return Promise.reject(error);
    }
);

// Make the api instance available globally
window.api = api;

console.log('Axios configuration completed');

// Add TypeScript declarations for window properties and import.meta
declare global {
    interface Window {
        config: any;
        Ziggy: {
            url: string;
            port: null;
            defaults: Record<string, any>
            routes: Record<string, {
                uri: string;
                methods: string[];
            }>
        };
    }

    interface ImportMeta {
        env: Record<string, any>
        glob: (path: string) => Record<string, () => Promise<any>>
    }
}

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: (failureCount, error) => {
                // Don't retry on validation errors
                if (error instanceof AxiosError && error.response?.status === 422) {
                    return false;
                }
                // Retry up to 3 times for other errors
                return failureCount < 3;
            },
            onError: (error: unknown) => {
                handleApiError(error);
                console.error('Query error:', error);
            }
        },
        mutations: {
            onError: (error: unknown) => {
                handleApiError(error);
                console.error('Mutation error:', error);
            }
        }
    },
})

// Make Ziggy globally available with static routes initially
try {
    if (typeof window !== 'undefined') {
        window.Ziggy = Ziggy || {
            url: '',
            port: null,
            defaults: {},
            routes: {}
        };
    }
    console.log('Ziggy initialized globally');
} catch (error) {
    console.error('Error initializing Ziggy:', error);
}

// Add Inertia visit interceptor for consistent headers
router.on('before', (event) => {
    try {
        // Set the X-Inertia header
        event.detail.visit.headers['X-Inertia'] = 'true';

        // Set the Accept header for proper Inertia response
        event.detail.visit.headers['Accept'] = 'text/html, application/xhtml+xml';

        // Add CSRF token to all requests
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) {
            event.detail.visit.headers['X-CSRF-TOKEN'] = token;
        }
        console.log('Inertia visit headers set');
    } catch (error) {
        console.error('Error setting Inertia visit headers:', error);
    }
})

// Helper to safely initialize Ziggy
function initializeZiggy(ziggyData: any) {
    try {
        if (!ziggyData) return;

        if (typeof window !== 'undefined') {
            // Merge server-provided routes with static routes
            window.Ziggy = {
                ...window.Ziggy,
                ...ziggyData,
                routes: {
                    ...(window.Ziggy?.routes || {}),
                    ...(ziggyData.routes || {})
                }
            };
        }
        console.log('Ziggy data initialized');
    } catch (error) {
        console.error('Error initializing Ziggy data:', error);
    }
}

// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
                        <p className="text-gray-600 mb-4">We're sorry, but there was an error loading the application.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

createInertiaApp({
    title: (title) => `${title} - SND Rental`,
    resolve: (name) => {
        // Skip the problematic component
        if (name === 'Equipment/Depreciation/EquipmentDepreciationDetail') {
            return Promise.resolve({
                default: () => <div className="p-8">
                    <h1 className="text-2xl font-bold mb-4">Equipment Depreciation Detail</h1>
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-md">
                        <p>This component is temporarily unavailable for maintenance.</p>
                        <p>Please check back later.</p>
                    </div>
                </div>
            });
        }

        // Special case for Employees/Index which has case sensitivity issues
        if (name.toLowerCase() === 'employees/index') {
            // Import directly using require.context to bypass case sensitivity
            const pages = import.meta.glob('./pages/**/*.tsx');
            const page = Object.keys(pages).find(
                path => path.toLowerCase().endsWith('/employees/index.tsx')
            );

            if (page) {
                return pages[page]();
            }
        }

        // Special case for Auth pages to ensure consistent capitalization
        if (name.toLowerCase().startsWith('auth/')) {
            const pages = import.meta.glob('./pages/**/*.tsx');
            const pageName = name.split('/').pop(); // Get the page name after Auth/
            const normalizedPath = `./pages/Auth/${pageName}.tsx`.toLowerCase();

            const page = Object.keys(pages).find(
                path => path.toLowerCase() === normalizedPath
            );

            if (page) {
                return pages[page]();
            }
        }

        // Special case for Error pages
        if (name.toLowerCase().startsWith('error/')) {
            const pages = import.meta.glob('./pages/**/*.tsx');
            const normalizedName = name.toLowerCase();
            const errorPage = Object.keys(pages).find(
                path => path.toLowerCase().endsWith(`/${normalizedName.split('/')[1]}.tsx`)
            );

            if (errorPage) {
                return pages[errorPage]();
            }
        }

        // Default resolver for other pages
        return resolvePageComponent(`./pages/${name}`, import.meta.glob('./pages/**/*.tsx'));
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <GlobalStateProvider>
                <App {...props} />
                <Toaster />
            </GlobalStateProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
})
