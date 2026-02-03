"use client";

import PhotoIcon from "@/app/_share/components/UI/Icon/PhotoIcon";
import SendIcon from "@/app/_share/components/UI/Icon/SendIcon";
import usePickImage from "@/app/_share/hooks/util/usePickImage";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import sendMessage from "./hooks/sendMessage";

export default function SendArea({
    sendUrl,
    id,
}: {
    sendUrl: string;
    id: number;
}) {
    const { url, file, fileOpen, imageReset, inputProps } = usePickImage();

    const [text, setText] = useState("");

    const qc = useQueryClient();

    const submit = async () => {
        if (!url && !text) return;

        const fd = new FormData();

        fd.append("friendship_id", String(id));
        if (file) fd.append("message_image", file);
        if (text) fd.append("message_text", text);

        imageReset();
        setText("");

        const res = await sendMessage({ url: sendUrl, data: fd });

        if (res.status === "success") {
            console.log("成功");
            qc.invalidateQueries();
        } else {
            console.log("error");
        }
    };

    return (
        <div
            className="w-full border border-orange-200 h-16 md:h-20 
            flex justify-center items-center"
        >
            <div className="w-[90%] h-[60%] border border-orange-300 rounded-full ml-2 p-2">
                <input
                    type="text"
                    className="ml-2 w-[80%] h-full flex items-center border-none  focus:outline-none focus:ring-0 focus:border-transparent
                        focus-visible:outline-none focus-visible:ring-0"
                    placeholder="メッセージを送信"
                    value={text}
                    onChange={(e) => setText(e.currentTarget.value)}
                />
            </div>
            <div className="min-w-0 h-full flex items-center justify-center gap-2 p-3">
                <button
                    type="button"
                    onClick={() => fileOpen()}
                    className="md:h-[70%] h-[80%] aspect-square rounded-full flex justify-center items-center 
                    hover:bg-black/10 active:bg-black/10 transition-colors duration-200"
                >
                    <PhotoIcon />
                </button>
                <button
                    onClick={() => submit()}
                    type="button"
                    className="md:h-[70%] h-[80%] aspect-square rounded-full flex justify-center items-center 
                    hover:bg-black/10 active:bg-black/10 transition-colors duration-200"
                >
                    <input {...inputProps} />
                    <SendIcon />
                </button>
            </div>
        </div>
    );
}
