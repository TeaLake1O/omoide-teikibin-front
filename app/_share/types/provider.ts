import { Me } from "@/types/Me";
import { Dispatch } from "react";

export type LayoutUI = {
    toggleHamburger: () => void;
    me: Me | null;
    refresh: () => void;
    optimisticUrl: string | null;
    setOptimisticUrl: Dispatch<React.SetStateAction<string | null>>;
};
