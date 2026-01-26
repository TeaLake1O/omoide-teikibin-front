"use client";

import MountedModal from "@/app/_share/components/modals/MountedModal";
import { useNotifyModal } from "@/app/_share/provider/NotifyModal";
import NotificationsShell from "../_share/components/NotificationsShell";

export default function NotificationModal() {
    const { isOpenNotifyModal, closeNotifyModal } = useNotifyModal();
    return (
        <MountedModal close={closeNotifyModal} isOpen={isOpenNotifyModal}>
            <div
                className="w-[90%] h-[80%] bg-orange-100 flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="h-16 w-full font-bold flex justify-center lg:border-r-amber-800 items-center text-amber-800 border-b border-b-amber-800">
                    通知一覧
                </h2>
                <NotificationsShell />
            </div>
        </MountedModal>
    );
}
