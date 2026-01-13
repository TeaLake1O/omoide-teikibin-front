"use client";

export default function CloseButton({
    handleOnclick,
}: {
    handleOnclick: () => void;
}) {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                handleOnclick();
            }}
            className="w-full h-full relative group"
        >
            <div className="h-[70%] top-1/2 left-1/2 translate-x-1/2 -translate-y-1/2 w-1 bg-white group-hover:bg-gray-300 transition-colors rotate-45 duration-300 absolute rounded-full" />
            <div className="h-[70%] top-1/2 left-1/2 translate-x-1/2 -translate-y-1/2 w-1 bg-white group-hover:bg-gray-300 transition-colors duration-300 rotate-135 absolute rounded-full" />
        </button>
    );
}
