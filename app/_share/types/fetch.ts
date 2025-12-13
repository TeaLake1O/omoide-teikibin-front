export type FetchResult<T> = {
    status: "login" | "guest" | "error" | "noPermission";
    httpStatus: number;
    resData: T | null;
    message: string;
};
