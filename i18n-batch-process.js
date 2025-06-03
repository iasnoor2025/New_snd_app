const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const config = require('./i18n-config');

/**
 * This script automates the internationalization process across multiple modules.
 * It scans for React components with hardcoded text and processes them in batch.
 *
 * Usage: node i18n-batch-process.js [module1,module2,...]
 */

// Get modules from command line arguments or use defaults
let modulesToProcess = Object.keys(config.moduleNamespaceMap);
if (process.argv.length > 2) {
  modulesToProcess = process.argv[2].split(',');
}

console.log(`Starting batch internationalization process for modules: ${modulesToProcess.join(', ')}`);

// Process each module
let totalFilesProcessed = 0;
let totalFilesWithHardcodedText = 0;
let moduleResults = {};

// Create a timestamp for the report
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

// Process modules sequentially with progress tracking
processModules(modulesToProcess, 0);

// Run the i18next-scanner to update translation files
console.log('\nRunning i18next-scanner to update translation files...');
try {
  execSync('npm run scan-i18n', { stdio: 'inherit' });
  console.log('Translation files updated successfully!');
} catch (error) {
  console.error('Error updating translation files:', error.message);
}

/**
 * Process modules one by one with progress tracking
 */
function processModules(modules, index) {
  if (index >= modules.length) {
    // All modules processed, show summary and run scanner
    showSummary();
    runScanner();
    return;
  }

  const module = modules[index];
  console.log(`\n\n=== Processing ${module} module (${index + 1}/${modules.length}) ===`);

  const moduleFiles = findReactComponentsInModule(module);
  console.log(`Found ${moduleFiles.length} React component files in ${module} module`);

  let filesWithHardcodedText = 0;
  let processedCount = 0;

  // Process files with progress tracking
  moduleFiles.forEach((file, fileIndex) => {
    // Show progress percentage
    const progress = Math.round((fileIndex / moduleFiles.length) * 100);
    process.stdout.write(`\rProgress: ${progress}% (${fileIndex}/${moduleFiles.length} files)`);

    const result = analyzeFile(file);
    totalFilesProcessed++;
    processedCount++;

    if (result.hasHardcodedText) {
      filesWithHardcodedText++;
      totalFilesWithHardcodedText++;
    }
  });

  // Complete the progress line
  console.log(`\rProgress: 100% (${moduleFiles.length}/${moduleFiles.length} files)`);

  // Store results for this module
  moduleResults[module] = {
    total: moduleFiles.length,
    withHardcodedText: filesWithHardcodedText,
    completionRate: moduleFiles.length > 0 ?
      Math.round((moduleFiles.length - filesWithHardcodedText) / moduleFiles.length * 100) : 100
  };

  console.log(`${module} module: ${filesWithHardcodedText} files contain hardcoded text out of ${moduleFiles.length} files`);
  console.log(`Module completion rate: ${moduleResults[module].completionRate}%`);

  // Process next module
  processModules(modules, index + 1);
}

/**
 * Show summary of all processed modules
 */
function showSummary() {
  console.log(`\n\n=== Batch Internationalization Summary ===`);
  console.log(`Total files processed: ${totalFilesProcessed}`);
  console.log(`Files with hardcoded text: ${totalFilesWithHardcodedText}`);

  const overallCompletionRate = totalFilesProcessed > 0 ?
    Math.round((totalFilesProcessed - totalFilesWithHardcodedText) / totalFilesProcessed * 100) : 100;

  console.log(`Overall completion rate: ${overallCompletionRate}%`);

  console.log('\nModule-by-module completion rates:');
  Object.entries(moduleResults).forEach(([module, result]) => {
    const completionBar = createProgressBar(result.completionRate);
    console.log(`${module.padEnd(15)}: ${completionBar} ${result.completionRate}%`);
  });

  // Generate report file
  generateReport();
}

/**
 * Create a visual progress bar
 */
function createProgressBar(percentage, length = 20) {
  const filledLength = Math.round(length * percentage / 100);
  const emptyLength = length - filledLength;

  return '[' + '='.repeat(filledLength) + ' '.repeat(emptyLength) + ']';
}

/**
 * Generate a detailed report file
 */
function generateReport() {
  const reportPath = path.join(__dirname, `i18n-report-${timestamp}.json`);

  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalFiles: totalFilesProcessed,
      filesWithHardcodedText: totalFilesWithHardcodedText,
      completionRate: totalFilesProcessed > 0 ?
        Math.round((totalFilesProcessed - totalFilesWithHardcodedText) / totalFilesProcessed * 100) : 100
    },
    moduleResults
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nDetailed JSON report saved to: ${reportPath}`);

  // Generate HTML report
  try {
    const reportGenerator = require('./i18n-report-generator');
    const htmlReportPath = reportGenerator.generateHtmlReport(reportPath);
    console.log(`HTML report generated: ${htmlReportPath}`);
    console.log('Open the HTML report in a browser to view the detailed status.');
  } catch (error) {
    console.error('Error generating HTML report:', error.message);
  }
}

/**
 * Run i18next-scanner to update translation files
 */
function runScanner() {
  console.log('\nRunning i18next-scanner to update translation files...');
  try {
    execSync('npm run scan-i18n', { stdio: 'inherit' });
    console.log('Translation files updated successfully!');
  } catch (error) {
    console.error('Error updating translation files:', error.message);
  }
}

/**
 * Finds React component files in the specified module
 */
function findReactComponentsInModule(moduleName) {
  // Use the module path from config if available, otherwise use default path
  const moduleDir = path.join(__dirname, 'src', moduleName);
  let files = [];

  try {
    // Check if directory exists
    if (!fs.existsSync(moduleDir)) {
      console.error(`Module directory not found: ${moduleDir}`);
      return files;
    }

    // Recursively find all .js and .jsx files
    files = findReactFiles(moduleDir);
  } catch (error) {
    console.error(`Error finding files in ${moduleName}:`, error.message);
  }

  return files;
}

/**
 * Recursively finds React files (.js, .jsx) in a directory
 */
function findReactFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively search directories
      results = results.concat(findReactFiles(filePath));
    } else {
      // Check if it's a React file
      if (file.endsWith('.js') || file.endsWith('.jsx')) {
        // Skip files that are already using i18n
        const content = fs.readFileSync(filePath, 'utf8');
        if (!content.includes('useTranslation') && !content.includes('withTranslation')) {
          results.push(filePath);
        }
      }
    }
  });

  return results;
}

/**
 * Analyzes a file for hardcoded text using suggest-translations.js
 */
function analyzeFile(filePath) {
  try {
    // Run suggest-translations.js on the file
    const output = execSync(`node --require=esm suggest-translations.js "${filePath}"`, { encoding: 'utf8' });

    // Check if hardcoded text was found
    const hasHardcodedText = !output.includes('No potential hardcoded text found.');

    if (hasHardcodedText) {
      // Count the number of suggestions
      const matches = output.match(/Suggested key:/g);
      const count = matches ? matches.length : 0;

      // Print a compact summary
      process.stdout.write(`\n  ⚠️  ${path.basename(filePath)}: ${count} hardcoded strings found`);
    }

    return { hasHardcodedText };
  } catch (error) {
    console.error(`\n  ❌ Error analyzing ${path.basename(filePath)}:`, error.message);
    return { hasHardcodedText: false, error: error.message };
  }
}
