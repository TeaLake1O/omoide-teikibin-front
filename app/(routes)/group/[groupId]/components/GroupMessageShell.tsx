"use client";

import DefaultGroupIcon from "@/app/_share/components/UI/Icon/DefaultGroupIcon";
import Loader from "@/app/_share/components/UI/util/Loader";
import UserIconImage from "@/app/_share/components/UserIconImage";
import ImageModal from "@/app/_share/components/modals/ImageModal";
import { API_CACHE_KEYS } from "@/app/_share/constants/apiCacheKeys";
import useInfiniteFeedContents from "@/app/_share/hooks/domain/useInfiniteFeedContents";
import { useLayoutUI } from "@/app/_share/provider/LayoutUI";
import { UserPost } from "@/app/_share/types/userPost";
import formatDateTime from "@/app/_share/util/formatDateTime";
import uniqueT from "@/app/_share/util/uniqueT";
import Link from "next/link";
import { useCallback, useLayoutEffect, useRef } from "react";
import { GroupMessageData } from "../types/GroupMessage";
import GroupSettingModal from "./GroupSettingModalButton";
import SendArea from "./SendArea";

type Props = {
    data: UserPost[];
    detail: GroupMessageData;
    next: string | null;
    url: string;
};

export default function GroupMessageShell(props: Props) {
    const { data, next, url, detail } = props;

    const scrollRef = useRef<HTMLDivElement | null>(null);

    const scrollBottom = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollTop = el.scrollHeight;
    }, []);

    const pendingScrollBottomRef = useRef(false);

    useLayoutEffect(() => {
        scrollBottom();
    }, [scrollBottom]);

    const {
        setLastEl: setTopEl,
        isNext,
        contents,
        //isEmpty,
        isLoading,
    } = useInfiniteFeedContents<UserPost>({
        initialData: data,
        url: url,
        nextUrl: next,
        apiKey: API_CACHE_KEYS.groupPosts(detail.id),
        apiKeyInfinite: API_CACHE_KEYS.groupPostsInfinite(detail.id),
        enabled: true,
        getId: (p) => String(p.post_id),
    });
    const messages = uniqueT<UserPost>({
        arr: contents,
        getId: (x) => x.post_id,
    }).sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));

    useLayoutEffect(() => {
        if (!pendingScrollBottomRef.current) return;
        requestAnimationFrame(() => {
            scrollBottom();
            requestAnimationFrame(scrollBottom);
        });

        pendingScrollBottomRef.current = false;
    }, [messages.length, scrollBottom]);
    console.log(data);

    if (isLoading) return null;
    return (
        <div className="h-full w-full flex flex-col">
            <div className="h-12 w-full flex bg-orange-100 border-b border-b-orange-200 items-center justify-between">
                <div className="h-9 w-9 aspect-square rounded-full ml-2">
                    {detail.group_image ? (
                        <UserIconImage iconUrl={detail.group_image} />
                    ) : (
                        <DefaultGroupIcon />
                    )}
                </div>
                <h3 className="text-lg text-center text-amber-800">
                    {detail.group_name}
                </h3>
                <GroupSettingModal detail={detail} />
            </div>
            <div
                className="flex-1 overflow-y-auto no-scrollbar"
                ref={scrollRef}
            >
                {messages.map((item, index) => {
                    if (index === 0) {
                        return (
                            <div
                                key={item.post_id}
                                className="w-full flex flex-col p-2"
                                ref={setTopEl}
                            >
                                {isNext && (
                                    <div className="w-full h-8 flex justify-center items-center">
                                        <div className="h-full aspect-square">
                                            <Loader />
                                        </div>
                                    </div>
                                )}

                                <MessageArea data={item} />
                            </div>
                        );
                    }
                    return (
                        <div
                            key={item.post_id}
                            className="w-full flex flex-col p-2"
                        >
                            <MessageArea data={item} />
                        </div>
                    );
                })}
            </div>
            <SendArea
                id={detail.id}
                onSendSuccess={() => (pendingScrollBottomRef.current = true)}
            />
        </div>
    );
}
function MessageArea({ data }: { data: UserPost }) {
    const { me } = useLayoutUI();
    const user = data.post_user;
    const isMe = user.username === me.username;
    const name = user.nickname ?? user.username;

    return (
        <div
            className={`w-full flex ${isMe ? "justify-end" : "justify-start"}`}
        >
            <div className="flex flex-col max-w-[60%] ">
                {!isMe && (
                    <div className="flex w-full gap-2 items-center mb-2">
                        <Link
                            href={`/user/${user.username}`}
                            className="h-10 w-10 aspect-square rounded-full"
                        >
                            <UserIconImage iconUrl={user.icon_url} />
                        </Link>
                        <span>{name}</span>
                    </div>
                )}

                <div
                    className={`w-full border border-orange-100 p-2 flex flex-col justify-center items-center ${
                        isMe ? "bg-orange-200" : "bg-orange-50 ml-2"
                    } rounded-md`}
                >
                    {data.post_content && (
                        <span className={`${data.post_images ? "mb-2" : ""}`}>
                            {data.post_content}
                        </span>
                    )}
                    {data.post_images && (
                        <div className="md:w-[300px] w-[200px] overflow-hidden aspect-video">
                            <ImageModal
                                src={data.post_images}
                                text={data.post_content}
                            />
                        </div>
                    )}
                </div>
                <span className="text-gray-400 text-[10px] w-full text-right">
                    {formatDateTime(data.created_at, true)}
                </span>
            </div>
        </div>
    );
}
