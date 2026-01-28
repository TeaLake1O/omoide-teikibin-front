"use client";

import SearchBox from "@/app/_share/components/SearchBox";
import { useState } from "react";

export default function FriendSearch() {
    const [text, setText] = useState("");
    return (
        <div className="min-h-0 w-full flex flex-col items-center border-t border-orange-200 ">
            <div className="h-18 w-[80%] flex justify-center items-center">
                <SearchBox setText={setText} text={text} />
            </div>
        </div>
    );
}
