import GenericLink from "@/app/_share/components/GenericLink";
import UserIconImage from "@/app/_share/components/UserIconImage";
import { UserPageData } from "../types/userPageData";
import EditButton from "./EditButton";
import ProfileBlockTop from "./ProfileBlockTop";
import UserPastPost from "./UserPastPost";

type Props = {
    data: UserPageData;
    serverRefresh: () => Promise<void>;
};

export default function Profile(props: Props) {
    const isMe = props.data.status === "me";
    return (
        <div className="h-[200px] md:h-[300px] w-full flex flex-col gap-5">
            <ProfileBlockTop data={props.data} isMe={isMe} />
            <ProfileBlockCenter
                data={props.data}
                isMe={isMe}
                serverRefresh={props.serverRefresh}
            />
            <ProfileBlockBottom data={props.data} isMe={isMe} />
            <UserPastPost username={props.data.username} />
        </div>
    );
}

function ProfileBlockCenter({
    data,
    isMe,
    serverRefresh,
}: {
    data: UserPageData;
    isMe: boolean;
    serverRefresh: () => Promise<void>;
}) {
    return (
        <div className="w-full flex flex-col md:p-6">
            <div className="w-full h-16 grid grid-cols-[1fr_auto_1fr] items-center">
                <div className="h-16 aspect-square rounded-full md:ml-3">
                    <UserIconImage iconUrl={data.icon_url} />
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
                        <EditButton
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
        <div className="w-full flex flex-col items-center justify-center md:pl-6 md:pr-6">
            <div className="w-full flex justify-between mr-3 ml-3 mt-4">
                <span className="text-base text-amber-800">
                    誕生日 :{" "}
                    {data.birthday
                        ? data.birthday.replaceAll("-", "/")
                        : "未登録"}
                </span>
                <GenericLink
                    height="h-6"
                    href="/account"
                    name="アカウント情報"
                    textSize="text-sm"
                    hidden={!isMe}
                />
            </div>
            <div className="w-full mt-10 flex flex-col">
                <span
                    className={`text-sm text-gray-500 ${
                        !isMe &&
                        (!data.user_profile || data.user_profile.length === 0)
                            ? "hidden"
                            : "block"
                    }`}
                >
                    自己紹介
                </span>
                <div className="p-4 text-base w-full no-scrollbar break-words">
                    {isMe &&
                    (!data.user_profile || data.user_profile.length === 0)
                        ? "自己紹介を登録しましょう"
                        : data.user_profile}
                </div>
                <span className="mt-6 border-b border-amber-800 text-amber-800">
                    過去の投稿
                </span>
            </div>
        </div>
    );
}
