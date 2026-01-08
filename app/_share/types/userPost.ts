import { UserInf } from "./userInf";

export type UserPost = {
    post_id: string;
    post_content: string | null;
    post_images: string | null;
    created_at: string;
    group: number;
    group_name: string;
    post_user: UserInf;
};
