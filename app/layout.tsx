"use client";
import { LOGIN_URL } from "@/config";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Hamburger from "./components/Hamburger";
import { LoadingScreen } from "./components/LoadingScreen";
import Menu from "./components/Menu";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    //カスタムフック、共通レイアウトのデータを取得する
    const { status, me, message, isLoading } = useCurrentUser();
    if (message) console.log(message);
    //timer用
    const [minDelayDone, setMinDelayDone] = useState(false);

    //トグル用のrefと関数
    const [hamburger, setHamburger] = useState(false);

    const toggleHamburger = () => {
        //アローで書かないと連打で古い値を掴むことがあるらしい
        setHamburger((prev) => !prev);
    };

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
                bg-orange-100 md:grid md:grid-cols-[minmax(160px,1fr)_minmax(320px,600px)_minmax(225px,1.8fr)]"
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
                <div className="w-full h-screen bg-orange-100 border-r border-orange-200 grid grid-rows-[auto_1fr_auto]">
                    <header className="w-full h-16 border-b border-orange-200 flex items-center ">
                        <Hamburger
                            iconUrl={me?.icon_url ?? null}
                            toggleHamburger={toggleHamburger}
                        />
                    </header>
                    <main className="w-full overflow-y-auto no-scrollbar">
                        {children}
                    </main>
                    <div className="w-full bottom-0 h-16 border-orange-200 border-t md:hidden"></div>
                </div>
                <div className="hidden md:block md:top-0 md:h-screen">
                    hello
                </div>
            </body>
        </html>
    );
}
