import { UserInf } from "@/app/_share/types/userInf";
//後で消す
export type FriendData = {
    friend_id: number;
    friend_date: string;
    other: UserInf;
};
export type FriendRequestData = UserInf & {
    updated_at: string;
};

export type UserSearchData = {
    next: number;
};
