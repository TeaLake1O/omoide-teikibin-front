import PostContent from "@/app/_share/components/PostContent";
import { UserPost } from "@/app/_share/types/userPost";
import { serverFetch } from "@/app/servers/serverFetch";
import { DJANGO_URL } from "@/config";

export default async function Home() {
    const posts = await serverFetch<UserPost[]>({
        url: `${DJANGO_URL}/post/api/home`,
        tag: "homePost",
        cache: "no-cache",
    });
    return <PostContent url={`${DJANGO_URL}/post/api/home`} posts={posts} />;
}
