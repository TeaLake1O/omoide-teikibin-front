"use client";

import UserIconImage from "@/app/_share/components/UserIconImage";
import { UserPost } from "@/app/_share/types/userPost";
import formatDateTime from "@/app/_share/util/formatDateTime";
import { FRONT_URL } from "@/config";
import Image from "next/image";
import Link from "next/link";

export type PostContentProps = {
    post: UserPost;
    isFirst: boolean;
    isLast: boolean;
};

export default function PostContent(props: PostContentProps) {
    const { post, isLast } = props;
    return (
        <div
            className={`w-full border border-orange-300 border-r-0 border-l-0 bg-orange-100 flex flex-col min-h-38 p-3 h-auto ${
                isLast ? "mb-16 md:mb-1 border-b-orange-300" : "border-b-0"
            }`}
        >
            <div className="flex flex-row items-center mb-3">
                <Link
                    className="w-12 aspect-square"
                    href={FRONT_URL + "/user/" + post.post_user.username}
                >
                    <UserIconImage iconUrl={post.post_user.icon_url} />
                </Link>
                <div className="flex gap-5 ml-7 justify-between w-full">
                    <span className="text-lg">
                        {post.post_user.nickname ?? post.post_user.username}
                    </span>
                    <span className="text-sm text-amber-800">
                        グループ :{post.group_name}
                    </span>
                </div>
            </div>
            <div className="m-3">
                <span>{post.post_content}</span>
            </div>

            {post.post_images && (
                <Image src={post.post_images} alt="投稿画像"></Image>
            )}
            <span className="text-xs text-gray-500 mt-auto ml-auto">
                {formatDateTime(post.created_at, true)}
            </span>
        </div>
    );
}
