"use client";
import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

import useLayoutData from "@/hooks/useLayoutData";
import { Me } from "@/types/Me";
import { LayoutUI } from "../types/provider";

const LayoutUIContext = createContext<LayoutUI | null>(null);

export function useLayoutUI() {
    const ctx = useContext(LayoutUIContext);
    if (!ctx) throw new Error("Error");
    return ctx;
}

export function LayoutUIProvider({
    initialMe,
    children,
}: {
    initialMe: Me | null;
    children: React.ReactNode;
}) {
    //トグル用のrefと関数
    const [hamburger, setHamburger] = useState(false);
    //ハンバーガー開閉用のフラグをトグルするコールバック
    const toggleHamburger = useCallback(() => {
        //アローで書かないと連打で古い値を掴むことがあるらしい
        setHamburger((prev) => !prev);
    }, []);
    const [optimisticUrl, setOptimisticUrl] = useState<string | null>(null);
    //カスタムフック、共通レイアウトのデータを取得する
    const { data: me, isLoading, refresh } = useLayoutData();

    const effectiveMe = me ?? initialMe;

    const value = useMemo<LayoutUI>(() => {
        return {
            me: effectiveMe,
            refresh,
            toggleHamburger,
            optimisticUrl,
            setOptimisticUrl,
            hamburger,
            isLoading,
        };
    }, [
        effectiveMe,
        refresh,
        toggleHamburger,
        optimisticUrl,
        hamburger,
        isLoading,
    ]);

    return (
        <LayoutUIContext.Provider value={value}>
            {children}
        </LayoutUIContext.Provider>
    );
}
