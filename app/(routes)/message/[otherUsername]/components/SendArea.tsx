"use client";

export default function SendArea() {
    return (
        <div className="w-full border border-orange-200 min-h-16 max-h-42 md:h-20 flex justify-center items-center">
            <div className="w-[90%] h-[60%] border border-orange-300 rounded-full p-2">
                <input
                    type="text"
                    className="ml-2 w-[90%] h-full flex items-center border-none  focus:outline-none focus:ring-0 focus:border-transparent
                        focus-visible:outline-none focus-visible:ring-0"
                    placeholder="メッセージを送信"
                />
            </div>
        </div>
    );
}
