"use client";

import CameraIcon from "@/app/_share/components/UI/Icon/CameraIcon";
import PhotoIcon from "@/app/_share/components/UI/Icon/PhotoIcon";
import usePickImage from "@/app/_share/hooks/util/usePickImage";

export default function Camera() {
    const { file, fileOpen, inputProps } = usePickImage();

    return (
        <div className="h-full w-full flex justify-center items-center gap-8">
            <div className="w-[25%] flex flex-col justify-center items-center">
                <span>写真を撮影</span>
                <button
                    className="w-[70%] flex justify-center"
                    onClick={() => fileOpen("camera")}
                >
                    <CameraIcon />
                </button>
            </div>
            <div className="w-[25%] flex flex-col justify-center items-center">
                <span>写真を選ぶ</span>
                <button
                    className="w-full flex justify-center"
                    onClick={() => fileOpen("picker")}
                >
                    <PhotoIcon />
                </button>
            </div>
            <input {...inputProps} />
        </div>
    );
}
