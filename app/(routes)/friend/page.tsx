import { serverFetch } from "@/app/servers/serverFetch";
import { DJANGO_URL } from "@/config";
import FriendShell from "./components/FriendShell";
import { FriendData } from "./types/friends";

export default async function Friend() {
    const data = await serverFetch<FriendData[]>({
        url: `${DJANGO_URL}/friend/api/message/`,
    });
    return <FriendShell data={data} />;
}
