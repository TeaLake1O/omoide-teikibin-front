"use client";

import CameraIcon from "@/app/_share/components/UI/Icon/CameraIcon";
import PhotoIcon from "@/app/_share/components/UI/Icon/PhotoIcon";
import usePickImage from "@/app/_share/hooks/util/usePickImage";
import Image from "next/image";

export default function Camera() {
    const { url, inputProps, file, imageReset, fileOpen } = usePickImage(
        undefined,
        true,
    );

    return (
        <div className="h-full w-full flex justify-center items-center gap-8">
            <div className="w-[25%] flex flex-col justify-center items-center">
                <span>写真を撮影</span>
                <button
                    className="w-[70%] flex justify-center"
                    onClick={fileOpen}
                >
                    <CameraIcon />
                </button>
            </div>
            <div className="w-[25%] flex flex-col justify-center items-center">
                <span>写真を選ぶ</span>
                <button
                    className="w-full flex justify-center"
                    onClick={fileOpen}
                >
                    <PhotoIcon />
                </button>
            </div>
            {url && <Image src={url} alt="a" />}
            <input {...inputProps} />
        </div>
    );
}
