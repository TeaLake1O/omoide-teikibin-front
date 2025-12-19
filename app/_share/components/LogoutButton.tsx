"use client";

import { LANDING_PAGE_URL } from "@/config";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPortal } from "react-dom";
import logout from "../util/logout";

export default function LogOut() {
    const router = useRouter();

    const [openModal, setOpenModal] = useState<boolean>(false);
    return (
        <>
            <button
                onClick={async () => {
                    setOpenModal(true);
                    //await logout();
                    //router.push(LANDING_PAGE_URL);
                }}
            >
                <span className="text-red-600 hover:text-red-200 active:text-red-200 transition-colors duration-200">
                    ログアウト
                </span>
            </button>
            {openModal &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[9999] bg-black/60 flex justify-center items-center"
                        onClick={() => setOpenModal(false)}
                    >
                        <div
                            className="w-64 h-50 bg-orange-100 md:w-90 md:h-60 rounded-2xl flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span className="pt-15 font-bold text-lg text-black">
                                ログアウトしますか？
                            </span>
                            <div className="pt-12 md:pt-16 flex items-center gap-3">
                                <button
                                    className="h-8 w-24 bg-red-500 rounded-4xl hover:bg-red-400 active:scale-[95%] duration-150"
                                    onClick={async () => {
                                        await logout();
                                        router.push(LANDING_PAGE_URL);
                                    }}
                                >
                                    <span className="text-white font-bold leading-none">
                                        ログアウト
                                    </span>
                                </button>
                                <button
                                    className="h-8 w-24 border bg-white rounded-4xl hover:bg-stone-200 active:scale-[95%] duration-150"
                                    onClick={() => setOpenModal(false)}
                                >
                                    <span className="text-black font-sans font-bold leading-none">
                                        キャンセル
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.getElementById("modal-root")!
                )}
        </>
    );
}
