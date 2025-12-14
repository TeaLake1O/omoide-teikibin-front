"use client";
import { Me } from "@/types/CurrentUserInfoLayout";
import React, { createContext, useContext } from "react";

type LayoutUI = {
    toggleHamburger: () => void;
    me: Me | null;
};

const LayoutUIContext = createContext<LayoutUI | null>(null);

export function useLayoutUI() {
    const ctx = useContext(LayoutUIContext);
    if (!ctx) throw new Error("Error");
    return ctx;
}

export function LayoutUIProvider({
    value,
    children,
}: {
    value: LayoutUI;
    children: React.ReactNode;
}) {
    return (
        <LayoutUIContext.Provider value={value}>
            {children}
        </LayoutUIContext.Provider>
    );
}
