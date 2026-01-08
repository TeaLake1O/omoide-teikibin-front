import { QueryResult } from "@/app/_share/types/fetch";
import { UserInf } from "@/app/_share/types/userInf";
import { UserPost } from "@/app/_share/types/userPost";

export type UserPageData = UserInf & {
    user_profile: string;
    birthday: string | null;
};
export type UserPageFetchResult = QueryResult<UserPageData>;

export type UserPagePostFetchResult = {
    after: QueryResult<UserPost[]>;
    before: QueryResult<UserPost[]>;
};
