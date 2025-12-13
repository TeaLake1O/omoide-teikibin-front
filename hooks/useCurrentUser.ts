"use client";

import { API_URL } from "@/config";
import { FetchResult } from "@/types/fetch";
import { CurrentUserResult } from "@/types/hook";
import { Me } from "@/types/userInf";
import useSWRImmutable from "swr/immutable";
import fetcher from "../util/fetcher";

export default function useCurrentUser(): CurrentUserResult {
    const { data, error, isLoading, mutate } = useSWRImmutable<FetchResult<Me>>(
        `${API_URL}/accounts/api/layout`,
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
