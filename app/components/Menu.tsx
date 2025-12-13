import Image from "next/image";
import { Me } from "../../types/userInf";
import Loader from "./der";

type Props = {
    user: Me | null;
};

export default function menu(props: Props) {
    return (
        <div className="flex flex-col">
            <div className="h-24 w-full grid grid-cols-2">
                <span>
                    {props.user && (props.user.nickname || props.user.username)
                        ? props.user.nickname
                        : "Loading..."}
                </span>
                <div className="w-16 h-16 rounded-full bg-orange-100 grid items-center">
                    <button
                        className="w-full h-full bg-orange-100 flex items-center justify-center rounded-full duration-200
                        active:scale-94
                        "
                    >
                        {props.user && props.user.icon_url ? (
                            <Image
                                src={props.user.icon_url.replace(
                                    "http://localhost:8000",
                                    ""
                                )}
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
            </div>
            <div className="p-3">
                <ul>
                    <li>test1</li>
                    <li>test2</li>
                    <li>test3</li>
                </ul>
            </div>
        </div>
    );
}
