"use client";

export default function PostButton() {
    return (
        <div className="h-[80%] aspect-square active:scale-95">
            <div className="relative h-full w-full rounded-full bg-orange-300">
                <div className="h-1 w-[80%] rounded-md bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="w-1 h-[80%] rounded-md bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
        </div>
    );
}
