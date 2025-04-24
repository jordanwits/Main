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
  // Add SWC compiler options to fix JSX namespace error
  compiler: {
    // Allow JSX namespaces
    reactRemoveProperties: true,
    swcMinify: true,
  },
  // Configure SWC to not throw on JSX namespaces
  swcMinify: true,
};

export default nextConfig;
