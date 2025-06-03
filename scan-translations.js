const scanner = require('i18next-scanner');
const vfs = require('vinyl-fs');
const path = require('path');
const fs = require('fs');
const config = require('./i18next-scanner.config.js');

// Ensure output directories exist
config.options.lngs.forEach(lng => {
  config.options.ns.forEach(ns => {
    const outputPath = path.join('public/locales', lng);
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
      console.log(`Created directory: ${outputPath}`);
    }

    const filePath = path.join(outputPath, `${ns}.json`);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '{}', 'utf8');
      console.log(`Created empty translation file: ${filePath}`);
    }
  });
});

// Run the scanner
console.log('Starting i18next-scanner...');
vfs.src(config.input)
  .pipe(scanner(config.options, config.transform))
  .pipe(vfs.dest(config.output))
  .on('end', () => {
    console.log('i18next-scanner completed successfully!');
    console.log('Translation files updated in public/locales/');

    // Print summary of scanned files
    config.options.lngs.forEach(lng => {
      config.options.ns.forEach(ns => {
        const filePath = path.join('public/locales', lng, `${ns}.json`);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          try {
            const json = JSON.parse(content);
            const keyCount = Object.keys(json).length;
            console.log(`${lng}/${ns}.json: ${keyCount} keys`);
          } catch (e) {
            console.error(`Error parsing ${filePath}: ${e.message}`);
          }
        }
      });
    });
  });
