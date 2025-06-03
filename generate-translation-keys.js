#!/usr/bin/env node

/**
 * Generate Translation Keys from Missing Translations Report
 *
 * This script processes the missing-translations-report.md file and generates
 * translation key files for English and Arabic languages.
 */

const fs = require('fs');
const path = require('path');

/**
 * Generate translation keys from detected hardcoded strings
 */
function generateTranslationKey(text, context = '') {
  // Convert text to snake_case key
  let key = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_')
    .replace(/^_+|_+$/g, '');

  // Add context prefix if available
  if (context.includes('Button') || context.includes('button')) {
    key = `btn_${key}`;
  } else if (context.includes('Label') || context.includes('label')) {
    key = `lbl_${key}`;
  } else if (context.includes('Title') || context.includes('title') || context.includes('CardTitle')) {
    key = `ttl_${key}`;
  } else if (context.includes('placeholder')) {
    key = `ph_${key}`;
  } else if (context.includes('TableHead') || context.includes('Table header')) {
    key = `th_${key}`;
  } else if (context.includes('SelectItem')) {
    key = `opt_${key}`;
  } else if (context.includes('AlertTitle')) {
    key = `alert_${key}`;
  } else if (context.includes('TooltipContent')) {
    key = `tooltip_${key}`;
  }

  // Ensure key is not too long
  if (key.length > 50) {
    key = key.substring(0, 50).replace(/_$/, '');
  }

  return key;
}

/**
 * Map module names to namespaces
 */
function getNamespaceFromModule(moduleName) {
  const moduleMap = {
    'TimesheetManagement': 'timesheet',
    'ProjectManagement': 'project',
    'RentalManagement': 'rental',
    'EmployeeManagement': 'employee',
    'Payroll': 'payroll',
    'LeaveManagement': 'leave',
    'CustomerManagement': 'customer'
  };

  return moduleMap[moduleName] || 'common';
}

/**
 * Process missing translations report and generate keys
 */
function processReport() {
  const reportPath = 'missing-translations-report.md';

  if (!fs.existsSync(reportPath)) {
    console.error('❌ Missing translations report not found.');
    console.log('Please run: node detect-missing-translations.js');
    return false;
  }

  console.log('📖 Reading missing translations report...');
  const content = fs.readFileSync(reportPath, 'utf8');
  const lines = content.split('\n');

  const translations = {
    en: {},
    ar: {}
  };

  let currentModule = '';
  let processedStrings = 0;
  let duplicateKeys = new Set();

  console.log('🔄 Processing translations...');

  lines.forEach((line, lineIndex) => {
    // Detect module sections
    const moduleMatch = line.match(/^## (\w+) \(\d+ strings\)$/);
    if (moduleMatch) {
      currentModule = moduleMatch[1];
      console.log(`  Processing module: ${currentModule}`);
      return;
    }

    // Parse table rows with translations
    const tableMatch = line.match(/^\| \d+ \| [^|]+ \| ([^|]+) \| (.+) \|$/);
    if (tableMatch) {
      const text = tableMatch[1].trim();
      const context = tableMatch[2].trim();

      // Skip header row and empty text
      if (text && text !== 'Text' && text.length > 2) {
        const key = generateTranslationKey(text, context);
        const namespace = getNamespaceFromModule(currentModule);

        // Initialize namespace if not exists
        if (!translations.en[namespace]) {
          translations.en[namespace] = {};
          translations.ar[namespace] = {};
        }

        // Check for duplicate keys
        let finalKey = key;
        if (translations.en[namespace][finalKey]) {
          let counter = 1;
          let uniqueKey = `${key}_${counter}`;
          while (translations.en[namespace][uniqueKey]) {
            counter++;
            uniqueKey = `${key}_${counter}`;
          }
          duplicateKeys.add(`${namespace}.${key} -> ${uniqueKey}`);
          finalKey = uniqueKey;
        }

        translations.en[namespace][finalKey] = text;
        translations.ar[namespace][finalKey] = text; // Will be translated later
        processedStrings++;
      }
    }
  });

  console.log(`\n📊 Processing Summary:`);
  console.log(`  - Processed strings: ${processedStrings}`);
  console.log(`  - Duplicate keys resolved: ${duplicateKeys.size}`);
  console.log(`  - Namespaces created: ${Object.keys(translations.en).length}`);

  // Create directory structure
  const langDir = 'resources/lang';
  ['en', 'ar'].forEach(lang => {
    const dir = path.join(langDir, lang);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });

  // Write translation files
  let filesCreated = 0;
  Object.keys(translations).forEach(lang => {
    Object.keys(translations[lang]).forEach(namespace => {
      const filePath = path.join(langDir, lang, `${namespace}.json`);
      const keyCount = Object.keys(translations[lang][namespace]).length;

      if (keyCount > 0) {
        // Sort keys alphabetically for better organization
        const sortedTranslations = {};
        Object.keys(translations[lang][namespace])
          .sort()
          .forEach(key => {
            sortedTranslations[key] = translations[lang][namespace][key];
          });

        fs.writeFileSync(filePath, JSON.stringify(sortedTranslations, null, 2) + '\n');
        console.log(`✅ Generated ${filePath} (${keyCount} keys)`);
        filesCreated++;
      }
    });
  });

  // Generate summary report
  generateSummaryReport(translations, duplicateKeys);

  console.log(`\n🎉 Translation key generation complete!`);
  console.log(`  - Files created: ${filesCreated}`);
  console.log(`  - Total translation keys: ${processedStrings}`);

  if (duplicateKeys.size > 0) {
    console.log(`\n⚠️  Duplicate keys were resolved. Check translation-keys-summary.md for details.`);
  }

  return true;
}

/**
 * Generate a summary report of the translation key generation
 */
function generateSummaryReport(translations, duplicateKeys) {
  let report = '# Translation Keys Generation Summary\n\n';
  report += `Generated on ${new Date().toLocaleString()}\n\n`;

  // Overview
  const totalKeys = Object.values(translations.en)
    .reduce((sum, ns) => sum + Object.keys(ns).length, 0);

  report += '## Overview\n\n';
  report += `- **Total translation keys**: ${totalKeys}\n`;
  report += `- **Languages**: English (en), Arabic (ar)\n`;
  report += `- **Namespaces**: ${Object.keys(translations.en).length}\n`;
  report += `- **Duplicate keys resolved**: ${duplicateKeys.size}\n\n`;

  // Namespace breakdown
  report += '## Namespace Breakdown\n\n';
  report += '| Namespace | Keys | Description |\n';
  report += '|-----------|------|-------------|\n';

  Object.keys(translations.en).forEach(namespace => {
    const keyCount = Object.keys(translations.en[namespace]).length;
    const description = getNamespaceDescription(namespace);
    report += `| ${namespace} | ${keyCount} | ${description} |\n`;
  });

  report += '\n';

  // Duplicate keys section
  if (duplicateKeys.size > 0) {
    report += '## Resolved Duplicate Keys\n\n';
    report += 'The following keys were duplicated and automatically resolved:\n\n';
    duplicateKeys.forEach(duplicate => {
      report += `- ${duplicate}\n`;
    });
    report += '\n';
  }

  // Sample keys for each namespace
  report += '## Sample Translation Keys\n\n';
  Object.keys(translations.en).forEach(namespace => {
    const keys = Object.keys(translations.en[namespace]);
    if (keys.length > 0) {
      report += `### ${namespace}\n\n`;
      report += '```json\n';

      // Show first 5 keys as examples
      const sampleKeys = keys.slice(0, 5);
      const sampleObj = {};
      sampleKeys.forEach(key => {
        sampleObj[key] = translations.en[namespace][key];
      });

      report += JSON.stringify(sampleObj, null, 2);

      if (keys.length > 5) {
        report += `\n// ... and ${keys.length - 5} more keys`;
      }

      report += '\n```\n\n';
    }
  });

  // Next steps
  report += '## Next Steps\n\n';
  report += '1. **Review generated translation files** in `resources/lang/`\n';
  report += '2. **Translate Arabic keys** - currently they contain English text\n';
  report += '3. **Run the replacement script**: `node replace-hardcoded-strings.js`\n';
  report += '4. **Test the implementation** with different languages\n';
  report += '5. **Set up continuous monitoring** to prevent new hardcoded strings\n\n';

  report += '## Translation File Locations\n\n';
  Object.keys(translations.en).forEach(namespace => {
    report += `- **${namespace}**: \n`;
    report += `  - English: \`resources/lang/en/${namespace}.json\`\n`;
    report += `  - Arabic: \`resources/lang/ar/${namespace}.json\`\n`;
  });

  fs.writeFileSync('translation-keys-summary.md', report);
  console.log('📋 Summary report saved to translation-keys-summary.md');
}

/**
 * Get description for namespace
 */
function getNamespaceDescription(namespace) {
  const descriptions = {
    'timesheet': 'Timesheet management and time tracking',
    'project': 'Project management and planning',
    'rental': 'Equipment rental and inventory',
    'employee': 'Employee management and HR',
    'payroll': 'Payroll processing and calculations',
    'leave': 'Leave management and approvals',
    'customer': 'Customer relationship management',
    'common': 'Common UI elements and shared text'
  };

  return descriptions[namespace] || 'Module-specific translations';
}

/**
 * Validate existing translation files
 */
function validateExistingFiles() {
  const issues = [];
  const langDir = 'resources/lang';

  if (!fs.existsSync(langDir)) {
    return issues;
  }

  ['en', 'ar'].forEach(lang => {
    const langPath = path.join(langDir, lang);
    if (fs.existsSync(langPath)) {
      const files = fs.readdirSync(langPath);
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const filePath = path.join(langPath, file);
          try {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            // Check for common issues
            Object.entries(content).forEach(([key, value]) => {
              if (typeof value !== 'string') {
                issues.push(`Non-string value in ${filePath}: ${key}`);
              }
              if (value.trim() === '') {
                issues.push(`Empty value in ${filePath}: ${key}`);
              }
            });
          } catch (error) {
            issues.push(`Invalid JSON in ${filePath}: ${error.message}`);
          }
        }
      });
    }
  });

  return issues;
}

// Main execution
if (require.main === module) {
  console.log('🚀 Translation Keys Generator\n');

  // Validate existing files first
  const validationIssues = validateExistingFiles();
  if (validationIssues.length > 0) {
    console.log('⚠️  Found issues in existing translation files:');
    validationIssues.forEach(issue => console.log(`  - ${issue}`));
    console.log('');
  }

  const success = processReport();

  if (success) {
    console.log('\n📝 Next steps:');
    console.log('  1. Review generated files in resources/lang/');
    console.log('  2. Translate Arabic keys (currently contain English text)');
    console.log('  3. Run: node replace-hardcoded-strings.js');
    console.log('  4. Test your application with different languages');
  }

  process.exit(success ? 0 : 1);
}

module.exports = {
  generateTranslationKey,
  processReport,
  getNamespaceFromModule,
  validateExistingFiles
};
