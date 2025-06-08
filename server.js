// Production server for Next.js
const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: { 
  // Disable strict mode for API routes to prevent failures
  experimental: { 
    strictNextHead: false,
    serverActions: {
      allowedOrigins: ['localhost:3000', process.env.VERCEL_URL, process.env.RENDER_URL]
    }
  },
  // Skip type checking during runtime
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint during runtime
  eslint: {
    ignoreDuringBuilds: true,
  }
} });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  // Static assets
  server.use('/_next', express.static(path.join(__dirname, '.next')));
  server.use(express.static(path.join(__dirname, 'public')));
  
  // API route error handling
  server.use('/api/*', (req, res, next) => {
    try {
      handle(req, res, req.path).catch(err => {
        console.error(`API error for ${req.path}:`, err);
        res.status(500).json({ error: 'Internal Server Error', message: 'The API route failed to process the request' });
      });
    } catch (err) {
      console.error(`API exception for ${req.path}:`, err);
      res.status(500).json({ error: 'Internal Server Error', message: 'The API route failed to process the request' });
    }
  });

  // Default handler for all other requests
  server.all('*', (req, res) => {
    try {
      return handle(req, res);
    } catch (err) {
      console.error(`Error handling request for ${req.path}:`, err);
      res.status(500).send('Internal Server Error');
    }
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Error preparing Next.js app:', err);
  process.exit(1);
}); 