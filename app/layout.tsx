"use client";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body className="h-screen w-screen bg-orange-100">
                <header className="w-screen h-16 border-y-2 border-solid"></header>
                <div className="">{children}</div>
                <aside></aside>
            </body>
        </html>
    );
}
