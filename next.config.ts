import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    experimental: {
        serverActions: {
            bodySizeLimit: "50mb",
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "kr.object.ncloudstorage.com",
                pathname: "/gachigage-bucket/**",
            },
        ],
    },
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
                destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
            },
        ];
    },
};

export default nextConfig;
