export type FetchResult<T> = {
    status: "login" | "guest" | "error" | "noPermission";
    httpStatus: number;
    data: T | null;
    message: string;
};
