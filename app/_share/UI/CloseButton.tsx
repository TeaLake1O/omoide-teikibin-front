"use client";

export default function CloseButton({
    handleOnclick,
    color,
    noHover,
}: {
    handleOnclick: () => void;
    color?: string;
    noHover?: boolean;
}) {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                handleOnclick();
            }}
            className={`w-full h-full relative group/close rounded-full 
                ${
                    noHover ? "" : "hover:bg-black/20"
                } transition-colors duration-300`}
        >
            <div
                className={`h-[70%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 ${
                    color ? color : "bg-white group-hover/close:bg-gray-300"
                }  transition-colors rotate-45 duration-300 absolute rounded-full`}
            />
            <div
                className={`h-[70%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 ${
                    color ? color : "bg-white group-hover/close:bg-gray-300"
                } transition-colors duration-300 rotate-135 absolute rounded-full`}
            />
        </button>
    );
}
