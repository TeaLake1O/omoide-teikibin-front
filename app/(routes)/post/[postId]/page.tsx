import { UserPost } from "@/app/_share/types/userPost";
import { serverFetch } from "@/app/servers/serverFetch";
import { DJANGO_URL } from "@/config";
import PostShell from "./components/PostShell";

export default async function Post({
    params,
}: {
    params: Promise<{ postId: string }>;
}) {
    const postId = (await params).postId;
    const url = `${DJANGO_URL}/post/api/detail/${postId}`;

    const data = await serverFetch<UserPost>({
        url: url,
    });
    return <PostShell data={data} url={url} />;
}
