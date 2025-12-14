"use client";

import React from "react";
import UserIcon from "../../_share/components/UserIcon";

type Props = {
    iconUrl: string | null;
    toggleHamburger: () => void;
};
//ハンバーガーメニューのボタン、アイコンを表示する
function HamburgerComponent(props: Props) {
    return (
        <div className="w-12 h-12 ml-2 rounded-full bg-orange-100 flex items-center md:hidden">
            <button
                onClick={props.toggleHamburger}
                className="w-full h-full flex items-center justify-center duration-200 active:scale-96"
            >
                <UserIcon iconUrl={props.iconUrl} />
            </button>
        </div>
    );
}
const Hamburger = React.memo(HamburgerComponent);
export default Hamburger;
