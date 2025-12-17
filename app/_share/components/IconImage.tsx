"use client";

import Image from "next/image";
import { useState } from "react";
import ImagePlaceHolder from "./ImagePlaceHolder";

type Props = {
    src: string;
    alt: string;
    scale: string;
};

export default function ImageIcon(props: Props) {
    const { alt, scale } = props;

    const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
    const src = props.src;
    const isLoaded = loadedSrc === src;

    return (
        <div className={`${scale} relative aspect-square`}>
            {!isLoaded && <ImagePlaceHolder />}
            <Image
                src={src}
                alt={alt}
                width={64}
                height={64}
                draggable={false}
                className={`absolute pointer-events-none select-none absolute-center ${
                    isLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoadingComplete={() => setLoadedSrc(src)}
            />
        </div>
    );
}
