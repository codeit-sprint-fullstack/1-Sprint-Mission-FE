/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ifh.cc",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
