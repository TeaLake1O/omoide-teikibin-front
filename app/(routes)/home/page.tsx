import PostContent from "@/app/_share/components/PostContent";
import { API_CACHE_KEYS } from "@/app/_share/constants/apiCacheKeys";
import { UserPost } from "@/app/_share/types/userPost";
import { serverFetch } from "@/app/servers/serverFetch";
import { DJANGO_URL } from "@/config";

export default async function Home() {
    const url = `${DJANGO_URL}/post/api/home`;
    const posts = await serverFetch<UserPost[]>({
        url: url + "?limit=2",
        tag: "homePost",
        cache: "no-store",
    });
    return (
        <PostContent
            url={url}
            initialPosts={posts}
            apiKey={API_CACHE_KEYS.homePost()}
        />
    );
}
