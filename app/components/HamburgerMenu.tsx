"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { Me } from "../../types/CurrentUserInfoLayout";
import IconImage from "../_share/components/IconImage";
import LogoutButton from "../_share/components/LogoutButton";
import UserIcon from "../_share/components/UserIconImage";
import { useLayoutUI } from "./LayoutUI";

type Props = {
    user: Me | null;
};

type MenuNav = {
    src: string;
    alt: string;
    menuName: string;
    href: string;
    mdHidden: boolean;
};

const menuNav: MenuNav[] = [
    {
        src: "/img/homeicon.png",
        alt: "home",
        menuName: "ホーム",
        href: "/home",
        mdHidden: true,
    },
    {
        src: "/img/groupicon.png",
        alt: "group",
        menuName: "グループ",
        href: "/group",
        mdHidden: true,
    },
    {
        src: "/img/friendicon.png",
        alt: "friend",
        menuName: "フレンド",
        href: "/friend",
        mdHidden: true,
    },
    {
        src: "/img/homeicon.png",
        alt: "mypage",
        menuName: "マイページ",
        href: "/mypage",
        mdHidden: false,
    },
    {
        src: "/img/homeicon.png",
        alt: "setting",
        menuName: "設定",
        href: "/settings",
        mdHidden: false,
    },
];

function MenuComponent(props: Props) {
    const path = usePathname();

    const { optimisticUrl, setOptimisticUrl } = useLayoutUI();

    useEffect(() => {
        setOptimisticUrl(null);
    }, [path, setOptimisticUrl]);

    return (
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
                    <button className="w-[70%] max-w-18 aspect-square rounded-full bg-orange-100 flex items-center justify-center duration-200 active:scale-94">
                        <UserIcon iconUrl={props.user?.icon_url ?? null} />
                    </button>
                </div>
            </div>
            <div className="h-20 w-full border-b border-t border-orange-300 ">
                <Link
                    href="/post"
                    className={`h-full p-2 flex items-center md:hover:bg-black/15 active:bg-black/15 ${
                        optimisticUrl === "/post" ||
                        (path === "/post" && optimisticUrl === null)
                            ? "md:bg-black/10"
                            : ""
                    }`}
                    onClick={() => setOptimisticUrl("/post")}
                >
                    <div className="w-full h-full flex flex-row-reverse items-center">
                        <IconImage
                            src="/img/posticon.png"
                            alt="post"
                            scale="h-[60%]"
                        />
                        <span className="w-full flex justify-center text-2xl font-bold text-amber-800">
                            投稿
                        </span>
                    </div>
                </Link>
            </div>
            <nav className="flex flex-col">
                {menuNav.map((menu, i) => {
                    return (
                        <Link
                            key={i}
                            href={menu.href}
                            className={`h-15 p-2 flex items-center md:hover:bg-black/15 active:bg-black/15 ${
                                menu.mdHidden ? "hidden md:flex" : ""
                            } ${
                                optimisticUrl === menu.href ||
                                (path === "/post" && optimisticUrl === null)
                                    ? "md:bg-black/10"
                                    : ""
                            }`}
                            onClick={() => setOptimisticUrl(menu.href)}
                        >
                            <div className="w-full h-full flex flex-row-reverse items-center">
                                <IconImage
                                    src={menu.src}
                                    alt={menu.alt}
                                    scale="h-[60%]"
                                />
                                <span className="w-full pl-10 text-1xl font-bold text-black text-left">
                                    {menu.menuName}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </nav>
            <div className="mt-10 mb-2 mr-5 flex flex-row-reverse">
                <LogoutButton />
            </div>
        </div>
    );
}

const Menu = React.memo(MenuComponent);
export default Menu;
