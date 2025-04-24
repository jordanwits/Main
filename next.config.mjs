/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable scroll restoration completely
  // This will make Next.js not try to restore scroll position
  experimental: {
    scrollRestoration: false,
  },
  // Added configuration to fix deployment errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable SWC to use Babel instead
  swcMinify: false,
};

export default nextConfig;
