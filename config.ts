export const API_URL =
    process.env.NEXT_PUBLIC_DJANGO_BASE_URL ?? "http://localhost:8000/";

export const FRONT_URL =
    process.env.NEXT_PUBLIC_FRONT_BASE_URL ?? "http://localhost:3000/";

export const LOGIN_URL = `${API_URL}accounts/login/`;
