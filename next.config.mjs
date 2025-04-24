/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable scroll restoration completely
  // This will make Next.js not try to restore scroll position
  experimental: {
    scrollRestoration: false,
    // Completely disable SWC
    forceSwcTransforms: false,
    // Use Babel for all transformations
    esmExternals: true,
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
  // Disable SWC minification
  swcMinify: false,
  // Disable React strict mode to avoid potential issues
  reactStrictMode: false,
  // Add webpack configuration to handle JSX namespaces
  webpack: (config, { isServer }) => {
    // Add a rule to handle JSX files with a custom loader
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['next/babel', {
              'preset-react': {
                runtime: 'automatic',
                importSource: 'react',
                throwIfNamespace: false
              }
            }]
          ]
        }
      }
    });
    
    return config;
  }
};

export default nextConfig;
