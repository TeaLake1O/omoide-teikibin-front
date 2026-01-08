"use client";

import { DJANGO_URL } from "@/config";
import submit from "../util/AccountForm";

export default function AccountDelete() {
    return (
        <button
            type="button"
            className="text-red-500 hover:text-red-300 active:text-red-300"
            onClick={async () => {
                const res = await submit("delete");
                if (res.ok) {
                    window.location.assign(
                        DJANGO_URL + "/accounts/api/passwordcheck/"
                    );
                } else {
                    console.log("fail");
                }
            }}
        >
            アカウントの削除
        </button>
    );
}
