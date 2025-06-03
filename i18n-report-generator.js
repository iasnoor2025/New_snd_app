/**
 * HTML Report Generator for i18n Batch Process
 *
 * This script generates an HTML report from the JSON report created by i18n-batch-process.js
 * It provides a visual representation of the internationalization status across modules.
 */

const fs = require('fs');
const path = require('path');

// Get the latest report file
function getLatestReportFile() {
  const files = fs.readdirSync(__dirname)
    .filter(file => file.startsWith('i18n-report-') && file.endsWith('.json'))
    .map(file => ({
      name: file,
      time: fs.statSync(path.join(__dirname, file)).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time);

  return files.length > 0 ? files[0].name : null;
}

// Generate HTML report
function generateHtmlReport(jsonReportPath) {
  // Read the JSON report
  const reportData = JSON.parse(fs.readFileSync(jsonReportPath, 'utf8'));
  const timestamp = new Date(reportData.timestamp).toLocaleString();
  const summary = reportData.summary;
  const moduleResults = reportData.moduleResults;

  // Calculate overall stats
  const totalFiles = summary.totalFiles;
  const filesWithHardcodedText = summary.filesWithHardcodedText;
  const completionRate = summary.completionRate;

  // Generate HTML content
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>i18n Status Report</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    h1, h2 {
      color: #2c3e50;
    }
    .summary-box {
      background-color: #f8f9fa;
      border-radius: 5px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .stats {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 30px;
    }
    .stat-card {
      background-color: white;
      border-radius: 5px;
      padding: 15px;
      flex: 1;
      min-width: 200px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }
    .stat-value {
      font-size: 2em;
      font-weight: bold;
      margin: 10px 0;
    }
    .progress-container {
      background-color: #e9ecef;
      border-radius: 5px;
      height: 25px;
      margin-bottom: 10px;
      position: relative;
    }
    .progress-bar {
      background-color: #4caf50;
      height: 100%;
      border-radius: 5px;
      transition: width 0.3s ease;
    }
    .progress-label {
      position: absolute;
      right: 10px;
      top: 3px;
      color: #333;
      font-weight: bold;
    }
    .module-row {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }
    .module-name {
      width: 150px;
      font-weight: bold;
    }
    .module-progress {
      flex: 1;
    }
    .module-stats {
      width: 200px;
      text-align: right;
    }
    .timestamp {
      color: #6c757d;
      font-style: italic;
      margin-top: 30px;
    }
    .high-completion {
      background-color: #4caf50;
    }
    .medium-completion {
      background-color: #ff9800;
    }
    .low-completion {
      background-color: #f44336;
    }
  </style>
</head>
<body>
  <h1>i18n Internationalization Status Report</h1>

  <div class="summary-box">
    <h2>Overall Summary</h2>
    <div class="stats">
      <div class="stat-card">
        <div>Total Files</div>
        <div class="stat-value">${totalFiles}</div>
      </div>
      <div class="stat-card">
        <div>Files Needing Translation</div>
        <div class="stat-value">${filesWithHardcodedText}</div>
      </div>
      <div class="stat-card">
        <div>Completion Rate</div>
        <div class="stat-value">${completionRate}%</div>
      </div>
    </div>

    <div class="progress-container">
      <div class="progress-bar ${getCompletionClass(completionRate)}" style="width: ${completionRate}%"></div>
      <div class="progress-label">${completionRate}%</div>
    </div>
  </div>

  <h2>Module Details</h2>
  ${Object.entries(moduleResults).map(([module, result]) => `
    <div class="module-row">
      <div class="module-name">${module}</div>
      <div class="module-progress">
        <div class="progress-container">
          <div class="progress-bar ${getCompletionClass(result.completionRate)}" style="width: ${result.completionRate}%"></div>
          <div class="progress-label">${result.completionRate}%</div>
        </div>
      </div>
      <div class="module-stats">
        ${result.withHardcodedText} / ${result.total} files need translation
      </div>
    </div>
  `).join('')}

  <div class="timestamp">Report generated on ${timestamp}</div>
</body>
</html>
`;

  // Write the HTML report
  const htmlReportPath = jsonReportPath.replace('.json', '.html');
  fs.writeFileSync(htmlReportPath, html);

  console.log(`HTML report generated: ${htmlReportPath}`);
  return htmlReportPath;
}

// Helper function to get color class based on completion rate
function getCompletionClass(rate) {
  if (rate >= 80) return 'high-completion';
  if (rate >= 50) return 'medium-completion';
  return 'low-completion';
}

// Main function
function main() {
  const latestReport = getLatestReportFile();

  if (!latestReport) {
    console.error('No i18n report files found. Run i18n-batch-process.js first.');
    process.exit(1);
  }

  const jsonReportPath = path.join(__dirname, latestReport);
  const htmlReportPath = generateHtmlReport(jsonReportPath);

  console.log('\nReport generation complete!');
  console.log(`JSON Report: ${jsonReportPath}`);
  console.log(`HTML Report: ${htmlReportPath}`);
  console.log('\nOpen the HTML report in a browser to view the detailed status.');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { generateHtmlReport, getLatestReportFile };
