"use client";

import FollowButton from "@/app/_share/components/domain/FollowButton";
import ImageModal from "@/app/_share/components/modals/ImageModal";
import Loader from "@/app/_share/components/UI/util/Loader";
import UserIconImage from "@/app/_share/components/UserIconImage";
import { API_CACHE_KEYS } from "@/app/_share/constants/apiCacheKeys";
import { UNKNOWN_USER_ICON_URL } from "@/app/_share/constants/publicUrls";
import useInfiniteContents from "@/app/_share/hooks/domain/useInfiniteContents";
import { UserPost } from "@/app/_share/types/userPost";
import formatDateTime from "@/app/_share/util/formatDateTime";
import Link from "next/link";

export default function Reply({ url, id }: { url: string; id: string }) {
    const {
        setLastEl,
        isNext,
        contents: comments,
        isEmpty,
    } = useInfiniteContents<UserPost>({
        url: `${url}/comments?`,
        limit: 5,
        apiKeyInfinite: API_CACHE_KEYS.comments(id),
        enabled: true,
    });

    if (isEmpty)
        return (
            <div className="h-16 w-full flex justify-center ">
                <span className="text-amber-800 text-xl ">
                    返信はありません
                </span>
            </div>
        );

    return (
        <div className="w-full pr-8 pl-8">
            <div className="h-16 w-full flex justify-center">
                <span className="text-amber-800 text-xl ">返信一覧</span>
            </div>
            {comments.map((item, index) => {
                const isLast = comments.length - 1 === index;
                return (
                    <div
                        key={item.post_id}
                        ref={isLast ? setLastEl : null}
                        className={`w-full border-orange-200 border-t border-r border-l bg-orange-100 transition-colors duration-200 border-b border-b-orange-200 
                flex flex-col min-h-38 p-3 h-auto`}
                    >
                        <div className="flex flex-row items-center mb-3">
                            <Link
                                className="w-8 h-8 aspect-square rounded-full group"
                                href={`/user/${item.post_user.username}`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <UserIconImage
                                    iconUrl={
                                        item.post_user.icon_url ??
                                        UNKNOWN_USER_ICON_URL
                                    }
                                    isOverlay
                                />
                            </Link>
                            <div className="flex gap-5 ml-7 justify-between items-center w-full">
                                <Link
                                    href={`/user/${item.post_user.username}`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <span className="hover:border-b text-lg font-semibold">
                                        {item.post_user.nickname ??
                                            item.post_user.username}
                                    </span>
                                </Link>
                                <Link
                                    href={`/group/${item.group}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-sm text-amber-800"
                                >
                                    <span>グループ :</span>
                                    <span className="hover:border-b border-b-amber-800">
                                        {item.group_name}
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="m-7 mb-3 mt-3">
                            <span>{item.post_content}</span>
                        </div>

                        {item.post_images && (
                            <div className=" flex justify-center w-full h-full pt-4 pb-4">
                                <div
                                    className="aspect-video md:w-[85%] w-[90%]"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ImageModal
                                        src={item.post_images}
                                        text={item.post_content}
                                        rounded="rounded-xl"
                                    />
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <div
                                className="justify-center h-8"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FollowButton
                                    state={item.post_user.status}
                                    isMe={item.post_user.status === "me"}
                                    username={item.post_user.username}
                                />
                            </div>
                            <span className="text-xs text-gray-500 mt-auto ml-auto">
                                {formatDateTime(item.created_at, true)}
                            </span>
                        </div>
                    </div>
                );
            })}
            <div
                className={`w-full h-14 flex  justify-center items-center ${
                    isNext ? "block" : "hidden"
                }
                            `}
            >
                <div className="h-[60%] aspect-square flex justify-center items-center">
                    <Loader />
                </div>
            </div>
        </div>
    );
}
