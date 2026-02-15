"use client";

import GenericButton from "@/app/_share/components/UI/button/GenericButton";
import CameraIcon from "@/app/_share/components/UI/Icon/CameraIcon";
import PhotoIcon from "@/app/_share/components/UI/Icon/PhotoIcon";
import usePickImage from "@/app/_share/hooks/util/usePickImage";
import { usePostModal } from "@/app/_share/provider/PostModal";
import { useEffect, useRef, useState } from "react";
import Video from "./components/CameraModal";

export default function Camera() {
    const { file, fileOpen, inputProps } = usePickImage();

    const { setInitialImage, openPostModal, resetInitialData } = usePostModal();

    const [isWebCameraOpen, setIsWebCameraOpen] = useState(false);

    const isSelect = useRef(false);

    const post = (mode: "camera" | "picker") => {
        isSelect.current = true;
        resetInitialData();
        fileOpen(mode);
    };

    useEffect(() => {
        if (!file) return;
        if (!isSelect.current) return;
        isSelect.current = false;
        openPostModal();
        setInitialImage(file);
    }, [isSelect, openPostModal, setInitialImage, file]);

    return (
        <div className="h-full w-full flex flex-col justify-center items-center gap-8">
            <div className="w-full flex justify-center items-center gap-8">
                <div className="w-[25%] flex flex-col justify-center items-center">
                    <span className="text-amber-800 text-lg">写真を撮影</span>
                    <button
                        className="w-[70%] flex justify-center"
                        onClick={() => post("camera")}
                    >
                        <CameraIcon />
                    </button>
                </div>
                <div className="w-[25%] flex flex-col justify-center items-center">
                    <span className="text-amber-800 text-lg">写真を選ぶ</span>
                    <button
                        className="w-full flex justify-center"
                        onClick={() => post("picker")}
                    >
                        <PhotoIcon />
                    </button>
                </div>
            </div>
            <div className="w-full flex mt-15 pr-10 pl-10 justify-center items-center gap-8">
                <GenericButton
                    handleOnclick={() => setIsWebCameraOpen(true)}
                    name="ブラウザカメラ"
                    height="h-8"
                    textSize="text-lg"
                    textColor="text-amber-800"
                />
                <Video
                    isOpen={isWebCameraOpen}
                    setIsOpen={setIsWebCameraOpen}
                />
            </div>
            <input {...inputProps} />
        </div>
    );
}
