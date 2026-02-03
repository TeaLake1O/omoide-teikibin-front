"use client";

import FollowButton from "@/app/_share/components/domain/FollowButton";
import UserIconImage from "@/app/_share/components/UserIconImage";
import formatDateTime from "@/app/_share/util/formatDateTime";
import Link from "next/link";
import { FriendRequestData } from "../types/friends";

export default function FriendRequest({ data }: { data: FriendRequestData[] }) {
    if (data.length === 0) {
        return <div>申請はありません</div>;
    }
    return (
        <div className="w-full min-h-0 flex flex-col items-center">
            {data.map((item, index) => {
                const isLast = data.length - 1 === index;
                const name = item.nickname ?? "名無し";
                return (
                    <Link
                        href={`/user/${item.username}`}
                        key={item.id}
                        className={`w-full flex flex-col gap-6 border-t md:p-6 p-2 border-t-orange-200 
                            hover:bg-black/10 active:bg-black/20 ${
                                isLast ? "border-b border-b-orange-200" : ""
                            }`}
                    >
                        <div className="flex md:mr-5 md:ml-5 justify-between items-center">
                            <div className="flex flex-row items-center justify-center gap-4">
                                <div className="h-10 w-10 aspect-square rounded-full">
                                    <UserIconImage iconUrl={item.icon_url} />
                                </div>
                                <span className="text-lg truncate">{name}</span>
                            </div>
                            <span className="text-sm text-amber-800 truncate">
                                @{item.username}
                            </span>
                        </div>
                        <div className="w-full pl-12 text-gray-500 flex justify-between gap-5 md:mb-1 mb-5">
                            <div className="flex justify-center items-center">
                                <FollowButton
                                    state={item.status}
                                    isMe={false}
                                    username={item.username}
                                />
                            </div>
                            <span className="text-sm mt-auto">
                                {formatDateTime(item.updated_at, true)}
                            </span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
