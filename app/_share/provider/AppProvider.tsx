"use client";
import { ToastProvider } from "@/app/_share/provider/Toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { PostModalProvider } from "./PostModal";

type Props = {
    children: React.ReactNode;
};

export default function AppProviders({ children }: Props) {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <PostModalProvider>
            <QueryClientProvider client={queryClient}>
                <ToastProvider>{children}</ToastProvider>
            </QueryClientProvider>
        </PostModalProvider>
    );
}
