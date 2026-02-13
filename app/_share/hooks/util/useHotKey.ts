"use client";

import { useEffect, useRef } from "react";

export const HOTKEYS = ["Escape", "Enter"] as const;
export type HotKey = (typeof HOTKEYS)[number];

export default function useHotKey({
    callback,
    key,
    enabled,
}: {
    callback: () => void;
    key: HotKey;
    enabled: boolean;
}) {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!enabled) return;
        const hotkeyHandler = (e: KeyboardEvent) => {
            if (e.isComposing || e.key === "Process" || e.repeat) return;

            if (e.key === key) {
                callbackRef.current();
            }
        };

        window.addEventListener("keydown", hotkeyHandler);
        return () => {
            window.removeEventListener("keydown", hotkeyHandler);
        };
    }, [enabled, key]);
}
