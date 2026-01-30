"use client";

import CloseButton from "../button/CloseButton";
import SearchIcon from "../Icon/SearchIcon";

export default function SearchBox({
    setText,
    text,
}: {
    setText: (text: string) => void;
    text: string;
}) {
    return (
        <label
            className="w-full h-[55%] border border-orange-300 rounded-full bg-white 
        flex flex-row-reverse justify-end items-center"
        >
            {text && (
                <div className="h-full aspect-square p-2 relative flex justify-center items-center">
                    <CloseButton
                        handleOnclick={() => setText("")}
                        color="bg-black hover:bg-black right-0"
                        noHover
                    />
                </div>
            )}
            <input
                type="search"
                className="peer min-w-0 flex-1 h-[80%] focus:ml-3 border-none  focus:outline-none focus:ring-0 focus:border-transparent
                        focus-visible:outline-none focus-visible:ring-0"
                onChange={(e) => setText(e.currentTarget.value)}
                value={text}
                placeholder="検索"
            />
            <div className="peer-focus:hidden h-full aspect-square flex items-center justify-center p-2">
                <SearchIcon />
            </div>
        </label>
    );
}
