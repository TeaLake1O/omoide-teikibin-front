"use client";

import Image from "next/image";
import { useState } from "react";
import ImagePlaceHolder from "./ImagePlaceHolder";

type Props = {
    iconUrl: string | null;
};

export default function UserIcon(props: Props) {
    const isDev = process.env.NODE_ENV !== "production";
    const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
    const src = props.iconUrl;
    const loaded = loadedSrc === src;

    return (
        <div className="relative w-full h-full">
            {!src || !loaded ? (
                <div className="absolute inset-0">
                    <ImagePlaceHolder />
                </div>
            ) : null}
            {src ? (
                <Image
                    unoptimized={isDev}
                    draggable={false}
                    src={src}
                    alt="icon"
                    width={128}
                    height={128}
                    className="absolute inset-0 rounded-full aspect-square"
                    onLoadingComplete={() => setLoadedSrc(src)}
                    priority
                    //onLoad={() => setTimeout(() => setLoadedImage(true), 5000)}
                    onError={() => setLoadedSrc(null)}
                />
            ) : null}
        </div>
    );
}
