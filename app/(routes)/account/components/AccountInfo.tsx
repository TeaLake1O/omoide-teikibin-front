import GenericLink from "@/app/_share/components/GenericLink";
import LogOut from "@/app/_share/components/LogoutButton";
import { DJANGO_URL } from "@/config";
import Link from "next/link";
import { AccountsData } from "../types/accountsData";
type Props = {
    data: AccountsData;
};

export default function Account(props: Props) {
    const { username, email, date_joined } = props.data;
    const dateJoined = date_joined.replaceAll("-", "/");
    return (
        <>
            <AccountRow
                title="ユーザーネーム"
                name={username}
                href={`${DJANGO_URL}/accounts/api/change/username`}
            />
            <AccountRow
                title="メールアドレス"
                name={email}
                href={DJANGO_URL + "/accounts/api/change/email"}
            />
            <AccountRow
                title="パスワード"
                name="xxxxxxxxx"
                href={DJANGO_URL + "/accounts/api/change/password"}
            />
            <AccountRow title="登録日" name={dateJoined} />
            <div className="flex flex-col gap-5 mt-auto">
                <div className="flex flex-row-reverse items-center">
                    <LogOut />
                </div>
                <div className="flex flex-row-reverse items-center">
                    <Link
                        href={DJANGO_URL + "/accounts/api/delete"}
                        className="text-red-500 hover:text-red-300 active:text-red-300"
                    >
                        アカウントの削除
                    </Link>
                </div>
            </div>
        </>
    );
}

type AccountRowProps = {
    title: string;
    name: string;
    href?: string;
};
function AccountRow(props: AccountRowProps) {
    return (
        <div className="h-16 w-full flex items-center">
            <div className="flex flex-col w-full">
                <div className="flex justify-between">
                    <span className="text-amber-800 text-lg truncate">
                        {props.title}
                    </span>
                    {props.href && (
                        <div className="flex justify-center items-center">
                            <GenericLink
                                href={props.href}
                                name="変更"
                                textSize="text-base"
                                height="h-6"
                                textColor="text-black"
                            />
                        </div>
                    )}
                </div>
                <span className="ml-4 text-lg mt-2">{props.name}</span>
            </div>
        </div>
    );
}
