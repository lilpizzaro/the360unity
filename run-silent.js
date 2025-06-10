// Script to run Next.js in production mode with all errors suppressed
const { spawn } = require('child_process');
const path = require('path');

// Set environment variables
process.env.NODE_ENV = 'production';
process.env.NEXT_TELEMETRY_DISABLED = '1';
process.env.NEXT_SUPPRESS_DEV_INDICATOR = '1';

// Suppress console output in the parent process
console.log = function() {};
console.error = function() {};
console.warn = function() {};
console.info = function() {};
console.debug = function() {};

// Start the server
const serverProcess = spawn('node', ['server.js'], {
  env: {
    ...process.env,
    NODE_ENV: 'production',
    NEXT_TELEMETRY_DISABLED: '1',
    NEXT_SUPPRESS_DEV_INDICATOR: '1',
    NODE_OPTIONS: '--unhandled-rejections=silent'
  },
  stdio: ['ignore', 'ignore', 'ignore'] // Ignore stdin, stdout, stderr
});

// Log only the startup message
setTimeout(() => {
  console.log(`> App running in silent mode on http://localhost:${process.env.PORT || 3000}`);
}, 2000);

// Handle process exit
serverProcess.on('exit', (code) => {
  process.exit(code);
});

// Forward signals to child process
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    serverProcess.kill(signal);
  });
}); 