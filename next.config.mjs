// next.config.mjs

/** @type {import('next').NextConfig} */
import path from "path";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config) => {
    // Use process.cwd() instead of __dirname
    config.resolve.alias["@"] = path.resolve(process.cwd());
    return config;
  },
};

export default nextConfig;
