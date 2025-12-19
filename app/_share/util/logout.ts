import { DJANGO_URL } from "@/config";
import getCookie from "./getCookie";

export default async function logout() {
    const csrfToken = getCookie("csrftoken");

    const res = await fetch(`${DJANGO_URL}/accounts/api/logout`, {
        method: "POST",
        credentials: "include",
        headers: csrfToken ? { "X-CSRFToken": csrfToken } : {},
    });

    if (!res.ok) throw new Error("POST failed");
}
