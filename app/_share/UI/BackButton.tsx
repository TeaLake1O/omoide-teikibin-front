"use client";

export default function BackButton({
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
            className="w-[60%] h-[60%] relative"
        >
            {/*<div className="h-[50%] top-1/2 left-0 -translate-y-1/2 w-1 bg-black group-hover:bg-gray-300 transition-colors rotate-45 duration-300 absolute rounded-full" />*/}
            <div className="h-0.5 w-[50%] bg-black absolute rounded-full -rotate-45 left-[1px] top-1/2 -translate-y-1/2 origin-left" />
            <div className="h-0.5 w-[80%] bg-black absolute rounded-full left-0 top-1/2 -translate-y-1/2 origin-left" />

            <div className="h-0.5 w-[50%] bg-black absolute rounded-full rotate-45 left-[1px] top-1/2 -translate-y-1/2 origin-left" />
        </button>
    );
}
