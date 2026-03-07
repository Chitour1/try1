import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/support', destination: '/a22', permanent: true },
      { source: '/terms', destination: '/a23', permanent: true },
      { source: '/privacy', destination: '/a24', permanent: true }
    ];
  }
};

export default nextConfig;
