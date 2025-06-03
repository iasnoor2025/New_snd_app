/**
 * Centralized configuration for i18n automation tools
 */

module.exports = {
  // Supported languages
  languages: ['en', 'ar'],

  // Available namespaces
  namespaces: [
    'common',
    'employees',
    'projects',
    'rentals',
    'payrolls',
    'timesheet',
    'equipment'
  ],

  // Default namespace for general UI elements
  defaultNamespace: 'common',

  // File patterns to scan
  scanPatterns: [
    'Modules/**/resources/js/**/*.{js,jsx,ts,tsx}'
  ],

  // Patterns to exclude from scanning
  excludePatterns: [
    '**/node_modules/**',
    '**/tests/**',
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.spec.{js,jsx,ts,tsx}'
  ],

  // Output directory for translation files
  outputPath: 'public/locales/{{lng}}/{{ns}}.json',

  // Function names to look for when scanning
  functionNames: [
    't',
    'i18n.t',
    'i18next.t',
    'useTranslation().t'
  ],

  // Module to namespace mapping
  moduleNamespaceMap: {
    'EmployeeManagement': 'employees',
    'ProjectManagement': 'projects',
    'RentalManagement': 'rentals',
    'Payroll': 'payrolls',
    'TimesheetManagement': 'timesheet',
    'EquipmentManagement': 'equipment'
    
  }
};
