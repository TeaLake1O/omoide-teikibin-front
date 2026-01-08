import { putJson } from "@/app/_share/api/request";
import { FetchResult } from "@/app/_share/types/fetch";
import { FriendRequestResponse } from "@/app/_share/types/status";
import { DJANGO_URL } from "@/config";

export default async function friendRequest(
    isPositive: boolean,
    username: string
): Promise<FetchResult<FriendRequestResponse>> {
    return await putJson(DJANGO_URL + "/friend/api/requests/" + username, {
        is_positive: isPositive,
    });
}
