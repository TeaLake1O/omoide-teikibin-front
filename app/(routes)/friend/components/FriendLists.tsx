"use client";

import { UNKNOWN_USER_ICON_URL } from "@/app/_share/constants/publicUrls";
import { useLayoutUI } from "@/app/_share/provider/LayoutUI";
import formatDateTime from "@/app/_share/util/formatDateTime";
import Image from "next/image";
import Link from "next/link";
import { FriendData } from "../types/friends";

export default function FriendLists({ data }: { data: FriendData[] }) {
    const { me } = useLayoutUI();
    return (
        <div className="w-full min-h-0 flex flex-col items-center">
            {data.map((item, index) => {
                const isLast = data.length - 1 === index;
                const name = item.other.nickname ?? "名無し";
                return (
                    <div
                        key={item.message_id}
                        className={`w-full flex flex-col gap-6 border-t md:p-6 p-2 border-t-orange-200 
                            hover:bg-black/10 active:bg-black/20 ${
                                isLast ? "border-b border-b-orange-200" : ""
                            }`}
                    >
                        <div className="flex md:mr-5 md:ml-5 justify-between items-center">
                            <div className="flex flex-row items-center justify-center gap-4">
                                <Link
                                    href={`/user/${item.other.username}`}
                                    className="h-10 w-10 aspect-square rounded-full group"
                                >
                                    <Image
                                        src={
                                            item.other.icon_url ??
                                            UNKNOWN_USER_ICON_URL
                                        }
                                        alt="投稿通知画像"
                                        width={24}
                                        height={24}
                                        className="h-full w-full aspect-square rounded-full group-hover:brightness-90 
                                    transition-filter duration-200 group-active:brightness-90"
                                    />
                                </Link>
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
                                <span> {item.message_text}</span>
                            </div>
                            <span className="text-sm mt-auto">
                                {formatDateTime(item.send_at, true)}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
