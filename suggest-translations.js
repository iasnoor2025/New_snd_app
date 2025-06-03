const fs = require('fs');
const path = require('path');
const config = require('./i18n-config');

/**
 * This script analyzes a React component file and suggests translation keys
 * for hardcoded text that should be internationalized.
 *
 * Usage: node --require=esm suggest-translations.js <file-path>
 */

// Get the file path from command line arguments
const filePath = process.argv[2];

if (!filePath) {
  console.error('Please provide a file path to analyze');
  console.error('Usage: node --require=esm suggest-translations.js <file-path>');
  process.exit(1);
}

// Read the file
try {
  const content = fs.readFileSync(filePath, 'utf8');
  analyzeFile(content, filePath);
} catch (error) {
  console.error(`Error reading file: ${error.message}`);
  process.exit(1);
}

/**
 * Analyzes a file for potential hardcoded text that should be internationalized
 */
function analyzeFile(content, filePath) {
  // Determine the appropriate namespace based on the file path
  let namespace = config.defaultNamespace;

  // Check if the file path matches any of the module namespace mappings
  for (const [moduleName, moduleNamespace] of Object.entries(config.moduleNamespaceMap)) {
    if (filePath.includes(moduleName)) {
      namespace = moduleNamespace;
      break;
    }
  }

  console.log(`Analyzing file: ${filePath}`);
  console.log(`Suggested namespace: ${namespace}`);
  console.log('\nPotential hardcoded text found:');
  console.log('================================');

  // Track found items to avoid duplicates
  const foundItems = new Set();
  let count = 0;

  // Find potential hardcoded text in JSX
  // Improved regex to better handle JSX content and avoid false positives
  const jsxTextRegex = />\s*([^<>{}\n]+?)(?!\{)\s*</g;
  let match;

  while ((match = jsxTextRegex.exec(content)) !== null) {
    const text = match[1].trim();

    // Skip if text is just whitespace, numbers, or very short
    if (!text || text.length < 2 || /^\d+$/.test(text)) continue;

    // Skip if text looks like a variable or code
    if (text.includes('{') || text.includes('}')) continue;

    // Skip if text is already being processed by i18n
    if (content.includes(`t('${text}'`) || content.includes(`t("${text}"`)) continue;

    // Generate a key from the text
    const key = generateKeyFromText(text);

    if (key && !foundItems.has(key)) {
      foundItems.add(key);
      count++;
      console.log(`${count}. Text: "${text}"`);
      console.log(`   Suggested key: ${namespace}:${key}`);
      console.log(`   Replace with: {t('${namespace}:${key}')}`);
      console.log(`   Confidence: ${calculateConfidence(text, content)}%`);
      console.log('--------------------------------');
    }
  }

  // Find string literals in component props
  const propStringRegex = /\b(\w+)=\s*["']([^"']+)["']/g;
  while ((match = propStringRegex.exec(content)) !== null) {
    const [_, propName, text] = match;

    // Skip certain props that typically don't need translation
    const nonTranslatableProps = [
      'className', 'style', 'id', 'type', 'name', 'value', 'href', 'src', 'alt',
      'data-', 'aria-', 'key', 'ref', 'for', 'width', 'height', 'size', 'color'
    ];

    // Check if the prop should be skipped
    const shouldSkip = nonTranslatableProps.some(prop => {
      return prop.endsWith('-') ? propName.startsWith(prop) : propName === prop;
    });

    if (shouldSkip) continue;

    // Skip if text is just whitespace, numbers, or very short
    if (!text || text.length < 2 || /^\d+$/.test(text)) continue;

    // Skip if text is already being processed by i18n
    if (content.includes(`t('${text}'`) || content.includes(`t("${text}"`)) continue;

    // Generate a key from the text
    const key = generateKeyFromText(text);
    const fullKey = `${namespace}:${key}`;

    if (key && !foundItems.has(fullKey)) {
      foundItems.add(fullKey);
      count++;
      console.log(`${count}. Prop: ${propName}="${text}"`);
      console.log(`   Suggested key: ${fullKey}`);
      console.log(`   Replace with: ${propName}={t('${fullKey}')}`);
      console.log(`   Confidence: ${calculateConfidence(text, content)}%`);
      console.log('--------------------------------');
    }
  }

  // Find template literals that might contain hardcoded text
  const templateLiteralRegex = /`([^`${}]+)`/g;
  while ((match = templateLiteralRegex.exec(content)) !== null) {
    const text = match[1].trim();

    // Skip if text is just whitespace, numbers, or very short
    if (!text || text.length < 2 || /^\d+$/.test(text)) continue;

    // Generate a key from the text
    const key = generateKeyFromText(text);
    const fullKey = `${namespace}:${key}`;

    if (key && !foundItems.has(fullKey)) {
      foundItems.add(fullKey);
      count++;
      console.log(`${count}. Template literal: \`${text}\``);
      console.log(`   Suggested key: ${fullKey}`);
      console.log(`   Replace with: \${t('${fullKey}')}`);
      console.log(`   Confidence: ${calculateConfidence(text, content)}%`);
      console.log('--------------------------------');
    }
  }

  if (count === 0) {
    console.log('No potential hardcoded text found.');
  } else {
    console.log(`\nFound ${count} potential items to internationalize.`);
    console.log('\nNext steps:');
    console.log('1. Add the useTranslation hook to your component:');
    console.log('   import { useTranslation } from "react-i18next";');
    console.log(`   const { t } = useTranslation(['${namespace}', 'common']);`);
    console.log('2. Replace the hardcoded text with t() function calls as suggested above.');
    console.log('3. Run the i18next-scanner to update translation files:');
    console.log('   npm run scan-i18n');
  }
}

/**
 * Generates a standardized key from text
 */
function generateKeyFromText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .substring(0, 50); // Limit key length
}

/**
 * Calculate confidence score for a potential translation
 * Higher score means more likely to be a good translation candidate
 */
function calculateConfidence(text, fileContent) {
  let score = 50; // Base score

  // Increase score for longer text (more likely to be a sentence)
  if (text.length > 10) score += 10;
  if (text.length > 20) score += 10;

  // Increase score for text with spaces (likely phrases)
  if (text.includes(' ')) score += 10;

  // Increase score for text with punctuation (likely complete sentences)
  if (/[.!?]/.test(text)) score += 10;

  // Decrease score for text that looks like code
  if (/^[A-Z][a-z]+([A-Z][a-z]+)+$/.test(text)) score -= 20; // camelCase or PascalCase
  if (text.includes('_') && text === text.toUpperCase()) score -= 20; // CONSTANT_CASE

  // Decrease score if text appears multiple times (might be a variable)
  const occurrences = (fileContent.match(new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  if (occurrences > 2) score -= 10;

  // Cap the score
  return Math.max(0, Math.min(100, score));
}
