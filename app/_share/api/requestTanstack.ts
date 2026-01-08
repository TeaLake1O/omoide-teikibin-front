"use client";

import { FetchResult } from "../types/fetch";
import { fetcher } from "./request";

export class ApiError extends Error {
    status: FetchResult<unknown>["status"];
    httpStatus: number;
    constructor(result: FetchResult<unknown>) {
        super(result.message ?? "ApiError");
        this.status = result.status;
        this.httpStatus = result.httpStatus;
    }
}

export async function fetcherOrThrow<T>(url: string): Promise<T> {
    const r = await fetcher<T>(url);
    if (r.status !== "success" || r.resData === null) throw new ApiError(r);
    return r.resData;
}
