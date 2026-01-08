"use client";

import { FetchResult } from "../types/fetch";
import getCookie from "../util/getCookie";

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type RequestArgs = {
    method?: Method;
    body?: unknown;
    formData?: FormData;
    headers?: Record<string, string>;
};

function csrfToken(method: Method): Record<string, string> {
    if (method === "GET") return {};
    const token = getCookie("csrftoken");
    return token ? { "X-CSRFToken": token } : {};
}

export async function request<T>(
    url: string,
    args: RequestArgs = {}
): Promise<FetchResult<T>> {
    const { method = "GET", body, formData, headers = {} } = args;
    try {
        const res = await fetch(url, {
            method,
            credentials: "include",
            headers: {
                ...csrfToken(method),
                //formDataがあるときはブラウザがContentTypeを指定するので何もしない
                ...(formData
                    ? {}
                    : body !== undefined
                    ? { "Content-Type": "application/json" }
                    : {}),
                ...headers,
            },
            body:
                formData ??
                (body !== undefined ? JSON.stringify(body) : undefined),
        });

        if (res.status === 403 || res.status === 401) {
            return {
                status: "noPermission",
                httpStatus: res.status,
                resData: null,
                message: "ログインが必要です。",
            };
        } else if (res.status === 404) {
            return {
                status: "notFound",
                httpStatus: res.status,
                resData: null,
                message: "urlが間違っています",
            };
        } else if (!res.ok) {
            return {
                status: "error",
                httpStatus: res.status,
                resData: null,
                message: "エラーが発生しました。",
            };
        }
        //からのJSONが帰ってきた場合parseするとエラーが出るので、テキストにして中身を確認する
        const text = await res.text();
        const data = text ? (JSON.parse(text) as T) : (null as T);

        return {
            status: "success",
            httpStatus: res.status,
            resData: data,
            message: "成功",
        };
    } catch {
        return {
            status: "error",
            httpStatus: 0,
            resData: null,
            message: "エラー",
        };
    }
}

export async function fetcher<T>(url: string): Promise<FetchResult<T>> {
    return await request<T>(url, { method: "GET" });
}

export const postJson = async <T>(
    url: string,
    body: unknown,
    headers?: Record<string, string>
): Promise<FetchResult<T>> => {
    return await request<T>(url, { method: "POST", body, headers });
};

export const patchJson = async <T>(
    url: string,
    body: unknown,
    headers?: Record<string, string>
): Promise<FetchResult<T>> => {
    return await request<T>(url, { method: "PATCH", body, headers });
};

export const patchForm = async <T>(
    url: string,
    data: FormData,
    headers?: Record<string, string>
): Promise<FetchResult<T>> => {
    return await request<T>(url, { method: "PATCH", formData: data, headers });
};

export const putJson = async <T>(
    url: string,
    body: unknown,
    headers?: Record<string, string>
): Promise<FetchResult<T>> => {
    return await request<T>(url, { method: "PUT", body, headers });
};
