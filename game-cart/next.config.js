/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable webpack for SVG handling
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  
  // Add empty turbopack config to avoid warning
  turbopack: {}
};

module.exports = nextConfig;
