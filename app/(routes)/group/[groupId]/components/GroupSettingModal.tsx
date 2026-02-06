"use client";

import CloseButton from "@/app/_share/components/UI/button/CloseButton";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function GroupSettingModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                }}
                className="h-[90%] aspect-square mr-2 items-center rounded-full 
                    gap-1 flex justify-center hover:bg-black/20 active:bg-black/20
                    transition-colors duration-300"
            >
                <div className="h-[10%] aspect-square rounded-full bg-amber-800" />
                <div className="h-[10%] aspect-square rounded-full bg-amber-800 " />
                <div className="h-[10%] aspect-square rounded-full bg-amber-800" />
            </button>
            <ModalWindow isOpen={isOpen} close={() => setIsOpen(false)} />
        </>
    );
}
function ModalWindow({
    isOpen,
    close,
}: {
    isOpen: boolean;
    close: () => void;
}) {
    return (
        <>
            {isOpen &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[9990] bg-black/60 flex justify-center items-center"
                        onClick={close}
                    >
                        <form
                            className="md:h-[90%] md:w-[40%] h-full w-full bg-orange-100 rounded-md p-3"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-24">
                                <div className="relative h-10 aspect-square ml-1">
                                    <CloseButton
                                        handleOnclick={close}
                                        color="bg-black"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>,
                    document.getElementById("modal-root")!
                )}
        </>
    );
}
