"use client";

import ImageModal from "@/app/_share/components/modals/ImageModal";
import Loader from "@/app/_share/components/UI/util/Loader";
import UserIconImage from "@/app/_share/components/UserIconImage";
import { API_CACHE_KEYS } from "@/app/_share/constants/apiCacheKeys";
import useInfiniteFeedContents from "@/app/_share/hooks/domain/useInfiniteFeedContents";
import { useLayoutUI } from "@/app/_share/provider/LayoutUI";
import formatDateTime from "@/app/_share/util/formatDateTime";
import uniqueT from "@/app/_share/util/uniqueT";
import Link from "next/link";
import { useCallback, useLayoutEffect, useRef } from "react";
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

    const { me } = useLayoutUI();

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
        isLoading,
    } = useInfiniteFeedContents<MessageData>({
        initialData: data,
        url: url,
        nextUrl: next,
        apiKey: API_CACHE_KEYS.message(username),
        apiKeyInfinite: API_CACHE_KEYS.messageInfinite(username),
        enabled: true,
        getId: (p) => String(p.id),
    });
    const messages = uniqueT<MessageData>({
        arr: contents,
        getId: (x) => x.id,
    }).sort((a, b) => Date.parse(a.send_at) - Date.parse(b.send_at));

    useLayoutEffect(() => {
        if (!pendingScrollBottomRef.current) return;
        requestAnimationFrame(() => {
            scrollBottom();
            requestAnimationFrame(scrollBottom);
        });

        pendingScrollBottomRef.current = false;
    }, [messages.length, scrollBottom]);

    if (isLoading) return null;

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
                    if (index === 0) {
                        return (
                            <div
                                key={item.id}
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
                                <MessageArea
                                    data={item}
                                    username={me.username}
                                    isAboveSender={isAboveSender}
                                />
                            </div>
                        );
                    }
                    return (
                        <div key={item.id} className="w-full flex flex-col p-2">
                            <MessageArea
                                data={item}
                                username={me.username}
                                isAboveSender={isAboveSender}
                            />
                        </div>
                    );
                })}
            </div>

            <SendArea
                sendUrl={`${url}/action`}
                username={username}
                onSendSuccess={() => (pendingScrollBottomRef.current = true)}
            />
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
    const isMe = other.username !== username;
    const name = isMe ? null : (other.nickname ?? username);

    return (
        <div
            className={`w-full flex ${!isMe ? "justify-end" : "justify-start"}`}
        >
            <div className="flex flex-col max-w-[60%] ">
                {isMe && !isAboveSender && (
                    <div className="flex w-full gap-2 items-center mb-2">
                        <Link
                            href={`/user/${other.username}`}
                            className="h-10 w-10 aspect-square rounded-full"
                        >
                            <UserIconImage iconUrl={other.icon_url} />
                        </Link>
                        <span>{name}</span>
                    </div>
                )}

                <div
                    className={`w-full border border-orange-100 p-2 flex flex-col justify-center items-center ${
                        !isMe ? "bg-orange-200" : "bg-orange-50 ml-2"
                    } rounded-md`}
                >
                    {data.message_text && <span>{data.message_text}</span>}
                    {data.message_image && (
                        <div className="md:w-[300px] w-[200px] overflow-hidden aspect-video">
                            <ImageModal
                                src={data.message_image}
                                text={data.message_text}
                            />
                        </div>
                    )}
                </div>
                <span className="text-gray-400 text-[10px] w-full text-right">
                    {formatDateTime(data.send_at, true)}
                </span>
            </div>
        </div>
    );
}
