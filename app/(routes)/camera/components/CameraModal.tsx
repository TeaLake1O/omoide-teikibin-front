"use client";

import CloseButton from "@/app/_share/components/UI/button/CloseButton";
import GenericButton from "@/app/_share/components/UI/button/GenericButton";
import { useIsMdUp } from "@/app/_share/hooks/util/useIsMdUp";
import { usePostModal } from "@/app/_share/provider/PostModal";
import Image from "next/image";
import { RefObject, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
    isOpen: boolean;
    setIsOpen: (item: boolean) => void;
};

export default function CameraModal(props: Props) {
    const { isOpen, setIsOpen } = props;

    return (
        <>
            {isOpen &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[9990] bg-black/60 flex justify-center items-center"
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        <Camera close={() => setIsOpen(false)} />
                    </div>,
                    document.getElementById("modal-root")!,
                )}
        </>
    );
}

function Camera({ close }: { close: () => void }) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const cancelled = useRef(false);

    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    const isMdUp = useIsMdUp();
    const { setInitialImage, openPostModal } = usePostModal();

    const capture = async (): Promise<File | null> => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return null;

        const w = video.videoWidth;
        const h = video.videoHeight;

        if (!w || !h) return null;

        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext("2d");
        if (!ctx) return null;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, w, h);
        ctx.translate(w, 0);
        ctx.scale(-1, 1);

        ctx.drawImage(video, 0, 0, w, h);

        const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob(resolve, "image/jpeg", 0.92),
        );
        if (!blob) return null;

        return new File([blob], `omoide_camera_${Date.now()}.jpg`, {
            type: blob.type,
        });
    };

    const captureButtonOnClick = async () => {
        const file = await capture();
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPhotoUrl(url);
        setInitialImage(file);
    };

    useEffect(() => {
        cancelled.current = false;
        (async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,
            });
            if (cancelled.current) {
                streamRef.current?.getTracks().forEach((t) => t.stop());
                streamRef.current = null;
                return;
            }
            streamRef.current = stream;

            const video = videoRef.current;
            if (!video) return;

            video.srcObject = stream;
            await video.play();
        })();

        return () => {
            cancelled.current = true;
            streamRef.current?.getTracks().forEach((t) => t.stop());
            streamRef.current = null;
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        const stream = streamRef.current;
        if (!video || !stream) return;

        video.srcObject = stream;
        video.play();
    }, [photoUrl, isMdUp]);

    if (isMdUp)
        return (
            <MdUpCameraContent
                close={close}
                photoUrl={photoUrl}
                capture={capture}
                videoRef={videoRef}
                canvasRef={canvasRef}
                openPostModal={openPostModal}
                setPhotoUrl={setPhotoUrl}
                setInitialImage={setInitialImage}
            />
        );

    return (
        <MdDownCameraContent
            close={close}
            photoUrl={photoUrl}
            capture={capture}
            videoRef={videoRef}
            canvasRef={canvasRef}
            openPostModal={openPostModal}
            setPhotoUrl={setPhotoUrl}
            setInitialImage={setInitialImage}
        />
    );
}

function MdUpCameraContent(props: {
    close: () => void;
    photoUrl: string | null;
    videoRef: RefObject<HTMLVideoElement | null>;
    canvasRef: RefObject<HTMLCanvasElement | null>;
    capture: () => Promise<File | null>;
    setPhotoUrl: (url: string | null) => void;
    setInitialImage: (file: File | null) => void;
    openPostModal: () => void;
}) {
    const {
        close,
        photoUrl,
        videoRef,
        capture,
        setPhotoUrl,
        setInitialImage,
        openPostModal,
        canvasRef,
    } = props;

    return (
        <div
            className="md:h-[85%] md:w-[50%] h-full w-full bg-orange-100 rounded-md flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="w-full justify-between flex items-center">
                <div className="h-10 w-10 aspect-square">
                    <CloseButton handleOnclick={close} color="bg-black" />
                </div>
                <h3 className="text-xl text-amber-800">写真</h3>
                <div className="h-10 w-10 aspect-square" />
            </div>
            {!photoUrl ? (
                <>
                    <video
                        className="w-[80%] mb-5 aspect-video bg-black mt-3 -scale-x-100"
                        ref={videoRef}
                        muted
                        playsInline
                    />
                    <GenericButton
                        handleOnclick={async () => {
                            const file = await capture();
                            if (!file) return;
                            const url = URL.createObjectURL(file);
                            setPhotoUrl(url);
                            setInitialImage(file);
                        }}
                        textSize="text-lg"
                        height="h-8"
                        name="撮影"
                    />
                </>
            ) : (
                <>
                    <div className="w-[80%] mb-12 relative aspect-video bg-black mt-3 ">
                        <Image
                            src={photoUrl}
                            alt="撮影画像"
                            className="object-contain"
                            fill
                        />
                    </div>
                    <div className="flex w-full justify-center gap-24">
                        <GenericButton
                            handleOnclick={() => {
                                setPhotoUrl(null);
                                const video = videoRef.current;
                                if (video) (async () => await video.play())();
                            }}
                            textSize="text-base"
                            height="h-8"
                            width="w-20"
                            name="再撮影"
                        />
                        <GenericButton
                            handleOnclick={() => {
                                openPostModal();
                                close();
                            }}
                            textSize="text-base"
                            width="w-20"
                            height="h-8"
                            name="投稿"
                        />
                    </div>
                </>
            )}

            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}

function MdDownCameraContent(props: {
    close: () => void;
    photoUrl: string | null;
    videoRef: RefObject<HTMLVideoElement | null>;
    canvasRef: RefObject<HTMLCanvasElement | null>;
    capture: () => Promise<File | null>;
    setPhotoUrl: (url: string | null) => void;
    setInitialImage: (file: File | null) => void;
    openPostModal: () => void;
}) {
    const {
        close,
        photoUrl,
        videoRef,
        capture,
        setPhotoUrl,
        setInitialImage,
        openPostModal,
        canvasRef,
    } = props;

    return (
        <div
            className="md:h-[85%] md:w-[50%] h-full w-full bg-black flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="w-full justify-between flex items-center">
                <div className="h-10 w-10 aspect-square">
                    <CloseButton handleOnclick={close} color="bg-white" />
                </div>
                <h3 className="text-xl text-white">写真</h3>
                <div className="h-10 w-10 aspect-square" />
            </div>
            <div className="flex-1 min-h-0 w-full relative flex items-center justify-center overflow-hidden">
                {!photoUrl ? (
                    <>
                        <video
                            className="w-full h-full object-contain bg-black -scale-x-100"
                            ref={videoRef}
                        />
                    </>
                ) : (
                    <>
                        <Image
                            src={photoUrl}
                            alt="撮影画像"
                            className="object-contain"
                            fill
                        />
                    </>
                )}
            </div>
            <div className="h-24 bg-black w-full flex items-center justify-between">
                {!photoUrl ? (
                    <>
                        <div className="w-16" />
                        <button
                            className="h-16 w-16 aspect-square rounded-full active:scale-[90%] bg-white transition-transform duration-100"
                            onClick={async () => {
                                const file = await capture();
                                if (!file) return;
                                const url = URL.createObjectURL(file);
                                setPhotoUrl(url);
                                setInitialImage(file);
                            }}
                        />
                        <div className="w-16" />
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => {
                                setPhotoUrl(null);
                                const video = videoRef.current;
                                if (video) (async () => await video.play())();
                            }}
                            className="ml-5 w-16 text-lg rounded-full active:bg-gray-700 text-white transition-color duration-100"
                        >
                            再撮影
                        </button>
                        <div className="w-16" />
                        <button
                            onClick={() => {
                                openPostModal();
                                close();
                            }}
                            className="mr-5 w-16 text-lg rounded-full active:bg-gray-700 text-white transition-color duration-100"
                        >
                            投稿
                        </button>
                    </>
                )}
            </div>
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}
