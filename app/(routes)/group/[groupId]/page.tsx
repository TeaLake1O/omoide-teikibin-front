import { GroupUrl } from "@/app/_share/constants/apiUrls";
import { UserPost } from "@/app/_share/types/userPost";
import { serverFetch } from "@/app/servers/serverFetch";
import GroupMessageShell from "./components/GroupMessageShell";
import { GroupMessageData } from "./types/GroupMessage";

export default async function Message({
    params,
}: {
    params: Promise<{ groupId: number }>;
}) {
    const { groupId } = await params;
    const url = GroupUrl(groupId);

    const detail = await serverFetch<GroupMessageData>({
        url,
    });
    const data = await serverFetch<UserPost[]>({
        url: url + "/posts",
    });

    return <GroupMessageShell data={data} next={"a"} detail={detail} />;
}
