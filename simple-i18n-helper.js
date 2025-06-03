/**
 * Simple i18n Implementation Helper
 * Analyzes specific files for hardcoded text and provides implementation suggestions
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Simple i18n Implementation Helper\n');

// Target file to analyze (we know this has hardcoded text from our previous search)
const targetFile = 'Modules/TimesheetManagement/resources/js/Pages/Monthly.tsx';
const fullPath = path.join(process.cwd(), targetFile);

console.log(`Analyzing file: ${targetFile}`);

// Check if file exists
if (!fs.existsSync(fullPath)) {
  console.error(`❌ File not found: ${fullPath}`);
  process.exit(1);
}

try {
  const content = fs.readFileSync(fullPath, 'utf8');
  console.log(`✅ File loaded successfully (${content.length} characters)\n`);

  // Simple patterns to detect hardcoded text
  const patterns = {
    placeholder: /placeholder\s*=\s*["']([^"']+)["']/g,
    title: /title\s*=\s*["']([^"']+)["']/g,
    buttonText: /<Button[^>]*>([^<]+)</g,
    spanText: /<span[^>]*>([^<{]+)</g,
    labelText: /<label[^>]*>([^<{]+)</g
  };

  const detections = [];

  Object.entries(patterns).forEach(([patternName, regex]) => {
    let match;
    while ((match = regex.exec(content)) !== null) {
      const text = match[1].trim();

      // Skip if text is too short or looks like a variable
      if (text.length < 2 ||
          !/[a-zA-Z]/.test(text) ||
          /^[A-Z_]+$/.test(text) ||
          text.includes('{')) {
        continue;
      }

      const lineNumber = content.substring(0, match.index).split('\n').length;

      detections.push({
        text,
        patternName,
        lineNumber,
        originalMatch: match[0]
      });
    }
  });

  console.log(`🔍 Analysis Results:`);
  console.log(`   - Hardcoded strings found: ${detections.length}\n`);

  if (detections.length > 0) {
    console.log('📋 DETECTED HARDCODED TEXT:\n');

    detections.slice(0, 10).forEach((detection, index) => {
      console.log(`${index + 1}. Line ${detection.lineNumber} (${detection.patternName}):`);
      console.log(`   Text: "${detection.text}"`);
      console.log(`   Original: ${detection.originalMatch}`);

      // Generate translation key
      const key = `timesheet.${detection.patternName}.${detection.text.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '')}`;
      console.log(`   Suggested key: ${key}`);

      // Generate replacement
      let replacement;
      if (detection.patternName === 'placeholder' || detection.patternName === 'title') {
        replacement = detection.originalMatch.replace(/(["'])([^"']+)(["'])/, `$1{t('${key}')}$3`);
      } else {
        replacement = detection.originalMatch.replace(/>([^<]+)</, `>{t('${key}')}<`);
      }
      console.log(`   Replacement: ${replacement}`);
      console.log('');
    });

    if (detections.length > 10) {
      console.log(`... and ${detections.length - 10} more detections\n`);
    }

    // Generate translation keys
    console.log('📄 SUGGESTED TRANSLATION KEYS:\n');
    console.log('Add these to public/locales/en/timesheet.json:');
    console.log('{');
    detections.slice(0, 10).forEach(detection => {
      const key = `${detection.patternName}.${detection.text.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '')}`;
      console.log(`  "${key}": "${detection.text}",`);
    });
    console.log('}\n');

    // Implementation steps
    console.log('🛠️  IMPLEMENTATION STEPS:\n');
    console.log('1. Add import: import { useTranslation } from \'react-i18next\';');
    console.log('2. Add hook: const { t } = useTranslation(\'timesheet\');');
    console.log('3. Replace hardcoded text with t() calls as shown above');
    console.log('4. Add translation keys to timesheet.json files');
    console.log('5. Test with language switching\n');

  } else {
    console.log('✅ No hardcoded text detected in this file!');
  }

} catch (error) {
  console.error('❌ Error analyzing file:', error);
  process.exit(1);
}

console.log('✨ Analysis complete!');
