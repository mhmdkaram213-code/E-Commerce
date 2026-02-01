import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        pathname: '/Route-Academy-products/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/blog/web',
        permanent: true,
      },
    ]
  }
  /* config options here */
};

export default nextConfig;
