"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Indicator, TabItem, UseTabIndicator } from "../../types/TabIndicator";
import { NonEmptyArray } from "../../types/util";
import useTimeout from "./useTimeout";

//かたジェネリクスをextendsできるらしい、RecordでそのままTを指定できないためstring系であることを明示する
export default function useTabIndicator<T extends string>({
    items,
}: {
    items: NonEmptyArray<TabItem<T>>;
}): UseTabIndicator<T> {
    const firstId = items[0].id;

    const [activeId, setActiveId] = useState<T>(firstId);
    const [activeIndicator, setActiveIndicator] = useState<Indicator>({
        left: 0,
        width: 0,
    });

    const [hoverId, setHoverId] = useState<T | null>(null);
    const [hoverIndicator, setHoverIndicator] = useState<Indicator | null>(
        null
    );

    const { schedule, clear } = useTimeout();

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

    const updateActive = useCallback(() => {
        const wrap = wrapRef.current;
        const tab = tabsRef.current[activeId];

        if (!wrap || !tab) return;

        const w = wrap.getBoundingClientRect();
        const b = tab.getBoundingClientRect();
        setActiveIndicator({ left: b.left - w.left, width: b.width });
        setIsCalcComplete(true);
    }, [activeId]);

    const updateHover = useCallback(() => {
        if (!hoverId) return;
        const wrap = wrapRef.current;
        const tab = tabsRef.current[hoverId];

        if (!wrap || !tab) return;

        const w = wrap.getBoundingClientRect();
        const b = tab.getBoundingClientRect();
        setHoverIndicator({ left: b.left - w.left, width: b.width });
    }, [hoverId]);

    const clearHover = () => {
        setHoverId(null);
        schedule(() => {
            setHoverIndicator(null);
        }, 200);
    };

    const setHover = (id: T | null) => {
        clear();
        if (id === null) {
            setHoverId(null);
            return;
        }
        setHoverId(id);
    };

    useLayoutEffect(() => {
        updateActive();

        //画面幅変えたとき用
        const onResize = () => {
            updateActive();
            updateHover();
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [updateActive, updateHover]);

    useLayoutEffect(() => {
        updateHover();
    }, [updateHover]);

    return {
        activeId,
        setActiveId,
        hoverId,
        activeIndicator,
        clearHover,
        hoverIndicator,
        setHover,
        isCalcComplete,
        updateActive,
        updateHover,

        wrapRef: setWrapRef,
        tabRef: setTabRef,
    };
}
