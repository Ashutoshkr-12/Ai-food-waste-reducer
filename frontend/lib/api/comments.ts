import { apiFetch } from "./client";

export async function addComment(data: any) {
    return apiFetch("/api/comments",{
        method: "POST",
        body: JSON.stringify(data),
    })
}