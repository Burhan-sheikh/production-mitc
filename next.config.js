/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Ensure CSS is properly processed
  experimental: {
    optimizeCss: true,
  },
  
  // Image optimization
  images: {
    domains: ['firebasestorage.googleapis.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Environment variables validation
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
};

module.exports = nextConfig;
