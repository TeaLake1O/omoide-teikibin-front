"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import ImageIcon from "../_share/components/IconImage";
import { useLayoutUI } from "../_share/provider/LayoutUI";
import { usePostModal } from "../_share/provider/PostModal";

export default function Menubar() {
    const path = usePathname();

    const { optimisticUrl, setOptimisticUrl } = useLayoutUI();
    const { openPostModal } = usePostModal();

    useEffect(() => {
        setOptimisticUrl(path);
    }, [path, setOptimisticUrl]);
    //mapでまわすよう
    const items = [
        {
            src: "/img/homeicon.png",
            alt: "home",
            href: "/home",
            scale: "w-[70%]",
        },
        {
            src: "/img/groupicon.png",
            alt: "group",
            href: "/group",
            scale: "w-[70%]",
        },
        {
            src: "/img/posticon.png",
            alt: "post",
            href: "/post",
            scale: "w-[70%]",
        },
        {
            src: "/img/friendicon.png",
            alt: "friend",
            href: "/friend",
            scale: "w-[70%]",
        },
    ];
    return (
        <nav className="grid grid-cols-5 w-full h-full">
            {items.map((item) => {
                if (item.alt === "post") {
                    return (
                        <button
                            key={"post"}
                            className={`w-full h-full flex items-center justify-center group`}
                            onContextMenu={(e) => e.preventDefault()}
                            onClick={openPostModal}
                        >
                            <div
                                className="aspect-square h-[80%] rounded-full group-active:bg-black/15 duration-300
                                    transition-colors flex items-center justify-center"
                            >
                                <ImageIcon
                                    src={item.src}
                                    alt={item.alt}
                                    scale={item.scale}
                                />
                            </div>
                        </button>
                    );
                } else
                    return (
                        <Link
                            key={item.alt}
                            className={`w-full h-full flex items-center justify-center 
                        group ${
                            optimisticUrl === item.href ? "bg-orange-200" : ""
                        }`}
                            onContextMenu={(e) => e.preventDefault()}
                            href={item.href}
                            onClick={() => setOptimisticUrl(item.href)}
                        >
                            <div
                                className="aspect-square h-[80%] rounded-full group-active:bg-black/15 duration-300
                    transition-colors flex items-center justify-center"
                            >
                                <ImageIcon
                                    src={item.src}
                                    alt={item.alt}
                                    scale={item.scale}
                                />
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
