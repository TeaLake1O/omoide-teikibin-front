type PostDetail = {
    post_id: string;
    post_content: string | null;
    post_images: string;
};

export type PostNotify = {
    status: string;
    notify_id: string;
    actor: number;
    message: string;
    is_read: boolean;
    created_at: string;
    post_detail: PostDetail | null;
};
