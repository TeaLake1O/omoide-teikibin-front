import { QueryResult } from "@/app/_share/types/fetch";
import { UserInf } from "@/app/_share/types/userInf";

export type UserPageData = UserInf & {
    user_profile: string;
    birthday: string | null;
};
export type UserPageFetchResult = QueryResult<UserPageData>;
