import UserIconImage from "@/app/_share/components/UserIconImage";
import { UserPost } from "@/app/_share/types/userPost";
import { serverFetch } from "@/app/servers/serverFetch";
import { DJANGO_URL } from "@/config";
import Image from "next/image";

export default async function UserPastPost({ username }: { username: string }) {
    const limit = 20;
    const initialPost = await serverFetch<UserPost[]>(
        `${DJANGO_URL}/post/api/mypage/${username}?limit=${limit}`,
        `userposts:${username}`
    );
    if (initialPost === ([] as UserPost[])) {
        return (
            <div>
                <span>まだ投稿がありません</span>
            </div>
        );
    } else {
        return (
            <div className="mr-3 ml-3">
                {initialPost.map((i) => {
                    return <PostContent post={i} key={i.post_id} />;
                })}
            </div>
        );
    }
}

function PostContent({ post }: { post: UserPost }) {
    return (
        <div className="w-full border border-black flex flex-col">
            <div className="flex flex-row">
                <div className="w-12 aspect-square">
                    <UserIconImage iconUrl={post.post_user.icon_url} />
                </div>
                <span>{post.post_user.nickname ?? "名無し"}</span>
                <span>{post.created_at}</span>
            </div>
            <span>{post.post_content}</span>
            {post.post_images && (
                <Image src={post.post_images} alt="投稿画像"></Image>
            )}
        </div>
    );
}
