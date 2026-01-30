import PostContent from "@/app/_share/components/domain/PostContent";
import { API_CACHE_KEYS } from "@/app/_share/constants/apiCacheKeys";
import {
    USER_PAGE_URL,
    USER_PROFILE_URL,
} from "@/app/_share/constants/apiUrls";
import { Page } from "@/app/_share/types/fetch";
import { UserPost } from "@/app/_share/types/userPost";
import { refreshServerFetch } from "@/app/servers/action";
import { serverFetch } from "@/app/servers/serverFetch";
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
        url: USER_PROFILE_URL(username),
        tag: tag,
        cache: "no-store",
    });
    const serverRefresh = refreshServerFetch.bind(null, tag);

    const initialPost = await serverFetch<Page<UserPost>>({
        url: USER_PAGE_URL(username) + "?limit=4",
        tag: tag,
        cache: "no-store",
    });

    return (
        <div className="flex flex-col">
            <Profile data={data} serverRefresh={serverRefresh} />
            <PostContent
                url={USER_PAGE_URL(username)}
                initialPosts={initialPost.results}
                apiKey={API_CACHE_KEYS.userPagePost(username)}
                apiKeyInfinite={API_CACHE_KEYS.userPagePostInfinite(username)}
                nextUrl={initialPost.next}
            />
        </div>
    );
}
