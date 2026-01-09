"use client";

export default function CloseButton({
    handleOnclick,
}: {
    handleOnclick: () => void;
}) {
    return (
        <button
            onClick={handleOnclick}
            className="w-full h-full relative group"
        >
            <div className="h-full w-1 bg-white group-hover:bg-gray-300 transition-colors rotate-45 duration-300 absolute rounded-full" />
            <div className="h-full w-1 bg-white group-hover:bg-gray-300 transition-colors duration-300 rotate-135 absolute rounded-full" />
        </button>
    );
}
