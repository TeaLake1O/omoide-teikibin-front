"use client";
import React, { createContext, useContext, useRef, useState } from "react";

import { PostModal } from "../types/provider";

const PostModalContext = createContext<PostModal | null>(null);

export function usePostModal() {
    const ctx = useContext(PostModalContext);
    if (!ctx) throw new Error("Error");
    return ctx;
}

export function PostModalProvider({ children }: { children: React.ReactNode }) {
    const [isPostModal, setIsPostModal] = useState(false);
    const close = () => setIsPostModal(false);
    const open = () => {
        setIsPostModal(true);
        console.trace();
    };

    const initialImage = useRef<File | null>(null);

    const value: PostModal = (() => {
        return {
            closePostModal: close,
            openPostModal: open,
            isOpenPostModal: isPostModal,
            initialImage: () => initialImage.current,
            setInitialImage: (item: File | null) =>
                (initialImage.current = item),
            resetInitialData: () => {
                initialImage.current = null;
            },
        };
    })();

    return (
        <PostModalContext.Provider value={value}>
            {children}
        </PostModalContext.Provider>
    );
}
