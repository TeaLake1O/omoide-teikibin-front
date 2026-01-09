import { UserPost } from "@/app/_share/types/userPost";
import { serverFetch } from "@/app/servers/serverFetch";
import { DJANGO_URL } from "@/config";
import PostContent from "../../../../_share/components/PostContent";

export default async function UserPastPost({ username }: { username: string }) {
    const limit = 20;
    const initialPost = await serverFetch<UserPost[]>(
        `${DJANGO_URL}/post/api/mypage/${username}?limit=${limit}`,
        `userposts:${username}`
    );
    if (initialPost.length === 0) {
        return (
            <div>
                <span className="text-amber-800 p-3">まだ投稿がありません</span>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col items-center justify-center">
                {initialPost.map((post, index) => {
                    const isFirst = index === 0;
                    const isLast = index === initialPost.length - 1;
                    return (
                        <PostContent
                            post={post}
                            key={post.post_id}
                            isFirst={isFirst}
                            isLast={isLast}
                        />
                    );
                })}
            </div>
        );
    }
}
