# Internationalization (i18n) Workflow Guide

## Overview

This guide provides a comprehensive workflow for implementing internationalization (i18n) in the application. The workflow is supported by several automation tools that help detect hardcoded text, suggest translations, and maintain translation files.

## Tools and Configuration

### Centralized Configuration

All i18n tools now use a centralized configuration file (`i18n-config.js`) that defines:

- Supported languages (`en`, `ar`)
- Available namespaces (`common`, `employees`, `projects`, etc.)
- File patterns to scan
- Module-to-namespace mapping
- Function names to detect

### Available Tools

1. **i18next-scanner** - Scans the codebase for translation keys and updates translation files
2. **suggest-translations.js** - Analyzes individual components for hardcoded text
3. **i18n-batch-process.js** - Processes multiple modules in batch
4. **i18n-report-generator.js** - Generates visual HTML reports of i18n status
5. **i18n-unused-keys.js** - Detects unused translation keys

### NPM Scripts

```json
{
  "scripts": {
    "scan-i18n": "node --require=esm scan-translations.js",
    "suggest-i18n": "node --require=esm suggest-translations.js",
    "i18n-batch": "node --require=esm i18n-batch-process.js",
    "i18n-report": "node i18n-report-generator.js",
    "i18n-unused": "node i18n-unused-keys.js"
  }
}
```

## Workflow Steps

### 1. Initial Setup

Ensure the i18n configuration is properly set up in `i18n-config.js`. This file defines all the necessary settings for the i18n tools.

### 2. Batch Processing Modules

To process multiple modules at once:

```bash
# Process all modules defined in i18n-config.js
npm run i18n-batch

# Process specific modules
npm run i18n-batch -- Rentals,Payrolls
```

This will:
- Scan all React components in the specified modules
- Detect hardcoded text that needs translation
- Generate a detailed JSON and HTML report
- Update translation files using i18next-scanner

### 3. Individual Component Analysis

For more detailed analysis of a specific component:

```bash
npm run suggest-i18n -- path/to/component.jsx
```

The tool will:
- Analyze the component for hardcoded text
- Suggest appropriate translation keys
- Provide confidence scores for each suggestion
- Show code snippets to replace with translation functions

### 4. Updating Translation Files

After implementing translations in your components:

```bash
npm run scan-i18n
```

This updates all translation files with new keys.

### 5. Generating Reports

To generate a visual report of the internationalization status:

```bash
npm run i18n-report
```

This creates an HTML report showing:
- Overall completion rate
- Module-by-module status
- Visual progress bars

### 6. Finding Unused Translation Keys

To keep translation files clean and optimized:

```bash
npm run i18n-unused
```

This will identify translation keys that are defined but not used in the codebase.

## Best Practices

### Namespace Organization

- Use the `common` namespace for shared UI elements and generic text
- Use specific namespaces (`employees`, `rentals`, etc.) for module-specific text
- Follow the module-to-namespace mapping defined in `i18n-config.js`

### Key Naming Conventions

- Use lowercase with underscores for key names
- Keep keys descriptive but concise
- Group related keys with prefixes (e.g., `form_title`, `form_submit`)

### Translation Implementation

1. Import the translation hook:
   ```javascript
   import { useTranslation } from 'react-i18next';
   ```

2. Initialize with appropriate namespaces:
   ```javascript
   const { t } = useTranslation(['rentals', 'common']);
   ```

3. Replace hardcoded text with translation function:
   ```javascript
   // Before
   <Button>Submit</Button>
   
   // After
   <Button>{t('common:submit')}</Button>
   ```

## Troubleshooting

### Missing Translations

If translations are not appearing:

1. Check that the correct namespace is being used
2. Verify the translation key exists in the translation files
3. Run `npm run scan-i18n` to update translation files

### Performance Issues

If you notice performance issues with translations:

1. Minimize the number of namespaces loaded in each component
2. Use the Trans component for complex translations with variables
3. Consider code-splitting translation files for large applications

## Example Workflow

### Step 1: Batch Process a Module

```bash
npm run i18n-batch -- Rentals
```

### Step 2: Review the HTML Report

Open the generated HTML report to see which files need attention.

### Step 3: Fix Individual Components

```bash
npm run suggest-i18n -- src/Rentals/RentalForm.jsx
```

Implement the suggested changes in the component.

### Step 4: Update Translation Files

```bash
npm run scan-i18n
```

### Step 5: Check for Unused Keys

```bash
npm run i18n-unused
```

Remove any unused keys from translation files.

### Step 6: Generate Final Report

```bash
npm run i18n-report
```

Verify that the completion rate has improved.

## Conclusion

Following this workflow and utilizing the provided tools will streamline the internationalization process across all modules of the application. The automated detection, reporting, and maintenance tools help ensure consistent and complete translations throughout the codebase.
