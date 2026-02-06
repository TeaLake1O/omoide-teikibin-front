"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentType, useEffect } from "react";
import FriendsIcon from "../_share/components/UI/Icon/FriendsIcon";
import GroupIcon from "../_share/components/UI/Icon/GroupIcon";
import HomeIcon from "../_share/components/UI/Icon/HomeIcon";
import NotifyIcon from "../_share/components/UI/Icon/NotifyIcon";
import PostButton from "../_share/components/UI/Icon/PostIcon";
import { useLayoutUI } from "../_share/provider/LayoutUI";
import { useNotifyModal } from "../_share/provider/NotifyModal";
import { usePostModal } from "../_share/provider/PostModal";
import NotificationModal from "./NotificationModal";

type Item = {
    Icon: ComponentType<{ isActive: boolean }> | null;
    alt: string;
    href: string;
    scale: string;
    label: string;
};
const items: Item[] = [
    {
        Icon: HomeIcon,
        alt: "home",
        href: "/home",
        scale: "w-[70%] h-[70%]",
        label: "ホーム",
    },
    {
        Icon: GroupIcon,
        alt: "group",
        href: "/group",
        scale: "w-[75%] h-[75%]",
        label: "グループ",
    },
    {
        Icon: null,
        alt: "post",
        href: "/post",
        scale: "",
        label: "投稿",
    },
    {
        Icon: FriendsIcon,
        alt: "friend",
        href: "/friend",
        scale: "w-[65%] h-[65%]",
        label: "フレンド",
    },
];

export default function Menubar() {
    const path = usePathname();

    const { optimisticUrl, setOptimisticUrl, me } = useLayoutUI();
    const { openPostModal } = usePostModal();
    const { openNotifyModal, isOpenNotifyModal } = useNotifyModal();

    useEffect(() => {
        setOptimisticUrl(null);
    }, [path, setOptimisticUrl]);

    return (
        <nav className="grid grid-cols-5 w-full h-full">
            {items.map((item) => {
                const targetHref =
                    item.href === "/user" ? `/user/${me?.username}` : item.href;
                const isActive =
                    optimisticUrl === targetHref ||
                    (path === targetHref && optimisticUrl === null);
                if (item.href === "/post") {
                    return (
                        <div
                            key={item.alt}
                            className="w-full h-full flex flex-col items-center justify-center select-none"
                        >
                            <button
                                className={`flex items-center justify-center group`}
                                onContextMenu={(e) => e.preventDefault()}
                                onClick={openPostModal}
                            >
                                <div
                                    className="aspect-square h-10 rounded-full group-active:bg-black/15 duration-300
                                    transition-colors flex items-center justify-center"
                                >
                                    <PostButton />
                                </div>
                            </button>
                            <span className="text-sm font-bold text-amber-800">
                                {item.label}
                            </span>
                        </div>
                    );
                } else
                    return (
                        <div
                            key={item.alt}
                            className="w-full h-full flex flex-col items-center justify-center select-none"
                        >
                            <Link
                                className={`flex items-center justify-center 
                        group`}
                                onContextMenu={(e) => e.preventDefault()}
                                href={item.href}
                                onClick={() => {
                                    setOptimisticUrl(targetHref);
                                    console.log(optimisticUrl);
                                }}
                            >
                                <div
                                    className="aspect-square h-10 w-10 rounded-full group-active:bg-black/15 duration-300
                                transition-colors flex items-center justify-center"
                                >
                                    {item.Icon !== null ? (
                                        <div
                                            className={`flex justify-center items-center ${item.scale}`}
                                        >
                                            <item.Icon isActive={isActive} />
                                        </div>
                                    ) : null}
                                </div>
                            </Link>
                            <span className="text-[10px] font-bold text-amber-800">
                                {item.label}
                            </span>
                        </div>
                    );
            })}
            <div className="w-full h-full flex flex-col items-center justify-center select-none">
                <button
                    className="flex items-center justify-center group"
                    onContextMenu={(e) => e.preventDefault()}
                    onClick={openNotifyModal}
                >
                    <div
                        className="aspect-square h-10 w-10 rounded-full group-active:bg-black/15 duration-300
                            transition-colors flex items-center justify-center"
                    >
                        <div className="h-[70%] w-[70%]">
                            <NotifyIcon isActive={isOpenNotifyModal} />
                        </div>
                    </div>
                </button>
                <span className="text-[10px] font-bold text-amber-800">
                    通知
                </span>
                <NotificationModal />
            </div>
        </nav>
    );
}
