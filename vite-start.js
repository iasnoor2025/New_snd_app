// Check for Windows or Unix
const isWindows = process.platform === 'win32';
const { spawn } = require('child_process');

// Command to start Laravel server
const laravelCmd = isWindows ? 'php' : 'php';
const laravelArgs = ['artisan', 'serve'];

// Command to start Vite server
const viteCmd = isWindows ? 'npm.cmd' : 'npm';
const viteArgs = ['run', 'dev'];

// Start Laravel server
const laravelServer = spawn(laravelCmd, laravelArgs, {
  stdio: 'inherit',
  shell: true
});

// Start Vite server
const viteServer = spawn(viteCmd, viteArgs, {
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  laravelServer.kill();
  viteServer.kill();
  process.exit();
});

laravelServer.on('close', (code) => {
  console.log(`Laravel server exited with code ${code}`);
  viteServer.kill();
  process.exit();
});

viteServer.on('close', (code) => {
  console.log(`Vite server exited with code ${code}`);
  laravelServer.kill();
  process.exit();
});

console.log('Development servers started. Press Ctrl+C to stop.');
