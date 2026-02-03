"use client";

import { UserPost } from "@/app/_share/types/userPost";
import { GroupMessageData } from "../types/GroupMessage";

export default function GroupMessageShell({
    data,
    detail,
    next,
}: {
    data: UserPost[];
    detail: GroupMessageData;
    next: string | null;
}) {
    return (
        <>
            {data.map((item) => {
                return <span key={item.post_id}>{item.post_content}</span>;
            })}
        </>
    );
}
