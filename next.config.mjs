/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["panda-market-api.vercel.app"], // API 서버의 도메인을 여기에 추가
  },
};

export default nextConfig;
