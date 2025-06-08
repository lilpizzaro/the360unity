/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'github.com',
      'img.clerk.com',
      'images.clerk.dev',
      'uploadthing.com',
      'placehold.co',
      'utfs.io',
      'lvehgsniklchobuhjobl.supabase.co',
    ],
  },
  experimental: {
    // serverComponentsExternalPackages has been moved to serverExternalPackages
  },
  serverExternalPackages: ['@prisma/client', 'bcrypt'],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  webpack: (config, { isServer }) => {
    // Optimization for @supabase/realtime-js
    config.module.rules.push({
      test: /node_modules\/@supabase\/realtime-js\/dist\/main\/RealtimeClient\.js/,
      loader: 'ignore-loader',
    });

    // Suppress warnings about critical dependencies in Supabase's Realtime client
    config.ignoreWarnings = [
      { module: /node_modules\/@supabase\/realtime-js\/dist\/main\/RealtimeClient\.js/ },
    ];

    if (isServer) {
      config.optimization.minimizer = [];
    }

    return config;
  },
  // Ignore useSearchParams error during build
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  // Disable type checking during build
  transpilePackages: ['@supabase/supabase-js'],
  // Ignore 404 page build errors
  distDir: '.next',
  poweredByHeader: false,
  generateEtags: false,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  productionBrowserSourceMaps: false,
  compress: true,
};

// Suppress console warnings in production
if (process.env.NODE_ENV === 'production') {
  nextConfig.compiler = {
    removeConsole: {
      exclude: ['error'],
    },
  };
}

// Suppress warnings about Next.js trace
process.env.NEXT_DISABLE_TRACE = '1';

module.exports = nextConfig;
