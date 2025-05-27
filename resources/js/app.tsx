import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { Toaster } from 'sonner';
// Import Ziggy configuration
import { Ziggy } from './ziggy';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Ensure Ziggy is properly set on the window object
if (typeof window !== 'undefined') {
  // @ts-ignore - Bypassing TypeScript checking here for global Ziggy
  window.Ziggy = Ziggy;
}

// Dynamically import all module pages (both pages and Pages, all modules)
const modulePages: Record<string, () => Promise<any>> = {
  ...import.meta.glob('/Modules/*/resources/js/pages/**/*.tsx', { eager: false }),
  ...import.meta.glob('/Modules/*/resources/js/pages/**/*.jsx', { eager: false }),
};

// Helper function to find module pages by pattern
function findModulePagesByPattern(moduleNamePattern: string, pageNamePattern: string): string[] {
  return Object.keys(modulePages).filter(path =>
    path.includes(moduleNamePattern) &&
    (path.includes(pageNamePattern) || path.toLowerCase().includes(pageNamePattern.toLowerCase()))
  );
}

// Add explicit mapping for critical pages to ensure they're available
const employeePages: Record<string, string> = {
  'Employees/Index': './Modules/EmployeeManagement/resources/js/pages/Employees/Index.tsx',
  'Employees/Create': './Modules/EmployeeManagement/resources/js/pages/Employees/Create.tsx',
  'Employees/Edit': './Modules/EmployeeManagement/resources/js/pages/Employees/Edit.tsx',
  'Employees/Show': './Modules/EmployeeManagement/resources/js/pages/Employees/Show.tsx',
  'Employees/Documents': './Modules/EmployeeManagement/resources/js/pages/Employees/Documents.tsx',
  'Employees/LeaveHistory': './Modules/EmployeeManagement/resources/js/pages/Employees/LeaveHistory.tsx',
  'Employees/PerformanceManagement': './Modules/EmployeeManagement/resources/js/pages/Employees/PerformanceManagement.tsx',
  'Employees/PerformanceReviews': './Modules/EmployeeManagement/resources/js/pages/Employees/PerformanceReviews.tsx',
  'Employees/SalaryHistory': './Modules/EmployeeManagement/resources/js/pages/Employees/SalaryHistory.tsx',
  'Employees/TimesheetHistory': './Modules/EmployeeManagement/resources/js/pages/Employees/TimesheetHistory.tsx',
};

// Project Management module pages
const projectPages: Record<string, string> = {
  'Projects/Index': './Modules/ProjectManagement/resources/js/pages/Index.tsx',
  'Projects/Create': './Modules/ProjectManagement/resources/js/pages/Create.tsx',
  'Projects/Edit': './Modules/ProjectManagement/resources/js/pages/Edit.tsx',
  'Projects/Show': './Modules/ProjectManagement/resources/js/pages/Show.tsx',
  'Projects/Resources': './Modules/ProjectManagement/resources/js/pages/Resources.tsx',
  'Projects/Projects': './Modules/ProjectManagement/resources/js/pages/Projects.tsx',
};

// Rental Management module pages
const rentalPages: Record<string, string> = {
  'Rentals/Index': './Modules/RentalManagement/resources/js/pages/Rentals/Index.tsx',
  'Rentals/Create': './Modules/RentalManagement/resources/js/pages/Rentals/Create.tsx',
  'Rentals/Edit': './Modules/RentalManagement/resources/js/pages/Rentals/Edit.tsx',
  'Rentals/Show': './Modules/RentalManagement/resources/js/pages/Rentals/Show.tsx',
  'Rentals/Print': './Modules/RentalManagement/resources/js/pages/Rentals/Print.tsx',
  'Rentals/Report': './Modules/RentalManagement/resources/js/pages/Rentals/Report.tsx',
  'Rentals/QuotationTest': './Modules/RentalManagement/resources/js/pages/Rentals/QuotationTest.tsx',
};

// Timesheet Management module pages
const timesheetPages: Record<string, string> = {
  'Timesheets/Index': './Modules/TimesheetManagement/resources/js/pages/Timesheets/Index.tsx',
  'Timesheets/Create': './Modules/TimesheetManagement/resources/js/pages/Timesheets/Create.tsx',
  'Timesheets/Edit': './Modules/TimesheetManagement/resources/js/pages/Timesheets/Edit.tsx',
  'Timesheets/Show': './Modules/TimesheetManagement/resources/js/pages/Timesheets/Show.tsx',
  'Timesheets/Monthly': './Modules/TimesheetManagement/resources/js/pages/Timesheets/Monthly.tsx',
  'Timesheets/PaySlip': './Modules/TimesheetManagement/resources/js/pages/Timesheets/PaySlip.tsx',
  'Timesheets/PaySlipTest': './Modules/TimesheetManagement/resources/js/pages/Timesheets/PaySlipTest.tsx',
  'Timesheets/Summary': './Modules/TimesheetManagement/resources/js/pages/Timesheets/Summary.tsx',
  'Timesheets/TimesheetManagement': './Modules/TimesheetManagement/resources/js/pages/Timesheets/TimesheetManagement.tsx',
};

// Customer Management module pages
const customerPages: Record<string, string> = {
  'Customers/Index': './Modules/CustomerManagement/resources/js/pages/Customers/Index.tsx',
  'Customers/Create': './Modules/CustomerManagement/resources/js/pages/Customers/Create.tsx',
  'Customers/Edit': './Modules/CustomerManagement/resources/js/pages/Customers/Edit.tsx',
  'Customers/Show': './Modules/CustomerManagement/resources/js/pages/Customers/Show.tsx',
};

// Leave Management module pages
const leaveRequestPages: Record<string, string> = {
  'LeaveRequests/Index': './Modules/LeaveManagement/resources/js/pages/LeaveRequests/Index.tsx',
  'LeaveRequests/Create': './Modules/LeaveManagement/resources/js/pages/LeaveRequests/Create.tsx',
  'LeaveRequests/Edit': './Modules/LeaveManagement/resources/js/pages/LeaveRequests/Edit.tsx',
  'LeaveRequests/Show': './Modules/LeaveManagement/resources/js/pages/LeaveRequests/Show.tsx',
};

// Combine all page mappings
const allPageMappings: Record<string, string> = {
  ...employeePages,
  ...projectPages,
  ...rentalPages,
  ...timesheetPages,
  ...customerPages,
  ...leaveRequestPages,
};

// Map from page name prefixes to module names
const moduleMap: Record<string, string[]> = {
  'Employees': ['EmployeeManagement'],
  'Projects': ['ProjectManagement'],
  'Timesheets': ['TimesheetManagement'],
  'Settings': ['Settings'],
  'Reports': ['Reporting'],
  'Rentals': ['RentalManagement'],
  'Payrolls': ['Payroll'],
  'Notifications': ['Notifications'],
  'Mobile': ['MobileBridge'],
  'Localization': ['Localization'],
  'LeaveRequests': ['LeaveManagement'],
  'Equipment': ['EquipmentManagement'],
  'Customers': ['CustomerManagement'],
  'Users': ['Core'],
  'Core': ['Core'],
  'Audit': ['AuditCompliance'],
  'API': ['API']
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        console.log(`Attempting to resolve page: ${name}`);
        console.log('Available modulePages keys:', Object.keys(modulePages));

        // First try to resolve from main app's pages
        try {
            const component = await resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx'));
            console.log(`Successfully loaded ${name} from main app`);
            return component;
        } catch (error) {
            console.log(`Page not found in main app: ${name}, checking module pages...`);

            // Handle Laravel's Inertia::render('Module::Page') pattern (like Employee module)
            if (name.includes('::')) {
                const [module, page] = name.split('::');
                // Try both Pages and pages directories, and both .tsx and .jsx
                const possiblePaths = [
                    `./Modules/${module}/resources/js/Pages/${page}.tsx`,
                    `./Modules/${module}/resources/js/Pages/${page}.jsx`,
                    `./Modules/${module}/resources/js/pages/${page}.tsx`,
                    `./Modules/${module}/resources/js/pages/${page}.jsx`,
                    `./Modules/${module}/resources/js/Pages/${page}/Index.tsx`,
                    `./Modules/${module}/resources/js/Pages/${page}/Index.jsx`,
                    `./Modules/${module}/resources/js/pages/${page}/Index.tsx`,
                    `./Modules/${module}/resources/js/pages/${page}/Index.jsx`,
                ];
                for (const path of possiblePaths) {
                    if (path in modulePages) {
                        console.log(`Resolved ${name} to ${path}`);
                        return await modulePages[path]();
                    }
                }
            }

            // First check in our combined page mappings
            const mappedPath = allPageMappings[name];
            if (mappedPath) {
                // Try both with and without leading slash
                const possibleKeys = [mappedPath, mappedPath.replace(/^\./, ''), '/' + mappedPath.replace(/^\./, '')];
                for (const key of possibleKeys) {
                    if (key in modulePages) {
                        console.log(`Loading page from mappings: ${key}`);
                        const module = await modulePages[key]();
                        console.log(`Successfully loaded ${name} from explicit mappings`);
                        return module;
                    }
                }
            }

            // Direct lookup for Employee pages that we know about (legacy approach)
            if (name in employeePages && employeePages[name] in modulePages) {
                try {
                    const pagePath = employeePages[name];
                    console.log(`Loading employee page from: ${pagePath}`);
                    const module = await modulePages[pagePath]();
                    console.log(`Successfully loaded ${name} from employee pages`);
                    return module;
                } catch (e) {
                    console.error(`Failed to import ${name} page directly:`, e);
                }
            }

            // Try loading the page from any module
            const moduleName = name.split('/')[0]; // Extract module name, like 'Employees' from 'Employees/Index'
            const pagePath = name.split('/').slice(1).join('/'); // Extract page path, like 'Index' from 'Employees/Index'

            // Get potential modules for this page
            const potentialModules = moduleMap[moduleName] || Object.values(moduleMap).flat();

            // Try each potential module
            for (const module of potentialModules) {
            const possiblePaths = [
                    `./Modules/${module}/resources/js/pages/${name}.tsx`,
                    `./Modules/${module}/resources/js/Pages/${name}.tsx`,
                    // For exact module page match (like Employees/Index in EmployeeManagement)
                    `./Modules/${module}/resources/js/pages/${pagePath}.tsx`,
                    `./Modules/${module}/resources/js/Pages/${pagePath}.tsx`,
                    // Common pattern: Module/pages/PagePrefix/PageName
                    `./Modules/${module}/resources/js/pages/${moduleName}/${pagePath}.tsx`,
                    `./Modules/${module}/resources/js/Pages/${moduleName}/${pagePath}.tsx`,

                ];

                for (const path of possiblePaths) {
                    if (path in modulePages) {
                        console.log(`Found page at ${path}`);
                        return await modulePages[path]();
                    }
                }
            }

            // Try more specific patterns for known module pages using our helper
            const modulePatternMap: Record<string, [string, string]> = {
                'Employees/Index': ['EmployeeManagement', 'Index.tsx'],
                'Projects/Index': ['ProjectManagement', 'Index.tsx'],
                'Rentals/Index': ['RentalManagement/Rentals', 'Index.tsx'],
                'Timesheets/Index': ['TimesheetManagement/Timesheets', 'Index.tsx'],
                'Equipment/Index': ['EquipmentManagement', 'Index.tsx'],
                'Settings/Index': ['Settings', 'Index.tsx'],
                'Payrolls/Index': ['Payroll', 'Index.tsx'],
                'LeaveRequests/Index': ['LeaveManagement', 'Index.tsx'],
                'Customers/Index': ['CustomerManagement', 'Index.tsx'],

            };

            if (name in modulePatternMap) {
                const [modulePattern, pagePattern] = modulePatternMap[name];
                const specificPaths = findModulePagesByPattern(modulePattern, pagePattern)
                  .map(p => p.replace(/^\//, './'))
                  .filter(p => p.endsWith(`/${modulePattern}/${pagePattern}`));

                if (specificPaths.length > 0) {
                    console.log(`Found specific page at ${specificPaths[0]}`);
                    return await modulePages[specificPaths[0]]();
              }
            }

            // Try generic match for any module as a last resort
            const normalizedName = name.replace(/\\/g, '/');
            for (const key in modulePages) {
              const keyNoExt = key.replace(/\.tsx$/, '').replace(/\\/g, '/');
                if (keyNoExt.endsWith(`/${normalizedName}`) ||
                    keyNoExt.toLowerCase().endsWith(`/${normalizedName.toLowerCase()}`)) {
                return await modulePages[key]();
              }
            }

            // Try to infer pattern for common page types (Create, Edit, Show)
            if (name.includes('/')) {
                const [modulePartRaw, pagePartRaw] = name.split('/', 2);
                const modulePart = modulePartRaw.trim();
                const pagePart = pagePartRaw.trim();
                if (['Create', 'Edit', 'Show', 'Index'].includes(pagePart) && modulePart in moduleMap) {
                    const possibleModules = moduleMap[modulePart];

                    for (const moduleType of possibleModules) {
                        // First try direct path in the module
                        const directPath = `./Modules/${moduleType}/resources/js/pages/${pagePart}.tsx`;
                        if (directPath in modulePages) {
                            console.log(`Found ${pagePart} page at ${directPath}`);
                            return await modulePages[directPath]();
                        }

                        // Then try module part as directory
                        const subDirPath = `./Modules/${moduleType}/resources/js/pages/${modulePart}/${pagePart}.tsx`;
                        if (subDirPath in modulePages) {
                            console.log(`Found ${pagePart} page at ${subDirPath}`);
                            return await modulePages[subDirPath]();
                        }
                    }
                }
            }

            console.error(`Module page not found: ${name}`);
            console.error('Available module page keys:', Object.keys(modulePages).length);

            // Print diagnostic information about what we tried
            if (name.includes('/')) {
                const [modulePart, pagePart] = name.split('/', 2);
                console.log(`Diagnostic info for ${name}:`);
                console.log(`- Module part: ${modulePart}`);
                console.log(`- Page part: ${pagePart}`);
                console.log(`- In moduleMap: ${modulePart in moduleMap}`);
                if (modulePart in moduleMap) {
                    console.log(`- Possible modules: ${moduleMap[modulePart].join(', ')}`);

                    // List some paths we tried
                    for (const moduleType of moduleMap[modulePart]) {
                        const paths = [
                            `./Modules/${moduleType}/resources/js/pages/${pagePart}.tsx`,
                            `./Modules/${moduleType}/resources/js/Pages/${pagePart}.tsx`,
                            `./Modules/${moduleType}/resources/js/pages/${modulePart}/${pagePart}.tsx`,
                            `./Modules/${moduleType}/resources/js/Pages/${modulePart}/${pagePart}.tsx`,
                        ];

                        console.log(`- Paths for ${moduleType}:`);
                        paths.forEach(path => {
                            console.log(`  - ${path}: ${path in modulePages ? 'FOUND' : 'not found'}`);
                        });
                    }
                }

                // List some similar paths that do exist
                const similarPaths = Object.keys(modulePages).filter(path =>
                    (path.includes(modulePart) || path.includes(modulePart.toLowerCase())) &&
                    (path.includes(pagePart) || path.includes(pagePart.toLowerCase()))
                );

                if (similarPaths.length > 0) {
                    console.log(`- Similar paths that exist:`);
                    similarPaths.slice(0, 5).forEach(path => {
                        console.log(`  - ${path}`);
                    });
                    if (similarPaths.length > 5) {
                        console.log(`  - ... and ${similarPaths.length - 5} more`);
                    }
                }
            }

            // Return a default component that shows an error
            return {
                default: () => (
                    <div className="p-6">
                        <h1 className="text-2xl text-red-600">Page Not Found</h1>
                        <p className="mt-2">The page "{name}" could not be found.</p>
                    </div>
                )
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

