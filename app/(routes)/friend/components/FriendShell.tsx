"use client";
import useTabIndicator from "@/app/_share/hooks/useTabIndicator";
import { TabItem } from "@/app/_share/types/TabIndicator";
import { NonEmptyArray } from "@/app/_share/types/util";
import { FriendData } from "../types/friends";
import FriendLists from "./FriendLists";
import FriendSearch from "./FriendSearch";

type Props = {
    data: FriendData[];
};
const items = [
    { id: "view", label: "一覧" },
    { id: "search", label: "検索・申請" },
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
        <div className="h-full w-full">
            <div
                className="h-18 flex w-full items-center relative justify-center"
                ref={wrapRef}
            >
                {items.map((item) => {
                    return (
                        <button
                            className="w-full h-full flex justify-center items-center"
                            ref={tabRef(item.id)}
                            key={item.id}
                            type="button"
                            onClick={() => setActiveId(item.id)}
                        >
                            <span className="text-xl text-amber-800 text-center ">
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
            {activeId === "view" && <FriendLists data={props.data} />}
            {activeId === "search" && <FriendSearch />}
        </div>
    );
}
