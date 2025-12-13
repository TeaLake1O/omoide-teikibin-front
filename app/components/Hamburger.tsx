"use client";
import { API_URL } from "@/config";
import Image from "next/image";
import { useMemo, useState } from "react";
import Loader from "./Loader";
type Props = {
    iconUrl: string | null;
    toggleHamburger: () => void;
};

export default function Hamburger(props: Props) {
    const [loadedImage, setLoadedImage] = useState<boolean>(false);

    const src = useMemo(() => {
        if (!props.iconUrl) return null;
        return props.iconUrl.replace(API_URL, "");
    }, [props.iconUrl]);

    return (
        <div className="w-12 h-12 ml-2 rounded-full bg-orange-100 flex items-center md:hidden">
            <button
                onClick={props.toggleHamburger}
                className="w-full h-full flex items-center justify-center rounded-full duration-200
                        active:scale-96
                        "
            >
                {!src || !loadedImage ? <Loader /> : null}
                {src ? (
                    <Image
                        src={src}
                        alt="icon"
                        width={128}
                        height={128}
                        className="w-12 h-12 rounded-full"
                        onLoad={() => setLoadedImage(true)}
                        onError={() => setLoadedImage(false)}
                    />
                ) : null}
            </button>
        </div>
    );
}
