"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useState } from "react";
import Hamburger from "./components/hamburger";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    //カスタムフック、共通レイアウトのデータを取得する
    const { status, me, message } = useCurrentUser();

    //トグル用のrefと関数
    const [hamburger, setHamburger] = useState(false);

    const toggleHamburger = () => {
        console.log(hamburger);
        //アローで書かないと連打で古い値を掴むことがあるらしい
        setHamburger((prev) => !prev);
    };

    return (
        <html lang="ja">
            <body className="h-screen w-screen bg-orange-100 flex justify-center">
                <div className="w-full h-full bg-orange-100 border-x-1 border-solid border-black md:w-[600px] relative">
                    <header className="w-full h-18 top-0 border-y-1 border-solid flex items-center absolute">
                        <Hamburger
                            iconUrl={me?.icon_url ?? null}
                            toggleHamburger={toggleHamburger}
                        />
                    </header>
                    <main className="w-full h-full">{children}</main>
                    <div className="w-full h-18 bottom-0 absolute"></div>
                </div>
                <aside className=""></aside>
                <div></div>
            </body>
        </html>
    );
}
