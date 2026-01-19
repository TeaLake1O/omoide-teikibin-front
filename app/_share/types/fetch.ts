import { InfiniteData } from "@tanstack/react-query";
import { ApiError } from "../api/requestTanstack";

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
export type InfiniteResultTanstack<T> = QueryResult<InfiniteData<T>> & {
    error: ApiError | null;
    fetchNext: () => void;
    hasNext: boolean;
    isFetchingNext: boolean;
};
