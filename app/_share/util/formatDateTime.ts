export default function formatDateTime(
    time: string,
    onlyDate: boolean,
    nowMs?: number,
): string {
    const now = nowMs ?? Date.now();

    const d = new Date(time);

    const diff = now - d.getTime();

    if (diff < 0) return "Error";
    else if (diff < 60_000) {
        const sec = Math.max(0, Math.floor(diff / 1000));
        return `${sec}秒前`;
    } else if (diff < 3_600_000) {
        const min = Math.max(0, Math.floor(diff / 60_000));
        return `${min}分前`;
    } else if (diff < 86_400_000) {
        const hour = Math.max(0, Math.floor(diff / 3_600_000));
        return `${hour}時間前`;
    } else {
        if (onlyDate) {
            return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(
                2,
                "0",
            )}/${String(d.getDate()).padStart(2, "0")}`;
        } else {
            return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(
                2,
                "0",
            )}/${String(d.getDate()).padStart(2, "0")} ${String(
                d.getHours(),
            ).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
        }
    }
}
