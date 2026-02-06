import { serverFetch } from "@/app/servers/serverFetch";
import { DJANGO_URL } from "@/config";
import GroupShell from "./components/GroupShell";
import { Groups } from "./types/Group";

export default async function Group() {
    const requests = await serverFetch<Groups[]>({
        url: `${DJANGO_URL}/post/api/group`,
        cache: "no-store",
    });
    return <GroupShell data={requests} />;
}
