"use client";

import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
import CloseButton from "../UI/CloseButton";

type Props = {
    iconUrl: string | null;
    text?: string | null;
    rounded?: string;
};

export default function ModalImage(props: Props) {
    const root =
        typeof document !== "undefined"
            ? document.getElementById("modal-root")
            : null;

    const [openModal, setOpenModal] = useState<boolean>(false);
    const src = props.iconUrl ? props.iconUrl : "/img/accountsicon.png";

    if (!root) return null;
    return (
        <div
            className={`flex justify-center items-center w-full h-full overflow-hidden bg-white relative ${
                props.rounded ? props.rounded : "rounded-none"
            }`}
        >
            <Image
                src={src}
                alt="投稿画像"
                onClick={() => setOpenModal(true)}
                fill
                className="object-cover"
            ></Image>
            {openModal &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[9990] bg-black/90 flex justify-center items-center"
                        onClick={() => setOpenModal(false)}
                    >
                        <div className="w-10 h-10 aspect-square absolute left-12 top-6">
                            <CloseButton
                                handleOnclick={() => setOpenModal(false)}
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="flex relative items-center md:max-w-[75vw] md:max-h-[75vh] w-[90%] h-auto"
                            >
                                <Image
                                    src={src}
                                    alt="投稿画像"
                                    width={1200}
                                    height={800}
                                    preload
                                    className="w-full h-auto max-h-[80vh] min-h-[60vh] object-contain"
                                ></Image>
                            </div>
                            {props.text && (
                                <div className="pt-6 max-w-[75vw]">
                                    <span className="text-white truncate block">
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
