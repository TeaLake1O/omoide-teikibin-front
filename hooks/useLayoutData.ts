"use client";

import useQueryData from "@/app/_share/hooks/query/useQueryDataSwr";
import { CurrentUserFetchResult } from "@/types/hook";
import { Me } from "@/types/Me";

export default function useLayoutData(): CurrentUserFetchResult {
    return useQueryData<Me>("/accounts/api/layout");
}
