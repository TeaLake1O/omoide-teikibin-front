"use client";

import { DJANGO_URL } from "@/config";

export const POST_NOTIFY_URL = DJANGO_URL + "/notify/api/post";

export const FRIEND_NOTIFY_URL = DJANGO_URL + "/notify/api/friend";

export const LAYOUT_DATA_URL = `${DJANGO_URL}/accounts/api/layout`;

export const LOGIN_URL = `${DJANGO_URL}/accounts/login/`;
