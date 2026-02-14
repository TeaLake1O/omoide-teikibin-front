"use client";

import CameraIcon from "@/app/_share/components/UI/Icon/CameraIcon";
import usePickImage from "@/app/_share/hooks/util/usePickImage";
import Image from "next/image";

export default function Camera() {
    const { url, inputProps, file, imageReset, fileOpen } = usePickImage();
    return (
        <div className="h-full w-full flex justify-center items-center">
            <button className="h-[25%] w-[25%]" onClick={fileOpen}>
                <CameraIcon />
            </button>
            {url && <Image src={url} alt="a" />}
            <input {...inputProps} accept="image/*" capture />
        </div>
    );
}
