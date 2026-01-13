import PostContent from "@/app/_share/components/PostContent";
import { UserPost } from "@/app/_share/types/userPost";
import { refreshServerFetch } from "@/app/servers/action";
import { serverFetch } from "@/app/servers/serverFetch";
import { DJANGO_URL } from "@/config";
import Profile from "./components/Profile";
import { UserPageData } from "./types/userPageData";

export default async function UserPage({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const { username } = await params;
    const tag = `user:${username}`;
    const data = await serverFetch<UserPageData>({
        url: `${DJANGO_URL}/accounts/api/mypage/${username}`,
        tag: tag,
        cache: "force-cache",
    });
    const serverRefresh = refreshServerFetch.bind(null, tag);

    const limit = 20;
    const userPageURL = `${DJANGO_URL}/post/api/mypage/${username}?limit=${limit}`;
    const initialPost = await serverFetch<UserPost[]>({
        url: userPageURL,
        tag: tag,
        cache: "force-cache",
    });

    return (
        <div className="flex flex-col">
            <Profile data={data} serverRefresh={serverRefresh} />
            <PostContent url={userPageURL} posts={initialPost} />
        </div>
    );
}
