"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { ApiError, fetcherOrThrow } from "../../api/requestTanstack";
import { ApiCacheKeys } from "../../constants/apiCacheKeys";
import { LOGIN_URL } from "../../constants/apiUrls";
import { QueryResultTanstack } from "../../types/fetch";

const minute = 60_000;

export default function useQueryData<T>(args: {
    url: string;
    enabled: boolean;
    initialData?: T;
    queryKey: ApiCacheKeys;
    time?: number;
}): QueryResultTanstack<T> {
    const { url, enabled, initialData, queryKey /*time後で使う*/ } = args;
    const q = useQuery<T, ApiError>({
        queryKey: queryKey,
        queryFn: () => fetcherOrThrow<T>(url),
        retry: (failureCount, error) => {
            if (error.status === "noPermission") return false;
            return failureCount < 3;
        },
        staleTime: minute,
        refetchOnWindowFocus: true,
        enabled: enabled,
        gcTime: 5 * minute,
        initialData,
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
        };
    }

    return {
        data: q.data,
        isError: false,
        status: "success",
        isLoading: false,
        refresh: () => q.refetch(),
        error: null,
    };
}
