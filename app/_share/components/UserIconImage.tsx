"use client";

import Image from "next/image";
import { useState } from "react";
import ImagePlaceHolder from "../UI/ImagePlaceHolder";

type Props = {
    iconUrl: string | null;
};
//キャッシュを持ってstateのリセットを防ぐ
//const loadedSrcSet = new Set<string>();

export default function UserIconImage(props: Props) {
    const isDev = process.env.NODE_ENV !== "production";
    const src = props.iconUrl ? props.iconUrl : "/img/accountsicon.png";
    const [loaded, setLoaded] = useState<boolean>(false);

    /*useEffect(() => {
        setLoaded(loadedSrcSet.has(src));
    }, [src]);*/

    return (
        <div className="relative flex justify-center items-center w-full h-full overflow-hidden rounded-full bg-white">
            {!src || !loaded ? <ImagePlaceHolder /> : null}
            {src ? (
                <Image
                    unoptimized={isDev}
                    draggable={false}
                    src={src}
                    alt="icon"
                    width={128}
                    height={128}
                    className={`object-cover ${
                        loaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => {
                        setLoaded(true);
                        //loadedSrcSet.add(src);
                    }}
                    //onLoad={() => setTimeout(() => setLoadedImage(true), 5000)}
                />
            ) : null}
        </div>
    );
}
