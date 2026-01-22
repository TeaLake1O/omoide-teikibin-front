"use client";

import useGroupsData from "@/hooks/useGroupsData";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import createPost from "../_share/api/createPost";
import usePickImage from "../_share/hooks/usePickImage";
import { usePostModal } from "../_share/provider/PostModal";
import { useToast } from "../_share/provider/Toast";
import CloseButton from "../_share/UI/CloseButton";
import GenericButton from "../_share/UI/GenericButton";

export default function PostModal() {
    const { isOpenPostModal, closePostModal } = usePostModal();
    const res = useGroupsData(isOpenPostModal);
    const { url, inputProps, file, imageReset } = usePickImage();
    const { showToast } = useToast();

    const [PostText, setPostText] = useState("");
    const [PostGroup, setPostGroup] = useState("");

    const qc = useQueryClient();

    const isPosted = useRef(false);

    const submit = async () => {
        if (isPosted.current) return;

        if (!PostGroup) return showToast("グループを選択してください");
        if (!file) return showToast("画像が選択されていません");
        isPosted.current = true;

        showToast("投稿中...");
        closePostModal();

        const fd = new FormData();

        fd.append("group", PostGroup);
        fd.append("post_images", file);
        if (PostText) fd.append("post_content", PostText);

        const res = await createPost(fd);

        qc.invalidateQueries();

        showToast(
            res.status === "success" ? "投稿しました" : "エラーが発生しました",
            "text-black"
        );
        reset();
    };

    const reset = () => {
        imageReset();
        setPostGroup("");
        setPostText("");
        isPosted.current = false;
    };
    return (
        <>
            {isOpenPostModal &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[9990] bg-black/60 flex justify-center items-center"
                        onClick={closePostModal}
                    >
                        <form
                            className="md:h-full md:max-w-[40%] pl-10 pr-10 overflow-y-auto no-scrollbar
                                bg-orange-100 flex flex-col items-center gap-3 pb-3 rounded-md relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-full h-12 flex justify-between items-center mt-5 absolute">
                                <div className="w-24">
                                    <div className="relative h-10 aspect-square ml-1">
                                        <CloseButton
                                            handleOnclick={closePostModal}
                                            color="bg-black"
                                        />
                                    </div>
                                </div>
                                <h2 className=" text-amber-800 font-bold text-2xl lg:text-3xl">
                                    投稿
                                </h2>
                                <div className="w-24 h-full flex justify-center items-center">
                                    <GenericButton
                                        name="投稿"
                                        height="h-8"
                                        width="w-16"
                                        textSize="text-base"
                                        handleOnclick={submit}
                                    />
                                </div>
                            </div>

                            <div className="w-full flex flex-col mt-20">
                                <h3 className="text-sm">グループ</h3>
                                {res.isError && (
                                    <div>Failed to load groups.</div>
                                )}
                                {!res.isLoading && !res.isError && res.data && (
                                    <select
                                        name="groups"
                                        id="groups"
                                        className="bg-white rounded-md w-full h-10 border border-gray-300 
                                        focus:outline-none focus:ring-1 "
                                        onChange={(e) =>
                                            setPostGroup(e.currentTarget.value)
                                        }
                                        value={PostGroup}
                                    >
                                        <option value="" className="">
                                            グループを選択
                                        </option>
                                        {res.data.map((group) => (
                                            <option
                                                key={group.id}
                                                value={group.id}
                                            >
                                                {group.group_name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            <div className="flex flex-col items-center justify-center w-full">
                                <span className="w-full">画像を選択</span>
                                <label
                                    className="flex items-center justify-center group w-full
                                    aspect-video bg-gray-300 relative overflow-hidden"
                                >
                                    <input {...inputProps} />
                                    <Image
                                        src="/svg/imageIcon.svg"
                                        alt="イメージ"
                                        width={60}
                                        height={60}
                                        className="w-[10%] z-50"
                                    />
                                    {url && (
                                        <Image
                                            src={url}
                                            alt="投稿画像"
                                            fill
                                            className="z-45 object-contain"
                                        />
                                    )}
                                    <div
                                        className="absolute inset-0 bg-black/0 transition duration-100
                                    group-active:bg-black/20 group-hover:bg-black/20 z-46"
                                    />
                                </label>
                            </div>
                            <label className="bg-white w-full">
                                <div className="flex justify-between p-3 pb-0">
                                    <span className="text-sm text-gray-400">
                                        投稿文
                                    </span>
                                    <span className="text-gray-400 text-sm">
                                        {PostText.length}文字
                                    </span>
                                </div>
                                <textarea
                                    className="pl-2 pr-2 focus:outline-none mt-2 w-full overflow-y-auto resize-none min-h-24"
                                    onChange={(e) =>
                                        setPostText(e.currentTarget.value)
                                    }
                                    value={PostText}
                                ></textarea>
                            </label>
                        </form>
                    </div>,
                    document.getElementById("modal-root")!
                )}
        </>
    );
}
