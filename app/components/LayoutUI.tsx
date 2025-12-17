"use client";
import React, { createContext, useContext } from "react";

import { LayoutUI } from "../_share/types/LayoutUI";

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
