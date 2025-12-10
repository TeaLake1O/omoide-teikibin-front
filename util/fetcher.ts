"use client";
import { FetchResult } from "@/types/fetch";

export default async function fetcher<T = unknown>(
    url: string
): Promise<FetchResult<T>> {
    const res = await fetch(url, {
        credentials: "include",
    });
    if (res.status === 403 || res.status === 401) {
        return {
            status: "noPermission",
            httpStatus: res.status,
            resData: null,
            message: "ログインが必要です。",
        };
    } else if (!res.ok) {
        return {
            status: "error",
            httpStatus: res.status,
            resData: null,
            message: "エラーが発生しました。",
        };
    }

    const body = (await res.json()) as T;

    return {
        status: "login",
        httpStatus: res.status,
        resData: body,
        message: "成功",
    };
}
