#!/usr/bin/env node

/**
 * Replace Hardcoded Strings with Translation Function Calls
 *
 * This script automatically replaces hardcoded strings in React components
 * with appropriate translation function calls using react-i18next.
 */

const fs = require('fs');
const path = require('path');

/**
 * Replace hardcoded strings with translation function calls
 */
class StringReplacer {
  constructor(options = {}) {
    this.dryRun = options.dryRun || false;
    this.verbose = options.verbose || false;
    this.targetModule = options.targetModule || null;
    this.translations = this.loadTranslations();
    this.stats = {
      filesProcessed: 0,
      filesModified: 0,
      stringsReplaced: 0,
      errors: []
    };
  }

  /**
   * Load all translation files
   */
  loadTranslations() {
    const translations = {};
    const langDir = 'resources/lang/en';

    if (!fs.existsSync(langDir)) {
      console.error('❌ Translation files not found in resources/lang/en/');
      console.log('Please run: node generate-translation-keys.js');
      return {};
    }

    const files = fs.readdirSync(langDir);
    files.forEach(file => {
      if (file.endsWith('.json')) {
        try {
          const namespace = path.basename(file, '.json');
          const content = JSON.parse(fs.readFileSync(path.join(langDir, file), 'utf8'));
          translations[namespace] = content;

          if (this.verbose) {
            console.log(`📖 Loaded ${Object.keys(content).length} keys from ${namespace}.json`);
          }
        } catch (error) {
          console.error(`❌ Error loading ${file}:`, error.message);
        }
      }
    });

    return translations;
  }

  /**
   * Find translation key for a given text
   */
  findTranslationKey(text, preferredNamespace = 'common') {
    // First try the preferred namespace
    if (this.translations[preferredNamespace]) {
      for (const [key, value] of Object.entries(this.translations[preferredNamespace])) {
        if (value === text) {
          return { key, namespace: preferredNamespace };
        }
      }
    }

    // Then try all other namespaces
    for (const [namespace, translations] of Object.entries(this.translations)) {
      if (namespace === preferredNamespace) continue;

      for (const [key, value] of Object.entries(translations)) {
        if (value === text) {
          return { key, namespace };
        }
      }
    }

    return null;
  }

  /**
   * Get namespace from file path
   */
  getNamespaceFromPath(filePath) {
    if (filePath.includes('TimesheetManagement')) return 'timesheet';
    if (filePath.includes('ProjectManagement')) return 'project';
    if (filePath.includes('RentalManagement')) return 'rental';
    if (filePath.includes('EmployeeManagement')) return 'employee';
    if (filePath.includes('Payroll')) return 'payroll';
    if (filePath.includes('LeaveManagement')) return 'leave';
    if (filePath.includes('CustomerManagement')) return 'customer';
    return 'common';
  }

  /**
   * Add useTranslation import to file if not present
   */
  addUseTranslationImport(content) {
    // Check if useTranslation is already imported
    if (content.includes('useTranslation') || content.includes('import.*useTranslation')) {
      return content;
    }

    // Find React import to add after it
    const reactImportMatch = content.match(/(import.*from\s+['"]react['"];?)/m);
    if (reactImportMatch) {
      return content.replace(
        reactImportMatch[1],
        `${reactImportMatch[1]}\nimport { useTranslation } from 'react-i18next';`
      );
    }

    // If no React import found, add at the top after other imports
    const lastImportMatch = content.match(/(import.*from.*['"];?)(?=\s*\n\s*(?!import))/m);
    if (lastImportMatch) {
      return content.replace(
        lastImportMatch[1],
        `${lastImportMatch[1]}\nimport { useTranslation } from 'react-i18next';`
      );
    }

    // If no imports found, add at the very top
    return `import { useTranslation } from 'react-i18next';\n${content}`;
  }

  /**
   * Add useTranslation hook to component if not present
   */
  addUseTranslationHook(content, namespace) {
    // Check if useTranslation hook is already used
    if (content.includes('useTranslation(')) {
      return content;
    }

    // Find component function/const declaration
    const patterns = [
      // Function component: function ComponentName() {
      /(function\s+\w+\s*\([^)]*\)\s*{)/,
      // Arrow function: const ComponentName = () => {
      /(const\s+\w+\s*=\s*\([^)]*\)\s*=>\s*{)/,
      // Arrow function: export default function ComponentName() {
      /(export\s+default\s+function\s+\w+\s*\([^)]*\)\s*{)/
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        const hookLine = `  const { t } = useTranslation('${namespace}');\n`;
        return content.replace(
          match[1],
          `${match[1]}\n${hookLine}`
        );
      }
    }

    return content;
  }

  /**
   * Replace hardcoded strings in file content
   */
  replaceStringsInContent(content, namespace) {
    let modified = content;
    let replacementCount = 0;

    // Pattern 1: JSX content between tags: >Text<
    const jsxContentPattern = />\s*([A-Z][a-z]+(?:\s+[A-Za-z]+){1,})\s*</g;
    modified = modified.replace(jsxContentPattern, (match, text) => {
      const translationKey = this.findTranslationKey(text, namespace);
      if (translationKey) {
        const keyRef = translationKey.namespace === namespace ?
          translationKey.key :
          `${translationKey.namespace}:${translationKey.key}`;
        replacementCount++;
        return match.replace(text, `{t('${keyRef}')}`);
      }
      return match;
    });

    // Pattern 2: Component props with string literals
    const propPattern = /((?:title|label|placeholder|alt|aria-label|tooltip)=\s*["'])([^"'{}][^"']*[a-zA-Z][^"']*)(["'])/g;
    modified = modified.replace(propPattern, (match, prefix, text, suffix) => {
      const translationKey = this.findTranslationKey(text, namespace);
      if (translationKey) {
        const keyRef = translationKey.namespace === namespace ?
          translationKey.key :
          `${translationKey.namespace}:${translationKey.key}`;
        replacementCount++;
        return `${prefix.slice(0, -1)}{t('${keyRef}')}${suffix.slice(1)}`;
      }
      return match;
    });

    // Pattern 3: Button and header text
    const buttonHeaderPattern = /<(Button|h[1-6])[^>]*>\s*([A-Z][a-z]+(?:\s+[A-Za-z]+){1,})\s*<\/(Button|h[1-6])>/g;
    modified = modified.replace(buttonHeaderPattern, (match, openTag, text, closeTag) => {
      const translationKey = this.findTranslationKey(text, namespace);
      if (translationKey) {
        const keyRef = translationKey.namespace === namespace ?
          translationKey.key :
          `${translationKey.namespace}:${translationKey.key}`;
        replacementCount++;
        return match.replace(text, `{t('${keyRef}')}`);
      }
      return match;
    });

    // Pattern 4: Table headers
    const tableHeaderPattern = /<(th|TableHead)[^>]*>\s*([A-Z][a-z]+(?:\s+[A-Za-z]+){1,})\s*<\/(th|TableHead)>/g;
    modified = modified.replace(tableHeaderPattern, (match, openTag, text, closeTag) => {
      const translationKey = this.findTranslationKey(text, namespace);
      if (translationKey) {
        const keyRef = translationKey.namespace === namespace ?
          translationKey.key :
          `${translationKey.namespace}:${translationKey.key}`;
        replacementCount++;
        return match.replace(text, `{t('${keyRef}')}`);
      }
      return match;
    });

    return { content: modified, replacementCount };
  }

  /**
   * Process a single file
   */
  processFile(filePath) {
    try {
      this.stats.filesProcessed++;

      const content = fs.readFileSync(filePath, 'utf8');
      const namespace = this.getNamespaceFromPath(filePath);

      // Skip files that already use translation functions extensively
      const translationCallCount = (content.match(/\bt\s*\(/g) || []).length;
      if (translationCallCount > 10) {
        if (this.verbose) {
          console.log(`⏭️  Skipping ${filePath} (already has ${translationCallCount} translation calls)`);
        }
        return false;
      }

      let modified = content;

      // Add useTranslation import
      modified = this.addUseTranslationImport(modified);

      // Add useTranslation hook
      modified = this.addUseTranslationHook(modified, namespace);

      // Replace hardcoded strings
      const { content: finalContent, replacementCount } = this.replaceStringsInContent(modified, namespace);

      if (finalContent !== content) {
        this.stats.stringsReplaced += replacementCount;

        if (!this.dryRun) {
          fs.writeFileSync(filePath, finalContent);
        }

        this.stats.filesModified++;
        console.log(`✅ ${this.dryRun ? '[DRY RUN] ' : ''}Updated ${filePath} (${replacementCount} replacements)`);
        return true;
      }

      if (this.verbose) {
        console.log(`⏭️  No changes needed for ${filePath}`);
      }
      return false;

    } catch (error) {
      const errorMsg = `Error processing ${filePath}: ${error.message}`;
      this.stats.errors.push(errorMsg);
      console.error(`❌ ${errorMsg}`);
      return false;
    }
  }

  /**
   * Recursively scan directory for files
   */
  scanDirectory(dir) {
    const files = [];

    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      entries.forEach(entry => {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          files.push(...this.scanDirectory(fullPath));
        } else if (['.js', '.jsx', '.ts', '.tsx'].includes(path.extname(entry.name))) {
          files.push(fullPath);
        }
      });
    } catch (error) {
      console.error(`❌ Error scanning directory ${dir}:`, error.message);
    }

    return files;
  }

  /**
   * Process a module directory
   */
  processModule(modulePath) {
    if (!fs.existsSync(modulePath)) {
      console.error(`❌ Module path does not exist: ${modulePath}`);
      return;
    }

    console.log(`\n📂 Processing module: ${modulePath}`);
    const files = this.scanDirectory(modulePath);

    if (files.length === 0) {
      console.log(`⚠️  No React files found in ${modulePath}`);
      return;
    }

    console.log(`📄 Found ${files.length} files to process`);

    files.forEach(file => {
      this.processFile(file);
    });
  }

  /**
   * Process all modules or a specific module
   */
  processAll() {
    const modules = [
      'Modules/CustomerManagement/resources/js', // Start with smallest
      'Modules/TimesheetManagement/resources/js',
      'Modules/LeaveManagement/resources/js',
      'Modules/Payroll/resources/js',
      'Modules/ProjectManagement/resources/js',
      'Modules/EmployeeManagement/resources/js',
      'Modules/RentalManagement/resources/js'
    ];

    const targetModules = this.targetModule ?
      modules.filter(m => m.includes(this.targetModule)) :
      modules;

    if (targetModules.length === 0) {
      console.error(`❌ No modules found matching: ${this.targetModule}`);
      return;
    }

    targetModules.forEach(module => {
      this.processModule(module);
    });
  }

  /**
   * Print final statistics
   */
  printStats() {
    console.log('\n📊 Processing Summary:');
    console.log(`  - Files processed: ${this.stats.filesProcessed}`);
    console.log(`  - Files modified: ${this.stats.filesModified}`);
    console.log(`  - Strings replaced: ${this.stats.stringsReplaced}`);
    console.log(`  - Errors: ${this.stats.errors.length}`);

    if (this.stats.errors.length > 0) {
      console.log('\n❌ Errors encountered:');
      this.stats.errors.forEach(error => {
        console.log(`  - ${error}`);
      });
    }

    if (this.dryRun) {
      console.log('\n🔍 This was a dry run. No files were actually modified.');
      console.log('Run without --dry-run to apply changes.');
    }
  }
}

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    dryRun: false,
    verbose: false,
    targetModule: null
  };

  args.forEach(arg => {
    if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--verbose' || arg === '-v') {
      options.verbose = true;
    } else if (arg.startsWith('--module=')) {
      options.targetModule = arg.split('=')[1];
    } else if (arg === '--help' || arg === '-h') {
      console.log(`
Usage: node replace-hardcoded-strings.js [options]

Options:
  --dry-run          Show what would be changed without modifying files
  --verbose, -v      Show detailed output
  --module=NAME      Process only the specified module (e.g., CustomerManagement)
  --help, -h         Show this help message

Examples:
  node replace-hardcoded-strings.js
  node replace-hardcoded-strings.js --dry-run
  node replace-hardcoded-strings.js --module=CustomerManagement
  node replace-hardcoded-strings.js --dry-run --verbose
`);
      process.exit(0);
    }
  });

  return options;
}

// Main execution
if (require.main === module) {
  const options = parseArgs();

  console.log('🔄 Hardcoded String Replacer\n');

  if (options.dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n');
  }

  const replacer = new StringReplacer(options);

  // Check if translation files exist
  if (Object.keys(replacer.translations).length === 0) {
    console.error('❌ No translation files found. Please run generate-translation-keys.js first.');
    process.exit(1);
  }

  console.log(`📚 Loaded translations for ${Object.keys(replacer.translations).length} namespaces`);

  replacer.processAll();
  replacer.printStats();

  console.log('\n🎉 String replacement complete!');

  if (!options.dryRun && replacer.stats.filesModified > 0) {
    console.log('\n📝 Next steps:');
    console.log('  1. Test your application to ensure everything works');
    console.log('  2. Run: node detect-missing-translations.js (should show fewer strings)');
    console.log('  3. Set up i18n configuration in your React app');
    console.log('  4. Test language switching functionality');
  }
}

module.exports = StringReplacer;
