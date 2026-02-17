"use client";

import ModalImage from "@/app/_share/components/modals/ImageModal";
import UserIconImage from "@/app/_share/components/UserIconImage";
import { UserPost } from "@/app/_share/types/userPost";
import formatDateTime from "@/app/_share/util/formatDateTime";
import { FRONT_URL } from "@/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ApiCacheKeys } from "../../constants/apiCacheKeys";
import { UNKNOWN_USER_ICON_URL } from "../../constants/publicUrls";
import useInfinityFeedContents from "../../hooks/domain/useInfiniteFeedContents";
import useNowTime from "../../hooks/util/useNowTime";
import uniqueT from "../../util/uniqueT";
import Loader from "../UI/util/Loader";
import FollowButton from "./FollowButton";

export type PostContentProps = {
    initialPosts: UserPost[];
    url: string;
    apiKey: ApiCacheKeys;
    apiKeyInfinite: ApiCacheKeys;
    nextUrl: string | null;
};

export default function PostContent(props: PostContentProps) {
    const { initialPosts, url, apiKey, apiKeyInfinite, nextUrl } = props;

    const {
        setLastEl,
        isNext,
        contents: posts,
        isEmpty,
        isLoading,
    } = useInfinityFeedContents<UserPost>({
        initialData: initialPosts,
        url,
        nextUrl,
        apiKey,
        apiKeyInfinite,
        enabled: true,
        getId: (p) => String(p.post_id),
    });

    const router = useRouter();
    const now = useNowTime();

    if (!posts) return null;

    const uniqPosts = uniqueT<UserPost>({
        arr: posts,
        getId: (x) => x.post_id,
    });

    if (isEmpty)
        return (
            <Link
                href={"/friend"}
                className="p-4 w-full justify-center items-center mt-3"
            >
                <span className=" text-xl text-amber-800 hover:border-b">
                    投稿がありません、フレンドとのグループを作成しましょう
                </span>
            </Link>
        );
    if (isLoading) return <div>ロード</div>;

    return (
        <>
            {uniqPosts.map((post, index) => {
                const isLast = uniqPosts.length - 1 === index;
                const isFirst = index === 0;
                const { post_user } = post;

                return (
                    <div
                        className={`w-full border-orange-200 bg-orange-100 hover:bg-orange-200/30 transition-colors duration-200 border-b-0 
                flex flex-col min-h-38 p-3 h-auto ${
                    isFirst ? "border-none" : "border-t"
                }`}
                        key={post.post_id}
                        onClick={() => {
                            router.push(`/post/${post.post_id}`);
                        }}
                        ref={isLast ? setLastEl : undefined}
                    >
                        <div className="flex flex-row items-center mb-3">
                            <Link
                                className="w-12 h-12 aspect-square rounded-full group"
                                href={`${FRONT_URL}/user/${post_user.username}`}
                                onClick={(e) => e.stopPropagation()}
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
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <span className="hover:border-b text-lg font-semibold">
                                        {post.post_user.nickname ??
                                            post.post_user.username}
                                    </span>
                                </Link>
                                <Link
                                    href={`/group/${post.group}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-sm text-amber-800"
                                >
                                    <span>グループ :</span>
                                    <span className="hover:border-b border-b-amber-800">
                                        {post.group_name}
                                    </span>
                                </Link>
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
                                className="justify-center h-8"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FollowButton
                                    state={post.post_user.status}
                                    isMe={post.post_user.status === "me"}
                                    username={post.post_user.username}
                                />
                            </div>
                            <span className="text-xs text-gray-500 mt-auto ml-auto">
                                {formatDateTime(post.created_at, true, now)}
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
        </>
    );
}
