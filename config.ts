export const API_URL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;
if (!API_URL) throw new Error("NEXT_PUBLIC_DJANGO_BASE_URL is not defined");

export const FRONT_URL = process.env.NEXT_PUBLIC_FRONT_BASE_URL;
if (!API_URL) throw new Error("NEXT_PUBLIC_BASE_URL is not defined");

export const LOGIN_URL = `${API_URL}/accounts/login/`;
