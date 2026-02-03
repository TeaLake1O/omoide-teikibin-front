import { MessageUrl } from "@/app/_share/constants/apiUrls";
import { Page } from "@/app/_share/types/fetch";
import { serverFetch } from "@/app/servers/serverFetch";
import MessageShell from "./components/MessageShell";
import { MessageData } from "./types/messageData";

export default async function Message({
    params,
}: {
    params: Promise<{ otherUsername: string }>;
}) {
    const { otherUsername } = await params;

    const url = MessageUrl(otherUsername);

    const data = await serverFetch<Page<MessageData>>({
        url: url + "/?limit=10",
    });

    return (
        <MessageShell
            data={data.results}
            next={data.next}
            url={url}
            username={otherUsername}
        />
    );
}
