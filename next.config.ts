import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "omoide-teikibin.net",
                pathname: "/media/**",
            },
        ],
    },
};

export default nextConfig;
