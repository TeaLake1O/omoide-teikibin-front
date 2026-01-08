import Link from "next/link";

type Props = {
    name: string;
    height: string;
    href: string;
    textSize: string;
    width?: string;
    textColor?: string;
    hidden?: boolean;
    color?: string;
};

export default function GenericLink(props: Props) {
    return (
        <Link
            href={props.href}
            className={`border active:scale-95 duration-200 transition-all 
                rounded-md ${
                    !props.color
                        ? "bg-orange-200 hover:bg-orange-300 border-amber-800"
                        : props.color
                } outline-none flex items-center justify-center pr-3 pl-3
        ${props.width !== undefined ? props.width : ""} ${props.height} ${
                props.hidden && "hidden"
            }`}
        >
            <span
                className={`${
                    props.textColor ? props.textColor : "text-black"
                } text-xs text-center ${props.textSize}`}
            >
                {props.name}
            </span>
        </Link>
    );
}
