"use client";
import { ToastProvider } from "@/app/_share/provider/Toast";
import { Me } from "@/types/Me";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { LayoutUIProvider } from "./LayoutUI";
import { NotifyCountProvider } from "./NotifyCount";
import { NotifyModalProvider } from "./NotifyModal";
import { PostModalProvider } from "./PostModal";

type Props = {
    children: React.ReactNode;
    initialMe: Me;
};

export default function AppProviders({ children, initialMe }: Props) {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <LayoutUIProvider initialMe={initialMe}>
            <QueryClientProvider client={queryClient}>
                <NotifyCountProvider enabled>
                    <PostModalProvider>
                        <NotifyModalProvider>
                            <ToastProvider>{children}</ToastProvider>
                        </NotifyModalProvider>
                    </PostModalProvider>
                </NotifyCountProvider>
            </QueryClientProvider>
        </LayoutUIProvider>
    );
}
