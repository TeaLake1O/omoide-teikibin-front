"use client";

import useLayoutData from "@/hooks/useLayoutData";
import { Me } from "@/types/Me";
import { ReactNode, useCallback, useEffect, useState } from "react";
import useScrollToggle from "../_share/hooks/useScrollToggle";
import { LayoutUIProvider } from "../_share/provider/LayoutUI";
import { LayoutUI } from "../_share/types/provider";
import { LoadingScreen } from "../_share/UI/LoadingScreen";
import AsideMenu from "./AsideMenu";
import Header from "./Header";
import Menubar from "./Menubar";
import Notifications from "./Notifications";

type Props = {
    children: ReactNode;
    initialMe: Me | null;
};

export default function LayoutShell(props: Props) {
    //カスタムフック、共通レイアウトのデータを取得する
    const { data: me, isLoading, refresh } = useLayoutData();

    const effectiveMe = me ?? props.initialMe;

    //timer用
    const [minDelayDone, setMinDelayDone] = useState(false);

    //トグル用のrefと関数
    const [hamburger, setHamburger] = useState(false);

    //スクロールでヘッダーを下げるときに使うstateとhook
    const [mainRef, setMainRef] = useState<HTMLElement | null>(null);
    const isDown = useScrollToggle({ targetRef: mainRef });

    //ハンバーガー開閉用のフラグをトグルするコールバック
    const toggleHamburger = useCallback(() => {
        //アローで書かないと連打で古い値を掴むことがあるらしい
        setHamburger((prev) => !prev);
    }, []);

    const [optimisticUrl, setOptimisticUrl] = useState<string | null>(null);

    //Layoutで使う共通のデータ
    const LayoutContextValue: LayoutUI = {
        toggleHamburger,
        me: effectiveMe,
        optimisticUrl,
        setOptimisticUrl,
        refresh,
    };
    //最低1秒はローディング画面を表示する
    useEffect(() => {
        const timer = setTimeout(() => {
            setMinDelayDone(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

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
            <LayoutUIProvider value={LayoutContextValue}>
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
                    <AsideMenu user={effectiveMe} hamburger={hamburger} />
                    <div className="w-full h-full bg-orange-100 border-r border-orange-200 flex flex-col min-h-0">
                        <div className="w-full h-full flex flex-col relative">
                            <Header isDown={isDown} me={effectiveMe} />

                            <main
                                className={`no-scrollbar pb-16 md:pb-0 flex-1 min-h-0 relative ${"overflow-y-auto"}`}
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
                            <Menubar />
                        </div>
                    </div>
                    <div className="hidden md:block md:top-0 md:h-full bg-orange-100">
                        <Notifications />
                    </div>
                    <div className="hidden 2xl:block" />
                </div>
                {/*<Script src="https://unpkg.com/react-scan/dist/auto.global.js" />*/}
            </LayoutUIProvider>
        </>
    );
}
