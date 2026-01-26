"use client";

import React from "react";
import { createPortal } from "react-dom";

type Props = {
    children: React.ReactNode;
    close: () => void;
    isOpen: boolean;
};

export default function MountedModal(props: Props) {
    const root =
        typeof document !== "undefined"
            ? document.getElementById("modal-root")
            : null;
    console.log("modal");

    if (!root) return null;
    return (
        <>
            {createPortal(
                <div
                    className={`fixed inset-0 z-[9990] bg-black/60 flex justify-center items-center ${
                        props.isOpen
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none"
                    }`}
                    onClick={props.close}
                >
                    {props.children}
                </div>,
                root!
            )}
        </>
    );
}
