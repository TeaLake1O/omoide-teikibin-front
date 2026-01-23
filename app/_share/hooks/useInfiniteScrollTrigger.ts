"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function useInfiniteScrollTrigger(args: {
    enabled: boolean;
    hasNext: boolean;
    isFetchingNext: boolean;
    fetchNext: () => void;
    root?: Element | null;
    rootMargin?: string;
    threshold?: number;
    delayMs?: number;
}) {
    const {
        enabled,
        hasNext,
        isFetchingNext,
        fetchNext,
        root,
        rootMargin = "50px",
        threshold = 0.1,
        delayMs = 1500,
    } = args;

    const lockRef = useRef(false);
    const [isNext, setIsNext] = useState(false);

    const lastEl = useRef<HTMLDivElement | null>(null);
    const setLastEl = useCallback((node: HTMLDivElement | null) => {
        lastEl.current = node;
    }, []);

    useEffect(() => {
        if (!enabled) return;
        const el = lastEl.current;
        if (!el) return;

        if (!hasNext || isFetchingNext) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const e = entries[0];
                if (!e?.isIntersecting) return;
                if (!hasNext || isFetchingNext) return;
                if (lockRef.current) return;
                setIsNext(true);
                lockRef.current = true;
                window.setTimeout(() => {
                    fetchNext();
                    lockRef.current = false;
                    setIsNext(false);
                }, delayMs);
            },
            {
                root,
                rootMargin,
                threshold,
            }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [
        enabled,
        hasNext,
        isFetchingNext,
        fetchNext,
        root,
        rootMargin,
        threshold,
        delayMs,
    ]);
    return { setLastEl, isNext };
}
