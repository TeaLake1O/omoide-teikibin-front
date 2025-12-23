import { DJANGO_URL } from "@/config";
import { Me } from "@/types/userInfo";
import LayoutShell from "./components/LayoutShell";
import "./globals.css";
import { serverFetch } from "./servers/serverFetch";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const data: Me | null = await serverFetch(
        `${DJANGO_URL}/accounts/api/layout`
    );

    return (
        <html lang="ja">
            <body
                className="w-screen h-screen overflow-hidden
                bg-orange-100 "
            >
                <LayoutShell initialMe={data}>{children}</LayoutShell>
            </body>
        </html>
    );
}
