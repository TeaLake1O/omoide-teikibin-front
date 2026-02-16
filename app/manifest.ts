import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "おもいで定期便",
        short_name: "おもいで定期便",
        description: "おもいでを届けるSNS",
        start_url: "/camera",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
            {
                src: "/pwa/omoide-logo-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/pwa/omoide-logo-512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
        screenshots: [
            {
                src: "/pwa/omoide-screen-narrow.png",
                sizes: "422x750",
                type: "image/png",
                form_factor: "narrow",
            },
            {
                src: "/pwa/omoide-screen-wide.png",
                sizes: "1919x961",
                type: "image/png",
                form_factor: "wide",
            },
        ],
    };
}
