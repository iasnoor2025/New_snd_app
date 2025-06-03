const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const config = require('./i18n-config');

module.exports = {
  input: [
    ...config.scanPatterns,
    // Use ! to exclude files
    ...config.excludePatterns.map(pattern => `!${pattern}`),
  ],
  output: './public/locales',
  options: {
    debug: true,
    removeUnusedKeys: false,
    sort: true,
    func: {
      list: config.functionNames,
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      fallbackKey: function(ns, value) {
        return value;
      },
      supportBasicHtmlNodes: true,
      keepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'a', 'span'],
      acorn: {
        ecmaVersion: 2020,
        sourceType: 'module'
      }
    },
    lngs: config.languages,
    ns: config.namespaces,
    defaultLng: config.languages[0],
    defaultNs: config.defaultNamespace,
    defaultValue: function(lng, ns, key) {
      // Return key as the default value if not translated
      return key;
    },
    resource: {
      loadPath: 'public/locales/{{lng}}/{{ns}}.json',
      savePath: 'public/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n'
    },
    nsSeparator: ':',
    keySeparator: '.',
    interpolation: {
      prefix: '{{',
      suffix: '}}'
    },
    metadata: {},
    allowDynamicKeys: true
  },
  transform: function customTransform(file, enc, done) {
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    let count = 0;

    // Extract hardcoded text from JSX/TSX components
    const extractJSXText = (content) => {
      // Simple regex to find potential hardcoded text in JSX
      // This is a basic implementation and might need refinement
      const jsxTextRegex = />\s*([^<>{}\n]+?)\s*</g;
      let match;

      while ((match = jsxTextRegex.exec(content)) !== null) {
        const text = match[1].trim();

        // Skip if text is just whitespace, numbers, or very short
        if (!text || text.length < 2 || /^\d+$/.test(text)) continue;

        // Skip if text looks like a variable or code
        if (text.includes('{') || text.includes('}')) continue;

        // Determine namespace based on file path
        let ns = 'common';
        if (file.path.includes('Employees') || file.path.includes('employees')) {
          ns = 'employees';
        } else if (file.path.includes('Projects') || file.path.includes('projects')) {
          ns = 'projects';
        } else if (file.path.includes('Rentals') || file.path.includes('rentals')) {
          ns = 'rentals';
        } else if (file.path.includes('Payrolls') || file.path.includes('payrolls')) {
          ns = 'payrolls';
        } else if (file.path.includes('Timesheet') || file.path.includes('timesheet')) {
          ns = 'timesheet';
        } else if (file.path.includes('Equipment') || file.path.includes('equipment')) {
          ns = 'equipment';
        }

        // Generate a key from the text (simplified for this example)
        const key = text
          .toLowerCase()
          .replace(/[^a-z0-9_]/g, '_')
          .replace(/_+/g, '_')
          .replace(/^_|_$/g, '');

        if (key) {
          const fullKey = `${ns}:${key}`;
          parser.set(fullKey, text);
          count++;
        }
      }
    };

    // Parse translation functions
    parser.parseFuncFromString(content, { list: ['t', 'i18n.t'] }, (key, options) => {
      parser.set(key, options.defaultValue || key);
      count++;
    });

    // Parse Trans components
    parser.parseTransFromString(content);

    // Extract potential hardcoded text
    if (file.path.endsWith('.jsx') || file.path.endsWith('.tsx')) {
      extractJSXText(content);
    }

    if (count > 0) {
      console.log(`i18next-scanner: count=${count}, file=${file.path}`);
    }

    done();
  }
};
