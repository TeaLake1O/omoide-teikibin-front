import { UserInf } from "@/app/_share/types/userInf";

export type GroupMessageData = {
    id: number;
    group_name: string;
    group_image: string | null;
    group_description: string | null;
    created_at: string;
};
export type Member = {
    member: number;
    member_info: UserInf;
};
