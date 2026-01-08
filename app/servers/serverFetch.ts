import { LOGIN_URL } from "@/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "server-only";

export async function serverFetch<T>(
    url: string,
    tag: string,
    cache?: RequestCache
): Promise<T> {
    const cookie = await cookies();
    const cookieHeader = cookie.toString();
    const res = await fetch(url, {
        headers: { cookie: cookieHeader },
        cache: cache ? cache : "force-cache",
        next: { tags: [tag], revalidate: false },
    });
    if (res.status === 404) {
        redirect("/not-found");
    } else if (res.status === 401 || res.status === 403) {
        redirect(LOGIN_URL);
    }
    console.log("serverFetch");
    return res.json();
}
