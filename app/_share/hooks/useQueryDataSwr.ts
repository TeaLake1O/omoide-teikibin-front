"use client";

import { FetchResult, QueryResult } from "@/app/_share/types/fetch";
import { DJANGO_URL, LOGIN_URL } from "@/config";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "../api/request";

export default function useQueryDataSwr<T>(url: string): QueryResult<T> {
    const { data, error, isLoading, mutate } = useSWRImmutable<FetchResult<T>>(
        `${DJANGO_URL}${url}`,
        fetcher
    );
    const isError = !!error || data?.status === "error";
    const isLoadingObj = {
        data: null,
        isError: null,
        message: null,
        status: null,
        isLoading: true,
        refresh: () => mutate(),
    };
    const router = useRouter();
    const isRedirecting = useMemo(() => {
        return data?.status === "noPermission" || data?.status === "notFound";
    }, [data?.status]);

    useEffect(() => {
        if (!data) return;
        if (data.status === "noPermission") {
            window.location.replace(LOGIN_URL);
            return;
        }
        if (data.status === "notFound") {
            router.replace("/not-found");
        }
    }, [data, router]);

    if (isLoading || isRedirecting) {
        return isLoadingObj;
    }
    if (isError || !data) {
        return {
            data: null,
            isError: true,
            message: data?.message || "エラーが発生しました。",
            status: data?.status || "error",
            isLoading: false,
            refresh: () => mutate(),
        };
    }
    return {
        data: data.resData,
        isError: false,
        message: data.message,
        status: data.status,
        isLoading: false,
        refresh: () => mutate(),
    };
}
