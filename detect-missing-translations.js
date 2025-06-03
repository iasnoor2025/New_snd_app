#!/usr/bin/env node

/**
 * Missing Translations Detector
 *
 * This script helps identify potentially untranslated text in React components
 * by scanning for common patterns of hardcoded text.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  // Directories to scan
  scanDirs: [
    'Modules/TimesheetManagement/resources/js',
    'Modules/ProjectManagement/resources/js',
    'Modules/RentalManagement/resources/js',
    'Modules/Payroll/resources/js',
    'Modules/EmployeeManagement/resources/js',
    'Modules/LeaveManagement/resources/js',
    'Modules/CustomerManagement/resources/js'
  ],

  // File extensions to scan
  extensions: ['.js', '.jsx', '.ts', '.tsx'],

  // Patterns to detect hardcoded text
  patterns: [
    // JSX text content
    { regex: />\s*([A-Z][a-z]+(?:\s+[A-Za-z]+){1,})\s*</g, type: 'JSX content' },

    // Component props with string literals
    { regex: /(?:title|label|placeholder|alt|aria-label|tooltip)=\s*["']([^"'{}][^"']*[a-zA-Z][^"']*)["']/g, type: 'Component prop' },

    // Button/header text
    { regex: /<(?:Button|h[1-6])[^>]*>\s*([A-Z][a-z]+(?:\s+[A-Za-z]+){1,})\s*</g, type: 'Button/header text' },

    // Table headers
    { regex: /<(?:th|TableHead)[^>]*>\s*([A-Z][a-z]+(?:\s+[A-Za-z]+){1,})\s*</g, type: 'Table header' },
  ],

  // Patterns to ignore (already translated or false positives)
  ignorePatterns: [
    // t function calls
    /\{\s*t\s*\([^)]+\)\s*\}/,

    // Variables and expressions
    /\{[^}]*\}/,

    // Common component names that might be mistaken for text
    /<(?:Header|Footer|Container|Wrapper|Content|Layout|Panel|Section|Row|Column)>/i,

    // Common variable names in JSX
    /\{(?:item|data|record|row|value|index|key|id|name|title|label|content|children|props)\}/i
  ],

  // Translation function patterns to detect existing translations
  translationFunctions: [
    /\bt\s*\(['"]([^'"]+)['"](?:,\s*\{[^}]*\})?\)/g,  // t('key') or t('key', {options})
    /useTranslation\s*\(['"]([^'"]+)['"]\)/g,           // useTranslation('namespace')
    /Trans\s+i18nKey=['"]([^'"]+)['"]\s*>/g             // <Trans i18nKey="key">
  ],

  // Output file for the report
  outputFile: 'missing-translations-report.md'
};

/**
 * Check if a line should be ignored
 */
function shouldIgnore(line) {
  return config.ignorePatterns.some(pattern => pattern.test(line));
}

/**
 * Recursively scan directory for files
 */
function scanDirectory(dir) {
  const files = [];
  try {
    const entries = fs.readdirSync(path.join(process.cwd(), dir), { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = fullPath;

      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        files.push(...scanDirectory(fullPath));
      } else if (entry.isFile() && config.extensions.includes(path.extname(entry.name))) {
        // Only include files with specified extensions
        files.push(relativePath);
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error);
  }

  return files;
}

/**
 * Extract existing translation keys from a file
 */
function extractExistingTranslations(content) {
  const translations = new Set();

  config.translationFunctions.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      if (match[1]) {
        translations.add(match[1]);
      }
    }
  });

  return translations;
}

/**
 * Detect potential hardcoded text in a file
 */
function detectHardcodedText(filePath, content) {
  const detections = [];
  const lines = content.split('\n');
  const existingTranslations = extractExistingTranslations(content);

  // Check each line for hardcoded text patterns
  lines.forEach((line, lineIndex) => {
    if (shouldIgnore(line)) {
      return;
    }

    config.patterns.forEach(({ regex, type }) => {
      let match;
      while ((match = regex.exec(line)) !== null) {
        const text = match[1].trim();

        // Skip if text is too short, contains only symbols, or looks like a variable
        if (text.length < 3 ||
            !/[a-zA-Z]/.test(text) ||
            /^[A-Z_]+$/.test(text) ||
            text.includes('{{') ||
            text.includes('${')) {
          continue;
        }

        detections.push({
          filePath,
          lineNumber: lineIndex + 1,
          text,
          type,
          context: line.trim()
        });
      }
    });
  });

  return detections;
}

/**
 * Process a single file
 */
function processFile(filePath) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const content = fs.readFileSync(fullPath, 'utf8');
    return detectHardcodedText(filePath, content);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return [];
  }
}

/**
 * Generate a markdown report
 */
function generateReport(results) {
  let report = '# Missing Translations Report\n\n';
  report += `Generated on ${new Date().toLocaleString()}\n\n`;

  // Summary
  const totalFiles = results.length;
  const totalDetections = results.reduce((sum, result) => sum + result.detections.length, 0);

  report += '## Summary\n\n';
  report += `- Total files scanned: ${totalFiles}\n`;
  report += `- Files with potential hardcoded text: ${results.filter(r => r.detections.length > 0).length}\n`;
  report += `- Total potential hardcoded strings: ${totalDetections}\n\n`;

  // Group by module
  const moduleGroups = {};

  results.forEach(result => {
    if (result.detections.length === 0) return;

    // Extract module name from file path
    const moduleName = result.filePath.split(path.sep)[1] || 'Unknown';

    if (!moduleGroups[moduleName]) {
      moduleGroups[moduleName] = [];
    }

    moduleGroups[moduleName].push(result);
  });

  // Generate report by module
  Object.entries(moduleGroups).forEach(([moduleName, moduleResults]) => {
    const moduleDetections = moduleResults.reduce((sum, result) => sum + result.detections.length, 0);

    report += `## ${moduleName} (${moduleDetections} strings)\n\n`;

    moduleResults.forEach(result => {
      report += `### ${result.filePath} (${result.detections.length} strings)\n\n`;
      report += '| Line | Type | Text | Context |\n';
      report += '|------|------|------|---------|\n';

      result.detections.forEach(detection => {
        // Escape pipe characters in markdown table
        const escapedText = detection.text.replace(/\|/g, '\\|');
        const escapedContext = detection.context.replace(/\|/g, '\\|');

        report += `| ${detection.lineNumber} | ${detection.type} | ${escapedText} | ${escapedContext} |\n`;
      });

      report += '\n';
    });
  });

  // Add recommendations
  report += '## Recommendations\n\n';
  report += '1. Review each potential hardcoded string and determine if it should be translated\n';
  report += '2. For strings that need translation, replace with appropriate translation function calls\n';
  report += '3. Add the new translation keys to the translation files\n';
  report += '4. Run the i18n scanner to verify all keys are properly detected\n';
  report += '5. Test the application with different languages to ensure all text is properly translated\n';

  return report;
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Missing Translations Detector\n');

  const allFiles = [];

  // Collect all files to scan
  config.scanDirs.forEach(dir => {
    console.log(`Scanning directory: ${dir}`);
    const files = scanDirectory(dir);
    console.log(`Found ${files.length} files in ${dir}`);
    allFiles.push(...files);
  });

  console.log(`\n📁 Total files to scan: ${allFiles.length}\n`);

  // Process each file
  const results = [];
  let processedCount = 0;

  allFiles.forEach(filePath => {
    const detections = processFile(filePath);
    results.push({ filePath, detections });

    processedCount++;
    if (processedCount % 10 === 0 || processedCount === allFiles.length) {
      console.log(`Processed ${processedCount}/${allFiles.length} files...`);
    }
  });

  // Generate and save report
  const report = generateReport(results);
  fs.writeFileSync(config.outputFile, report);

  // Print summary
  const totalDetections = results.reduce((sum, result) => sum + result.detections.length, 0);
  const filesWithDetections = results.filter(r => r.detections.length > 0).length;

  console.log('\n✅ Scan complete!');
  console.log(`Found ${totalDetections} potential hardcoded strings in ${filesWithDetections} files`);
  console.log(`Report saved to ${config.outputFile}`);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main, processFile, detectHardcodedText };
