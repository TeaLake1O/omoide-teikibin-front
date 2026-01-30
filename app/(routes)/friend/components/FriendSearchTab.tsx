"use client";

import SearchBox from "@/app/_share/components/UI/util/SearchBox";
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
        <div className="min-h-0 w-full flex flex-col items-center border-t border-orange-200 ">
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
    } = useInfiniteContents<UserInf>({
        url: `${FRIEND_SEARCH}?username=${queryText}&`,
        apiKeyInfinite: API_CACHE_KEYS.friendSearch(queryText),
        enabled: hasQuery,
    });
    console.log(user, `${FRIEND_SEARCH}?username=${queryText}`);
    return (
        <>
            <div className="h-18 w-[80%] flex justify-center items-center">
                <SearchBox setText={(e) => setText(e)} text={text} />
            </div>
            {user.map((item) => {
                return (
                    <Link href={`/user/${item.username}`} key={item.id}>
                        <span>{item.username}</span>
                    </Link>
                );
            })}
        </>
    );
}
