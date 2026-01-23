export const API_CACHE_KEYS = {
    homePost: () => ["homePost"] as const,
    userPagePost: (username: string) => ["userPagePost", username] as const,
    postNotify: () => ["postNotify"] as const,
} as const;

export type ApiCacheKeys = ReturnType<
    (typeof API_CACHE_KEYS)[keyof typeof API_CACHE_KEYS]
>;
