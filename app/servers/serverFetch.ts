import { cookies } from "next/headers";
import "server-only";

export async function serverFetch(url: string) {
    const cookie = await cookies();
    const cookieHeader = cookie.toString();
    const res = await fetch(url, {
        headers: { cookie: cookieHeader },
        cache: "no-store",
    });
    return res.json();
}
