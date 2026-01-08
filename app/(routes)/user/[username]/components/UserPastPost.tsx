import { UserPost } from "@/app/_share/types/userPost";
import { serverFetch } from "@/app/servers/serverFetch";
import { DJANGO_URL } from "@/config";

export default async function UserPastPost({ username }: { username: string }) {
    const limit = 20;
    const initialPost = await serverFetch<UserPost[]>(
        `${DJANGO_URL}/post/api/mypage/${username}?limit=${limit}`,
        `userposts:${username}`
    );
    return (
        <div className="mr-3 ml-3">
            {initialPost.map((i) => {
                return <PostContent post={i} key={i.post_id} />;
            })}
        </div>
    );
}

function PostContent({ post }: { post: UserPost }) {
    return (
        <div className="w-full border border-black">{post.post_content}</div>
    );
}
