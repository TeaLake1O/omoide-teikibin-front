"use client";

import { DJANGO_URL } from "@/config";
import Image from "next/image";
import { API_CACHE_KEYS, ApiCacheKeys } from "../constants/apiCacheKeys";
import useAddToInfinite from "../hooks/useAddToInfinite";
import useInfiniteScrollTrigger from "../hooks/useInfiniteScrollTrigger";
import useInfiniteQueryData from "../hooks/useInifiniteQueryData";
import useQueryData from "../hooks/useQueryData";
import useTabIndicator from "../hooks/useTabIndicator";
import { InfiniteResultTanstack, QueryResultTanstack } from "../types/fetch";
import { PostNotify } from "../types/notify";
import { TabItem } from "../types/TabIndicator";
import { NonEmptyArray } from "../types/util";
import Loader from "../UI/Loader";
import formatDateTime from "../util/formatDateTime";

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
        indicator,
        setActiveId,
        activeId,
        isCalcComplete,
    } = useTabIndicator<NotifyId>({ items: items });

    return (
        <div className="h-full w-full flex flex-col min-h-0">
            <div
                className={`grid h-16 w-full justify-center items-center relative`}
                style={{
                    gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
                }}
                ref={wrapRef}
            >
                {items.map((item) => (
                    <button
                        key={item.id}
                        ref={tabRef(item.id)}
                        type="button"
                        onClick={() => setActiveId(item.id)}
                        className="w-full h-full"
                    >
                        <span className="">{item.label}</span>
                    </button>
                ))}
                <span
                    className={`absolute bottom-0 h-[2px] bg-orange-300 transition-all duration-300 ease-out ${
                        isCalcComplete ? "" : "hidden"
                    }`}
                    style={{
                        transform: `translateX(${indicator.left}px)`,
                        width: `${indicator.width}px`,
                    }}
                />
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-slim mt-2">
                {activeId === "post" && (
                    <PostNotificationContents activeId={activeId} />
                )}
                {activeId === "friend" && <div>test</div>}
            </div>
        </div>
    );
}

function PostNotificationContents({ activeId }: { activeId: NotifyId }) {
    const limit = 2;
    const res = usePostNotify(
        API_CACHE_KEYS.postNotify(),
        activeId === "post",
        limit
    );
    const notifies = res.data?.pages.flat() ?? [];
    const newest = res.data?.pages?.[0]?.[0]?.created_at;

    const latest = useNewPostNotify(newest, limit);

    const { fetchNext, isFetchingNext, hasNext } = res;

    useAddToInfinite<PostNotify>({
        apiKey: API_CACHE_KEYS.postNotify(),
        latest: latest.data,
        getId: (p) => p.notify_id,
    });

    const { setLastEl, isNext } = useInfiniteScrollTrigger({
        enabled: true,
        hasNext,
        isFetchingNext,
        fetchNext,
        root: null,
        rootMargin: "50px",
        threshold: 0.1,
        delayMs: 1500,
    });

    if (!notifies) return null;
    if (notifies.length === 0) return <h1>通知がありません</h1>;

    return (
        <div className="w-full flex flex-col justify-center items-center gap-3">
            {notifies.map((notify, index) => {
                const isLast = notifies.length - 1 === index;
                return (
                    <div
                        key={notify.notify_id}
                        ref={isLast ? setLastEl : undefined}
                        className="w-[90%] p-3 border border-amber-800 rounded-md mb-1"
                    >
                        <div className="flex justify-between">
                            <span className="text-sm font-bold">
                                {notify.message}
                            </span>
                            <span className="text-sm">
                                {formatDateTime(notify.created_at, false)}
                            </span>
                        </div>
                        <div className="flex flex-col justify-center items-center p-2 gap-3">
                            <span className="text-sm text-black truncate w-[80%]">
                                {notify.post_detail?.post_content}
                            </span>
                            <div>
                                {notify.post_detail?.post_images && (
                                    <Image
                                        src={notify.post_detail?.post_images}
                                        alt="投稿通知画像"
                                        width={192}
                                        height={192}
                                    />
                                )}
                            </div>
                        </div>
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

//ここのリファクタやる

function usePostNotify(
    key: ApiCacheKeys,
    enabled: boolean,
    limit: number = 20
): InfiniteResultTanstack<PostNotify[]> {
    return useInfiniteQueryData({
        rawUrl: DJANGO_URL + "/notify/api/post" + `?limit=${limit}`,
        enabled,
        queryKey: key,
        getNextCursor: (lastPage) => {
            if (lastPage.length <= 0) return undefined;
            const last = lastPage[lastPage.length - 1];
            return last?.created_at;
        },
    });
}

function useNewPostNotify(
    time: string | undefined,
    limit: number = 20
): QueryResultTanstack<PostNotify[]> {
    return useQueryData<PostNotify[]>(
        `${
            DJANGO_URL + "/notify/api/post"
        }?limit=${limit}&after=${encodeURIComponent(time ? time : "")}`,
        !!time
    );
}
