import { serverFetch } from "@/app/servers/serverFetch";
import { DJANGO_URL } from "@/config";
import SettingShell from "./components/SettingShell";
import { AccountsData } from "./types/accountsData";

export default async function Setting() {
    const data = await serverFetch<AccountsData>({
        url: `${DJANGO_URL}/accounts/api/me/detail`,
        tag: `accounts`,
        cache: "no-store",
    });

    return (
        <div className="h-full w-full">
            <SettingShell data={data} />
        </div>
    );
}
