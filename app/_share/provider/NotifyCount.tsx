import React, { createContext, useContext } from "react";
import { API_CACHE_KEYS } from "../constants/apiCacheKeys";
import {
    FRIEND_NOTIFY_COUNT_URL,
    POST_NOTIFY_COUNT_URL,
} from "../constants/apiUrls";
import useQueryData from "../hooks/query/useQueryData";

type NotifyCount = {
    friendCount: number;
    postCount: number;
};
type CountResult = {
    count: number;
};

const NotifyCountContext = createContext<NotifyCount | null>(null);

export function useNotifyCount() {
    const ctx = useContext(NotifyCountContext);
    if (!ctx) throw new Error("Error");
    return ctx;
}

export function NotifyCountProvider({
    children,
    enabled,
}: {
    children: React.ReactNode;
    enabled: boolean;
}) {
    const fqk = API_CACHE_KEYS.friendNotifyCount();
    const pqk = API_CACHE_KEYS.postNotifyCount();

    const friendCount =
        useQueryData<CountResult>({
            url: FRIEND_NOTIFY_COUNT_URL,
            enabled,
            queryKey: fqk,
        }).data?.count ?? 0;

    const postCount =
        useQueryData<CountResult>({
            url: POST_NOTIFY_COUNT_URL,
            enabled,
            queryKey: pqk,
        }).data?.count ?? 0;

    return (
        <NotifyCountContext.Provider value={{ friendCount, postCount }}>
            {children}
        </NotifyCountContext.Provider>
    );
}
