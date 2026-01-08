type Props = {
    name: string;
    height: string;
    width?: string;
    textSize: string;
    textColor?: string;
    hidden?: boolean;
    color?: string;
    type?: "button" | "submit" | "reset";
    handleOnclick: () => void;
};

export default function GenericButton(props: Props) {
    return (
        <button
            className={`border active:scale-95 duration-200 transition-all 
                rounded-2xl ${
                    !props.color
                        ? "bg-orange-200 hover:bg-orange-300 border-amber-800"
                        : props.color
                } outline-none flex items-center justify-center pr-3 pl-3
        ${props.width !== undefined ? props.width : ""} ${props.height} ${
                props.hidden && "hidden"
            }`}
            onClick={props.handleOnclick}
            type={props.type ?? "button"}
        >
            <span
                className={`${
                    props.textColor ? props.textColor : "text-black"
                } text-xs text-center ${props.textSize}`}
            >
                {props.name}
            </span>
        </button>
    );
}
