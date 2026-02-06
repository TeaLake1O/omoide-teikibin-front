"use client";

import { postForm } from "@/app/_share/api/request";
import { DJANGO_URL } from "@/config";

export default async function createGroup(formData: FormData) {
    return await postForm(
        DJANGO_URL + `/post/api/group/create/action`,
        formData
    );
}
