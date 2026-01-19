"use client";

import { LOGIN_URL } from "@/config";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { ApiError, fetcherOrThrow } from "../api/requestTanstack";
import { ApiCacheKeys } from "../constants/apiCacheKeys";
import { InfiniteResultTanstack } from "../types/fetch";

const minute = 60_000;

export default function useInfiniteQueryData<T>(args: {
    rawUrl: string;
    enabled: boolean;
    queryKey: ApiCacheKeys;
    initialData?: InfiniteData<T>;
    getNextCursor: (lastPage: T) => string | undefined;
}): InfiniteResultTanstack<T> {
    const { rawUrl, enabled, queryKey, initialData, getNextCursor } = args;
    const q = useInfiniteQuery<T, ApiError>({
        queryKey: [queryKey] as const,
        queryFn: ({ pageParam }) => {
            const before = pageParam;
            const url =
                rawUrl +
                (before ? "&before=" + encodeURIComponent(String(before)) : "");
            return fetcherOrThrow<T>(url);
        },
        retry: (failureCount, error) => {
            if (error.status === "noPermission") return false;
            return failureCount < 3;
        },
        getNextPageParam: (lastPage) => getNextCursor(lastPage),
        initialPageParam: null as string | null,
        initialData: initialData,
        staleTime: minute,
        refetchOnWindowFocus: true,
        enabled,
        gcTime: 5 * minute,
        refetchOnMount: initialData !== undefined ? false : true,
        refetchInterval: minute / 2,
        refetchIntervalInBackground: true,
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
