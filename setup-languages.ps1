# PowerShell script to install language runtimes for code execution
# Run as Administrator on Windows servers

Write-Host "Installing language runtimes for code execution..." -ForegroundColor Green

# Check if Chocolatey is installed, install if not
if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Chocolatey package manager..." -ForegroundColor Yellow
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
}

# Install Python
Write-Host "Installing Python..." -ForegroundColor Yellow
choco install -y python

# Install TypeScript (Node.js should be installed with the project)
Write-Host "Installing TypeScript..." -ForegroundColor Yellow
npm install -g typescript ts-node

# Install Java
Write-Host "Installing Java JDK..." -ForegroundColor Yellow
choco install -y openjdk

# Install C/C++ compilers
Write-Host "Installing C/C++ compilers..." -ForegroundColor Yellow
choco install -y mingw

# Install Ruby
Write-Host "Installing Ruby..." -ForegroundColor Yellow
choco install -y ruby

# Install Go
Write-Host "Installing Go..." -ForegroundColor Yellow
choco install -y golang

# Install PHP
Write-Host "Installing PHP..." -ForegroundColor Yellow
choco install -y php

# Create tmp directory for code execution
Write-Host "Creating tmp directory for code execution..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path ".\tmp"

Write-Host "All language runtimes installed successfully!" -ForegroundColor Green
Write-Host "You can now execute code in multiple languages in the Collaborate tab." -ForegroundColor Green 