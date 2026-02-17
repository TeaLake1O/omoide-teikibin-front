"use client";
import { useLayoutUI } from "@/app/_share/provider/LayoutUI";
import { Me } from "@/types/Me";
import Link from "next/link";
import { usePathname } from "next/navigation";
import IconImage from "../_share/components/IconImage";
import BackButton from "../_share/components/UI/button/BackButton";
import UserIcon from "../_share/components/UserIconImage";
import { useIsMdUp } from "../_share/hooks/util/useIsMdUp";
import getPageName from "../_share/util/getPageName";

type Props = {
    isDown: boolean;
    me: Me | null;
};

const backButtonUrl = ["/user/", "/message/", "/group/", "/post/"];

export default function Header(props: Props) {
    const { toggleHamburger } = useLayoutUI();

    const { optimisticUrl } = useLayoutUI();
    const path = usePathname();
    const hasBackButton = backButtonUrl.some((url) => path.startsWith(url));

    //const router = useRouter();

    const back = () => {
        window.history.back();
    };

    const isMdUp = useIsMdUp();

    const headerClass = isMdUp
        ? "w-full bg-orange-100 border-orange-200 overflow-hidden flex items-center transition-[opacity,transform] duration-400 " +
          (props.isDown
              ? "h-0 opacity-0 border-b-0 pointer-events-none"
              : "h-16 opacity-100 border-b pointer-events-auto") +
          " md:h-16 md:opacity-100 md:border-b md:pointer-events-auto"
        : "fixed top-0 left-0 right-0 z-1 h-16 " +
          "bg-orange-100 border-b border-orange-200 flex items-center " +
          "duration-400 will-change-transform " +
          (props.isDown
              ? "-translate-y-full pointer-events-none"
              : "translate-y-0 pointer-events-auto") +
          " md:translate-y-0 md:opacity-100 md:pointer-events-auto";

    return (
        <header className={headerClass}>
            <div className="h-12 w-12 aspect-square rounded-full flex items-center justify-center">
                {!hasBackButton ? (
                    <button
                        type="button"
                        onClick={toggleHamburger}
                        className={`h-[90%] w-[90%] aspect-square flex items-center justify-center 
                        duration-200 active:scale-96 md:pointer-events-none md:invisible`}
                    >
                        <UserIcon iconUrl={props.me?.icon_url ?? null} />
                    </button>
                ) : (
                    <div
                        onClick={back}
                        className="flex justify-center items-center h-[90%] aspect-square rounded-full active:bg-black/20 hover:bg-black/20 transition-colors duration-300"
                    >
                        <BackButton handleOnclick={back} />
                    </div>
                )}
            </div>
            <div className="flex-1 flex justify-center">
                <h1 className="font-medium font-sans text-[1.27rem] text-amber-800">
                    {getPageName(optimisticUrl) || getPageName(path)}
                </h1>
            </div>
            <div className="h-12 aspect-square flex items-center justify-center">
                <Link href="/home" className="w-full h-full">
                    <IconImage
                        src="/img/omoide-teikibin-Logo-transparent.png"
                        alt="appicon"
                        scale="w-[80%]"
                    />
                </Link>
            </div>
        </header>
    );
}
