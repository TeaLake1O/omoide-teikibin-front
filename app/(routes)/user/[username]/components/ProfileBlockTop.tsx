"use client";
import GenericButton from "@/app/_share/components/GenericButton";
import { useToast } from "@/app/_share/provider/Toast";
import { Status } from "@/app/_share/types/status";
import nextStatusMap from "@/app/_share/util/nextStatusMap";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import friendRequest from "../../../../_share/api/friendRequest";
import { UserPageData } from "../types/userPageData";

const SEND_MS = 3000;

export default function ProfileBlockTop({
    data,
    isMe,
}: {
    data: UserPageData;
    isMe: boolean;
}) {
    const [status, setStatus] = useState<Status>(data.status);
    const prevStatus = useRef<Status | null>(null);

    const timer = useRef<number | null>(null);

    const isSend = useRef(false);

    const username = usePathname().slice("/user/".length);

    const { showToast } = useToast();

    const optimisticSend = useCallback(
        (isPositive: boolean) => {
            if (isSend.current) return;
            showToast("フレンド関係を更新しました。", "text-black");
            isSend.current = true;
            setStatus((prev) => {
                prevStatus.current = prev;
                return nextStatusMap(prev, isPositive);
            });
            timer.current = window.setTimeout(async () => {
                const res = await friendRequest(isPositive, username);
                if (res.status === "success" && res.resData !== null) {
                    setStatus(res.resData.status);
                } else {
                    showToast("エラーがが発生しました。", "text-black");
                    //prevStatusはここではnullにはなり得ないけどTSCの警告止めるため型アサーションを使う
                    setStatus(prevStatus.current as Status);
                }
                timer.current = null;
                isSend.current = false;
                prevStatus.current = null;
            }, SEND_MS);
        },
        [username, showToast]
    );
    const cancelSend = useCallback(() => {
        if (timer.current === null) return;
        if (!isSend.current) return;
        if (prevStatus.current === null) return;
        window.clearTimeout(timer.current);
        timer.current = null;
        setStatus(prevStatus.current);
        isSend.current = false;
        prevStatus.current = null;
    }, []);

    const callback = useCallback(
        (isPositive: boolean) => {
            if (isSend.current) cancelSend();
            else optimisticSend(isPositive);
        },
        [cancelSend, optimisticSend]
    );

    useEffect(
        () => () => {
            if (timer.current !== null) clearTimeout(timer.current);
        },
        []
    );

    if (isMe) return null;
    switch (status) {
        case "friend":
            return (
                <div className="flex items-center justify-between p-3 pb-0">
                    <span className="text-amber-800 text-sm">
                        フレンドのユーザー
                    </span>
                    <GenericButton
                        name="フレンド関係を解消"
                        height="h-6"
                        textSize="text-sm"
                        handleOnclick={() => callback(false)}
                    />
                </div>
            );
        case "incoming":
            return (
                <div className="flex items-center justify-between p-3 pb-0">
                    <span className="text-amber-800 text-sm">
                        フレンド申請がきています
                    </span>
                    <div className="flex gap-3">
                        <GenericButton
                            name="許可"
                            height="h-6"
                            textSize="text-sm"
                            handleOnclick={() => callback(true)}
                        />
                        <GenericButton
                            name="拒否"
                            height="h-6"
                            textSize="text-sm"
                            handleOnclick={() => callback(false)}
                        />
                    </div>
                </div>
            );
        case "outgoing":
            return (
                <div className="flex items-center justify-between p-3 pb-0">
                    <span className="text-amber-800 text-sm">
                        フレンド申請中
                    </span>
                    <GenericButton
                        name="申請をキャンセル"
                        height="h-6"
                        textSize="text-sm"
                        handleOnclick={() => callback(false)}
                    />
                </div>
            );
        case "none":
            return (
                <div className="flex items-center flex-row-reverse p-3 pb-0">
                    <GenericButton
                        name="フレンド申請"
                        height="h-6"
                        textSize="text-sm"
                        handleOnclick={() => callback(true)}
                    />
                </div>
            );

        default:
            return null;
    }
}
