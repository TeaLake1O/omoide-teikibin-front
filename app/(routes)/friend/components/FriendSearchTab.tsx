"use client";

import SearchBox from "@/app/_share/components/UI/util/SearchBox";
import UserIconImage from "@/app/_share/components/UserIconImage";
import { API_CACHE_KEYS } from "@/app/_share/constants/apiCacheKeys";
import { FRIEND_SEARCH } from "@/app/_share/constants/apiUrls";
import useInfiniteContents from "@/app/_share/hooks/domain/useInfiniteContents";
import useTimeout from "@/app/_share/hooks/util/useTimeout";
import { UserInf } from "@/app/_share/types/userInf";
import Link from "next/link";
import { useState } from "react";

export default function FriendSearchTab() {
    //const data = useInfiniteQueryData<UserInf[]>({});

    return (
        <div className="h-full w-full flex flex-col items-center border-t border-orange-200 ">
            <UserSearchList />
        </div>
    );
}

function UserSearchList() {
    const [text, _setText] = useState("");
    const [queryText, setQueryText] = useState("");
    const { schedule } = useTimeout();

    const setText = (text: string) => {
        _setText(text);
        schedule(() => {
            setQueryText(text);
        }, 500);
    };

    const hasQuery = queryText.trim().length > 0;

    const {
        setLastEl,
        isNext,
        contents: user,
        isEmpty,
        isLoading,
        refresh,
    } = useInfiniteContents<UserInf>({
        url: `${FRIEND_SEARCH}?username=${queryText}&`,
        apiKeyInfinite: API_CACHE_KEYS.friendSearch(queryText),
        enabled: hasQuery,
        limit: 10,
    });
    const hasUser = !(hasQuery && user.length === 0);
    return (
        <>
            <div className="h-18 w-[80%] flex justify-center items-center">
                <SearchBox setText={(e) => setText(e)} text={text} />
            </div>
            <div className="w-[80%] h-[80%] overflow-y-auto flex flex-col items-center">
                {hasUser ? (
                    user.map((item) => {
                        const name = item.nickname ?? "名無し";

                        return (
                            <Link
                                href={`/user/${item.username}`}
                                key={item.id}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full hover:bg-gray-100 active:bg-gray-100 p-3 pb-0 bg-white border flex flex-col gap-3 border-gray-300"
                            >
                                <div className="flex md:mr-5 md:ml-5 justify-between items-center">
                                    <div className="flex flex-row items-center justify-center gap-4">
                                        <div className="h-10 w-10 aspect-square rounded-full">
                                            <UserIconImage
                                                iconUrl={item.icon_url}
                                            />
                                        </div>
                                        <span className="text-lg truncate">
                                            {name}
                                        </span>
                                    </div>
                                    <span className="text-sm text-amber-800 truncate">
                                        @{item.username}
                                    </span>
                                </div>
                                <div className="w-full min-h-0 text-gray-500 flex justify-between gap-5 md:mb-1">
                                    {/*
                                    <div
                                        className="flex justify-center items-center h-full"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            refresh();
                                        }}
                                    >
                                        <FollowButton
                                            state={item.status}
                                            isMe={false}
                                            username={item.username}
                                        />
                                    </div>*/}
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <span>ユーザが見つかりません</span>
                )}
            </div>
        </>
    );
}
