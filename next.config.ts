import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        scrollRestoration: true,
    },
    images: {
        dangerouslyAllowLocalIP: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "omoide-teikibin.net",
                pathname: "/media/**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "8000",
                pathname: "/media/**",
            },
            {
                protocol: "https",
                hostname: "pub-de87fe8b29e54728a8c51496bd66528d.r2.dev",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "media.omoide-teikibin.net",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
