import { UserInf } from "@/app/_share/types/userInf";
//後で消す
export type FriendData = {
    message_id: number;
    other: UserInf;
    message_text: string;
    send_at: string;
    sender_id: number;
    sender_username: string;
    sender_nickname: string | null;
};
export type FriendRequestData = UserInf & {
    updated_at: string;
};

export type UserSearchData = {
    next: number;
};
