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
    const data = await serverFetch<UserPageData>(
        `${DJANGO_URL}/accounts/api/mypage/${username}`,
        tag,
        "force-cache"
    );
    const serverRefresh = refreshServerFetch.bind(null, tag);

    return (
        <div className="h-full w-full flex flex-col min-h-0">
            <Profile data={data} serverRefresh={serverRefresh} />
        </div>
    );
}
