export type MessageData = {
    id: number;
    message_image: string | null;
    message_text: string | null;
    send_at: string;
    sender_inf: {
        id: 9;
        username: string;
        icon_url: string | null;
        nickname: string | null;
    };
    friendship_id: number;
};
