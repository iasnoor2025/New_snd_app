# Internationalization (i18n) Automation Guide

This guide explains how to use the automated i18n scanning tool to extract hardcoded text from your React components and generate translation keys across all modules.

## Setup

The following tools have been set up to automate the internationalization process:

1. **i18next-scanner**: A tool that scans your code for hardcoded text and translation functions
2. **scan-translations.js**: A script that runs the scanner and processes the results
3. **i18next-scanner.config.js**: Configuration for the scanner

## Installation

To install the required dependencies, run:

```bash
npm install --save-dev i18next-scanner vinyl-fs esm
```

## How to Use

### Running the Scanner

To scan your codebase for hardcoded text and generate translation keys, run:

```bash
npm run scan-i18n
```

This will:
1. Scan all JS/JSX/TS/TSX files in the Modules and resources directories
2. Extract text from translation functions (`t()`, `i18n.t()`, etc.)
3. Extract text from Trans components
4. Attempt to identify hardcoded text in JSX/TSX components
5. Generate or update translation files in `public/locales/[lang]/[namespace].json`

### Supported Namespaces

The scanner is configured to organize translations into the following namespaces:

- `common`: General UI terms (buttons, labels, etc.)
- `employees`: Employee-specific terms
- `projects`: Project-specific terms
- `rentals`: Rental-specific terms
- `payrolls`: Payroll-specific terms
- `timesheet`: Timesheet-specific terms
- `equipment`: Equipment-specific terms

### Supported Languages

The scanner is configured to generate translation files for:

- English (`en`)
- Arabic (`ar`)

## Best Practices

### Using Translation Functions

To ensure text is properly internationalized, use the `t()` function from react-i18next:

```jsx
// Import the hook
import { useTranslation } from 'react-i18next';

function MyComponent() {
  // Initialize with appropriate namespaces
  const { t } = useTranslation(['common', 'rentals']);
  
  return (
    <div>
      <h1>{t('rentals:page_title')}</h1>
      <button>{t('common:save')}</button>
    </div>
  );
}
```

### Namespace Organization

- Use `common` for general UI elements (buttons, form labels, etc.)
- Use module-specific namespaces for domain-specific terms

### Key Naming Conventions

- Use lowercase with underscores for key names
- Group related keys with prefixes (e.g., `form_title`, `form_submit`, `form_cancel`)
- Be descriptive but concise

## Workflow for Adding i18n to New Modules

1. **Run the scanner** to identify hardcoded text in your module
2. **Review the generated keys** in the translation files
3. **Replace hardcoded text** in your components with `t()` function calls
4. **Run the scanner again** to verify all text has been internationalized

## Troubleshooting

### Missing Translations

If the scanner doesn't detect some hardcoded text, you can:

1. Manually add the keys to the appropriate translation file
2. Ensure your text is properly formatted in JSX (not inside complex expressions)

### Scanner Configuration

If you need to adjust the scanner configuration (e.g., to add new namespaces or file patterns), edit the `i18next-scanner.config.js` file.

## Additional Resources

- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Documentation](https://www.i18next.com/)
- [i18next-scanner Documentation](https://github.com/i18next/i18next-scanner)
- Example components in this project:
  - `TranslationExample.tsx`
  - `EmployeeDetailsExample.tsx`
