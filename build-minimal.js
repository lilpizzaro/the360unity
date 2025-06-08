#!/usr/bin/env node

// Create a minimal .next directory for deployment
console.log('Creating minimal .next directory for deployment');

const fs = require('fs');
const path = require('path');

// Create directories
const mkdirp = (dir) => {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
};

// Create minimal required directories
mkdirp('.next/server');
mkdirp('.next/static');
mkdirp('.next/cache');
mkdirp('.next/server/app');
mkdirp('.next/server/chunks');
mkdirp('.next/server/pages');
mkdirp('.next/standalone/server');

// Create a minimal required-server-files.json
fs.writeFileSync('.next/required-server-files.json', JSON.stringify({
  version: 1,
  config: require('./next.config.js'),
  relativeAppDir: "app",
  files: []
}));

// Create a minimal build-manifest.json
fs.writeFileSync('.next/build-manifest.json', JSON.stringify({
  pages: {
    "/_app": [],
    "/_error": [],
    "/_document": [],
    "/": []
  },
  devFiles: [],
  ampDevFiles: [],
  polyfillFiles: [],
  lowPriorityFiles: [],
  rootMainFiles: [],
  pages404: [],
  ampFirstPages: []
}));

// Create a minimal react-loadable-manifest.json
fs.writeFileSync('.next/react-loadable-manifest.json', JSON.stringify({}));

// Create a minimal prerender-manifest.json
fs.writeFileSync('.next/prerender-manifest.json', JSON.stringify({
  version: 4,
  routes: {},
  dynamicRoutes: {},
  notFoundRoutes: [],
  preview: {
    previewModeId: "development-id",
    previewModeSigningKey: "development-key",
    previewModeEncryptionKey: "development-key"
  }
}));

// Create a minimal routes-manifest.json
fs.writeFileSync('.next/routes-manifest.json', JSON.stringify({
  version: 3,
  pages404: true,
  basePath: "",
  redirects: [],
  rewrites: [],
  headers: [],
  staticRoutes: [],
  dynamicRoutes: [],
  dataRoutes: [],
  rsc: {
    header: "RSC",
    varyHeader: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Url"
  }
}));

// Create a minimal server/pages-manifest.json
mkdirp('.next/server');
fs.writeFileSync('.next/server/pages-manifest.json', JSON.stringify({
  "/_app": "pages/_app.js",
  "/_error": "pages/_error.js",
  "/_document": "pages/_document.js",
  "/": "pages/index.js"
}));

// Create a minimal app-paths-manifest.json
fs.writeFileSync('.next/server/app-paths-manifest.json', JSON.stringify({
  "/page": "app/page.js",
  "/not-found": "app/not-found.js",
  "/layout": "app/layout.js"
}));

// Create a minimal standalone server.js file
const serverJsContent = `
const http = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http.createServer(async (req, res) => {
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
    console.log(\`> Ready on http://\${hostname}:\${port}\`);
  });
});
`;

fs.writeFileSync('.next/standalone/server.js', serverJsContent);

// Copy next.config.js to standalone directory
try {
  fs.copyFileSync('next.config.js', '.next/standalone/next.config.js');
} catch (err) {
  console.error('Error copying next.config.js:', err);
}

// Create package.json for standalone
const packageJson = {
  private: true,
  scripts: {
    start: "node server.js"
  },
  dependencies: {
    next: "^15.3.3",
    react: "^18.3.1",
    "react-dom": "^18.3.1"
  }
};

fs.writeFileSync('.next/standalone/package.json', JSON.stringify(packageJson, null, 2));

console.log('Created minimal .next directory for deployment');
console.log('To run the production server, use: node .next/standalone/server.js'); 