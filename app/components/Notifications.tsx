"use client";

import NotificationsShell from "../_share/components/domain/NotificationsShell";

export default function Notifications() {
    return (
        <div className="h-full w-full flex flex-col">
            <h2 className="h-16 w-full font-bold flex justify-center lg:border-r-amber-800 items-center text-amber-800">
                通知一覧
            </h2>
            <NotificationsShell />
        </div>
    );
}
