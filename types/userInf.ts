export type Me = {
    id: number;
    username: string;
    nickname: string | null;
    icon_url: string | null;
};
export type FetchResult<T> = {
    status: "login" | "guest" | "error" | "noPermission";
    data: T | null;
    message: string;
};
