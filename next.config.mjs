/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
        port: "",
        //**뒤 쪽에 있는 모든 경로 포함 */
        pathname: "/Sprint_Mission/**",
      },
    ],
  },
};

export default nextConfig;
