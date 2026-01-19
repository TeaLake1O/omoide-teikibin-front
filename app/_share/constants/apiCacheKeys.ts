export const API_CACHE_KEYS = {
    homePost: "homePost",
    userPagePost: "userPagePost",
} as const;

export type ApiCacheKeys = keyof typeof API_CACHE_KEYS;
