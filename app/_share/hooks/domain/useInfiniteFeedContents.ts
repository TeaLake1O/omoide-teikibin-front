"use client";

import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { ApiCacheKeys } from "../../constants/apiCacheKeys";
import { InfiniteResultTanstack, QueryResultTanstack } from "../../types/fetch";
import { UseInfiniteScrollContents } from "../../types/infinityScroll";
import useInfiniteScrollTrigger from "../observe/useInfiniteScrollTrigger";
import useInfiniteQueryData from "../query/useInfiniteQueryData";
import useQueryData from "../query/useQueryData";

//無限スクロール用のhook。新規は自動で、古いものはスクロールがある位置より下になれば取得するようになっている。

import { Page } from "../../types/fetch";

export default function useInfiniteFeedContents<T>(args: {
    initialData?: T[];
    url: string;
    apiKeyInfinite: ApiCacheKeys;
    apiKey: ApiCacheKeys;
    enabled: boolean;
    nextUrl?: string | null;
    getId: (item: T) => string;
}): UseInfiniteScrollContents<T> {
    const {
        initialData,
        url,
        apiKey,
        getId,
        enabled,
        apiKeyInfinite,
        nextUrl,
    } = args;

    const limit = 4;

    const res = useOldContents<T>({
        url,
        initialData,
        key: apiKeyInfinite,
        nextUrl,
        limit,
        enabled,
    });

    const contents =
        res.data?.pages.flatMap((p) =>
            Array.isArray(p?.results) ? p.results : []
        ) ?? [];

    const latest = useNewContents<T>({
        url,
        limit,
        enabled,
        apiKey,
    });

    const { hasNext, isFetchingNext, fetchNext } = res;

    useAddToInfinite<T>({
        apiKey: apiKeyInfinite,
        latest: latest.data?.results ?? null,
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
    limit: number;
    enabled: boolean;
    apiKey: ApiCacheKeys;
}): QueryResultTanstack<Page<T>> {
    const { url, limit = 20, enabled, apiKey } = args;
    return useQueryData<Page<T>>({
        url: `${url}?limit=${limit}`,
        queryKey: apiKey,
        enabled: enabled,
    });
}

function useOldContents<T>(args: {
    url: string;
    initialData?: T[];
    key: ApiCacheKeys;
    enabled: boolean;
    nextUrl?: string | null;
    limit?: number;
}): InfiniteResultTanstack<T> {
    const { url, key, limit = 20, initialData, enabled, nextUrl } = args;
    const firstUrl = url + `?limit=${limit}`;
    const toPage = (items: T[], next: string | null): Page<T> => ({
        next,
        previous: null,
        results: items,
    });
    const toInitial = (items: T[]): InfiniteData<Page<T>, string> => ({
        pages: [toPage(items, nextUrl ?? null)],
        pageParams: [firstUrl],
    });
    const InitialInfiniteData: InfiniteData<Page<T>, string> | undefined =
        initialData === undefined ? undefined : toInitial(initialData);
    return useInfiniteQueryData<T>({
        url: firstUrl,
        enabled,
        queryKey: key,
        initialData: InitialInfiniteData,
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

        qc.setQueryData<InfiniteData<Page<T>, string>>(apiKey, (old) => {
            if (!old) return old;
            if (!old.pages?.[0] || !Array.isArray(old.pages[0].results))
                return old;
            const id = getIdRef.current;

            const exist = new Set(
                old.pages
                    .flatMap((p) =>
                        Array.isArray(p?.results) ? p.results : []
                    )
                    .map(id)
            );
            const add = newPosts.filter((p) => !exist.has(id(p)));
            if (add.length === 0) return old;
            const firstPage = old.pages[0];
            if (!firstPage) return old;
            //oldを展開した後、pagesで新しいデータを使い上書きしている
            const newFirstPage: Page<T> = {
                ...firstPage,
                results: [...add, ...firstPage.results],
            };
            return {
                ...old,
                pages: [newFirstPage, ...old.pages.slice(1)],
            };
        });
    }, [qc, latest, enabled, apiKey]);
}
