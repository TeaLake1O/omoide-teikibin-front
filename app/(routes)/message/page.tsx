import { serverFetch } from "@/app/servers/serverFetch";
import { DJANGO_URL } from "@/config";
import MessageListsShell from "./components/MessageListsShell";
import { MessageHeader } from "./types/messageHeader";

export default async function MessageLists() {
    const data = await serverFetch<MessageHeader[]>({
        url: `${DJANGO_URL}/friend/api/message/`,
    });

    return <MessageListsShell data={data} />;
}
