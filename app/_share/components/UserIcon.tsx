"use client";

import { API_URL } from "@/config";
import Image from "next/image";
import { useMemo, useState } from "react";
import Loader from "./Loader";

type Props = {
    iconUrl: string | null;
};

export default function UserIcon(props: Props) {
    const [loadedImage, setLoadedImage] = useState<boolean>(false);

    const src = useMemo(() => {
        if (!props.iconUrl) return null;
        console.log(API_URL, props.iconUrl);
        return props.iconUrl;
    }, [props.iconUrl]);

    const isDev = process.env.NODE_ENV !== "production";

    return (
        <div className="relative w-full h-full">
            {!src || !loadedImage ? (
                <div className="absolute inset-0">
                    <Loader />
                </div>
            ) : null}
            {src ? (
                <Image
                    unoptimized={isDev}
                    src={src}
                    alt="icon"
                    width={128}
                    height={128}
                    className="w-full h-full rounded-full"
                    onLoad={() => setLoadedImage(true)}
                    //onLoad={() => setTimeout(() => setLoadedImage(true), 5000)}
                    onError={() => setLoadedImage(false)}
                />
            ) : null}
        </div>
    );
}
