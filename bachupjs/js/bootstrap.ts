/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
import { Ziggy } from './ziggy';
import { route as routeHelper } from './utils';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Initialize axios with error handling
try {
    window.axios = axios;
    window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    console.log('Axios initialized successfully');
} catch (error) {
    console.error('Failed to initialize Axios:', error);
}

// Make route helper globally available with error handling
try {
    if (typeof window !== 'undefined') {
        window.Ziggy = Ziggy;
        window.route = routeHelper as unknown as typeof window.route;
        console.log('Route helper initialized successfully');
    }
} catch (error) {
    console.error('Failed to initialize route helper:', error);
}

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// Initialize Pusher with error handling
try {
    window.Pusher = Pusher;
    console.log('Pusher initialized successfully');
} catch (error) {
    console.error('Failed to initialize Pusher:', error);
}

// Initialize Laravel Echo with error handling
try {
    const pusherKey = import.meta.env.VITE_PUSHER_APP_KEY;
    const pusherCluster = import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1';
    const pusherHost = import.meta.env.VITE_PUSHER_HOST;
    const pusherPort = import.meta.env.VITE_PUSHER_PORT;
    const pusherScheme = import.meta.env.VITE_PUSHER_SCHEME ?? 'https';

    console.log('WebSocket configuration:', {
        key: pusherKey ? '***' : 'not set',
        cluster: pusherCluster,
        host: pusherHost,
        port: pusherPort,
        scheme: pusherScheme
    })

    if (!pusherKey) {
        console.warn('Pusher key is not defined. WebSocket functionality will be disabled.');
    } else {
        window.Echo = new Echo({
            broadcaster: 'pusher',
            key: pusherKey,
            cluster: pusherCluster,
            wsHost: pusherHost ? pusherHost : `ws-${pusherCluster}.pusher.com`,
            wsPort: pusherPort ? parseInt(pusherPort) : 80,
            wssPort: pusherPort ? parseInt(pusherPort) : 443,
            forceTLS: pusherScheme === 'https',
            enabledTransports: ['ws', 'wss'],
            disableStats: true,
            encrypted: true,
        })

        // Add connection event listeners
        window.Echo.connector.pusher.connection.bind('connected', () => {
            console.log('WebSocket connected successfully');
        })

        window.Echo.connector.pusher.connection.bind('error', (error: any) => {
            console.error('WebSocket connection error:', error);
        })

        window.Echo.connector.pusher.connection.bind('disconnected', () => {
            console.warn('WebSocket disconnected');
        })

        window.Echo.connector.pusher.connection.bind('connecting', () => {
            console.log('WebSocket connecting...');
        })

        window.Echo.connector.pusher.connection.bind('failed', () => {
            console.error('WebSocket connection failed');
        })

        window.Echo.connector.pusher.connection.bind('message', (message: any) => {
            console.log('WebSocket message received:', message);
        })

        console.log('Laravel Echo initialized successfully');
    }
} catch (error) {
    console.error('Failed to initialize WebSocket:', error);
}
