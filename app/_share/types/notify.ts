type PostDetail = {
    post_id: string;
    post_content: string | null;
    post_images: string;
};

export type PostNotify = {
    status: "post" | "friend" | "message" | "else";
    notify_id: string;
    actor: {
        id: number;
        username: string;
        icon_url: string | null;
        nickname: string | null;
    };
    message: string;
    is_read: boolean;
    created_at: string;
    post_detail: PostDetail | null;
};
