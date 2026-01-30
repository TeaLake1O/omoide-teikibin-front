import { ApiError } from "../api/requestTanstack";

import { InfiniteData } from "@tanstack/react-query";

export type FetchResult<T> = {
    status: "success" | "guest" | "error" | "noPermission" | "notFound";
    httpStatus: number;
    resData: T | null;
    message: string;
};
export type QueryResult<T> = {
    data: T | null;
    isError: boolean | null;
    status: FetchResult<T>["status"] | null;
    isLoading: boolean;
    refresh: () => void;
};

export type QueryResultTanstack<T> = QueryResult<T> & {
    error: ApiError | null;
};

export type Page<TItem> = {
    next: string | null;
    previous: string | null;
    results: TItem[];
};

export type InfiniteResultTanstack<T> = {
    data: InfiniteData<Page<T>, string> | null;
    isError: boolean | null;
    status: FetchResult<T>["status"] | null;
    isLoading: boolean;
    refresh: () => void;
    error: ApiError | null;
    fetchNext: () => void;
    hasNext: boolean;
    isFetchingNext: boolean;
};
