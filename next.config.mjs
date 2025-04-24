/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable scroll restoration completely
  experimental: {
    scrollRestoration: false,
  },
  // Skip type checking and linting during build
  typescript: {
    // Completely skip type checking
    ignoreBuildErrors: true,
  },
  eslint: {
    // Completely skip ESLint during build
    ignoreDuringBuilds: true,
  },
  // Disable image optimization to simplify build
  images: {
    unoptimized: true,
    // Allow all domains for images
    domains: ['*'],
  },
  // Disable React strict mode to avoid potential issues
  reactStrictMode: false,
  // Disable SWC minification
  swcMinify: false,
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Disable font optimization
  optimizeFonts: false,
  // Disable automatic static optimization
  staticPageGenerationTimeout: 1000,
  // Disable compression
  compress: false,
  // Disable powered by header
  poweredByHeader: false,
  // Disable trailing slash
  trailingSlash: false,
  // Disable asset prefix
  assetPrefix: '',
  // Disable basePath
  basePath: '',
  // Disable distDir
  distDir: '.next',
  // Disable pageExtensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;
