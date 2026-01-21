"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentType, useEffect } from "react";
import ImageIcon from "../_share/components/IconImage";
import { useLayoutUI } from "../_share/provider/LayoutUI";
import { usePostModal } from "../_share/provider/PostModal";
import FriendsIcon from "../_share/UI/menuIcon/FriendsIcon";
import GroupIcon from "../_share/UI/menuIcon/GroupIcon";
import HomeIcon from "../_share/UI/menuIcon/HomeIcon";
import PostButton from "../_share/UI/PostButton";

type Item = {
    Icon: ComponentType<{ isActive: boolean }> | null;
    alt: string;
    href: string;
    scale: string;
};
const items: Item[] = [
    {
        Icon: HomeIcon,
        alt: "home",
        href: "/home",
        scale: "w-[50%] h-[50%]",
    },
    {
        Icon: GroupIcon,
        alt: "group",
        href: "/group",
        scale: "w-[55%] h-[55%]",
    },
    {
        Icon: null,
        alt: "post",
        href: "/post",
        scale: "",
    },
    {
        Icon: FriendsIcon,
        alt: "friend",
        href: "/friend",
        scale: "w-[45%] h-[45%]",
    },
];

export default function Menubar() {
    const path = usePathname();

    const { optimisticUrl, setOptimisticUrl, me } = useLayoutUI();
    const { openPostModal } = usePostModal();

    useEffect(() => {
        setOptimisticUrl(path);
    }, [path, setOptimisticUrl]);

    return (
        <nav className="grid grid-cols-5 w-full h-full">
            {items.map((item) => {
                const targetHref =
                    item.href === "/user" ? `/user/${me?.username}` : item.href;
                const isActive =
                    optimisticUrl === targetHref ||
                    (path === targetHref && optimisticUrl === null) ||
                    (item.href === "/user" &&
                        path.startsWith("/user/") &&
                        optimisticUrl === null);
                if (item.href === "/post") {
                    return (
                        <button
                            key={item.alt}
                            className={`w-full h-full flex items-center justify-center group`}
                            onContextMenu={(e) => e.preventDefault()}
                            onClick={openPostModal}
                        >
                            <div
                                className="aspect-square h-[80%] rounded-full group-active:bg-black/15 duration-300
                                    transition-colors flex items-center justify-center"
                            >
                                <PostButton />
                            </div>
                        </button>
                    );
                } else
                    return (
                        <Link
                            key={item.alt}
                            className={`w-full h-full flex items-center justify-center 
                        group`}
                            onContextMenu={(e) => e.preventDefault()}
                            href={item.href}
                            onClick={() => setOptimisticUrl(item.href)}
                        >
                            <div
                                className="aspect-square h-14 w-14 rounded-full group-active:bg-black/15 duration-300
                                transition-colors flex items-center justify-center"
                            >
                                {item.Icon !== null ? (
                                    <div
                                        className={`flex justify-center items-center ${item.scale}`}
                                    >
                                        <item.Icon isActive={isActive} />
                                    </div>
                                ) : (
                                    <ImageIcon
                                        scale={item.scale}
                                        src={"img/notifsIcon.png"}
                                        alt={item.alt}
                                    />
                                )}
                            </div>
                        </Link>
                    );
            })}
            <button
                className={`w-full h-full flex items-center justify-center 
                        group ${
                            optimisticUrl === "/notification"
                                ? "bg-orange-200"
                                : ""
                        }`}
                onContextMenu={(e) => e.preventDefault()}
                onClick={() => {
                    console.log("hello");
                }}
            >
                <div
                    className="aspect-square h-[80%] rounded-full group-active:bg-black/15 duration-300
                    transition-colors flex items-center justify-center"
                >
                    <ImageIcon
                        src="/img/notifsicon.png"
                        alt="notification"
                        scale="w-[50%]"
                    />
                </div>
            </button>
        </nav>
    );
}
