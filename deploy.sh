#!/bin/bash

# The360Unity Production Deployment Script

echo "🚀 Starting The360Unity deployment process..."

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js before continuing."
    exit 1
fi

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm before continuing."
    exit 1
fi

# Check for environment variables
if [ ! -f .env.local ]; then
    echo "⚠️ No .env.local file found. Creating one from template..."
    echo "# Clerk Authentication Keys" > .env.local
    echo "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key" >> .env.local
    echo "CLERK_SECRET_KEY=your_clerk_secret_key" >> .env.local
    echo "" >> .env.local
    echo "# Next.js" >> .env.local
    echo "NEXT_PUBLIC_BASE_URL=http://localhost:3000" >> .env.local
    
    echo "⚠️ Please update the .env.local file with your actual keys before continuing."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build for production
echo "🔨 Building for production..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo "✅ Build completed successfully!"

# Start the application
echo "🌐 Starting the production server..."
echo "Press Ctrl+C to stop the server."
npm run start 