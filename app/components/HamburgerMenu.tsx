"use client";

import React from "react";
import { Me } from "../../types/CurrentUserInfoLayout";
import UserIcon from "../_share/components/UserIcon";

type Props = {
    user: Me | null;
};

function menuComponent(props: Props) {
    return (
        <div className="flex flex-col">
            <div className="h-24 w-full grid grid-cols-2">
                <span>
                    {props.user && (props.user.nickname || props.user.username)
                        ? props.user.nickname
                        : "Loading..."}
                </span>
                <div className="w-16 h-16 rounded-full bg-orange-100 grid items-center">
                    <button className="w-full h-full bg-orange-100 flex items-center justify-center duration-200 active:scale-94">
                        <UserIcon iconUrl={props.user?.icon_url ?? null} />
                    </button>
                </div>
            </div>
            <div className="p-3">
                <ul>
                    <li>test1</li>
                    <li>test2</li>
                    <li>test3</li>
                </ul>
            </div>
        </div>
    );
}
const Menu = React.memo(menuComponent);
export default Menu;
