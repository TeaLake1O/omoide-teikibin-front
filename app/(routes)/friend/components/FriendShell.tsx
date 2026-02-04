"use client";
import useTabIndicator from "@/app/_share/hooks/util/useTabIndicator";
import { TabItem } from "@/app/_share/types/TabIndicator";
import { NonEmptyArray } from "@/app/_share/types/util";
import { FriendData, FriendRequestData } from "../types/friends";
import FriendLists from "./FriendListsTab";
import FriendRequest from "./FriendRequestsTab";
import FriendSearch from "./FriendSearchTab";

type Props = {
    requestsData: FriendRequestData[];
    friendListData: FriendData[];
};
const items = [
    { id: "friends", label: "フレンド一覧" },
    { id: "search", label: "検索" },
    { id: "request", label: "申請" },
] as const satisfies NonEmptyArray<TabItem<string>>;

type TabId = (typeof items)[number]["id"];

export default function FriendShell(props: Props) {
    const {
        wrapRef,
        tabRef,
        activeIndicator,
        setActiveId,
        isCalcComplete,
        activeId,
    } = useTabIndicator<TabId>({ items: items });
    return (
        <div className="h-full w-full flex flex-col min-h-0">
            <div
                className="h-18 shrink-0  flex w-full items-center relative justify-center"
                ref={wrapRef}
            >
                {items.map((item) => {
                    const isActive = item.id === activeId;
                    return (
                        <button
                            className="w-full h-full flex justify-center items-center"
                            ref={tabRef(item.id)}
                            key={item.id}
                            type="button"
                            onClick={() => {
                                setActiveId(item.id);
                            }}
                        >
                            <span
                                className={`text-xl text-amber-800 text-center ${
                                    isActive ? "font-bold" : ""
                                }`}
                            >
                                {item.label}
                            </span>
                        </button>
                    );
                })}
                <span
                    className={`absolute left-0 bottom-0 h-[2px] rounded-full bg-orange-400 
                        transition-[transform,width] duration-500 ${
                            isCalcComplete ? "" : "hidden"
                        }`}
                    style={{
                        transform: `translateX(${
                            activeIndicator.left + activeIndicator.width * 0.25
                        }px)`,
                        width: `${activeIndicator.width * 0.5}px`,
                    }}
                />
            </div>
            <div className="flex-1 min-h-0 w-full">
                {activeId === "request" && (
                    <FriendRequest data={props.requestsData} />
                )}
                {activeId === "friends" && (
                    <FriendLists data={props.friendListData} />
                )}
                {activeId === "search" && <FriendSearch />}
            </div>
        </div>
    );
}
