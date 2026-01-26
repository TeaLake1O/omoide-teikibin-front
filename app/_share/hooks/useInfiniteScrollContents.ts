"use client";

import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { ApiCacheKeys } from "../constants/apiCacheKeys";
import { InfiniteResultTanstack, QueryResultTanstack } from "../types/fetch";
import { UseInfiniteScrollContents } from "../types/infinityScroll";
import useInfiniteQueryData from "./useInfiniteQueryData";
import useQueryData from "./useQueryData";

//無限スクロール用のhook。新規は自動で、古いものはスクロールがある位置より下になれば取得するようになっている。

export default function useInfiniteScrollContents<T>(args: {
    initialData?: T[];
    url: string;
    apiKey: ApiCacheKeys;
    enabled: boolean;
    getCursor: (item: T) => string;
    getId: (item: T) => string;
}): UseInfiniteScrollContents<T> {
    const { initialData, url, apiKey, getCursor, getId, enabled } = args;

    const limit = 2;

    const res = useOldContents<T>({
        url,
        initialData,
        key: apiKey,
        limit,
        enabled,
        getCursor,
    });

    const contents = res.data?.pages.flat() ?? [];
    const newest = res.data?.pages?.[0]?.[0]
        ? getCursor(res.data.pages[0][0])
        : undefined;

    const latest = useNewContents<T>({ url, time: newest, limit, enabled });

    const { hasNext, isFetchingNext, fetchNext } = res;

    useAddToInfinite<T>({
        apiKey: apiKey,
        latest: latest.data,
        enabled,
        getId,
    });

    const { setLastEl, isNext } = useInfiniteScrollTrigger({
        enabled,
        hasNext,
        isFetchingNext,
        fetchNext,
        root: null,
        rootMargin: "50px",
        threshold: 0.1,
        delayMs: 1500,
    });

    const rs: UseInfiniteScrollContents<T> = {
        setLastEl,
        isNext: isNext || isFetchingNext,
        contents,
        isLoading: res.isLoading,
        isEmpty: !res.isLoading && contents.length === 0,
    };

    return rs;
}

function useNewContents<T>(args: {
    url: string;
    time: string | undefined;
    limit: number;
    enabled: boolean;
}): QueryResultTanstack<T[]> {
    const { url, time, limit = 20, enabled } = args;
    return useQueryData<T[]>({
        url: `${url}?limit=${limit}&after=${encodeURIComponent(
            time ? time : ""
        )}`,
        enabled: enabled && !!time,
    });
}

function useOldContents<T>(args: {
    url: string;
    initialData?: T[];
    key: ApiCacheKeys;
    enabled: boolean;
    limit?: number;
    getCursor: (item: T) => string;
}): InfiniteResultTanstack<T[]> {
    const { url, key, limit = 20, getCursor, initialData, enabled } = args;
    const d = (data: T[]): InfiniteData<T[]> => {
        return {
            pages: [data],
            pageParams: [null],
        };
    };
    const InitialInfiniteData: InfiniteData<T[]> | undefined =
        initialData === undefined ? undefined : d(initialData);
    return useInfiniteQueryData<T[]>({
        rawUrl: url + `?limit=${limit}`,
        enabled,
        queryKey: key,
        initialData: InitialInfiniteData,
        getNextCursor: (lastPage) => {
            if (lastPage.length <= 0) return undefined;
            const last = lastPage[lastPage.length - 1];
            return getCursor(last);
        },
    });
}

function useAddToInfinite<T>(args: {
    apiKey: ApiCacheKeys;
    latest: T[] | null;
    enabled: boolean;
    getId: (item: T) => string;
}) {
    const { apiKey, latest, getId, enabled } = args;

    const getIdRef = useRef(getId);
    useEffect(() => {
        getIdRef.current = getId;
    }, [getId]);
    const qc = useQueryClient();

    useEffect(() => {
        const newPosts = latest;
        if (!newPosts || newPosts.length === 0 || !enabled) return;

        qc.setQueryData<InfiniteData<T[]>>(apiKey, (old) => {
            if (!old) return old;
            const id = getIdRef.current;

            const exist = new Set(old.pages.flat().map(id));
            const add = newPosts.filter((p) => !exist.has(id(p)));
            if (add.length === 0) return old;
            const first = old.pages[0] ?? [];
            //oldを展開した後、pagesで新しいデータを使い上書きしている

            return {
                ...old,
                pages: [[...add, ...first], ...old.pages.slice(1)],
            };
        });
    }, [qc, latest, enabled, apiKey]);
}

function useInfiniteScrollTrigger(args: {
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
