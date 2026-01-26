"use client";
import React, { createContext, useContext, useState } from "react";

import { NotifyModal } from "../types/provider";

const NotifyModalContext = createContext<NotifyModal | null>(null);

export function useNotifyModal() {
    const ctx = useContext(NotifyModalContext);
    if (!ctx) throw new Error("Error");
    return ctx;
}

export function NotifyModalProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isNotifyModal, setIsNotifyModal] = useState(false);
    const close = () => setIsNotifyModal(false);
    const open = () => setIsNotifyModal(true);
    const value: NotifyModal = (() => {
        return {
            closeNotifyModal: close,
            openNotifyModal: open,
            isOpenNotifyModal: isNotifyModal,
        };
    })();

    return (
        <NotifyModalContext.Provider value={value}>
            {children}
        </NotifyModalContext.Provider>
    );
}
