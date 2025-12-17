"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ImageIcon from "../_share/components/IconImage";

export default function Menubar() {
    const path = usePathname();

    const [activePage, setActivePage] = useState<string>(path);

    useEffect(() => {
        setActivePage(path);
    }, [path]);
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
        {
            src: "/img/notifsicon.png",
            alt: "notification",
            href: "/notification",
            scale: "w-[50%]",
        },
    ];
    return (
        <nav className="grid grid-cols-5 w-full h-full">
            {items.map((item) => (
                <Link
                    key={item.alt}
                    className={`w-full h-full flex items-center justify-center 
                        group ${
                            activePage === item.href ? "bg-orange-200" : ""
                        }`}
                    onContextMenu={(e) => e.preventDefault()}
                    href={item.href}
                    onClick={() => setActivePage(item.href)}
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
            ))}
        </nav>
    );
}
