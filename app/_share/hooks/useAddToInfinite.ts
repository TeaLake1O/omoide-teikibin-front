"use client";

import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { ApiCacheKeys } from "../constants/apiCacheKeys";

export default function useAddToInfinite<T>(args: {
    apiKey: ApiCacheKeys;
    latest: T[] | null;
    getId: (item: T) => string;
}) {
    const { apiKey, latest, getId } = args;
    const getIdRef = useRef(getId);
    useEffect(() => {
        getIdRef.current = getId;
    }, [getId]);
    const qc = useQueryClient();
    useEffect(() => {
        const newPosts = latest;
        if (!newPosts || newPosts.length === 0) return;

        qc.setQueryData<InfiniteData<T[]>>(apiKey, (old) => {
            if (!old) return old;
            const id = getIdRef.current;

            const exist = new Set(old.pages.flat().map(id));
            const add = newPosts.filter((p) => !exist.has(id(p)));
            if (add.length === 0) return old;
            const first = old.pages[0] ?? [];
            //oldを展開した後、pagesで新しいデータを使い上書きしている
            return {
                ...old,
                pages: [[...add, ...first], ...old.pages.slice(1)],
            };
        });
    }, [apiKey, qc, latest]);
}
