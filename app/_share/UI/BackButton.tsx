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
            className="w-[80%] h-[80%] relative group"
        >
            {/*<div className="h-[50%] top-1/2 left-0 -translate-y-1/2 w-1 bg-black group-hover:bg-gray-300 transition-colors rotate-45 duration-300 absolute rounded-full" />*/}
            <div className="h-1 w-[50%] bg-black group-hover:bg-gray-300 absolute rounded-full rotate-135 top-1/2" />
            <div className="h-1 w-[50%] bg-black group-hover:bg-gray-300 absolute rounded-full" />
            <div className="h-1 w-[50%] bg-black group-hover:bg-gray-300 absolute rounded-full rotate-45" />
        </button>
    );
}
