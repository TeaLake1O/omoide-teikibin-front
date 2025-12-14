"use client";

import { useRef } from "react";
import useScrollToggle from "../_share/hooks/useScrollToggle";
import { useLayoutUI } from "../components/LayoutUI";
import Hamburger from "./components/Hamburger";

export default function Home() {
    const mainRef = useRef<HTMLElement | null>(null);
    const isDown = useScrollToggle({ targetRef: mainRef });
    const { toggleHamburger, me } = useLayoutUI();
    return (
        <div>
            <header
                className={
                    "w-full border-b bg-orange-100 border-orange-200 overflow-hidden flex items-center transition-[height,opacity] duration-400 " +
                    (isDown
                        ? "h-0 opacity-0 border-b-0 pointer-events-none"
                        : "h-16 opacity-100 border-b pointer-events-auto") +
                    " md:h-16 md:opacity-100 md:border-b md:pointer-events-auto"
                }
            >
                <Hamburger
                    iconUrl={me?.icon_url ?? null}
                    toggleHamburger={toggleHamburger}
                />
            </header>
            <main
                className="p-6 h-screen overflow-y-auto no-scrollbar "
                ref={mainRef}
            >
                <span>
                    あああああああああああああああああああああああああああああああああああああああ
                    あああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                    ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                    ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                    ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                    ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                    ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                    ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                    あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                    ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                    ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                    あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                    ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                    ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                    あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                    あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                    あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                    あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                    あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                    あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                </span>
            </main>
        </div>
    );
}
