#!/usr/bin/env node

/**
 * Setup i18n Configuration for React Application
 *
 * This script creates the necessary i18n configuration files and
 * provides instructions for integrating react-i18next into the application.
 */

const fs = require('fs');
const path = require('path');

/**
 * Create i18n configuration file
 */
function createI18nConfig() {
  const configContent = `import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import commonEn from '../lang/en/common.json';
import timesheetEn from '../lang/en/timesheet.json';
import customerEn from '../lang/en/customer.json';
import employeeEn from '../lang/en/employee.json';
import projectEn from '../lang/en/project.json';
import rentalEn from '../lang/en/rental.json';
import payrollEn from '../lang/en/payroll.json';
import leaveEn from '../lang/en/leave.json';

import commonAr from '../lang/ar/common.json';
import timesheetAr from '../lang/ar/timesheet.json';
import customerAr from '../lang/ar/customer.json';
import employeeAr from '../lang/ar/employee.json';
import projectAr from '../lang/ar/project.json';
import rentalAr from '../lang/ar/rental.json';
import payrollAr from '../lang/ar/payroll.json';
import leaveAr from '../lang/ar/leave.json';

const resources = {
  en: {
    common: commonEn,
    timesheet: timesheetEn,
    customer: customerEn,
    employee: employeeEn,
    project: projectEn,
    rental: rentalEn,
    payroll: payrollEn,
    leave: leaveEn,
  },
  ar: {
    common: commonAr,
    timesheet: timesheetAr,
    customer: customerAr,
    employee: employeeAr,
    project: projectAr,
    rental: rentalAr,
    payroll: payrollAr,
    leave: leaveAr,
  },
};

i18n
  // Load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // Learn more: https://github.com/i18next/i18next-http-backend
  // Want to add a language detector? -> https://github.com/i18next/i18next-browser-languageDetector
  // .use(Backend)
  // Detect user language
  // Learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // Initialize i18next
  // For all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    // Default namespace
    defaultNS: 'common',

    // Namespace separator
    nsSeparator: ':',

    // Key separator
    keySeparator: '.',

    interpolation: {
      escapeValue: false, // Not needed for react as it escapes by default
    },

    // Language detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    // React specific options
    react: {
      useSuspense: false,
    },
  });

export default i18n;
`;

  const configPath = 'resources/js/i18n/index.js';
  const configDir = path.dirname(configPath);

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  fs.writeFileSync(configPath, configContent);
  console.log(`✅ Created i18n configuration: ${configPath}`);
}

/**
 * Create language switcher component
 */
function createLanguageSwitcher() {
  const componentContent = `import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (languageCode: string) => {
    const selectedLanguage = languages.find(lang => lang.code === languageCode);
    if (selectedLanguage) {
      i18n.changeLanguage(languageCode);

      // Update document direction for RTL support
      document.documentElement.dir = selectedLanguage.dir;
      document.documentElement.lang = languageCode;

      // Store language preference
      localStorage.setItem('i18nextLng', languageCode);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage.flag} {currentLanguage.name}</span>
          <span className="sm:hidden">{currentLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={\`cursor-pointer \${i18n.language === language.code ? 'bg-accent' : ''}\`}
          >
            <span className="mr-2">{language.flag}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
`;

  const componentPath = 'resources/js/components/LanguageSwitcher.tsx';
  const componentDir = path.dirname(componentPath);

  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  fs.writeFileSync(componentPath, componentContent);
  console.log(`✅ Created language switcher component: ${componentPath}`);
}

/**
 * Create RTL CSS file
 */
function createRTLStyles() {
  const rtlStyles = `/* RTL (Right-to-Left) Support Styles */

/* Base RTL styles */
[dir="rtl"] {
  text-align: right;
}

[dir="rtl"] .text-left {
  text-align: right;
}

[dir="rtl"] .text-right {
  text-align: left;
}

/* Margin and Padding RTL adjustments */
[dir="rtl"] .ml-2 {
  margin-left: 0;
  margin-right: 0.5rem;
}

[dir="rtl"] .mr-2 {
  margin-right: 0;
  margin-left: 0.5rem;
}

[dir="rtl"] .pl-4 {
  padding-left: 0;
  padding-right: 1rem;
}

[dir="rtl"] .pr-4 {
  padding-right: 0;
  padding-left: 1rem;
}

/* Flexbox RTL adjustments */
[dir="rtl"] .flex-row {
  flex-direction: row-reverse;
}

[dir="rtl"] .justify-start {
  justify-content: flex-end;
}

[dir="rtl"] .justify-end {
  justify-content: flex-start;
}

/* Border RTL adjustments */
[dir="rtl"] .border-l {
  border-left: none;
  border-right: 1px solid;
}

[dir="rtl"] .border-r {
  border-right: none;
  border-left: 1px solid;
}

/* Table RTL adjustments */
[dir="rtl"] table {
  direction: rtl;
}

[dir="rtl"] th,
[dir="rtl"] td {
  text-align: right;
}

[dir="rtl"] th:first-child,
[dir="rtl"] td:first-child {
  text-align: right;
}

[dir="rtl"] th:last-child,
[dir="rtl"] td:last-child {
  text-align: left;
}

/* Form RTL adjustments */
[dir="rtl"] input,
[dir="rtl"] textarea,
[dir="rtl"] select {
  text-align: right;
}

[dir="rtl"] input[type="number"] {
  text-align: left; /* Numbers should remain LTR */
}

/* Icon RTL adjustments */
[dir="rtl"] .icon-chevron-right {
  transform: scaleX(-1);
}

[dir="rtl"] .icon-chevron-left {
  transform: scaleX(-1);
}

/* Navigation RTL adjustments */
[dir="rtl"] .breadcrumb {
  flex-direction: row-reverse;
}

[dir="rtl"] .breadcrumb-separator {
  transform: scaleX(-1);
}

/* Dropdown RTL adjustments */
[dir="rtl"] .dropdown-menu {
  left: auto;
  right: 0;
}

/* Card RTL adjustments */
[dir="rtl"] .card-header {
  text-align: right;
}

/* Button group RTL adjustments */
[dir="rtl"] .btn-group {
  flex-direction: row-reverse;
}

[dir="rtl"] .btn-group .btn:first-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}

[dir="rtl"] .btn-group .btn:last-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
}

/* Sidebar RTL adjustments */
[dir="rtl"] .sidebar {
  left: auto;
  right: 0;
}

[dir="rtl"] .sidebar-toggle {
  left: auto;
  right: 1rem;
}

/* Animation RTL adjustments */
[dir="rtl"] .slide-in-left {
  animation: slide-in-right 0.3s ease-out;
}

[dir="rtl"] .slide-in-right {
  animation: slide-in-left 0.3s ease-out;
}

@keyframes slide-in-right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-in-left {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Custom utility classes for RTL */
.rtl\:mr-2 {
  margin-right: 0.5rem;
}

.rtl\:ml-2 {
  margin-left: 0.5rem;
}

.rtl\:pr-4 {
  padding-right: 1rem;
}

.rtl\:pl-4 {
  padding-left: 1rem;
}

.rtl\:text-right {
  text-align: right;
}

.rtl\:text-left {
  text-align: left;
}

.rtl\:flex-row-reverse {
  flex-direction: row-reverse;
}
`;

  const stylesPath = 'resources/css/rtl.css';
  const stylesDir = path.dirname(stylesPath);

  if (!fs.existsSync(stylesDir)) {
    fs.mkdirSync(stylesDir, { recursive: true });
  }

  fs.writeFileSync(stylesPath, rtlStyles);
  console.log(`✅ Created RTL styles: ${stylesPath}`);
}

/**
 * Create app integration instructions
 */
function createIntegrationInstructions() {
  const instructions = `# i18n Integration Instructions

## 1. Install Required Dependencies

\`\`\`bash
npm install react-i18next i18next i18next-browser-languagedetector i18next-http-backend
# or
yarn add react-i18next i18next i18next-browser-languagedetector i18next-http-backend
\`\`\`

## 2. Import i18n Configuration

Add the following import to your main application file (usually \`app.tsx\` or \`main.tsx\`):

\`\`\`typescript
// At the top of your main app file
import './i18n';
\`\`\`

## 3. Add RTL Support

Import the RTL CSS file in your main CSS file or component:

\`\`\`css
/* In your main CSS file (e.g., app.css) */
@import './rtl.css';
\`\`\`

## 4. Add Language Switcher to Layout

Add the LanguageSwitcher component to your main layout:

\`\`\`typescript
import LanguageSwitcher from '@/components/LanguageSwitcher';

// In your layout component
<div className="header-actions">
  <LanguageSwitcher />
  {/* Other header components */}
</div>
\`\`\`

## 5. Initialize Direction on App Load

Add this to your main app component to set initial direction:

\`\`\`typescript
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set initial direction based on language
    const isRTL = i18n.language === 'ar';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Rest of your app
}
\`\`\`

## 6. Update Tailwind CSS Configuration (if using Tailwind)

Add RTL support to your \`tailwind.config.js\`:

\`\`\`javascript
module.exports = {
  // ... other config
  plugins: [
    // ... other plugins
    require('@tailwindcss/forms'),
    // Add RTL plugin if available
    // require('tailwindcss-rtl'),
  ],
  // Add custom RTL utilities
  theme: {
    extend: {
      // Custom RTL utilities can be added here
    }
  }
}
\`\`\`

## 7. Test Your Implementation

1. Start your development server
2. Check that the language switcher appears
3. Switch between English and Arabic
4. Verify that:
   - Text changes language
   - Layout direction changes for Arabic (RTL)
   - All translated strings appear correctly

## 8. Common Issues and Solutions

### Issue: Translations not loading
**Solution:** Make sure all translation JSON files exist and are properly formatted.

### Issue: RTL layout not working
**Solution:** Ensure RTL CSS is imported and \`dir\` attribute is set on \`<html>\` element.

### Issue: Some strings still hardcoded
**Solution:** Run \`node detect-missing-translations.js\` to find remaining hardcoded strings.

### Issue: Arabic text not displaying correctly
**Solution:** Ensure your font supports Arabic characters and is properly loaded.

## 9. Next Steps

1. **Test thoroughly:** Test all components with both languages
2. **Add more languages:** Extend the system to support additional languages
3. **Optimize loading:** Consider lazy loading translation files for better performance
4. **Add pluralization:** Implement plural forms for different languages
5. **Context-aware translations:** Add context to translation keys for better accuracy

## 10. Maintenance

- Regularly run \`detect-missing-translations.js\` to find new hardcoded strings
- Keep translation files synchronized between languages
- Update RTL styles as you add new components
- Test language switching functionality with each release
`;

  fs.writeFileSync('i18n-integration-instructions.md', instructions);
  console.log('✅ Created integration instructions: i18n-integration-instructions.md');
}

/**
 * Main execution
 */
function main() {
  console.log('🌐 Setting up i18n configuration...\n');

  try {
    createI18nConfig();
    createLanguageSwitcher();
    createRTLStyles();
    createIntegrationInstructions();

    console.log('\n🎉 i18n setup complete!');
    console.log('\n📝 Next steps:');
    console.log('  1. Install dependencies: npm install react-i18next i18next i18next-browser-languagedetector');
    console.log('  2. Follow the instructions in i18n-integration-instructions.md');
    console.log('  3. Test your application with language switching');
    console.log('  4. Run: node detect-missing-translations.js (should show fewer strings)');

  } catch (error) {
    console.error('❌ Error setting up i18n configuration:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  createI18nConfig,
  createLanguageSwitcher,
  createRTLStyles,
  createIntegrationInstructions
};
