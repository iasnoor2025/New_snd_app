/**
 * Unused Translation Keys Detector
 *
 * This script scans the codebase and translation files to identify translation keys
 * that are defined in translation files but not used in the code.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const config = require('./i18n-config');

// Load all translation keys from translation files
function loadTranslationKeys() {
  const allKeys = {};

  config.languages.forEach(lang => {
    config.namespaces.forEach(ns => {
      const filePath = path.join(__dirname, 'public', 'locales', lang, `${ns}.json`);

      if (fs.existsSync(filePath)) {
        try {
          const translations = JSON.parse(fs.readFileSync(filePath, 'utf8'));

          // Store all keys with their namespace
          Object.keys(translations).forEach(key => {
            const fullKey = `${ns}:${key}`;
            if (!allKeys[fullKey]) {
              allKeys[fullKey] = {
                key: fullKey,
                namespaces: [ns],
                languages: [lang],
                usageCount: 0
              };
            } else {
              if (!allKeys[fullKey].languages.includes(lang)) {
                allKeys[fullKey].languages.push(lang);
              }
            }
          });
        } catch (error) {
          console.error(`Error reading translation file ${filePath}:`, error.message);
        }
      }
    });
  });

  return allKeys;
}

// Find all translation key usages in the code
function findKeyUsages(allKeys) {
  // Get all JS/JSX/TS/TSX files
  const files = [];

  config.scanPatterns.forEach(pattern => {
    const matches = glob.sync(pattern, { ignore: config.excludePatterns });
    files.push(...matches);
  });

  console.log(`Scanning ${files.length} files for translation key usage...`);

  // Scan each file for translation key usage
  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');

      // Check for each translation function pattern
      config.functionNames.forEach(funcName => {
        // Create regex patterns for different usage styles
        // e.g., t('namespace:key'), t("namespace:key"), etc.
        const patterns = [
          new RegExp(`${funcName}\s*\(\s*['\"](.*?)['\"]`, 'g'),
          new RegExp(`${funcName}\s*\(\s*\{\s*i18nKey\s*:\s*['\"](.*?)['\"]`, 'g')
        ];

        patterns.forEach(pattern => {
          let match;
          while ((match = pattern.exec(content)) !== null) {
            const key = match[1];

            // Handle keys with and without namespace
            let fullKey = key;
            if (!key.includes(':')) {
              // If no namespace specified, check all namespaces
              config.namespaces.forEach(ns => {
                const nsKey = `${ns}:${key}`;
                if (allKeys[nsKey]) {
                  allKeys[nsKey].usageCount++;
                }
              });
            } else if (allKeys[key]) {
              allKeys[key].usageCount++;
            }
          }
        });
      });
    } catch (error) {
      console.error(`Error scanning file ${file}:`, error.message);
    }
  });

  return allKeys;
}

// Generate report of unused keys
function generateUnusedKeysReport(allKeys) {
  const unusedKeys = Object.values(allKeys).filter(item => item.usageCount === 0);

  console.log('\n=== Unused Translation Keys Report ===');
  console.log(`Found ${unusedKeys.length} unused translation keys out of ${Object.keys(allKeys).length} total keys.`);

  if (unusedKeys.length > 0) {
    console.log('\nUnused keys by namespace:');

    // Group by namespace
    const byNamespace = {};
    unusedKeys.forEach(item => {
      item.namespaces.forEach(ns => {
        if (!byNamespace[ns]) byNamespace[ns] = [];
        byNamespace[ns].push(item.key);
      });
    });

    // Print by namespace
    Object.entries(byNamespace).forEach(([ns, keys]) => {
      console.log(`\n${ns} (${keys.length} unused keys):`);
      keys.forEach(key => console.log(`  - ${key}`));
    });

    // Save to file
    const reportPath = path.join(__dirname, 'i18n-unused-keys-report.json');
    fs.writeFileSync(
      reportPath,
      JSON.stringify({
        timestamp: new Date().toISOString(),
        totalKeys: Object.keys(allKeys).length,
        unusedKeys: unusedKeys.length,
        keys: unusedKeys
      }, null, 2)
    );

    console.log(`\nDetailed report saved to: ${reportPath}`);
    console.log('\nConsider removing these unused keys to keep translation files clean.');
  } else {
    console.log('Great! All translation keys are being used in the codebase.');
  }
}

// Main function
function main() {
  console.log('Scanning for unused translation keys...');

  // Load all translation keys
  const allKeys = loadTranslationKeys();
  console.log(`Loaded ${Object.keys(allKeys).length} translation keys from translation files.`);

  // Find key usages
  const keysWithUsage = findKeyUsages(allKeys);

  // Generate report
  generateUnusedKeysReport(keysWithUsage);
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { loadTranslationKeys, findKeyUsages, generateUnusedKeysReport };
