/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["localhost", "*", "via.placeholder.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
