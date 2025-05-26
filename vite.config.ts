import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import moduleLoader, { collectModuleAssetsPaths } from './vite-module-loader.js';

// Collect module paths
const modulesPaths = [];
await collectModuleAssetsPaths(modulesPaths, 'Modules');

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx', ...modulesPaths],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
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
        },
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        hmr: {
            host: 'localhost'
        },
    },
});
