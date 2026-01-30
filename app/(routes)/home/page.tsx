import PostContent from "@/app/_share/components/domain/PostContent";
import { API_CACHE_KEYS } from "@/app/_share/constants/apiCacheKeys";
import { Page } from "@/app/_share/types/fetch";
import { UserPost } from "@/app/_share/types/userPost";
import { serverFetch } from "@/app/servers/serverFetch";
import { DJANGO_URL } from "@/config";

export default async function Home() {
    const url = `${DJANGO_URL}/post/api/home`;
    const posts = await serverFetch<Page<UserPost>>({
        url: url + "?limit=4",
        tag: "homePost",
        cache: "no-store",
    });
    return (
        <PostContent
            url={url}
            initialPosts={posts.results}
            apiKey={API_CACHE_KEYS.homePost()}
            apiKeyInfinite={API_CACHE_KEYS.homePostInfinite()}
            nextUrl={posts.next}
        />
    );
}
