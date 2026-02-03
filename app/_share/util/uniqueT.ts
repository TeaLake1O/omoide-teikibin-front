"use client";

export default function uniqueT<T>(args: {
    readonly arr: T[];
    getId: (x: T) => string | number;
}) {
    const seen = new Set<string>();
    return args.arr.filter((x) => {
        const k = String(args.getId(x));
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
    });
}
