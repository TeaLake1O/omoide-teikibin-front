"use client";
import { useEffect, useRef, useState } from "react";

//下スクロール検知でboolを返すトグル、limitはしきい値、jitterは無視するスクロール量
export default function useScrollToggle(limit = 80, jitter = 5) {
    const [isDown, setIsDown] = useState(false);

    const currentY = useRef(0);
    const down = useRef(0);
    const up = useRef(0);
    //rAFが連続で呼ばれるのを防ぐようのフラグ
    const ticking = useRef(false);

    useEffect(() => {
        currentY.current = window.scrollY;

        const onScroll = () => {
            if (ticking.current) return;

            ticking.current = true;

            requestAnimationFrame(() => {
                const y = window.scrollY;
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
            });
        };

        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [limit, jitter]);

    return isDown;
}
