import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { Toaster } from 'sonner';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Dynamically import all module pages (both pages and Pages, all modules)
const modulePages = {
  ...import.meta.glob('/Modules/*/resources/js/pages/**/*.tsx'),
  ...import.meta.glob('/Modules/*/resources/js/Pages/**/*.tsx'),
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        // First try to resolve from main app's pages
        try {
            return await resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx'));
        } catch (error) {
            console.log(`Page not found in main app: ${name}, checking module pages...`);

            // Try loading the page from any module
            // Try both pages and Pages, and both with and without subfolders
            const possiblePaths = [
              `/Modules/EmployeeManagement/resources/js/pages/${name}.tsx`,
              `/Modules/EmployeeManagement/resources/js/Pages/${name}.tsx`,
              `/Modules/ProjectManagement/Pages/${name}.tsx`,
              `/Modules/ProjectManagement/resources/js/Pages/${name}.tsx`,
              `/Modules/ProjectManagement/resources/js/pages/${name}.tsx`,
              // Add more patterns as needed
              `/Modules/TimesheetManagement/resources/js/pages/${name}.tsx`,
              `/Modules/TimesheetManagement/resources/js/Pages/${name}.tsx`,
              `/Modules/Settings/resources/js/pages/${name}.tsx`,
              `/Modules/Settings/resources/js/Pages/${name}.tsx`,
              `/Modules/Reporting/resources/js/pages/${name}.tsx`,
              `/Modules/Reporting/resources/js/Pages/${name}.tsx`,
              `/Modules/RentalManagement/resources/js/pages/${name}.tsx`,
              `/Modules/RentalManagement/resources/js/Pages/${name}.tsx`,
              `/Modules/Payroll/Resources/js/pages/${name}.tsx`,
              `/Modules/Payroll/Resources/js/Pages/${name}.tsx`,
              `/Modules/Notifications/resources/js/pages/${name}.tsx`,
              `/Modules/Notifications/resources/js/Pages/${name}.tsx`,
              `/Modules/MobileBridge/resources/js/pages/${name}.tsx`,
              `/Modules/MobileBridge/resources/js/Pages/${name}.tsx`,
              `/Modules/Localization/resources/js/pages/${name}.tsx`,
              `/Modules/Localization/resources/js/Pages/${name}.tsx`,
              `/Modules/LeaveManagement/resources/js/pages/${name}.tsx`,
              `/Modules/LeaveManagement/resources/js/Pages/${name}.tsx`,
              `/Modules/EquipmentManagement/resources/js/pages/${name}.tsx`,
              `/Modules/EquipmentManagement/resources/js/Pages/${name}.tsx`,
              `/Modules/CustomerManagement/resources/js/pages/${name}.tsx`,
              `/Modules/CustomerManagement/resources/js/Pages/${name}.tsx`,
              `/Modules/Core/resources/js/pages/${name}.tsx`,
              `/Modules/Core/resources/js/Pages/${name}.tsx`,
              `/Modules/AuditCompliance/resources/js/pages/${name}.tsx`,
              `/Modules/AuditCompliance/resources/js/Pages/${name}.tsx`,
              `/Modules/API/resources/js/pages/${name}.tsx`,
              `/Modules/API/resources/js/Pages/${name}.tsx`,
            ];

            for (const modulePath of possiblePaths) {
              if (modulePath in modulePages) {
                return await modulePages[modulePath]();
              }
            }

            // Try generic match for any module (robust)
            const normalizedName = name.replace(/\\/g, '/');
            console.log('Normalized name:', normalizedName);
            console.log('Module page keys:', Object.keys(modulePages));
            for (const key in modulePages) {
              // Remove extension and leading path
              const keyNoExt = key.replace(/\.tsx$/, '').replace(/\\/g, '/');
              if (keyNoExt.endsWith(`/${normalizedName}`)) {
                return await modulePages[key]();
              }
            }

            // Log available keys for debugging
            console.error(`Module page not found: ${name}`);
            console.error('Available module page keys:', Object.keys(modulePages));
            return {
                default: () => null
            };
        }
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <>
                <App {...props} />
                <Toaster richColors position="top-right" />
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
