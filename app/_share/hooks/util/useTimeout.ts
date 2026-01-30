"use client";

import { useCallback, useEffect, useRef } from "react";

export default function useTimeout() {
    const timerIdRef = useRef<number | null>(null);

    const clear = useCallback(() => {
        if (timerIdRef.current !== null) {
            window.clearTimeout(timerIdRef.current);
            timerIdRef.current = null;
        }
    }, []);

    const schedule = useCallback(
        (fn: () => void, ms: number) => {
            clear();

            timerIdRef.current = window.setTimeout(() => {
                fn();
            }, ms);
        },
        [clear]
    );

    useEffect(() => {
        return () => clear();
    }, [clear]);

    return { schedule, clear };
}
