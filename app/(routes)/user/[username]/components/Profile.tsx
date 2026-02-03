import FollowButton from "@/app/_share/components/domain/FollowButton";
import ModalImage from "@/app/_share/components/modals/ImageModal";
import GenericLink from "@/app/_share/components/UI/button/GenericLink";
import Age from "@/app/_share/components/UI/util/Age";
import { UNKNOWN_USER_ICON_URL } from "@/app/_share/constants/publicUrls";
import { UserPageData } from "../types/userPageData";
import EditModal from "./EditModal";

type Props = {
    data: UserPageData;
    serverRefresh: () => Promise<void>;
};

export default function Profile(props: Props) {
    const isMe = props.data.status === "me";
    return (
        <>
            <div className="min-h-[200px] md:min-h-[300px] w-full flex flex-col gap-3">
                <div className="mt-3 flex flex-row-reverse h-8">
                    <FollowButton
                        isMe={isMe}
                        state={props.data.status}
                        username={props.data.username}
                    />
                </div>
                <ProfileBlockTop
                    data={props.data}
                    isMe={isMe}
                    serverRefresh={props.serverRefresh}
                />
                <ProfileBlockBottom data={props.data} isMe={isMe} />
            </div>
        </>
    );
}

function ProfileBlockTop({
    data,
    isMe,
    serverRefresh,
}: {
    data: UserPageData;
    isMe: boolean;
    serverRefresh: () => Promise<void>;
}) {
    return (
        <div className="w-full flex flex-col p-6">
            <div className="w-full h-16 grid grid-cols-[1fr_auto_1fr] items-center">
                <div className="h-16 aspect-square rounded-full md:ml-3">
                    <ModalImage
                        src={data.icon_url ?? UNKNOWN_USER_ICON_URL}
                        rounded="rounded-full"
                    />
                </div>
                <div className="flex flex-col gap-2 mr-3 ml-3 min-w-0">
                    <span className="text-2xl flex-1 text-black text-center truncate">
                        {data.nickname ? data.nickname : "名無し"}
                    </span>
                    <span className="text-1xl text-amber-800 text-center">
                        @{data.username}
                    </span>
                </div>
                <div className="flex flex-row-reverse items-center">
                    {data.status === "me" && (
                        <EditModal
                            iconUrl={data.icon_url}
                            profileText={data.user_profile}
                            nickname={data.nickname}
                            birthday={data.birthday}
                            isMe={isMe}
                            serverRefresh={serverRefresh}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

function ProfileBlockBottom({
    data,
    isMe,
}: {
    data: UserPageData;
    isMe: boolean;
}) {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex justify-between mr-3 ml-3 mt-4 pl-6 pr-6">
                <div className="flex justify-center gap-3 flex-col">
                    <span className="text-base text-amber-800">
                        誕生日 :{" "}
                        {data.birthday
                            ? data.birthday.replaceAll("-", "/")
                            : "未登録"}
                    </span>
                    {data.birthday && (
                        <span className="text-base text-amber-800">
                            {data.birthday && (
                                <Age
                                    className="font-bold"
                                    birthday={data.birthday}
                                />
                            )}
                            歳
                        </span>
                    )}
                </div>
                <GenericLink
                    height="h-6"
                    href="/account"
                    name="アカウント情報"
                    textSize="text-sm"
                    hidden={!isMe}
                />
            </div>
            <div className="w-full mt-7 flex flex-col">
                <span
                    className={`text-sm text-gray-500 pl-6 pr-6 ${
                        !isMe &&
                        (!data.user_profile || data.user_profile.length === 0)
                            ? "hidden"
                            : "block"
                    }`}
                >
                    自己紹介
                </span>
                <div className="text-base w-full no-scrollbar break-words p-6">
                    {isMe &&
                    (!data.user_profile || data.user_profile.length === 0)
                        ? "自己紹介を登録しましょう"
                        : data.user_profile}
                </div>
                <span className="mt-3 pl-3 pb-1 h-auto border-b border-orange-300 w-full text-amber-800">
                    過去の投稿
                </span>
            </div>
        </div>
    );
}
