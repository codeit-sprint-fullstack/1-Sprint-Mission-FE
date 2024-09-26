/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "panda-market-api.vercel.app",
      "image.hanatour.com",
      "cafe24.poxo.com",
      "cdnb.artstation.com",
      "example.com",
      "sprint-fe-project.s3.ap-northeast-2.amazonaws.com", // 추가적인 이미지 도메인이 있다면 여기에 추가
    ],
  },
};

export default nextConfig;
