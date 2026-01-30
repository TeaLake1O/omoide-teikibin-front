"use client";

import { InfiniteData } from "@tanstack/react-query";
import { ApiCacheKeys } from "../../constants/apiCacheKeys";
import { InfiniteResultTanstack, Page } from "../../types/fetch";
import { UseInfiniteScrollContents } from "../../types/infinityScroll";
import useInfiniteScrollTrigger from "../observe/useInfiniteScrollTrigger";
import useInfiniteQueryData from "../query/useInfiniteQueryData";

//無限スクロール用のhook。新規は自動で、古いものはスクロールがある位置より下になれば取得するようになっている。

export default function useInfiniteContents<T>(args: {
    initialData?: T[];
    url: string;
    apiKeyInfinite: ApiCacheKeys;
    enabled: boolean;
    limit?: number;
}): UseInfiniteScrollContents<T> {
    const { initialData, url, enabled, apiKeyInfinite, limit = 4 } = args;

    const res = useOldContents<T>({
        url,
        initialData,
        key: apiKeyInfinite,
        limit,
        enabled,
    });

    const contents =
        res.data?.pages.flatMap((p) =>
            Array.isArray(p?.results) ? p.results : []
        ) ?? [];

    const { hasNext, isFetchingNext, fetchNext } = res;

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

function useOldContents<T>(args: {
    url: string;
    initialData?: T[];
    key: ApiCacheKeys;
    enabled: boolean;
    limit?: number;
}): InfiniteResultTanstack<T> {
    const { url, key, limit = 20, initialData, enabled } = args;
    const firstUrl = url + `limit=${limit}`;
    const toPage = (items: T[]): Page<T> => ({
        next: null,
        previous: null,
        results: items,
    });
    const toInitial = (items: T[]): InfiniteData<Page<T>, string> => ({
        pages: [toPage(items)],
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
