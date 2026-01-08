"use client";

import useQueryData from "@/app/_share/hooks/useQueryData";
import { UserPost } from "@/app/_share/types/userPost";
import { DJANGO_URL } from "@/config";
import { UserPagePostFetchResult } from "../types/userPageData";

export default function useUserPagePostData(
    username: string,
    time: string
): UserPagePostFetchResult {
    const limit = 20;

    const after = useQueryData<UserPost[]>(
        `${DJANGO_URL}/accounts/api/mypage/${username}?limit=${limit}&after=${time}`
    );
    const before = useQueryData<UserPost[]>("");
    return {
        after,
        before,
    };
}
