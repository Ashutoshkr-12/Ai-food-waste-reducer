import { apiFetch } from "./client";

export async function getFridge(token: string) {
    return apiFetch("/api/fridge",token)
}

export async function saveFridge(items: any[], token: string) {
    return apiFetch("/api/fridge/",token,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
    });
}