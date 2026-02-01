import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
    domains: [
        'gachigage-bucket.s3.ap-northeast-2.amazonaws.com',
        ],
  },
    output: "standalone",
    async rewrites() {
        return [
            {
                source: "/api/auth/:path*",
                destination: "/api/auth/:path*", // NextAuth는 그대로 유지
            },
            {
                source: "/api/naver/:path*",
                destination: "/api/naver/:path*",
            },
            {
                source: "/api/:path*",
                destination: "https://gachigage.com/api/:path*",
            },
        ];
    },
};

export default nextConfig;
