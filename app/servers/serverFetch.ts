import { LOGIN_URL } from "@/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "server-only";

type Props = {
    url: string;
    tag?: string;
    cache?: RequestCache;
};

export async function serverFetch<T>(props: Props): Promise<T> {
    const { url, cache, tag } = props;
    const cookie = await cookies();
    const cookieHeader = cookie.toString();
    const res = await fetch(url, {
        headers: { cookie: cookieHeader },
        cache: cache ? cache : "no-store",

        ...(tag ? { next: { tags: [tag], revalidate: false as const } } : {}),
    });

    if (res.status === 404) {
        redirect("/not-found");
    } else if (res.status === 401 || res.status === 403) {
        redirect(LOGIN_URL);
    }
    console.log("serverFetch");
    return res.json();
}
