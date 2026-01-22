"use client";

import useTabIndicator from "../hooks/useTabIndicator";
import { TabItem } from "../types/TabIndicator";
import { NonEmptyArray } from "../types/util";

const items = [
    { id: "post", label: "投稿" },
    { id: "friend", label: "フレンド" },
    //型推論を潰さないである型の制約を満たしてるか確認するため、satisfiesでNonEmptyArrayの空チェックを行う
] as const satisfies NonEmptyArray<TabItem<string>>;

//typeof itemsでitemsが型になり、その中から[number]すると帰りうるすべての要素がunion型になり、それからidの部分だけを抽出している。
type NotifyId = (typeof items)[number]["id"];

export default function NotificationsShell() {
    const {
        wrapRef,
        tabRef,
        indicator,
        setActiveId,
        activeId,
        isCalcComplete,
    } = useTabIndicator<NotifyId>({ items: items });

    return (
        <div className="h-full w-full flex flex-col">
            <div
                className={`grid h-16 w-full justify-center items-center relative`}
                style={{
                    gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
                }}
                ref={wrapRef}
            >
                {items.map((item) => (
                    <button
                        key={item.id}
                        ref={tabRef(item.id)}
                        type="button"
                        onClick={() => setActiveId(item.id)}
                        className="w-full h-full"
                    >
                        {item.label}
                    </button>
                ))}
                <span
                    className={`absolute bottom-0 h-[2px] bg-black transition-all duration-300 ease-out ${
                        isCalcComplete ? "" : "hidden"
                    }`}
                    style={{
                        transform: `translateX(${indicator.left}px)`,
                        width: `${indicator.width}px`,
                    }}
                />
            </div>
        </div>
    );
}
