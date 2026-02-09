"use client";

import DefaultGroupIcon from "@/app/_share/components/UI/Icon/DefaultGroupIcon";
import GroupIconImage from "@/app/_share/components/UserIconImage";
import { useLayoutUI } from "@/app/_share/provider/LayoutUI";
import formatDateTime from "@/app/_share/util/formatDateTime";
import Link from "next/link";
import { Groups } from "../types/Group";
import CreateGroup from "./CreateGroup";

export default function GroupShell({ data }: { data: Groups[] }) {
    const { me } = useLayoutUI();

    const groupList = [...data].sort(
        (a, b) =>
            Date.parse(b.last_post_created_at ?? b.created_at) -
            Date.parse(a.last_post_created_at ?? a.created_at),
    );

    return (
        <>
            <div className="w-full h-16 border-b border-b-orange-200 flex justify-between items-center">
                <div className="w-20 h-full" />
                <h2 className="text-xl text-amber-800 text-center">
                    グループ一覧
                </h2>
                <CreateGroup />
            </div>
            <div className="w-full min-h-0 flex flex-col items-center">
                {groupList.map((item) => {
                    console.log(item);
                    const name =
                        item.last_post_nickname ?? item.last_post_username;
                    return (
                        <Link
                            href={`/group/${item.id}`}
                            key={item.id}
                            className={`w-full flex flex-col gap-6 md:p-6 p-2  
                            hover:bg-black/10 active:bg-black/20 border-b border-b-orange-200
                            `}
                        >
                            <div className="flex md:mr-5 md:ml-5 justify-between items-center">
                                <div className="flex flex-row items-center justify-center gap-4">
                                    <div className="h-10 w-10 aspect-square rounded-full">
                                        {item.group_image ? (
                                            <GroupIconImage
                                                iconUrl={item.group_image}
                                            />
                                        ) : (
                                            <div className="w-[80%] h-[80%">
                                                <DefaultGroupIcon />
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-lg truncate">
                                        {item.group_name}
                                    </span>
                                </div>
                            </div>
                            <div className="w-full pl-12 text-gray-500 flex justify-between gap-5 md:mb-1 mb-5">
                                {item.last_post_username && (
                                    <div className=" truncate text-center">
                                        <span>
                                            {item.last_post_username ===
                                            me?.username
                                                ? "あなた:"
                                                : name + ":"}
                                        </span>
                                        <span>
                                            {item.last_post_content ??
                                                "画像を送信しました"}
                                        </span>
                                    </div>
                                )}
                                {item.last_post_created_at ? (
                                    <span className="text-sm mt-auto">
                                        {formatDateTime(
                                            item.last_post_created_at,
                                            true,
                                        )}
                                    </span>
                                ) : (
                                    <span className="text-sm mt-auto">
                                        メッセージがありません
                                    </span>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
