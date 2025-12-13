"use client";

export function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 bg-orange-100 flex justify-center items-center">
            <div className="flex gap-1">
                <div className="w-[4px] h-16 bg-orange-500 rounded-[5px] animate-[wave_1s_ease-in-out_infinite] [animation-delay:-0s]"></div>
                <div className="w-[4px] h-16 bg-orange-500 rounded-[5px] animate-[wave_1s_ease-in-out_infinite] [animation-delay:-0.1s]"></div>
                <div className="w-[4px] h-16 bg-orange-500 rounded-[5px] animate-[wave_1s_ease-in-out_infinite] [animation-delay:-0.2s]"></div>
                <div className="w-[4px] h-16 bg-orange-500 rounded-[5px] animate-[wave_1s_ease-in-out_infinite] [animation-delay:-0.3s]"></div>
                <div className="w-[4px] h-16 bg-orange-500 rounded-[5px] animate-[wave_1s_ease-in-out_infinite] [animation-delay:-0.4s]"></div>
                <div className="w-[4px] h-16 bg-orange-500 rounded-[5px] animate-[wave_1s_ease-in-out_infinite] [animation-delay:-0.5s]"></div>
                <div className="w-[4px] h-16 bg-orange-500 rounded-[5px] animate-[wave_1s_ease-in-out_infinite] [animation-delay:-0.6s]"></div>
                <div className="w-[4px] h-16 bg-orange-500 rounded-[5px] animate-[wave_1s_ease-in-out_infinite] [animation-delay:-0.7s]"></div>
            </div>
        </div>
    );
}
