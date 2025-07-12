import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/pages/home',
      },
      {
        source: '/product/:id',
        destination: '/pages/product-details',
      },
      {
        source: '/cart',
        destination: '/pages/cart',
      },
    ]
  },
};

export default nextConfig;
