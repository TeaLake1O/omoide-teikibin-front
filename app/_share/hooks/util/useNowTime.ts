"use client";

import { useEffect, useState } from "react";

export default function useNowTime(interValMs: number = 60_000) {
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        const id = window.setInterval(() => setNow(Date.now()), interValMs);
        return () => window.clearInterval(id);
    }, [interValMs]);
    return now;
}
