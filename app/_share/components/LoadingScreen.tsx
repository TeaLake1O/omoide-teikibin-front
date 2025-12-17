"use client";

export function LoadingScreen() {
    const delays = [
        "0s",
        "0.1s",
        "0.2s",
        "0.3s",
        "0.4s",
        "0.5s",
        "0.6s",
        "0.7s",
    ];
    return (
        <div className="fixed inset-0 z-50 bg-orange-100 flex justify-center items-center">
            <div className="flex gap-1">
                {delays.map((delay, i) => {
                    return (
                        <div
                            key={i}
                            className={`w-[4px] h-16 bg-orange-500 rounded-[5px] 
                                animate-[wave_1s_ease-in-out_infinite] [animation-delay:-${delay}]`}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}
