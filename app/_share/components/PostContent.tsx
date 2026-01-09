"use client";

import ModalImage from "@/app/_share/components/ModalImage";
import UserIconImage from "@/app/_share/components/UserIconImage";
import { UserPost } from "@/app/_share/types/userPost";
import formatDateTime from "@/app/_share/util/formatDateTime";
import { FRONT_URL } from "@/config";
import Link from "next/link";

export type PostContentProps = {
    post: UserPost;
    isFirst: boolean;
    isLast: boolean;
};

export default function PostContent(props: PostContentProps) {
    const { post, isFirst, isLast } = props;
    const pageUrl = FRONT_URL + "/user/" + post.post_user.username;
    return (
        <div
            className={`w-full border border-orange-300 border-b-0 border-r-0 border-l-0 
                bg-orange-100 flex flex-col min-h-38 p-3 h-auto  ${
                    isLast && "mb-16 md:mb-1"
                }`}
        >
            <div className="flex flex-row items-center mb-3">
                <Link className="w-12 aspect-square" href={pageUrl}>
                    <UserIconImage iconUrl={post.post_user.icon_url} />
                </Link>
                <div className="flex gap-5 ml-7 justify-between w-full">
                    <Link href={pageUrl}>
                        <span className="hover:border-b text-lg">
                            {post.post_user.nickname ?? post.post_user.username}
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
                    <div className="aspect-video md:w-[85%] w-[90%]">
                        <ModalImage
                            iconUrl={post.post_images}
                            text={post.post_content}
                            rounded="rounded-xl"
                        />
                    </div>
                </div>
            )}
            <span className="text-xs text-gray-500 mt-auto ml-auto">
                {formatDateTime(post.created_at, true)}
            </span>
        </div>
    );
}
