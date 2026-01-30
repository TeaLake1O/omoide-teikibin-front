"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { ApiError, fetcherOrThrow } from "../../api/requestTanstack";
import { ApiCacheKeys } from "../../constants/apiCacheKeys";
import { LOGIN_URL } from "../../constants/apiUrls";
import { InfiniteResultTanstack, Page } from "../../types/fetch";

const seconds = 1_000;
const minute = 60_000;

export default function useInfiniteQueryData<T>(args: {
    url: string;
    enabled: boolean;
    queryKey: ApiCacheKeys;
    initialData?: InfiniteData<Page<T>, string>;
}): InfiniteResultTanstack<T> {
    const { url, enabled, queryKey, initialData } = args;

    const q = useInfiniteQuery<
        Page<T>,
        ApiError,
        InfiniteData<Page<T>, string>,
        ApiCacheKeys,
        string
    >({
        queryKey: queryKey,
        queryFn: ({ pageParam }) => {
            return fetcherOrThrow<Page<T>>(pageParam);
        },
        retry: (failureCount, error) => {
            if (error.status === "noPermission") return false;
            return failureCount < 3;
        },
        getNextPageParam: (lastPage) => lastPage.next ?? undefined,
        initialPageParam: url,
        initialData: initialData,
        staleTime: 30 * seconds,
        enabled,
        gcTime: minute * 10,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });

    const isRedirecting = q.isError && q.error?.status === "noPermission";

    useEffect(() => {
        if (!q.isError) return;
        if (q.error?.status === "noPermission") {
            window.location.replace(LOGIN_URL);
            return;
        }
    }, [q.isError, q.error]);

    if (q.isPending || isRedirecting) {
        return {
            data: null,
            isError: null,
            status: null,
            isLoading: true,
            refresh: () => q.refetch(),
            error: null,
            fetchNext: () => void q.fetchNextPage(),
            hasNext: false,
            isFetchingNext: false,
        };
    }
    if (q.isError) {
        return {
            data: null,
            isError: q.isError,
            status: q.error?.status || "error",
            isLoading: false,
            refresh: () => q.refetch(),
            error: q.error,
            fetchNext: () => void q.fetchNextPage(),
            hasNext: false,
            isFetchingNext: false,
        };
    }

    return {
        data: q.data ?? null,
        isError: false,
        status: "success",
        isLoading: false,
        refresh: () => q.refetch(),
        error: null,
        fetchNext: () => void q.fetchNextPage(),
        hasNext: !!q.hasNextPage,
        isFetchingNext: q.isFetchingNextPage,
    };
}
