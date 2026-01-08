export default function getPageName(rawUrl: string | null) {
    const url = rawUrl?.startsWith("/user") ? "/user" : rawUrl;

    const pageName: Record<string, string> = {
        "/home": "ホーム",
        "/group": "グループ",
        "/post": "投稿",
        "/friend": "フレンド",
        "/user": rawUrl !== null ? rawUrl.slice(6) + "のユーザページ" : "Error",
        "/setting": "設定",
        "/account": "アカウント情報",
        "/not-found": "Not Found",
    };
    if (url !== null) {
        return pageName[url];
    } else {
        return "";
    }
}
