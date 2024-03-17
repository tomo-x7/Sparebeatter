/** @type {import('next').NextConfig} */
const nextConfig = {images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sparebeatter.vercel.app',
        port: '',
        pathname: '/api/img**',
      },
    ],
  },};

export default nextConfig;
