export default function usePageName(url: string | null) {
    const pageName: Record<string, string> = {
        "/home": "Home",
        "/group": "Group",
        "/post": "Post",
        "/friend": "Friend",
    };
    if (url !== null) {
        return pageName[url];
    } else {
        return "";
    }
}
