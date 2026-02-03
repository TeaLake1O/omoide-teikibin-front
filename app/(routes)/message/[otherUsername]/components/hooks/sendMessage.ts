"use client";

import { postForm } from "@/app/_share/api/request";

export default function sendMessage({
    url,
    data,
}: {
    url: string;
    data: FormData;
}) {
    return postForm(url, data);
}
