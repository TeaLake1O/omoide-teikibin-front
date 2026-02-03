export default function getPageName(rawUrl: string | null) {
    const url = (() => {
        if (rawUrl?.startsWith("/user")) {
            return "/user";
        } else if (rawUrl?.startsWith("/message/")) {
            return "/message/";
        } else return rawUrl;
    })();

    const pageName: Record<string, string> = {
        "/home": "ホーム",
        "/group": "グループ",
        "/post": "投稿",
        "/friend": "フレンド",
        "/user": rawUrl !== null ? rawUrl.slice(6) + "のユーザページ" : "Error",
        "/setting": "設定",
        "/account": "アカウント情報",
        "/message/":
            rawUrl !== null ? rawUrl.slice(9) + "とのメッセージ" : "Error",
        "/message": "メッセージ",
        "/not-found": "Not Found",
    };
    if (url !== null) {
        return pageName[url];
    } else {
        return "";
    }
}
