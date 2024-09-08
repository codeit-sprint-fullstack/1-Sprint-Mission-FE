/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ifh.cc'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
