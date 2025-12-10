"use client";
import Image from "next/image";
import Loader from "./loader";
type HamburgerProps = {
    iconUrl: string | null;
    toggleHamburger: () => void;
};

export default function Hamburger(props: HamburgerProps) {
    return (
        <div className="w-18 h-full rounded-full bg-orange-100 flex items-center">
            <button
                onClick={props.toggleHamburger}
                className="w-full h-full bg-orange-100 flex items-center justify-center hover:bg-orange-200 active:bg-orange-100 rounded-full duration-200"
            >
                {props.iconUrl ? (
                    <Image
                        src={props.iconUrl.replace("http://localhost:8000", "")}
                        alt="icon"
                        width={128}
                        height={128}
                        className="w-16 h-16 rounded-full"
                    />
                ) : (
                    <Loader />
                )}
            </button>
        </div>
    );
}
