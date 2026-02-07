"use client";

import { patchForm } from "@/app/_share/api/request";
import { DJANGO_URL } from "@/config";

export default function updateGroup({
    group,
    data,
}: {
    group: number;
    data: FormData;
}) {
    return patchForm(
        `${DJANGO_URL}/post/api/group/${group}/update/action`,
        data,
    );
}
