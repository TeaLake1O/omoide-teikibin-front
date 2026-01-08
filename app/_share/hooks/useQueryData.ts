"use client";

import { LOGIN_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ApiError, fetcherOrThrow } from "../api/requestTanstack";
import { QueryResultTanstack } from "../types/fetch";

export default function useQueryData<T>(url: string): QueryResultTanstack<T> {
    const router = useRouter();

    const q = useQuery<T, ApiError>({
        queryKey: ["api", url],
        queryFn: () => fetcherOrThrow<T>(url),
        retry: 0,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    const isRedirecting =
        q.isError &&
        (q.error?.status === "noPermission" || q.error?.status === "notFound");

    useEffect(() => {
        if (!q.isError) return;
        if (q.error?.status === "noPermission") {
            window.location.replace(LOGIN_URL);
            return;
        }
        if (q.error?.status === "notFound") {
            router.replace("/not-found");
        }
    }, [q.isError, q.error, router]);

    if (q.isPending || isRedirecting) {
        return {
            data: null,
            isError: null,
            message: null,
            status: null,
            isLoading: true,
            refresh: () => q.refetch(),
            error: null,
            hasData: false,
        };
    }
    if (q.isError) {
        return {
            data: null,
            isError: q.isError,
            message: q.error?.message || "エラーが発生しました。",
            status: q.error?.status || "error",
            isLoading: false,
            refresh: () => q.refetch(),
            error: q.error,
            hasData: false,
        };
    }

    return {
        data: q.data,
        isError: false,
        message: "成功",
        status: "success",
        isLoading: false,
        refresh: () => q.refetch(),
        error: null,
        hasData: q.data != null,
    };
}
