"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Indicator, TabItem, UseTabIndicator } from "../types/TabIndicator";
import { NonEmptyArray } from "../types/util";

//かたジェネリクスをextendsできるらしい、RecordでそのままTを指定できないためstring系であることを明示する
export default function useTabIndicator<T extends string>({
    items,
}: {
    items: NonEmptyArray<TabItem<T>>;
}): UseTabIndicator<T> {
    const firstId = items[0].id;

    const [activeId, setActiveId] = useState<T>(firstId);
    const [indicator, setIndicator] = useState<Indicator>({
        left: 0,
        width: 0,
    });
    const [isCalcComplete, setIsCalcComplete] = useState(false);

    const wrapRef = useRef<HTMLDivElement | null>(null);
    const tabsRef = useRef<Record<string, HTMLButtonElement | null>>({});

    const setWrapRef = useCallback((el: HTMLDivElement | null) => {
        wrapRef.current = el;
    }, []);
    const setTabRef = useCallback(
        (id: T) => (el: HTMLButtonElement | null) => {
            tabsRef.current[id] = el;
        },
        []
    );

    const update = useCallback(() => {
        const wrap = wrapRef.current;
        const tab = tabsRef.current[activeId];

        if (!wrap || !tab) return;

        const w = wrap.getBoundingClientRect();
        const b = tab.getBoundingClientRect();
        setIndicator({ left: b.left - w.left, width: b.width });
        setIsCalcComplete(true);
    }, [activeId]);

    useLayoutEffect(() => {
        update();

        //画面幅変えたとき用
        const onResize = () => update();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [update]);

    return {
        activeId,
        setActiveId,
        indicator,
        isCalcComplete,
        update,
        wrapRef: setWrapRef,
        tabRef: setTabRef,
    };
}
