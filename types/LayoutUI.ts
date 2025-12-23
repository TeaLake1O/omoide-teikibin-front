import { Me } from "@/types/userInfo";
import { Dispatch } from "react";

export type LayoutUI = {
    toggleHamburger: () => void;
    me: Me | null;
    optimisticUrl: string | null;
    setOptimisticUrl: Dispatch<React.SetStateAction<string | null>>;
};
