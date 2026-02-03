"use client";

import UserIconImage from "@/app/_share/components/UserIconImage";
import { API_CACHE_KEYS } from "@/app/_share/constants/apiCacheKeys";
import useInfiniteFeedContents from "@/app/_share/hooks/domain/useInfiniteFeedContents";
import formatDateTime from "@/app/_share/util/formatDateTime";
import { useLayoutEffect, useRef } from "react";
import { MessageData } from "../types/messageData";
import SendArea from "./SendArea";

type Props = {
    data: MessageData[];
    next: string | null;
    username: string;
    url: string;
};

export default function MessageShell(props: Props) {
    const { data, next, url, username } = props;

    const scrollRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollTop = el.scrollHeight;
    }, []);

    const { setLastEl, isNext, contents, isEmpty, isLoading } =
        useInfiniteFeedContents<MessageData>({
            initialData: data,
            url: url,
            nextUrl: next,
            apiKey: API_CACHE_KEYS.message(username),
            apiKeyInfinite: API_CACHE_KEYS.messageInfinite(username),
            enabled: true,
            getId: (p) => String(p.id),
        });
    const messages = contents.toReversed();
    return (
        <div className="h-full w-full flex flex-col">
            <div
                className="flex-1 overflow-y-auto no-scrollbar"
                ref={scrollRef}
            >
                {messages.map((item, index) => {
                    const isAboveSender =
                        index > 0 &&
                        item.sender_inf.username ===
                            messages[index - 1].sender_inf.username;
                    return (
                        <div key={item.id} className="w-full flex flex-col p-2">
                            <MessageArea
                                data={item}
                                username={username}
                                isAboveSender={isAboveSender}
                            />
                        </div>
                    );
                })}
            </div>

            <SendArea />
        </div>
    );
}

function MessageArea({
    data,
    username,
    isAboveSender,
}: {
    data: MessageData;
    username: string;
    isAboveSender: boolean;
}) {
    const other = data.sender_inf;
    const isMe = other.username === username;
    const name = isMe ? null : other.nickname ?? username;

    return (
        <div
            className={`w-full flex ${!isMe ? "justify-end" : "justify-start"}`}
        >
            <div className="flex flex-col max-w-[60%] ">
                {isMe && !isAboveSender && (
                    <div className="flex w-full gap-2 items-center mb-2">
                        <div className="h-10 w-10 aspect-square rounded-full">
                            <UserIconImage iconUrl={other.icon_url} />
                        </div>
                        <span>{name}</span>
                    </div>
                )}

                <div
                    className={`w-full border border-orange-100 p-2 ${
                        !isMe ? "bg-orange-200" : "bg-orange-50 ml-2"
                    } rounded-md`}
                >
                    {data.message_text && <span>{data.message_text}</span>}
                    {data.message_image && <span>{data.message_text}</span>}
                </div>
                <span className="text-gray-400 text-[10px] w-full text-right">
                    {formatDateTime(data.send_at, true)}
                </span>
            </div>
        </div>
    );
}
