"use client";
import getCookie from "@/app/_share/util/getCookie";
import { DJANGO_URL } from "@/config";
import { ActionName } from "../components/AccountInfo";

export default async function submit(buttonName: ActionName) {
    const csrf = getCookie("csrftoken");
    const fd = new FormData();
    if (csrf) fd.append("csrfmiddlewaretoken", csrf);
    fd.append(buttonName, "1");

    return await fetch(DJANGO_URL + "/accounts/api/passwordcheck/", {
        method: "POST",
        credentials: "include",
        body: fd,
    });
}
