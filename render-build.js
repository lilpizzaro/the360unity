// render-build.js - Custom build script for Render deployment
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting custom build process for Render deployment...');

// Set environment variables to help with build
process.env.NEXT_PHASE = 'phase-production-build';
process.env.NEXT_DISABLE_SOURCEMAPS = 'true';
process.env.NEXT_TELEMETRY_DISABLED = '1';

try {
  console.log('Attempting standard build...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Standard build failed:', error.message);
  console.log('Attempting fallback build with additional optimizations...');
  
  try {
    // Create a minimal standalone server
    console.log('Creating minimal standalone server...');
    
    // Ensure .next/standalone directory exists
    const standalonePath = path.join(process.cwd(), '.next', 'standalone');
    fs.mkdirSync(standalonePath, { recursive: true });
    
    // Create a minimal server.js file
    const serverJsPath = path.join(standalonePath, 'server.js');
    const serverJsContent = `
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Create the Next.js app
const app = next({ dev, hostname, port, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(\`Ready on http://\${hostname}:\${port}\`);
  });
});
`;
    
    fs.writeFileSync(serverJsPath, serverJsContent);
    console.log('Created standalone server.js');
    
    // Copy necessary files to standalone directory
    console.log('Copying necessary files to standalone directory...');
    
    // Copy package.json with minimal dependencies
    const packageJsonPath = path.join(standalonePath, 'package.json');
    const packageJsonContent = {
      name: 'the360unity-standalone',
      version: '1.0.0',
      private: true,
      scripts: {
        start: 'node server.js'
      },
      dependencies: {
        next: require('./package.json').dependencies.next,
        react: require('./package.json').dependencies.react,
        'react-dom': require('./package.json').dependencies['react-dom']
      }
    };
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJsonContent, null, 2));
    console.log('Created standalone package.json');
    
    // Create a minimal next.config.js
    const nextConfigPath = path.join(standalonePath, 'next.config.js');
    const nextConfigContent = `
module.exports = {
  output: 'standalone',
  distDir: '.next',
  poweredByHeader: false,
  generateEtags: false,
  compress: true,
};
`;
    
    fs.writeFileSync(nextConfigPath, nextConfigContent);
    console.log('Created standalone next.config.js');
    
    // Copy .next directory to standalone/.next
    const nextDir = path.join(process.cwd(), '.next');
    const standaloneNextDir = path.join(standalonePath, '.next');
    
    if (!fs.existsSync(standaloneNextDir)) {
      fs.mkdirSync(standaloneNextDir, { recursive: true });
    }
    
    console.log('Fallback build completed with minimal standalone server setup.');
    console.log('You can start the server with: node .next/standalone/server.js');
  } catch (fallbackError) {
    console.error('Fallback build also failed:', fallbackError.message);
    console.log('Falling back to development mode for deployment...');
    process.exit(1);
  }
} 