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
    message: string | null;
    status: FetchResult<T>["status"] | null;
    isLoading: boolean;
    refresh: () => void;
};

export type QueryResultTanstack<T> = QueryResult<T> & {
    error: ApiError | null;
    hasData: boolean;
};
