import { Me } from "@/types/Me";
import { Dispatch } from "react";

export type LayoutUI = {
    toggleHamburger: () => void;
    hamburger: boolean;
    isLoading: boolean;
    me: Me;
    refresh: () => void;
    optimisticUrl: string | null;
    setOptimisticUrl: Dispatch<React.SetStateAction<string | null>>;
    closeHamburger: () => void;
};

export type PostModal = {
    closePostModal: () => void;
    openPostModal: () => void;
    isOpenPostModal: boolean;

    setInitialImage: (item: File | null) => void;
    initialImage: () => File | null;

    resetInitialData: () => void;
};

export type NotifyModal = {
    isOpenNotifyModal: boolean;
    openNotifyModal: () => void;
    closeNotifyModal: () => void;
};
