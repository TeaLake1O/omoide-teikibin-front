import { UserInf } from "@/app/_share/types/userInf";

export type MessageHeader = {
    friend_id: number;
    other: UserInf;
    last_msg_id: 46;
    last_msg_content: null | string;
    last_msg_send_at: null | string;
    last_msg_sender_id: number | string;
};
