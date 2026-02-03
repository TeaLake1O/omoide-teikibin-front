"use client";

import UserIconImage from "@/app/_share/components/UserIconImage";
import { useLayoutUI } from "@/app/_share/provider/LayoutUI";
import formatDateTime from "@/app/_share/util/formatDateTime";
import Link from "next/link";
import { MessageHeader } from "../types/messageHeader";

export default function MessageListsShell({ data }: { data: MessageHeader[] }) {
    const { me } = useLayoutUI();
    if (data.length === 0) {
        return <div>メッセージはありません</div>;
    }

    return (
        <div className="w-full min-h-0 flex flex-col items-center">
            {data.map((item) => {
                const url = "/message/" + item.other.username;
                const name = item.other.nickname ?? "名無し";
                return (
                    <Link
                        href={url}
                        key={item.message_id}
                        className={`w-full flex flex-col gap-6 md:p-6 p-2 border-b-orange-200 border-b
                            hover:bg-black/10 active:bg-black/20`}
                    >
                        <div className="flex md:mr-5 md:ml-5 justify-between items-center">
                            <div className="flex flex-row items-center justify-center gap-4">
                                <div className="h-10 w-10 aspect-square rounded-full">
                                    <UserIconImage
                                        iconUrl={item.other.icon_url}
                                    />
                                </div>
                                <span className="text-lg truncate">{name}</span>
                            </div>
                            <span className="text-sm text-amber-800 truncate">
                                @{item.other.username}
                            </span>
                        </div>
                        <div className="w-full pl-12 text-gray-500 flex justify-between gap-5 md:mb-1 mb-5">
                            <div className=" truncate text-center">
                                <span>
                                    {item.sender_username === me?.username
                                        ? "あなた:"
                                        : name + ":"}
                                </span>
                                <span>
                                    {item.message_text ?? "画像を送信しました"}
                                </span>
                            </div>
                            <span className="text-sm mt-auto">
                                {formatDateTime(item.send_at, true)}
                            </span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
