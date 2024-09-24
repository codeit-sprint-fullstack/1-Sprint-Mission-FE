/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cafe24.poxo.com",
      "panda-market-api.vercel.app",
      "image.hanatour.com",
      "store.ardanlabs.com",
      "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
      "example.com",
    ],
  },
};

export default nextConfig;
