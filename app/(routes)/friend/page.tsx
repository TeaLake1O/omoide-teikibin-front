import { serverFetch } from "@/app/servers/serverFetch";
import { DJANGO_URL } from "@/config";
import FriendShell from "./components/FriendShell";
import { FriendRequestData } from "./types/friends";

export default async function Friend() {
    const requests = await serverFetch<FriendRequestData[]>({
        url: `${DJANGO_URL}/friend/api/requests/`,
    });
    return <FriendShell requestsData={requests} />;
}
