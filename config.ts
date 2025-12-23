export const DJANGO_URL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;
if (!DJANGO_URL) throw new Error("NEXT_PUBLIC_DJANGO_BASE_URL is not defined");

export const FRONT_URL = process.env.NEXT_PUBLIC_FRONT_BASE_URL;
if (!FRONT_URL) throw new Error("NEXT_PUBLIC_BASE_URL is not defined");

export const LOGIN_URL = `${DJANGO_URL}/accounts/login/`;
export const LANDING_PAGE_URL = DJANGO_URL;

export const LAYOUT_DATA_URL = `${DJANGO_URL}/accounts/api/layout`;
