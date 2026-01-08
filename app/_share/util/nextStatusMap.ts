import { Status } from "../types/status";

export default function nextStatusMap(
    status: Status,
    isPositive: boolean
): Status {
    if (isPositive) {
        switch (status) {
            case "friend":
                return "friend";
            case "incoming":
                return "friend";
            case "outgoing":
                return "outgoing";
            case "none":
                return "outgoing";
            case "me":
                return "me";
        }
    } else {
        switch (status) {
            case "me":
                return "me";
            default:
                return "none";
        }
    }
}
