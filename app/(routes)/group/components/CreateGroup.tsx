"use client";

import CloseButton from "@/app/_share/components/UI/button/CloseButton";
import GenericButton from "@/app/_share/components/UI/button/GenericButton";
import CheckIcon from "@/app/_share/components/UI/Icon/CheckIcon";
import CloseIcon from "@/app/_share/components/UI/Icon/CloseIcon";
import PhotoIcon from "@/app/_share/components/UI/Icon/PhotoIcon";
import UserIconImage from "@/app/_share/components/UserIconImage";
import { API_CACHE_KEYS } from "@/app/_share/constants/apiCacheKeys";
import { InviteFriendUrl } from "@/app/_share/constants/apiUrls";
import useQueryData from "@/app/_share/hooks/query/useQueryData";
import usePickImage from "@/app/_share/hooks/util/usePickImage";
import { useToast } from "@/app/_share/provider/Toast";
import { UserInf } from "@/app/_share/types/userInf";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { InviteFriend } from "../types/Group";
import createGroup from "./hooks/createGroup";

export default function CreateGroup() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-20 h-full flex justify-center items-center">
            <GenericButton
                handleOnclick={() => setIsOpen(true)}
                name="作成"
                height={"h-7"}
                textSize={"text-sm"}
            />

            <ModalWindow isOpen={isOpen} close={() => setIsOpen(false)} />
        </div>
    );
}

function ModalWindow({
    isOpen,
    close,
}: {
    isOpen: boolean;
    close: () => void;
}) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const [text, setText] = useState("");
    const { url, fileOpen, inputProps, file, imageReset } = usePickImage();

    const toggle = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        );
    };

    const inviteFriend = useQueryData<InviteFriend[]>({
        url: InviteFriendUrl,
        enabled: true,
        queryKey: API_CACHE_KEYS.inviteFriend(),
    });
    const result = inviteFriend.data
        ? [...inviteFriend.data].sort(
              (a, b) => Date.parse(b.friend_date) - Date.parse(a.friend_date),
          )
        : null;

    const reset = () => {
        setSelectedIds([]);
        setText("");
        imageReset();
    };
    const { showToast } = useToast();

    const router = useRouter();

    const submit = async () => {
        if (!text) {
            showToast("グループ名を入力してください");
            return;
        }
        showToast("作成中...");
        const fd = new FormData();
        fd.append("group_name", text);
        if (selectedIds.length !== 0)
            selectedIds.forEach((item) => {
                fd.append("send_ids", String(item));
            });

        if (file) fd.append("group_image", file);

        const res = await createGroup(fd);
        if (res.status === "success") {
            router.refresh();
        }

        close();
        reset();
        showToast(
            res.status === "success"
                ? "グループを作成しました。"
                : "エラーが発生しました",
            "text-black",
        );
    };

    if (inviteFriend.isError || inviteFriend.isLoading) return null;

    return (
        <>
            {isOpen &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[9990] bg-black/60 flex justify-center items-center"
                        onClick={() => {
                            close();
                            reset();
                        }}
                    >
                        <form
                            className="md:h-[90%] md:w-[40%] h-full w-full flex flex-col items-center bg-orange-100 rounded-md p-3"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-full flex justify-between">
                                <div className="w-24">
                                    <div className="relative h-10 aspect-square ml-1">
                                        <CloseButton
                                            handleOnclick={() => {
                                                close();
                                                reset();
                                            }}
                                            color="bg-black"
                                        />
                                    </div>
                                </div>
                                <h2 className="text-lg text-amber-800">
                                    グループを作成
                                </h2>
                                <div className="w-24" />
                            </div>
                            <h2 className="text-center text-sm mt-4 mb-3 text-amber-800">
                                アイコンをクリックで画像を選択
                            </h2>
                            <button
                                className="h-14 w-14 aspect-square rounded-full bg-gray-300"
                                onClick={() => fileOpen()}
                                type="button"
                            >
                                {!url || !file ? (
                                    <div
                                        className="h-full w-full aspect-square rounded-full 
                                    flex justify-center items-center bg-gray-300 transition-colors duration-200 
                                    hover:bg-black/20 active:bg-black/20"
                                    >
                                        <div className="w-[50%] flex justify-center items-center">
                                            <PhotoIcon isBlack />
                                        </div>
                                    </div>
                                ) : (
                                    <UserIconImage iconUrl={url} isOverlay />
                                )}
                            </button>
                            <input {...inputProps} />
                            <h2 className="mt-5 text-sm text-amber-800">
                                グループ名を入力
                            </h2>
                            <label className="w-[80%] mt-5 border border-amber-800 rounded-md bg-white p-1 block select-none">
                                <span className="text-[12px] text-gray-400">
                                    グループ名
                                </span>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setText(e.currentTarget.value)
                                    }
                                    className="focus:outline-none w-full"
                                    name="nickname"
                                />
                            </label>

                            <h3 className="text-center mt-3 text-sm text-amber-800">
                                追加するフレンド
                            </h3>
                            <div className="w-[80%] h-[30%] flex justify-center items-center">
                                <FriendListView
                                    result={result}
                                    selectedIds={selectedIds}
                                    toggle={toggle}
                                />
                            </div>

                            <div className="w-full mr-5 ml-5 flex justify-between items-center mt-auto">
                                <GenericButton
                                    handleOnclick={() => {
                                        close();
                                        reset();
                                    }}
                                    name="キャンセル"
                                    textSize="text-sm"
                                    height="h-6"
                                    type="button"
                                />
                                <GenericButton
                                    handleOnclick={submit}
                                    name="作成"
                                    textSize="text-sm"
                                    height="h-6"
                                    type="button"
                                />
                            </div>
                        </form>
                    </div>,
                    document.getElementById("modal-root")!,
                )}
        </>
    );
}

function FriendListView({
    result,
    selectedIds,
    toggle,
}: {
    result: InviteFriend[] | null;
    selectedIds: number[];
    toggle: (id: number) => void;
}) {
    return (
        <div className="w-[90%] h-full flex flex-col overflow-y-scroll scrollbar-slim border border-orange-300 bg-white">
            {result && result.length > 0 ? (
                result.map((item) => {
                    const user = item.other;
                    const checked = selectedIds.includes(user.id);

                    return (
                        <div key={item.friend_id} className="w-full flex">
                            <button
                                type="button"
                                onClick={() => toggle(user.id)}
                                className="w-full md:h-10 h-16  flex"
                            >
                                <UserView user={user} checked={checked}>
                                    <div className="w-12 aspect-square flex justify-center items-center">
                                        {checked ? (
                                            <div className="h-6 w-6">
                                                <CheckIcon />
                                            </div>
                                        ) : (
                                            <div className="h-6 w-6">
                                                <CloseIcon />
                                            </div>
                                        )}
                                    </div>
                                </UserView>
                            </button>
                        </div>
                    );
                })
            ) : (
                <span>追加できるフレンドがいません</span>
            )}
        </div>
    );
}

function UserView({
    user,
    checked,
    children,
}: {
    user: UserInf;
    checked: boolean;
    children: React.ReactNode;
}) {
    const name = user.nickname ?? "名無し";
    return (
        <div
            className={`w-full h-full hover:bg-gray-300 active:bg-gray-300
            border flex flex-col justify-center border-gray-300 ${
                checked ? "bg-gray-200" : "bg-white "
            }`}
        >
            <div className="flex mr-5 ml-5 justify-between items-center">
                <div className="flex flex-row items-center justify-center gap-4">
                    <div className="w-7 aspect-square rounded-full">
                        <UserIconImage iconUrl={user.icon_url} />
                    </div>
                    <span className="text-lg truncate">{name}</span>
                </div>
                <span className="text-sm text-amber-800 truncate">
                    @{user.username}
                </span>
                {children}
            </div>
            <div className="w-full min-h-0 text-gray-500 flex justify-between gap-5 md:mb-1"></div>
        </div>
    );
}
