"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ImageIcon from "../_share/components/IconImage";

export default function Menubar() {
    const path = usePathname();
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
            href: "/home",
            scale: "w-[70%]",
        },
        {
            src: "/img/posticon.png",
            alt: "post",
            href: "/home",
            scale: "w-[70%]",
        },
        {
            src: "/img/notifsicon.png",
            alt: "notification",
            href: "/home",
            scale: "w-[50%]",
        },
        {
            src: "/img/friendicon.png",
            alt: "friend",
            href: "/home",
            scale: "w-[70%]",
        },
    ];
    return (
        <nav className="grid grid-cols-5 w-full h-full">
            {items.map((item) => (
                <Link
                    key={item.alt}
                    className="w-full h-full flex items-center justify-center group"
                    onContextMenu={(e) => e.preventDefault()}
                    href={item.href}
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
