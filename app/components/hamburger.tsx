"use client";
import Image from "next/image";
import Loader from "./Loader";
type Props = {
    iconUrl: string | null;
    toggleHamburger: () => void;
};

export default function Hamburger(props: Props) {
    return (
        <div className="w-12 h-12 ml-2 rounded-full bg-orange-100 flex items-center md:hidden">
            <button
                onClick={props.toggleHamburger}
                className="w-full h-full flex items-center justify-center rounded-full duration-200
                        active:scale-96
                        "
            >
                {props.iconUrl ? (
                    <Image
                        src={props.iconUrl.replace("http://localhost:8000", "")}
                        alt="icon"
                        width={128}
                        height={128}
                        className="w-12 h-12 rounded-full"
                    />
                ) : (
                    <Loader />
                )}
            </button>
        </div>
    );
}
