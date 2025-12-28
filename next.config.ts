import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Ensure static exports work with Netlify
  // Using default output (not 'export') for Netlify hybrid rendering
  output: undefined, // Default to Node.js rendering (Netlify supports this)

  // Images from external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: false, // Let Next.js optimize
  },

  // Enable experimental features that work with Netlify
  experimental: {
    // Use App Router (already using it)
  },

  // Ensure no server-only dependencies are bundled into client
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    return config;
  },

  // Redirect configuration for SPA-like behavior
  async redirects() {
    return [];
  },

  // Rewrites for API fallback
  async rewrites() {
    return [];
  },

  // Headers for Netlify
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ];
  },

  // Compress assets
  compress: true,

  // Enable SWR for ISR (Incremental Static Regeneration)
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000, // 1 hour
    pagesBufferLength: 5,
  },
};

export default nextConfig;
