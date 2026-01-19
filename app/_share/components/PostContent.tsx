"use client";

import ModalImage from "@/app/_share/components/ModalImage";
import UserIconImage from "@/app/_share/components/UserIconImage";
import { UserPost } from "@/app/_share/types/userPost";
import formatDateTime from "@/app/_share/util/formatDateTime";
import { FRONT_URL } from "@/config";
import { InfiniteData } from "@tanstack/react-query";
import Link from "next/link";
import { ApiCacheKeys } from "../constants/apiCacheKeys";
import { UNKNOWN_USER_ICON_URL } from "../constants/publicUrl";
import useInfiniteQueryData from "../hooks/useInifiniteQueryData";
import useQueryData from "../hooks/useQueryData";
import { InfiniteResultTanstack, QueryResultTanstack } from "../types/fetch";
import FollowButton from "./FollowButton";

export type PostContentProps = {
    posts: UserPost[];
    url: string;
    apiKey: ApiCacheKeys;
};

export default function PostContent(props: PostContentProps) {
    const limit = 2;

    const res = usePost(props.url, props.posts, props.apiKey, limit);

    const posts = res.data?.pages.flat() ?? [];
    const newest = res.data?.pages?.[0]?.[0]?.created_at;

    const latest = useNewPost(props.url, newest ?? "", limit);

    if (!posts) return null;

    return (
        <>
            {posts.map((post, index) => {
                const isLast = posts.length - 1 === index;
                const isFirst = index === 0;
                const { post_user } = post;

                return (
                    <div
                        className={`w-full border-orange-300 bg-orange-100 hover:bg-orange-200/30 transition-colors duration-200 border-b-0 
                flex flex-col min-h-38 p-3 h-auto ${
                    isFirst ? "border-none" : "border-t"
                }`}
                        key={post.post_id}
                        onClick={() => console.log("click")}
                    >
                        <div
                            className="flex flex-row items-center mb-3"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Link
                                className="w-12 aspect-square rounded-full group"
                                href={`${FRONT_URL}/user/${post_user.username}`}
                            >
                                <UserIconImage
                                    iconUrl={
                                        post.post_user.icon_url ??
                                        UNKNOWN_USER_ICON_URL
                                    }
                                    isOverlay
                                />
                            </Link>
                            <div className="flex gap-5 ml-7 justify-between items-center w-full">
                                <Link
                                    href={`${FRONT_URL}/user/${post_user.username}`}
                                >
                                    <span className="hover:border-b text-lg font-semibold">
                                        {post.post_user.nickname ??
                                            post.post_user.username}
                                    </span>
                                </Link>
                                <span className="text-sm text-amber-800">
                                    グループ :{post.group_name}
                                </span>
                            </div>
                        </div>
                        <div className="m-7 mb-3 mt-3">
                            <span>{post.post_content}</span>
                        </div>

                        {post.post_images && (
                            <div className=" flex justify-center w-full h-full pt-4 pb-4">
                                <div
                                    className="aspect-video md:w-[85%] w-[90%]"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ModalImage
                                        src={post.post_images}
                                        text={post.post_content}
                                        rounded="rounded-xl"
                                    />
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <div
                                className="justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FollowButton
                                    state={post.post_user.status}
                                    isMe={post.post_user.status === "me"}
                                    username={post.post_user.username}
                                />
                            </div>
                            <span className="text-xs text-gray-500 mt-auto ml-auto">
                                {formatDateTime(post.created_at, true)}
                            </span>
                        </div>
                        <button onClick={res.fetchNext}>更新</button>
                    </div>
                );
            })}
        </>
    );
}

function useNewPost(
    url: string,
    time: string,
    limit: number = 20
): QueryResultTanstack<UserPost[]> {
    return useQueryData<UserPost[]>(
        `${url}?limit=${limit}&after=${time}`,
        true
    );
}
function usePost(
    url: string,
    initialPosts: UserPost[],
    key: ApiCacheKeys,
    limit: number = 20
): InfiniteResultTanstack<UserPost[]> {
    const InitialData: InfiniteData<UserPost[]> = {
        pages: [initialPosts],
        pageParams: [null],
    };
    return useInfiniteQueryData({
        rawUrl: url + `?limit=${limit}`,
        enabled: true,
        queryKey: key,
        initialData: InitialData,
        getNextCursor: (lastPage) => {
            if (lastPage.length <= 0) return undefined;
            const last = lastPage[lastPage.length - 1];
            return last?.created_at;
        },
    });
}
