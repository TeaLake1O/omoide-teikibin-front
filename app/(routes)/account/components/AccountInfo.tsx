import LogOut from "@/app/_share/components/LogoutModal";
import { AccountsData } from "../types/accountsData";
import AccountDelete from "./AccountDelete";
import AccountRow from "./AccountsRow";

export type ActionName =
    | "change_username"
    | "change_email"
    | "change_password"
    | "delete";

type Props = {
    data: AccountsData;
};

export default async function Account(props: Props) {
    const { username, email, date_joined } = props.data;
    const dateJoined = date_joined.replaceAll("-", "/");

    return (
        <>
            <form method="post" className="flex flex-col min-h-0 gap-7 p-6">
                <AccountRow
                    title="ユーザーネーム"
                    name={username}
                    buttonName="change_username"
                />
                <AccountRow
                    title="メールアドレス"
                    name={email}
                    buttonName="change_email"
                />
                <AccountRow
                    title="パスワード"
                    name="xxxxxxxxx"
                    buttonName="change_password"
                />
                <AccountRow title="登録日" name={dateJoined} />
                <div className="flex flex-col gap-5 mt-auto">
                    <div className="flex flex-row-reverse items-center">
                        <LogOut />
                    </div>
                    <div className="flex flex-row-reverse items-center">
                        <AccountDelete />
                    </div>
                </div>
            </form>
        </>
    );
}

/*async function ensureCsrfCookie() {
    await fetch(`${DJANGO_URL}/accounts/api/csrf/`, {
        credentials: "include",
    });
}*/
