import { UserInf } from "@/app/_share/types/userInf";

export type Groups = {
    id: number;
    group_name: string;
    group_image: string | null;
    last_post_nickname: string | null;
    last_post_username: string;
    last_post_content: string | null;
    last_post_created_at: string;
};

export type InviteFriend = {
    friend_id: number;
    friend_date: string;
    other: UserInf;
};
