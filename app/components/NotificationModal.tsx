"use client";

import MountedModal from "@/app/_share/components/modals/MountedModal";
import { useNotifyModal } from "@/app/_share/provider/NotifyModal";
import NotificationsShell from "../_share/components/NotificationsShell";
import CloseButton from "../_share/UI/CloseButton";

export default function NotificationModal() {
    const { isOpenNotifyModal, closeNotifyModal } = useNotifyModal();

    return (
        <MountedModal close={closeNotifyModal} isOpen={isOpenNotifyModal}>
            <div
                className="w-[90%] h-[80%] bg-orange-100 md:hidden flex flex-col rounded-sm"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center ">
                    <div className="h-[80%] aspect-square p-2 rounded-full active:bg-black/20 transition-colors duration-200">
                        <CloseButton
                            handleOnclick={closeNotifyModal}
                            color="bg-black"
                        />
                    </div>
                    <h2 className="h-16 w-full font-bold flex justify-center lg:border-r-amber-800 items-center text-amber-800">
                        通知一覧
                    </h2>
                    <div className="h-[80%] aspect-square" />
                </div>
                <NotificationsShell />
            </div>
        </MountedModal>
    );
}
