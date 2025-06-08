// Simple Express server for Render deployment
const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';

// Check for port in command line arguments
const args = process.argv.slice(2);
const cmdPort = args.length > 0 ? parseInt(args[0], 10) : null;
const port = process.env.PORT || cmdPort || 3000;

// Create Next.js app
const app = next({ 
  dev,
  conf: {
    output: 'standalone',
    experimental: { 
      strictNextHead: false 
    },
    typescript: { 
      ignoreBuildErrors: true 
    },
    eslint: { 
      ignoreDuringBuilds: true 
    }
  }
});

const handle = app.getRequestHandler();
const server = express();

// Health check endpoint
server.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Middleware to handle empty pathnames
server.use((req, res, next) => {
  if (!req.path || req.path === '') {
    req.url = '/';
  }
  next();
});

// Middleware to log all requests
server.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Start the server with error handling
app.prepare()
  .then(() => {
    // Serve static files
    server.use('/_next', express.static(path.join(__dirname, '.next')));
    server.use(express.static(path.join(__dirname, 'public')));
    
    // API routes with improved error handling
    server.use('/api', (req, res, next) => {
      try {
        const handlePromise = handle(req, res);
        
        // Add timeout to detect hanging requests
        const timeout = setTimeout(() => {
          console.error(`API request timeout for ${req.url}`);
          res.status(504).json({ 
            error: 'Gateway Timeout', 
            message: 'API request timed out' 
          });
        }, 30000); // 30 second timeout
        
        // Handle the request with proper error handling
        handlePromise
          .then(() => {
            clearTimeout(timeout);
          })
          .catch(err => {
            clearTimeout(timeout);
            console.error(`API error for ${req.url}:`, err);
            
            // Send detailed error in development, generic in production
            if (dev) {
              res.status(500).json({ 
                error: 'Internal Server Error',
                message: err.message,
                stack: err.stack,
                name: err.name
              });
            } else {
              res.status(500).json({ 
                error: 'Internal Server Error',
                message: 'The API encountered an error'
              });
            }
          });
      } catch (err) {
        console.error(`API exception for ${req.url}:`, err);
        res.status(500).json({ 
          error: 'Internal Server Error',
          message: dev ? err.message : 'The API encountered an exception'
        });
      }
    });
    
    // Default handler
    server.all('*', (req, res) => {
      try {
        return handle(req, res);
      } catch (err) {
        console.error(`Page error for ${req.url}:`, err);
        return res.status(500).send('Internal Server Error');
      }
    });
    
    // Start server
    console.log(`Starting server on port ${port}`);
    server.listen(port, '0.0.0.0', () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error preparing Next.js app:', err);
    
    // Fallback to basic Express server if Next.js fails
    server.all('*', (req, res) => {
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>The360Unity</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background-color: #000;
                color: #fff;
                margin: 0;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                text-align: center;
              }
              .container {
                max-width: 600px;
                padding: 2rem;
              }
              h1 {
                font-size: 2.5rem;
                margin-bottom: 1rem;
                background: linear-gradient(90deg, #632cfb, #8e72ff);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              p {
                font-size: 1.2rem;
                line-height: 1.6;
                color: #ccc;
                margin-bottom: 2rem;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>The360Unity</h1>
              <p>The application is currently experiencing technical difficulties.</p>
              <p>Our team is working on resolving the issue.</p>
            </div>
          </body>
        </html>
      `);
    });
    
    server.listen(port, '0.0.0.0', () => {
      console.error(`Fallback server running on port ${port} due to error: ${err.message}`);
    });
  }); 