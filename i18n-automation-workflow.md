# I18n Automation Workflow Guide

This guide provides a comprehensive workflow for automating internationalization (i18n) implementation across the entire project using the tools we've developed.

## Overview

Based on our analysis, we've detected **2,159 potential hardcoded strings** across **178 files** in **7 modules**. This workflow will help you systematically implement i18n for all these strings.

## Phase 1: Analysis and Planning

### 1.1 Run Detection Script

```bash
# Generate the missing translations report
node detect-missing-translations.js
```

This creates `missing-translations-report.md` with detailed findings.

### 1.2 Review Priority Modules

Based on the scan results, prioritize modules by string count:

1. **TimesheetManagement**: 259 strings
2. **ProjectManagement**: 458 strings  
3. **RentalManagement**: 612 strings
4. **EmployeeManagement**: 298 strings
5. **Payroll**: 387 strings
6. **LeaveManagement**: 125 strings
7. **CustomerManagement**: 20 strings

### 1.3 Create Module-Specific Plans

For each module, create a focused implementation plan:

```bash
# Create module-specific reports (future enhancement)
node detect-missing-translations.js --module=TimesheetManagement
```

## Phase 2: Setup Translation Infrastructure

### 2.1 Install Required Dependencies

```bash
npm install react-i18next i18next i18next-browser-languagedetector i18next-http-backend
npm install --save-dev i18next-scanner
```

### 2.2 Configure i18next Scanner

Create `i18next-scanner.config.js`:

```javascript
module.exports = {
  input: [
    'Modules/**/resources/js/**/*.{js,jsx,ts,tsx}',
    '!Modules/**/node_modules/**',
    '!**/dist/**'
  ],
  output: './',
  options: {
    debug: true,
    func: {
      list: ['t', 'i18next.t', 'i18n.t'],
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    lngs: ['en', 'ar'],
    ns: [
      'common',
      'timesheet',
      'project',
      'rental',
      'employee',
      'payroll',
      'leave',
      'customer'
    ],
    defaultLng: 'en',
    defaultNs: 'common',
    defaultValue: '__STRING_NOT_TRANSLATED__',
    resource: {
      loadPath: 'resources/lang/{{lng}}/{{ns}}.json',
      savePath: 'resources/lang/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n'
    },
    nsSeparator: ':',
    keySeparator: '.'
  }
};
```

### 2.3 Create Base Translation Files

```bash
# Create directory structure
mkdir -p resources/lang/en resources/lang/ar

# Create base translation files
echo '{}' > resources/lang/en/common.json
echo '{}' > resources/lang/ar/common.json
```

## Phase 3: Automated Implementation

### 3.1 Create Translation Key Generator

Create `generate-translation-keys.js`:

```javascript
#!/usr/bin/env node

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
  } else if (context.includes('Title') || context.includes('title')) {
    key = `ttl_${key}`;
  } else if (context.includes('placeholder')) {
    key = `ph_${key}`;
  }
  
  return key;
}

/**
 * Process missing translations report and generate keys
 */
function processReport() {
  const reportPath = 'missing-translations-report.md';
  
  if (!fs.existsSync(reportPath)) {
    console.error('Missing translations report not found. Run detect-missing-translations.js first.');
    return;
  }
  
  const content = fs.readFileSync(reportPath, 'utf8');
  const lines = content.split('\n');
  
  const translations = {
    en: {},
    ar: {}
  };
  
  let currentModule = '';
  
  lines.forEach(line => {
    // Detect module sections
    const moduleMatch = line.match(/^## (\w+) \(\d+ strings\)$/);
    if (moduleMatch) {
      currentModule = moduleMatch[1].toLowerCase();
      return;
    }
    
    // Parse table rows with translations
    const tableMatch = line.match(/^\| \d+ \| [^|]+ \| ([^|]+) \| (.+) \|$/);
    if (tableMatch) {
      const text = tableMatch[1].trim();
      const context = tableMatch[2].trim();
      
      if (text && text !== 'Text') {
        const key = generateTranslationKey(text, context);
        const namespace = currentModule || 'common';
        
        if (!translations.en[namespace]) {
          translations.en[namespace] = {};
          translations.ar[namespace] = {};
        }
        
        translations.en[namespace][key] = text;
        translations.ar[namespace][key] = `[AR] ${text}`; // Placeholder for Arabic
      }
    }
  });
  
  // Write translation files
  Object.keys(translations).forEach(lang => {
    Object.keys(translations[lang]).forEach(namespace => {
      const filePath = `resources/lang/${lang}/${namespace}.json`;
      const dir = path.dirname(filePath);
      
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(filePath, JSON.stringify(translations[lang][namespace], null, 2));
      console.log(`Generated ${filePath} with ${Object.keys(translations[lang][namespace]).length} keys`);
    });
  });
}

if (require.main === module) {
  processReport();
}

module.exports = { generateTranslationKey, processReport };
```

### 3.2 Create Automated Replacement Script

Create `replace-hardcoded-strings.js`:

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Replace hardcoded strings with translation function calls
 */
class StringReplacer {
  constructor() {
    this.translations = this.loadTranslations();
  }
  
  loadTranslations() {
    const translations = {};
    const langDir = 'resources/lang/en';
    
    if (!fs.existsSync(langDir)) {
      console.error('Translation files not found. Run generate-translation-keys.js first.');
      return {};
    }
    
    const files = fs.readdirSync(langDir);
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const namespace = path.basename(file, '.json');
        const content = JSON.parse(fs.readFileSync(path.join(langDir, file), 'utf8'));
        translations[namespace] = content;
      }
    });
    
    return translations;
  }
  
  findTranslationKey(text, namespace = 'common') {
    const nsTranslations = this.translations[namespace] || this.translations.common || {};
    
    // Find exact match
    for (const [key, value] of Object.entries(nsTranslations)) {
      if (value === text) {
        return { key, namespace };
      }
    }
    
    // Find in other namespaces
    for (const [ns, translations] of Object.entries(this.translations)) {
      for (const [key, value] of Object.entries(translations)) {
        if (value === text) {
          return { key, namespace: ns };
        }
      }
    }
    
    return null;
  }
  
  replaceInFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    let modified = content;
    let hasChanges = false;
    
    // Determine namespace from file path
    const namespace = this.getNamespaceFromPath(filePath);
    
    // Add useTranslation import if not present
    if (!modified.includes('useTranslation') && !modified.includes('import.*useTranslation')) {
      const importMatch = modified.match(/(import.*from\s+['"]react['"];?)/);
      if (importMatch) {
        modified = modified.replace(
          importMatch[1],
          `${importMatch[1]}\nimport { useTranslation } from 'react-i18next';`
        );
        hasChanges = true;
      }
    }
    
    // Add useTranslation hook if not present
    if (!modified.includes('useTranslation()') && hasChanges) {
      const componentMatch = modified.match(/(function\s+\w+|const\s+\w+\s*=.*=>|export\s+default\s+function)/);
      if (componentMatch) {
        const hookLine = `  const { t } = useTranslation('${namespace}');\n`;
        modified = modified.replace(
          /({\s*$)/m,
          `{\n${hookLine}`
        );
      }
    }
    
    // Replace hardcoded strings
    const patterns = [
      // JSX content: >Text<
      { regex: />\s*([A-Z][a-z]+(?:\s+[A-Za-z]+){1,})\s*</g, replacement: '>{t("$key")}<' },
      
      // Component props: prop="Text"
      { regex: /((?:title|label|placeholder|alt|aria-label|tooltip)=\s*["'])([^"'{}][^"']*[a-zA-Z][^"']*)(["'])/g, replacement: '$1{t("$key")}$3' },
    ];
    
    patterns.forEach(({ regex, replacement }) => {
      let match;
      while ((match = regex.exec(content)) !== null) {
        const text = match[2] || match[1];
        const translationKey = this.findTranslationKey(text, namespace);
        
        if (translationKey) {
          const keyRef = translationKey.namespace === namespace ? 
            translationKey.key : 
            `${translationKey.namespace}:${translationKey.key}`;
          
          const newReplacement = replacement.replace('$key', keyRef);
          modified = modified.replace(match[0], newReplacement);
          hasChanges = true;
        }
      }
    });
    
    if (hasChanges) {
      fs.writeFileSync(filePath, modified);
      console.log(`Updated ${filePath}`);
      return true;
    }
    
    return false;
  }
  
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
  
  processModule(modulePath) {
    const files = this.scanDirectory(modulePath);
    let updatedCount = 0;
    
    files.forEach(file => {
      if (this.replaceInFile(file)) {
        updatedCount++;
      }
    });
    
    console.log(`Updated ${updatedCount} files in ${modulePath}`);
  }
  
  scanDirectory(dir) {
    const files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    entries.forEach(entry => {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        files.push(...this.scanDirectory(fullPath));
      } else if (['.js', '.jsx', '.ts', '.tsx'].includes(path.extname(entry.name))) {
        files.push(fullPath);
      }
    });
    
    return files;
  }
}

// Main execution
if (require.main === module) {
  const replacer = new StringReplacer();
  
  const modules = [
    'Modules/TimesheetManagement/resources/js',
    'Modules/ProjectManagement/resources/js',
    'Modules/RentalManagement/resources/js',
    'Modules/EmployeeManagement/resources/js',
    'Modules/Payroll/resources/js',
    'Modules/LeaveManagement/resources/js',
    'Modules/CustomerManagement/resources/js'
  ];
  
  modules.forEach(module => {
    if (fs.existsSync(module)) {
      console.log(`Processing ${module}...`);
      replacer.processModule(module);
    }
  });
}

module.exports = StringReplacer;
```

## Phase 4: Execution Workflow

### 4.1 Complete Automation Sequence

```bash
# Step 1: Detect hardcoded strings
node detect-missing-translations.js

# Step 2: Generate translation keys and files
node generate-translation-keys.js

# Step 3: Replace hardcoded strings with translation calls
node replace-hardcoded-strings.js

# Step 4: Scan for any missed translations
npx i18next-scanner

# Step 5: Verify implementation
node detect-missing-translations.js
```

### 4.2 Module-by-Module Implementation

For safer implementation, process one module at a time:

```bash
# Process TimesheetManagement first (smallest module)
node replace-hardcoded-strings.js --module=TimesheetManagement

# Test the module
npm run dev
# Verify TimesheetManagement pages work correctly

# Continue with next module
node replace-hardcoded-strings.js --module=CustomerManagement
```

## Phase 5: Quality Assurance

### 5.1 Automated Testing

Create `test-i18n-implementation.js`:

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Test i18n implementation quality
 */
class I18nTester {
  constructor() {
    this.issues = [];
  }
  
  testTranslationFiles() {
    const languages = ['en', 'ar'];
    const namespaces = ['common', 'timesheet', 'project', 'rental', 'employee', 'payroll', 'leave', 'customer'];
    
    languages.forEach(lang => {
      namespaces.forEach(ns => {
        const filePath = `resources/lang/${lang}/${ns}.json`;
        
        if (!fs.existsSync(filePath)) {
          this.issues.push(`Missing translation file: ${filePath}`);
          return;
        }
        
        try {
          const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          
          // Check for placeholder translations
          Object.entries(content).forEach(([key, value]) => {
            if (lang === 'ar' && value.startsWith('[AR]')) {
              this.issues.push(`Placeholder translation in ${filePath}: ${key}`);
            }
            
            if (value === '__STRING_NOT_TRANSLATED__') {
              this.issues.push(`Untranslated key in ${filePath}: ${key}`);
            }
          });
          
        } catch (error) {
          this.issues.push(`Invalid JSON in ${filePath}: ${error.message}`);
        }
      });
    });
  }
  
  testComponentImplementation() {
    const modules = [
      'Modules/TimesheetManagement/resources/js',
      'Modules/CustomerManagement/resources/js'
    ];
    
    modules.forEach(module => {
      if (fs.existsSync(module)) {
        this.scanModuleFiles(module);
      }
    });
  }
  
  scanModuleFiles(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    files.forEach(entry => {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        this.scanModuleFiles(fullPath);
      } else if (['.js', '.jsx', '.ts', '.tsx'].includes(path.extname(entry.name))) {
        this.testFile(fullPath);
      }
    });
  }
  
  testFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file uses translations but missing useTranslation import
    if (content.includes('t("') && !content.includes('useTranslation')) {
      this.issues.push(`Missing useTranslation import in ${filePath}`);
    }
    
    // Check for remaining hardcoded strings
    const hardcodedPatterns = [
      />\s*[A-Z][a-z]+(?:\s+[A-Za-z]+){2,}\s*</g,
      /(?:title|label|placeholder)=\s*["'][A-Z][^"']*[a-z][^"']*["']/g
    ];
    
    hardcodedPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        this.issues.push(`Possible hardcoded string in ${filePath}: ${match[0]}`);
      }
    });
  }
  
  generateReport() {
    let report = '# I18n Implementation Test Report\n\n';
    report += `Generated on ${new Date().toLocaleString()}\n\n`;
    
    if (this.issues.length === 0) {
      report += '✅ **All tests passed!** No issues found.\n\n';
    } else {
      report += `❌ **Found ${this.issues.length} issues:**\n\n`;
      
      this.issues.forEach((issue, index) => {
        report += `${index + 1}. ${issue}\n`;
      });
    }
    
    fs.writeFileSync('i18n-test-report.md', report);
    console.log(`Test report saved to i18n-test-report.md`);
    
    return this.issues.length === 0;
  }
  
  run() {
    console.log('🧪 Testing i18n implementation...\n');
    
    this.testTranslationFiles();
    this.testComponentImplementation();
    
    return this.generateReport();
  }
}

if (require.main === module) {
  const tester = new I18nTester();
  const success = tester.run();
  process.exit(success ? 0 : 1);
}

module.exports = I18nTester;
```

### 5.2 Manual Testing Checklist

- [ ] All pages load without errors
- [ ] Language switching works correctly
- [ ] RTL layout works for Arabic
- [ ] All text is properly translated
- [ ] Form validation messages are translated
- [ ] Date/time formats are localized
- [ ] No hardcoded strings remain

## Phase 6: Deployment and Maintenance

### 6.1 CI/CD Integration

Add to your build pipeline:

```yaml
# .github/workflows/i18n-check.yml
name: I18n Quality Check

on: [push, pull_request]

jobs:
  i18n-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: node test-i18n-implementation.js
      - run: node detect-missing-translations.js
      - name: Check for new hardcoded strings
        run: |
          if grep -q "Total potential hardcoded strings: [1-9]" missing-translations-report.md; then
            echo "❌ New hardcoded strings detected!"
            exit 1
          else
            echo "✅ No hardcoded strings found"
          fi
```

### 6.2 Ongoing Maintenance

```bash
# Weekly i18n health check
node detect-missing-translations.js
node test-i18n-implementation.js

# Before each release
npx i18next-scanner
node test-i18n-implementation.js
```

## Summary

This workflow provides:

1. **Automated Detection**: Identifies all hardcoded strings
2. **Automated Key Generation**: Creates translation keys and files
3. **Automated Replacement**: Replaces hardcoded strings with translation calls
4. **Quality Testing**: Verifies implementation quality
5. **Continuous Monitoring**: Prevents regression

**Next Steps:**
1. Run the detection script to understand current state
2. Create the automation scripts provided above
3. Start with the smallest module (CustomerManagement - 20 strings)
4. Gradually implement across all modules
5. Set up continuous monitoring

This systematic approach will ensure complete i18n coverage while maintaining code quality and preventing regressions.
