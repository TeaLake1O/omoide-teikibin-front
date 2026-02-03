import { DJANGO_URL } from "@/config";

export const POST_NOTIFY_URL = DJANGO_URL + "/notify/api/post";
export const POST_NOTIFY_COUNT_URL = DJANGO_URL + "/notify/api/post/count";
export const FRIEND_NOTIFY_COUNT_URL = DJANGO_URL + "/notify/api/friend/count";

export const USER_PAGE_URL = (username: string) =>
    `${DJANGO_URL}/post/api/mypage/${username}/post`;

export const FRIEND_NOTIFY_URL = DJANGO_URL + "/notify/api/friend";

export const LAYOUT_DATA_URL = `${DJANGO_URL}/accounts/api/layout`;

export const LOGIN_URL = `${DJANGO_URL}/accounts/login/`;

export const FRIEND_LISTS_URL = `${DJANGO_URL}/friend/api/message/`;
export const FRIEND_SEARCH = `${DJANGO_URL}/friend/api/search`;

export const USER_PROFILE_URL = (username: string) =>
    `${DJANGO_URL}/accounts/api/mypage/${username}`;

export const HOME_POST_URL = `${DJANGO_URL}/post/api/home`;

export const MessageUrl = (username: string) =>
    `${DJANGO_URL}/friend/api/message/${username}`;
export const GroupUrl = (groupId: number) =>
    `${DJANGO_URL}/post/api/group/${groupId}`;
