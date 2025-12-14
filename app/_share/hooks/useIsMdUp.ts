"use client";
import { useEffect, useState } from "react";

export function useIsMdUp() {
    const [isMdUp, setIsMdUp] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)");

        const update = () => setIsMdUp(mq.matches);
        update();

        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    return isMdUp;
}
