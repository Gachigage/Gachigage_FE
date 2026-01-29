import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
                destination: "http://localhost:8080/api/:path*",
            },
        ];
    },
};

export default nextConfig;
