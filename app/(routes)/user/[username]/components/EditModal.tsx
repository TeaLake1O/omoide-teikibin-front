"use client";

import GenericButton from "@/app/_share/UI/GenericButton";
import MountedModal from "@/app/_share/components/MountedModal";
import UserIconImage from "@/app/_share/components/UserIconImage";
import { UNKNOWN_USER_ICON_URL } from "@/app/_share/constants/publicUrl";
import usePickImage from "@/app/_share/hooks/usePickImage";
import { useLayoutUI } from "@/app/_share/provider/LayoutUI";
import { useToast } from "@/app/_share/provider/Toast";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import updateProfile from "../api/updateProfile";

type Props = {
    iconUrl: string | null;
    nickname: string | null;
    profileText: string | null;
    birthday: string | null;
    isMe: boolean;
    serverRefresh: () => Promise<void>;
};

export default function EditButton(props: Props) {
    const formRef = useRef<HTMLFormElement>(null);
    const today = (() => {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    })();

    const { refresh: layoutRefresh } = useLayoutUI();

    const { url, fileOpen, inputProps, file, imageReset } = usePickImage(
        props.iconUrl ? props.iconUrl : "/accountsicon.png"
    );

    const router = useRouter();

    const { showToast } = useToast();

    const [birthday, setBirthday] = useState(props.birthday);
    const [nickname, setNickname] = useState(props.nickname);
    const [profileText, setProfileText] = useState(props.profileText ?? "");
    const isProfileTextLessMaxLength = profileText.length <= 200;
    const isBirthdayPast = !birthday || birthday <= today;

    const baseLine = useRef<{
        nickname: string | null;
        birthday: string | null;
        profileText: string | null;
    } | null>(null);

    const submit = async () => {
        if (!formRef.current) return;
        if (!isProfileTextLessMaxLength) return;
        if (!isBirthdayPast) return;

        const base = baseLine.current;
        if (base === null) return;

        showToast("変更中...", "text-black");

        const fd = new FormData();

        if (base.nickname !== nickname) fd.append("nickname", nickname ?? "");
        if (base.birthday !== birthday) fd.append("birthday", birthday ?? "");
        if (base.profileText !== profileText)
            fd.append("profile_text", profileText ?? "");

        if (file) fd.append("icon", file);

        if ([...fd.keys()].length === 0) {
            close();
            return;
        }

        const res = await updateProfile(fd);
        layoutRefresh();
        await props.serverRefresh();
        router.refresh();

        close();
        showToast(
            res.status === "success"
                ? "プロフィールを変更しました"
                : "エラーが発生しました",
            "text-black"
        );
    };

    const formReset = () => {
        imageReset();
        setBirthday(props.birthday);
        setNickname(props.nickname);
        setProfileText(props.profileText ?? "");
    };

    const [openModal, setModal] = useState<boolean>(false);
    const open = () => {
        formReset();
        baseLine.current = {
            nickname: props.nickname,
            birthday: props.birthday,
            profileText: props.profileText,
        };
        setModal(true);
    };
    const close = () => {
        formReset();
        setModal(false);
    };

    useEffect(() => {
        if (!props.iconUrl) return;
        const img = new Image();
        img.src = props.iconUrl;
    }, [props.iconUrl]);

    return (
        <>
            <GenericButton
                name="編集"
                height="h-7"
                width="w-16"
                textSize="text-sm"
                hidden={!props.isMe}
                handleOnclick={open}
            />
            <MountedModal isOpen={openModal} close={close}>
                <form
                    className="md:w-140 md:h-[85%] w-screen h-screen pt-5 pr-5 pl-5 bg-orange-100 md:rounded-2xl flex flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                    ref={formRef}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <h2 className="text-[1.3rem] text-amber-800 text-center md:mt-1 mt-16">
                        プロフィールの変更
                    </h2>
                    <EditButtonFormContent
                        fileOpen={fileOpen}
                        url={url}
                        birthday={birthday}
                        setBirthday={setBirthday}
                        isBirthdayPast={isBirthdayPast}
                        nickname={nickname}
                        setNickname={setNickname}
                        inputProps={inputProps}
                        setProfileText={setProfileText}
                        profileText={profileText}
                        isLessMaxLength={isProfileTextLessMaxLength}
                    />
                    <div className="h-8 m-3 mb-3 mt-3 w-full flex justify-between items-center">
                        <GenericButton
                            name="キャンセル"
                            height="h-full"
                            textSize=""
                            handleOnclick={close}
                        />
                        <GenericButton
                            name="保存"
                            height="h-full"
                            textSize=""
                            handleOnclick={submit}
                        />
                    </div>
                </form>
            </MountedModal>
        </>
    );
}

type EditButtonFormContentProps = {
    url: string | undefined;
    inputProps: React.InputHTMLAttributes<HTMLInputElement> & {
        ref: React.Ref<HTMLInputElement>;
    };
    fileOpen: () => void;
    nickname: string | null;
    setNickname: (t: string) => void;
    birthday: string | null;
    isBirthdayPast: boolean;
    setBirthday: (t: string) => void;
    profileText: string;
    setProfileText: (t: string) => void;
    isLessMaxLength: boolean;
};

function EditButtonFormContent(childProps: EditButtonFormContentProps) {
    const {
        url,
        fileOpen,
        nickname,
        setNickname,
        birthday,
        isBirthdayPast,
        setBirthday,
        inputProps,
        isLessMaxLength,
        setProfileText,
        profileText,
    } = childProps;
    return (
        <div className="w-full flex-col flex gap-3 items-center overflow-y-auto resize-none no-scrollbar">
            <div className="w-[90%] mb-4">
                <div className="flex items-center mt-2 justify-between">
                    <div className="h-14 w-14 md:h-20 md:w-20 aspect-square rounded-full">
                        <UserIconImage iconUrl={url ?? UNKNOWN_USER_ICON_URL} />
                    </div>
                    <input {...inputProps} />
                    <div>
                        <GenericButton
                            name="アイコンを変更"
                            height="h-7"
                            textSize="text-sm"
                            handleOnclick={fileOpen}
                        />
                    </div>
                </div>
            </div>

            <label className="w-[90%] border border-amber-800 rounded-md bg-white p-1 block select-none">
                <span className="text-[12px] text-gray-400">ニックネーム</span>
                <input
                    type="text"
                    value={nickname ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setNickname(e.currentTarget.value)
                    }
                    className="focus:outline-none w-full"
                    name="nickname"
                />
            </label>
            <label className="w-[90%] border border-amber-800 rounded-md bg-white p-1 block select-none">
                <div className="flex justify-between">
                    <span className="text-[12px] text-gray-400">生年月日</span>
                    <span
                        className={`text-red-600 text-[12px] ${
                            isBirthdayPast ? "hidden" : "block"
                        }`}
                    >
                        誕生日に未来は指定できません
                    </span>
                    <div className="w-16"></div>
                </div>
                <input
                    type="date"
                    className="focus:outline-none w-full"
                    value={birthday ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setBirthday(e.currentTarget.value)
                    }
                    name="birthday"
                />
            </label>
            <label className="w-[90%] md:h-42 h-54 border border-amber-800 rounded-md bg-white p-1 mb-2 select-none flex flex-col ">
                <div className="flex justify-between">
                    <span className="text-[12px] text-gray-400">自己紹介</span>
                    <span
                        className={`text-red-600 text-[12px] ${
                            isLessMaxLength ? "hidden" : "block"
                        }`}
                    >
                        自己紹介は200文字以内です
                    </span>
                    <div className="text-[12px]">
                        <span className="text-gray-400">200/</span>
                        <span
                            className={`${
                                isLessMaxLength
                                    ? "text-gray-400"
                                    : "text-red-600"
                            }`}
                        >
                            {profileText.length}
                        </span>
                        <span className="text-gray-400">文字</span>
                    </div>
                </div>
                <textarea
                    value={profileText}
                    className="focus:outline-none mt-2 w-full h-full overflow-y-auto resize-none"
                    name="profile_text"
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setProfileText(e.currentTarget.value)
                    }
                />
            </label>
        </div>
    );
}
