"use client";

import useQueryData from "@/app/_share/hooks/useQueryData";
import { DJANGO_URL } from "@/config";
import { Groups } from "@/types/group";
import { GroupsFetchResult } from "@/types/hook";

export default function useGroupsData(enabled: boolean): GroupsFetchResult {
    return useQueryData<Groups[]>({
        url: DJANGO_URL + "/post/api/group",
        enabled,
    });
}
