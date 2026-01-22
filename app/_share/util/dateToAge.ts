"use client";

import today from "./today";

export default function dateToAge(rawBirthday: string): number | null {
    const { year, fullDate } = today();

    const [by, bm, bd] = rawBirthday.split("-").map(Number);
    if (!by || !bm || !bd) return null;
    if (bm < 1 || bm > 12) return null;
    //0をいれることでその月の末日がとれる。面白い
    const lastDay = new Date(by, bm, 0).getDate();
    if (bd < 1 || bd > lastDay) return null;

    const maybeAge = Number(year) - by;

    const thisYearsBirthday = new Date(Number(year), bm - 1, bd);

    const age = fullDate < thisYearsBirthday ? maybeAge - 1 : maybeAge;

    return age;
}
