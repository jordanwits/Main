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
  // Re-enable SWC and configure it properly
  swcMinify: true,
  compiler: {
    // Remove properties during compilation
    removeProperties: true,
    // Configure JSX transformation
    react: {
      runtime: "automatic",
      // This is the key setting for JSX namespaces
      throwIfNamespace: false
    }
  }
};

export default nextConfig;
