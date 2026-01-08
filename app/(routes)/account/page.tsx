import { serverFetch } from "@/app/servers/serverFetch";
import { DJANGO_URL } from "@/config";
import AccountInfo from "./components/AccountInfo";
import { AccountsData } from "./types/accountsData";

export default async function Account() {
    const data = await serverFetch<AccountsData>(
        `${DJANGO_URL}/accounts/api/me/detail`,
        `accounts`,
        "default"
    );

    return (
        <div className="h-full w-full flex flex-col min-h-0 gap-7 p-6">
            <AccountInfo data={data} />
        </div>
    );
}
