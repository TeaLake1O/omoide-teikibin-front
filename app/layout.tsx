import { DJANGO_URL } from "@/config";
import { Me } from "@/types/Me";
import AppProviders from "./_share/provider/AppProvider";
import LayoutShell from "./components/LayoutShell";
import "./globals.css";
import { serverFetch } from "./servers/serverFetch";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const data: Me | null = await serverFetch({
        url: `${DJANGO_URL}/accounts/api/layout`,
        tag: "layout",
    });

    return (
        <html lang="ja">
            <body
                className="w-screen h-screen overflow-hidden
                bg-orange-100 "
            >
                <div id="modal-root" />
                <AppProviders initialMe={data}>
                    <LayoutShell>{children}</LayoutShell>
                </AppProviders>
            </body>
        </html>
    );
}
