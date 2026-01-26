const HOME_POST_KEY = ["homePost"] as const;
const POST_NOTIFY_KEY = ["postNotify"] as const;
const FRIEND_NOTIFY_KEY = ["friendNotify"] as const;

export const API_CACHE_KEYS = {
    homePost: () => HOME_POST_KEY,
    userPagePost: (username: string) => ["userPagePost", username] as const,
    postNotify: () => POST_NOTIFY_KEY,
    friendNotify: () => FRIEND_NOTIFY_KEY,
} as const;

export type ApiCacheKeys = ReturnType<
    (typeof API_CACHE_KEYS)[keyof typeof API_CACHE_KEYS]
>;
