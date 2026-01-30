"use client";
import GenericButton from "@/app/_share/components/UI/button/GenericButton";
import { useToast } from "@/app/_share/provider/Toast";
import { Status } from "@/app/_share/types/status";
import nextStatusMap from "@/app/_share/util/nextStatusMap";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import friendRequest from "../../api/friendRequest";

const SEND_MS = 3000;

export default function FollowButton({
    state,
    isMe,
    username,
}: {
    state: Status;
    isMe: boolean;
    username: string;
}) {
    const [status, setStatus] = useState<Status>(state);
    const prevStatus = useRef<Status | null>(null);

    const timer = useRef<number | null>(null);

    const isSend = useRef(false);

    const path = usePathname();

    const { showToast } = useToast();

    const optimisticSend = useCallback(
        (isPositive: boolean) => {
            if (isSend.current) return;
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
                    showToast("エラーが発生しました。", "text-black");
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
            if (path.startsWith("/user/") || path.startsWith("friend")) {
                return (
                    <div className="flex items-center justify-between mr-3">
                        <span className="text-amber-800 text-sm mr-3">
                            フレンド
                        </span>
                        <GenericButton
                            name="フレンドを削除"
                            height="h-6"
                            textSize="text-sm font-bold"
                            textColor="text-amber-900"
                            handleOnclick={() => callback(false)}
                        />
                    </div>
                );
            } else {
                return (
                    <div className="flex items-center justify-between mr-3">
                        <span className="text-amber-800 text-sm mr-3">
                            フレンド
                        </span>
                    </div>
                );
            }

        case "incoming":
            return (
                <div className="flex items-center justify-between mr-3">
                    <span className="text-amber-800 text-sm mr-2">
                        申請がきています
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
                <div className="flex items-center justify-between gap-2 mr-3">
                    <span className="text-amber-800 text-sm">
                        フレンド申請中
                    </span>
                    <GenericButton
                        name="キャンセル"
                        height="h-6"
                        textSize="text-sm"
                        handleOnclick={() => callback(false)}
                    />
                </div>
            );
        case "none":
            return (
                <div className="flex items-center flex-row-reverse mr-3">
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
