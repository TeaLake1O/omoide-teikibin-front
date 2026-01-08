import { UserInf } from "./userInf";

export type UserPost = {
    post_id: string;
    post_content: string;
    post_images: string;
    created_at: string;
    group: number;
    post_user: UserInf;
};
