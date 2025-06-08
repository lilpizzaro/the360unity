# The360Unity Production Deployment Script for Windows

Write-Host "🚀 Starting The360Unity deployment process..." -ForegroundColor Cyan

# Check for Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js before continuing." -ForegroundColor Red
    exit 1
}

# Check for npm
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm is not installed. Please install npm before continuing." -ForegroundColor Red
    exit 1
}

# Check for environment variables
if (-not (Test-Path .env.local)) {
    Write-Host "⚠️ No .env.local file found. Creating one from template..." -ForegroundColor Yellow
    
    @"
# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Next.js
NEXT_PUBLIC_BASE_URL=http://localhost:3000
"@ | Out-File -FilePath .env.local -Encoding utf8
    
    Write-Host "⚠️ Please update the .env.local file with your actual keys before continuing." -ForegroundColor Yellow
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm install

# Build for production
Write-Host "🔨 Building for production..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed. Please check the errors above." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully!" -ForegroundColor Green

# Start the application
Write-Host "🌐 Starting the production server..." -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server." -ForegroundColor Yellow
npm run start 