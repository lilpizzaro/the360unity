#!/bin/bash

# This script installs the necessary language runtimes for code execution
# Run with sudo on Linux/macOS servers

echo "Installing language runtimes for code execution..."

# Update package lists
apt-get update

# Install Python
echo "Installing Python..."
apt-get install -y python3 python3-pip
ln -sf /usr/bin/python3 /usr/bin/python

# Install Node.js and TypeScript (already part of the project)
echo "Installing TypeScript..."
npm install -g typescript ts-node

# Install Java
echo "Installing Java..."
apt-get install -y default-jdk

# Install C/C++ compilers
echo "Installing C/C++ compilers..."
apt-get install -y build-essential

# Install Ruby
echo "Installing Ruby..."
apt-get install -y ruby-full

# Install Go
echo "Installing Go..."
apt-get install -y golang

# Install PHP
echo "Installing PHP..."
apt-get install -y php-cli

# Create tmp directory for code execution
echo "Creating tmp directory for code execution..."
mkdir -p ./tmp
chmod 755 ./tmp

echo "All language runtimes installed successfully!"
echo "You can now execute code in multiple languages in the Collaborate tab." 