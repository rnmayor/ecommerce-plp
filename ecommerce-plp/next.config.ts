import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here... */
  cacheComponents: true, // enable cache components
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        port: '',
        pathname: '/product-images/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
