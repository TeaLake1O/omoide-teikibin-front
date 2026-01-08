"use client";

import { patchForm } from "@/app/_share/api/request";
import { DJANGO_URL } from "@/config";

export default async function updateProfile(fd: FormData) {
    return await patchForm(DJANGO_URL + "/accounts/api/me/change", fd);
}
