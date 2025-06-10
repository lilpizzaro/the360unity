// render-build.js - Custom build script for Render deployment
const { execSync } = require('child_process');

console.log('Starting custom build process for Render deployment...');

// Set environment variables to help with build
process.env.NEXT_TELEMETRY_DISABLED = '1';

try {
  console.log('Building Next.js application...');
  execSync('next build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
} 