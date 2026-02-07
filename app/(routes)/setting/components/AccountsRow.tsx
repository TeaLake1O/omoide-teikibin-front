"use client";

import GenericButton from "@/app/_share/components/UI/button/GenericButton";
import { DJANGO_URL } from "@/config";
import submit from "../util/AccountForm";
import { ActionName } from "./AccountInfo";

export type AccountRowProps = {
    title: string;
    name: string;
    buttonName?: ActionName;
};

export default function AccountRow(props: AccountRowProps) {
    return (
        <div className="h-16 w-full flex items-center">
            <div className="flex flex-col w-full">
                <div className="flex justify-between">
                    <span className="text-amber-800 text-lg truncate">
                        {props.title}
                    </span>
                    {props.buttonName && (
                        <GenericButton
                            name="変更"
                            height="h-5"
                            textSize=""
                            handleOnclick={async () => {
                                if (!props.buttonName) return;
                                const res = await submit(props.buttonName);
                                if (res.ok) {
                                    window.location.assign(
                                        DJANGO_URL +
                                            "/accounts/api/passwordcheck/"
                                    );
                                } else {
                                    console.log("fail");
                                }
                            }}
                        />
                    )}
                </div>
                <span className="ml-4 text-lg mt-2">{props.name}</span>
            </div>
        </div>
    );
}
