/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "*"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
