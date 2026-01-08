"use client";

import useQueryDataSwr from "@/app/_share/hooks/useQueryDataSwr";
import { UserPageData, UserPageFetchResult } from "../types/userPageData";

export default function useUserPageData(username: string): UserPageFetchResult {
    return useQueryDataSwr<UserPageData>(`/accounts/api/mypage/${username}`);
}
