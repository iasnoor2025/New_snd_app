#!/usr/bin/env node

/**
 * Phase 1 Implementation Helper
 * Automatically detects hardcoded text and suggests specific i18n implementations
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const config = {
  // Target directories for Phase 1
  targetDirs: [
    'Modules/TimesheetManagement/resources/js/**/*.{tsx,jsx}',
    'Modules/ProjectManagement/resources/js/**/*.{tsx,jsx}',
    'Modules/RentalManagement/resources/js/**/*.{tsx,jsx}',
    'Modules/Payroll/resources/js/**/*.{tsx,jsx}',
    'Modules/EmployeeManagement/resources/js/**/*.{tsx,jsx}',
    'Modules/EquipmentManagement/resources/js/**/*.{tsx,jsx}'
  ],

  // Common patterns to detect
  patterns: {
    // Form labels and placeholders
    formElements: /(?:placeholder|title|alt|aria-label)\s*=\s*["']([^"']*[a-zA-Z][^"']*)["']/g,

    // Button text and labels
    buttonText: /<(?:Button|button)[^>]*>([^<]*[a-zA-Z][^<]*)</g,

    // Heading text
    headings: /<h[1-6][^>]*>([^<]*[a-zA-Z][^<]*)</h[1-6]>/g,

    // Table headers
    tableHeaders: /<(?:th|TableHead|TableHeaderCell)[^>]*>([^<]*[a-zA-Z][^<]*)</g,

    // Form labels
    formLabels: /<(?:label|FormLabel|Label)[^>]*>([^<]*[a-zA-Z][^<]*)</g,

    // Card titles
    cardTitles: /<(?:CardTitle|CardHeader)[^>]*>([^<]*[a-zA-Z][^<]*)</g,

    // Select placeholders
    selectPlaceholders: /<SelectValue[^>]*placeholder\s*=\s*["']([^"']*[a-zA-Z][^"']*)["']/g
  },

  // Module to namespace mapping
  namespaceMap: {
    'TimesheetManagement': 'timesheet',
    'ProjectManagement': 'projects',
    'RentalManagement': 'rentals',
    'Payroll': 'payrolls',
    'EmployeeManagement': 'employees',
    'EquipmentManagement': 'equipment'
  }
};

/**
 * Generate translation key from text
 */
function generateKey(text, context = '') {
  let key = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_')
    .replace(/^_+|_+$/g, '');

  if (context) {
    key = `${context}.${key}`;
  }

  return key;
}

/**
 * Detect hardcoded text in a file
 */
function detectHardcodedText(filePath, content) {
  const detections = [];

  // Get module namespace
  const moduleName = filePath.split(path.sep).find(part =>
    Object.keys(config.namespaceMap).includes(part)
  );
  const namespace = config.namespaceMap[moduleName] || 'common';

  // Check each pattern
  Object.entries(config.patterns).forEach(([patternName, regex]) => {
    let match;
    while ((match = regex.exec(content)) !== null) {
      const text = match[1].trim();

      // Skip if text is too short, contains only symbols, or looks like a variable
      if (text.length < 2 ||
          !/[a-zA-Z]/.test(text) ||
          /^[A-Z_]+$/.test(text) ||
          /^\{.*\}$/.test(text) ||
          text.includes('{{') ||
          text.includes('${')) {
        continue;
      }

      const key = generateKey(text, getContextFromPattern(patternName));
      const lineNumber = content.substring(0, match.index).split('\n').length;

      detections.push({
        text,
        key,
        namespace,
        patternName,
        lineNumber,
        originalMatch: match[0],
        suggestedReplacement: generateReplacement(match[0], key, namespace, patternName)
      });
    }
  });

  return detections;
}

/**
 * Get context prefix from pattern name
 */
function getContextFromPattern(patternName) {
  const contextMap = {
    'formElements': 'forms',
    'buttonText': 'buttons',
    'headings': 'headings',
    'tableHeaders': 'table',
    'formLabels': 'forms',
    'cardTitles': 'cards',
    'selectPlaceholders': 'forms'
  };

  return contextMap[patternName] || '';
}

/**
 * Generate replacement suggestion
 */
function generateReplacement(original, key, namespace, patternName) {
  const tCall = `{t('${key}')}`;

  switch (patternName) {
    case 'formElements':
      return original.replace(/(["'])([^"']+)(["'])/, `$1${tCall}$3`);
    case 'buttonText':
    case 'headings':
    case 'tableHeaders':
    case 'formLabels':
    case 'cardTitles':
      return original.replace(/>([^<]+)</, `>${tCall}<`);
    case 'selectPlaceholders':
      return original.replace(/placeholder\s*=\s*["']([^"']+)["']/, `placeholder=${tCall}`);
    default:
      return `${original} → ${tCall}`;
  }
}

/**
 * Process a single file
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const detections = detectHardcodedText(filePath, content);

    if (detections.length === 0) {
      return null;
    }

    return {
      filePath,
      detections,
      hasUseTranslation: content.includes('useTranslation'),
      hasImport: content.includes("from 'react-i18next'")
    };
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Generate implementation suggestions
 */
function generateImplementationSuggestions(fileResult) {
  const { filePath, detections, hasUseTranslation, hasImport } = fileResult;
  const namespace = detections[0]?.namespace || 'common';

  let suggestions = [];

  // Import suggestion
  if (!hasImport) {
    suggestions.push({
      type: 'import',
      suggestion: "Add import: import { useTranslation } from 'react-i18next';"
    });
  }

  // Hook suggestion
  if (!hasUseTranslation) {
    suggestions.push({
      type: 'hook',
      suggestion: `Add hook: const { t } = useTranslation('${namespace}');`
    });
  }

  // Replacement suggestions
  detections.forEach(detection => {
    suggestions.push({
      type: 'replacement',
      lineNumber: detection.lineNumber,
      original: detection.originalMatch,
      replacement: detection.suggestedReplacement,
      translationKey: detection.key,
      translationValue: detection.text
    });
  });

  return suggestions;
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Phase 1 i18n Implementation Helper\n');

  const allFiles = [];

  // Collect all target files
  config.targetDirs.forEach(pattern => {
    const files = glob.sync(pattern, { cwd: process.cwd() });
    allFiles.push(...files);
  });

  console.log(`📁 Found ${allFiles.length} files to analyze\n`);

  const results = [];
  let totalDetections = 0;

  // Process each file
  allFiles.forEach(filePath => {
    const result = processFile(filePath);
    if (result) {
      results.push(result);
      totalDetections += result.detections.length;
    }
  });

  console.log(`🔍 Analysis Complete:`);
  console.log(`   - Files with hardcoded text: ${results.length}`);
  console.log(`   - Total hardcoded strings: ${totalDetections}\n`);

  // Generate detailed report
  if (results.length > 0) {
    console.log('📋 IMPLEMENTATION SUGGESTIONS:\n');

    results.slice(0, 5).forEach((fileResult, index) => {
      console.log(`${index + 1}. ${fileResult.filePath}`);
      console.log(`   Hardcoded strings: ${fileResult.detections.length}`);

      const suggestions = generateImplementationSuggestions(fileResult);

      suggestions.forEach(suggestion => {
        switch (suggestion.type) {
          case 'import':
          case 'hook':
            console.log(`   ✨ ${suggestion.suggestion}`);
            break;
          case 'replacement':
            console.log(`   📝 Line ${suggestion.lineNumber}: ${suggestion.original}`);
            console.log(`      → ${suggestion.replacement}`);
            console.log(`      Translation: "${suggestion.translationKey}": "${suggestion.translationValue}"`);
            break;
        }
      });

      console.log('');
    });

    if (results.length > 5) {
      console.log(`... and ${results.length - 5} more files\n`);
    }

    // Generate translation keys file
    generateTranslationKeys(results);

    console.log('📄 Next Steps:');
    console.log('   1. Review the suggestions above');
    console.log('   2. Check generated translation keys in translation-keys-suggestions.json');
    console.log('   3. Implement changes in priority order');
    console.log('   4. Run npm run scan-i18n after making changes');
    console.log('   5. Test with language switching\n');
  } else {
    console.log('✅ No hardcoded text detected in target files!');
  }
}

/**
 * Generate translation keys suggestions file
 */
function generateTranslationKeys(results) {
  const keysByNamespace = {};

  results.forEach(fileResult => {
    fileResult.detections.forEach(detection => {
      if (!keysByNamespace[detection.namespace]) {
        keysByNamespace[detection.namespace] = {};
      }
      keysByNamespace[detection.namespace][detection.key] = detection.text;
    });
  });

  const outputFile = 'translation-keys-suggestions.json';
  fs.writeFileSync(outputFile, JSON.stringify(keysByNamespace, null, 2));
  console.log(`💾 Translation keys saved to ${outputFile}`);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main, processFile, detectHardcodedText };
