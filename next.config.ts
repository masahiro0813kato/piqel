// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/newt-files/**',
      },
    ],
  },
  // TypeScriptチェックを無効化
  typescript: {
    ignoreBuildErrors: true,
  },
  // ESLintチェックも無効化
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;