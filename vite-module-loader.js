import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';

async function collectModuleAssetsPaths(paths, modulesPath) {
  modulesPath = path.join(__dirname, modulesPath);

  const moduleStatusesPath = path.join(__dirname, 'modules_statuses.json');

  try {
    // Read module_statuses.json
    const moduleStatusesContent = await fs.readFile(moduleStatusesPath, 'utf-8');
    const moduleStatuses = JSON.parse(moduleStatusesContent);

    // Read module directories
    const moduleDirectories = await fs.readdir(modulesPath);

    // Track processed paths to avoid duplicates
    const processedPaths = new Set();

    for (const moduleDir of moduleDirectories) {
      if (moduleDir === '.DS_Store') continue;
      if (moduleStatuses[moduleDir] !== true) continue;

      // Only look for 'pages' directory (lowercase) to avoid duplicates
      const pagesDir = path.join(modulesPath, moduleDir, 'resources', 'js', 'pages');
      try {
        const files = await getAllFilesRecursive(pagesDir, ['.tsx', '.jsx']);
        
        // Only add files that haven't been processed yet
        for (const file of files) {
          const normalizedPath = file.toLowerCase();
          if (!processedPaths.has(normalizedPath)) {
            processedPaths.add(normalizedPath);
            paths.push(file);
          }
        }
      } catch (e) {
        // Directory may not exist, skip
      }

      // Also support module-specific vite.config.js (optional)
      const viteConfigPath = path.join(modulesPath, moduleDir, 'vite.config.js');
      try {
        await fs.access(viteConfigPath);
        const moduleConfig = await import(pathToFileURL(viteConfigPath).href);
        if (moduleConfig.paths && Array.isArray(moduleConfig.paths)) {
          // Check for duplicates in module config paths too
          for (const configPath of moduleConfig.paths) {
            const normalizedConfigPath = configPath.toLowerCase();
            if (!processedPaths.has(normalizedConfigPath)) {
              processedPaths.add(normalizedConfigPath);
              paths.push(configPath);
            }
          }
        }
      } catch (e) {
        // No vite.config.js, skip
      }
    }
  } catch (error) {
    console.error(`Error reading module statuses or module configurations: ${error}`);
  }

  console.log('Vite module input paths:', paths);
  return paths;
}

// Helper to recursively get all files with given extensions
async function getAllFilesRecursive(dir, exts) {
  let results = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (e) {
    return results;
  }
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(await getAllFilesRecursive(fullPath, exts));
    } else if (exts.some(ext => entry.name.endsWith(ext))) {
      results.push(fullPath);
    }
  }
  return results;
}

// Plugin for direct module loading
function moduleLoader() {
  return {
    name: 'vite-plugin-module-loader',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Handle direct access to module pages for development
        if (req.url && req.url.includes('/Modules/') && req.url.endsWith('.tsx')) {
          console.log('Module page requested:', req.url);
        }
        next();
      });
    }
  };
}

export { collectModuleAssetsPaths };
export default moduleLoader;
