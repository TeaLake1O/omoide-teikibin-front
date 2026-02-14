"use client";

import { useEffect, useRef, useState } from "react";

export default function usePickImage(initialUrl?: string, isCapture?: boolean) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [url, setUrl] = useState(initialUrl);
    const [filename, setFilename] = useState("");
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (!url || !url.startsWith("blob:")) return;
        return () => URL.revokeObjectURL(url);
    }, [url]);

    const fileOpen = () => {
        const el = inputRef.current;
        if (!el) return;
        el.value = "";
        el.click();
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        if (!f.type.startsWith("image/")) return;

        setFile(f);
        setFilename(f.name);
        setUrl(URL.createObjectURL(f));
    };

    const inputProps = {
        ref: inputRef,
        type: "file" as const,
        accept: "image/*",
        onChange,
        style: { display: "none" } as const,
        capture: isCapture,
    };

    const imageReset = () => {
        setUrl(initialUrl ? initialUrl : "");
        setFile(null);
    };

    return { url, filename, file, fileOpen, inputProps, imageReset };
}
