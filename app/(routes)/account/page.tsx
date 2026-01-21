import { serverFetch } from "@/app/servers/serverFetch";
import { DJANGO_URL } from "@/config";
import AccountInfo from "./components/AccountInfo";
import { AccountsData } from "./types/accountsData";

export default async function Account() {
    const data = await serverFetch<AccountsData>({
        url: `${DJANGO_URL}/accounts/api/me/detail`,
        tag: `accounts`,
        cache: "no-store",
    });

    return (
        <div className="h-full w-full">
            <AccountInfo data={data} />
        </div>
    );
}
