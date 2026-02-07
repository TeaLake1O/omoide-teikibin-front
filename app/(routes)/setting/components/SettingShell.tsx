import { AccountsData } from "../types/accountsData";
import AccountInfo from "./AccountInfo";

export default function SettingShell({ data }: { data: AccountsData }) {
    return (
        <div className="h-full w-full p-3">
            <h3 className="border-b w-full text-xl text-amber-800">
                アカウント設定
            </h3>
            <AccountInfo data={data} />
        </div>
    );
}
