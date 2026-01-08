"use server";
import { updateTag } from "next/cache";

export async function refreshServerFetch(tag: string) {
    updateTag(tag);
}
