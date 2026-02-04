import { serverFetch } from "@/app/servers/serverFetch";
import { DJANGO_URL } from "@/config";
import FriendShell from "./components/FriendShell";
import { FriendData, FriendRequestData } from "./types/friends";

export default async function Friend() {
    const requestsData = await serverFetch<FriendRequestData[]>({
        url: `${DJANGO_URL}/friend/api/requests/`,
    });
    const FriendListData = await serverFetch<FriendData[]>({
        url: `${DJANGO_URL}/friend/api`,
    });
    return (
        <FriendShell
            requestsData={requestsData}
            friendListData={FriendListData}
        />
    );
}
