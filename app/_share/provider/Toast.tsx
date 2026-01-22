"use client";
import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

const ToastContext = createContext<ToastAPI | null>(null);

export type ToastAPI = {
    showToast: (message: string, textClass?: string, seconds?: number) => void;
};

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("Error");
    return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [isShow, setIsShow] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [textClass, setTextClass] = useState<string | null>(null);

    const timer = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (timer.current !== null) window.clearTimeout(timer.current);
        };
    }, []);

    const FADE_MS = 500;

    const showToast = (
        message: string,
        textClass: string = "",
        seconds: number = 2.5
    ) => {
        setTextClass(textClass);
        setMessage(message);
        setIsShow(true);
        if (timer.current !== null) {
            window.clearTimeout(timer.current);
        }
        timer.current = window.setTimeout(() => {
            hide();
            timer.current = null;
        }, seconds * 1000);
    };
    const hide = () => {
        setIsShow(false);
        window.setTimeout(() => {
            setMessage(null);
            setTextClass(null);
        }, FADE_MS);
    };
    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div
                className={`fixed top-0 border h-8 mt-1 left-1/2 -translate-x-1/2 rounded-sm
                    justify-center items-center bg-orange-200 duration-500 shadow-2xl
                    z-[9999] inline-flex  whitespace-nowrap ${
                        isShow && message !== null
                            ? " opacity-100"
                            : " opacity-0"
                    }`}
            >
                <span
                    className={`mt-1 mb-1 mr-3 ml-3 font-sans font-bold ${textClass}`}
                >
                    {message}
                </span>
            </div>
        </ToastContext.Provider>
    );
}
