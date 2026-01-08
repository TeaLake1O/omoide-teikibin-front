import { Status } from "./status";

export type UserInf = {
    id: number;
    username: string;
    icon_url: string;
    nickname: string | null;
    status: Status;
};
