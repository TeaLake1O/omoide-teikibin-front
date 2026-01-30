import { serverFetch } from "@/app/servers/serverFetch";
import { DJANGO_URL } from "@/config";
import FriendShell from "./components/FriendShell";
import { FriendData, FriendRequestData } from "./types/friends";

export default async function Friend() {
    const data = await serverFetch<FriendData[]>({
        url: `${DJANGO_URL}/friend/api/message/`,
    });
    const requests = await serverFetch<FriendRequestData[]>({
        url: `${DJANGO_URL}/friend/api/requests/`,
    });
    return <FriendShell friendData={data} requestsData={requests} />;
}
