import react from '@vitejs/plugin-react-swc';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import moduleLoader, { collectModuleAssetsPaths } from './vite-module-loader.js';


export default defineConfig(async () => {
    // Collect module paths
    const modulesPaths = [];
    await collectModuleAssetsPaths(modulesPaths, 'Modules');

    return {
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx', ...modulesPaths],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        moduleLoader(),
        // Add a custom plugin to serve modules_statuses.json
        {
            name: 'serve-modules-status',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    // Handle direct requests to modules_statuses.json
                    if (req.url === '/modules_statuses.json') {
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({
                            "EmployeeManagement": true,
                            "ProjectManagement": true,
                            "TimesheetManagement": true,
                            "Settings": true,
                            "Reporting": true,
                            "RentalManagement": true,
                            "Payroll": true,
                            "Notifications": true,
                            "MobileBridge": true,
                            "Localization": true,
                            "LeaveManagement": true,
                            "EquipmentManagement": true,
                            "CustomerManagement": true,
                            "Core": true,
                            "AuditCompliance": true,
                            "API": true
                        }));
                        return;
                    }
                    next();
                });
            }
        }
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
            '@': resolve(__dirname, 'resources/js'),
            'Modules': resolve(__dirname, 'Modules'),
        },
    },
    optimizeDeps: {
        include: ['zod', '@hookform/resolvers/zod']
    },
    build: {
        commonjsOptions: {
            include: [/node_modules/],
            transformMixedEsModules: true
        }
    },
    ssr: {
        noExternal: ['zod', '@hookform/resolvers/zod']
    },

    server: {
        host: 'localhost',
        port: 5173,
        strictPort: false,
        hmr: {
            host: 'localhost',
            protocol: 'ws'
        },
    }
    };
});
