"use client";

import createPost from "@/app/_share/api/createPost";
import CloseButton from "@/app/_share/components/UI/button/CloseButton";
import PhotoIcon from "@/app/_share/components/UI/Icon/PhotoIcon";
import SendIcon from "@/app/_share/components/UI/Icon/SendIcon";
import { API_CACHE_KEYS } from "@/app/_share/constants/apiCacheKeys";
import useHotKey from "@/app/_share/hooks/util/useHotKey";
import usePickImage from "@/app/_share/hooks/util/usePickImage";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

type Props = {
    id: number;
    onSendSuccess: () => void;
};

export default function SendArea(props: Props) {
    const { id, onSendSuccess } = props;

    const { url, file, fileOpen, imageReset, inputProps } = usePickImage();

    const [text, setText] = useState("");

    const [isInput, setIsInput] = useState(false);

    const qc = useQueryClient();

    const submit = async () => {
        if (!url && !text) return;
        const fd = new FormData();

        fd.append("group", String(id));
        if (file) fd.append("post_images", file);
        if (text) fd.append("post_content", text);

        imageReset();
        setText("");

        const res = await createPost(fd);

        if (res.status === "success") {
            console.log("成功");
            qc.invalidateQueries({
                queryKey: API_CACHE_KEYS.groupPosts(id),
            });
            qc.invalidateQueries({
                queryKey: API_CACHE_KEYS.groupPostsInfinite(id),
            });
            onSendSuccess();
        } else {
            console.log("error");
        }
    };
    useHotKey({ callback: submit, key: "Enter", enabled: isInput || !!file });

    return (
        <div
            className="w-full border border-orange-200 h-16 md:h-20 
            flex justify-center items-center"
        >
            <input {...inputProps} />
            <div className="w-[90%] h-[60%] border border-orange-300 flex rounded-full ml-2 p-2">
                <input
                    type="text"
                    className="ml-2 w-[85%] h-full flex items-center border-none  focus:outline-none focus:ring-0 focus:border-transparent
                        focus-visible:outline-none focus-visible:ring-0"
                    placeholder="メッセージを送信"
                    value={text}
                    onChange={(e) => setText(e.currentTarget.value)}
                    onFocus={() => setIsInput(true)}
                    onBlur={() => setIsInput(false)}
                />
                {url && (
                    <div className="flex h-full w-[15%] justify-center items-center">
                        <div className="h-full aspect-square relative">
                            <Image src={url} alt="メッセージ画像" fill></Image>
                            <CloseButton
                                color="bg-black"
                                noHover
                                className="opacity-0 hover:opacity-100 transition-opacity duration-200"
                                handleOnclick={() => imageReset()}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="min-w-0 h-full flex items-center justify-center gap-2 p-3">
                <button
                    type="button"
                    onClick={() => fileOpen()}
                    onMouseDown={(e) => e.preventDefault()}
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
                    <SendIcon />
                </button>
            </div>
        </div>
    );
}
