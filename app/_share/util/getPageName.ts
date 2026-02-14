export default function getPageName(rawUrl: string | null) {
    const url = (() => {
        if (rawUrl?.startsWith("/user")) {
            return "/user";
        } else if (rawUrl?.startsWith("/message/")) {
            return "/message/";
        } else if (rawUrl?.startsWith("/group/")) {
            return "/group/";
        } else if (rawUrl?.startsWith("/post/")) {
            return "/post/";
        } else return rawUrl;
    })();

    const pageName: Record<string, string> = {
        "/home": "ホーム",
        "/group": "グループ",
        "/group/": "グループ",
        "/friend": "フレンド",
        "/user": rawUrl !== null ? rawUrl.slice(6) + "のユーザページ" : "Error",
        "/setting": "設定",
        "/account": "アカウント情報",
        "/message/":
            rawUrl !== null ? rawUrl.slice(9) + "とのメッセージ" : "Error",
        "/message": "メッセージ",
        "/not-found": "Not Found",
        "/post/": "投稿詳細",
        "/camera": "写真撮影",
    };
    if (url !== null) {
        return pageName[url];
    } else {
        return "";
    }
}
