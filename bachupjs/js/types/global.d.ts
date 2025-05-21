import { Echo } from 'laravel-echo';
import Pusher from 'pusher-js';
import { Ziggy } from '../ziggy';
import { route as routeHelper } from '../utils';

declare global {
    interface Window {
        axios: any;
        Echo: Echo;
        Pusher: typeof Pusher;
        Ziggy: typeof Ziggy;
        route: typeof routeHelper;
        refreshCsrfToken: () => Promise<string | null>;
    }
}

export {};

// Global augmentation for the Window interface to add our custom properties
interface Window {
  config: {
    erp_base_url?: string;
    version?: string;
    [key: string]: any; // Allow any additional properties
  };
}
