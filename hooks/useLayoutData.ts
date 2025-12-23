"use client";

import { FetchResult } from "@/app/_share/types/fetch";
import { DJANGO_URL } from "@/config";
import { CurrentUserResult } from "@/types/hook";
import { Me } from "@/types/userInfo";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "../app/_share/util/fetcher";

export default function useLayoutData(): CurrentUserResult {
    const { data, error, isLoading, mutate } = useSWRImmutable<FetchResult<Me>>(
        `${DJANGO_URL}/accounts/api/layout`,
        fetcher
    );
    const isError = !!error || data?.status === "error";

    if (isLoading) {
        return {
            me: null,
            isError: null,
            message: null,
            status: null,
            isLoading: true,
            refresh: () => mutate(),
        };
    }
    if (isError || !data) {
        return {
            me: null,
            isError: true,
            message: data?.message || "エラーが発生しました。",
            status: data?.status || "error",
            isLoading: false,
            refresh: () => mutate(),
        };
    }
    return {
        me: data.resData,
        isError: false,
        message: data.message,
        status: data.status,
        isLoading: false,
        refresh: () => mutate(),
    };
}
