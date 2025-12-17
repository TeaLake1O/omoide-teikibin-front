"use client";
import { Me } from "@/types/CurrentUserInfoLayout";
import Link from "next/link";
import IconImage from "./IconImage";
import UserIcon from "./UserIconImage";

type Props = {
    toggleHamburger: () => void;
    me: Me | null;
    isDown: boolean;
};

export default function Header(props: Props) {
    const { toggleHamburger, me, isDown } = props;
    return (
        <header
            className={
                "w-full bg-orange-100 border-orange-200 overflow-hidden flex items-center transition-[height,opacity] duration-400 " +
                (isDown
                    ? "h-0 opacity-0 border-b-0 pointer-events-none"
                    : "h-16 opacity-100 border-b pointer-events-auto") +
                " md:h-16 md:opacity-100 md:border-b md:pointer-events-auto"
            }
        >
            <div className="h-12 aspect-square rounded-full flex items-center justify-center md:invisible">
                <button
                    type="button"
                    onClick={toggleHamburger}
                    className="h-[90%] aspect-square flex items-center justify-center duration-200 active:scale-96 md:pointer-events-none"
                >
                    <UserIcon iconUrl={me?.icon_url ?? null} />
                </button>
            </div>
            <div className="flex-1 flex justify-center">
                <span className="font-medium">タイトル</span>
            </div>
            <div className="h-10 aspect-square flex items-center justify-center">
                <Link href="/home" className="w-full h-full">
                    <IconImage
                        src="/img/omoide-teikibin-Logo-transparent.png"
                        alt="appicon"
                        scale="w-[90%]"
                    />
                </Link>
            </div>
        </header>
    );
}
