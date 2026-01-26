"use client";
import { ToastProvider } from "@/app/_share/provider/Toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { NotifyModalProvider } from "./NotifyModal";
import { PostModalProvider } from "./PostModal";

type Props = {
    children: React.ReactNode;
};

export default function AppProviders({ children }: Props) {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <PostModalProvider>
            <NotifyModalProvider>
                <QueryClientProvider client={queryClient}>
                    <ToastProvider>{children}</ToastProvider>
                </QueryClientProvider>
            </NotifyModalProvider>
        </PostModalProvider>
    );
}
