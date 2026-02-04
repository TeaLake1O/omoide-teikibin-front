"use client";

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { API_CACHE_KEYS } from "../../constants/apiCacheKeys";
import { FRIEND_NOTIFY_URL, POST_NOTIFY_URL } from "../../constants/apiUrls";
import { UNKNOWN_USER_ICON_URL } from "../../constants/publicUrls";
import useInfiniteScrollContents from "../../hooks/domain/useInfiniteFeedContents";
import useTabIndicator from "../../hooks/util/useTabIndicator";
import { PostNotify } from "../../types/notify";
import { TabItem } from "../../types/TabIndicator";
import { NonEmptyArray } from "../../types/util";
import formatDateTime from "../../util/formatDateTime";
import Loader from "../UI/util/Loader";

const items = [
    { id: "post", label: "投稿" },
    { id: "friend", label: "フレンド" },
    //型推論を潰さないである型の制約を満たしてるか確認するため、satisfiesでNonEmptyArrayの空チェックを行う
] as const satisfies NonEmptyArray<TabItem<string>>;

//typeof itemsでitemsが型になり、その中から[number]すると帰りうるすべての要素がunion型になり、それからidの部分だけを抽出している。
type NotifyId = (typeof items)[number]["id"];
export default function NotificationsShell() {
    const {
        wrapRef,
        tabRef,
        activeIndicator,
        setHover,
        clearHover,
        hoverIndicator,
        hoverId,
        setActiveId,
        activeId,
        isCalcComplete,
    } = useTabIndicator<NotifyId>({ items: items });

    return (
        <div className="h-full w-full flex flex-col min-h-0">
            <div
                className={`grid h-16 w-full justify-center items-center relative border-b border-b-orange-200`}
                style={{
                    gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
                }}
                ref={wrapRef}
                onMouseLeave={clearHover}
            >
                {items.map((item) => (
                    <button
                        key={item.id}
                        ref={tabRef(item.id)}
                        type="button"
                        onClick={() => setActiveId(item.id)}
                        onMouseEnter={() => setHover(item.id)}
                        className={`h-full flex justify-center items-center ${"w-full"}`}
                    >
                        <span
                            className={`${
                                item.id === activeId ? "font-bold" : ""
                            }`}
                        >
                            {item.label}
                        </span>
                    </button>
                ))}
                <div
                    className={`absolute h-[80%] bg-black/10 md:block hidden rounded-sm transition-[transform,opacity] 
                    pointer-events-none duration-300 ${
                        hoverIndicator && hoverId ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                        transform: `translateX(${
                            hoverIndicator
                                ? hoverIndicator.left +
                                  hoverIndicator.width * 0.1
                                : 0
                        }px)`,
                        width: `${
                            hoverIndicator ? hoverIndicator.width * 0.8 : 0
                        }px`,
                    }}
                />
                <span
                    className={`absolute bottom-0 h-[2px] rounded-full bg-orange-400 
                        transition-[transform,width] duration-500 ${
                            isCalcComplete ? "" : "hidden"
                        }`}
                    style={{
                        transform: `translateX(${
                            activeIndicator
                                ? activeIndicator.left +
                                  activeIndicator.width * 0.25
                                : 0
                        }px)`,
                        width: `${
                            activeIndicator ? activeIndicator.width * 0.5 : 0
                        }px`,
                    }}
                />
            </div>
            <NotificationBody activeId={activeId} />
        </div>
    );
}

const NotificationBody = memo(function notificationBody({
    activeId,
}: {
    activeId: NotifyId;
}) {
    return (
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-slim">
            {activeId === "post" && (
                <PostNotificationContents activeId={activeId} />
            )}
            {activeId === "friend" && (
                <FriendNotificationContents activeId={activeId} />
            )}
        </div>
    );
});

function PostNotificationContents({ activeId }: { activeId: NotifyId }) {
    const {
        setLastEl,
        isNext,
        contents: notifies,
        isLoading,
        isEmpty,
    } = useInfiniteScrollContents<PostNotify>({
        url: POST_NOTIFY_URL,
        apiKeyInfinite: API_CACHE_KEYS.postNotifyInfinite(),
        apiKey: API_CACHE_KEYS.postNotify(),
        enabled: activeId === "post",
        getId: (n) => String(n.notify_id),
    });

    if (!notifies) return null;
    if (isEmpty) return <h1>通知がありません</h1>;
    if (isLoading)
        return (
            <div className="w-full h-full flex flex-col justify-center items-center gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        className="border border-gray-100 bg-gray-100 h-48 w-[80%] rounded-md"
                        key={i}
                    />
                ))}
            </div>
        );

    return (
        <div className="w-full flex flex-col justify-center items-center">
            {notifies.map((notify, index) => {
                const isLast = notifies.length - 1 === index;
                const user = notify.actor;
                return (
                    <div
                        key={notify.notify_id}
                        ref={isLast ? setLastEl : undefined}
                        className="w-full border-b p-3 border-b-orange-200 hover:bg-black/10 active:bg-black/20 transition-colors duration-200"
                    >
                        <div className="flex mr-2 gap-5 items-center">
                            <Image
                                src={user.icon_url ?? UNKNOWN_USER_ICON_URL}
                                alt="通知アイコン"
                                width={24}
                                height={24}
                                className="h-10 w-10 aspect-square rounded-full"
                            />
                            <span className="text-sm truncate font-bold">
                                {notify.message}
                            </span>
                        </div>
                        <div className="flex flex-col justify-center items-center p-2 gap-3">
                            <span className="text-sm text-gray-500 truncate w-[80%]">
                                {notify.post_detail?.post_content}
                            </span>
                            <div>
                                {notify.post_detail?.post_images && (
                                    <Image
                                        src={notify.post_detail?.post_images}
                                        alt="投稿通知画像"
                                        width={112}
                                        height={112}
                                    />
                                )}
                            </div>
                        </div>
                        <span className="text-sm text-amber-800">
                            {formatDateTime(notify.created_at, true)}
                        </span>
                    </div>
                );
            })}
            {isNext && (
                <div className="w-full h-10 flex justify-center items-center">
                    <div className="h-[80%] aspect-square">
                        <Loader />
                    </div>
                </div>
            )}
        </div>
    );
}

function FriendNotificationContents({ activeId }: { activeId: NotifyId }) {
    const {
        setLastEl,
        isNext,
        contents: notifies,
        isLoading,
        isEmpty,
    } = useInfiniteScrollContents<PostNotify>({
        url: FRIEND_NOTIFY_URL,
        apiKey: API_CACHE_KEYS.friendNotify(),
        apiKeyInfinite: API_CACHE_KEYS.friendNotifyInfinite(),
        enabled: activeId === "friend",
        getId: (n) => String(n.notify_id),
    });

    if (!notifies) return null;
    if (isEmpty) return <h1>通知がありません</h1>;
    if (isLoading) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        className="border border-gray-100 bg-gray-100 h-24 w-[80%] rounded-md"
                        key={i}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            {notifies.map((notify, index) => {
                const user = notify.actor;
                const isMessage = notify.status === "message";
                const isLast = notifies.length - 1 === index;
                return (
                    <Link
                        key={notify.notify_id}
                        href={
                            isMessage
                                ? `/message/${notify.actor.username}`
                                : `/user/${notify.actor.username}`
                        }
                        className={`w-full flex flex-col gap-3 border-orange-200 p-3 
                            transition-colors duration-200 hover:bg-black/10 active:bg-black/20 ${"border-b"} `}
                        ref={isLast ? setLastEl : undefined}
                    >
                        <div className="flex mr-2 gap-5 items-center">
                            <Image
                                src={user.icon_url ?? UNKNOWN_USER_ICON_URL}
                                alt="投稿通知画像"
                                width={24}
                                height={24}
                                className="h-10 w-10 aspect-square rounded-full"
                            />
                            {isMessage ? (
                                <span className="text-sm font-bold truncate">
                                    {user.nickname ?? user.username}
                                    さんからメッセージが届いています
                                </span>
                            ) : (
                                <span className="text-sm font-bold truncate">
                                    {notify.message}
                                </span>
                            )}
                        </div>
                        {isMessage && (
                            <span className="text-gray-500 ml-20 truncate">
                                {notify.message}
                            </span>
                        )}
                        <span className="text-sm mt-2 text-amber-800">
                            {formatDateTime(notify.created_at, true)}
                        </span>
                    </Link>
                );
            })}
            {isNext && (
                <div className="w-full h-10 flex justify-center items-center">
                    <div className="h-[80%] aspect-square">
                        <Loader />
                    </div>
                </div>
            )}
        </div>
    );
}
