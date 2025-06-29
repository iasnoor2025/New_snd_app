import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import typescript from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
    js.configs.recommended,
    ...typescript.configs.recommended,
    {
        ...react.configs.flat.recommended,
        ...react.configs.flat['jsx-runtime'], // Required for React 17+
        languageOptions: {
            globals: Object.fromEntries(
                Object.entries(globals.browser).map(([key, value]) => [key.trim(), value])
            ),
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/no-unescaped-entities': 'off',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        plugins: {
            'react-hooks': reactHooks,
        },
        rules: {
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
    },
    {
        ignores: [
            'bootstrap/**',
            'public/**',
            'storage/**',
            'vendor/**',
            'node_modules/**',
            'Modules/**/node_modules/**',
            'Modules/**/dist/**',
            'Modules/**/build/**',
            'vite.config.*.ts',
            'vite-module-loader.js',
            'tailwind.config.js',
        ]
    },
    prettier, // Turn off all rules that might conflict with Prettier
];
