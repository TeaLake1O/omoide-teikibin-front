"use client";
import { useEffect, useRef, useState } from "react";
import { useIsMdUp } from "../util/useIsMdUp";

type Props = {
    limit?: number;
    jitter?: number;
    targetRef: HTMLElement | null;
};

//下スクロール検知でboolを返すトグル、limitはしきい値、jitterは無視するスクロール量
export default function useScrollToggle(props: Props) {
    const isMdUp = useIsMdUp();

    const { limit = 40, jitter = 5 } = props;

    const [isDown, setIsDown] = useState(false);

    const currentY = useRef(0);
    const down = useRef(0);
    const up = useRef(0);
    //rAFが連続で呼ばれるのを防ぐようのフラグ
    const ticking = useRef(false);

    useEffect(() => {
        if (isMdUp || props.targetRef === null) return;

        const el = props.targetRef;

        if (!el) return;

        currentY.current = el.scrollTop;

        const onScroll = () => {
            if (ticking.current) return;

            ticking.current = true;

            requestAnimationFrame(() => {
                const y = el.scrollTop;
                const diff = y - currentY.current;

                if (diff > jitter) {
                    down.current += diff;
                    up.current = 0;
                } else if (diff < -jitter) {
                    up.current += -diff;
                    down.current = 0;
                }

                if (down.current > limit) {
                    setIsDown(true);
                    up.current = 0;
                } else if (up.current > limit) {
                    setIsDown(false);
                    down.current = 0;
                }
                currentY.current = y;
                ticking.current = false;
            });
        };

        el.addEventListener("scroll", onScroll);

        return () => {
            el.removeEventListener("scroll", onScroll);
        };
    }, [limit, jitter, props.targetRef, isMdUp]);

    return isMdUp ? false : isDown;
}
