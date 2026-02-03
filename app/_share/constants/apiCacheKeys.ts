const HOME_POST_KEY = ["homePost"] as const;
const HOME_POST_KEY_INFINITE = ["homePostInfinite"] as const;
const POST_NOTIFY_KEY = ["postNotify"] as const;
const POST_NOTIFY_KEY_INFINITE = ["postNotifyInfinite"] as const;
const POST_NOTIFY_COUNT_KEY = ["postNotifyCount"] as const;
const FRIEND_NOTIFY_KEY = ["friendNotify"] as const;
const FRIEND_NOTIFY_KEY_INFINITE = ["friendNotifyInfinite"] as const;
const FRIEND_NOTIFY_COUNT_KEY = ["friendNotifyCount"] as const;
const Groups = ["Groups"] as const;

export const API_CACHE_KEYS = {
    homePost: () => HOME_POST_KEY,
    homePostInfinite: () => HOME_POST_KEY_INFINITE,

    userPagePost: (username: string) => ["userPagePost", username] as const,
    userPagePostInfinite: (username: string) =>
        ["userPagePostInfinite", username] as const,

    postNotify: () => POST_NOTIFY_KEY,
    postNotifyInfinite: () => POST_NOTIFY_KEY_INFINITE,
    postNotifyCount: () => POST_NOTIFY_COUNT_KEY,

    friendNotify: () => FRIEND_NOTIFY_KEY,
    friendNotifyInfinite: () => FRIEND_NOTIFY_KEY_INFINITE,
    friendNotifyCount: () => FRIEND_NOTIFY_COUNT_KEY,

    friendSearch: (queryText: string) => ["friendSearch", queryText] as const,

    message: (username: string) => ["message", username] as const,
    messageInfinite: (username: string) =>
        ["messageInfinite", username] as const,

    groupsData: () => Groups,
} as const;

export type ApiCacheKeys = ReturnType<
    (typeof API_CACHE_KEYS)[keyof typeof API_CACHE_KEYS]
>;
