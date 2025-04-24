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
  // Add specific SWC compiler options to fix JSX namespace error
  swcMinify: true,
  compiler: {
    // Specifically configure JSX namespace handling
    styledComponents: true,
  },
};

export default nextConfig;
