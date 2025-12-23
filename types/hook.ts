import { FetchResult } from "../app/_share/types/fetch";
import { Me } from "./userInfo";

export type CurrentUserResult = {
    me: Me | null;
    isError: boolean | null;
    message: string | null;
    status: FetchResult<Me>["status"] | null;
    isLoading: boolean;
    refresh: () => void;
};
