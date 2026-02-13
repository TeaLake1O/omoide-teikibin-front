"use client";

import FollowButton from "@/app/_share/components/domain/FollowButton";
import ImageModal from "@/app/_share/components/modals/ImageModal";
import UserIconImage from "@/app/_share/components/UserIconImage";
import { UNKNOWN_USER_ICON_URL } from "@/app/_share/constants/publicUrls";
import { UserPost } from "@/app/_share/types/userPost";
import formatDateTime from "@/app/_share/util/formatDateTime";
import Link from "next/link";
import Reply from "./Reply";

export default function PostShell({
    data,
    url,
}: {
    data: UserPost;
    url: string;
}) {
    return (
        <div>
            <div
                className={`w-full border-orange-200 bg-orange-100 transition-colors duration-200 border-b border-b-orange-200 
                flex flex-col min-h-38 p-3 h-auto`}
            >
                <div className="flex flex-row items-center mb-3">
                    <Link
                        className="w-12 h-12 aspect-square rounded-full group"
                        href={`/user/${data.post_user.username}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <UserIconImage
                            iconUrl={
                                data.post_user.icon_url ?? UNKNOWN_USER_ICON_URL
                            }
                            isOverlay
                        />
                    </Link>
                    <div className="flex gap-5 ml-7 justify-between items-center w-full">
                        <Link
                            href={`/user/${data.post_user.username}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span className="hover:border-b text-lg font-semibold">
                                {data.post_user.nickname ??
                                    data.post_user.username}
                            </span>
                        </Link>
                        <Link
                            href={`/group/${data.group}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-sm text-amber-800"
                        >
                            <span>グループ :</span>
                            <span className="hover:border-b border-b-amber-800">
                                {data.group_name}
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="m-7 mb-3 mt-3">
                    <span>{data.post_content}</span>
                </div>

                {data.post_images && (
                    <div className=" flex justify-center w-full h-full pt-4 pb-4">
                        <div
                            className="aspect-video md:w-[85%] w-[90%]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ImageModal
                                src={data.post_images}
                                text={data.post_content}
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
                            state={data.post_user.status}
                            isMe={data.post_user.status === "me"}
                            username={data.post_user.username}
                        />
                    </div>
                    <span className="text-xs text-gray-500 mt-auto ml-auto">
                        {formatDateTime(data.created_at, true)}
                    </span>
                </div>
            </div>
            <Reply url={url} id={data.post_id} />
        </div>
    );
}
