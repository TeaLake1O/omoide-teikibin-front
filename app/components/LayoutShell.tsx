"use client";

import Script from "next/script";
import { ReactNode, useEffect, useState } from "react";
import { LoadingScreen } from "../_share/components/UI/util/LoadingScreen";
import useScrollToggle from "../_share/hooks/observe/useScrollToggle";
import { useIsMdUp } from "../_share/hooks/util/useIsMdUp";
import useTimeout from "../_share/hooks/util/useTimeout";
import { useLayoutUI } from "../_share/provider/LayoutUI";
import AsideMenu from "./AsideMenu";
import Header from "./Header";
import Menubar from "./Menubar";
import Notifications from "./Notifications";

type Props = {
    children: ReactNode;
};

export default function LayoutShell(props: Props) {
    //timer用
    const [minDelayDone, setMinDelayDone] = useState(false);

    const { hamburger, isLoading, me, toggleHamburger } = useLayoutUI();

    //スクロールでヘッダーを下げるときに使うstateとhook
    const [mainRef, setMainRef] = useState<HTMLElement | null>(null);
    const isDown = useScrollToggle({ targetRef: mainRef });

    const isMdUp = useIsMdUp();

    useEffect(() => {
        if (!("serviceWorker" in navigator)) return;

        navigator.serviceWorker.register("/sw.js").catch(console.error);
    }, []);

    //最低1秒はローディング画面を表示する

    const { schedule } = useTimeout();

    useEffect(() => {
        // 毎回表示のたびに最低1秒待ちたいなら、isLoadingがtrueになったタイミングでリセットしてもいい
        schedule(() => setMinDelayDone(true), 1000);
    }, [schedule]);

    //isLoadingならローディング画面を表示
    if (isLoading || !minDelayDone) {
        return (
            <>
                <LoadingScreen />;
            </>
        );
    }

    return (
        <>
            <div
                className="h-full md:grid 
                md:grid-cols-[minmax(140px,1fr)_minmax(360px,650px)_minmax(200px,1.8fr)] 
                2xl:grid-cols-[1fr_minmax(200px,1fr)_minmax(450px,650px)_minmax(300px,1.8fr)_1fr]"
            >
                <div className="hidden 2xl:block" />
                <div
                    className={
                        hamburger
                            ? "block inset-0 bg-black/50 fixed z-30 md:hidden"
                            : "hidden"
                    }
                    onClick={toggleHamburger}
                ></div>
                <AsideMenu user={me} hamburger={hamburger} />
                <div className="w-full h-full bg-orange-100 border-r border-orange-200 flex flex-col min-h-0">
                    <div className="w-full h-full flex flex-col relative">
                        <Header isDown={isDown} me={me} />

                        <main
                            className={`${
                                isMdUp ? "no-scrollbar" : "scrollbar-slim"
                            } pb-16 md:pb-0 flex-1 min-h-0 relative ${"overflow-y-auto"}`}
                            ref={setMainRef}
                        >
                            {props.children}
                        </main>
                    </div>
                    <div
                        className={`w-full left-0 right-0 bottom-0 h-16 border-orange-200 transition-opacity duration-200 
                                bg-orange-100 border-t fixed md:hidden
                            ${isDown ? " opacity-70" : " opacity-100"}`}
                    >
                        {!isMdUp && <Menubar />}
                    </div>
                </div>
                <div className="hidden md:block lg:border-r lg:border-orange-300 md:top-0 flex-1 min-h-0 md:h-full bg-orange-100">
                    {isMdUp && <Notifications />}
                </div>
                <div className="hidden 2xl:block" />
            </div>
            {<Script src="https://unpkg.com/react-scan/dist/auto.global.js" />}
        </>
    );
}
