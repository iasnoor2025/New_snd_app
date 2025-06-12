import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    css: {
        postcss: './postcss.config.js',
    },
    plugins: [
        laravel({
            input: ['resources/js/app.tsx'],
            refresh: true,

        }),
        react(),
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './'),
            'Modules': path.resolve(__dirname, './Modules'),
        },
    },
    server: {
        host: '127.0.0.1',
        port: 5173,
    },
});

