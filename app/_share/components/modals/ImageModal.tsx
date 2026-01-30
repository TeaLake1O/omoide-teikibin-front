"use client";

import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
import CloseButton from "../UI/button/CloseButton";

type Props = {
    src: string;
    text?: string | null;
    rounded?: string;
};

export default function ImageModal(props: Props) {
    const root =
        typeof document !== "undefined"
            ? document.getElementById("modal-root")
            : null;

    const [openModal, setOpenModal] = useState<boolean>(false);

    if (!root) return null;
    if (!props.src) return null;
    return (
        <div
            className={`flex justify-center items-center w-full h-full overflow-hidden bg-gray-200 relative ${
                props.rounded ? props.rounded : "rounded-none"
            }`}
        >
            <Image
                src={props.src}
                alt="投稿画像"
                onClick={() => setOpenModal(true)}
                fill
                className="object-cover hover:brightness-75 transition duration-200"
            ></Image>
            {openModal &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[9990] bg-black/90 flex justify-center items-center"
                        onClick={() => setOpenModal(false)}
                    >
                        <div
                            className="w-10 h-10  aspect-square absolute md:left-6 left-2 top-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <CloseButton
                                handleOnclick={() => setOpenModal(false)}
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="flex relative items-center w-full min-h-0 h-auto"
                            >
                                <Image
                                    src={props.src}
                                    alt="投稿画像"
                                    width={800}
                                    height={800}
                                    priority
                                    className="md:max-w-[80vh] md:max-h-[75vh] h-auto max-h-[80vh] md:min-h-[60vh] min-h-0 object-contain"
                                ></Image>
                            </div>
                            {props.text && (
                                <div className="pt-6">
                                    <span className="text-white truncate max-w-128 block">
                                        {props.text}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>,
                    root!
                )}
        </div>
    );
}
