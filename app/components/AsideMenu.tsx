"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentType, useEffect } from "react";
import { Me } from "../../types/Me";
import FriendsIcon from "../_share/components/UI/Icon/FriendsIcon";
import GroupIcon from "../_share/components/UI/Icon/GroupIcon";
import HomeIcon from "../_share/components/UI/Icon/HomeIcon";
import MessageIcon from "../_share/components/UI/Icon/MessageIcon";
import MypageIcon from "../_share/components/UI/Icon/MypageIcon";
import PostButton from "../_share/components/UI/Icon/PostIcon";
import SettingsIcon from "../_share/components/UI/Icon/settingsIcon";
import UserIcon from "../_share/components/UserIconImage";
import { useIsMdUp } from "../_share/hooks/util/useIsMdUp";
import { useLayoutUI } from "../_share/provider/LayoutUI";
import { usePostModal } from "../_share/provider/PostModal";
import PostModal from "./PostModal";

type Props = {
    user: Me | null;
    hamburger: boolean;
};

type MenuNav = {
    Icon: ComponentType<{ isActive: boolean }>;
    alt: string;
    menuName: string;
    href: string;
    mdHidden: boolean;
};

const menuNav: MenuNav[] = [
    {
        Icon: HomeIcon,
        alt: "home",
        menuName: "ホーム",
        href: "/home",
        mdHidden: true,
    },
    {
        Icon: GroupIcon,
        alt: "group",
        menuName: "グループ",
        href: "/group",
        mdHidden: true,
    },
    {
        Icon: FriendsIcon,
        alt: "friend",
        menuName: "フレンド",
        href: "/friend",
        mdHidden: true,
    },
    {
        Icon: MessageIcon,
        alt: "message",
        menuName: "メッセージ",
        href: "/message",
        mdHidden: false,
    },
    {
        Icon: MypageIcon,
        alt: "user",
        menuName: "マイページ",
        href: "/user",
        mdHidden: false,
    },
    {
        Icon: SettingsIcon,
        alt: "setting",
        menuName: "設定",
        href: "/setting",
        mdHidden: false,
    },
];

export default function AsideMenu(props: Props) {
    const path = usePathname();

    const { optimisticUrl, setOptimisticUrl, toggleHamburger } = useLayoutUI();
    const { openPostModal } = usePostModal();

    const isMdUp = useIsMdUp();

    const changeHamburger = () => {
        if (!isMdUp) toggleHamburger();
    };

    useEffect(() => {
        setOptimisticUrl(null);
    }, [path, setOptimisticUrl]);

    return (
        <aside
            className={
                (props.hamburger ? "translate-x-0" : "-translate-x-full") +
                " md:block md:h-full md:translate-x-0 md:w-auto md:static fixed bg-orange-100 " +
                " border-r border-orange-200 transition-transform duration-300 z-40 left-0 inset-y-0 w-[60%]"
            }
        >
            <div className="flex flex-col h-full w-full bg-orange-100">
                <div className="h-24 w-full flex items-center justify-center bg-orange-100">
                    <div className="flex flex-[1.5] min-w-0 flex-col justify-center">
                        <span className="font-sans font-bold text-lg text-left text-black pl-[25%] truncate">
                            {props.user?.nickname ?? "名無し"}
                        </span>
                        <span className="font-sans font-normal text-sm text-amber-800 text-left pl-[25%] truncate">
                            @{props.user?.username ?? "Error"}
                        </span>
                    </div>
                    <div className="flex-1 rounded-full flex items-center justify-center bg-orange-100">
                        <Link
                            className="w-[70%] max-w-18 aspect-square rounded-full bg-orange-100 flex items-center justify-center duration-200 active:scale-94"
                            href={`/user/${props.user?.username}`}
                            onClick={() => {
                                setOptimisticUrl(
                                    `/user/${props.user?.username}`
                                );
                                changeHamburger();
                            }}
                        >
                            <UserIcon iconUrl={props.user?.icon_url ?? null} />
                        </Link>
                    </div>
                </div>
                <div className="h-20 w-full ">
                    <button
                        className="h-full w-full p-2 flex items-center transition-colors duration-100 md:hover:bg-black/15 active:bg-black/15"
                        onClick={openPostModal}
                    >
                        <div className="w-full h-full flex flex-row-reverse items-center">
                            <div className="h-[80%] flex justify-center items-center">
                                <PostButton isAside />
                            </div>
                            <span className="w-full flex justify-center text-2xl font-bold text-amber-800">
                                投稿
                            </span>
                        </div>
                    </button>
                </div>
                <nav className="flex flex-col">
                    {menuNav.map((menu, i) => {
                        const targetHref =
                            menu.href === "/user"
                                ? `/user/${props.user?.username}`
                                : menu.href;
                        const isActive =
                            optimisticUrl === targetHref ||
                            (path === targetHref && optimisticUrl === null) ||
                            (path.startsWith("/message") &&
                                optimisticUrl === targetHref);

                        return (
                            <Link
                                key={i}
                                href={targetHref}
                                className={`h-15 pt-2 pr-2 pl-2 flex items-center ${
                                    menu.mdHidden ? "hidden md:flex" : ""
                                }`}
                                onClick={() => {
                                    setOptimisticUrl(targetHref);
                                    changeHamburger();
                                }}
                            >
                                <div
                                    className={`w-full h-full flex flex-row items-center rounded-md 
                                        transition-colors duration-100 md:hover:bg-black/15 active:bg-black/15 ${
                                            isActive ? "md:bg-black/15" : ""
                                        }`}
                                >
                                    <div className="h-full flex justify-center items-center ml-3">
                                        <div
                                            className={`aspect-square flex justify-center items-center ${
                                                menu.href.startsWith("/user/")
                                                    ? "h-[60%] w-[60%]"
                                                    : "h-[70%] w-[70%]"
                                            }`}
                                        >
                                            <menu.Icon isActive={isActive} />
                                        </div>
                                    </div>
                                    <span className="w-full pl-8 text-1xl font-bold text-black text-left">
                                        {menu.menuName}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>
                {/*<div className="mt-4 mb-2 mr-5 flex flex-row-reverse">
                    <LogoutButton />
                </div>*/}
            </div>
            <PostModal />
        </aside>
    );
}
