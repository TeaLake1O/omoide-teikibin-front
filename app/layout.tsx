"use client";
import { LOGIN_URL } from "@/config";
import useCurrentUserInfoLayout from "@/hooks/useCurrentUserInfoLayout";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { LoadingScreen } from "./_share/components/LoadingScreen";
import Menu from "./components/HamburgerMenu";
import "./globals.css";

import Script from "next/script";
import { LayoutUIProvider } from "./components/LayoutUI";
import Menubar from "./components/Menubar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    //カスタムフック、共通レイアウトのデータを取得する
    const { status, me, message, isLoading } = useCurrentUserInfoLayout();
    if (message) console.log(message);
    //timer用
    const [minDelayDone, setMinDelayDone] = useState(false);

    //トグル用のrefと関数
    const [hamburger, setHamburger] = useState(false);

    const toggleHamburger = useCallback(() => {
        //アローで書かないと連打で古い値を掴むことがあるらしい
        setHamburger((prev) => !prev);
    }, []);

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
                bg-orange-100 md:grid md:grid-cols-[minmax(160px,1fr)_minmax(450px,650px)_minmax(250px,1.8fr)]"
            >
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
                        (hamburger ? "translate-x-0" : "-translate-x-full") +
                        " md:block md:h-screen md:translate-x-0 md:w-auto md:static fixed bg-orange-100" +
                        " border-r border-orange-200 transition-transform duration-300 z-40 left-0 inset-y-0 w-[50%]"
                    }
                >
                    <Menu user={me} />
                </aside>
                <div className="w-full h-screen bg-orange-100 border-r border-orange-200 grid grid-rows-[1fr_auto] ">
                    <div className="w-full h-full">
                        <LayoutUIProvider
                            value={{
                                toggleHamburger,
                                me: me,
                            }}
                        >
                            {children}
                        </LayoutUIProvider>
                    </div>
                    <div className="w-full left-0 right-0 bottom-0 h-16 bg-orange-100 border-orange-200 border-t fixed md:hidden">
                        <Menubar />
                    </div>
                </div>
                <div className="hidden md:block md:top-0 md:h-screen">
                    notification
                </div>
            </body>
            <Script
                src="https://unpkg.com/react-scan/dist/auto.global.js"
                strategy="afterInteractive"
            />
        </html>
    );
}
