const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Set environment variables
process.env.NODE_ENV = 'production';
process.env.NEXT_TELEMETRY_DISABLED = '1';
process.env.SKIP_TYPE_CHECK = 'true';

// Function to safely remove directory
function safeRemoveDir(dirPath) {
  try {
    if (fs.existsSync(dirPath)) {
      console.log(`Attempting to clean ${dirPath}...`);
      // Try using rimraf if available
      try {
        execSync(`npx rimraf "${dirPath}"`, { stdio: 'inherit' });
      } catch (rimrafError) {
        // If rimraf fails, try regular fs.rmSync
        try {
          fs.rmSync(dirPath, { recursive: true, force: true });
        } catch (rmError) {
          console.warn(`Warning: Could not remove ${dirPath}. Continuing with build...`);
        }
      }
    }
  } catch (error) {
    console.warn(`Warning: Error cleaning ${dirPath}:`, error.message);
  }
}

try {
  // Clean .next directory
  safeRemoveDir('.next');
  
  console.log('Building application...');
  execSync('npx next build --no-lint', { stdio: 'inherit' });
  
  // Ensure start script exists
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (!packageJson.scripts.start) {
    packageJson.scripts.start = 'next start -p $PORT';
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  }

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 