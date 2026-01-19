"use client";

export default function PostButton() {
    return (
        <div className="h-[60%] aspect-square relative">
            <div className="h-1 w-full rounded-md bg-orange-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="w-1 h-full rounded-md bg-orange-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
    );
}
