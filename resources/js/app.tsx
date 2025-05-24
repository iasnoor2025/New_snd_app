import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Load all employee module pages using glob imports that Vite can analyze
const employeePages = import.meta.glob('/Modules/EmployeeManagement/resources/js/pages/Employees/*.tsx');

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        // First try to resolve from main app's pages
        try {
            return await resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx'));
        } catch (error) {
            console.log(`Page not found in main app: ${name}, checking module pages...`);

            // Try loading the page from a module
            const modulePath = `/Modules/EmployeeManagement/resources/js/pages/${name}.tsx`;

            if (modulePath in employeePages) {
                return await employeePages[modulePath]();
            }

            console.error(`Module page not found: ${modulePath}`);
            return {
                default: () => null
            };
        }
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
