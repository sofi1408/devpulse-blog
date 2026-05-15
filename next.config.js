/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Netlify/Vercel deployment
  output: 'standalone',

  // Image optimization config
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },

  // Markdown file support
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
};

module.exports = nextConfig;
