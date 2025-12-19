"use client";
import { LOGIN_URL } from "@/config";
import useCurrentUserInfoLayout from "@/hooks/useCurrentUserInfoLayout";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { LoadingScreen } from "./_share/components/LoadingScreen";
import Menu from "./components/HamburgerMenu";
import "./globals.css";

import { LayoutUI } from "../types/LayoutUI";
import Header from "./_share/components/Header";
import useScrollToggle from "./_share/hooks/useScrollToggle";
import { LayoutUIProvider } from "./components/LayoutUI";
import Menubar from "./components/Menubar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    //カスタムフック、共通レイアウトのデータを取得する
    const { status, me, isLoading } = useCurrentUserInfoLayout();
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
    const LayoutContextValue = useMemo(
        (): LayoutUI => ({
            toggleHamburger,
            me,
            optimisticUrl,
            setOptimisticUrl,
        }),
        [toggleHamburger, me, optimisticUrl]
    );

    //ログインしていなかったらログインページへリダイレクト
    const router = useRouter();
    useEffect(() => {
        if (status === "guest" || status === "noPermission") {
            router.push(LOGIN_URL);
        }
    }, [router, status]);

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
            <html>
                <body>
                    <LoadingScreen />;
                </body>
            </html>
        );
    }

    return (
        <html lang="ja">
            <body
                className="w-screen h-screen overflow-hidden
                bg-orange-100 "
            >
                <div id="modal-root" />
                <div className="h-full md:grid md:grid-cols-[minmax(160px,1fr)_minmax(450px,650px)_minmax(250px,1.8fr)]">
                    <LayoutUIProvider value={LayoutContextValue}>
                        <div
                            className={
                                hamburger
                                    ? "block inset-0 bg-black/50 fixed z-30 md:hidden"
                                    : "hidden"
                            }
                            onClick={toggleHamburger}
                        ></div>
                        <aside
                            className={
                                (hamburger
                                    ? "translate-x-0"
                                    : "-translate-x-full") +
                                " md:block md:h-full md:translate-x-0 md:w-auto md:static fixed bg-orange-100" +
                                " border-r border-orange-200 transition-transform duration-300 z-40 left-0 inset-y-0 w-[60%]"
                            }
                        >
                            <Menu user={me} />
                        </aside>
                        <div className="w-full h-full bg-orange-100 border-r border-orange-200 flex flex-col min-h-0">
                            <div className="w-full h-full flex flex-col">
                                <Header isDown={isDown} me={me} />

                                <main
                                    className="p-6 no-scrollbar pb-16 md:pb-3 flex-1 overflow-y-auto min-h-0"
                                    ref={setMainRef}
                                >
                                    {children}
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
                        <div className="hidden md:block md:top-0 md:h-full">
                            notification
                        </div>
                    </LayoutUIProvider>
                </div>
                {
                    //<Script src="https://unpkg.com/react-scan/dist/auto.global.js" />
                }
            </body>
        </html>
    );
}
