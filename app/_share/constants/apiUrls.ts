"use client";

import { DJANGO_URL } from "@/config";

export const POST_NOTIFY_URL = DJANGO_URL + "/notify/api/post";
export const POST_NOTIFY_COUNT_URL = DJANGO_URL + "/notify/api/post/count";
export const FRIEND_NOTIFY_COUNT_URL = DJANGO_URL + "/notify/api/friend/count";

export const FRIEND_NOTIFY_URL = DJANGO_URL + "/notify/api/friend";

export const LAYOUT_DATA_URL = `${DJANGO_URL}/accounts/api/layout`;

export const LOGIN_URL = `${DJANGO_URL}/accounts/login/`;

export const FRIEND_LISTS_URL = `${DJANGO_URL}/friend/api/message/`;
