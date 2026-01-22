"use client";

export default function today(): {
    year: string;
    month: string;
    day: string;
    fullDate: Date;
} {
    const d = new Date();
    const year = String(d.getFullYear());
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return { year, month, day, fullDate: d };
}
