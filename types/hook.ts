import { FetchResult } from "./fetch";
import { Me } from "./userInf";

export type CurrentUserResult = {
    me: Me | null;
    isError: boolean | null;
    message: string | null;
    status: FetchResult<Me>["status"] | null;
    isLoading: boolean;
    refresh: () => void;
};
