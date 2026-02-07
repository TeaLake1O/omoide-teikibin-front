"use client";

import CloseButton from "@/app/_share/components/UI/button/CloseButton";
import GenericButton from "@/app/_share/components/UI/button/GenericButton";
import PhotoIcon from "@/app/_share/components/UI/Icon/PhotoIcon";
import UserIconImage from "@/app/_share/components/UserIconImage";
import { API_CACHE_KEYS } from "@/app/_share/constants/apiCacheKeys";
import { groupMemberUrl } from "@/app/_share/constants/apiUrls";
import useQueryData from "@/app/_share/hooks/query/useQueryData";
import usePickImage from "@/app/_share/hooks/util/usePickImage";
import { useToast } from "@/app/_share/provider/Toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPortal } from "react-dom";
import { GroupMessageData, Member } from "../types/GroupMessage";
import updateGroup from "./hooks/updateGroup";

export default function GroupSettingModalButton({
    detail,
}: {
    detail: GroupMessageData;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                }}
                className="h-[90%] aspect-square mr-2 items-center rounded-full 
                    gap-1 flex justify-center hover:bg-black/20 active:bg-black/20
                    transition-colors duration-300"
            >
                <div className="h-[10%] aspect-square rounded-full bg-amber-800" />
                <div className="h-[10%] aspect-square rounded-full bg-amber-800 " />
                <div className="h-[10%] aspect-square rounded-full bg-amber-800" />
            </button>
            <ModalWindow
                isOpen={isOpen}
                close={() => setIsOpen(false)}
                detail={detail}
            />
        </>
    );
}
function ModalWindow({
    isOpen,
    close,
    detail,
}: {
    isOpen: boolean;
    close: () => void;
    detail: GroupMessageData;
}) {
    return (
        <>
            {isOpen &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[9990] bg-black/60 flex justify-center items-center"
                        onClick={close}
                    >
                        <form
                            className="md:h-[90%] md:w-[40%] h-full w-full bg-orange-100 rounded-md p-3 overflow-y-auto overflow-x-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-full flex justify-between items-center">
                                <div className="relative h-10 aspect-square ml-1">
                                    <CloseButton
                                        handleOnclick={close}
                                        color="bg-black"
                                    />
                                </div>
                                <h2 className="text-xl font-bold text-amber-800">
                                    グループ詳細
                                </h2>
                                <div className="w-10" />
                            </div>
                            <GroupSetting detail={detail} close={close} />
                        </form>
                    </div>,
                    document.getElementById("modal-root")!,
                )}
        </>
    );
}

function GroupSetting({
    close,
    detail,
}: {
    close: () => void;
    detail: GroupMessageData;
}) {
    console.log(detail);
    const [text, setText] = useState(detail.group_name);
    const { url, fileOpen, inputProps, file, imageReset } = usePickImage(
        detail.group_image ?? undefined,
    );

    const result = useQueryData<Member[]>({
        url: groupMemberUrl,
        enabled: true,
        queryKey: API_CACHE_KEYS.groupMember(),
    });
    const data = result.data;

    const reset = () => {
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
        if (file) fd.append("group_image", file);

        const res = await updateGroup({ group: detail.id, data: fd });
        if (res.status === "success") {
            router.refresh();
        }

        close();
        reset();
        showToast(
            res.status === "success"
                ? "設定を反映しました。"
                : "エラーが発生しました",
            "text-black",
        );
    };

    if (result.isError || result.isLoading) return null;

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <h3 className="mt-3 text-lg text-amber-800">メンバー</h3>
            <div className="w-[80%] mt-2 max-h-36 flex justify-center items-center">
                <FriendListView result={data} />
            </div>
            <div className=" border border-orange-800 rounded-md mt-3 w-full flex flex-col p-2 justify-center items-center">
                <h3 className="text-lg text-amber-800 ">グループ情報編集</h3>
                <h2 className="text-center text-sm mt-4 mb-3 text-amber-800">
                    アイコンをクリックで画像を選択
                </h2>
                <button
                    className="h-14 w-14 aspect-square rounded-full bg-gray-300"
                    onClick={() => fileOpen()}
                    type="button"
                >
                    {!url ? (
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
                        onChange={(e) => setText(e.currentTarget.value)}
                        value={text}
                        className="focus:outline-none w-full"
                        name="nickname"
                    />
                </label>

                <div className="w-full mt-7 mr-5 ml-5 flex justify-between items-center ">
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
                        name="変更"
                        textSize="text-sm"
                        height="h-6"
                        type="button"
                    />
                </div>
            </div>
        </div>
    );
}

function FriendListView({ result }: { result: Member[] | null }) {
    return (
        <div className="w-[90%] h-full flex flex-col p-1 overflow-y-scroll scrollbar-slim border border-orange-300 bg-white">
            {result &&
                result.map((item) => {
                    const user = item.member_info;
                    const name = user.nickname ?? user.username;

                    return (
                        <Link
                            href={`/user/${user.username}`}
                            key={item.member}
                            className="w-full flex"
                        >
                            <div className="w-full md:h-10 h-16  flex">
                                <div
                                    className={`w-full h-full hover:bg-gray-300 active:bg-gray-300
            border flex flex-col justify-center border-gray-300 `}
                                >
                                    <div className="flex md:mr-5 md:ml-5 justify-between items-center">
                                        <div className="flex flex-row items-center justify-center gap-4">
                                            <div className="w-7 aspect-square rounded-full">
                                                <UserIconImage
                                                    iconUrl={user.icon_url}
                                                />
                                            </div>
                                            <span className="text-lg truncate">
                                                {name}
                                            </span>
                                        </div>
                                        <span className="text-sm text-amber-800 truncate">
                                            @{user.username}
                                        </span>
                                    </div>
                                    <div className="w-full min-h-0 text-gray-500 flex justify-between gap-5 md:mb-1"></div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
        </div>
    );
}
